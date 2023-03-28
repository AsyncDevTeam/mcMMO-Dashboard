<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- header base -->
    <?php require "resources/php/includes/head.php" ?>
    <!-- script of the project -->
    <script src="resources/js/comparison.js" defer></script>
</head>
<body>
<!-- header include-->
<?php require "resources/php/includes/header.php" ?>
<main>
    <label for="no-display-input">
        <input type="text" class="copyToClipboard hidden" value="" id="no-display-input">
    </label>
    <div class="wrapper">
        <?php require "resources/php/includes/aside_min.php" ?>
        <div class="content-main">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, totam?</p>
        </div>
    </div>
    <?php require "resources/php/includes/footer.php" ?>
    <?php require "resources/php/includes/aside_min_wide.php" ?>
</main>
</body>
</html>