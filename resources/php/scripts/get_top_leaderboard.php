<?php

require "../includes/secure.php";

if (!isset($_GET['top']) || $_GET['top'] < 1) {
    $top = 5;
} else {
    $top = $_GET['top'];
}

require "../includes/db_connect.php";
/** @var OBJECT $dbh */

require_once "../../../config/config.php";
/** @var ARRAY $config **/

$sth = $dbh->prepare('SELECT user, total FROM mcmmo_users INNER JOIN mcmmo_skills ON mcmmo_users.id = mcmmo_skills.user_id ORDER BY mcmmo_skills.total DESC LIMIT :top');
$sth->bindParam(':top', $top, PDO::PARAM_INT);
$sth->execute();

$result = array();

while ($row = $sth->fetch()) {

    $tmp_array = array(
        "name" => $row['user'],
        "total" => $row['total']
    );

    $result['players'][] = $tmp_array;

}

// After, get server latest informations, TODO: still needed ?

require '../libraries/php-minecraft-query/MinecraftPing.php';
require '../libraries/php-minecraft-query/MinecraftPingException.php';

use xPaw\MinecraftPing;
use xPaw\MinecraftPingException;

$error = false;
$query = null;
$status = null;

try
{
    $query = new MinecraftPing($config['server_ip'], $config['server_port']);
    $status = $query->Query();
}
catch(MinecraftPingException $e)
{
    $error = true;
}
finally
{
    if($query)
    {
        $query->Close();
    }
}

$error = $error || ($status == null);

$result['online_players'] = $error ? -1 : $status['players']['online'];
$result['max_players'] = $error ? -1 : $status['players']['max'];

$json_result = json_encode($result, JSON_PRETTY_PRINT);
header('Content-Type: application/json');
echo $json_result;

require "../includes/db_quit.php";