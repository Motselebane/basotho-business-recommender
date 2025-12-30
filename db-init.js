const mysql = require('mysql2/promise');
require('dotenv').config();

async function initializeDatabase() {
    // Create a connection to the MySQL server (without specifying a database)
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        multipleStatements: true
    });

    try {
        console.log(' Initializing database...');

        // Create database if it doesn't exist
        await connection.query(
            `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'recommender_db'}`
        );
        console.log('✅ Database created or already exists');

        // Switch to the database
        await connection.query(`USE ${process.env.DB_NAME || 'recommender_db'}`);

        // Create recommendations table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS recommendations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                skills TEXT NOT NULL,
                interests TEXT NOT NULL,
                capital VARCHAR(255) NOT NULL,
                location VARCHAR(255) NOT NULL,
                availability VARCHAR(50) NOT NULL,
                problem_solved TEXT,
                business_title VARCHAR(255),
                business_description TEXT,
                reason_for_fit TEXT,
                estimated_capital VARCHAR(255),
                suggested_schedule TEXT,
                language VARCHAR(10) DEFAULT 'en',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);
        console.log('✅ Recommendations table created or already exists');

        // Create users table if it doesn't exist
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(100) UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);
        console.log('✅ Users table created or already exists');

        // Create indexes for better performance
        await connection.query('CREATE INDEX IF NOT EXISTS idx_user_id ON recommendations(user_id)');
        await connection.query('CREATE INDEX IF NOT EXISTS idx_created_at ON recommendations(created_at)');

        // Create business_feedback table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS business_feedback (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                idea TEXT NOT NULL,
                feedback TEXT NOT NULL,
                rating INT DEFAULT NULL,
                skills TEXT,
                interests TEXT,
                capital VARCHAR(255),
                location VARCHAR(255),
                availability VARCHAR(50),
                language VARCHAR(10) DEFAULT 'en',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                INDEX idx_user_id_feedback (user_id),
                INDEX idx_created_at_feedback (created_at),
                INDEX idx_rating_feedback (rating)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);
        console.log('✅ Business feedback table created or already exists');

        console.log('✅ Database initialization completed successfully!');
    } catch (error) {
        console.error('❌ Error initializing database:', error);
        process.exit(1);
    } finally {
        await connection.end();
    }
}

// Run the initialization
initializeDatabase().catch(console.error);