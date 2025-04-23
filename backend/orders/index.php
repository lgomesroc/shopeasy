<?php

require 'vendor/autoload.php';

use Flight;

Flight::set('db', new mysqli('localhost', 'luciano', 'senha_segura', 'shopeasy_db'));

Flight::route('/', function() {
    echo json_encode(['message' => 'Orders service is running']);
});

Flight::route('/orders', function() {
    $db = Flight::get('db');
    $result = $db->query("SELECT * FROM orders");

    $orders = [];
    while ($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }

    echo json_encode($orders);
});

Flight::start();
