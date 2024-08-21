<?php
// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "quiz q&a";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve JSON data from POST request
$data = json_decode(file_get_contents("php://input"), true);

foreach ($data as $slide) {
    $question = $slide['question'];
    $answeri = $slide['answeri'];
    $answerii = $slide['answerii'];
    $answeriii = $slide['answeriii'];
    $answeriv = $slide['answeriv'];
    $description = $slide['description'];

    // SQL query to insert data into the database
    $sql = "INSERT INTO `quiz data` (questions, answeri, answerii, answeriii, answeriv, description)
            VALUES ('$question', '$answeri', '$answerii', '$answeriii', '$answeriv', '$description')";

    if ($conn->query($sql) !== TRUE) {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
