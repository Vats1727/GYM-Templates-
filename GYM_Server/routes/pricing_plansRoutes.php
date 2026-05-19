<?php
require_once __DIR__ . '/../controllers/PricingPlansController.php';

$pricing_plansCtrl = new PricingPlansController();

// Public routes
$router->get('/api/pricing_plans/active', [$pricing_plansCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/pricing_plans', [$pricing_plansCtrl, 'getAll']);
$router->get('/api/admin/pricing_plans/{id}', [$pricing_plansCtrl, 'getById']);
$router->post('/api/admin/pricing_plans', [$pricing_plansCtrl, 'create']);
$router->put('/api/admin/pricing_plans/{id}', [$pricing_plansCtrl, 'update']);
$router->delete('/api/admin/pricing_plans/{id}', [$pricing_plansCtrl, 'delete']);
$router->post('/api/admin/pricing_plans/reorder', [$pricing_plansCtrl, 'reorder']);