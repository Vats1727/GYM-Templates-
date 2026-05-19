<?php
require_once __DIR__ . '/../controllers/HeroSectionController.php';

$hero_sectionCtrl = new HeroSectionController();

// Public routes
$router->get('/api/hero_section/active', [$hero_sectionCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/hero_section', [$hero_sectionCtrl, 'getAll']);
$router->get('/api/admin/hero_section/{id}', [$hero_sectionCtrl, 'getById']);
$router->post('/api/admin/hero_section', [$hero_sectionCtrl, 'create']);
$router->put('/api/admin/hero_section/{id}', [$hero_sectionCtrl, 'update']);
$router->delete('/api/admin/hero_section/{id}', [$hero_sectionCtrl, 'delete']);
$router->post('/api/admin/hero_section/reorder', [$hero_sectionCtrl, 'reorder']);