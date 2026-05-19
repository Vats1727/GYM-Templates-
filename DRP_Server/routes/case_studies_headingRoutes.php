<?php
require_once __DIR__ . '/../controllers/CaseStudiesHeadingController.php';

$case_studies_headingCtrl = new CaseStudiesHeadingController();

// Public routes
$router->get('/api/case_studies_heading/active', [$case_studies_headingCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/case_studies_heading', [$case_studies_headingCtrl, 'getAll']);
$router->get('/api/admin/case_studies_heading/{id}', [$case_studies_headingCtrl, 'getById']);
$router->post('/api/admin/case_studies_heading', [$case_studies_headingCtrl, 'create']);
$router->put('/api/admin/case_studies_heading/{id}', [$case_studies_headingCtrl, 'update']);
$router->delete('/api/admin/case_studies_heading/{id}', [$case_studies_headingCtrl, 'delete']);
$router->post('/api/admin/case_studies_heading/reorder', [$case_studies_headingCtrl, 'reorder']);