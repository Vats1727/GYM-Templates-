<?php
require_once __DIR__ . '/../controllers/FaqHeadingController.php';

$faq_headingCtrl = new FaqHeadingController();

// Public routes
$router->get('/api/faq_heading/active', [$faq_headingCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/faq_heading', [$faq_headingCtrl, 'getAll']);
$router->get('/api/admin/faq_heading/{id}', [$faq_headingCtrl, 'getById']);
$router->post('/api/admin/faq_heading', [$faq_headingCtrl, 'create']);
$router->put('/api/admin/faq_heading/{id}', [$faq_headingCtrl, 'update']);
$router->delete('/api/admin/faq_heading/{id}', [$faq_headingCtrl, 'delete']);
$router->post('/api/admin/faq_heading/reorder', [$faq_headingCtrl, 'reorder']);