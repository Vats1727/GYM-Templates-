<?php
require_once __DIR__ . '/../controllers/TrainersSectionController.php';

$trainers_sectionCtrl = new TrainersSectionController();

// Public routes
$router->get('/api/trainers_section/active', [$trainers_sectionCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/trainers_section', [$trainers_sectionCtrl, 'getAll']);
$router->get('/api/admin/trainers_section/{id}', [$trainers_sectionCtrl, 'getById']);
$router->post('/api/admin/trainers_section', [$trainers_sectionCtrl, 'create']);
$router->put('/api/admin/trainers_section/{id}', [$trainers_sectionCtrl, 'update']);
$router->delete('/api/admin/trainers_section/{id}', [$trainers_sectionCtrl, 'delete']);