<?php
require_once __DIR__ . '/../controllers/ProgramsSectionController.php';

$programs_sectionCtrl = new ProgramsSectionController();

// Public routes
$router->get('/api/programs_section/active', [$programs_sectionCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/programs_section', [$programs_sectionCtrl, 'getAll']);
$router->get('/api/admin/programs_section/{id}', [$programs_sectionCtrl, 'getById']);
$router->post('/api/admin/programs_section', [$programs_sectionCtrl, 'create']);
$router->put('/api/admin/programs_section/{id}', [$programs_sectionCtrl, 'update']);
$router->delete('/api/admin/programs_section/{id}', [$programs_sectionCtrl, 'delete']);