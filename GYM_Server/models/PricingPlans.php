<?php
class PricingPlans {
    private $conn;
    private $table = "pricing_plans";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        $cols = $this->getTableColumns();
        $orderBy = in_array('sort_order', $cols) ? "ORDER BY sort_order ASC, id ASC" : "ORDER BY id ASC";
        $stmt = $this->conn->prepare("SELECT * FROM \"$this->table\" $orderBy");
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return array_map([$this, 'decodeRow'], $rows);
    }

    public function getById($id) {
        $stmt = $this->conn->prepare("SELECT * FROM \"$this->table\" WHERE id = :id LIMIT 1");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ? $this->decodeRow($row) : false;
    }

    public function getActive() {
        $cols = $this->getTableColumns();
        $orderBy = in_array('sort_order', $cols) ? "ORDER BY sort_order ASC, id ASC" : "ORDER BY id ASC";
        $stmt = $this->conn->prepare("SELECT * FROM \"$this->table\" WHERE status = 'Active' $orderBy");
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return array_map([$this, 'decodeRow'], $rows);
    }

    public function create($data) {
        $columns = $this->getTableColumns();
        $filteredData = array_intersect_key($data, array_flip($columns));
        $fields = array_keys($filteredData);
        $placeholders = array_map(fn($f) => ":$f", $fields);
        $sql = "INSERT INTO \"$this->table\" (\"" . implode('", "', $fields) . "\") VALUES (" . implode(', ', $placeholders) . ")";
        $stmt = $this->conn->prepare($sql);
        return $stmt->execute($filteredData);
    }

    public function update($id, $data) {
        $columns = $this->getTableColumns();
        $filteredData = array_intersect_key($data, array_flip($columns));
        $sets = array_map(fn($f) => "\"$f\" = :$f", array_keys($filteredData));
        $sql = "UPDATE \"$this->table\" SET " . implode(', ', $sets) . ", updated_at = CURRENT_TIMESTAMP WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $filteredData['id'] = $id;
        return $stmt->execute($filteredData);
    }

    public function delete($id) {
        $stmt = $this->conn->prepare("DELETE FROM \"$this->table\" WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        return $stmt->execute();
    }

    public function reorder($ids) {
        foreach ($ids as $index => $id) {
            $stmt = $this->conn->prepare("UPDATE \"$this->table\" SET sort_order = :ord WHERE id = :id");
            $stmt->execute(['ord' => $index, 'id' => $id]);
        }
        return true;
    }

    private function getTableColumns() {
        try {
            $stmt = $this->conn->prepare("PRAGMA table_info(\"$this->table\")");
            $stmt->execute();
            return array_map(fn($col) => $col['name'], $stmt->fetchAll(PDO::FETCH_ASSOC));
        } catch (Exception $e) { return []; }
    }

    private function decodeRow($row) {
        foreach ($row as $key => $val) {
            if (is_string($val) && (strpos($val, '{') === 0 || strpos($val, '[') === 0)) {
                $decoded = json_decode($val, true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    $row[$key] = $decoded;
                }
            }
        }
        if (isset($row['case_status'])) {
            $row['status'] = $row['case_status'];
        }
        return $row;
    }
}