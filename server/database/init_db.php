<?php

require_once __DIR__ . '/../config/database.php';

$pdo = Database::connect();

$tables = [
    "CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT,
        otp TEXT DEFAULT NULL,
        token TEXT DEFAULT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE IF NOT EXISTS hero_section (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tag TEXT,
        title_line1 TEXT,
        title_line2 TEXT,
        title_line3 TEXT,
        btn1_text TEXT,
        btn2_text TEXT,
        subtitle TEXT,
        stat1_val TEXT,
        stat1_lbl TEXT,
        stat2_val TEXT,
        stat2_lbl TEXT,
        image TEXT,
        marquee_json TEXT,
        sort_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE IF NOT EXISTS ticker (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        item_text TEXT,
        sort_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE IF NOT EXISTS programs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        num TEXT,
        icon TEXT,
        tag TEXT,
        name TEXT,
        desc TEXT,
        featured INTEGER DEFAULT 0,
        sort_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE IF NOT EXISTS stats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        num TEXT,
        suf TEXT,
        label TEXT,
        sort_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE IF NOT EXISTS trainers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        num TEXT,
        name TEXT,
        role TEXT,
        image TEXT,
        color TEXT,
        sort_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE IF NOT EXISTS pricing (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        plan TEXT,
        amount TEXT,
        popular INTEGER DEFAULT 0,
        features_json TEXT,
        sort_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE IF NOT EXISTS schedule (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        day TEXT,
        time TEXT,
        name TEXT,
        trainer TEXT,
        duration TEXT,
        type TEXT,
        spots INTEGER,
        sort_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE IF NOT EXISTS testimonials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        quote TEXT,
        name TEXT,
        detail TEXT,
        avatar TEXT,
        stars INTEGER,
        sort_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE IF NOT EXISTS programs_section (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tag TEXT,
        title TEXT,
        desc TEXT,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE IF NOT EXISTS schedule_section (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tag TEXT,
        title TEXT,
        desc TEXT,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE IF NOT EXISTS trainers_section (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tag TEXT,
        title TEXT,
        desc TEXT,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE IF NOT EXISTS pricing_section (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tag TEXT,
        title TEXT,
        desc TEXT,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE IF NOT EXISTS testimonials_section (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tag TEXT,
        title TEXT,
        desc TEXT,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE IF NOT EXISTS navbar (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        logo_text TEXT,
        logo_accent TEXT,
        cta_text TEXT,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE IF NOT EXISTS footer (
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
    )",
    "CREATE TABLE IF NOT EXISTS cta_section (
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
    )"
];

$pdo->exec("DROP TABLE IF EXISTS hero_section");
$pdo->exec("DROP TABLE IF EXISTS trainers");
$pdo->exec("DROP TABLE IF EXISTS testimonials");
$pdo->exec("DROP TABLE IF EXISTS footer");

foreach ($tables as $sql) {
    try {
        $pdo->exec($sql);
        echo "Executed: " . explode('(', $sql)[0] . "\n";
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage() . "\n";
    }
}

// Seed default hero_section
$stmt = $pdo->query("SELECT COUNT(*) FROM hero_section");
if ($stmt->fetchColumn() == 0) {
    $sql = "INSERT INTO hero_section (tag, title_line1, title_line2, title_line3, btn1_text, btn2_text, subtitle, stat1_val, stat1_lbl, stat2_val, stat2_lbl, image, marquee_json, status)
            VALUES ('Now Accepting Members', 'FORGE YOUR', 'BEST', 'BODY', 'Start free trial', 'Explore Programs', 'Elite coaching. Cutting-edge equipment. A community that pushes you further than you thought possible.', '2.4K+', 'Active Members', '98%', 'Satisfaction Rate', '', '[\"FORGE YOUR LEGEND\", \"LIMITLESS POTENTIAL\", \"NO PAIN NO GAIN\"]', 'Active')";
    $pdo->exec($sql);
    echo "Default hero_section seeded.\n";
}

// Insert default admin if not exists
$stmt = $pdo->query("SELECT COUNT(*) FROM users");
if ($stmt->fetchColumn() == 0) {
    $pass = password_hash('admin123', PASSWORD_DEFAULT);
    $pdo->exec("INSERT INTO users (email, password) VALUES ('admin@gym.com', '$pass')");
    echo "Default admin created: admin@gym.com / admin123\n";
}

// Seed default navbar if empty
$stmt = $pdo->query("SELECT COUNT(*) FROM navbar");
if ($stmt->fetchColumn() == 0) {
    $pdo->exec("INSERT INTO navbar (logo_text, logo_accent, cta_text, status) VALUES ('IRON', 'X', 'JOIN NOW', 'Active')");
    echo "Default navbar seeded.\n";
}

// Seed default footer if empty
$stmt = $pdo->query("SELECT COUNT(*) FROM footer");
if ($stmt->fetchColumn() == 0) {
    $pdo->exec("INSERT INTO footer (logo_text, logo_accent, description, socials_json, fb_link, tw_link, ig_link, yt_link, address_line1, address_line2, hours_line1, hours_line2, phone_number, status) VALUES ('IRON', 'X', 'The premier training destination for those serious about transformation. Elite coaching meets community.', '[]', 'https://facebook.com/', 'https://twitter.com/', 'https://instagram.com/', 'https://youtube.com/', '123 Iron District', 'New York, NY 10001', 'Mon–Fri: 5am – 11pm', 'Sat–Sun: 7am – 9pm', '+1 (212) 555-0100', 'Active')");
    echo "Default footer seeded.\n";
}

// Seed default cta_section if empty
$stmt = $pdo->query("SELECT COUNT(*) FROM cta_section");
if ($stmt->fetchColumn() == 0) {
    $pdo->exec("INSERT INTO cta_section (tag, title_line1, title_line2, title_line3, subtitle, btn1_text, btn2_text, status) VALUES ('Start Today', 'NO MORE', 'WAITING', 'FOR CHANGE', 'Your first week is on us. Walk in, train hard, and decide if you belong here.', 'Claim Free Trial', 'View Schedule', 'Active')");
    echo "Default cta_section seeded.\n";
}

// Seed default section headings if empty
$headingSections = [
    'programs_section' => ['OUR PROGRAMS', 'BUILD YOUR BEST', 'Elevate your workout experience with specialized programs led by expert instructors.'],
    'schedule_section' => ['OUR SCHEDULE', 'BOOK YOUR SESSION', 'Check our real-time weekly class schedule and secure your slot in premium sessions.'],
    'trainers_section' => ['MEET OUR', 'EXPERT COACHES', 'Train under elite professionals dedicated to pushing your performance boundaries.'],
    'pricing_section' => ['MEMBERSHIP', 'PRICING PLANS', 'Choose the perfect membership tier that fits your fitness and lifestyle goals.'],
    'testimonials_section' => ['SUCCESS STORIES', 'MEMBER STORIES', 'Read how IronX has helped real members completely reshape their lives.']
];

foreach ($headingSections as $tbl => $vals) {
    $stmt = $pdo->query("SELECT COUNT(*) FROM $tbl");
    if ($stmt->fetchColumn() == 0) {
        $stmtInsert = $pdo->prepare("INSERT INTO $tbl (tag, title, desc, status) VALUES (?, ?, ?, 'Active')");
        $stmtInsert->execute($vals);
        echo "Default $tbl seeded.\n";
    }
}

// Seed default ticker items if empty
$stmt = $pdo->query("SELECT COUNT(*) FROM ticker");
if ($stmt->fetchColumn() == 0) {
    $tickerItems = ["Strength Training", "HIIT Classes", "Yoga & Mindfulness", "Boxing", "Spinning", "Personal Training", "CrossFit", "Recovery Zone", "Olympic Lifting", "Calisthenics"];
    foreach ($tickerItems as $idx => $text) {
        $stmtInsert = $pdo->prepare("INSERT INTO ticker (item_text, sort_order, status) VALUES (?, ?, 'Active')");
        $stmtInsert->execute([$text, $idx]);
    }
    echo "Default ticker seeded.\n";
}

// Seed default programs if empty
$stmt = $pdo->query("SELECT COUNT(*) FROM programs");
if ($stmt->fetchColumn() == 0) {
    $programs = [
        ["01", "Zap", "High Intensity", "HIIT TRAINING", "Push your limits with explosive intervals designed to torch calories and build endurance fast.", 0],
        ["02", "Hammer", "Combat", "BOXING", "Full-body conditioning through technical boxing drills, bag work, and sparring fundamentals.", 1],
        ["03", "Dumbbell", "Powerlifting", "STRENGTH", "Progressive overload built around the big three — squat, bench, deadlift.", 0],
        ["04", "Flower", "Mind & Body", "YOGA", "Restore flexibility, calm the nervous system, and reconnect with breath and movement.", 0],
        ["05", "Bike", "Cardio", "SPINNING", "High-energy indoor cycling synced to music for maximum cardiovascular performance.", 0],
        ["06", "Flame", "Functional", "CROSSFIT", "Varied functional movements at high intensity — constantly forging elite fitness.", 0]
    ];
    foreach ($programs as $idx => $p) {
        $stmtInsert = $pdo->prepare("INSERT INTO programs (num, icon, tag, name, desc, featured, sort_order, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'Active')");
        $stmtInsert->execute([$p[0], $p[1], $p[2], $p[3], $p[4], $p[5], $idx]);
    }
    echo "Default programs seeded.\n";
}

// Seed default stats if empty
$stmt = $pdo->query("SELECT COUNT(*) FROM stats");
if ($stmt->fetchColumn() == 0) {
    $stats = [
        ["2,400", "+", "Active Members"],
        ["48", "+", "Weekly Classes"],
        ["12", "", "Elite Trainers"],
        ["98", "%", "Member Retention"]
    ];
    foreach ($stats as $idx => $s) {
        $stmtInsert = $pdo->prepare("INSERT INTO stats (num, suf, label, sort_order, status) VALUES (?, ?, ?, ?, 'Active')");
        $stmtInsert->execute([$s[0], $s[1], $s[2], $idx]);
    }
    echo "Default stats seeded.\n";
}

// Seed default trainers if empty
$stmt = $pdo->query("SELECT COUNT(*) FROM trainers");
if ($stmt->fetchColumn() == 0) {
    $trainers = [
        ["01", "Marcus Cole", "Strength & Power", "", "trainer-color-1"],
        ["02", "Priya Nair", "Yoga & Mobility", "", "trainer-color-2"],
        ["03", "Jake Torres", "HIIT & Combat", "", "trainer-color-3"],
        ["04", "Sofia Reyes", "Endurance & Spin", "", "trainer-color-4"]
    ];
    foreach ($trainers as $idx => $t) {
        $stmtInsert = $pdo->prepare("INSERT INTO trainers (num, name, role, image, color, sort_order, status) VALUES (?, ?, ?, ?, ?, ?, 'Active')");
        $stmtInsert->execute([$t[0], $t[1], $t[2], $t[3], $t[4], $idx]);
    }
    echo "Default trainers seeded.\n";
}

// Seed default pricing if empty
$stmt = $pdo->query("SELECT COUNT(*) FROM pricing");
if ($stmt->fetchColumn() == 0) {
    $pricing = [
        ["Starter", "49", 0, '[{"text":"Gym Floor Access","ok":true},{"text":"5 Classes / Month","ok":true},{"text":"Locker Room","ok":true},{"text":"Personal Training","ok":false},{"text":"Nutrition Coaching","ok":false}]'],
        ["Elite", "89", 1, '[{"text":"Unlimited Gym Access","ok":true},{"text":"Unlimited Classes","ok":true},{"text":"Premium Locker","ok":true},{"text":"2x PT Sessions / Month","ok":true},{"text":"Nutrition Coaching","ok":false}]'],
        ["Pro", "149", 0, '[{"text":"Unlimited Everything","ok":true},{"text":"Unlimited Classes","ok":true},{"text":"VIP Locker Suite","ok":true},{"text":"Unlimited PT Sessions","ok":true},{"text":"Full Nutrition Plan","ok":true}]']
    ];
    foreach ($pricing as $idx => $p) {
        $stmtInsert = $pdo->prepare("INSERT INTO pricing (plan, amount, popular, features_json, sort_order, status) VALUES (?, ?, ?, ?, ?, 'Active')");
        $stmtInsert->execute([$p[0], $p[1], $p[2], $p[3], $idx]);
    }
    echo "Default pricing seeded.\n";
}

// Seed default schedule if empty
$stmt = $pdo->query("SELECT COUNT(*) FROM schedule");
if ($stmt->fetchColumn() == 0) {
    $schedData = [
        // Mon
        ["Mon", "06:00", "Morning HIIT", "Jake Torres", "45 min", "HIIT", 80],
        ["Mon", "08:30", "Vinyasa Yoga", "Priya Nair", "60 min", "Yoga", 40],
        ["Mon", "12:00", "Power Lifting", "Marcus Cole", "60 min", "Strength", 90],
        ["Mon", "17:30", "Boxing Basics", "Jake Torres", "45 min", "Boxing", 60],
        ["Mon", "19:00", "Evening Spin", "Sofia Reyes", "45 min", "Cardio", 30],
        // Tue
        ["Tue", "06:30", "Sunrise Yoga", "Priya Nair", "60 min", "Yoga", 70],
        ["Tue", "09:00", "CrossFit WOD", "Marcus Cole", "60 min", "HIIT", 50],
        ["Tue", "12:30", "Core Strength", "Sofia Reyes", "45 min", "Strength", 85],
        ["Tue", "18:00", "Boxing Advanced", "Jake Torres", "60 min", "Boxing", 25],
        ["Tue", "19:30", "Recovery Flow", "Priya Nair", "45 min", "Yoga", 95],
        // Wed
        ["Wed", "06:00", "Tabata HIIT", "Jake Torres", "30 min", "HIIT", 65],
        ["Wed", "07:00", "Deadlift Day", "Marcus Cole", "60 min", "Strength", 75],
        ["Wed", "11:00", "Midday Spin", "Sofia Reyes", "45 min", "Cardio", 20],
        ["Wed", "17:00", "Flow Yoga", "Priya Nair", "60 min", "Yoga", 80],
        ["Wed", "19:00", "Circuit Training", "Marcus Cole", "45 min", "HIIT", 55]
    ];
    foreach ($schedData as $idx => $s) {
        $stmtInsert = $pdo->prepare("INSERT INTO schedule (day, time, name, trainer, duration, type, spots, sort_order, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Active')");
        $stmtInsert->execute([$s[0], $s[1], $s[2], $s[3], $s[4], $s[5], $s[6], $idx]);
    }
    echo "Default schedule seeded.\n";
}

// Seed default testimonials if empty
$stmt = $pdo->query("SELECT COUNT(*) FROM testimonials");
if ($stmt->fetchColumn() == 0) {
    $testimonials = [
        ["Six months in and I'm a completely different person. The programming, community, and coaching here is unlike anything I've experienced.", "Alex M.", "Member since 2024 · Lost 28 lbs", "", 5],
        ["Priya's yoga classes changed my relationship with recovery. I'm lifting heavier than ever and my mobility has transformed.", "Rachel K.", "Member since 2023 · Yoga Enthusiast", "", 5],
        ["The HIIT classes are brutally effective. Jake pushes you past mental limits while keeping everything safe. Worth every penny.", "Derek S.", "Member since 2024 · HIIT Regular", "", 5]
    ];
    foreach ($testimonials as $idx => $t) {
        $stmtInsert = $pdo->prepare("INSERT INTO testimonials (quote, name, detail, avatar, stars, sort_order, status) VALUES (?, ?, ?, ?, ?, ?, 'Active')");
        $stmtInsert->execute([$t[0], $t[1], $t[2], $t[3], $t[4], $idx]);
    }
    echo "Default testimonials seeded.\n";
}

echo "Database initialization complete.\n";
