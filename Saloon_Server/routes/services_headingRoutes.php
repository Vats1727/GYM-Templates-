<?php
require_once __DIR__ . '/../controllers/ServicesHeadingController.php';

$services_headingCtrl = new ServicesHeadingController();

// Public routes
$router->get('/api/services_heading/active', [$services_headingCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/services_heading', [$services_headingCtrl, 'getAll']);
$router->get('/api/admin/services_heading/{id}', [$services_headingCtrl, 'getById']);
$router->post('/api/admin/services_heading', [$services_headingCtrl, 'create']);
$router->put('/api/admin/services_heading/{id}', [$services_headingCtrl, 'update']);
$router->delete('/api/admin/services_heading/{id}', [$services_headingCtrl, 'delete']);
$router->post('/api/admin/services_heading/reorder', [$services_headingCtrl, 'reorder']);