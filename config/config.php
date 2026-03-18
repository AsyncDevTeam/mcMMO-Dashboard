<?php
//////////////////////////////////////////////////////////////
//     ______   ____     _   __    ______    ____   ______  //
//    / ____/  / __ \   / | / /   / ____/   /  _/  / ____/  //
//   / /      / / / /  /  |/ /   / /_       / /   / / __    //
//  / /___   / /_/ /  / /|  /   / __/     _/ /   / /_/ /    //
//  \____/   \____/  /_/ |_/   /_/       /___/   \____/     //
//                                                          //
//////////////////////////////////////////////////////////////

$config = array(
    # About your server
    'server_name'           => 'your_server_name',
    'server_ip'             => 'your_server_ip_here',
    'server_port'           => '25565',
    # Hide server IP (true/false)
    'hide_server_ip'        => false,
    # About your database
    'db_ip'                 => 'ip_of_your_database_here',
    'db_port'               => 'port_of_your_database_here',
    'db_name'               => 'name_of_your_database_here',
    'db_login'              => 'login_of_your_database_here',
    'db_pass'               => 'password_of_your_database_here',
    # Your database driver (mysql, cubrid, dblib, firebird, ibm, informix, oci, odbc, pgsql, sqlite, sqlsrv)
    # <!> Be careful : you must have installed and enabled the specific php database driver.
    'db_driver'             => 'mysql',
    # SSL settings for database connection
    'db_ssl'                => false,
    'db_ssl_ca'             => '',      // Path to CA certificate (optional)
    'db_ssl_cert'           => '',      // Path to client certificate (optional)
    'db_ssl_key'            => '',      // Path to client key (optional)
    'db_ssl_verify'         => true,    // Verify server certificate (requires db_ssl_ca)
);

# For test purposes only :
include "config.test.php";
