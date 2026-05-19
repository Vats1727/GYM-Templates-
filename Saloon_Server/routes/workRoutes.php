<?php
require_once __DIR__ . '/../controllers/WorkController.php';

$workCtrl = new WorkController();

// Public routes
$router->get('/api/work/active', [$workCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/work', [$workCtrl, 'getAll']);
$router->get('/api/admin/work/{id}', [$workCtrl, 'getById']);
$router->post('/api/admin/work', [$workCtrl, 'create']);
$router->put('/api/admin/work/{id}', [$workCtrl, 'update']);
$router->delete('/api/admin/work/{id}', [$workCtrl, 'delete']);
$router->post('/api/admin/work/reorder', [$workCtrl, 'reorder']);