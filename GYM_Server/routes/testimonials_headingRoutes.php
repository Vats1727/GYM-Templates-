<?php
require_once __DIR__ . '/../controllers/TestimonialsHeadingController.php';

$testimonials_headingCtrl = new TestimonialsHeadingController();

// Public routes
$router->get('/api/testimonials_heading/active', [$testimonials_headingCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/testimonials_heading', [$testimonials_headingCtrl, 'getAll']);
$router->get('/api/admin/testimonials_heading/{id}', [$testimonials_headingCtrl, 'getById']);
$router->post('/api/admin/testimonials_heading', [$testimonials_headingCtrl, 'create']);
$router->put('/api/admin/testimonials_heading/{id}', [$testimonials_headingCtrl, 'update']);
$router->delete('/api/admin/testimonials_heading/{id}', [$testimonials_headingCtrl, 'delete']);
$router->post('/api/admin/testimonials_heading/reorder', [$testimonials_headingCtrl, 'reorder']);