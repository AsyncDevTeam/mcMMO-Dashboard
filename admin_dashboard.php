<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- header base -->
    <?php require "resources/php/includes/head_all.php" ?>
    <!-- chartjs -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js" defer></script>
    <script src="resources/js/admin_pages.js" defer></script>
    <!-- style of the page -->
    <link rel="stylesheet" href="resources/css/admin_pages.css">
</head>
<body>
<!-- header include-->
<header class="hidden">
    <div class="main pages">
        <a id="website-title" href="index.php"></a>
        <a href="index.php">
            <img src="resources/others/textures/defaultLogo/def.webp" alt="Logo of server running the website"
                 id="server-logo">
        </a>
    </div>
    <div class="loading-bar">
        <div class="container">
            <span class="loader"></span>
            <span class="loader"></span>
        </div>
    </div>
</header>
<main>
    <dialog></dialog>

    <div class="notify">
        <i class="fa-solid fa-circle-info"></i>
        <p>
            Previously, you had to manually modify parameters.js file.
            No more need of hard skill or stressful time thinking of mistakes that should break your dashboard.
        </p>
    </div>

    <div class="setup-wrapper">
        <div class="tabs-container-settings">
            <div class="header-settings">
                <button class="btn-main" id="saveForm">Save</button>
                <label>
                    <input type="radio" name="settings-tabs" value="settings" data-select="mcd-settings" checked>
                    <text>Settings</text>
                    <span></span>
                </label>
                <label>
                    <input type="radio" name="settings-tabs" value="design" data-select="mcd-design">
                    <text>Design</text>
                    <span></span>
                </label>
                <label>
                    <input type="radio" name="settings-tabs" value="language" data-select="mcd-language">
                    <text>Language</text>
                    <span></span>
                </label>
                <label>
                    <input type="radio" name="settings-tabs" value="section" data-select="mcd-sections">
                    <text>Sections</text>
                    <span></span>
                </label>
                <label>
                    <input type="radio" name="settings-tabs" value="themes" data-select="mcd-themes">
                    <text>Themes</text>
                    <span></span>
                </label>
            </div>
            <form action="store_data.php" method="post" class="setup-form">
                <div class="page-settings" data-name="mcd-settings">
                    <div class="row">
                        <h1>
                            <i class="fa-solid fa-font"></i>
                            Dashboard title</h1>
                        <label for="">Change dashboard title
                            <input type="text" placeholder="Title" name="db-title">
                        </label>
                        <p>Current name is <span>mcMMO Dashboard</span>.</p>
                    </div>
                    <div class="row">
                        <h1>
                            <i class="fa-solid fa-person-rays"></i>
                            Animated skin</h1>
                        <label for="animated-skin">
                            <input type="checkbox" name="db-animated-skin" id="animated-skin">
                            Enable/disable animated skin.
                        </label>
                        <p>Enable or disable skin animation in user page. If enabled, user's skin will automatically loads with a random <animation class=""></animation></p>
                    </div>
                    <div class="row">
                        <h1>
                            <i class="fa-solid fa-circle-half-stroke"></i>
                            Dark mode</h1>
                        <label for="dark-mode">
                            <input type="checkbox" name="db-dark-mode" id="dark-mode">
                            Enable/disable default dark mode.
                        </label>
                        <p>Enable or disable default dark mode for all pages.</p>
                    </div>
                    <div class="row">
                        <h1>
                            <i class="fa-solid fa-box-archive"></i>
                            Local Storage</h1>
                        <label for="local-storage">
                            <input type="checkbox" name="db-local-storage" id="local-storage">
                            Enable/disable local storage.
                        </label>
                        <p>Enable data storage in your localStorage (persistent when browser closed), or in sessionStorage (volatile).</p>
                        <label for="local-storage-refresh">Choose refresh interval.
                            <select name="db-local-storage-refresh" id="local-storage-refresh">
                                <option value="h">hourly</option>
                                <option value="6h">six-hourly</option>
                                <option value="12h">twelve-hourly</option>
                                <option value="d">daily</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div class="page-design hidden" data-name="mcd-design">
                    <div class="row" data-section="colors">
                        <h1><i class="fa-solid fa-brush"></i>Colors</h1>
                        <div class="sub-row">
                            <div class="col">
                                <div class="header-col">
                                    <h4>Background gradient</h4>
                                </div>
                                <div class="data-col">
                                    <div class="line">
                                        <text>Start color</text>
                                        <label for="gradient-color-start-text">
                                            <input type="text" id="gradient-color-start-text"
                                                   name="db-gradient-color-start-text"
                                                   placeholder="#000123">
                                        </label>
                                        <label for="gradient-color-start">
                                            <input type="color" id="--grad1" name="db-gradient-color-start">
                                        </label>
                                    </div>
                                    <div class="line">
                                        <text>End color</text>
                                        <label for="gradient-color-end-text">
                                            <input type="text" id="gradient-color-end-text"
                                                   name="db-gradient-color-end-text"
                                                   placeholder="#000123">
                                        </label>
                                        <label for="gradient-color-end">
                                            <input type="color" id="--grad2" name="db-gradient-color-end">
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="sub-row">
                            <div class="col">
                                <div class="header-col">
                                    <h4>Light Color</h4>
                                </div>
                                <div class="data-col" data-type="light">
                                    <div class="line">
                                        <text>Main color</text>
                                        <label for="main-color-text">
                                            <input type="text" id="main-color-text"
                                                   name="db-main-color-text"
                                                   placeholder="#000123">
                                        </label>
                                        <label for="main-color">
                                            <input type="color" id="main-color" name="db-main-color">
                                        </label>
                                    </div>
                                    <div class="line">
                                        <text>Secondary color</text>
                                        <label for="secondary-color-text">
                                            <input type="text" id="secondary-color-text"
                                                   name="db-secondary-color-text"
                                                   placeholder="#000123">
                                        </label>
                                        <label for="secondary-color">
                                            <input type="color" id="secondary-color" name="db-secondary-color">
                                        </label>
                                    </div>
                                    <div class="line">
                                        <text>Active color</text>
                                        <label for="active-color-text">
                                            <input type="text" id="active-color-text"
                                                   name="db-main-color-text"
                                                   placeholder="#000123">
                                        </label>
                                        <label for="active-color">
                                            <input type="color" id="--active-color" name="db-active-color">
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="header-col">
                                    <h4>Dark Color</h4>
                                </div>
                                <div class="data-col" data-type="dark">
                                    <div class="line">
                                        <text>Main color</text>
                                        <label for="main-color-text">
                                            <input type="text" id="main-color-text"
                                                   name="db-main-color-text"
                                                   placeholder="#000123">
                                        </label>
                                        <label for="main-color">
                                            <input type="color" id="main-color-dark" name="db-main-color">
                                        </label>
                                    </div>
                                    <div class="line">
                                        <text>Secondary color</text>
                                        <label for="secondary-color-text">
                                            <input type="text" id="secondary-color-text"
                                                   name="db-main-color-text"
                                                   placeholder="#000123">
                                        </label>
                                        <label for="secondary-color">
                                            <input type="color" id="secondary-color-dark" name="db-secondary-color">
                                        </label>
                                    </div>
                                    <div class="line">
                                        <text>Active color</text>
                                        <label for="active-color-text">
                                            <input type="text" id="active-color-text"
                                                   name="db-main-color-text"
                                                   placeholder="#000123">
                                        </label>
                                        <label for="active-color">
                                            <input type="color" id="active-color" name="db-active-color">
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="sub-row">
                            <div class="col">
                                <div class="header-col">
                                    <h4>Tint colors (usage in charts)</h4>
                                </div>
                                <div class="data-col tint_container">
                                    <div class="line tint_" data-clone="en">
                                        <text class="tint_label">Set an initial color and blend the remaining colors gradually.</text>
                                        <label for="tint_XX_-text">
                                            <input type="text" id="tint_XX_-text"
                                                   name="db-tint_XX_-text"
                                                   placeholder="#000123">
                                        </label>
                                        <label for="tint_gradient">
                                            <input type="color" id="tint_gradient" name="db-tint_gradient">
                                        </label>
                                    </div>
                                    <hr>
                                    <text>Set all colors independently.</text>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="page-language hidden" data-name="mcd-language">
                    <div class="row">
                        <h1>
                            <i class="fa-solid fa-language"></i>
                            Language</h1>
                        <label for="setup-lang">Choose the language to use.
                            <select name="db-language" id="setup-lang">
                                <option value="EN">English</option>
                                <option value="FR">French</option>
                                <option value="DE">Deutsch</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div class="page-sections hidden" data-name="mcd-sections">
                    <div class="row" data-section="sections">
                        <h1>
                            <i class="fa-solid fa-sort"></i>
                            Sections</h1>
                        <div class="sub-row">
                            <label for="section-1-c">
                                <input type="checkbox" id="section-1-c" name="db-section-1-show">
                            </label>
                            <label for="section-1-title">
                                <input type="text" id="section-1-title" placeholder="Title" name="db-section-1-title">
                            </label>
                            <p>Current name is <span>section-1</span>.</p>
                        </div>
                        <div class="sub-row">
                            <label for="section-2-c">
                                <input type="checkbox" id="section-2-c" name="db-section-2-show">
                            </label>
                            <label for="section-2-title">
                                <input type="text" id="section-2-title" placeholder="Title" name="db-section-2-title">
                            </label>
                            <p>Current name is <span>section-2</span>.</p>
                        </div>
                    </div>
                    <div class="row" data-section="sections">
                        <h1>Sections</h1>
                        <div class="sub-row">
                            <label for="section-1-c">
                                <input type="checkbox" id="section-1-c" name="db-section-1-show">
                            </label>
                            <label for="section-1-title">
                                <input type="text" id="section-1-title" placeholder="Title" name="db-section-1-title">
                            </label>
                            <p>Current name is <span>section-1</span>.</p>
                        </div>
                        <div class="sub-row">
                            <label for="section-2-c">
                                <input type="checkbox" id="section-2-c" name="db-section-2-show">
                            </label>
                            <label for="section-2-title">
                                <input type="text" id="section-2-title" placeholder="Title" name="db-section-2-title">
                            </label>
                            <p>Current name is <span>section-2</span>.</p>
                        </div>
                    </div>
                </div>
                <div class="page-themes hidden" data-name="mcd-themes">
                    <div class="row" data-section="themes">
                        <h1>
                            <i class="fa-solid fa-palette"></i>
                            Themes</h1>
                        <p>
                            Add a theme for your dashboard.
                            Go on <a href="mcmmo.nicolasvaillant.net/themes">mcmmo.nicolasvaillant.net/themes</a>
                            to get your first theme!
                        </p>
                        <div class="sub-row">
                            <div class="slider-themes">
                                <label for="theme-blue">
                                    <input type="checkbox" name="themes-radio" class="themes-suggestion" id="theme-blue">
                                    <div class="mc-blue card">
                                        <img class="banner-top" src="https://mcmmo.nicolasvaillant.net/resources/themes/mc/blue/mc-blue.png" alt="theme-blue">
                                        <span class="line">
                                        <text>Bleu Céleste</text>
                                    </span>
                                    </div>
                                </label>
                                <label for="theme-green">
                                    <input type="checkbox" name="themes-radio" class="themes-suggestion" id="theme-green">
                                    <div class="mc-green card">
                                        <img class="banner-top" src="https://mcmmo.nicolasvaillant.net/resources/themes/mc/green/mc-green.png" alt="theme-green">
                                        <span class="line">
                                        <text>Vert Printanier</text>
                                    </span>
                                    </div>
                                </label>
                                <label for="theme-red">
                                    <input type="checkbox" name="themes-radio" class="themes-suggestion" id="theme-red">
                                    <div class="mc-red card">
                                        <img class="banner-top" src="https://mcmmo.nicolasvaillant.net/resources/themes/mc/red/mc-red.png" alt="theme-green">
                                        <span class="line">
                                        <text>Rouge Ardent</text>
                                    </span>
                                    </div>
                                </label>
                                <label for="theme-orange">
                                    <input type="checkbox" name="themes-radio" class="themes-suggestion" id="theme-orange">
                                    <div class="mc-orange card">
                                        <img class="banner-top" src="https://mcmmo.nicolasvaillant.net/resources/themes/mc/orange/mc-orange.png" alt="theme-orange">
                                        <span class="line">
                                        <text>Orange Cuivré</text>
                                    </span>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <label for=""> Add a theme
                            <input type="file" placeholder="Add a theme">
                        </label>
                    </div>
                </div>
            </form>
        </div>
        <div class="preview-container">
            <div class="view">
                <div class="header">
                    <div class="main pages">
                        <a class="pr-title">mcMMO Dashboard</a>
                        <a>
                            <img src="resources/others/textures/defaultLogo/def.webp" alt="Logo of server running the website"
                                 id="server-logo">
                        </a>
                    </div>
                    <div class="tabs_header">
                        <a>
                            <i class="fa-solid fa-house"></i>
                            <span class="tabs-1"></span>
                        </a>
                        <a>
                            <i class="fa-solid fa-user"></i>
                            <span class="tabs-2"></span>
                        </a>
                        <a>
                            <i class="fa-solid fa-table-columns"></i>
                            <span class="tabs-3"></span>
                        </a>
                        <label for="darkMode-input">
                            <input type="checkbox" id="darkMode-input">
                            <i class="fa-solid fa-circle-half-stroke"></i>
                            <span class="tabs-dm"></span>
                        </label>
                    </div>
                </div>
                <div class="content">
                    <div class="aside">
                        <ul class="collapsible">
                            <li class="active">
                                <div class="collapsible-header" tabindex="0">
                                    <p class="sc-h-1">Server information's</p>
                                    <i class="fa-solid fa-chevron-right rotate"></i>
                                </div>
                                <div class="collapsible-body stats-server" style="display: block;">
                                    <p class="info-details copyToClipboardAction show">
                                        <i class="fa-solid fa-server"></i>
                                        <span class="server-ip">ns1.mathieuar.fr:10101</span>
                                        <i class="fa-regular fa-copy"></i>
                                    </p>
                                    <p class="info-details nb_players show">
                                        <i class="fa-solid fa-user-group size"></i>
                                        <span class="server-player">0</span>/<span class="max_players">666</span>
                                    </p>
                                    <p class="info-details show">
                                        <i class="fa-solid fa-code-branch size"></i>
                                        <span class="version">Paper 1.19.3</span>
                                    </p>
                                    <span class="overlay-stats hidden">
                                    <i class="fa-solid fa-bolt"></i>
                                    <p class="sc-h-1-s">Server offline</p>
                                </span>
                                </div>
                            </li>
                            <li class="active">
                                <div class="collapsible-header" data-c="aside" tabindex="0">
                                    <p class="sc-h-2">Shortcuts</p>
                                    <i class="fa-solid fa-chevron-right rotate"></i>
                                </div>
                                <div class="collapsible-body" style="display: block;">
                                    <div class="buttons-to-section">
                                        <input class="select-radio-section leaderboard_radio_ham" type="radio" id="leaderboard_radio" name="filter_section" data-section_click="ld-main" checked>
                                        <label class="radio-label btn-main" for="leaderboard_radio">
                                            <i class="fa-solid fa-user-group"></i>
                                            <span class="sc-b-1">Leaderboard</span>
                                        </label>
                                        <input class="select-radio-section by_abilities_radio_ham" type="radio" id="by_abilities_radio" name="filter_section" data-section_click="abi">
                                        <label class="radio-label btn-main" for="by_abilities_radio">
                                            <i class="fa-solid fa-lightbulb"></i>
                                            <span class="sc-b-2">Player distribution by level</span>
                                        </label>
                                        <input class="select-radio-section by_abilities_radio_ham" type="radio" id="by_abilities_radio_pie" name="filter_section" data-section_click="abi-pie">
                                        <label class="radio-label btn-main" for="by_abilities_radio_pie">
                                            <i class="fa-solid fa-chart-pie"></i>
                                            <span class="sc-b-3">Skill distribution</span>
                                        </label>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="wrapper">
                        <ul class="collapsible">
                            <li class="active avt-glass-effect">
                                <div class="collapsible-header">
                                    <h1 class="title-section">
                                        <span id="section-1"></span>
                                    </h1>
                                    <p>Refreshed at 10:00</p>
                                </div>
                                <div class="collapsible-body">
                                    <div class="content_bp"></div>
                                </div>
                            </li>
                            <li class="active avt-glass-effect">
                                <div class="collapsible-header">
                                    <h1 class="title-section">
                                        <span id="">Chart example</span>
                                        <i class="fa-solid fa-chevron-right rotate"></i></h1>
                                </div>
                                <div class="collapsible-body">
                                    <canvas id="chart_example" aria-label="chart"></canvas>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="save-banner hidden">
            <p>
                <i class="fas-solid fa-important"></i>
                Don't forget to save your changes!
            </p>
            <button class="btn-main">Save</button>
        </div>
    </div>
</main>
</body>
</html>