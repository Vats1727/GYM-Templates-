<?php
require_once __DIR__ . '/../controllers/WorkHeadingController.php';

$work_headingCtrl = new WorkHeadingController();

// Public routes
$router->get('/api/work_heading/active', [$work_headingCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/work_heading', [$work_headingCtrl, 'getAll']);
$router->get('/api/admin/work_heading/{id}', [$work_headingCtrl, 'getById']);
$router->post('/api/admin/work_heading', [$work_headingCtrl, 'create']);
$router->put('/api/admin/work_heading/{id}', [$work_headingCtrl, 'update']);
$router->delete('/api/admin/work_heading/{id}', [$work_headingCtrl, 'delete']);
$router->post('/api/admin/work_heading/reorder', [$work_headingCtrl, 'reorder']);