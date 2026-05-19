<?php
require_once __DIR__ . '/../controllers/SpecialtiesHeadingController.php';

$specialties_headingCtrl = new SpecialtiesHeadingController();

// Public routes
$router->get('/api/specialties_heading/active', [$specialties_headingCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/specialties_heading', [$specialties_headingCtrl, 'getAll']);
$router->get('/api/admin/specialties_heading/{id}', [$specialties_headingCtrl, 'getById']);
$router->post('/api/admin/specialties_heading', [$specialties_headingCtrl, 'create']);
$router->put('/api/admin/specialties_heading/{id}', [$specialties_headingCtrl, 'update']);
$router->delete('/api/admin/specialties_heading/{id}', [$specialties_headingCtrl, 'delete']);
$router->post('/api/admin/specialties_heading/reorder', [$specialties_headingCtrl, 'reorder']);