<?php

require 'vendor/autoload.php';

Flight::set('db', new mysqli('shopeasy_mysql', 'lgomesroc', '12345', 'shopeasy_db'));

Flight::route('/', function() {
    echo json_encode(['message' => 'Users service is running']);
});

Flight::route('/users', function() {
    $db = Flight::get('db');
    if ($db->connect_error) {
        echo json_encode(['error' => 'Database connection failed']);
        return;
    }

    $result = $db->query("SELECT * FROM users");
    if (!$result) {
        echo json_encode(['error' => 'Table users not found']);
        return;
    }

    $users = [];
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

    echo json_encode($users);
});

Flight::start();
