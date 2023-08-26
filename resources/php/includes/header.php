<header>
    <div class="main">
        <button class="hamburger-menu btn-main" onclick="openSidebar(this)">
            <i class="fa-solid fa-bars icon-hamburger"></i>
            <div class="icon hidden"><i class="fa-solid fa-eye"></i></div>
        </button>
        <a id="website-title" href="index.php"></a>
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
        <a href="comparison.php">
            <i class="fa-solid fa-table-columns"></i>
            <span class="tabs-3"></span>
        </a>
        <a class="dropdown-more-container">
            <div class="dropdown-more-button">
                <i class="fa-solid fa-chevron-down"></i>
                <span class="tabs-more"></span>
            </div>
            <ul class="dropdown-more-menu">
                <li class="drop-1-title"></li>
                <li class="links-box-button">
                    <i class="fa-solid fa-link"></i>
                    <text class="drop-1"></text>
                    <span class="links-box-box"></span>
                </li>
                <li class="drop-2-title"></li>
                <label for="darkMode-input" class="no-input">
                    <input type="checkbox" id="darkMode-input">
                    <i class="fa-solid fa-circle-half-stroke"></i>
                    <span class="tabs-dm"></span>
                </label>
                <div class="animation-toggle">
                    <li class="drop-3-title"></li>
                    <label for="animated-skin-input">
                        <input type="checkbox" id="animated-skin-input">
                        <text class="drop-3"></text>
                    </label>
                </div>
            </ul>
        </a>
    </div>
    <div class="loading-bar">
        <div class="container">
            <span class="loader"></span>
            <span class="loader"></span>
        </div>
    </div>
</header>
<a class="links-lks" data-clone="init">
    <i class="icon-lks fa-regular fa-square"></i>
    <text class="text-lks">ok</text>
    <i class="fa-solid fa-arrow-up-right-from-square"></i>
</a>