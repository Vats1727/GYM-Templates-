<?php
require_once __DIR__ . '/../controllers/TrainersController.php';

$trainersCtrl = new TrainersController();

// Public routes
$router->get('/api/trainers/active', [$trainersCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/trainers', [$trainersCtrl, 'getAll']);
$router->get('/api/admin/trainers/{id}', [$trainersCtrl, 'getById']);
$router->post('/api/admin/trainers', [$trainersCtrl, 'create']);
$router->put('/api/admin/trainers/{id}', [$trainersCtrl, 'update']);
$router->delete('/api/admin/trainers/{id}', [$trainersCtrl, 'delete']);
$router->post('/api/admin/trainers/reorder', [$trainersCtrl, 'reorder']);