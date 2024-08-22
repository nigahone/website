<?php
// Include the database connection file
include 'connect.php';

// Decode the JSON data sent via POST
$slideData = json_decode($_POST['slides'], true);

if (!empty($slideData)) {
    // Sanitize the project name and create a table name
    $projectName = mysqli_real_escape_string($conn, $slideData[0]['projectName']);
    $tableName = preg_replace("/[^a-zA-Z0-9_]+/", "", $projectName);

    // SQL to create the table if it doesn't exist
    $sqlCreateTable = "CREATE TABLE IF NOT EXISTS $tableName (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        question VARCHAR(255),
        answeri VARCHAR(255),
        answerii VARCHAR(255),
        answeriii VARCHAR(255),
        answeriv VARCHAR(255),
        fact TEXT,
        reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";

    // Execute the table creation query
    if ($conn->query($sqlCreateTable) !== TRUE) {
        echo "Error creating table: " . $conn->error;
        $conn->close();
        exit();
    }

    // Insert each slide's data into the table
    foreach ($slideData as $slide) {
        $question = mysqli_real_escape_string($conn, $slide['question']);
        $answeri = mysqli_real_escape_string($conn, $slide['answeri']);
        $answerii = mysqli_real_escape_string($conn, $slide['answerii']);
        $answeriii = mysqli_real_escape_string($conn, $slide['answeriii']);
        $answeriv = mysqli_real_escape_string($conn, $slide['answeriv']);
        $fact = mysqli_real_escape_string($conn, $slide['fact']);

        // SQL to insert the data
        $sqlInsert = "INSERT INTO $tableName (question, answeri, answerii, answeriii, answeriv, fact)
        VALUES ('$question', '$answeri', '$answerii', '$answeriii', '$answeriv', '$fact')";

        // Execute the insert query
        if ($conn->query($sqlInsert) !== TRUE) {
            echo "Error: " . $sqlInsert . "<br>" . $conn->error;
        }
    }

    echo "Data saved successfully!";
} else {
    echo "No data to save.";    
}

// Close the connection
$conn->close();
?>
