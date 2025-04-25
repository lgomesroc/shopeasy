<?php

require 'vendor/autoload.php';

Flight::set('db', new mysqli('shopeasy_mysql', 'lgomesroc', '12345', 'shopeasy_db'));

Flight::route('/', function() {
    echo json_encode(['message' => 'Orders service is running']);
});

Flight::route('/orders', function() {
    $db = Flight::get('db');
    if ($db->connect_error) {
        echo json_encode(['error' => 'Database connection failed']);
        return;
    }

    $result = $db->query("SELECT * FROM orders");
    if (!$result) {
        echo json_encode(['error' => 'Table orders not found']);
        return;
    }

    $orders = [];
    while ($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }

    echo json_encode($orders);
});

Flight::start();
