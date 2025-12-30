<?php
// This script adds an email column to the users table if it doesn't exist
require 'auth/db_config.php';

echo "<!DOCTYPE html><html><head><title>Database Migration</title></head><body>";
echo "<h2>Adding Email Column to Users Table</h2>";

// Check if email column already exists
$hasEmailColumn = false;
if ($result = $conn->query("SHOW COLUMNS FROM users LIKE 'email'")) {
    if ($result->num_rows > 0) {
        $hasEmailColumn = true;
    }
    $result->close();
}

if ($hasEmailColumn) {
    echo "<p style='color: orange;'>✓ Email column already exists in users table.</p>";
} else {
    // Add email column
    $sql = "ALTER TABLE users ADD COLUMN email VARCHAR(255) UNIQUE DEFAULT NULL AFTER username";
    
    if ($conn->query($sql) === TRUE) {
        echo "<p style='color: green;'>✓ Email column added successfully!</p>";
    } else {
        echo "<p style='color: red;'>✗ Error adding email column: " . $conn->error . "</p>";
    }
}

echo "<hr>";
echo "<h3>Next Steps:</h3>";
echo "<ol>";
echo "<li>Update existing user accounts to add their email addresses</li>";
echo "<li>You can do this manually in phpMyAdmin or create an update form</li>";
echo "<li>After users have emails, they can use the password reset feature</li>";
echo "</ol>";
echo "<p><a href='index.php'>Go to Login Page</a></p>";
echo "</body></html>";

$conn->close();
?>
