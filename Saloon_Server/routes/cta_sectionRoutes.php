<?php
require_once __DIR__ . '/../controllers/CtaSectionController.php';

$ctaCtrl = new CtaSectionController();

// Public routes
$router->get('/api/cta_section/active', [$ctaCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/cta_section', [$ctaCtrl, 'getAll']);
$router->get('/api/admin/cta_section/{id}', [$ctaCtrl, 'getById']);
$router->post('/api/admin/cta_section', [$ctaCtrl, 'create']);
$router->put('/api/admin/cta_section/{id}', [$ctaCtrl, 'update']);
$router->delete('/api/admin/cta_section/{id}', [$ctaCtrl, 'delete']);
