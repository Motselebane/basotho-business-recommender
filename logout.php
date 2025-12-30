<?php
session_start();

// Clear the user session
session_unset();
session_destroy();

// Redirect to the project root index
header("Location: ../../index.php");
exit();
?>