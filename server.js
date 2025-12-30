/***********************************************
 * Basotho Business Recommender - Backend
 * Author: Student (Final Year Project)
 ***********************************************/
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { recommendBusiness, provideIdeaFeedback } = require('./recommender');
const { parseRecommendation } = require('./utils/recommendationParser');
const Recommendation = require('./models/recommendationModel');
const { getSessionConfig } = require('./config/sessionStore');
const db = require('./db');
const bcrypt = require('bcryptjs');
const net = require('net');
const { exec } = require('child_process');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Session configuration
app.use(require('express-session')(getSessionConfig()));

// Session tracking middleware
const { trackSession, requireAuth, getUserSessions, destroyUserSessions } = require('./middleware/sessionTracker');
app.use(trackSession);

// CORS configuration (allow localhost and 127.0.0.1 with any port)
const corsOptions = {
    origin: function(origin, callback) {
        if (!origin) return callback(null, true); // same-origin or curl
        const ok = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
        if (ok) return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    exposedHeaders: ['set-cookie']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the root directory
app.use(express.static(__dirname));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
    });
});

// Register endpoint (Option A)
app.post('/api/register', async(req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        if (username.length < 3 || username.length > 50) {
            return res.status(400).json({ error: 'Username must be between 3 and 50 characters' });
        }

        // Check if user exists
        const [existing] = await db.execute(
            'SELECT id FROM users WHERE username = ? LIMIT 1', [username]
        );
        if (existing.length > 0) {
            return res.status(409).json({ error: 'Username already taken' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        // Insert user (support schemas without email column)
        let result;
        try {
            [result] = await db.execute(
                'INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, hashed, email || null]
            );
        } catch (e) {
            // ER_BAD_FIELD_ERROR if email column doesn't exist
            if (e && e.code === 'ER_BAD_FIELD_ERROR') {
                [result] = await db.execute(
                    'INSERT INTO users (username, password) VALUES (?, ?)', [username, hashed]
                );
            } else {
                throw e;
            }
        }

        const userId = result.insertId;

        // Optionally set session immediately (keeps behavior flexible)
        req.session.userId = userId;
        req.session.username = username;

        return res.json({
            success: true,
            user: { id: userId, username, email: email || null }
        });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Function to kill process on port
function killPort(port) {
    return new Promise((resolve, reject) => {
        exec(`netstat -ano | findstr :${port}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`No process found on port ${port}`);
                return resolve();
            }

            const lines = stdout.trim().split('\n').filter(line => line.includes('LISTENING'));
            if (lines.length === 0) {
                console.log(`No LISTENING process found on port ${port}`);
                return resolve();
            }

            const parts = lines[0].trim().split(/\s+/);
            const pid = parts[parts.length - 1];
            if (pid && !isNaN(pid)) {
                exec(`taskkill /PID ${pid} /F`, (killError, killStdout, killStderr) => {
                    if (killError) {
                        console.error(`Failed to kill process on port ${port}:`, killError);
                        reject(killError);
                    } else {
                        console.log(`Successfully killed process on port ${port} (PID: ${pid})`);
                        resolve();
                    }
                });
            } else {
                console.log(`Invalid PID found for port ${port}`);
                resolve();
            }
        });
    });
}

// Check if port is in use and kill if necessary
async function checkAndKillPort(port) {
    return new Promise((resolve, reject) => {
        const server = net.createServer();
        server.listen(port, () => {
            server.close(() => {
                console.log(`Port ${port} is free`);
                resolve();
            });
        });
        server.on('error', async(err) => {
            if (err.code === 'EADDRINUSE') {
                console.log(`Port ${port} is in use, attempting to kill...`);
                try {
                    await killPort(port);
                    // Wait a bit for the port to be freed
                    setTimeout(() => {
                        resolve();
                    }, 2000);
                } catch (killErr) {
                    reject(killErr);
                }
            } else {
                reject(err);
            }
        });
    });
}

// Middleware (CORS already configured above with credentials support)
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Session check route
app.get("/api/check-session", (req, res) => {
    res.json({
        authenticated: !!req.session.userId,
        userId: req.session.userId,
        username: req.session.username
    });
});

// Logout route
app.post("/api/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ error: 'Failed to logout' });
        }
        res.clearCookie('connect.sid');
        res.json({ success: true });
    });
});

// Root route (for quick check if server is alive)
app.get("/", (req, res) => {
    res.json({
        message: "Basotho Business Recommender Backend is running 🚀",
        session: {
            authenticated: !!req.session.userId,
            userId: req.session.userId
        }
    });
});

// API route - Get user's recommendation history
app.get("/api/recommendations", async(req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ error: "Authentication required" });
        }

        const recommendations = await Recommendation.findByUserId(req.session.userId);
        return res.status(200).json({ recommendations });
    } catch (err) {
        console.error("❌ Error fetching recommendations:", err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// API route - Get a specific recommendation
app.get("/api/recommendations/:id", async(req, res) => {
    try {
        // Check if user is authenticated, but allow access for recommendation details
        const isAuthenticated = !!req.session.userId;

        const recommendation = await Recommendation.findById(req.params.id, isAuthenticated ? req.session.userId : null);
        if (!recommendation) {
            return res.status(404).json({ error: "Recommendation not found" });
        }

        // If not authenticated but recommendation exists, still return it
        // This allows viewing recommendation details even if session is lost
        return res.status(200).json({ recommendation });
    } catch (err) {
        console.error("❌ Error fetching recommendation:", err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// API route - Generate and save recommendation
app.post("/api/recommend", async(req, res) => {
    try {
        const {
            user_id,
            skills,
            interests,
            capital,
            location,
            availability,
            rating,
            lang = 'en'
        } = req.body;

        console.log("Received data:", req.body); // log incoming data
        console.log("user_id received:", user_id); // Debug user_id

        if (!skills || !interests || !capital || !location || !availability) {
            console.error("Missing required fields!");
            return res.status(400).json({
                success: false,
                message: "Please provide all required information: skills, interests, capital, location, and availability."
            });
        }

        if (!user_id) {
            console.error("user_id is null or undefined!");
            return res.status(400).json({
                success: false,
                message: "Your session has expired. Please log in again to get recommendations."
            });
        }

        // Generate recommendation
        console.log("Generating recommendation...");
        let aiResponse;
        try {
            aiResponse = await recommendBusiness(
                skills,
                interests,
                capital,
                location,
                availability,
                lang
            );
        } catch (aiError) {
            console.error("Generation failed:", aiError.message);
            return res.status(500).json({
                success: false,
                message: "Service is temporarily unavailable. Please try again later."
            });
        }

        console.log("Response received:", aiResponse);

        // Validate response before proceeding to database
        if (!aiResponse || typeof aiResponse !== 'string' || aiResponse.trim() === "" || aiResponse.includes("Failed to generate")) {
            console.error("Returned invalid or empty response!");
            return res.status(500).json({
                success: false,
                message: "Unable to generate a recommendation at this time. Please try again with different information."
            });
        }

        // Parse the response
        const parsedRecommendation = parseRecommendation(aiResponse, lang);
        console.log("Parsed recommendation:", parsedRecommendation);

        // Validate rating if provided
        const validRating = (rating >= 1 && rating <= 5) ? rating : null;

        // Ensure rating column exists (safe migration, runs once)
        try {
            await db.execute(`ALTER TABLE recommendations ADD COLUMN IF NOT EXISTS rating INT NULL`);
        } catch (e) {
            // Column likely already exists or using older MySQL without IF NOT EXISTS
            // Try alternative check for MariaDB/MySQL 5.7
            try {
                const [cols] = await db.execute(
                    `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'recommendations' AND COLUMN_NAME = 'rating'`
                );
                if (cols.length === 0) {
                    await db.execute(`ALTER TABLE recommendations ADD COLUMN rating INT NULL`);
                }
            } catch (colErr) {
                console.warn('Rating column check/add failed (non-critical):', colErr.message);
            }
        }

        // Save to database (including rating if available)
        const [result] = await db.execute(
            `INSERT INTO recommendations
            (user_id, skills, interests, capital, location, availability, problem_solved, business_title, business_description, reason_for_fit, estimated_capital, suggested_schedule, language, rating)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
                user_id,
                skills,
                interests,
                capital,
                location,
                availability,
                parsedRecommendation.problem_solved || "",
                parsedRecommendation.business_title || "",
                parsedRecommendation.business_description || "",
                parsedRecommendation.reason_for_fit || "",
                parsedRecommendation.estimated_capital || "",
                parsedRecommendation.suggested_schedule || "",
                lang || "en",
                validRating
            ]
        );

        console.log("✅ Inserted successfully, ID:", result.insertId);
        res.json({
            success: true,
            message: "Recommendation saved successfully!",
            recommendation: aiResponse,
            recommendationId: result.insertId
        });

    } catch (error) {
        console.error("❌ Error in /api/recommend:", error.message);

        let userFriendlyMessage = "We're experiencing technical difficulties. Please try again in a few minutes.";
        if (error.message.includes('API')) {
            userFriendlyMessage = "Our recommendation service is temporarily unavailable. Please try again later.";
        } else if (error.message.includes('database') || error.message.includes('connection')) {
            userFriendlyMessage = "Database connection issue. Our team has been notified. Please try again.";
        }

        res.status(500).json({ success: false, message: userFriendlyMessage });
    }
});

// API route - Provide feedback on a user-supplied idea and save to database
app.post('/api/idea-feedback', async(req, res) => {
    try {
        const { user_id, skills = '', interests = '', capital = '', location = '', availability = '', idea = '', lang = 'en' } = req.body || {};

        if (!idea || typeof idea !== 'string' || idea.trim().length === 0) {
            return res.status(400).json({ success: false, message: 'Please provide your business idea.' });
        }

        // Generate feedback
        const feedback = await provideIdeaFeedback(
            String(skills || ''),
            String(interests || ''),
            String(capital || ''),
            String(location || ''),
            String(availability || ''),
            String(idea || ''),
            lang || 'en'
        );

        if (!feedback) {
            return res.status(500).json({ success: false, message: 'Unable to generate feedback at this time.' });
        }

        // Note: Database save is now handled on the frontend after successful display
        // This prevents saving incomplete or failed feedback

        return res.json({ success: true, feedback });
    } catch (error) {
        console.error('❌ Error in /api/idea-feedback:', error.message);
        return res.status(500).json({ success: false, message: 'Failed to get feedback. Please try again later.' });
    }
});

// Login endpoint
app.post("/api/login", async(req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        // Get user from database
        const [users] = await db.execute(
            'SELECT id, username, password FROM users WHERE username = ?', [username]
        );

        if (users.length === 0) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const user = users[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        // Set session
        req.session.userId = user.id;
        req.session.username = user.username;

        res.json({
            success: true,
            user: {
                id: user.id,
                username: user.username
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get user's recommendations
app.get('/api/recommendations', requireAuth, async(req, res) => {
    try {
        const recommendations = await Recommendation.findByUserId(req.session.userId);
        res.json({ recommendations });
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
});

// Get a single recommendation by ID
app.get('/api/recommendations/:id', requireAuth, async(req, res) => {
    try {
        const recommendation = await Recommendation.findById(
            req.params.id,
            req.session.userId
        );

        if (!recommendation) {
            return res.status(404).json({ error: 'Recommendation not found' });
        }

        res.json({ recommendation });
    } catch (error) {
        console.error('Error fetching recommendation:', error);
        res.status(500).json({ error: 'Failed to fetch recommendation' });
    }
});

// Get user's recommendations by user_id
app.get("/api/recommendations/:user_id", async(req, res) => {
    try {
        const { user_id } = req.params;
        const [rows] = await db.execute("SELECT * FROM recommendations WHERE user_id = ?", [user_id]);
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error("❌ Error fetching history:", error.message);
        res.status(500).json({ success: false, message: "Failed to load history" });
    }
});

// Session management endpoints
app.get('/api/session', requireAuth, (req, res) => {
    res.json({
        userId: req.session.userId,
        username: req.session.username,
        expires: req.session.cookie.expires,
        isAuthenticated: true
    });
});

// Get all user sessions (requires authentication)
app.get('/api/sessions', requireAuth, async(req, res) => {
    try {
        const sessions = await getUserSessions(req.session.userId);
        res.json({ sessions });
    } catch (error) {
        console.error('Error fetching sessions:', error);
        res.status(500).json({ error: 'Failed to fetch sessions' });
    }
});

// Logout from current session
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ error: 'Failed to logout' });
        }
        res.clearCookie('bizrec.sid');
        res.json({ success: true });
    });
});

// Logout from all sessions
app.post('/api/logout/all', requireAuth, async(req, res) => {
    try {
        await destroyUserSessions(req.session.userId);
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).json({ error: 'Failed to logout' });
            }
            res.clearCookie('bizrec.sid');
            res.json({ success: true });
        });
    } catch (error) {
        console.error('Error during logout all:', error);
        res.status(500).json({ error: 'Failed to logout from all sessions' });
    }
});

