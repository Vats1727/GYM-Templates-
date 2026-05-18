<?php
require_once __DIR__ . '/../controllers/PricingSectionController.php';

$pricing_sectionCtrl = new PricingSectionController();

// Public routes
$router->get('/api/pricing_section/active', [$pricing_sectionCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/pricing_section', [$pricing_sectionCtrl, 'getAll']);
$router->get('/api/admin/pricing_section/{id}', [$pricing_sectionCtrl, 'getById']);
$router->post('/api/admin/pricing_section', [$pricing_sectionCtrl, 'create']);
$router->put('/api/admin/pricing_section/{id}', [$pricing_sectionCtrl, 'update']);
$router->delete('/api/admin/pricing_section/{id}', [$pricing_sectionCtrl, 'delete']);