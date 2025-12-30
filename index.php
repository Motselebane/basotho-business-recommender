<?php
session_start();
require_once 'business-recommender/auth/db_config.php';

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
            header("Location: app.php"); // Redirect to main page.php
            exit();
        } else {
            $error_message = "Invalid password/username.";
        }
    } else {
        $error_message = "No such user found.";
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
    <link rel="stylesheet" href="business-recommender/auth/auth.css">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = { corePlugins: { preflight: false } }
    </script>
    <title>Login</title>
</head>

<body class="use-card-header">
    <div class="auth-header">
        <div class="brand" data-lang="brand-site">Basotho Business Ideas</div>
        <nav class="auth-nav">
            <a href="index.php" data-lang="nav-login">Login</a>
            <a href="business-recommender/auth/register.php" data-lang="nav-register">Register</a>
           
        </nav>
    </div>
    <form method="POST" action="" class="mx-auto mt-8 max-w-md bg-white/95 backdrop-blur rounded-2xl shadow-xl p-6 space-y-4">
        <div class="form-card-header">
            <div class="brand" data-lang="brand-site">Basotho Business Ideas</div>
            <nav class="auth-nav">
                <a href="index.php" data-lang="nav-login">Login</a>
                <a href="business-recommender/auth/register.php" data-lang="nav-register">Register</a>
            </nav>
        </div>
        <div class="center-row">
            <button type="button" id="langToggle" class="lang-toggle">Sesotho</button>
        </div>
        <h2 class="text-2xl font-semibold text-slate-800 text-center" data-lang="login">Login</h2>
        <p class="subtitle" data-lang="login-sub">Access your account to discover tailored business ideas</p>
        <?php if (isset($error_message)): ?>
            <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center text-sm">
                <div class="flex items-center justify-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                    <?php echo htmlspecialchars($error_message); ?>
                </div>
            </div>
        <?php endif; ?>
        <div>
            <label for="username" class="text-sm font-medium text-slate-700" data-lang="username">Username:</label>
            <div class="relative">
                <input type="text" id="username" name="username" class="input-box pl-10" required>
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                </div>
            </div>
        </div>
        <div>
            <label for="password" class="text-sm font-medium text-slate-700" data-lang="password">Password:</label>
            <div class="relative">
                <input type="password" id="password" name="password" class="input-box pl-10" required>
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                </div>
            </div>
        </div>
        <button type="submit" class="btn-primary" data-lang="login-btn">Login</button>
        <p class="text-center text-sm text-slate-600"><a class="text-indigo-600 hover:underline" href="business-recommender/auth/register.php" data-lang="register-here">Register here</a> — <span data-lang="no-account">Don't have an account?</span></p>
        <p class="text-center text-sm text-slate-600 mt-2"><a class="text-indigo-600 hover:underline" href="business-recommender/auth/forgot_password.php">Forgot password?</a></p>
    </form>
    </body>
    <script src="scripts.js"></script>
    <script>
        // Language toggle initialization using global functions from scripts.js
        document.addEventListener("DOMContentLoaded", function() {
            // Initialize language on page load
            initializeLanguage();
        });
    </script>
    </html>
