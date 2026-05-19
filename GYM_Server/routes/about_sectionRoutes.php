<?php
require_once __DIR__ . '/../controllers/AboutSectionController.php';

$about_sectionCtrl = new AboutSectionController();

// Public routes
$router->get('/api/about_section/active', [$about_sectionCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/about_section', [$about_sectionCtrl, 'getAll']);
$router->get('/api/admin/about_section/{id}', [$about_sectionCtrl, 'getById']);
$router->post('/api/admin/about_section', [$about_sectionCtrl, 'create']);
$router->put('/api/admin/about_section/{id}', [$about_sectionCtrl, 'update']);
$router->delete('/api/admin/about_section/{id}', [$about_sectionCtrl, 'delete']);
$router->post('/api/admin/about_section/reorder', [$about_sectionCtrl, 'reorder']);