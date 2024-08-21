<?php
// update_quiz.php

// Include the database connection
include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];
    $question = $_POST['question'];
    $answeri = $_POST['answeri'];
    $answerii = $_POST['answerii'];
    $answeriii = $_POST['answeriii'];
    $answeriv = $_POST['answeriv'];
    $description = $_POST['description'];

    $sql = "UPDATE `quiz data` 
            SET questions='$question', answeri='$answeri', answerii='$answerii', answeriii='$answeriii', answeriv='$answeriv', description='$description'
            WHERE id=$id";

    if ($conn->query($sql) === TRUE) {
        echo "Record updated successfully";
    } else {
        echo "Error updating record: " . $conn->error;
    }

    $conn->close();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Update Quiz Question</title>
</head>
<body>
    <h2>Update Quiz Question</h2>
    <form method="POST" action="update_quiz.php">
        ID: <input type="number" name="id" required><br><br>
        Question: <input type="text" name="question" required><br><br>
        Answer I: <input type="text" name="answeri" required><br><br>
        Answer II: <input type="text" name="answerii" required><br><br>
        Answer III: <input type="text" name="answeriii" required><br><br>
        Answer IV: <input type="text" name="answeriv" required><br><br>
        Description: <textarea name="description"></textarea><br><br>
        <input type="submit" value="Update">
    </form>
</body>
</html>
