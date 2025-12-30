<?php
session_start();
require_once 'db_config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Create a connection
    $conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare and bind
    $stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    // Check if user exists
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($user_id, $hashed_password);
        $stmt->fetch();

        // Verify password
        if (password_verify($password, $hashed_password)) {
            // Set session variables
            $_SESSION['username'] = $username;
            $_SESSION['user_id'] = $user_id;

            // Debug: Log the user_id being set
            error_log("Setting session user_id: " . $user_id);

            header("Location: ../../app.php"); // Redirect to main app.php
            exit();
        } else {
            echo "Invalid password.";
        }
    } else {
        echo "No user found with that username.";
    }

    $stmt->close();
    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="auth.css">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = { corePlugins: { preflight: false } }
    </script>
    <title>Login</title>
</head>
<body>
    <div class="auth-header">
        <div class="brand">Basotho Business Ideas</div>
        <nav class="auth-nav">
            <a href="login.php">Login</a>
            <a href="register.php">Register</a>
            <a href="../../index.php">Home</a>
        </nav>
    </div>
    <form method="POST" action="">
        <div style="text-align: center; margin-bottom: 1rem;">
            <button type="button" id="langToggle" class="lang-toggle">Sesotho</button>
        </div>
        <h2 data-lang="login">Login</h2>
        <p class="subtitle" data-lang="login-sub">Access your account to discover tailored business ideas</p>
        <div>
            <label for="username" data-lang="username">Username:</label>
            <input type="text" id="username" name="username" required>
        </div>
        <div>
            <label for="password" data-lang="password">Password:</label>
            <input type="password" id="password" name="password" required>
        </div>
        <button type="submit" data-lang="login-btn">Login</button>
        <p data-lang="no-account"><a href="../../index.php">Back to Home</a> — Don't have an account? <a href="register.php" data-lang="register-here">Register here</a></p>
    </form>
    <script src="../../scripts.js"></script>
    <script>
        // Language toggle initialization using global functions from scripts.js
        document.addEventListener("DOMContentLoaded", function() {
            // Initialize language on page load
            initializeLanguage();
        });
    </script>
</body>
</html>
