<?php
// New endpoint: Get latest recommendation id for a given user_id
// Input (JSON or form): { user_id: number }
// Output JSON: { success: true, id: <number> } or { success: false, error: <msg> }

header('Content-Type: application/json');

try {
    require_once __DIR__ . '/auth/db_config.php';

    // Accept JSON or form
    $input = [];
    $contentType = isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : '';
    if (stripos($contentType, 'application/json') !== false) {
        $raw = file_get_contents('php://input');
        $input = json_decode($raw, true) ?: [];
    } else {
        $input = $_POST + $_GET;
    }

    $userId = isset($input['user_id']) ? intval($input['user_id']) : 0;
    if ($userId <= 0) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid user_id']);
        exit;
    }

    // Fetch latest recommendation id for this user
    // Prefer created_at if available, otherwise fallback to id DESC
    $sql = "SELECT id FROM recommendations WHERE user_id = ? ORDER BY id DESC LIMIT 1";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        throw new Exception('Prepare failed: ' . $conn->error);
    }
    $stmt->bind_param('i', $userId);
    if (!$stmt->execute()) {
        throw new Exception('Execute failed: ' . $stmt->error);
    }
    $stmt->bind_result($id);
    if ($stmt->fetch() && !empty($id)) {
        echo json_encode(['success' => true, 'id' => intval($id)]);
    } else {
        echo json_encode(['success' => true, 'id' => 0]);
    }
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
} finally {
    if (isset($stmt) && $stmt instanceof mysqli_stmt) { $stmt->close(); }
    if (isset($conn) && $conn instanceof mysqli) { $conn->close(); }
}
