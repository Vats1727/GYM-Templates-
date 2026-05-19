<?php
require_once __DIR__ . '/../controllers/TreatmentsHeadingController.php';

$treatments_headingCtrl = new TreatmentsHeadingController();

// Public routes
$router->get('/api/treatments_heading/active', [$treatments_headingCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/treatments_heading', [$treatments_headingCtrl, 'getAll']);
$router->get('/api/admin/treatments_heading/{id}', [$treatments_headingCtrl, 'getById']);
$router->post('/api/admin/treatments_heading', [$treatments_headingCtrl, 'create']);
$router->put('/api/admin/treatments_heading/{id}', [$treatments_headingCtrl, 'update']);
$router->delete('/api/admin/treatments_heading/{id}', [$treatments_headingCtrl, 'delete']);
$router->post('/api/admin/treatments_heading/reorder', [$treatments_headingCtrl, 'reorder']);