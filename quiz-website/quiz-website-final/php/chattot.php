<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "quizq&a";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get all table names
$sql = "SHOW TABLES FROM `$dbname`"; // Use backticks around the database name
$result = $conn->query($sql);

if ($result === false) {
    die("Error: " . $conn->error);
}

$tables_data = [];

while ($row = $result->fetch_array()) {
    $table_name = $row[0];

    // Get the first entry's date from the current table
    $date_query = "SELECT reg_date FROM `$table_name` ORDER BY reg_date ASC LIMIT 1";
    $date_result = $conn->query($date_query);

    if ($date_result && $date_result->num_rows > 0) {
        $date_row = $date_result->fetch_assoc();
        $first_date = $date_row['reg_date'];
    } else {
        $first_date = 'No date available';
    }

    $tables_data[] = ['table_name' => $table_name, 'first_date' => $first_date];
}

// Close the connection
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tables and First Entry Dates</title>
    <style>
        .container {
            padding: 20px;
            background-color: #f9f9f9;
            margin-bottom: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        .table-title {
            font-weight: bold;
            margin-bottom: 5px;
        }
        .table-date {
            color: #555;
        }
    </style>
</head>
<body>

<h1>Database Tables and First Entry Dates</h1>

<?php foreach ($tables_data as $data): ?>
    <div class="container">
        <div class="table-title"><?php echo $data['table_name']; ?></div>
        <div class="table-date"><?php echo $data['first_date']; ?></div>
    </div>
<?php endforeach; ?>

</body>
</html>
