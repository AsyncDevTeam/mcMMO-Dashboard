<?php

require_once "secure.php";
require_once "../../../config/config.php";
/** @var ARRAY $config **/

$dsn =  $config['db_driver'] . ':host=' . $config['db_ip'] . ';port=' . $config['db_port'] . ';dbname=' . $config['db_name'];

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

// Apply SSL options when enabled (MySQL only)
if (!empty($config['db_ssl']) && $config['db_driver'] === 'mysql') {
    if (!empty($config['db_ssl_ca'])) {
        $options[PDO::MYSQL_ATTR_SSL_CA] = $config['db_ssl_ca'];
    }
    if (!empty($config['db_ssl_cert'])) {
        $options[PDO::MYSQL_ATTR_SSL_CERT] = $config['db_ssl_cert'];
    }
    if (!empty($config['db_ssl_key'])) {
        $options[PDO::MYSQL_ATTR_SSL_KEY] = $config['db_ssl_key'];
    }
    $options[PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT] = !empty($config['db_ssl_ca']) && ($config['db_ssl_verify'] ?? true);
}

try {
    $dbh = new PDO($dsn, $config['db_login'], $config['db_pass'], $options);
} catch (PDOException $e) {
    header('Content-Type: application/json');
    if (str_contains($e->getMessage(), 'could not find driver')) {
        echo "{\"error\":\"Could not find php ".$config['db_driver']." driver\"}";
    } else {
        echo "{\"error\":\"".json_encode($e->getMessage(), JSON_PRETTY_PRINT)."\"}";
    }
    exit;
}
