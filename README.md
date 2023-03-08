# mcMMO-Stats-Panel
This website allows you to have an interactive, good looking and effective dashboard for your community to look at their rank and mcMMO statistics from any device.

## How to install
1. First, host the website on any machine available in the world. It can be local hosting, like with a raspberrypi, or remote hosting thanks to international server providers.
2. Then, edit the file `config.php` to suit your server configuration.

You must provide :

| Key         | Description                             | Example / Default |
|-------------|-----------------------------------------|-------------------|
| server_name | Your minecraft server name              | Hypixel           |
| server_ip   | Your minecraft server IP address        | 192.168.1.1       |
| server_port | Your minecraft server IP address's port | 25565             |
| db_ip       | mcMMO stats database's IP address       | 192.168.1.2       |
| db_port     | mcMMO stats database's port             | 3306              |
| db_name     | mcMMO stats database's name             | mcmmo_data        |
| db_login    | Login to connect to the database        | admin             |
| db_pass     | Password to connect to the database     | 1234              |
| db_driver   | Driver used for your database           | mysql             |

3. Browse to your website host IP address, enjoy & share to your community!

## Requirements

Your hosting machine must have a web server installed (Apache or Nginx or other) with PHP enabled.

Moreover, you will need to have activated the PHP module of your database's driver.

## Screenshots

<i>Coming soon ...</i>
