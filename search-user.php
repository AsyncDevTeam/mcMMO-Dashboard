<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- header base -->
    <?php require "resources/php/includes/head_all.php" ?>
    <?php require "resources/php/includes/head_pages.php" ?>
    <!-- script of the page -->
    <script src="resources/js/search-user.js" defer></script>
    <!-- custom script -->
    <!-- css style used to correctly display data tables -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.1/css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.4.0/css/responsive.dataTables.min.css">
    <!-- script used to correctly display data tables -->
    <script src="https://code.jquery.com/jquery-3.5.1.js" defer></script>
    <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js" defer></script>
    <script src="https://cdn.datatables.net/1.13.1/js/dataTables.bootstrap4.min.js" defer></script>
    <script src="https://cdn.datatables.net/responsive/2.4.0/js/dataTables.responsive.min.js" defer></script>
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
        require "resources/php/includes/aside_min.php"
        ?>
        <div class="content-main align-center sp">
            <div class="search_p">
                <h1 class="title"></h1>
                <p class="subtitle"></p>
                <table id="sp-table" class="table order-column" style="width:100%">
                    <thead>
                    <tr class="row_table_def"></tr>
                    </thead>
                    <tbody></tbody>
                    <tfoot>
                    <tr class="row_table_def"></tr>
                    </tfoot>
                </table>
            </div>
            <?php require "resources/php/includes/back_to_top.php" ?>
        </div>
    </div>
    <?php require "resources/php/includes/footer.php" ?>
    <?php
    $comparison = false;
    require "resources/php/includes/aside_min_wide.php"
    ?>
</main>
</body>
</html>