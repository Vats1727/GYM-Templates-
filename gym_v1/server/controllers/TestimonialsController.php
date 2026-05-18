<?php
require_once __DIR__ . '/../models/Testimonials.php';
require_once __DIR__ . '/../helpers/FileHelper.php';

class TestimonialsController {
    private $model;
    public function __construct() {
        $this->model = new Testimonials(Database::connect());
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
        
        if (isset($_FILES['avatar']) && $_FILES['avatar']['error'] === UPLOAD_ERR_OK) {
            $data['avatar'] = FileHelper::upload($_FILES['avatar'], 'testimonials');
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
        
        if (isset($_FILES['avatar']) && $_FILES['avatar']['error'] === UPLOAD_ERR_OK) {
            // Remove old image if exists
            $existing = $this->model->getById($id);
            if ($existing && !empty($existing['avatar'])) {
                FileHelper::delete($existing['avatar']);
            }
            $data['avatar'] = FileHelper::upload($_FILES['avatar'], 'testimonials');
        }

        if ($this->model->update($id, $data)) return jsonResponse(['success' => true]);
        http_response_code(500);
        return jsonResponse(['error' => 'Failed to update']);
    }

    public function delete($id) {
        $existing = $this->model->getById($id);
        if ($existing && !empty($existing['avatar'])) {
            FileHelper::delete($existing['avatar']);
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