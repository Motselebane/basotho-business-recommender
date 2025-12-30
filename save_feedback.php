<?php
/**
 * Endpoint to save business feedback with rating
 * Stores feedback immediately when generated
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

try {
    require_once __DIR__ . '/auth/db_config.php';

    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        throw new Exception('Invalid JSON input');
    }

    $user_id = isset($input['user_id']) ? intval($input['user_id']) : 0;
    $idea = isset($input['idea']) ? trim($input['idea']) : '';
    $feedback = isset($input['feedback']) ? trim($input['feedback']) : '';
    $rating = isset($input['rating']) ? intval($input['rating']) : null;
    $skills = isset($input['skills']) ? trim($input['skills']) : '';
    $interests = isset($input['interests']) ? trim($input['interests']) : '';
    $capital = isset($input['capital']) ? trim($input['capital']) : '';
    $location = isset($input['location']) ? trim($input['location']) : '';
    $availability = isset($input['availability']) ? trim($input['availability']) : '';
    $language = isset($input['language']) ? trim($input['language']) : 'en';

    // Validation
    if ($user_id <= 0) {
        throw new Exception('Invalid user_id');
    }

    if (empty($idea)) {
        throw new Exception('Idea is required');
    }

    if (empty($feedback)) {
        throw new Exception('Feedback is required');
    }

    if ($rating !== null && ($rating < 1 || $rating > 5)) {
        throw new Exception('Rating must be between 1 and 5');
    }

    // Insert feedback
    $stmt = $conn->prepare("INSERT INTO business_feedback 
        (user_id, idea, feedback, rating, skills, interests, capital, location, availability, language) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    
    if (!$stmt) {
        throw new Exception('Prepare failed: ' . $conn->error);
    }

    $stmt->bind_param('isssisssss', 
        $user_id, 
        $idea, 
        $feedback, 
        $rating, 
        $skills, 
        $interests, 
        $capital, 
        $location, 
        $availability, 
        $language
    );

    if (!$stmt->execute()) {
        throw new Exception('Execute failed: ' . $stmt->error);
    }

    $feedback_id = $stmt->insert_id;
    $stmt->close();

    echo json_encode([
        'success' => true,
        'feedback_id' => $feedback_id,
        'message' => 'Feedback saved successfully'
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
} finally {
    if (isset($stmt) && $stmt instanceof mysqli_stmt) {
        $stmt->close();
    }
    if (isset($conn) && $conn instanceof mysqli) {
        $conn->close();
    }
}
?>
