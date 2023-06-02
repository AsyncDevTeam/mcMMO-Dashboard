<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- header base -->
    <?php require "resources/php/includes/head_all.php" ?>
    <?php require "resources/php/includes/head_pages.php" ?>
    <!-- chartjs -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js" defer></script>
    <!-- script of the project -->
    <script src="resources/js/main.js" defer></script>
    <script src="resources/js/comparison.js" defer></script>
</head>
<body>
<!-- header include-->
<?php require "resources/php/includes/header.php" ?>
<?php
if(isset($_GET["player_1"]) || isset($_GET["player_2"])){
    $player_1 = $_GET["player_1"];
    $player_2 = $_GET["player_2"];
    echo "<script>let from_url = true; let player_1_from_url = ".json_encode($player_1).";let player_2_from_url = ".json_encode($player_2)."</script>";
}else{
    echo "<script>let from_url = false;</script>";
}
?>
<main>
    <label for="no-display-input">
        <input type="text" class="copyToClipboard hidden" value="" id="no-display-input">
    </label>
    <div class="wrapper">
        <?php
        $comparison = true;
        $params = array(
            'list' => '.table-compare',
            'element' => 'div.row-compare',
        );
        require "resources/php/includes/aside_min.php"
        ?>
        <div class="content-main content compare">
            <ul class="collapsible content">
                <li class="active avt-glass-effect" id="section_1" data-section="">
                    <div class="collapsible-header">
                        <h1 class="title-section">
                            <span id="section-1"></span>
                            <i class="fa-solid fa-chevron-right rotate"></i></h1>
                    </div>
                    <div class="collapsible-body">
                        <div class="cont">
                            <div class="top-skin">
                                <div class="col fp">
                                    <img src="https://mc-heads.net/body/mhd_steve" alt="skin player 1" class="img-compare">
                                    <a class="a-compare btn-main">
                                        <span class="see_profile"></span>
                                        <i class="fa-solid">↗</i>
                                    </a>
                                </div>
                                <div class="col fp">
                                    <div class="vs"></div>
                                    <p class="label-vs">VS</p>
                                </div>
                                <div class="col lp">
                                    <img src="https://mc-heads.net/body/mhd_steve/left" alt="skin player 2" class="img-compare">
                                    <a class="a-compare btn-main">
                                        <span class="see_profile"></span>
                                        <i class="fa-solid">↗</i>
                                    </a>
                                </div>
                            </div>
                            <div class="header-compare">
                                <div class="line-top">
                                    <label for="player-1">
                                        <select name="player-1" id="s-player-1"></select>
                                    </label>
                                    <div class="cont-vs">
                                        <div class="player">
                                            <img src="https://mc-heads.net/avatar/mhd_steve" alt="head player 1" class="img-compare-head">
                                            <a class="a-compare btn-main">
                                                <span class="see_profile"></span>
                                                <i class="fa-solid">↗</i>
                                            </a>
                                        </div>
                                        <div class="vs-compare">VS</div>
                                        <div class="player sec">
                                            <img src="https://mc-heads.net/avatar/mhd_steve" alt="head player 2" class="img-compare-head">
                                            <a class="a-compare btn-main">
                                                <span class="see_profile"></span>
                                                <i class="fa-solid">↗</i>
                                            </a>
                                        </div>
                                        </div>
                                    <label for="player-2">
                                        <select name="player-2" id="s-player-2"></select>
                                    </label>
                                </div>
                            </div>
                            <div class="table-compare"></div>
                        </div>
                    </div>
                </li>
                <li class="active avt-glass-effect" id="section_2" data-section="">
                    <div class="collapsible-header">
                        <h1 class="title-section">
                            <span id="section-2"></span>
                            <i class="fa-solid fa-chevron-right rotate"></i></h1>
                    </div>
                    <div class="collapsible-body">
                        <div class="chart-container">
                            <canvas id="chart_comparison"></canvas>
                        </div>
                    </div>
                </li>
            </ul>
            <?php require "resources/php/includes/back_to_top.php" ?>
        </div>
    </div>
    <?php require "resources/php/includes/footer.php" ?>
    <?php
    $comparison = true;
    $params = array(
        'list' => '.table-compare',
        'element' => 'div.row-compare',
    );
    require "resources/php/includes/aside_min_wide.php"
    ?>
</main>
</body>
</html>