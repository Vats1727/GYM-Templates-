<?php

class Database {
    public static function connect() {
        try {
            $dbPath = __DIR__ . '/../database/gym_v2.sqlite';
            $pdo = new PDO('sqlite:' . $dbPath);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $pdo->exec("PRAGMA busy_timeout = 5000;");
            return $pdo;
        } catch (PDOException $e) {
            die('Connection failed: ' . $e->getMessage());
        }
    }
}