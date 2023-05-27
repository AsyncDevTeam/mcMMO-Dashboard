<?php

require "../includes/secure.php";

require "../includes/bedrock.php";
/** @var ARRAY $allow_bedrock */

require "../includes/db_connect.php";
/** @var OBJECT $dbh */

$skills = array("taming", "mining", "woodcutting", "repair", "unarmed", "herbalism", "excavation", "archery", "swords", "axes", "acrobatics", "fishing", "alchemy");
$skills_str = implode(", ", $skills);

$sth = $dbh->prepare('SELECT id, user, lastlogin, total, uuid, '.$skills_str.' FROM mcmmo_users INNER JOIN mcmmo_skills ON mcmmo_users.id = mcmmo_skills.user_id ORDER BY total DESC');
$sth->execute();

$result = array();

$rank = 1;

while ($row = $sth->fetch()) {

    $tmp_array = array(
        "id" => $row['id'],
        "rank" => $rank,
        "name" => $row['user'],
        "uuid" => $row['uuid'],
        "bedrock" => $allow_bedrock,
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