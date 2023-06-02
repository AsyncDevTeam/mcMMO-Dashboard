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
        if (isset($params)) {
            $list = $params['list'];
            $element = $params['element'];
            $b1 = "<button class=\"btn-main\" onclick=\"sort('$list', '.sort_N', '$element')\"><span class=\"sort_n\"></span><i class=\"fa-solid sort_N fa-arrow-down-1-9\"></i></button>";
            $b2 = "<button class=\"btn-main\" onclick=\"sort('$list', '.sort_A', '$element')\"><span class=\"sort_a\"></span><i class=\"fa-solid sort_A fa-arrow-down-a-z\"></i></button>";
            echo "<li class='active'><div class='collapsible-header' data-c='aside'><p class='sc-h-2-a'></p><i class='fa-solid fa-chevron-right rotate'></i></div><div class='collapsible-body stats-server'><div class='sort'>".$b1.$b2."</div></div></li>";
        }
        ?>

    </ul>
    <div class="background-fixed"></div>
</aside>
