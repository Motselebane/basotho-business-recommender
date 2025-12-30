<?php
// Test script to verify password reset URL construction
// This helps debug URL generation issues

echo "<!DOCTYPE html><html><head><title>Test Reset URL</title>";
echo "<style>body{font-family:Arial;padding:20px;max-width:800px;margin:0 auto;} .box{background:#f3f4f6;padding:15px;border-radius:8px;margin:10px 0;} .success{background:#d1fae5;color:#065f46;} .info{background:#dbeafe;color:#1e40af;} code{background:#1f2937;color:#10b981;padding:2px 6px;border-radius:4px;}</style>";
echo "</head><body>";
echo "<h1>Password Reset URL Test</h1>";

// Simulate URL construction
$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host = $_SERVER['HTTP_HOST'] ?? 'localhost';
$scriptPath = $_SERVER['SCRIPT_NAME'];
$authPath = dirname(dirname($scriptPath)) . '/auth'; // auth directory path
// URL-encode the path to handle spaces (Business Ideas -> Business%20Ideas)
$authPathEncoded = str_replace(' ', '%20', $authPath);

$testToken = 'test_token_12345';
$testEmail = 'user@example.com';
$resetUrl = $scheme . '://' . $host . $authPathEncoded . '/reset_password.php?token=' . urlencode($testToken) . '&email=' . urlencode($testEmail);

echo "<div class='box info'>";
echo "<strong>Current Script Path:</strong><br>";
echo "<code>" . htmlspecialchars($scriptPath) . "</code>";
echo "</div>";

echo "<div class='box info'>";
echo "<strong>Auth Directory Path:</strong><br>";
echo "<code>" . htmlspecialchars($authPath) . "</code>";
echo "</div>";

echo "<div class='box success'>";
echo "<strong>Generated Reset URL:</strong><br>";
echo "<code>" . htmlspecialchars($resetUrl) . "</code>";
echo "</div>";

echo "<div class='box'>";
echo "<strong>Test Reset Link:</strong><br>";
echo "<a href='" . htmlspecialchars($resetUrl) . "' target='_blank'>Click to test reset page</a>";
echo "<p style='font-size:0.9em;color:#6b7280;'>Note: This will fail validation because the token isn't real, but you should see the reset password form, not a 404 error.</p>";
echo "</div>";

// Check if reset_password.php exists
$resetFilePath = dirname(__DIR__) . '/auth/reset_password.php';
echo "<div class='box'>";
echo "<strong>File Check:</strong><br>";
if (file_exists($resetFilePath)) {
    echo "✅ <code>reset_password.php</code> exists at: <code>" . htmlspecialchars($resetFilePath) . "</code>";
} else {
    echo "❌ <code>reset_password.php</code> NOT FOUND at: <code>" . htmlspecialchars($resetFilePath) . "</code>";
}
echo "</div>";

echo "<p><a href='auth/forgot_password.php'>← Back to Forgot Password</a> | <a href='index.php'>Login</a></p>";
echo "</body></html>";
?>
