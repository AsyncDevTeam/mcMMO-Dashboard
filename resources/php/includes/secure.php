<?php

$key = 'SERVER_ADDR';

if (!array_key_exists($key, $_SERVER)) {
    $key = 'LOCAL_ADDR';
}

if (array_key_exists($key, $_SERVER) && $_SERVER[$key] != $_SERVER['REMOTE_ADDR']){
    echo "{\"error\":\"Request not authorized\"}";
    exit;
}