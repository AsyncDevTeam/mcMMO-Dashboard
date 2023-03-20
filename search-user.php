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
<header>
    <div class="main pages">
        <a id="website-title" href="index.php">mcMMO Stats</a>
        <a href="index.php">
            <img src="resources/others/textures/defaultLogo/def.webp" alt="Logo of server running the website"
                 id="server-logo">
        </a>
    </div>
    <div class="tabs_header">
        <a href="index.php">
            <i class="fa-solid fa-house"></i>
            <span class="tabs-1"></span>
        </a>
        <a href="search-user.php">
            <i class="fa-solid fa-user"></i>
            <span class="tabs-2"></span>
        </a>
        <!--        <a href="contact.html">-->
        <!--            <i class="fa-solid fa-at"></i>-->
        <!--            <span class="tabs-3"></span>-->
        <!--        </a>-->
        <label for="darkMode-input">
            <input type="checkbox" id="darkMode-input">
            <i class="fa-solid fa-circle-half-stroke"></i>
            <span class="tabs-dm"></span>
        </label>
    </div>
</header>
<main>
    <div class="wrapper pages">
        <div class="content-main align-center sp">
            <div class="contact-content">
                <h1 class="title"></h1>
                <p class="subtitle"></p>
                <div class="searchBar_user">
                    <label for="sb-u">
                        <input type="text" id="sb-u" class="search_player_avt" placeholder="Search for a player">
                    </label>
                    <button class="btn-main sb"></button>
                    <div class="sort">
                        <button class="btn-main" onclick="sortNumber_s()">
                            <span class="sort_avt">Sort</span>
                            <i class="fa-solid sort_N fa-arrow-down-1-9"></i>
                        </button>
                        <button class="btn-main" onclick="sortAlphabetical_s()">
                            <span class="sort_avt">Sort</span>
                            <i class="fa-solid sort_A fa-arrow-down-a-z"></i>
                        </button>
                    </div>
                </div>
                <div class="result-search">
                    <a class="user-find" data-clone="init">
                        <img src="" alt="head of the player">
                        <p class="name"></p>
                        <div class="rank hidden">
                            <span class="medal"></span>
                        </div>
                    </a>
                    <div class="no-element-found hidden">
                        <i class="fa-solid fa-circle-xmark"></i>
                        <p class="no_result"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php require "resources/php/includes/footer.php" ?>
</main>
</body>
</html>