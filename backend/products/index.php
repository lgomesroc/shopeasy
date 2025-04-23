<?php

require 'vendor/autoload.php';

use Flight;

Flight::set('db', new mysqli('localhost', 'luciano', 'senha_segura', 'shopeasy_db'));

Flight::route('/', function() {
    echo json_encode(['message' => 'Products service is running']);
});

Flight::route('/products', function() {
    $db = Flight::get('db');
    $result = $db->query("SELECT * FROM products");

    $products = [];
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }

    echo json_encode($products);
});

Flight::start();
