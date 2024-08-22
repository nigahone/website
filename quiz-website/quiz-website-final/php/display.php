<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Display Table Data</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        table, th, td {
            border: 1px solid black;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>

    <h1>Table Data from dfssearch</h1>

    <table>
        <tr>
            <th>ID</th>
            <th>Question</th>
            <th>Answer I</th>
            <th>Answer II</th>
            <th>Answer III</th>
            <th>Answer IV</th>
            <th>Fact</th>
            <th>Entry Date</th>
        </tr>
        <?php
        include 'fetch.php'; 
        if ($result->num_rows > 0) {
            // Output data of each row
            while($row = $result->fetch_assoc()) {
                echo "<tr>";
                echo "<td>" . $row["id"] . "</td>";
                echo "<td>" . $row["question"] . "</td>";
                echo "<td>" . $row["answeri"] . "</td>";
                echo "<td>" . $row["answerii"] . "</td>";
                echo "<td>" . $row["answeriii"] . "</td>";
                echo "<td>" . $row["answeriv"] . "</td>";
                echo "<td>" . $row["fact"] . "</td>";
                echo "<td>" . $row["reg_date"] . "</td>";
                echo "</tr>";
            }
        } else {
            echo "<tr><td colspan='8'>No records found</td></tr>";
        }
        ?>
    </table>

    <?php $conn->close(); ?>

</body>
</html>
