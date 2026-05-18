<?php

$tables = [
    'hero_section', 'ticker', 'programs', 'stats', 
    'trainers', 'pricing', 'schedule', 'testimonials'
];

foreach ($tables as $table) {
    $camelCase = str_replace(' ', '', ucwords(str_replace('_', ' ', $table)));
    
    // Model
    $modelContent = <<<PHP
<?php
class $camelCase {
    private \$conn;
    private \$table = "$table";

    public function __construct(\$db) {
        \$this->conn = \$db;
    }

    public function getAll() {
        \$stmt = \$this->conn->prepare("SELECT * FROM \\"\$this->table\\" ORDER BY sort_order ASC, id ASC");
        \$stmt->execute();
        \$rows = \$stmt->fetchAll(PDO::FETCH_ASSOC);
        return array_map([\$this, 'decodeRow'], \$rows);
    }

    public function getById(\$id) {
        \$stmt = \$this->conn->prepare("SELECT * FROM \\"\$this->table\\" WHERE id = :id LIMIT 1");
        \$stmt->bindParam(':id', \$id, PDO::PARAM_INT);
        \$stmt->execute();
        \$row = \$stmt->fetch(PDO::FETCH_ASSOC);
        return \$row ? \$this->decodeRow(\$row) : false;
    }

    public function getActive() {
        \$stmt = \$this->conn->prepare("SELECT * FROM \\"\$this->table\\" WHERE status = 'Active' ORDER BY sort_order ASC, id ASC");
        \$stmt->execute();
        \$rows = \$stmt->fetchAll(PDO::FETCH_ASSOC);
        return array_map([\$this, 'decodeRow'], \$rows);
    }

    public function create(\$data) {
        \$columns = \$this->getTableColumns();
        \$filteredData = array_intersect_key(\$data, array_flip(\$columns));
        \$fields = array_keys(\$filteredData);
        \$placeholders = array_map(fn(\$f) => ":\$f", \$fields);
        \$sql = "INSERT INTO \\"\$this->table\\" (\\"" . implode('", "', \$fields) . "\\") VALUES (" . implode(', ', \$placeholders) . ")";
        \$stmt = \$this->conn->prepare(\$sql);
        return \$stmt->execute(\$filteredData);
    }

    public function update(\$id, \$data) {
        \$columns = \$this->getTableColumns();
        \$filteredData = array_intersect_key(\$data, array_flip(\$columns));
        \$sets = array_map(fn(\$f) => "\\"\$f\\" = :\$f", array_keys(\$filteredData));
        \$sql = "UPDATE \\"\$this->table\\" SET " . implode(', ', \$sets) . ", updated_at = CURRENT_TIMESTAMP WHERE id = :id";
        \$stmt = \$this->conn->prepare(\$sql);
        \$filteredData['id'] = \$id;
        return \$stmt->execute(\$filteredData);
    }

    public function delete(\$id) {
        \$stmt = \$this->conn->prepare("DELETE FROM \\"\$this->table\\" WHERE id = :id");
        \$stmt->bindParam(':id', \$id, PDO::PARAM_INT);
        return \$stmt->execute();
    }

    public function reorder(\$ids) {
        foreach (\$ids as \$index => \$id) {
            \$stmt = \$this->conn->prepare("UPDATE \\"\$this->table\\" SET sort_order = :ord WHERE id = :id");
            \$stmt->execute(['ord' => \$index, 'id' => \$id]);
        }
        return true;
    }

    private function getTableColumns() {
        try {
            \$stmt = \$this->conn->prepare("PRAGMA table_info(\\"\$this->table\\")");
            \$stmt->execute();
            return array_map(fn(\$col) => \$col['name'], \$stmt->fetchAll(PDO::FETCH_ASSOC));
        } catch (Exception \$e) { return []; }
    }

    private function decodeRow(\$row) {
        foreach (\$row as \$key => \$val) {
            if (is_string(\$val) && (strpos(\$val, '{') === 0 || strpos(\$val, '[') === 0)) {
                \$decoded = json_decode(\$val, true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    \$row[\$key] = \$decoded;
                }
            }
        }
        return \$row;
    }
}
PHP;
    file_put_contents(__DIR__ . "/models/$camelCase.php", $modelContent);

    // Controller
    $controllerContent = <<<PHP
<?php
require_once __DIR__ . '/../models/$camelCase.php';

class {$camelCase}Controller {
    private \$model;
    public function __construct() {
        \$this->model = new $camelCase(Database::connect());
    }

    public function getAll() { return jsonResponse(\$this->model->getAll()); }
    public function getActive() { return jsonResponse(\$this->model->getActive()); }
    public function getById(\$id) {
        \$data = \$this->model->getById(\$id);
        if (\$data) return jsonResponse(\$data);
        http_response_code(404);
        return jsonResponse(['error' => 'Not found']);
    }
    public function create() {
        \$data = json_decode(file_get_contents("php://input"), true) ?? \$_POST;
        if (\$this->model->create(\$data)) return jsonResponse(['success' => true]);
        http_response_code(500);
        return jsonResponse(['error' => 'Failed to create']);
    }
    public function update(\$id) {
        \$data = json_decode(file_get_contents("php://input"), true) ?? \$_POST;
        if (\$this->model->update(\$id, \$data)) return jsonResponse(['success' => true]);
        http_response_code(500);
        return jsonResponse(['error' => 'Failed to update']);
    }
    public function delete(\$id) {
        if (\$this->model->delete(\$id)) return jsonResponse(['success' => true]);
        http_response_code(500);
        return jsonResponse(['error' => 'Failed to delete']);
    }
    public function reorder() {
        \$data = json_decode(file_get_contents("php://input"), true);
        if (isset(\$data['ids']) && \$this->model->reorder(\$data['ids'])) return jsonResponse(['success' => true]);
        http_response_code(400);
        return jsonResponse(['error' => 'Invalid data']);
    }
}
PHP;
    file_put_contents(__DIR__ . "/controllers/{$camelCase}Controller.php", $controllerContent);

    // Route
    $routeContent = <<<PHP
<?php
require_once __DIR__ . '/../controllers/{$camelCase}Controller.php';

\${$table}Ctrl = new {$camelCase}Controller();

// Public routes
\$router->get('/api/$table/active', [\${$table}Ctrl, 'getActive']);

// Protected routes (Admin)
\$router->get('/api/admin/$table', [\${$table}Ctrl, 'getAll']);
\$router->get('/api/admin/$table/{id}', [\${$table}Ctrl, 'getById']);
\$router->post('/api/admin/$table', [\${$table}Ctrl, 'create']);
\$router->put('/api/admin/$table/{id}', [\${$table}Ctrl, 'update']);
\$router->delete('/api/admin/$table/{id}', [\${$table}Ctrl, 'delete']);
\$router->post('/api/admin/$table/reorder', [\${$table}Ctrl, 'reorder']);
PHP;
    file_put_contents(__DIR__ . "/routes/{$table}Routes.php", $routeContent);

    echo "Generated Model, Controller, and Routes for $camelCase\n";
}
