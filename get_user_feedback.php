<?php
/**
 * Endpoint to fetch user's previous business feedback
 * Returns all feedback entries for the logged-in user
 */

// Prevent any output before headers
ob_start();

// Set headers
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    ob_end_clean();
    http_response_code(204);
    exit(0);
}

// Initialize response array
$response = [
    'success' => false,
    'error' => 'Unknown error occurred',
    'count' => 0,
    'feedbacks' => []
];

try {
    // Include database configuration
    require_once __DIR__ . '/auth/db_config.php';

    // Get user_id from query parameter
    $user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;

    if ($user_id <= 0) {
        throw new Exception('Invalid user_id');
    }

    // Fetch all feedback for this user, ordered by most recent first
    $stmt = $conn->prepare("SELECT 
        id,
        idea,
        feedback,
        rating,
        skills,
        interests,
        capital,
        location,
        availability,
        language,
        created_at,
        updated_at
    FROM business_feedback 
    WHERE user_id = ? 
    ORDER BY created_at DESC");
    
    if (!$stmt) {
        throw new Exception('Prepare failed: ' . $conn->error);
    }

    $stmt->bind_param('i', $user_id);

    if (!$stmt->execute()) {
        throw new Exception('Execute failed: ' . $stmt->error);
    }

    $result = $stmt->get_result();
    $feedbacks = [];

    while ($row = $result->fetch_assoc()) {
        $feedbacks[] = [
            'id' => intval($row['id']),
            'idea' => $row['idea'],
            'feedback' => $row['feedback'],
            'rating' => $row['rating'] ? intval($row['rating']) : null,
            'skills' => $row['skills'],
            'interests' => $row['interests'],
            'capital' => $row['capital'],
            'location' => $row['location'],
            'availability' => $row['availability'],
            'language' => $row['language'],
            'created_at' => $row['created_at'],
            'updated_at' => $row['updated_at']
        ];
    }

    // Build successful response
    $response = [
        'success' => true,
        'count' => count($feedbacks),
        'feedbacks' => array_map(function($feedback) {
            // Clean and encode each feedback item
            return array_map(function($value) {
                if ($value === null) return null;
                if (is_numeric($value)) return is_float($value) ? (float)$value : (int)$value;
                if (is_bool($value)) return $value;
                
                // Handle string values
                $value = (string)$value;
                // Remove any control characters except newlines and tabs
                return preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value);
            }, $feedback);
        }, $feedbacks)
    ];
    
    $stmt->close();

} catch (Exception $e) {
    error_log('Error in get_user_feedback.php: ' . $e->getMessage());
    http_response_code(500);
    $response = [
        'success' => false,
        'error' => 'An error occurred while processing your request.',
        'count' => 0,
        'feedbacks' => []
    ];
}

// Clean any output buffers
while (ob_get_level() > 0) {
    ob_end_clean();
}

// Set JSON header
header('Content-Type: application/json; charset=utf-8');

// Output the JSON response
echo json_encode($response, 
    JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | 
    JSON_HEX_AMP | JSON_UNESCAPED_UNICODE | 
    JSON_UNESCAPED_SLASHES | 
    JSON_PRESERVE_ZERO_FRACTION
);

// Close database connection if it's still open
if (isset($conn) && $conn instanceof mysqli) {
    $conn->close();
}

// Make sure no other output is sent
exit(0);
?>
