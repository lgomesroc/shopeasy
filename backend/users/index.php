<?php

require 'vendor/autoload.php';

use Flight;

Flight::set('db', new mysqli('localhost', 'luciano', 'senha_segura', 'shopeasy_db'));

Flight::route('/', function() {
    echo json_encode(['message' => 'Users service is running']);
});

Flight::route('/users', function() {
    $db = Flight::get('db');
    $result = $db->query("SELECT * FROM users");

    $users = [];
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

    echo json_encode($users);
});

Flight::start();
