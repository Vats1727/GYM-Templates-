<?php
require_once __DIR__ . '/../controllers/TestimonialsSectionController.php';

$testimonials_sectionCtrl = new TestimonialsSectionController();

// Public routes
$router->get('/api/testimonials_section/active', [$testimonials_sectionCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/testimonials_section', [$testimonials_sectionCtrl, 'getAll']);
$router->get('/api/admin/testimonials_section/{id}', [$testimonials_sectionCtrl, 'getById']);
$router->post('/api/admin/testimonials_section', [$testimonials_sectionCtrl, 'create']);
$router->put('/api/admin/testimonials_section/{id}', [$testimonials_sectionCtrl, 'update']);
$router->delete('/api/admin/testimonials_section/{id}', [$testimonials_sectionCtrl, 'delete']);