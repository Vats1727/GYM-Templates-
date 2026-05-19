<?php
require_once __DIR__ . '/../controllers/FooterController.php';

$footerCtrl = new FooterController();

// Public routes
$router->get('/api/footer/active', [$footerCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/footer', [$footerCtrl, 'getAll']);
$router->get('/api/admin/footer/{id}', [$footerCtrl, 'getById']);
$router->post('/api/admin/footer', [$footerCtrl, 'create']);
$router->put('/api/admin/footer/{id}', [$footerCtrl, 'update']);
$router->delete('/api/admin/footer/{id}', [$footerCtrl, 'delete']);
$router->post('/api/admin/footer/reorder', [$footerCtrl, 'reorder']);