<?php
require_once __DIR__ . '/../controllers/ProcessStepsHeadingController.php';

$process_steps_headingCtrl = new ProcessStepsHeadingController();

// Public routes
$router->get('/api/process_steps_heading/active', [$process_steps_headingCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/process_steps_heading', [$process_steps_headingCtrl, 'getAll']);
$router->get('/api/admin/process_steps_heading/{id}', [$process_steps_headingCtrl, 'getById']);
$router->post('/api/admin/process_steps_heading', [$process_steps_headingCtrl, 'create']);
$router->put('/api/admin/process_steps_heading/{id}', [$process_steps_headingCtrl, 'update']);
$router->delete('/api/admin/process_steps_heading/{id}', [$process_steps_headingCtrl, 'delete']);
$router->post('/api/admin/process_steps_heading/reorder', [$process_steps_headingCtrl, 'reorder']);