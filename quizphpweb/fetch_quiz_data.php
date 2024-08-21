<?php
// fetch_quiz_data.php

// Include the database connection
include 'connect.php';

// SQL query to fetch data from the `quiz data` table
$sql = "SELECT * FROM `quiz data`";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<table border='1'>";
    echo "<tr><th>ID</th><th>Question</th><th>Answer I</th><th>Answer II</th><th>Answer III</th><th>Answer IV</th><th>Description</th></tr>";
    while($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . $row["id"] . "</td>";
        echo "<td>" . $row["questions"] . "</td>";
        echo "<td>" . $row["answeri"] . "</td>";
        echo "<td>" . $row["answerii"] . "</td>";
        echo "<td>" . $row["answeriii"] . "</td>";
        echo "<td>" . $row["answeriv"] . "</td>";
        echo "<td>" . $row["description"] . "</td>";
        echo "</tr>";
    }
    echo "</table>";
} else {
    echo "0 results";
}

$conn->close();
?>
