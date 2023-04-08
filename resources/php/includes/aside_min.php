<aside>
    <ul class="collapsible">
        <li class="active">
            <div class="collapsible-header" data-c="aside">
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
            <div class="collapsible-header" data-c="aside">
                <p class="sc-h-2-a"></p>
                <i class="fa-solid fa-chevron-right rotate"></i>
            </div>
            <div class="collapsible-body stats-server">
                <div class="sort">
                    <?php
                    if (isset($params)) {
                        $list = $params['list'];
                        $element = $params['element'];
                        echo "<button class=\"btn-main\" onclick=\"sort('$list', '.sort_N', '$element')\"><span class=\"sort_n\"></span><i class=\"fa-solid sort_N fa-arrow-down-1-9\"></i></button>";
                        echo "<button class=\"btn-main\" onclick=\"sort('$list', '.sort_A', '$element')\"><span class=\"sort_a\"></span><i class=\"fa-solid sort_A fa-arrow-down-a-z\"></i></button>";
                    } else {
                        echo "<div class='row-no-filter'><i class='fa-solid fa-triangle-exclamation'></i></i><p class='no-filter-button'>Filter buttons not available</p></div>";
                    }
                    ?>
                </div>
            </div>
        </li>
    </ul>
<!--    --><?php //require "square-infos.php" ?>
    <div class="background-fixed"></div>
</aside>