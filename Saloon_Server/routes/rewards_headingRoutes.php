<?php
require_once __DIR__ . '/../controllers/RewardsHeadingController.php';

$rewards_headingCtrl = new RewardsHeadingController();

// Public routes
$router->get('/api/rewards_heading/active', [$rewards_headingCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/rewards_heading', [$rewards_headingCtrl, 'getAll']);
$router->get('/api/admin/rewards_heading/{id}', [$rewards_headingCtrl, 'getById']);
$router->post('/api/admin/rewards_heading', [$rewards_headingCtrl, 'create']);
$router->put('/api/admin/rewards_heading/{id}', [$rewards_headingCtrl, 'update']);
$router->delete('/api/admin/rewards_heading/{id}', [$rewards_headingCtrl, 'delete']);
$router->post('/api/admin/rewards_heading/reorder', [$rewards_headingCtrl, 'reorder']);