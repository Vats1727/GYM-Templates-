<?php

class Database {
    public static function connect() {
        try {
            $dbPath = __DIR__ . '/../database/gym_v2.sqlite';
            $pdo = new PDO('sqlite:' . $dbPath);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $pdo->exec("PRAGMA busy_timeout = 5000;");
            
            // Self-healing SQLite migrations runner
            // 1. Create and seed cta_section table
            $pdo->exec("CREATE TABLE IF NOT EXISTS cta_section (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                tag TEXT,
                title_line1 TEXT,
                title_line2 TEXT,
                title_line3 TEXT,
                subtitle TEXT,
                btn1_text TEXT,
                btn2_text TEXT,
                status TEXT DEFAULT 'Active',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )");
            
            $stmt = $pdo->query("SELECT COUNT(*) FROM cta_section");
            if ($stmt->fetchColumn() == 0) {
                $pdo->exec("INSERT INTO cta_section (tag, title_line1, title_line2, title_line3, subtitle, btn1_text, btn2_text, status) VALUES ('Start Today', 'NO MORE', 'WAITING', 'FOR CHANGE', 'Your first week is on us. Walk in, train hard, and decide if you belong here.', 'Claim Free Trial', 'View Schedule', 'Active')");
            }
            
            // 2. Ensure footer table has social link and address columns
            $hasAddressCols = true;
            try {
                $pdo->query("SELECT address_line1 FROM footer LIMIT 1");
            } catch (Exception $e) {
                $hasAddressCols = false;
            }
            
            if (!$hasAddressCols) {
                $pdo->exec("DROP TABLE IF EXISTS footer");
                $pdo->exec("CREATE TABLE IF NOT EXISTS footer (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    logo_text TEXT,
                    logo_accent TEXT,
                    description TEXT,
                    socials_json TEXT,
                    fb_link TEXT DEFAULT '#',
                    tw_link TEXT DEFAULT '#',
                    ig_link TEXT DEFAULT '#',
                    yt_link TEXT DEFAULT '#',
                    address_line1 TEXT DEFAULT '123 Iron District',
                    address_line2 TEXT DEFAULT 'New York, NY 10001',
                    hours_line1 TEXT DEFAULT 'Mon–Fri: 5am – 11pm',
                    hours_line2 TEXT DEFAULT 'Sat–Sun: 7am – 9pm',
                    phone_number TEXT DEFAULT '+1 (212) 555-0100',
                    status TEXT DEFAULT 'Active',
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )");
                $pdo->exec("INSERT INTO footer (logo_text, logo_accent, description, socials_json, fb_link, tw_link, ig_link, yt_link, address_line1, address_line2, hours_line1, hours_line2, phone_number, status) VALUES ('IRON', 'X', 'The premier training destination for those serious about transformation. Elite coaching meets community.', '[]', 'https://facebook.com/', 'https://twitter.com/', 'https://instagram.com/', 'https://youtube.com/', '123 Iron District', 'New York, NY 10001', 'Mon–Fri: 5am – 11pm', 'Sat–Sun: 7am – 9pm', '+1 (212) 555-0100', 'Active')");
            }

            return $pdo;
        } catch (PDOException $e) {
            die('Connection failed: ' . $e->getMessage());
        }
    }
}