<?php
$host = 'localhost'; // Your database host
$db = 'your_database_name'; // Your database name
$user = 'your_username'; // Your database username
$pass = 'your_password'; // Your database password

// Create a connection to the database
$conn = new mysqli($host, $user, $pass, $db);

// Check if the connection was successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the JSON data sent from the JavaScript
$data = json_decode(file_get_contents('php://input'), true);

$response = ['success' => false];

if (!empty($data)) {
    foreach ($data as $slide) {
        $question = $conn->real_escape_string($slide['question']);
        $answeri = $conn->real_escape_string($slide['answeri']);
        $answerii = $conn->real_escape_string($slide['answerii']);
        $answeriii = $conn->real_escape_string($slide['answeriii']);
        $answeriv = $conn->real_escape_string($slide['answeriv']);
        $fact = $conn->real_escape_string($slide['fact']);

        // Insert the slide into the database
        $sql = "INSERT INTO quiz_slides (question, answeri, answerii, answeriii, answeriv, fact)
                VALUES ('$question', '$answeri', '$answerii', '$answeriii', '$answeriv', '$fact')";

        if ($conn->query($sql) === TRUE) {
            $response['success'] = true;
        } else {
            $response['success'] = false;
            break;
        }
    }
}

// Close the database connection
$conn->close();

// Send the response back to the JavaScript
header('Content-Type: application/json');
echo json_encode($response);
?>
