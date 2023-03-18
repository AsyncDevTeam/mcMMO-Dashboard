<?php

require_once "../../../config/config.php";
/** @var ARRAY $config **/

$dsn =  $config['db_driver'] . ':host=' . $config['db_ip'] . ';port=' . $config['db_port'] . ';dbname=' . $config['db_name'];

try {

    $dbh = new PDO($dsn, $config['db_login'], $config['db_pass']);
    // Set the PDO error mode to exception
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	// Prevent SQL basic injection
    $dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
	//$dbh->query("SET SQL_MODE='NO_BACKSLASH_ESCAPES';");

} catch (PDOException $e) {

    echo "{\"error\":\"".$e->getMessage()."\"}";
    die();

}