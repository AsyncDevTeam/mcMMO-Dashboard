<?php

require "../includes/secure.php";
require_once "../../../config/config.php";
/** @var ARRAY $config * */

require '../libraries/php-minecraft-query/MinecraftPing.php';
require '../libraries/php-minecraft-query/MinecraftPingException.php';

use xPaw\MinecraftPing;
use xPaw\MinecraftPingException;

// Init variables
$error = false;
$query = null;
$status = null;

// Try to get server status via ping
try {
    $query = new MinecraftPing($config['server_ip'], $config['server_port']);
    $status = $query->Query();
} catch (MinecraftPingException $e) {
    $error = true;
} finally {
    if ($query) {
        $query->Close();
    }
}

$error = $error || ($status == null);

// Construct our output
$result = array();

if ($config['server_port'] != "25565") {
    $result['hostname'] = $config['server_ip'] . ':' . $config['server_port'];
} else {
    $result['hostname'] = $config['server_ip'];
}

$result['online_players'] = $error ? -1 : $status['players']['online'];
$result['max_players'] = $error ? -1 : $status['players']['max'];
$result['minecraft_version'] = $error ? "none" : $status['version']['name'];
$result['icon'] = $error ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAANSURBVBhXY6APYGAAAABpAAEwm5GQAAAAAElFTkSuQmCC" : $status['favicon'];

$json_result = json_encode($result, JSON_PRETTY_PRINT);
header('Content-Type: application/json');
echo $json_result;