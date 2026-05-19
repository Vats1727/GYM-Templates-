<?php
require_once __DIR__ . '/../controllers/TeamHeadingController.php';

$team_headingCtrl = new TeamHeadingController();

// Public routes
$router->get('/api/team_heading/active', [$team_headingCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/team_heading', [$team_headingCtrl, 'getAll']);
$router->get('/api/admin/team_heading/{id}', [$team_headingCtrl, 'getById']);
$router->post('/api/admin/team_heading', [$team_headingCtrl, 'create']);
$router->put('/api/admin/team_heading/{id}', [$team_headingCtrl, 'update']);
$router->delete('/api/admin/team_heading/{id}', [$team_headingCtrl, 'delete']);
$router->post('/api/admin/team_heading/reorder', [$team_headingCtrl, 'reorder']);