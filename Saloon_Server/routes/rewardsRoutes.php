<?php
require_once __DIR__ . '/../controllers/RewardsController.php';

$rewardsCtrl = new RewardsController();

// Public routes
$router->get('/api/rewards/active', [$rewardsCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/rewards', [$rewardsCtrl, 'getAll']);
$router->get('/api/admin/rewards/{id}', [$rewardsCtrl, 'getById']);
$router->post('/api/admin/rewards', [$rewardsCtrl, 'create']);
$router->put('/api/admin/rewards/{id}', [$rewardsCtrl, 'update']);
$router->delete('/api/admin/rewards/{id}', [$rewardsCtrl, 'delete']);
$router->post('/api/admin/rewards/reorder', [$rewardsCtrl, 'reorder']);