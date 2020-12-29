<?php

require_once '../.././routes.php';

\Slim\Slim::registerAutoloader();

$app = new Slim\Slim();
$app->add(new \CorsSlim\CorsSlim());
$app->response()->headers()->set('content-type', 'application/json; charset=utf-8');
$app->get('/', 'getCidades');
$app->post('/', 'postCidade');
$app->delete('/:ID', 'deleteCidade');

$app->run();

function getCidades() {
    global $mysql;

    $result = $mysql->fetchAll2("SELECT * FROM CIDADES");

    echo '{ "result": '. json_encode($result) .' }';
}

function postCidade() {

    global $mysql;

    $result = new stdClass();
    $result->status = true;
    $result->msg = '';

    $request = \Slim\Slim::getInstance()->request();
    $body = json_decode($request->getBody());

    $nome = $body->nome;
    
    $result->status = $mysql->execute("INSERT INTO CIDADES (NOME) VALUES ('$nome');");
    if ($result->status === false) {
        $result->msg = 'Erro ao cadastrar a cidade!';
    } else {
        $result->msg = 'Cidade deletada com sucesso!';
    }

    echo '{ "result": '. json_encode($result) .' }';
}

function deleteCidade($id) {

    global $mysql;

    $result = new stdClass();
    $result->status = true;
    $result->msg = '';

    $request = \Slim\Slim::getInstance()->request();
    $body = json_decode($request->getBody());

    $result->status = $mysql->execute("DELETE FROM CIDADES WHERE ID_CIDADE = $id;");
    if ($result->status === false) {
        $result->msg = 'Erro ao deletar a cidade!';
    } else {
        $result->msg = 'Cidade deletada com sucesso!';
    }

    echo '{ "result": '. json_encode($result) .' }';
}