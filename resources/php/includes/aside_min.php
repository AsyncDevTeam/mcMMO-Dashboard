<aside>
    <ul class="collapsible">
        <?php require "server_infos.php" ?>
        <?php
        $s = array(
            'id_1' => 'section_1_radio',
            'id_2' => 'section_2_radio',
        );
        if (isset($comparison) & $comparison) {
            require "shortcut_comparison.php" ;
        }
        ?>
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
    <div class="background-fixed"></div>
</aside>
