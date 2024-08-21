<?php
// insert_quiz.php

// Include the database connection
include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve form data
    $projectName = $_POST['projectName'];
    $question = $_POST['question'];
    $answeri = $_POST['answeri'];
    $answerii = $_POST['answerii'];
    $answeriii = $_POST['answeriii'];
    $answeriv = $_POST['answeriv'];
    $description = $_POST['description'];

    // Sanitize project name to avoid SQL injection and invalid characters
    $projectName = preg_replace('/[^a-zA-Z0-9_]/', '', $projectName);

    // Create SQL query to create a new table
    $createTableSQL = "CREATE TABLE IF NOT EXISTS `$projectName` (
        id INT AUTO_INCREMENT PRIMARY KEY,
        question TEXT NOT NULL,
        answeri TEXT NOT NULL,
        answerii TEXT NOT NULL,
        answeriii TEXT NOT NULL,
        answeriv TEXT NOT NULL,
        description TEXT
    )";

    // Execute table creation query
    if ($conn->query($createTableSQL) === TRUE) {
        // Insert quiz data into the created table
        $insertDataSQL = "INSERT INTO `$projectName` (question, answeri, answerii, answeriii, answeriv, description)
                          VALUES ('$question', '$answeri', '$answerii', '$answeriii', '$answeriv', '$description')";

        if ($conn->query($insertDataSQL) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error inserting data: " . $conn->error;
        }
    } else {
        echo "Error creating table: " . $conn->error;
    }

    // Close the connection
    $conn->close();
}
?>
