<?php
require_once __DIR__ . '/../controllers/ReviewsController.php';

$reviewsCtrl = new ReviewsController();

// Public routes
$router->get('/api/reviews/active', [$reviewsCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/reviews', [$reviewsCtrl, 'getAll']);
$router->get('/api/admin/reviews/{id}', [$reviewsCtrl, 'getById']);
$router->post('/api/admin/reviews', [$reviewsCtrl, 'create']);
$router->put('/api/admin/reviews/{id}', [$reviewsCtrl, 'update']);
$router->delete('/api/admin/reviews/{id}', [$reviewsCtrl, 'delete']);
$router->post('/api/admin/reviews/reorder', [$reviewsCtrl, 'reorder']);