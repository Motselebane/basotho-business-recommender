<?php
// Minimal password reset request form (non-destructive to existing auth)
// This page lets a user request a password reset link via email.

// No server-side logic here beyond rendering the form; submission goes to request_password_reset.php
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Forgot Password</title>
  <link rel="stylesheet" href="auth.css">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = { corePlugins: { preflight: false } }
  </script>
  <style>
    body {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      font-family: 'Inter', sans-serif;
    }
    .container {
      max-width: 420px;
      margin: 40px auto;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      padding: 30px;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .title {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 12px;
      color: #1f2937;
      text-align: center;
    }
    .desc {
      font-size: 0.95rem;
      color: #6b7280;
      margin-bottom: 24px;
      text-align: center;
      line-height: 1.5;
    }
    .input-box {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      outline: none;
      box-sizing: border-box;
      font-size: 1rem;
      transition: all 0.2s ease;
      background: #ffffff;
    }
    .input-box:focus {
      border-color: #4f46e5;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
    }
    .btn-primary {
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      color: #fff;
      border: none;
      padding: 12px 16px;
      border-radius: 12px;
      cursor: pointer;
      width: 100%;
      font-size: 1rem;
      font-weight: 600;
      transition: all 0.2s ease;
      box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
    }
    .btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(79, 70, 229, 0.4);
    }
    .mt-2 { margin-top: 0.5rem; }
    .mt-4 { margin-top: 1rem; }
    .text-sm { font-size: 0.875rem; }
    .text-center { text-align: center; }
    .lang-toggle {
      background: rgba(255, 255, 255, 0.9);
      color: #4f46e5;
      border: 1px solid rgba(79, 70, 229, 0.3);
      padding: 8px 20px;
      border-radius: 25px;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.2s ease;
      font-weight: 500;
      backdrop-filter: blur(5px);
    }
    .lang-toggle:hover {
      background: rgba(255, 255, 255, 1);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .form-group {
      margin-bottom: 20px;
    }
    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #374151;
    }
    .back-link {
      color: #4f46e5;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s ease;
    }
    .back-link:hover {
      color: #7c3aed;
    }
    .icon-container {
      text-align: center;
      margin-bottom: 20px;
    }
    .reset-icon {
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 24px rgba(79, 70, 229, 0.3);
    }
  </style>
</head>
<body>
  <div class="container">
    <div style="text-align: center; margin-bottom: 1rem;">
      <button type="button" id="langToggle" class="lang-toggle">Sesotho</button>
    </div>

    <div class="icon-container">
      <div class="reset-icon">
        <svg width="32" height="32" fill="none" stroke="white" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
        </svg>
      </div>
    </div>

    <div class="title" data-lang="forgot-password-title">Forgot your password?</div>
    <div class="desc" data-lang="forgot-password-desc">Enter your account email. We'll send you a link to reset your password.</div>

    <form action="request_password_reset.php" method="POST">
      <div class="form-group">
        <label class="text-sm" for="email" data-lang="email-label">Email</label>
        <div style="position: relative;">
          <input class="input-box" type="email" id="email" name="email" placeholder="you@example.com" required />
          <div style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); pointer-events: none;">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #9ca3af;">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="mt-4 text-center">
        <button class="btn-primary" type="submit" data-lang="send-reset-link">Send reset link</button>
      </div>
    </form>

    <div class="mt-4 text-center text-sm">
      <a href="../../index.php" class="back-link" data-lang="back-to-login">← Back to Login</a>
    </div>
  </div>
  <script src="../../scripts.js"></script>
  <script>
    // Language toggle initialization
    document.addEventListener("DOMContentLoaded", function() {
      initializeLanguage();
    });
  </script>
</body>
</html>
