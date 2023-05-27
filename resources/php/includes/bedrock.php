<?php

require_once "../../../config/config.php";
/** @var ARRAY $config * */

if (!array_key_exists('server_allow_bedrock', $config)) {
    $allow_bedrock = 0;
} else {
    $allow_bedrock = intval($config['server_allow_bedrock']);
}