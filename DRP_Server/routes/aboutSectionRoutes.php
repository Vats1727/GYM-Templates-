<?php
require_once __DIR__ . '/../controllers/AboutSectionController.php';

$aboutCtrl = new AboutSectionController();

// Public routes
$router->get('/api/about_section/active', [$aboutCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/about_section', [$aboutCtrl, 'getAll']);
$router->get('/api/admin/about_section/{id}', [$aboutCtrl, 'getById']);
$router->post('/api/admin/about_section', [$aboutCtrl, 'create']);
$router->put('/api/admin/about_section/{id}', [$aboutCtrl, 'update']);
$router->delete('/api/admin/about_section/{id}', [$aboutCtrl, 'delete']);
