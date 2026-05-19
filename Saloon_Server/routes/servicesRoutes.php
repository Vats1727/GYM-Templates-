<?php
require_once __DIR__ . '/../controllers/ServicesController.php';

$servicesCtrl = new ServicesController();

// Public routes
$router->get('/api/services/active', [$servicesCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/services', [$servicesCtrl, 'getAll']);
$router->get('/api/admin/services/{id}', [$servicesCtrl, 'getById']);
$router->post('/api/admin/services', [$servicesCtrl, 'create']);
$router->put('/api/admin/services/{id}', [$servicesCtrl, 'update']);
$router->delete('/api/admin/services/{id}', [$servicesCtrl, 'delete']);
$router->post('/api/admin/services/reorder', [$servicesCtrl, 'reorder']);