<?php
require_once __DIR__ . '/../controllers/ScheduleSectionController.php';

$schedule_sectionCtrl = new ScheduleSectionController();

// Public routes
$router->get('/api/schedule_section/active', [$schedule_sectionCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/schedule_section', [$schedule_sectionCtrl, 'getAll']);
$router->get('/api/admin/schedule_section/{id}', [$schedule_sectionCtrl, 'getById']);
$router->post('/api/admin/schedule_section', [$schedule_sectionCtrl, 'create']);
$router->put('/api/admin/schedule_section/{id}', [$schedule_sectionCtrl, 'update']);
$router->delete('/api/admin/schedule_section/{id}', [$schedule_sectionCtrl, 'delete']);