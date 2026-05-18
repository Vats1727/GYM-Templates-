<?php
require_once __DIR__ . '/../controllers/StatsController.php';

$statsCtrl = new StatsController();

// Public routes
$router->get('/api/stats/active', [$statsCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/stats', [$statsCtrl, 'getAll']);
$router->get('/api/admin/stats/{id}', [$statsCtrl, 'getById']);
$router->post('/api/admin/stats', [$statsCtrl, 'create']);
$router->put('/api/admin/stats/{id}', [$statsCtrl, 'update']);
$router->delete('/api/admin/stats/{id}', [$statsCtrl, 'delete']);
$router->post('/api/admin/stats/reorder', [$statsCtrl, 'reorder']);