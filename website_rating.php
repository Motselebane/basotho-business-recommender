<?php
// New endpoint: Display average website rating
// Output: JSON with rating number for translation support
// Safe: does not modify existing data or logic

header('Content-Type: application/json; charset=UTF-8');

try {
    require_once __DIR__ . '/auth/db_config.php';

    // Ensure rating column exists (portable)
    $colCheckSql = "SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'recommendations' AND COLUMN_NAME = 'rating'";
    if ($colStmt = $conn->prepare($colCheckSql)) {
        $dbName = $db_name; // from db_config.php
        $colStmt->bind_param('s', $dbName);
        if ($colStmt->execute()) {
            $colStmt->store_result();
            if ($colStmt->num_rows === 0) {
                $conn->query("ALTER TABLE recommendations ADD COLUMN rating INT NULL");
            }
        }
        $colStmt->close();
    }

    // Calculate average rating from both recommendations and business_feedback tables
    $sql = "SELECT AVG(rating) AS avg_rating FROM (
        SELECT rating FROM recommendations WHERE rating BETWEEN 1 AND 5
        UNION ALL
        SELECT rating FROM business_feedback WHERE rating BETWEEN 1 AND 5
    ) AS combined_ratings";
    
    $res = $conn->query($sql);
    if (!$res) {
        throw new Exception('Query failed: ' . $conn->error);
    }
    $row = $res->fetch_assoc();
    $avg = isset($row['avg_rating']) ? floatval($row['avg_rating']) : 0.0;
    $formatted = number_format($avg, 1);

    echo json_encode(['success' => true, 'rating' => $formatted]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
} finally {
    if (isset($res) && $res instanceof mysqli_result) { $res->free(); }
    if (isset($conn) && $conn instanceof mysqli) { $conn->close(); }
}
