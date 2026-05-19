<?php
require_once __DIR__ . '/../controllers/ProgramsController.php';

$programsCtrl = new ProgramsController();

// Public routes
$router->get('/api/programs/active', [$programsCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/programs', [$programsCtrl, 'getAll']);
$router->get('/api/admin/programs/{id}', [$programsCtrl, 'getById']);
$router->post('/api/admin/programs', [$programsCtrl, 'create']);
$router->put('/api/admin/programs/{id}', [$programsCtrl, 'update']);
$router->delete('/api/admin/programs/{id}', [$programsCtrl, 'delete']);
$router->post('/api/admin/programs/reorder', [$programsCtrl, 'reorder']);