<li class="active">
    <div class="collapsible-header" data-c="aside">
        <p class="sc-h-2"></p>
        <i class="fa-solid fa-chevron-right rotate"></i>
    </div>
    <div class="collapsible-body">
        <div class="buttons-to-section">
            <?php
            if (isset($s)) {
                $id_1 = $s['id_1'];
                $id_2 = $s['id_2'];
                echo "<input class=\"select-radio-section\" type=\"radio\" id=$id_1 name=\"filter_section\" data-section_click=\"section_1\"><label class=\"radio-label btn-main\" for=$id_1><i class=\"fa-solid fa-user-group\"></i><span class=\"sc-b-1\"></span></label>";
                echo "<input class=\"select-radio-section\" type=\"radio\" id=$id_2 name=\"filter_section\" data-section_click=\"section_2\"><label class=\"radio-label btn-main\" for=$id_2><i class=\"fa-solid fa-chart-pie\"></i><span class=\"sc-b-2\"></span></label>";
            } else {
                echo "<div class='row-no-filter'><i class='fa-solid fa-triangle-exclamation'></i></i><p class='no-filter-button'>Not available</p></div>";
            }
            ?>
        </div>
    </div>
</li>