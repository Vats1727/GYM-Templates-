<?php
require_once __DIR__ . '/../controllers/ReviewsHeadingController.php';

$reviews_headingCtrl = new ReviewsHeadingController();

// Public routes
$router->get('/api/reviews_heading/active', [$reviews_headingCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/reviews_heading', [$reviews_headingCtrl, 'getAll']);
$router->get('/api/admin/reviews_heading/{id}', [$reviews_headingCtrl, 'getById']);
$router->post('/api/admin/reviews_heading', [$reviews_headingCtrl, 'create']);
$router->put('/api/admin/reviews_heading/{id}', [$reviews_headingCtrl, 'update']);
$router->delete('/api/admin/reviews_heading/{id}', [$reviews_headingCtrl, 'delete']);
$router->post('/api/admin/reviews_heading/reorder', [$reviews_headingCtrl, 'reorder']);