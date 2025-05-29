<?php

require "../includes/secure.php";

require "../includes/db_connect.php";
/** @var OBJECT $dbh */

$skills = array("taming", "mining", "woodcutting", "repair", "unarmed", "herbalism", "excavation", "archery", "swords", "axes", "acrobatics", "fishing", "alchemy", "crossbows", "tridents", "maces");
$skills_str = implode(", ", $skills);

try {
    $sth = $dbh->prepare('SELECT id, user, lastlogin, total, uuid, ' . $skills_str . ' FROM mcmmo_users INNER JOIN mcmmo_skills ON mcmmo_users.id = mcmmo_skills.user_id ORDER BY total DESC');
    $sth->execute();
} catch (PDOException $e) {
    header('Content-Type: application/json');
    echo "{\"error\":\"" . json_encode($e->getMessage(), JSON_PRETTY_PRINT) . "\"}";
    exit;
}

$result = array();

$rank = 1;

while ($row = $sth->fetch()) {

    $tmp_array = array(
        "id" => $row['id'],
        "rank" => $rank,
        "name" => $row['user'],
        "uuid" => $row['uuid'],
        "bedrock" => str_starts_with($row['uuid'], '00000000') ? 1 : 0,
        "total" => $row['total'],
        "last_connection" => $row['lastlogin']
    );

    $values = array();
    foreach ($skills as $skill) {
        $tmp_array[$skill] = $row[$skill];
        $values[] = $row[$skill];
    }

    $tmp_array["skills"] = $values;

    $result['players'][] = $tmp_array;

    $rank++;
}

$json_result = json_encode($result, JSON_PRETTY_PRINT);
header('Content-Type: application/json');
echo $json_result;

require "../includes/db_quit.php";