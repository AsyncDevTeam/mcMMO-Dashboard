<?php

require "../includes/secure.php";

if (!isset($_GET['name'])) {
    header('Content-Type: application/json');
    echo "{\"error\":\"No input\"}";
    exit;
} else {
    $player_name = $_GET['name'];
}

require "../includes/db_connect.php";
/** @var OBJECT $dbh */

$skills = array("taming", "mining", "woodcutting", "repair", "unarmed", "herbalism", "excavation", "archery", "swords", "axes", "acrobatics", "fishing", "alchemy", "crossbows", "tridents", "maces");
$skills_str = implode(", ", $skills);

$sth_lvl = $dbh->prepare('SELECT lastlogin, total, uuid, '.$skills_str.' FROM mcmmo_users INNER JOIN mcmmo_skills ON mcmmo_users.id = mcmmo_skills.user_id WHERE mcmmo_users.user = :player');
$sth_lvl->bindParam(':player', $player_name);
$sth_lvl->execute();

$sth_exp = $dbh->prepare('SELECT '.$skills_str.' FROM mcmmo_users INNER JOIN mcmmo_experience ON mcmmo_users.id = mcmmo_experience.user_id WHERE mcmmo_users.user = :player');
$sth_exp->bindParam(':player', $player_name);
$sth_exp->execute();

$row_lvl = $sth_lvl->fetch();
$row_exp = $sth_exp->fetch();
if ($row_lvl == null || $row_exp == null) {
    header('Content-Type: application/json');
    echo "{\"error\":\"Input doesn't exist in the database\"}";
    exit;
}

$result = array();

$result["total"] = $row_lvl['total'];
$result["last_connection"] = $row_lvl['lastlogin'];
$result["name"] = $player_name;
$result["uuid"] = $row_lvl['uuid'];
$result["bedrock"] = str_starts_with($row_lvl['uuid'], '00000000') ? 1 : 0;

foreach ($skills as $skill) {
    $curr_lvl = $row_lvl[$skill];

    $tmp_array = array(
        "lvl" => $curr_lvl,
        "exp" => $row_exp[$skill],
        "max" => (10 * (($curr_lvl + 1) - $curr_lvl) * (($curr_lvl + 1) + $curr_lvl + 101))
    );

    $result[$skill] = $tmp_array;
}

$json_result = json_encode($result, JSON_PRETTY_PRINT);
header('Content-Type: application/json');
echo $json_result;

require "../includes/db_quit.php";