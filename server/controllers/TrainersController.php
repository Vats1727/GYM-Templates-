<?php
require_once __DIR__ . '/../models/Trainers.php';
require_once __DIR__ . '/../helpers/FileHelper.php';

class TrainersController {
    private $model;
    public function __construct() {
        $this->model = new Trainers(Database::connect());
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
        $data = $_POST;
        if (empty($data)) {
            $data = json_decode(file_get_contents("php://input"), true) ?? [];
        }
        
        if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
            $data['image'] = FileHelper::upload($_FILES['image'], 'trainers');
        }

        if ($this->model->create($data)) return jsonResponse(['success' => true]);
        http_response_code(500);
        return jsonResponse(['error' => 'Failed to create']);
    }

    public function update($id) {
        $data = $_POST;
        if (empty($data)) {
            $data = json_decode(file_get_contents("php://input"), true) ?? [];
        }
        
        if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
            // Remove old image if exists
            $existing = $this->model->getById($id);
            if ($existing && !empty($existing['image'])) {
                FileHelper::delete($existing['image']);
            }
            $data['image'] = FileHelper::upload($_FILES['image'], 'trainers');
        }

        if ($this->model->update($id, $data)) return jsonResponse(['success' => true]);
        http_response_code(500);
        return jsonResponse(['error' => 'Failed to update']);
    }

    public function delete($id) {
        $existing = $this->model->getById($id);
        if ($existing && !empty($existing['image'])) {
            FileHelper::delete($existing['image']);
        }

        if ($this->model->delete($id)) return jsonResponse(['success' => true]);
        http_response_code(500);
        return jsonResponse(['error' => 'Failed to delete']);
    }

    public function reorder() {
        $data = json_decode(file_get_contents("php://input"), true);
        if (isset($data['ids']) && $this->model->reorder($data['ids'])) return jsonResponse(['success' => true]);
        http_response_code(400);
        return jsonResponse(['error' => 'Invalid data']);
    }
}