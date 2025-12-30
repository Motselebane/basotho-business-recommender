<?php
session_start();

// Check if user is logged in
if (!isset($_SESSION['username']) || !isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Your session has expired. Please log in again to view your history.']);
    exit();
}

$user_id = intval($_SESSION['user_id']);

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "business_recommender";

try {
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    // Fetch recommendations for the user
    $stmt = $conn->prepare("SELECT * FROM recommendations WHERE user_id = ? ORDER BY created_at DESC");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $recommendations = [];
    while ($row = $result->fetch_assoc()) {
        $recommendations[] = $row;
    }

    $stmt->close();
    $conn->close();

    // Return JSON response
    header('Content-Type: application/json');
    echo json_encode(['recommendations' => $recommendations]);

} catch (Exception $e) {
    http_response_code(500);
    $userFriendlyMessage = 'Unable to load your recommendation history. Please try again later.';
    if (strpos($e->getMessage(), 'Connection') !== false) {
        $userFriendlyMessage = 'Database connection issue. Our team has been notified.';
    }
    echo json_encode(['error' => $userFriendlyMessage]);
}
?>