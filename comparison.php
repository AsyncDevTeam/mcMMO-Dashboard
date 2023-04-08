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
    <script src="resources/js/comparison.js" defer></script>
</head>
<body>
<!-- header include-->
<?php require "resources/php/includes/header.php" ?>
<main>
    <label for="no-display-input">
        <input type="text" class="copyToClipboard hidden" value="" id="no-display-input">
    </label>
    <div class="wrapper">
        <?php
            $params = array(
                'list' => '.table-compare',
                'element' => 'div.row-compare',
            );
            require "resources/php/includes/aside_min.php"
        ?>
        <div class="content-main compare">
            <div class="cont">
                <div class="top-skin">
                    <div class="col fp">
                        <img src="https://mc-heads.net/body/mhd_steve" alt="skin player 1" class="img-compare">
                    </div>
                    <div class="col fp">
                        <div class="vs"></div>
                        <p class="label-vs">VS</p>
                    </div>
                    <div class="col lp">
                        <img src="https://mc-heads.net/body/mhd_steve/left" alt="skin player 2" class="img-compare">
                    </div>
                </div>
                <div class="header-compare">
                    <div class="line-top">
                        <label for="player-1">
                            <select name="player-1" id="s-player-1"></select>
                        </label>
                        <div class="cont-vs">
                            <img src="https://mc-heads.net/avatar/mhd_steve" alt="head player 1" class="img-compare-head">
                            <div class="vs-compare">VS</div>
                            <img src="https://mc-heads.net/avatar/mhd_steve" alt="head player 2" class="img-compare-head">
                        </div>
                        <label for="player-2">
                            <select name="player-2" id="s-player-2"></select>
                        </label>
                    </div>
                </div>
                <div class="table-compare"></div>
            </div>
            <div class="chart-container">
                <canvas id="chart_comparison"></canvas>
            </div>
        </div>
    </div>
    <?php require "resources/php/includes/footer.php" ?>
    <?php
        $params = array(
            'list' => '.table-compare',
            'element' => 'div.row-compare',
        );
        require "resources/php/includes/aside_min_wide.php"
    ?>
</main>
</body>
</html>