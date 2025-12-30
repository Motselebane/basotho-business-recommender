require('dotenv').config();
const mysql = require('mysql2');

// MySQL connection pool with environment variables
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'recommender_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
        process.exit(1);
    } else {
        console.log('✅ Connected to MySQL database');
        connection.release();
    }
});

module.exports = pool.promise();