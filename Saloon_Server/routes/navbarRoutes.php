<?php
require_once __DIR__ . '/../controllers/NavbarController.php';

$navbarCtrl = new NavbarController();

// Public routes
$router->get('/api/navbar/active', [$navbarCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/navbar', [$navbarCtrl, 'getAll']);
$router->get('/api/admin/navbar/{id}', [$navbarCtrl, 'getById']);
$router->post('/api/admin/navbar', [$navbarCtrl, 'create']);
$router->put('/api/admin/navbar/{id}', [$navbarCtrl, 'update']);
$router->delete('/api/admin/navbar/{id}', [$navbarCtrl, 'delete']);
