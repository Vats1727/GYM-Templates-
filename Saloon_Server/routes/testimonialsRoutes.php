<?php
require_once __DIR__ . '/../controllers/TestimonialsController.php';

$testimonialsCtrl = new TestimonialsController();

// Public routes
$router->get('/api/testimonials/active', [$testimonialsCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/testimonials', [$testimonialsCtrl, 'getAll']);
$router->get('/api/admin/testimonials/{id}', [$testimonialsCtrl, 'getById']);
$router->post('/api/admin/testimonials', [$testimonialsCtrl, 'create']);
$router->put('/api/admin/testimonials/{id}', [$testimonialsCtrl, 'update']);
$router->delete('/api/admin/testimonials/{id}', [$testimonialsCtrl, 'delete']);
$router->post('/api/admin/testimonials/reorder', [$testimonialsCtrl, 'reorder']);