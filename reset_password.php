<?php
// Verifies reset token and lets the user set a new password.
require 'db_config.php';

function render_form($email, $token, $error = '') {
    echo '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
    echo '<title>Reset Password</title><link rel="stylesheet" href="auth.css">';
    echo '<script src="https://cdn.tailwindcss.com"></script>';
    echo '<script>tailwind.config = { corePlugins: { preflight: false } }</script>';
    echo '<style>.container{max-width:420px;margin:40px auto;background:#fff;padding:20px;border-radius:12px;box-shadow:0 6px 20px rgba(0,0,0,0.08);} .input-box{width:100%;padding:10px 12px;border:1px solid #e5e7eb;border-radius:8px;outline:none;box-sizing:border-box;} .btn-primary{background:#4f46e5;color:#fff;border:none;padding:10px 14px;border-radius:8px;cursor:pointer;width:100%;} .btn-primary:hover{background:#4338ca;} .mt-2{margin-top:.5rem;} .mt-4{margin-top:1rem;} .text-sm{font-size:.875rem;} .err{color:#dc2626;margin-bottom:10px;background:#fef2f2;padding:12px;border-radius:8px;} .lang-toggle{background:#eef2ff;color:#4f46e5;border:1px solid #c7d2fe;padding:6px 16px;border-radius:20px;font-size:0.875rem;cursor:pointer;transition:all 0.2s;} .lang-toggle:hover{background:#e0e7ff;} .form-title{font-size:1.25rem;font-weight:600;margin-bottom:16px;text-align:center;}</style>';
    echo '</head><body><div class="container">';
    echo '<div style="text-align:center;margin-bottom:1rem;"><button type="button" id="langToggle" class="lang-toggle">Sesotho</button></div>';
    echo '<h2 class="form-title" data-lang="reset-password-title">Reset Your Password</h2>';
    if ($error) {
        // Check if error contains HTML tags (data-lang), if so don't escape
        if (strpos($error, '<span') !== false) {
            echo '<div class="err">' . $error . '</div>';
        } else {
            echo '<div class="err">' . htmlspecialchars($error) . '</div>';
        }
    }
    echo '<form method="POST" action="reset_password.php">';
    echo '<input type="hidden" name="email" value="' . htmlspecialchars($email) . '">';
    echo '<input type="hidden" name="token" value="' . htmlspecialchars($token) . '">';
    echo '<label class="text-sm" data-lang="new-password-label">New Password</label>'; 
    echo '<input class="input-box mt-2" type="password" name="password" required>'; 
    echo '<label class="text-sm mt-4" data-lang="confirm-password-label">Confirm Password</label>'; 
    echo '<input class="input-box mt-2" type="password" name="confirm_password" required>'; 
    echo '<div class="mt-4" style="text-align:center;"><button class="btn-primary" type="submit" data-lang="reset-password-btn">Reset Password</button></div>';
    echo '</form></div>';
    echo '<script src="../../scripts.js"></script><script>document.addEventListener("DOMContentLoaded", function() { initializeLanguage(); });</script>';
    echo '</body></html>';
    exit;
}

function respond($msg, $allowHtml = false) {
    echo '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Password Reset</title><link rel="stylesheet" href="auth.css">';
    echo '<script src="https://cdn.tailwindcss.com"></script><script>tailwind.config = { corePlugins: { preflight: false } }</script>';
    echo '<style>.container{max-width:420px;margin:40px auto;background:#fff;padding:20px;border-radius:12px;box-shadow:0 6px 20px rgba(0,0,0,0.08);} .lang-toggle{background:#eef2ff;color:#4f46e5;border:1px solid #c7d2fe;padding:6px 16px;border-radius:20px;font-size:0.875rem;cursor:pointer;transition:all 0.2s;} .lang-toggle:hover{background:#e0e7ff;}</style>';
    echo '</head><body><div class="container">';
    echo '<div style="text-align:center;margin-bottom:1rem;"><button type="button" id="langToggle" class="lang-toggle">Sesotho</button></div>';
    echo '<div style="font-size:1rem; color:#111827;">' . ($allowHtml ? $msg : htmlspecialchars($msg)) . '</div>';
    echo '<div style="margin-top:16px;"><a href="forgot_password.php" data-lang="back-to-forgot">Back</a> | <a href="../../index.php" data-lang="back-to-login">Back to Login</a></div>';
    echo '</div>';
    echo '<script src="../../scripts.js"></script><script>document.addEventListener("DOMContentLoaded", function() { initializeLanguage(); });</script>';
    echo '</body></html>';
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $email = isset($_GET['email']) ? trim($_GET['email']) : '';
    $token = isset($_GET['token']) ? trim($_GET['token']) : '';
    if ($email === '' || $token === '') {
        respond('<span data-lang="invalid-reset-link">Invalid or expired reset link.</span>', true);
    }
    render_form($email, $token);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $token = isset($_POST['token']) ? trim($_POST['token']) : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';
    $confirm = isset($_POST['confirm_password']) ? $_POST['confirm_password'] : '';

    if ($email === '' || $token === '') {
        respond('<span data-lang="invalid-reset-link">Invalid or expired reset link.</span>', true);
    }
    if ($password === '' || $confirm === '') {
        render_form($email, $token, 'Please fill in all fields.');
    }
    if ($password !== $confirm) {
        render_form($email, $token, '<span data-lang="passwords-do-not-match">Passwords do not match.</span>');
    }

    // Verify token
    $tokenHash = hash('sha256', $token);
    $valid = false;
    if ($stmt = $conn->prepare('SELECT 1 FROM password_resets WHERE email = ? AND token_hash = ? AND expires_at > NOW() LIMIT 1')) {
        $stmt->bind_param('ss', $email, $tokenHash);
        $stmt->execute();
        $stmt->bind_result($one);
        if ($stmt->fetch()) $valid = true;
        $stmt->close();
    }

    if (!$valid) {
        respond('<span data-lang="invalid-reset-link">Invalid or expired reset link.</span>', true);
    }

    // Update user password to new hash (consistent with register.php - using PASSWORD_DEFAULT)
    $hash = password_hash($password, PASSWORD_DEFAULT);
    if ($stmt = $conn->prepare('UPDATE users SET password = ? WHERE email = ?')) {
        $stmt->bind_param('ss', $hash, $email);
        $stmt->execute();
        $stmt->close();
    }

    // Invalidate token(s) for this email
    $conn->query("DELETE FROM password_resets WHERE email = '" . $conn->real_escape_string($email) . "'");

    respond('<span data-lang="password-reset-success">Your password has been reset successfully! You can now log in with your new password.</span>', true);
}

respond('<span data-lang="invalid-reset-link">Invalid or expired reset link.</span>', true);
