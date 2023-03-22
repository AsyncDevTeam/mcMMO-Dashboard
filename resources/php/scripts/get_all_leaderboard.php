<?php

require "../includes/secure.php";

require "../includes/db_connect.php";
/** @var OBJECT $dbh */

$skills = array("taming", "mining", "woodcutting", "repair", "unarmed", "herbalism", "excavation", "archery", "swords", "axes", "acrobatics", "fishing", "alchemy");
$skills_str = implode(", ", $skills);

$sth = $dbh->prepare('SELECT id, user, lastlogin, total, '.$skills_str.' FROM mcmmo_users INNER JOIN mcmmo_skills ON mcmmo_users.id = mcmmo_skills.user_id');
$sth->execute();

$result = array();

while ($row = $sth->fetch()) {

    $tmp_array = array(
        "id" => $row['id'],
        "name" => $row['user'],
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

}

$json_result = json_encode($result, JSON_PRETTY_PRINT);
header('Content-Type: application/json');
echo $json_result;

require "../includes/db_quit.php";