<?php
require_once __DIR__ . '/../controllers/BookingsController.php';

$bookingsCtrl = new BookingsController();

// Public routes
$router->get('/api/bookings/active', [$bookingsCtrl, 'getActive']);

// Protected routes (Admin)
$router->get('/api/admin/bookings', [$bookingsCtrl, 'getAll']);
$router->get('/api/admin/bookings/{id}', [$bookingsCtrl, 'getById']);
$router->post('/api/admin/bookings', [$bookingsCtrl, 'create']);
$router->put('/api/admin/bookings/{id}', [$bookingsCtrl, 'update']);
$router->delete('/api/admin/bookings/{id}', [$bookingsCtrl, 'delete']);
$router->post('/api/admin/bookings/reorder', [$bookingsCtrl, 'reorder']);