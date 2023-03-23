<?php

/**
 * Want to debug, test the scripts and avoid "Access denied" ?
 * Just put $debug = true; instead of false !
 */

$debug = false;
//$debug = true;

session_start();

function isValidRequest()
{
    if (!isset($_SERVER['HTTP_REFERER'])) {
        return false;
    }

    $referer = parse_url($_SERVER['HTTP_REFERER']);
    $serverName = $_SERVER['SERVER_NAME'];

    if ($referer['host'] !== $serverName) {
        return false;
    }

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        return false;
    }

    if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
        return false;
    }

    return true;
}

if (!$debug && !isValidRequest()) {
    header('Content-Type: application/json');
    echo "{\"error\":\"Access denied\"}";
    exit;
}