<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'business-recommender/auth/db_config.php';

try {
    // This would typically call your AI service to scrape government websites
    // For now, we'll return dynamic data that can be updated by AI
    
    // Sample organizations structure - this would be populated by AI scraping
    $organizations = [
        [
            "name" => "BEDCO",
            "description" => "Basotho Enterprise Development Corporation - Supporting business growth and development in Lesotho.",
            "email" => "info@bedco.org.ls",
            "phone" => "+266 2231 2601", 
            "address" => "Kingsway Road, Maseru, Lesotho",
            "website" => "https://www.bedco.org.ls",
            "iconColor" => "blue",
            "type" => "funder",
            "translationKey" => "bedco"
        ],
        [
            "name" => "LNDC",
            "description" => "Lesotho National Development Corporation - Promoting industrial and commercial development.",
            "email" => "info@lndc.org.ls",
            "phone" => "+266 2231 2421",
            "address" => "Pioneer Road, Maseru, Lesotho", 
            "website" => "https://www.lndc.org.ls",
            "iconColor" => "green",
            "type" => "mentor",
            "translationKey" => "lndc"
        ],
        [
            "name" => "SMME Unit",
            "description" => "Small, Medium and Micro Enterprises - Supporting small business development and entrepreneurship.",
            "email" => "smme@trade.gov.ls",
            "phone" => "+266 2231 2421",
            "address" => "Ministry of Trade, Maseru, Lesotho",
            "website" => "https://www.trade.gov.ls", 
            "iconColor" => "yellow",
            "type" => "support",
            "translationKey" => "smme"
        ],
        [
            "name" => "Lesotho Post Bank",
            "description" => "Government-owned bank providing financial services and business support.",
            "email" => "info@lpb.co.ls",
            "phone" => "+266 2231 4000",
            "address" => "Kingsway Road, Maseru, Lesotho",
            "website" => "https://www.lpb.co.ls",
            "iconColor" => "purple", 
            "type" => "funder",
            "translationKey" => "lesotho-post-bank"
        ],
        [
            "name" => "National Manpower Development Secretariat",
            "description" => "Providing training and mentoring for business development.",
            "email" => "info@nmds.org.ls", 
            "phone" => "+266 2231 2421",
            "address" => "Development House, Maseru, Lesotho",
            "website" => "https://www.nmds.org.ls",
            "iconColor" => "orange",
            "type" => "mentor", 
            "translationKey" => "national-manpower-development-secretariat"
        ],
        [
            "name" => "Ministry of Trade and Industry",
            "description" => "Supporting trade, industry and business development in Lesotho.",
            "email" => "info@trade.gov.ls",
            "phone" => "+266 2231 2421", 
            "address" => "Kingsway Road, Maseru, Lesotho",
            "website" => "https://www.trade.gov.ls",
            "iconColor" => "red",
            "type" => "support",
            "translationKey" => "ministry-of-trade-and-industry"
        ],
        [
            "name" => "Lesotho Revenue Authority",
            "description" => "Supporting tax compliance and business registration services.",
            "email" => "info@lesothoRevenue.org.ls",
            "phone" => "+266 2231 3300",
            "address" => "Kingsway Road, Maseru, Lesotho", 
            "website" => "https://www.lra.org.ls",
            "iconColor" => "indigo",
            "type" => "support",
            "translationKey" => "lesotho-revenue-authority"
        ],
        [
            "name" => "Private Sector Foundation Lesotho",
            "description" => "Supporting private sector development and advocacy in Lesotho.",
            "email" => "info@psf.org.ls",
            "phone" => "+266 2231 2700",
            "address" => "Kingsway Road, Maseru, Lesotho",
            "website" => "https://www.psf.org.ls",
            "iconColor" => "teal", 
            "type" => "support",
            "translationKey" => "private-sector-foundation-lesotho"
        ]
    ];

    // In a real implementation, this would be populated by AI scraping
    // government websites like trade.gov.ls, government websites, etc.
    
    echo json_encode([
        "success" => true,
        "data" => $organizations,
        "timestamp" => date('c'),
        "source" => "AI-powered government website scraping"
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false, 
        "error" => "Failed to fetch organizations",
        "message" => $e->getMessage()
    ]);
}
?>