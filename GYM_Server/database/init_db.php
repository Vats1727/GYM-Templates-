<?php

require_once __DIR__ . '/../config/database.php';

try {
    $dbPath = __DIR__ . '/../database/gym.sqlite';
    // Ensure database folder exists
    if (!file_exists(dirname($dbPath))) {
        mkdir(dirname($dbPath), 0777, true);
    }

    $pdo = new PDO('sqlite:' . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->exec("PRAGMA busy_timeout = 5000;");

    // Drop all existing tables to perform a clean database reset
    $tablesToDrop = [
        'users', 'otp_codes', 'hero_section', 'about_section', 'navbar', 'footer', 
        'specialties', 'transformations', 'pricing_plans', 'testimonials', 'process_steps', 'bookings',
        'specialties_heading', 'transformations_heading', 'pricing_plans_heading', 'testimonials_heading', 'process_steps_heading'
    ];
    foreach ($tablesToDrop as $tbl) {
        $pdo->exec("DROP TABLE IF EXISTS \"$tbl\"");
    }

    echo "Cleared old tables.\n";

    // 1. Users Table (Admin auth)
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT,
        role TEXT DEFAULT 'admin',
        otp TEXT DEFAULT NULL,
        token TEXT DEFAULT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // 2. OTP Codes Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS otp_codes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT,
        code TEXT,
        expires_at DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // 3. Hero Section Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS hero_section (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tag TEXT,
        title_line1 TEXT,
        title_line2 TEXT,
        title_line3 TEXT,
        title_line4 TEXT,
        tagline TEXT,
        stat1_val TEXT,
        stat1_lbl TEXT,
        stat2_val TEXT,
        stat2_lbl TEXT,
        stat3_val TEXT,
        stat3_lbl TEXT,
        btn_text TEXT,
        btn2_text TEXT,
        image TEXT DEFAULT NULL,
        sort_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // 4. About Section Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS about_section (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tag TEXT,
        title TEXT,
        desc1 TEXT,
        desc2 TEXT,
        desc3 TEXT,
        experience_years INTEGER,
        cards TEXT, -- JSON string array of objects (icon, title, desc)
        image TEXT DEFAULT NULL,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // 5. Navbar Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS navbar (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        logo_text TEXT,
        logo_accent TEXT,
        cta_text TEXT,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // 6. Footer Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS footer (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        logo_text TEXT,
        logo_accent TEXT,
        description TEXT,
        email TEXT,
        whatsapp TEXT,
        address TEXT,
        hours TEXT,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // 7. Specialties Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS specialties (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        num TEXT,
        icon TEXT DEFAULT 'Dumbbell',
        title TEXT,
        desc TEXT,
        tags TEXT, -- JSON string array of strings
        sort_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // 8. Transformations Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS transformations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        detail TEXT,
        metrics TEXT, -- JSON string array of objects (val, label)
        beforeType TEXT,
        afterType TEXT,
        sort_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // 9. Pricing Plans Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS pricing_plans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price TEXT,
        billing TEXT,
        desc TEXT,
        features TEXT, -- JSON string array of objects (text, ok)
        featured INTEGER DEFAULT 0, -- 1/0
        btnText TEXT,
        sort_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // 10. Testimonials Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS testimonials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        avatar TEXT,
        stars INTEGER DEFAULT 5,
        text TEXT,
        authorName TEXT,
        authorMeta TEXT,
        result TEXT,
        featured INTEGER DEFAULT 0,
        avatarColors TEXT, -- JSON string array of colors
        sort_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // 11. Process Steps Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS process_steps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        num TEXT,
        icon TEXT,
        title TEXT,
        desc TEXT,
        sort_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // 12. Bookings Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        phone TEXT,
        email TEXT,
        service TEXT,
        date TEXT,
        time TEXT,
        note TEXT,
        status TEXT DEFAULT 'Pending',
        sort_order INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // 13. Headings Tables
    $headingTables = [
        'specialties_heading', 'transformations_heading', 'pricing_plans_heading', 'testimonials_heading', 'process_steps_heading'
    ];
    foreach ($headingTables as $tbl) {
        $pdo->exec("CREATE TABLE IF NOT EXISTS \"$tbl\" (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tag TEXT,
            title TEXT,
            desc TEXT,
            sort_order INTEGER DEFAULT 0,
            status TEXT DEFAULT 'Active',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )");
    }

    echo "Tables created successfully.\n";

    // --- SEED DATA ---

    // 1. Admin Users
    $pass = password_hash('admin123', PASSWORD_DEFAULT);
    $pdo->exec("INSERT INTO users (name, email, password) VALUES ('Marcus Reid', 'admin@marcusreid.fit', '$pass')");
    $pdo->exec("INSERT INTO users (name, email, password) VALUES ('Admin General', 'admin@gmail.com', '$pass')");
    $pdo->exec("INSERT INTO users (name, email, password) VALUES ('Jenil Vaghasiya', 'vaghasiyajenil29@gmail.com', '$pass')");
    echo "Admins seeded: admin@marcusreid.fit / password: admin123\n";

    // 2. Hero Section Seed
    $pdo->exec("INSERT INTO hero_section (tag, title_line1, title_line2, title_line3, title_line4, tagline, stat1_val, stat1_lbl, stat2_val, stat2_lbl, stat3_val, stat3_lbl, btn_text, btn2_text) VALUES (
        'Elite Personal Training · Online & In-Person',
        'BUILD',
        'YOUR',
        'BEST',
        'BODY',
        'Strength · Conditioning · Body Recomposition · Athletic Performance',
        '500+',
        'Clients Transformed',
        '10yr',
        'Experience',
        '98%',
        'Goal Achievement',
        'Get My Program',
        'View Transformations'
    )");
    echo "Hero section seeded.\n";

    // 3. About Section Seed
    $aboutCardsJson = json_encode([
        [
            "icon" => "Dumbbell",
            "title" => "NSCA — CSCS",
            "desc" => "Strength & Conditioning"
        ],
        [
            "icon" => "Apple",
            "title" => "Precision Nutrition L2",
            "desc" => "Nutrition Coaching"
        ],
        [
            "icon" => "Activity",
            "title" => "FMS Certified",
            "desc" => "Movement Screening"
        ],
        [
            "icon" => "Heart",
            "title" => "ACSM — CPT",
            "desc" => "Clinical Exercise"
        ]
    ]);
    $pdo->exec("INSERT INTO about_section (tag, title, desc1, desc2, desc3, experience_years, cards) VALUES (
        'About Marcus',
        'No Excuses. \nOnly Results.',
        'Marcus Reid is a NSCA-certified Strength & Conditioning Specialist based in Dubai with a decade of transforming everyday people into the best versions of themselves — athletes, executives, new mums, and complete beginners included.',
        'His approach cuts through the noise of the fitness industry: no fads, no gimmicks. Just intelligent, periodised programming backed by sport science, precise nutrition strategy, and relentless accountability — delivered online or in-person.',
        'Marcus has trained professional athletes, corporate executives, and hundreds of everyday clients across 4 countries. His philosophy: consistency beats perfection every single time.',
        10,
        '$aboutCardsJson'
    )");
    echo "About section seeded.\n";

    // 4. Navbar Seed
    $pdo->exec("INSERT INTO navbar (logo_text, logo_accent, cta_text) VALUES ('MARCUS', 'REID', 'Book Slot')");
    echo "Navbar seeded.\n";

    // 5. Footer Seed
    $pdo->exec("INSERT INTO footer (logo_text, logo_accent, description, email, whatsapp, address, hours) VALUES (
        'MARCUS',
        'REID',
        'Elite personal training and online coaching for those who are serious about results. Based in Dubai, coaching clients globally.',
        'marcus@marcusreid.fit',
        '+971 50 123 4567',
        'Dubai, UAE & Online',
        '7 Days · 6 AM – 9 PM GST'
    )");
    echo "Footer seeded.\n";

    // 6. Specialties Seed
    $specsData = [
        ['01', 'Dumbbell', 'Strength & Hypertrophy', 'Progressive overload programming using powerlifting, bodybuilding, and hybrid methodologies. Build real, functional muscle that performs as good as it looks.', json_encode(['Powerlifting', 'Bodybuilding', 'Periodisation']), 0],
        ['02', 'Flame', 'Fat Loss & Recomposition', 'Science-based body recomposition protocols: strategic calorie management, metabolic conditioning, and body composition tracking — no crash diets.', json_encode(['Recomp', 'DEXA Tracking', 'Nutrition']), 1],
        ['03', 'Zap', 'Athletic Performance', 'Speed, power, agility, and sport-specific conditioning. Trusted by competitive athletes in football, MMA, basketball, and track & field.', json_encode(['Speed', 'Power', 'Agility']), 2],
        ['04', 'Utensils', 'Nutrition Coaching', 'Macro programming, meal timing, and sustainable dietary habits. No rigid meal plans — flexible dieting frameworks that fit your lifestyle.', json_encode(['Macros', 'Flexible Dieting', 'Habits']), 3],
        ['05', 'Activity', 'Mobility & Injury Prevention', 'FMS-based movement screening and corrective exercise protocols. Move better, train harder, and stay injury-free long-term.', json_encode(['FMS', 'Corrective', 'Flexibility']), 4],
        ['06', 'Laptop', 'Online Coaching', 'Full-service remote coaching via a dedicated app — custom programs, weekly check-ins, video form reviews, and 24/7 messaging support.', json_encode(['App-Based', 'Video Reviews', '24/7 Support']), 5]
    ];
    foreach ($specsData as $s) {
        $stmt = $pdo->prepare("INSERT INTO specialties (num, icon, title, desc, tags, sort_order) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute($s);
    }
    echo "Specialties seeded.\n";

    // 7. Transformations Seed
    $transData = [
        [
            'James K.', '32 · Sales Director · 6-Month Program',
            json_encode([['val' => '-22kg', 'label' => 'Weight Lost'], ['val' => '+14%', 'label' => 'Muscle'], ['val' => '6mo', 'label' => 'Timeline']]),
            'male_skinny_fat', 'male_muscular', 0
        ],
        [
            'Rania M.', '28 · Nurse · 4-Month Program',
            json_encode([['val' => '-15kg', 'label' => 'Weight Lost'], ['val' => '-12%', 'label' => 'Body Fat'], ['val' => '4mo', 'label' => 'Timeline']]),
            'female_before', 'female_after', 1
        ],
        [
            'Yusuf A.', '24 · Student Athlete · 5-Month Program',
            json_encode([['val' => '+18kg', 'label' => 'Muscle'], ['val' => '180kg', 'label' => 'Deadlift'], ['val' => '5mo', 'label' => 'Timeline']]),
            'male_athletic_before', 'male_athletic_after', 2
        ]
    ];
    foreach ($transData as $t) {
        $stmt = $pdo->prepare("INSERT INTO transformations (name, detail, metrics, beforeType, afterType, sort_order) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute($t);
    }
    echo "Transformations seeded.\n";

    // 8. Pricing Plans Seed
    $plansData = [
        [
            'Starter', '149', '/mo',
            'For beginners and those getting back into fitness. Build your foundation right.',
            json_encode([
                ['text' => 'Custom training program', 'ok' => true],
                ['text' => 'Nutrition macro targets', 'ok' => true],
                ['text' => 'Weekly check-in (text)', 'ok' => true],
                ['text' => 'Exercise video library', 'ok' => true],
                ['text' => 'App-based tracking', 'ok' => true],
                ['text' => 'Video form reviews', 'ok' => false],
                ['text' => '1:1 monthly calls', 'ok' => false]
            ]),
            0, 'Get Started', 0
        ],
        [
            'Elite Coaching', '299', '/mo',
            'Full-service online coaching for serious results. This is the flagship experience.',
            json_encode([
                ['text' => 'Custom periodised program', 'ok' => true],
                ['text' => 'Full nutrition coaching', 'ok' => true],
                ['text' => 'Weekly check-in (video call)', 'ok' => true],
                ['text' => 'Unlimited form video reviews', 'ok' => true],
                ['text' => 'Daily WhatsApp access', 'ok' => true],
                ['text' => 'Monthly 1:1 strategy call', 'ok' => true],
                ['text' => 'Supplement guidance', 'ok' => true]
            ]),
            1, 'Start Elite', 1
        ],
        [
            'VIP In-Person', '799', '/mo',
            '12 in-person sessions per month in Dubai, plus all Elite Online features.',
            json_encode([
                ['text' => '12 x PT sessions/month', 'ok' => true],
                ['text' => 'Custom periodised program', 'ok' => true],
                ['text' => 'Full nutrition coaching', 'ok' => true],
                ['text' => 'Body composition scans', 'ok' => true],
                ['text' => 'Unlimited messaging', 'ok' => true],
                ['text' => 'Monthly 1:1 calls', 'ok' => true],
                ['text' => 'Recovery & mobility plan', 'ok' => true]
            ]),
            0, 'Apply for VIP', 2
        ]
    ];
    foreach ($plansData as $p) {
        $stmt = $pdo->prepare("INSERT INTO pricing_plans (name, price, billing, desc, features, featured, btnText, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute($p);
    }
    echo "Pricing plans seeded.\n";

    // 9. Testimonials Seed
    $testData = [
        [
            'JK', 5,
            'I\'d tried 3 other trainers before Marcus. This was different from week one. The program was actually tailored to me — my schedule, my gym, my food preferences. Lost 22kg and kept every kilo off for over a year now.',
            'James K.', 'Sales Director · Dubai · 6 months', 'Lost 22kg · Dropped from 24% to 11% body fat', 1,
            json_encode(['#e8ff00', '#aabb00']), 0
        ],
        [
            'RM', 5,
            'As a nurse working rotating shifts, I told Marcus I could never stick to a plan. He built something that actually worked around my life. 4 months later, I\'m the smallest and strongest I\'ve ever been. I genuinely love training now.',
            'Rania M.', 'Registered Nurse · Online Client · 4 months', 'Lost 15kg · Now deadlifts 100kg', 0,
            json_encode(['#ff6b35', '#f7c59f']), 1
        ],
        [
            'YA', 5,
            'I went from benching 60kg to 120kg in 5 months. The programming is periodised in a way no generic gym plan even comes close to. Marcus explains the why behind everything, which made me way more committed to the process.',
            'Yusuf A.', 'Student Athlete · Dubai · 5 months', 'Bench 60→120kg · Deadlift 180kg', 0,
            json_encode(['#00d2ff', '#3a47d5']), 2
        ],
        [
            'LP', 5,
            'After having two kids, I honestly didn\'t think I could get my body back. Marcus never once made me feel like that was unrealistic. 7 months later, I\'m in the best shape of my life. The nutrition coaching alone was worth every penny.',
            'Layla P.', 'Mother of 2 · UK · Online · 7 months', '-18kg · Completed first 5K race', 0,
            json_encode(['#f953c6', '#b91d73']), 3
        ],
        [
            'OB', 5,
            'Marcus trained me for my first powerlifting competition. The programming was meticulous — peaked me perfectly on the day. Hit 3 personal bests and won my weight class. I owe that result entirely to him.',
            'Omar B.', 'Powerlifter · UAE · 8 months', '3 x PBs · 1st place at nationals (U83)', 0,
            json_encode(['#43e97b', '#38f9d7']), 4
        ],
        [
            'SH', 5,
            'I\'m a CEO and I have almost no time. The online coaching format Marcus uses is the most efficient and effective I\'ve found. Thirty-minute sessions, zero fluff, and results that showed up in 3 months. Actually sustainable too.',
            'Sam H.', 'CEO · London · Online · 3 months', '-10kg · Runs 5km before every board meeting', 0,
            json_encode(['#f7971e', '#ffd200']), 5
        ]
    ];
    foreach ($testData as $t) {
        $stmt = $pdo->prepare("INSERT INTO testimonials (avatar, stars, text, authorName, authorMeta, result, featured, avatarColors, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute($t);
    }
    echo "Testimonials seeded.\n";

    // 10. Process Steps Seed
    $stepsData = [
        ['01', 'ClipboardList', 'Apply Online', 'Fill out a short intake form covering your goals, training history, schedule, and lifestyle. Takes 5 minutes.', 0],
        ['02', 'Video', 'Strategy Call', 'Free 20-minute video call to discuss your goals, ask questions, and see if we\'re a great fit. No pressure, no pitch.', 1],
        ['03', 'Smartphone', 'Program Delivered', 'Your custom program and nutrition plan arrive in the app within 48 hours. Walk-through video included.', 2],
        ['04', 'TrendingUp', 'Train & Progress', 'Weekly check-ins, form reviews, and ongoing adjustments. Your program evolves as you improve.', 3]
    ];
    foreach ($stepsData as $s) {
        $stmt = $pdo->prepare("INSERT INTO process_steps (num, icon, title, desc, sort_order) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute($s);
    }
    echo "Process steps seeded.\n";

    // 11. Global Headings Seed
    $headingsSeeds = [
        'specialties_heading'    => ['Specialties', 'What I Do', 'Tailored coaching programs designed for your specific objectives.'],
        'transformations_heading'=> ['Transformations', 'Real Client Results', 'Check out the before/after physical metrics of clients.'],
        'pricing_plans_heading'  => ['Programs', 'Choose Your Level', 'All plans include personalised programming, nutrition guidance, and direct coach access. No cookie-cutter templates.'],
        'testimonials_heading'   => ['Client Reviews', 'The Proof', 'Results speak louder. Here\'s what clients say after committing to the process.'],
        'process_steps_heading'  => ['How It Works', 'Your Journey in 4 Steps', 'From first contact to lasting results — a simple, guided process.']
    ];
    foreach ($headingsSeeds as $tbl => $data) {
        $stmtHead = $pdo->prepare("INSERT INTO \"$tbl\" (tag, title, desc) VALUES (?, ?, ?)");
        $stmtHead->execute($data);
    }
    echo "Global Headings seeded successfully.\n";

    // 12. Sample Bookings Seed
    $pdo->exec("INSERT INTO bookings (name, phone, email, service, date, time, note, status) VALUES (
        'Aarav Mehta',
        '+91 98765 43210',
        'aarav.mehta@gmail.com',
        'Elite Coaching',
        '2026-05-20',
        '10:30 AM',
        'Interested in online weight loss and hypertrophy coaching.',
        'Pending'
    )");
    echo "Bookings seeded.\n";

    echo "SUCCESS: Database successfully fully initialized and seeded with Marcus Reid data!\n";
} catch (PDOException $e) {
    die('Database initialization failed: ' . $e->getMessage() . "\n");
}
