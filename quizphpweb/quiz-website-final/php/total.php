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
else {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        // Decode the JSON data
        $slides = json_decode($_POST['slides'], true);
        
        if (!empty($slides)) {
            // Use the project name from the first slide to create the table
            $projectName = $slides[0]['projectName'];

            // Sanitize the project name to avoid SQL injection and invalid characters
            $projectName = preg_replace('/[^a-zA-Z0-9_]/', '', $projectName);

            // Create SQL query to create a new table
            $createTableSQL = "CREATE TABLE IF NOT EXISTS `$projectName` (
                id INT AUTO_INCREMENT PRIMARY KEY,
                question TEXT NOT NULL,
                answeri TEXT NOT NULL,
                answerii TEXT NOT NULL,
                answeriii TEXT NOT NULL,
                answeriv TEXT NOT NULL,
                fact TEXT
            )";

            // Execute table creation query
            if ($conn->query($createTableSQL) === TRUE) {
                // Prepare the SQL statement for inserting data
                $insertDataSQL = $conn->prepare("INSERT INTO `$projectName` (question, answeri, answerii, answeriii, answeriv, fact) VALUES (?, ?, ?, ?, ?, ?)");

                foreach ($slides as $slide) {
                    $question = $slide['question'];
                    $answeri = $slide['answeri'];
                    $answerii = $slide['answerii'];
                    $answeriii = $slide['answeriii'];
                    $answeriv = $slide['answeriv'];
                    $fact = $slide['fact'];

                    // Bind parameters and execute the insertion
                    $insertDataSQL->bind_param("ssssss", $question, $answeri, $answerii, $answeriii, $answeriv, $fact);
                    $insertDataSQL->execute();
                }

                echo "New records created successfully";
            } else {
                echo "Error creating table: " . $conn->error;
            }
        } else {
            echo "No slide data received.";
        }

        // Close the connection
        $conn->close();
    }
}
?>
