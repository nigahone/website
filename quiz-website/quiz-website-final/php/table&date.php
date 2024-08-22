<?php
include 'connect.php';
$sql = "SELECT id, question, answeri, answerii, answeriii, answeriv, fact, reg_date FROM dfssearch";


$result = $conn->query($sql);
?>
