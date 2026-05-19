<?php
require_once __DIR__ . '/../controllers/TickerController.php';

$tickerCtrl = new TickerController();

// Public routes
$router->get('/api/ticker/active', [$tickerCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/ticker', [$tickerCtrl, 'getAll']);
$router->get('/api/admin/ticker/{id}', [$tickerCtrl, 'getById']);
$router->post('/api/admin/ticker', [$tickerCtrl, 'create']);
$router->put('/api/admin/ticker/{id}', [$tickerCtrl, 'update']);
$router->delete('/api/admin/ticker/{id}', [$tickerCtrl, 'delete']);
$router->post('/api/admin/ticker/reorder', [$tickerCtrl, 'reorder']);