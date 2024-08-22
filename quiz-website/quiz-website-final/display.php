    <!-- display.php -->
    <?php
    // Database connection
    include 'php/connect.php';

    // Get the table name from the URL
    $table_name = isset($_GET['table']) ? $_GET['table'] : null;

    if ($table_name) {
        // Prevent SQL injection by using a prepared statement
        $stmt = $conn->prepare("SELECT * FROM `$table_name`");
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // Fetch the table headers and data
            $field_info = $result->fetch_fields();
        } else {
            echo "No data found in table $table_name.";
        }
    } else {
        echo "No table specified.";
        exit;
    }

    // Close the connection
    $conn->close();
    ?>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Quiz | Create | Update | Delete</title>
        <link rel="stylesheet" href="style.css">
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    </head>

    <body>
        <header>

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
                <div class="dark-mode dmode">
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
                        <a href="dashboard.html">dashboard</a>
                    </li>

                </ul>
            </div>

        </header>
        <main class="createslide-main createhead">
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

            <div class="slide2">
                <form id="quiz-form" method="POST" action="php/submit_quiz.php">
                    <div class="join">
                        <button type="button"><a href="codejoin.html">Join Code</a></button>
                        <button type="button" id="exit-button">Exit</button>
                        <button type="button" id="save-button">Save</button>
                    </div>

                    <input type="text" name="projectName" class="projectName" placeholder="Project Name :"
                        pattern="[a-zA-Z0-9\s]+" title="Only letters, numbers and spaces allowed" value="<?php echo htmlspecialchars($table_name); ?>" required>
                    <!-- <div class="options-menu">
                            <button class="delete-slide-local">Delete from Local Storage</button>
                            <button class="delete-slide-ui">Delete from UI</button>
                        </div> -->
                    <!-- <div class="icons">
                            <button type="button"><i class="fa-solid fa-arrow-rotate-left"> Undo</i></button>
                            <button class="done" id="done-button" type="submit">Done</button>
                            <button type="button"><i class="fa-solid fa-eye"> Preview</i></button>
                            <button type="button"><i class="fa-solid fa-ellipsis-vertical"> Options</i></button>
                        </div> -->
                    <!-- Button to Toggle the Options Menu -->
                    <button class="done" id="done-button" type="submit">Done</button>
                    <button id="optionsButton2" type="button" class="options-btn">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </button>

                    <!-- The Options Menu -->
                    <div class="icons options-menu2" style="display: none;">
                        <button type="button"><i class="fa-solid fa-arrow-rotate-left"> Undo</i></button>
                        <button type="button"><i class="fa-solid fa-eye"> Preview</i></button>
                    </div>
                    <br><br>

                    <div class="input-slide">
                        <textarea class="question" name="question" id="quiz-title-input" placeholder="Enter your Question"
                            pattern="[a-zA-Z0-9\s]+" title="Only letters, numbers and spaces allowed"></textarea>
                        <div class="answers-1">
                            i.
                            <input type="text" name="answeri" class="answer-input-i" placeholder="Answer"
                                pattern="[a-zA-Z0-9\s]+" title="Only letters, numbers and spaces allowed">
                            ii.
                            <input type="text" name="answeri" class="answer-input-ii" placeholder="Answer"
                                pattern="[a-zA-Z0-9\s]+" title="Only letters, numbers and spaces allowed">
                        </div>
                        <div class="answers-2">
                            iii.
                            <input type="text" name="answeriii" class="answer-input-iii" placeholder="Answer"
                                pattern="[a-zA-Z0-9\s]+" title="Only letters, numbers and spaces allowed">
                            iv.
                            <input type="text" name="answeriv" class="answer-input-iv" placeholder="Answer"
                                pattern="[a-zA-Z0-9\s]+" title="Only letters, numbers and spaces allowed">
                        </div>
                        <div class="facts-des">
                            <h3>Did you know?</h3>
                            <textarea name="description" class="facts-descipt"
                                placeholder="Fun Facts or Description on Topic" pattern="[a-zA-Z0-9\s]+"
                                title="Only letters, numbers and spaces allowed"></textarea>
                        </div>
                    </div>
                </form>
                <div id="slides-container">
                    <div class="data-container">
                        <?php
        if ($result->num_rows > 0):
            $index = 1;
            while ($row = $result->fetch_assoc()): 
        ?>
                        <div class="draggable-box">
                            This is a draggable box
                            <button class="dragable-options">
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                        </div>
                        <div class="options-menu" style="display: none;">
                            <button class="edit-slide">Edit</button>
                            <button class="delete-slide">Delete</button>
                        </div>
                        <div class="question">
                            <h2 class="slide-SN">
                                <?php echo $index++; ?>
                            </h2>
                            <h2 class="question-Sn">
                                <?php echo htmlspecialchars($row['question']); ?>
                            </h2>
                        </div>
                        <div class="answers">
                            i. <h2 class="ans-i">
                                <?php echo htmlspecialchars($row['answeri']); ?>
                            </h2>
                            ii. <h2 class="ans-ii">
                                <?php echo htmlspecialchars($row['answerii']); ?>
                            </h2>
                            <br>
                            iii. <h2 class="ans-iii">
                                <?php echo htmlspecialchars($row['answeriii']); ?>
                            </h2>
                            iv. <h2 class="ans-iv">
                                <?php echo htmlspecialchars($row['answeriv']); ?>
                            </h2>
                            <br>
                        </div>
                        <div class="facts-des">
                            <h3>Did you know?</h3>
                            <h4 class="desh3">
                                <?php echo htmlspecialchars($row['fact']); ?>
                            </h4>
                        </div>
                        <?php
            endwhile;
        else:
            echo "<p>No data available in this table.</p>";
        endif;
        error_reporting(E_ALL); ini_set('display_errors', 1);
        ?>
                    </div>
                </div>


            </div>

        </main>
        <script>
            //Prevents auto redirect to submit_quiz.php when pressing Done button
            $(document).ready(function () {
                $('#quiz-form').on('submit', function (event) {
                    event.preventDefault(); // Prevent the default form submission

                    $.ajax({
                        url: $(this).attr('action'),
                        type: 'POST',
                        data: $(this).serialize(),
                        success: function (response) {
                            alert('Form submitted successfully!');
                            // Optionally update the page or UI based on the response
                        },
                        error: function () {
                            alert('Error submitting the form.');
                        }
                    });
                });
            });
        </script>
        
        <script src="script.js"></script>
    </body>

    </html>