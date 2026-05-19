<?php
require_once __DIR__ . '/../models/Navbar.php';

class NavbarController {
    private $model;
    public function __construct() {
        $this->model = new Navbar(Database::connect());
    }

    public function getAll() { return jsonResponse($this->model->getAll()); }
    public function getActive() { return jsonResponse($this->model->getActive()); }
    public function getById($id) {
        $data = $this->model->getById($id);
        if ($data) return jsonResponse($data);
        http_response_code(404);
        return jsonResponse(['error' => 'Not found']);
    }
    public function create() {
        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
        if ($this->model->create($data)) return jsonResponse(['success' => true]);
        http_response_code(500);
        return jsonResponse(['error' => 'Failed to create']);
    }
    public function update($id) {
        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
        if ($this->model->update($id, $data)) return jsonResponse(['success' => true]);
        http_response_code(500);
        return jsonResponse(['error' => 'Failed to update']);
    }
    public function delete($id) {
        if ($this->model->delete($id)) return jsonResponse(['success' => true]);
        http_response_code(500);
        return jsonResponse(['error' => 'Failed to delete']);
    }
}
