<?php
require_once __DIR__ . '/../controllers/ProductsController.php';

$productsCtrl = new ProductsController();

// Public routes
$router->get('/api/products/active', [$productsCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/products', [$productsCtrl, 'getAll']);
$router->get('/api/admin/products/{id}', [$productsCtrl, 'getById']);
$router->post('/api/admin/products', [$productsCtrl, 'create']);
$router->put('/api/admin/products/{id}', [$productsCtrl, 'update']);
$router->delete('/api/admin/products/{id}', [$productsCtrl, 'delete']);
$router->post('/api/admin/products/reorder', [$productsCtrl, 'reorder']);