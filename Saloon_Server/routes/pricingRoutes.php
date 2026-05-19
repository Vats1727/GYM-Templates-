<?php
require_once __DIR__ . '/../controllers/PricingController.php';

$pricingCtrl = new PricingController();

// Public routes
$router->get('/api/pricing/active', [$pricingCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/pricing', [$pricingCtrl, 'getAll']);
$router->get('/api/admin/pricing/{id}', [$pricingCtrl, 'getById']);
$router->post('/api/admin/pricing', [$pricingCtrl, 'create']);
$router->put('/api/admin/pricing/{id}', [$pricingCtrl, 'update']);
$router->delete('/api/admin/pricing/{id}', [$pricingCtrl, 'delete']);
$router->post('/api/admin/pricing/reorder', [$pricingCtrl, 'reorder']);