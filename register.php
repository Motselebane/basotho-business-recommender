<?php
require 'db_config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $confirm_password = trim($_POST['confirm_password']);

    if (empty($username) || empty($email) || empty($password) || empty($confirm_password)) {
        echo "Please fill in all fields.";
        exit;
    }

    if ($password !== $confirm_password) {
        echo "Passwords do not match.";
        exit;
    }

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Please enter a valid email address.";
        exit;
    }

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $email, $hashed_password);

    if ($stmt->execute()) {
        header("Location: ../../index.php");
        exit;
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
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
    <title>Register</title>
</head>
<body class="use-card-header">
    <div class="container">
        <form action="" method="POST" class="space-y-4 max-w-md mx-auto bg-white/95 backdrop-blur rounded-2xl shadow-xl p-6">
            <div class="form-card-header">
                <div class="brand">Basotho Business Ideas</div>
                <nav class="auth-nav">
                    <a href="../../index.php">Login</a>
                    <a href="register.php">Register</a>
                    
                </nav>
            </div>
            <div class="center-row">
                <button type="button" id="langToggle" class="lang-toggle">Sesotho</button>
            </div>
            <div class="center-row" aria-hidden="true">
                <div style="width:48px; height:48px; border-radius:9999px; background:#eef2ff; display:inline-flex; align-items:center; justify-content:center; color:#4f46e5; font-weight:600;">BB</div>
            </div>
            <h2 class="text-2xl font-semibold text-slate-800 text-center" data-lang="register">Register</h2>
            <p class="subtitle" data-lang="register-sub">Create your account to start getting personalized recommendations</p>
            <div>
                <label for="username" class="text-sm font-medium text-slate-700" data-lang="username">Username:</label>
                <input type="text" id="username" name="username" class="input-box" placeholder="Username" required>
            </div>
            <div>
                <label for="email" class="text-sm font-medium text-slate-700">Email:</label>
                <input type="email" id="email" name="email" class="input-box" placeholder="Email" required>
            </div>
            <div>
                <label for="password" class="text-sm font-medium text-slate-700" data-lang="password">Password:</label>
                <input type="password" id="password" name="password" class="input-box" placeholder="Password" required>
            </div>
            <div>
                <label for="confirm_password" class="text-sm font-medium text-slate-700" data-lang="confirm-password">Confirm Password:</label>
                <input type="password" id="confirm_password" name="confirm_password" class="input-box" placeholder="Confirm Password" required>
            </div>
            <button type="submit" class="btn-primary" data-lang="register-btn">Register</button>
        </form>
        <p class="text-center text-sm text-slate-600"><span data-lang="already-account">Already have an account?</span> <a class="text-indigo-600 hover:underline" href="../../index.php" data-lang="login-here">Login here</a></p>
    </div>
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