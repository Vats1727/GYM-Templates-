<?php
require_once __DIR__ . '/../controllers/TreatmentsController.php';

$treatmentsCtrl = new TreatmentsController();

// Public routes
$router->get('/api/treatments/active', [$treatmentsCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/treatments', [$treatmentsCtrl, 'getAll']);
$router->get('/api/admin/treatments/{id}', [$treatmentsCtrl, 'getById']);
$router->post('/api/admin/treatments', [$treatmentsCtrl, 'create']);
$router->put('/api/admin/treatments/{id}', [$treatmentsCtrl, 'update']);
$router->delete('/api/admin/treatments/{id}', [$treatmentsCtrl, 'delete']);
$router->post('/api/admin/treatments/reorder', [$treatmentsCtrl, 'reorder']);