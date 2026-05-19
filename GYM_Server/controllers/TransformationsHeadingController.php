<?php
require_once __DIR__ . '/../models/TransformationsHeading.php';

class TransformationsHeadingController {
    private $model;
    public function __construct() {
        $this->model = new TransformationsHeading(Database::connect());
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
        if ($this->model->create($data)) {
            // Special custom action for booking notification email
            if ("transformations_heading" === "bookings" && isset($data['email']) && isset($data['name']) && isset($data['service'])) {
                try {
                    require_once __DIR__ . '/../helpers/MailHelper.php';
                    MailHelper::sendThankYouEmail($data['email'], $data['name'], $data['service']);
                } catch (Exception $e) {}
            }
            return jsonResponse(['success' => true]);
        }
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
    public function reorder() {
        $data = json_decode(file_get_contents("php://input"), true);
        if (isset($data['ids']) && $this->model->reorder($data['ids'])) return jsonResponse(['success' => true]);
        http_response_code(400);
        return jsonResponse(['error' => 'Invalid data']);
    }
}