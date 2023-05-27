<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- header base -->
    <?php require "resources/php/includes/head.php" ?>
    <!-- chartjs -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js" defer></script>
    <!-- script of the project -->
    <script src="resources/js/main.js" defer></script>
    <script src="resources/js/index.js" defer></script>
    <!-- css style used to correctly display data tables -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.1/css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.4.0/css/responsive.dataTables.min.css">
    <!-- script used to correctly display data tables -->
    <script src="https://code.jquery.com/jquery-3.5.1.js" defer></script>
    <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js" defer></script>
    <script src="https://cdn.datatables.net/1.13.1/js/dataTables.bootstrap4.min.js" defer></script>
    <script src="https://cdn.datatables.net/responsive/2.4.0/js/dataTables.responsive.min.js" defer></script>
</head>
<body>
<!-- header include-->
<?php require "resources/php/includes/header.php" ?>
<main>
    <label for="no-display-input">
        <input type="text" class="copyToClipboard hidden" value="" id="no-display-input">
    </label>
    <div class="wrapper in">
        <aside>
            <div class="right-align bs">
                <label for="player_research" class="searchBarWrapper">
                    <input id="player_research" class="btn-main player_research search_player_avt" type="text"
                           placeholder="Search a player">
                    <button class="btn-main" onclick="clearInput()">
                        <span class="clear_player_avt">Clear</span>
                        <i class="fa-solid fa-times"></i>
                    </button>
                </label>
            </div>
            <ul class="collapsible">
                <?php require "resources/php/includes/server_infos.php" ?>
                <li class="active">
                    <div class="collapsible-header" data-c="aside">
                        <p class="sc-h-2"></p>
                        <i class="fa-solid fa-chevron-right rotate"></i>
                    </div>
                    <div class="collapsible-body">
                        <div class="buttons-to-section">
                            <input class="select-radio-section leaderboard_radio_ham"
                                   type="radio"
                                   id="leaderboard_radio"
                                   name="filter_section" data-section_click="ld-main">
                            <label class="radio-label btn-main" for="leaderboard_radio">
                                <i class="fa-solid fa-user-group"></i>
                                <span class="sc-b-1"></span>
                            </label>
                            <input class="select-radio-section by_abilities_radio_ham"
                                   type="radio"
                                   id="by_abilities_radio"
                                   name="filter_section" data-section_click="abi">
                            <label class="radio-label btn-main" for="by_abilities_radio">
                                <i class="fa-solid fa-lightbulb"></i>
                                <span class="sc-b-2"></span>
                            </label>
                            <input class="select-radio-section by_abilities_radio_ham"
                                   type="radio"
                                   id="by_abilities_radio_pie"
                                   name="filter_section" data-section_click="abi-pie">
                            <label class="radio-label btn-main" for="by_abilities_radio_pie">
                                <i class="fa-solid fa-chart-pie"></i>
                                <span class="sc-b-3"></span>
                            </label>
                        </div>
                    </div>
                </li>
            </ul>
            <?php require "resources/php/includes/quickview.php" ?>
            <div class="background-fixed"></div>
        </aside>
        <div class="right-align hidden">
            <label for="player_research_ham" class="searchBarWrapper">
                <input id="player_research_ham" class="btn-main player_research search_player_avt" type="text"
                       placeholder="Search a player">
                <button class="btn-main" onclick="clearInput()">
                    <span class="clear_player_avt"></span>
                    <i class="fa-solid fa-times"></i>
                </button>
            </label>
        </div>
        <ul class="collapsible content index-page">
            <li class="active avt-glass-effect" id="best-player" data-section="section-bp">
                <div class="collapsible-header">
                    <h1 class="title-section">
                        <span id="section-1"></span>
                    </h1>
                    <p id="last_refresh_bp"></p>
                </div>
                <div class="collapsible-body">
                    <div class="content_bp"></div>
                </div>
            </li>
            <li class="active avt-glass-effect" id="ld-main" data-section="section-ld-main">
                <div class="collapsible-header">
                    <h1 class="title-section">
                        <span id="section-2"></span>
                        <i class="fa-solid fa-chevron-right rotate"></i></h1>
                </div>
                <div class="collapsible-body">
                    <table id="leaderboard_table" class="table table-bordered order-column" style="width:100%">
                        <thead>
                        <tr class="row_table_def"></tr>
                        </thead>
                        <tbody></tbody>
                        <tfoot>
                        <tr class="row_table_def"></tr>
                        </tfoot>
                    </table>
                    <div class="overTableLoading"></div>
                </div>
            </li>
            <li class="active avt-glass-effect" id="abi" data-section="section-abi">
                <div class="collapsible-header">
                    <h1 class="title-section">
                        <span id="section-3"></span>
                        <i class="fa-solid fa-chevron-right rotate"></i></h1>
                </div>
                <div class="collapsible-body">
                    <label for="chart_select" class="chart_select">
                        <span class="select-before"></span>
                        <select name="chart_select"
                                id="chart_select"
                                class="custom-select custom-select-sm">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="25">50</option>
                            <option value="25">100</option>
                            <option value="500" selected="selected">max</option>
                        </select>
                        <span class="select-after"></span>
                    </label>
                    <div class="chart-container">
                        <canvas id="myChart"></canvas>
                    </div>
                </div>
            </li>
            <li class="active avt-glass-effect hidden" id="abi-minmax" data-section="section-abi-minmax">
                <div class="collapsible-header">
                    <h1 class="title-section">
                        <span id="section-4"></span>
                        <i class="fa-solid fa-chevron-right rotate"></i></h1>
                </div>
                <div class="collapsible-body">
                    <div class="chart-container">
                        <canvas id="myChart-abi-minmax"></canvas>
                    </div>
                </div>
            </li>
            <li class="active avt-glass-effect" id="abi-pie" data-section="section-abi-pie">
                <div class="collapsible-header">
                    <h1 class="title-section">
                        <span id="section-5"></span>
                        <i class="fa-solid fa-chevron-right rotate"></i></h1>
                </div>
                <div class="collapsible-body">
                    <div class="wrapper-pie">
                        <div class="chart-container pie">
                            <canvas id="myChart-abi-pie"></canvas>
                        </div>
                        <div class="array-infos-ba"></div>
                    </div>
                </div>
            </li>
            <?php require "resources/php/includes/back_to_top.php" ?>
        </ul>
    </div>
    <?php require "resources/php/includes/footer.php" ?>
    <div class="sidebar-menu">
        <aside class="sm">
            <div class="right-align bs">
                <label for="player_research_si" class="searchBarWrapper">
                    <input id="player_research_si" class="btn-main player_research search_player_avt" type="text"
                           placeholder="Search a player">
                    <button class="btn-main" onclick="clearInput()">
                        <span class="clear_player_avt"></span>
                        <i class="fa-solid fa-times"></i>
                    </button>
                </label>
            </div>
            <ul class="collapsible">
                <?php require "resources/php/includes/server_infos.php" ?>
                <li class="active">
                    <div class="collapsible-header" data-c="aside">
                        <p class="sc-h-2"></p>
                        <i class="fa-solid fa-chevron-right rotate"></i>
                    </div>
                    <div class="collapsible-body">
                        <div class="buttons-to-section">
                            <input class="select-radio-section leaderboard_radio_ham"
                                   type="radio"
                                   id="leaderboard_radio_ham"
                                   name="filter_section" data-section_click="ld-main">
                            <label class="radio-label btn-main" for="leaderboard_radio_ham">
                                <i class="fa-solid fa-user-group"></i>
                                <span class="sc-b-1"></span>
                            </label>
                            <input class="select-radio-section"
                                   type="radio"
                                   id="by_abilities_radio_ham"
                                   name="filter_section" data-section_click="abi">
                            <label class="radio-label btn-main" for="by_abilities_radio_ham">
                                <i class="fa-solid fa-lightbulb"></i>
                                <span class="sc-b-2"></span>
                            </label>
                            <input class="select-radio-section by_abilities_radio_ham"
                                   type="radio"
                                   id="by_abilities_radio_pie_ham"
                                   name="filter_section" data-section_click="abi-pie">
                            <label class="radio-label btn-main" for="by_abilities_radio_pie_ham">
                                <i class="fa-solid fa-chart-pie"></i>
                                <span class="sc-b-3"></span>
                            </label>
                        </div>
                    </div>
                </li>
            </ul>
            <?php require "resources/php/includes/quickview.php" ?>
        </aside>
    </div>
</main>
</body>
</html>