<?php
// delete_quiz.php

// Include the database connection
include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];

    $sql = "DELETE FROM `quiz data` WHERE id=$id";

    if ($conn->query($sql) === TRUE) {
        echo "Record deleted successfully";
    } else {
        echo "Error deleting record: " . $conn->error;
    }

    $conn->close();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Delete Quiz Question</title>
</head>
<body>
    <h2>Delete Quiz Question</h2>
    <form method="POST" action="delete_quiz.php">
        ID: <input type="number" name="id" required><br><br>
        <input type="submit" value="Delete">
    </form>
</body>
</html>
