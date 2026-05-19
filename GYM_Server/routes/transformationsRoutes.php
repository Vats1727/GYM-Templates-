<?php
require_once __DIR__ . '/../controllers/TransformationsController.php';

$transformationsCtrl = new TransformationsController();

// Public routes
$router->get('/api/transformations/active', [$transformationsCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/transformations', [$transformationsCtrl, 'getAll']);
$router->get('/api/admin/transformations/{id}', [$transformationsCtrl, 'getById']);
$router->post('/api/admin/transformations', [$transformationsCtrl, 'create']);
$router->put('/api/admin/transformations/{id}', [$transformationsCtrl, 'update']);
$router->delete('/api/admin/transformations/{id}', [$transformationsCtrl, 'delete']);
$router->post('/api/admin/transformations/reorder', [$transformationsCtrl, 'reorder']);