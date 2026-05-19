<?php
require_once __DIR__ . '/../controllers/PricingPlansHeadingController.php';

$pricing_plans_headingCtrl = new PricingPlansHeadingController();

// Public routes
$router->get('/api/pricing_plans_heading/active', [$pricing_plans_headingCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/pricing_plans_heading', [$pricing_plans_headingCtrl, 'getAll']);
$router->get('/api/admin/pricing_plans_heading/{id}', [$pricing_plans_headingCtrl, 'getById']);
$router->post('/api/admin/pricing_plans_heading', [$pricing_plans_headingCtrl, 'create']);
$router->put('/api/admin/pricing_plans_heading/{id}', [$pricing_plans_headingCtrl, 'update']);
$router->delete('/api/admin/pricing_plans_heading/{id}', [$pricing_plans_headingCtrl, 'delete']);
$router->post('/api/admin/pricing_plans_heading/reorder', [$pricing_plans_headingCtrl, 'reorder']);