<?php
require_once __DIR__ . '/../controllers/ScheduleController.php';

$scheduleCtrl = new ScheduleController();

// Public routes
$router->get('/api/schedule/active', [$scheduleCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/schedule', [$scheduleCtrl, 'getAll']);
$router->get('/api/admin/schedule/{id}', [$scheduleCtrl, 'getById']);
$router->post('/api/admin/schedule', [$scheduleCtrl, 'create']);
$router->put('/api/admin/schedule/{id}', [$scheduleCtrl, 'update']);
$router->delete('/api/admin/schedule/{id}', [$scheduleCtrl, 'delete']);
$router->post('/api/admin/schedule/reorder', [$scheduleCtrl, 'reorder']);