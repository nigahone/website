<!-- Dashboard page for creating or navigating to other sections for analytics create view projects and many others -->
<?php
// Database connection
include 'php/connect.php';

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
    <title>Dashboard</title>
    <link rel="stylesheet" href="style.css">
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
            display: flex;
            align-items: center;
            /* justify-content: space-around; */
        }
        .table-date h3 {
            padding-right: 20px;
        }
    </style>
    </style>
</head>

<body>
    <div class="navbar">
        <div class="logo">
            <a href="index.html">
                <h3>
                    <img src="Quiz Master logo 500px.png" alt="logo of quiz master">
                </h3>
            </a>
        </div>
        <div class="search">
            <input type="text" class="search-input" placeholder="Search..." pattern="[a-zA-Z0-9\s]+"
                title="Only letters, numbers and spaces allowed">
            <button class="search-button">
                <i class="fa-solid fa-magnifying-glass"></i>
            </button>
        </div>
        <div class="dark-mode">
            <button id="theme-toggle"><i class="fa-solid fa-circle-half-stroke"></i></button>
        </div>
        <div class="login-reg">
            <button class="btn login">Login</button>
            <button class="btn register">Register</button>
        </div>
    </div>

    <div class="navbar-sec">
        <ul class="nav-links">
            <li>
                <a href="quiz.html">Start Quiz</a>
            </li>
            <li>
                <a href="codejoin.html">Quiz code</a>
            </li>
            <li>
                <a href="#categories">Categories</a>
            </li>
            <li>
                <a href="features.html">Features</a>
            </li>
            <li>
                <a href="#about-us">About Us</a>
            </li>
            <li>
                <a href="#contact-us">Contact Us</a>
            </li>
        </ul>
    </div>


    <!-- Main section -->
    <main>
        <div id="dash-main">
            <div class="navbar-third">
                <div class="navbar-third-left">
                    <ul>
                        <li><a href="dashboard.html"><i class="fa-solid fa-sliders"></i>MySlides</a></li>
                    </ul>
                    <ul>
                        <li><a href="team.html"><i class="fa-solid fa-user-plus"></i>Team</a></li>
                    </ul>
                    <ul>
                        <li><a href="analytics.html"><i class="fa-solid fa-chart-line"></i>Analytics</a></li>
                    </ul>
                    <ul>
                        <li><a href="tutorials.html"><i class="fa-solid fa-graduation-cap"></i>Tutorials</a></li>
                    </ul>
                    <br>
                    <ul>
                        <li><a href="integration.html">Integration:</a></li>
                    </ul>
                    <ul>
                        <li><a href="powerpoint.html"><i class="fa-solid fa-file-powerpoint"></i>Powerpoint</a></li>
                    </ul>
                    <ul>
                        <li><a href="googleSlides.html"><i class="fa-brands fa-slideshare"></i>GoogleSlides</a></li>
                    </ul>
                </div>
            </div>
            <div class="navbar-third-right">
                <div class="create-slide">
                    <a href="createslide.html">
                        <h3>Create Slide</h3>
                        <h1>+</h1>
                    </a>
                </div>
            </div>
        </div>


        <div class="slides">
            <h2>
                Previous Projects
            </h2>
            <!-- 
            <div class="projects-disp">
                <img src="Quiz Master.png" alt="project image or something to fill space">
                <div class="project-img">
                    Project 1
                </div>
                <h4>Project 1</h4>
            </div>
            <h1>Database Tables and First Entry Dates</h1>
        </div>-->
        <?php foreach ($tables_data as $data): ?>
                <div class="container">
                    <div class="table-title">
                        <h2>
                            <a href="display.php?table=<?php echo urlencode($data['table_name']); ?>">
                                <?php echo $data['table_name']; ?>
                            </a>
                        </h2>
                    </div>
                    <div class="table-date">
                        <h3>created on:</h3>
                        <?php echo $data['first_date']; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
        <script src="script.js"></script>

    </main>
    <footer>

    </footer>
</body>

</html>