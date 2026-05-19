<?php
require_once __DIR__ . '/../controllers/ProductsHeadingController.php';

$products_headingCtrl = new ProductsHeadingController();

// Public routes
$router->get('/api/products_heading/active', [$products_headingCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/products_heading', [$products_headingCtrl, 'getAll']);
$router->get('/api/admin/products_heading/{id}', [$products_headingCtrl, 'getById']);
$router->post('/api/admin/products_heading', [$products_headingCtrl, 'create']);
$router->put('/api/admin/products_heading/{id}', [$products_headingCtrl, 'update']);
$router->delete('/api/admin/products_heading/{id}', [$products_headingCtrl, 'delete']);
$router->post('/api/admin/products_heading/reorder', [$products_headingCtrl, 'reorder']);