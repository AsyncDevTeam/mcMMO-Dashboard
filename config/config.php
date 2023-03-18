<?php

// --------------------------- //
//         CONFIG FILE         //
// --------------------------- //

$config = array(
    # About your server
    'server_name'   => 'your_server_name',
    'server_ip'     => 'your_server_ip_here',
    'server_port'   => '25565',
    # About your database
    'db_ip'         => 'ip_of_your_database_here',
    'db_port'       => 'port_of_your_database_here',
    'db_name'       => 'name_of_your_database_here',
    'db_login'      => 'login_of_your_database_here',
    'db_pass'       => 'password_of_your_database_here',
    # Your database driver (mysql, cubrid, dblib, firebird, ibm, informix, oci, odbc, pgsql, sqlite, sqlsrv)
    'db_driver'    => 'mysql',
);

# For test purposes only :
include "config.test.php";
