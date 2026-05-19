<?php
require_once __DIR__ . '/../controllers/FaqController.php';

$faqCtrl = new FaqController();

// Public routes
$router->get('/api/faq/active', [$faqCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/faq', [$faqCtrl, 'getAll']);
$router->get('/api/admin/faq/{id}', [$faqCtrl, 'getById']);
$router->post('/api/admin/faq', [$faqCtrl, 'create']);
$router->put('/api/admin/faq/{id}', [$faqCtrl, 'update']);
$router->delete('/api/admin/faq/{id}', [$faqCtrl, 'delete']);
$router->post('/api/admin/faq/reorder', [$faqCtrl, 'reorder']);