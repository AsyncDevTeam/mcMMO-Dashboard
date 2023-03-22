<?php

require "../includes/secure.php";

require "../includes/db_connect.php";
/** @var OBJECT $dbh */

$skills = [
    "taming", "mining", "woodcutting", "repair", "unarmed", "herbalism", "excavation", "archery", "swords", "axes", "acrobatics", "fishing", "alchemy"
];
$result = [];

foreach ($skills as $skill) {
    $sql_min = "SELECT u.user, s.$skill FROM mcmmo_users u JOIN mcmmo_skills s ON u.id = s.user_id ORDER BY s.$skill ASC LIMIT 1";
    $sql_max = "SELECT u.user, s.$skill FROM mcmmo_users u JOIN mcmmo_skills s ON u.id = s.user_id ORDER BY s.$skill DESC LIMIT 1";
    $sql_avg_no_zero = "SELECT AVG(s.$skill) as average FROM mcmmo_skills s WHERE s.$skill > 0";
    $sql_avg_with_zero = "SELECT AVG(s.$skill) as average FROM mcmmo_skills s";

    $min = $dbh->query($sql_min)->fetch();
    $max = $dbh->query($sql_max)->fetch();
    $avg_no_zero = $dbh->query($sql_avg_no_zero)->fetch();
    $avg_with_zero = $dbh->query($sql_avg_with_zero)->fetch();

    $result[$skill] = [
        "min" => [
            "value" => $min[$skill],
            "player" => $min['user']
        ],
        "max" => [
            "value" => $max[$skill],
            "player" => $max['user']
        ],
        "mean" => [
            "value_without_zero" => round($avg_no_zero['average'], 2),
            "value_with_zero" => round($avg_with_zero['average'], 2)
        ]
    ];
}

$json_result = json_encode($result, JSON_PRETTY_PRINT);
header('Content-Type: application/json');
echo $json_result;

require "../includes/db_quit.php";