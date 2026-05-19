<?php
require_once __DIR__ . '/../controllers/SpecialtiesController.php';

$specialtiesCtrl = new SpecialtiesController();

// Public routes
$router->get('/api/specialties/active', [$specialtiesCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/specialties', [$specialtiesCtrl, 'getAll']);
$router->get('/api/admin/specialties/{id}', [$specialtiesCtrl, 'getById']);
$router->post('/api/admin/specialties', [$specialtiesCtrl, 'create']);
$router->put('/api/admin/specialties/{id}', [$specialtiesCtrl, 'update']);
$router->delete('/api/admin/specialties/{id}', [$specialtiesCtrl, 'delete']);
$router->post('/api/admin/specialties/reorder', [$specialtiesCtrl, 'reorder']);