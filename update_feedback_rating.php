<?php
/**
 * Endpoint to update rating for a business feedback entry
 * Allows users to rate their feedback later
 */

// Start output buffering
ob_start();

// Set headers
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Initialize response array
$response = [
    'success' => false,
    'message' => '',
    'error' => ''
];

try {
    // Handle preflight
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        ob_end_clean();
        http_response_code(204);
        exit(0);
    }

    // Get JSON input
    $json = file_get_contents('php://input');
    $input = json_decode($json, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Invalid JSON input: ' . json_last_error_msg());
    }

    if ($input === null) {
        throw new Exception('No input data received');
    }

    $feedback_id = isset($input['feedback_id']) ? intval($input['feedback_id']) : 0;
    $rating = isset($input['rating']) ? intval($input['rating']) : 0;
    $user_id = isset($input['user_id']) ? intval($input['user_id']) : 0;

    // Validation
    if ($feedback_id <= 0) {
        throw new Exception('Invalid feedback_id');
    }

    if ($rating < 1 || $rating > 5) {
        throw new Exception('Rating must be between 1 and 5');
    }

    if ($user_id <= 0) {
        throw new Exception('Invalid user_id');
    }

    // Include database configuration
    require_once __DIR__ . '/auth/db_config.php';

    // Update rating only if the feedback belongs to this user
    $stmt = $conn->prepare("UPDATE business_feedback 
        SET rating = ?, updated_at = NOW() 
        WHERE id = ? AND user_id = ?");
    
    if (!$stmt) {
        throw new Exception('Database prepare failed: ' . $conn->error);
    }

    $stmt->bind_param('iii', $rating, $feedback_id, $user_id);

    if (!$stmt->execute()) {
        throw new Exception('Database execute failed: ' . $stmt->error);
    }

    if ($stmt->affected_rows === 0) {
        throw new Exception('Feedback not found or you do not have permission to update it');
    }

    // Build success response
    $response = [
        'success' => true,
        'message' => 'Rating updated successfully',
        'rating' => $rating
    ];

} catch (Exception $e) {
    http_response_code(500);
    $response = [
        'success' => false,
        'error' => $e->getMessage()
    ];
} finally {
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

    // Close database connections if they exist
    if (isset($stmt) && $stmt instanceof mysqli_stmt) {
        $stmt->close();
    }
    if (isset($conn) && $conn instanceof mysqli) {
        $conn->close();
    }
    
    // Make sure no other output is sent
    exit(0);
}
?>
