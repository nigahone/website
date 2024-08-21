<?php
// index.php

// Include the script that fetches quiz data
// include 'fetch_quiz_data.php';
?>


<?php
// Display files and directories
$dir = '.';
if ($handle = opendir($dir)) {
    echo "<h1>Directory Listing for $dir</h1>";
    echo '<ul>';
    while (false !== ($entry = readdir($handle))) {
        if ($entry != "." && $entry != "..") {
            echo "<li><a href='$entry'>$entry</a></li>";
        }
    }
    echo '</ul>';
    closedir($handle);
}
?>

