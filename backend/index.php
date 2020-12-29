<?php

require_once 'routes.php';

\Slim\Slim::registerAutoloader();

$app = new Slim\Slim();

$app->get('/', function() {
    echo 'Servidor iniciou';
});

$app->run();