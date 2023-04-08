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
    <!-- script of the page -->
    <script src="resources/js/main.js" defer></script>
    <script src="resources/js/user.js" defer></script>
    <!-- css style used to correctly display data tables -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.1/css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.4.0/css/responsive.dataTables.min.css">
    <!-- script used to correctly display data tables -->
    <script src="https://code.jquery.com/jquery-3.5.1.js" defer></script>
    <script src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js" defer></script>
    <script src="https://cdn.datatables.net/1.13.1/js/dataTables.bootstrap4.min.js" defer></script>
    <script src="https://cdn.datatables.net/responsive/2.4.0/js/dataTables.responsive.min.js" defer></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@7.1.96/css/materialdesignicons.min.css">
</head>
<body>
<!-- header include-->
<?php require "resources/php/includes/header.php" ?>
<main>
    <label for="no-display-input">
        <input type="text" class="copyToClipboard hidden" value="" id="no-display-input">
    </label>
    <div class="wrapper">
        <aside>
            <ul class="collapsible">
                <li class="active">
                    <div class="collapsible-header">
                        <p class="sc-h-1"></p>
                        <i class="fa-solid fa-chevron-right rotate"></i>
                    </div>
                    <div class="collapsible-body stats-server">
                        <p class="info-details copyToClipboardAction">
                            <i class="fa-solid fa-server"></i>
                            <span class="server-ip"></span>
                            <i class="fa-regular fa-copy"></i>
                        </p>
                        <p class="info-details nb_players">
                            <i class="fa-solid fa-user-group size"></i>
                            <span class="server-player"></span>/<span class="max_players"></span>
                        </p>
                        <p class="info-details">
                            <i class="fa-solid fa-code-branch size"></i>
                            <span class="version"></span>
                        </p>
                        <span class="overlay-stats hidden">
                <i class="fa-solid fa-bolt"></i>
                <p class="sc-h-1-s"></p>
            </span>
                    </div>
                </li>
                <li class="active">
                    <div class="collapsible-header">
                        <p class="sc-h-2"></p>
                        <i class="fa-solid fa-chevron-right rotate"></i>
                    </div>
                    <div class="collapsible-body">
                        <div class="buttons-to-section">
                            <input class="select-radio-section"
                                   type="radio"
                                   id="info_user_radio"
                                   name="filter_section" data-section_click="user-info">
                            <label class="radio-label btn-main" for="info_user_radio">
                                <i class="fa-solid fa-user"></i>
                                <span class="sc-b-1"></span>
                            </label>
                            <input class="select-radio-section"
                                   type="radio"
                                   id="abilities_level"
                                   name="filter_section" data-section_click="abi-lvl">
                            <label class="radio-label btn-main" for="abilities_level">
                                <i class="fa-solid fa-lightbulb"></i>
                                <span class="sc-b-2"></span>
                            </label>
                            <input class="select-radio-section"
                                   type="radio"
                                   id="abilities_level_chart"
                                   name="filter_section" data-section_click="abi-lvl-chart">
                            <label class="radio-label btn-main" for="abilities_level_chart">
                                <i class="fa-solid fa-chart-simple"></i>
                                <span class="sc-b-3"></span>
                            </label>
                            <input class="select-radio-section"
                                   type="radio"
                                   id="abilities_level_chart_com"
                                   name="filter_section" data-section_click="abi-lvl-chart-compare">
                            <label class="radio-label btn-main" for="abilities_level_chart_com">
                                <i class="fa-solid fa-chart-line"></i>
                                <span class="sc-b-4"></span>
                            </label>
                            <hr class="backToTop">
                            <input class="select-radio-section"
                                   type="radio"
                                   id="backToTop"
                                   name="filter_section" data-section_click="backToTop">
                            <label class="radio-label btn-main backToTop" for="backToTop">
                                <i class="fa-solid fa-arrow-up"></i>
                                <span class="sc-b-999"></span>
                            </label>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="background-fixed"></div>
        </aside>
        <div class="content-main">
            <div class="user-infos avt-glass-effect" id="user-info">
                <div class="title-container">
                    <h1 class="title-section"></h1>
                    <p class="last-connection-user"></p>
                </div>
                <div class="wrapper-content">
                    <div class="user-skin">
                        <img id="img-skin-user" src="" alt="Skin généré par Minecraft-api.com"/>
                    </div>
                    <div class="wrapper-element-bp">
                        <div class="f-best-ab">
                            <div class="ab-card-best avt-glass-effect" data-clone="init">
                                <div class="container-title">
                                    <p class="ab-title"></p>
                                    <i class="fa-solid"></i>
                                    <span class="mdi"></span>
                                </div>
                                <div class="ab-row">
                                    <p class="ab-bar-label"></p>
                                    <div class="ab-bar-container">
                                        <div class="ab-bar"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="labels">
                <div class="label-user" data-clone="init">
                    <p class="title-lu"></p>
                    <p class="title-lu-meaning hidden"></p>
                </div>
            </div>

            <ul class="collapsible content" id="abi-lvl">
                <li class="active avt-glass-effect user-page" id="all_card" data-section="section-ld-main">
                    <div class="collapsible-header">
                        <h1 class="title-section">
                            <span id="section-1"></span>
                            <i class="fa-solid fa-chevron-right rotate"></i></h1>
                    </div>
                    <div class="collapsible-body">
                        <div class="right-align">
                            <button class="btn-main hidden" onclick="sortNumber()">
                                <span class="sort_avt"></span>
                                <i class="fa-solid fa-arrow-down-1-9"></i>
                            </button>
                            <button class="btn-main" onclick="sortAlphabetical()">
                                <span class="sort_avt"></span>
                                <i class="fa-solid sort_A fa-arrow-down-a-z"></i>
                            </button>
                            <label for="ab_research" class="searchBarWrapper">
                                <input class="btn-main searchAbility search_abi_avt" id="ab_research"
                                       placeholder="Search an ability" type="text">
                                <button class="btn-main" onclick="clearInputUser()">
                                    <span class="clear_player_avt">Clear</span>
                                    <i class="fa-solid fa-times"></i>
                                </button>
                            </label>
                        </div>
                        <div class="card-abilities">
                            <div class="ab-card avt-glass-effect" data-clone="init">
                                <div class="container-title">
                                    <p class="ab-title"></p>
                                    <i class="fa-solid"></i>
                                    <span class="mdi"></span>
                                </div>
                                <div class="ab-row">
                                    <p class="ab-bar-level"></p>
                                    <p><span class="ab-bar-label"></span>/<span class="ab-bar-label-max"></span> exp</p>
                                    <div class="ab-bar-container">
                                        <div class="ab-bar"></div>
                                    </div>
                                </div>
                                <div class="ab-row">
                                    <p class="ab-next-level"></p>
                                </div>
                            </div>
                            <div class="no-element-found hidden">
                                <i class="fa-solid fa-circle-xmark"></i>
                                <p></p>
                            </div>
                            <div class="card-infos shiny hidden">
                                <div class="header-title">
                                    <i class="fa-solid fa-circle-info"></i>
                                    <h2 class="ab_sel"></h2>
                                    <div class="close-pop-up">
                                        <i class="fa-solid fa-xmark"></i>
                                    </div>
                                </div>
                                <div class="content"></div>
                                <span class="arrow"></span>
                                <div class="content-card-m"></div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="collapsible content">
                <li class="active avt-glass-effect user-page" id="abi-lvl-chart" data-section="section-ld-main">
                    <div class="collapsible-header">
                        <h1 class="title-section">
                            <span id="section-2"></span>
                            <i class="fa-solid fa-chevron-right rotate"></i></h1>
                    </div>
                    <div class="collapsible-body">
                        <div class="chart-container">
                            <canvas id="chart_user_all_abilities"></canvas>
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="collapsible content">
                <li class="active avt-glass-effect user-page" id="abi-lvl-chart-compare" data-section="section-ld-main">
                    <div class="collapsible-header">
                        <h1 class="title-section">
                            <span id="section-3"></span>
                            <i class="fa-solid fa-chevron-right rotate"></i></h1>
                    </div>
                    <div class="collapsible-body">
                        <span id="section-3-bis"></span>
                        <div class="chart-container">
                            <canvas id="chart_user_compare"></canvas>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <?php require "resources/php/includes/footer.php" ?>
    <div class="sidebar-menu">
        <aside>
            <ul class="collapsible">
                <li class="active">
                    <div class="collapsible-header" data-c="aside">
                        <p class="sc-h-1">Server information's</p>
                        <i class="fa-solid fa-chevron-right rotate"></i>
                    </div>
                    <div class="collapsible-body stats-server">
                        <p class="info-details copyToClipboardAction">
                            <i class="fa-solid fa-server"></i>
                            <span class="server-ip"></span>
                            <i class="fa-regular fa-copy"></i>
                        </p>
                        <p class="info-details nb_players">
                            <i class="fa-solid fa-user-group size"></i>
                            <span class="server-player"></span>/<span class="max_players"></span>
                        </p>
                        <p class="info-details">
                            <i class="fa-solid fa-code-branch size"></i>
                            <span class="version"></span>
                        </p>
                        <span class="overlay-stats hidden">
                <i class="fa-solid fa-bolt"></i>
                <p class="sc-h-1-s"></p>
            </span>
                    </div>
                </li>
                <li class="active">
                    <div class="collapsible-header" data-c="aside">
                        <p class="sc-h-2">Shortcuts</p>
                        <i class="fa-solid fa-chevron-right rotate"></i>
                    </div>
                    <div class="collapsible-body">
                        <div class="buttons-to-section">
                            <input class="select-radio-section"
                                   type="radio"
                                   id="info_user_radio_ham"
                                   name="filter_section" data-section_click="user-info">
                            <label class="radio-label btn-main" for="info_user_radio_ham">
                                <i class="fa-solid fa-user"></i>
                                <span class="sc-b-1"></span>
                            </label>
                            <input class="select-radio-section"
                                   type="radio"
                                   id="abilities_level_ham"
                                   name="filter_section" data-section_click="abi-lvl">
                            <label class="radio-label btn-main" for="abilities_level_ham">
                                <i class="fa-solid fa-lightbulb"></i>
                                <span class="sc-b-2"></span>
                            </label>
                            <input class="select-radio-section"
                                   type="radio"
                                   id="abilities_level_chart_ham"
                                   name="filter_section" data-section_click="abi-lvl-chart">
                            <label class="radio-label btn-main" for="abilities_level_chart_ham">
                                <i class="fa-solid fa-chart-simple"></i>
                                <span class="sc-b-3"></span>
                            </label>
                            <input class="select-radio-section"
                                   type="radio"
                                   id="abilities_level_chart_com_ham"
                                   name="filter_section" data-section_click="abi-lvl-chart-compare">
                            <label class="radio-label btn-main" for="abilities_level_chart_com_ham">
                                <i class="fa-solid fa-chart-line"></i>
                                <span class="sc-b-4"></span>
                            </label>
                            <hr class="backToTop">
                            <input class="select-radio-section"
                                   type="radio"
                                   id="backToTop_ham"
                                   name="filter_section" data-section_click="backToTop">
                            <label class="radio-label btn-main backToTop" for="backToTop_ham">
                                <i class="fa-solid fa-arrow-up"></i>
                                <span class="sc-b-999"></span>
                            </label>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="selected-player">
                <div class="collapsible-header qv">
                    <p>QuickView</p>
                    <div class="icon">
                        <i class="fa-solid fa-eye"></i>
                    </div>
                </div>
                <div class="collapsible-body show">
                    <p>Player : <span class="selected-player-name">und</span></p>
                    <p>General <span class="sel_rank_user">0/0</span></p>
                    <p>Current rank <span class="sel_current_rank">000</span></p>
                    <button class="btn-main seeSkill">See skill levels</button>
                </div>
            </div>
        </aside>
    </div>
</main>
</body>
</html>