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
        <a id="links-box-button">
            <i class="fa-solid fa-link"></i>
            <span class="tabs-4"></span>
            <span class="links-box-box" id="draggable">
                <span class="header-box">
                    <p class="title-server-lks"></p>
                    <i class="fa-solid fa-circle-xmark"></i>
                </span>
                <a class="links-lks" data-clone="init">
                    <i class="icon-lks fa-regular fa-square"></i>
                    <text class="text-lks">ok</text>
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
            </span>
        </a>
        <label for="darkMode-input">
            <input type="checkbox" id="darkMode-input">
            <i class="fa-solid fa-circle-half-stroke"></i>
            <span class="tabs-dm"></span>
        </label>
    </div>
    <div class="loading-bar">
        <div class="container">
            <span class="loader"></span>
            <span class="loader"></span>
        </div>
    </div>
</header>