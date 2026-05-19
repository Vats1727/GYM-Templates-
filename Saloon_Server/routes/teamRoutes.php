<?php
require_once __DIR__ . '/../controllers/TeamController.php';

$teamCtrl = new TeamController();

// Public routes
$router->get('/api/team/active', [$teamCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/team', [$teamCtrl, 'getAll']);
$router->get('/api/admin/team/{id}', [$teamCtrl, 'getById']);
$router->post('/api/admin/team', [$teamCtrl, 'create']);
$router->put('/api/admin/team/{id}', [$teamCtrl, 'update']);
$router->delete('/api/admin/team/{id}', [$teamCtrl, 'delete']);
$router->post('/api/admin/team/reorder', [$teamCtrl, 'reorder']);