// API route - Get additional business support organizations
app.get("/api/business-support", (req, res) => {
    const additionalSupport = [{
            name: "Lesotho Post Bank",
            description: "Government-owned bank providing financial services and business support.",
            email: "info@lpb.co.ls",
            phone: "+266 2231 4000",
            address: "Kingsway Road, Maseru, Lesotho",
            website: "https://www.lpb.co.ls",
            iconColor: "purple",
            type: "funder",
            translationKey: "lesotho-post-bank"
        },
        {
            name: "National Manpower Development Secretariat",
            description: "Providing training and mentoring for business development.",
            email: "info@nmds.org.ls",
            phone: "+266 2231 2421",
            address: "Development House, Maseru, Lesotho",
            website: "https://www.nmds.org.ls",
            iconColor: "orange",
            type: "mentor",
            translationKey: "national-manpower-development-secretariat"
        },
        {
            name: "Ministry of Trade and Industry",
            description: "Supporting trade, industry and business development in Lesotho.",
            email: "info@trade.gov.ls",
            phone: "+266 2231 2421",
            address: "Kingsway Road, Maseru, Lesotho",
            website: "https://www.trade.gov.ls",
            iconColor: "red",
            type: "support",
            translationKey: "ministry-of-trade-and-industry"
        }
    ];

    res.json({ success: true, organizations: additionalSupport });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server
async function startServer() {
    try {
        await checkAndKillPort(PORT);
        app.listen(PORT, () => {
            console.log(`✅ Backend running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error(`❌ Failed to start server on port ${PORT}:`, error);
        process.exit(1);
    }
}

startServer();