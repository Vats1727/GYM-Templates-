<?php
require_once __DIR__ . '/../controllers/ProcessStepsController.php';

$process_stepsCtrl = new ProcessStepsController();

// Public routes
$router->get('/api/process_steps/active', [$process_stepsCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/process_steps', [$process_stepsCtrl, 'getAll']);
$router->get('/api/admin/process_steps/{id}', [$process_stepsCtrl, 'getById']);
$router->post('/api/admin/process_steps', [$process_stepsCtrl, 'create']);
$router->put('/api/admin/process_steps/{id}', [$process_stepsCtrl, 'update']);
$router->delete('/api/admin/process_steps/{id}', [$process_stepsCtrl, 'delete']);
$router->post('/api/admin/process_steps/reorder', [$process_stepsCtrl, 'reorder']);