<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- header base -->
    <?php require "resources/php/includes/head.php" ?>
    <!-- script of the page -->
    <script src="resources/js/search-user.js" defer></script>
    <!-- custom script -->
    <script defer>
        window.onload = function () {
            const titre = translation[languageSelect].content_page.pages["search-user"].title
            const sous_titre = translation[languageSelect].content_page.pages["search-user"].subtitle
            const button = translation[languageSelect].content_page.pages["search-user"].button
            document.querySelector('.title').innerHTML = titre
            document.querySelector('.subtitle').innerHTML = sous_titre
            document.querySelector('.sb').innerHTML = button
        }
    </script>
</head>
<body>
<!-- header include-->
<?php require "resources/php/includes/header.php" ?>
<main>
    <label for="no-display-input">
        <input type="text" class="copyToClipboard hidden" value="" id="no-display-input">
    </label>
    <div class="wrapper pages">
        <?php
        $comparison = false;
        $params = array(
            'list' => '.result-search',
            'element' => 'a.user-find',
        );
        require "resources/php/includes/aside_min.php"
        ?>
        <div class="content-main align-center sp">
            <div class="search_p">
                <h1 class="title"></h1>
                <p class="subtitle"></p>
                <div class="searchBar_user">
                    <label for="sb-u">
                        <input type="text" id="sb-u" class="search_player_avt" placeholder="Search for a player">
                    </label>
                    <button class="btn-main sb"></button>
                </div>
                <div class="result-search">
                    <a class="user-find" data-clone="init">
                        <img src="" alt="head of the player">
                        <p class="name"></p>
                        <div class="rank">
                            <span class="total"></span>
                        </div>
                    </a>
                    <div class="no-element-found hidden">
                        <i class="fa-solid fa-circle-xmark"></i>
                        <p class="no_result"></p>
                    </div>
                </div>
            </div>
            <?php require "resources/php/includes/back_to_top.php" ?>
        </div>
    </div>
    <?php require "resources/php/includes/footer.php" ?>
    <?php
    $comparison = false;
    $params = array(
        'list' => '.result-search',
        'element' => 'a.user-find',
    );
    require "resources/php/includes/aside_min_wide.php"
    ?>
</main>
</body>
</html>