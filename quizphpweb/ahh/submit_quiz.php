<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "quizq&a";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$slideData = json_decode($_POST['slides'], true);

if (!empty($slideData)) {
    $projectName = mysqli_real_escape_string($conn, $slideData[0]['projectName']);
    $tableName = preg_replace("/[^a-zA-Z0-9_]+/", "", $projectName);

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

    if ($conn->query($sqlCreateTable) !== TRUE) {
        echo "Error creating table: " . $conn->error;
        $conn->close();
        exit();
    }

    foreach ($slideData as $slide) {
        $question = mysqli_real_escape_string($conn, $slide['question']);
        $answeri = mysqli_real_escape_string($conn, $slide['answeri']);
        $answerii = mysqli_real_escape_string($conn, $slide['answerii']);
        $answeriii = mysqli_real_escape_string($conn, $slide['answeriii']);
        $answeriv = mysqli_real_escape_string($conn, $slide['answeriv']);
        $fact = mysqli_real_escape_string($conn, $slide['fact']);

        $sqlInsert = "INSERT INTO $tableName (question, answeri, answerii, answeriii, answeriv, fact)
        VALUES ('$question', '$answeri', '$answerii', '$answeriii', '$answeriv', '$fact')";

        if ($conn->query($sqlInsert) !== TRUE) {
            echo "Error: " . $sqlInsert . "<br>" . $conn->error;
        }
    }

    echo "Data saved successfully!";
} else {
    echo "No data to save.";
}

$conn->close();
?>
