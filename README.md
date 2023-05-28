[![HTML 5](https://img.shields.io/badge/HTML-5+-orange?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/HTML)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat&logo=javascript&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/JavaScript)
[![PHP 8](https://img.shields.io/badge/PHP-8+-blue?style=flat&logo=php&logoColor=white)](https://www.php.net/releases/8.0/fr.php)
[![SPIGOT](https://img.shields.io/badge/Spigot-click!-D67F1D?style=flat&logoColor=white)](https://www.spigotmc.org/resources/mcmmo-statistics-website.108703/)

[>>> DEMO WEBSITE HERE <<<](https://project.therenceforot.fr/mcmmo/index.php)

# 📈 mcMMO Dashboard
This project allows you to have an interactive, good looking and effective dashboard for your community to look at their rank and mcMMO statistics from any device.

## ⚙️ How to install
1. First, host the website on any machine available in the world. It can be local hosting (a raspberrypi), or remote hosting thanks to international server providers (OVH, Ionos, ...).
2. Then, edit the file [`config/config.php`](https://github.com/AsyncDevTeam/mcMMO-Dashboard/blob/master/config/config.php) to suit your server configuration.

You must provide :

| Key                  | Description                                                    | Example     |
|----------------------|----------------------------------------------------------------|-------------|
| server_name          | Your minecraft server name                                     | Hypixel     |
| server_ip            | Your minecraft server IP address                               | 192.168.1.1 |
| server_port          | Your minecraft server IP address's port                        | 25565       |
| db_ip                | mcMMO database's IP address                                    | 192.168.1.2 |
| db_port              | mcMMO database's port                                          | 3306        |
| db_name              | mcMMO database's name                                          | mcmmo_data  |
| db_login             | Login to connect to the database                               | admin       |
| db_pass              | Password to connect to the database                            | 1234        |
| db_driver            | Driver used for your database                                  | mysql       |


3. Browse to your website host IP address, enjoy & share to your community!

## ⬆️ How to update

1. Backup all your config files (located in [`config`](https://github.com/AsyncDevTeam/mcMMO-Dashboard/blob/master/config))
2. Replace all your site files with the new files of the [last update](https://github.com/AsyncDevTeam/mcMMO-Dashboard/releases)
3. Compare the new config files with your backed up ones

**Note:** Release notes are here to help you understand which config files were updated.

## ⚠️ Requirements

Your hosting machine must have a web server installed (ex: Apache or Nginx) with PHP enabled.

**Moreover, you have to make sure that the PHP driver of the mcMMO database you are using is activated.**

## 📸 Screenshots

![presentation](https://stuff.nicolasvaillant.net/mcMMO/626shots_so.png)

Available also on mobile !

![presentation](https://stuff.nicolasvaillant.net/mcMMO/238shots_so.png) 

...with a dark mode too

![presentation](https://stuff.nicolasvaillant.net/mcMMO/201shots_so.png)

## 📜 License

This project is licensed under Attribution-NonCommercial 4.0 International (CC BY-NC 4.0).

You can use the code, edit it, improve it, but no commercial use should be made from it. Thanks!
