<?php
require_once __DIR__ . '/../controllers/TransformationsHeadingController.php';

$transformations_headingCtrl = new TransformationsHeadingController();

// Public routes
$router->get('/api/transformations_heading/active', [$transformations_headingCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/transformations_heading', [$transformations_headingCtrl, 'getAll']);
$router->get('/api/admin/transformations_heading/{id}', [$transformations_headingCtrl, 'getById']);
$router->post('/api/admin/transformations_heading', [$transformations_headingCtrl, 'create']);
$router->put('/api/admin/transformations_heading/{id}', [$transformations_headingCtrl, 'update']);
$router->delete('/api/admin/transformations_heading/{id}', [$transformations_headingCtrl, 'delete']);
$router->post('/api/admin/transformations_heading/reorder', [$transformations_headingCtrl, 'reorder']);