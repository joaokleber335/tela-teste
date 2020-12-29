<?php

require_once '../.././routes.php';

\Slim\Slim::registerAutoloader();

$app = new Slim\Slim();
$app->add(new \CorsSlim\CorsSlim());
$app->response()->headers()->set('content-type', 'application/json; charset=utf-8');
$app->get('/', 'getMarcas');
$app->post('/', 'postMarca');
$app->put('/principal/:ID', 'checkMarcaPrincipal');
$app->put('/favorita/:ID', 'checkMarcaFavorita');
$app->delete('/:ID', 'deleteMarca');
$app->run();

function getMarcas() {
    global $mysql;

    $result = $mysql->fetchAll2("SELECT * FROM MARCAS");

    echo '{ "result": '. json_encode($result) .' }';
}

function postMarca() {

    global $mysql;

    $result = new stdClass();
    $result->status = true;
    $result->msg = '';

    $request = \Slim\Slim::getInstance()->request();
    $body = json_decode($request->getBody());

    $nome = $body->nome;
    
    $result->status = $mysql->execute("INSERT INTO MARCAS (NOME) VALUES ('$nome');");
    if ($result->status === false) {
        $result->msg = 'Erro ao cadastrar a marca!';
    } else {
        $result->msg = 'Marca cadastrada com sucesso!';
    }

    echo '{ "result": '. json_encode($result) .' }';
}

function checkMarcaPrincipal($id) {

    global $mysql;

    $result = new stdClass();
    $result->status = true;
    $result->msg = '';

    $request = \Slim\Slim::getInstance()->request();
    $body = json_decode($request->getBody());

    $principal = $body->principal;

    $sql = "UPDATE MARCAS SET PRINCIPAL = $principal WHERE ID_MARCA = $id;";
    
    $result->status = $mysql->execute("UPDATE MARCAS SET PRINCIPAL = $principal WHERE ID_MARCA = $id;");
    if ($result->status === false) {
        $result->msg = 'Erro ao salvar a marca como principal!';
    } else {
        $result->msg = 'Marca salva como principal!';
    }

    echo '{ "result": '. json_encode($result) .' }';
}

function checkMarcaFavorita($id) {

    global $mysql;

    $result = new stdClass();
    $result->status = true;
    $result->msg = '';

    $request = \Slim\Slim::getInstance()->request();
    $body = json_decode($request->getBody());

    $favorita = $body->favorita;

    $sql = "UPDATE MARCAS SET FAVORITA = $favorita WHERE ID_MARCA = $id;";
    
    $result->status = $mysql->execute("UPDATE MARCAS SET FAVORITA = $favorita WHERE ID_MARCA = $id;");
    if ($result->status === false) {
        $result->msg = 'Erro ao salvar a marca como favorita!';
    } else {
        $result->msg = 'Marca salva como favorita!';
    }

    echo '{ "result": '. json_encode($result) .' }';
}

function deleteMarca($id) {

    global $mysql;

    $result = new stdClass();
    $result->status = true;
    $result->msg = '';

    $request = \Slim\Slim::getInstance()->request();
    $body = json_decode($request->getBody());

    $result->status = $mysql->execute("DELETE FROM MARCAS WHERE ID_MARCA = $id;");
    if ($result->status === false) {
        $result->msg = 'Erro ao deletar a marca!';
    } else {
        $result->msg = 'Marca deletada com sucesso!';
    }

    echo '{ "result": '. json_encode($result) .' }';
}