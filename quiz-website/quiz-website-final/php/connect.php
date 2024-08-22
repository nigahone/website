<?php
// connect.php

$servername = "localhost"; // or "127.0.0.1"
$username = "root";        // Default XAMPP username
$password = "";            // Default XAMPP password is empty
$dbname = "quizq&a";      // Database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
