<?php

require 'vendor/autoload.php';

Flight::set('db', new mysqli('shopeasy_mysql', 'lgomesroc', '12345', 'shopeasy_db'));

Flight::route('/', function() {
    echo json_encode(['message' => 'Products service is running']);
});

Flight::route('/products', function() {
    $db = Flight::get('db');
    if ($db->connect_error) {
        echo json_encode(['error' => 'Database connection failed']);
        return;
    }

    $result = $db->query("SELECT * FROM products");
    if (!$result) {
        echo json_encode(['error' => 'Table products not found']);
        return;
    }

    $products = [];
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }

    echo json_encode($products);
});

Flight::start();
