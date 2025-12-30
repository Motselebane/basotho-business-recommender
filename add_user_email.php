<?php
// Simple page for users to add/update their email address
session_start();
require 'auth/db_config.php';

// Check if user is logged in
if (!isset($_SESSION['username'])) {
    header('Location: index.php');
    exit;
}

$username = $_SESSION['username'];
$message = '';
$currentEmail = '';

// Get current email if exists
if ($stmt = $conn->prepare('SELECT email FROM users WHERE username = ? LIMIT 1')) {
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $stmt->bind_result($email);
    if ($stmt->fetch()) {
        $currentEmail = $email ?? '';
    }
    $stmt->close();
}

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $newEmail = isset($_POST['email']) ? trim($_POST['email']) : '';
    
    if ($newEmail === '') {
        $message = '<div class="error">Please enter a valid email address.</div>';
    } elseif (!filter_var($newEmail, FILTER_VALIDATE_EMAIL)) {
        $message = '<div class="error">Please enter a valid email format.</div>';
    } else {
        // Update email
        if ($stmt = $conn->prepare('UPDATE users SET email = ? WHERE username = ?')) {
            $stmt->bind_param('ss', $newEmail, $username);
            if ($stmt->execute()) {
                $message = '<div class="success">Email updated successfully!</div>';
                $currentEmail = $newEmail;
            } else {
                if ($conn->errno === 1062) { // Duplicate entry
                    $message = '<div class="error">This email is already in use by another account.</div>';
                } else {
                    $message = '<div class="error">Failed to update email. Please try again.</div>';
                }
            }
            $stmt->close();
        }
    }
}

$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Update Email</title>
    <link rel="stylesheet" href="auth/auth.css">
    <style>
        .container {
            max-width: 480px;
            margin: 40px auto;
            background: #fff;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 6px 20px rgba(0,0,0,0.08);
        }
        .title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 8px;
            color: #111827;
        }
        .subtitle {
            font-size: 0.9rem;
            color: #6b7280;
            margin-bottom: 24px;
        }
        .input-box {
            width: 100%;
            padding: 12px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            outline: none;
            font-size: 1rem;
            box-sizing: border-box;
        }
        .input-box:focus {
            border-color: #4f46e5;
        }
        .btn-primary {
            background: #4f46e5;
            color: #fff;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1rem;
            width: 100%;
            margin-top: 16px;
        }
        .btn-primary:hover {
            background: #4338ca;
        }
        .success {
            background: #d1fae5;
            color: #065f46;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 16px;
        }
        .error {
            background: #fee2e2;
            color: #991b1b;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 16px;
        }
        .info {
            background: #dbeafe;
            color: #1e40af;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 16px;
            font-size: 0.9rem;
        }
        .back-link {
            display: block;
            margin-top: 16px;
            text-align: center;
            color: #4f46e5;
            text-decoration: none;
        }
        .back-link:hover {
            text-decoration: underline;
        }
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: #374151;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="title">Update Email Address</div>
        <div class="subtitle">Hello, <?php echo htmlspecialchars($username); ?>!</div>
        
        <?php if ($currentEmail === ''): ?>
            <div class="info">
                <strong>⚠️ No email on file</strong><br>
                Add your email address to enable password recovery and receive notifications.
            </div>
        <?php endif; ?>
        
        <?php echo $message; ?>
        
        <form method="POST" action="">
            <label for="email">Email Address</label>
            <input 
                type="email" 
                id="email" 
                name="email" 
                class="input-box" 
                placeholder="your@email.com"
                value="<?php echo htmlspecialchars($currentEmail); ?>"
                required
            />
            <button type="submit" class="btn-primary">
                <?php echo $currentEmail ? 'Update Email' : 'Add Email'; ?>
            </button>
        </form>
        
        <a href="dashboard.php" class="back-link">← Back to Dashboard</a>
    </div>
</body>
</html>
