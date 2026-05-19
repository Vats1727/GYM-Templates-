<?php
require_once __DIR__ . '/../controllers/CaseStudiesController.php';

$case_studiesCtrl = new CaseStudiesController();

// Public routes
$router->get('/api/case_studies/active', [$case_studiesCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/case_studies', [$case_studiesCtrl, 'getAll']);
$router->get('/api/admin/case_studies/{id}', [$case_studiesCtrl, 'getById']);
$router->post('/api/admin/case_studies', [$case_studiesCtrl, 'create']);
$router->put('/api/admin/case_studies/{id}', [$case_studiesCtrl, 'update']);
$router->delete('/api/admin/case_studies/{id}', [$case_studiesCtrl, 'delete']);
$router->post('/api/admin/case_studies/reorder', [$case_studiesCtrl, 'reorder']);