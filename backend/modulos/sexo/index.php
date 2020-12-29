<?php

require_once '../.././routes.php';

\Slim\Slim::registerAutoloader();

$app = new Slim\Slim();
$app->add(new \CorsSlim\CorsSlim());
$app->response()->headers()->set('content-type', 'application/json; charset=utf-8');
$app->get('/', 'getSexos');
$app->post('/', 'postSexo');
$app->delete('/:ID', 'deleteSexo');

$app->run();

function getSexos() {
    global $mysql;

    $result = $mysql->fetchAll2("SELECT * FROM SEXOS");

    echo '{ "result": '. json_encode($result) .' }';
}

function postSexo() {

    global $mysql;

    $result = new stdClass();
    $result->status = true;
    $result->msg = '';

    $request = \Slim\Slim::getInstance()->request();
    $body = json_decode($request->getBody());

    $nome = $body->nome;
    
    $result->status = $mysql->execute("INSERT INTO SEXOS (NOME) VALUES ('$nome');");
    if ($result->status === false) {
        $result->msg = 'Erro ao cadastrar o sexo!';
    } else {
        $result->msg = 'Sexo cadastrado com sucesso!';
    }

    echo '{ "result": '. json_encode($result) .' }';
}

function deleteSexo($id) {

    global $mysql;

    $result = new stdClass();
    $result->status = true;
    $result->msg = '';

    $request = \Slim\Slim::getInstance()->request();
    $body = json_decode($request->getBody());

    $result->status = $mysql->execute("DELETE FROM SEXOS WHERE ID_SEXO = $id;");
    if ($result->status === false) {
        $result->msg = 'Erro ao deletar o sexo!';
    } else {
        $result->msg = 'Sexo deletado com sucesso!';
    }

    echo '{ "result": '. json_encode($result) .' }';
}