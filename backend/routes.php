<?php

defined('PS') || define('PS', PATH_SEPARATOR);
defined('DS') || define('DS', DIRECTORY_SEPARATOR);

// pasta root que é definida no config do apache, no xampp;
defined('ROOT') || define('ROOT', realpath(dirname(__FILE__)));
// Seta o arquivo de configurações;
defined('CONFIG') || define('CONFIG', ROOT.DS.'config');
// Seta a pasta vendor
defined('VENDOR') || define('VENDOR', ROOT.DS.'vendor');
// Seta a pasta onde irão os logs;
defined('LOGS') || define('LOGS', ROOT.DS.'logs');

require_once VENDOR.DS."autoload.php";

@date_default_timezone_set('America/Sao_Paulo');

// Seta a configuração do Banco de dados Mysql, que está no arquivo 'application.ini' dentro da pasta config
$db = parse_ini_file(CONFIG.DS.'application.ini');
$mysql = new MyMysql\MyMysql(array(
    'DB_LOG' => $db['DB_LOG'],
    'DB_HOST' => $db['DB_HOST'],
    'DB_NAME' => $db['DB_NAME'],
    'DB_USER' => $db['DB_USER'],
    'DB_PASS' => $db['DB_PASS'],
), LOGS);
