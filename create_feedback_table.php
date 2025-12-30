<?php
/**
 * Database migration: Create business_feedback table
 * Run this once to add the feedback table without affecting existing tables
 */

require_once __DIR__ . '/auth/db_config.php';

try {
    // Create business_feedback table
    $sql = "CREATE TABLE IF NOT EXISTS business_feedback (
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
        INDEX idx_user_id (user_id),
        INDEX idx_created_at (created_at),
        INDEX idx_rating (rating)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

    if ($conn->query($sql) === TRUE) {
        echo json_encode([
            'success' => true,
            'message' => 'business_feedback table created successfully'
        ]);
    } else {
        throw new Exception($conn->error);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to create table: ' . $e->getMessage()
    ]);
} finally {
    if (isset($conn)) {
        $conn->close();
    }
}
?>
