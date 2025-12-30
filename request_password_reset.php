<?php
// Handles password reset requests: creates a reset token and emails the link.
// Minimal and isolated: uses existing db_config.php, no changes to current auth flow.

require 'db_config.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

function respond($msg, $allowHtml = false) {
    echo '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Password Reset</title>';
    echo '<link rel="stylesheet" href="auth.css"></head><body>';
    echo '<div class="container" style="max-width:420px; margin:40px auto; background:#fff; padding:20px; border-radius:12px; box-shadow:0 6px 20px rgba(0,0,0,0.08);">';
    echo '<div style="font-size:1rem; color:#111827;">' . ($allowHtml ? $msg : htmlspecialchars($msg)) . '</div>';
    echo '<div style="margin-top:16px;"><a href="forgot_password.php">Back</a></div>';
    echo '</div></body></html>';
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond('Invalid request method.');
}

$email = isset($_POST['email']) ? trim($_POST['email']) : '';
if ($email === '') {
    respond('Please provide your email address.');
}

// Ensure the users table has an email column; if not, exit gracefully with guidance.
$hasEmailColumn = false;
if ($desc = $conn->query("SHOW COLUMNS FROM users LIKE 'email'")) {
    if ($desc->num_rows > 0) { $hasEmailColumn = true; }
    $desc->close();
}
if (!$hasEmailColumn) {
    respond('Password recovery requires an email on file. Please add an email column to the users table and populate it for your accounts.');
}

// Check if user exists by email
$exists = false;
$userId = null;
if ($stmt = $conn->prepare('SELECT id FROM users WHERE email = ? LIMIT 1')) {
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $stmt->bind_result($uid);
    if ($stmt->fetch()) {
        $exists = true;
        $userId = $uid;
    }
    $stmt->close();
}

// Always respond success to avoid email enumeration, but only create token if user exists
if (!$exists) {
    // User doesn't exist, but show same message for security
    respond('If the email exists, a reset link has been sent. Please check your inbox.');
}

// Ensure password_resets table exists (safe, idempotent)
$conn->query(
    'CREATE TABLE IF NOT EXISTS password_resets (
        email VARCHAR(255) NOT NULL,
        token_hash CHAR(64) NOT NULL,
        expires_at DATETIME NOT NULL,
        INDEX (email),
        INDEX (token_hash)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4'
);

// Create token
$token = bin2hex(random_bytes(32));
$tokenHash = hash('sha256', $token);

// Expiry 60 minutes from now
if ($stmt = $conn->prepare('INSERT INTO password_resets (email, token_hash, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 60 MINUTE))')) {
    $stmt->bind_param('ss', $email, $tokenHash);
    $stmt->execute();
    $stmt->close();
}

// Build reset URL (adjust base path if your project path differs)
$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host = $_SERVER['HTTP_HOST'] ?? 'localhost';
$scriptPath = $_SERVER['SCRIPT_NAME']; // e.g., /Business Ideas/business-recommender/auth/request_password_reset.php
$authPath = dirname($scriptPath); // Get the auth directory path
// URL-encode the path to handle spaces (Business Ideas -> Business%20Ideas)
$authPathEncoded = str_replace(' ', '%20', $authPath);
$resetUrl = $scheme . '://' . $host . $authPathEncoded . '/reset_password.php?token=' . urlencode($token) . '&email=' . urlencode($email);

// Attempt to send email using PHPMailer with Gmail SMTP
$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'stephenmotselebane6@gmail.com'; // Your Gmail address
    $mail->Password = 'wzye jywn bhgk rnwj'; // Your Gmail app password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    $mail->SMTPDebug = 0; // Set to 2 for debugging, 0 for production
    $mail->CharSet = 'UTF-8';

    // Recipients
    $mail->setFrom('stephenmotselebane6@gmail.com', 'Basotho Business Recommender');
    $mail->addAddress($email);

    // Content
    $mail->isHTML(false);
    $mail->Subject = 'Password Reset Request';
    $mail->Body = "Hello,\n\nWe received a request to reset your password. Click the link below to set a new password:\n\n$resetUrl\n\nIf you did not request this, you can ignore this email.\n\nThanks.";

    if (!$mail->send()) {
        throw new Exception('Failed to send email: ' . $mail->ErrorInfo);
    }
    respond('<span data-lang="email-sent-success">Password reset email has been sent successfully! Please check your inbox (and spam folder).</span>', true);
} catch (Exception $e) {
    // If email fails, show detailed error for debugging
    $errorMsg = 'Email sending failed: ' . htmlspecialchars($e->getMessage());
    $errorMsg .= '<br><br><strong>Troubleshooting:</strong><ul style="text-align:left;">';
    $errorMsg .= '<li>Check if the Gmail app password is correct and active</li>';
    $errorMsg .= '<li>Ensure 2-factor authentication is enabled on your Gmail account</li>';
    $errorMsg .= '<li>Verify that less secure app access is not blocking the connection</li>';
    $errorMsg .= '<li>Check your PHP error logs for more details</li>';
    $errorMsg .= '</ul><p>Reset link for testing: <a href="' . htmlspecialchars($resetUrl) . '">Click here</a></p>';
    respond($errorMsg, true);
}
