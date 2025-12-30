<?php
// New endpoint: Update rating for a recommendation without altering existing logic
// - Ensures rating column exists (INT, nullable)
// - Validates rating (1..5)
// - Updates existing recommendation row by id
// - Returns JSON { success: bool, error?: string }

header('Content-Type: application/json');

try {
    // Reuse existing DB config (do not modify)
    require_once __DIR__ . '/auth/db_config.php';

    // Ensure rating column exists (portable check)
    $colCheckSql = "SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'recommendations' AND COLUMN_NAME = 'rating'";
    if ($colStmt = $conn->prepare($colCheckSql)) {
        $dbName = $db_name; // from db_config.php
        $colStmt->bind_param('s', $dbName);
        if ($colStmt->execute()) {
            $colStmt->store_result();
            if ($colStmt->num_rows === 0) {
                // Add column only if missing
                $conn->query("ALTER TABLE recommendations ADD COLUMN rating INT NULL");
            }
        }
        $colStmt->close();
    }

    // Accept both JSON and form submissions
    $input = [];
    if ($_SERVER['CONTENT_TYPE'] ?? '' === 'application/json') {
        $raw = file_get_contents('php://input');
        $input = json_decode($raw, true) ?: [];
    } else {
        $input = $_POST + $_GET; // fallback; GET only for testing
    }

    $id = isset($input['id']) ? intval($input['id']) : 0;
    $rating = isset($input['rating']) ? intval($input['rating']) : 0;

    if ($id <= 0) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid recommendation id']);
        exit;
    }

    if ($rating < 1 || $rating > 5) {
        http_response_code(422);
        echo json_encode(['success' => false, 'error' => 'Rating must be between 1 and 5']);
        exit;
    }

    // Update the recommendation row; do not insert a new one
    $stmt = $conn->prepare("UPDATE recommendations SET rating = ? WHERE id = ?");
    if (!$stmt) {
        throw new Exception('Prepare failed: ' . $conn->error);
    }
    $stmt->bind_param('ii', $rating, $id);
    if (!$stmt->execute()) {
        throw new Exception('Execute failed: ' . $stmt->error);
    }

    echo json_encode(['success' => true]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
} finally {
    if (isset($stmt) && $stmt instanceof mysqli_stmt) { $stmt->close(); }
    if (isset($conn) && $conn instanceof mysqli) { $conn->close(); }
}
