-- Basotho Business Recommender Database Export
-- Generated: 2024
-- This file contains the database schema and sample data for the project

-- Create database
CREATE DATABASE IF NOT EXISTS business_recommender;
USE business_recommender;

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Recommendations table
CREATE TABLE recommendations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    skills TEXT NOT NULL,
    interests TEXT NOT NULL,
    capital VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    availability VARCHAR(50) NOT NULL,
    problem_solved TEXT,
    business_title VARCHAR(255),
    business_description TEXT,
    reason_for_fit TEXT,
    estimated_capital VARCHAR(255),
    suggested_schedule TEXT,
    language VARCHAR(10) DEFAULT 'en',
    rating INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at),
    INDEX idx_rating (rating)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Business feedback table
CREATE TABLE business_feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    idea TEXT NOT NULL,
    feedback TEXT NOT NULL,
    rating INT DEFAULT NULL,
    skills TEXT,
    interests TEXT,
    capital VARCHAR(255),
    location VARCHAR(255),
    availability VARCHAR(50),
    language VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id_feedback (user_id),
    INDEX idx_created_at_feedback (created_at),
    INDEX idx_rating_feedback (rating)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample data for testing
INSERT INTO users (username, password, email) VALUES
('testuser', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'test@example.com');

INSERT INTO recommendations (user_id, skills, interests, capital, location, availability, problem_solved, business_title, business_description, reason_for_fit, estimated_capital, suggested_schedule, language) VALUES
(1, 'Cooking', 'Technology', 'M5000', 'Maseru', 'full-time', 'Busy Basotho in Maseru often seek quick, affordable, and delicious hot meals or snacks during their day. This business provides convenient access to popular local street food.', 'Lekunutu La Mphos Kasi Bites', 'This business involves operating a mobile food stall selling freshly made vetkoek with various fillings (e.g., mince, polony, atchar) and Sphatlho (Kota). You would target high-traffic areas such as taxi ranks, bus stops, informal markets, and busy pedestrian zones in Maseru. Your cooking skill is directly applied, and your interest in technology can be used for taking pre-orders via WhatsApp or promoting daily specials on community groups.', 'High Demand: Street food is a staple in Maseru, offering affordable and satisfying options. Low Overhead: A mobile setup avoids costly commercial rent. Direct Skill Use: Directly leverages your cooking expertise. Capital Efficiency: M5000 is sufficient for essential equipment and initial stock. Tech Integration: Easy to use a smartphone for marketing, customer communication, and orders.', 'M4,950', 'Licenses/Permits (M500): Small Business Trading License (Maseru City Council): M300 Health & Hygiene Permit (Local Health Authority): M200 Equipment/Tools (M3,000): Single-burner gas stove + 9kg gas cylinder (new/refill): M1,200 (Cylinder M800, Stove M400) Large Pot (for deep frying/stew): M350 Frying Pan (for fillings): M200 Cooking Utensils (spoons, spatulas, knives): M250 Cooler Box (for cooked food/ingredients): M400 Folding Table/Stand: M350 Serving Tongs, bowls, plastic containers for fillings: M200 Apron, hairnet: M100 Initial Stock (1-2 weeks) (M1,600): Flour, Yeast, Oil, Sugar, Salt (for Vetkoek): M500 Mince, Polony, Atchar, Cheese, Buns (for fillings/Sphatlho): M800 Takeaway packaging (paper bags, serviettes): M300 Marketing/Misc (M250): Simple Banner/Signage: M150 WhatsApp data/airtime (initial marketing/orders): M100 Working Capital (1 month - for refills, daily stock, transport, unforeseen): M1,500 TOTAL: M4,950', 'en');

INSERT INTO business_feedback (user_id, idea, feedback, skills, interests, capital, location, availability, language) VALUES
(1, 'Start a cooking school', 'This is a promising business idea with good potential in Maseru. Here are the key considerations: **Risk**: Competition from existing schools, seasonal demand fluctuations, initial setup costs. **Market Potential**: Growing interest in culinary education, target youth and adults, potential for partnerships with hotels. **Profitability**: Revenue from course fees, potential for materials sales, break-even within 6 months. **Feasibility**: Requires teaching experience, classroom space, equipment. **Sustainability**: Long-term demand for skilled chefs, potential for expansion.', 'Cooking', 'Technology', 'M5000', 'Maseru', 'full-time', 'en');

COMMIT;
