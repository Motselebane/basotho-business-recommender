**Basotho Business Recommender System**
  An AI-powered web-based business idea recommender system designed to support aspiring entrepreneurs in Lesotho by suggesting viable and context-aware business opportunities based on user inputs such as skills, interests, capital, and location.

**Project Overview**
Many aspiring entrepreneurs in Lesotho face challenges in identifying sustainable and profitable business ideas due to limited access to guidance, mentorship, and data-driven decision support.
This system addresses that gap by using AI-assisted recommendations to guide users toward suitable business opportunities, thereby promoting entrepreneurship, innovation, and job creation.

**Objectives**
Recommend suitable business ideas based on user inputs
Support informed entrepreneurial decision-making
Promote youth entrepreneurship and self-employment in Lesotho
Demonstrate practical application of AI in business support systems

**Key Features**
User registration and authentication
AI-powered business idea recommendation
Business idea rating and feedback system
Admin management of users and business ideas
Web-based interface accessible via a browser
Integration with Google Gemini API for AI-generated recommendations

**Technologies Used**
**Frontend & Web Layer**
  PHP
  HTML, CSS, JavaScript
  Apache (via XAMPP)

**Backend & AI Laye**r
  Node.js
  Google Gemini API

**Database**
 MySQL

**System Architecture**

The system follows a hybrid architecture:
A PHP-based web frontend handles user interaction and authentication.
A Node.js backend server processes AI-related requests and communicates with the Google Gemini API.
A MySQL database stores users, business ideas, and feedback data.

** Running the Project Locally
Prerequisites**

Ensure the following are installed:

1.Node.js v16 or higher (tested with v18.17.0)
2.MySQL 8.0 or higher (tested with v8.0.34)
3.XAMPP (Apache + PHP)
4.Internet connection (required for AI API and styling resources)

Installation Steps

1.Clone or download the project repository.
2.Move the project folder to:
  C:\xampp\htdocs\Business Ideas


3.Open Command Prompt in the project root directory.

4.Install Node.js dependencies:
   npm install


5. Create a .env file in the root directory and add:

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=business_recommender
SESSION_SECRET=your_secure_random_session_secret_here
GOOGLE_API_KEY=your_google_gemini_api_key_here


6.Start MySQL from the XAMPP Control Panel.

7.Import the database:

Open phpMyAdmin
Create a database named business_recommender
 Import database.sql from the database/ folder

8.Run the Node.js server:
   node server.js

The server will run on:
  http://localhost:3000


9.Start Apache from the XAMPP Control Panel.

10. Open your browser and access the application:

http://localhost/Business%20Ideas/index.php

**How to Use the System**

Register or log in as a user.

Enter your skills, interests, available capital, and location.

Receive AI-generated business recommendations.

Rate and provide feedback on suggested business ideas.

**Troubleshooting
Port 3000 already in use**
netstat -ano | findstr :3000
taskkill /PID <PID> /F

**Database connection errors**

Ensure MySQL is running

Verify database credentials in the .env file

**Google Gemini API errors**

Confirm that GOOGLE_API_KEY is valid and active

**PHP not loading**

Ensure Apache is running

Confirm mod_php is enabled in XAMPP

** Future Enhancements**

Advanced machine learning models for improved recommendations

Mobile application version

Integration with government and funding support platforms

Business performance tracking and analytics

Multi-language support

**Author**
**Lethole Motselebane**
Final-year Computing Student | Software & Web Development
Basotho Business Recommender System

**Acknowledgements**

Google Gemini API

Open-source PHP and Node.js communities

Academic resources on recommender systems and entrepreneurship
