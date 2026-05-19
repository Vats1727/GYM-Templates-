<?php

require_once __DIR__ . '/../config/database.php';

try {
    $dbPath = __DIR__ . '/../database/drp.sqlite';
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
        'treatments', 'case_studies', 'reviews', 'process_steps', 'bookings',
        'treatments_heading', 'case_studies_heading', 'reviews_heading', 'process_steps_heading'
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
        subtitle TEXT,
        desc TEXT,
        stat1_val TEXT,
        stat1_lbl TEXT,
        stat2_val TEXT,
        stat2_lbl TEXT,
        stat3_val TEXT,
        stat3_lbl TEXT,
        btn_text TEXT,
        btn2_text TEXT,
        badge1_title TEXT,
        badge1_value TEXT,
        badge2_title TEXT,
        badge2_value TEXT,
        image TEXT DEFAULT NULL,
        sort_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // 3b. About Section Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS about_section (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tag TEXT,
        title TEXT,
        desc1 TEXT,
        desc2 TEXT,
        image TEXT DEFAULT NULL,
        cards TEXT, -- JSON string array of objects
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // 4. Navbar Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS navbar (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        logo_text TEXT,
        logo_accent TEXT,
        cta_text TEXT,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // 5. Footer Table
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

    // 6. Treatments Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS treatments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        icon TEXT DEFAULT 'Leaf',
        title TEXT,
        desc TEXT,
        tags TEXT, -- JSON string array
        sort_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // 7. Case Studies Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS case_studies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        initials TEXT,
        name TEXT,
        age INTEGER,
        location TEXT,
        case_status TEXT,
        condition TEXT,
        desc TEXT,
        metrics TEXT, -- JSON string array of objects
        avatarGradient TEXT,
        sort_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // 8. Reviews Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        stars INTEGER DEFAULT 5,
        text TEXT,
        initials TEXT,
        name TEXT,
        role TEXT,
        avatarGradient TEXT,
        sort_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // 9. Process Steps Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS process_steps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        num INTEGER,
        title TEXT,
        desc TEXT,
        sort_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // 10. Bookings Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        phone TEXT,
        email TEXT,
        service TEXT,
        stylist TEXT,
        date TEXT,
        time TEXT,
        note TEXT,
        status TEXT DEFAULT 'Pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // 11. Headings Tables
    $headingTables = ['treatments_heading', 'case_studies_heading', 'reviews_heading', 'process_steps_heading'];
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

    // 1. Admin User
    $pass = password_hash('admin123', PASSWORD_DEFAULT);
    $pdo->exec("INSERT INTO users (name, email, password) VALUES ('Dr. Aisha Admin', 'admin@draisha.com', '$pass')");
    $pdo->exec("INSERT INTO users (name, email, password) VALUES ('Admin General', 'admin@gmail.com', '$pass')");
    $pdo->exec("INSERT INTO users (name, email, password) VALUES ('Jenil Vaghasiya', 'vaghasiyajenil29@gmail.com', '$pass')");
    echo "Admins seeded: admin@draisha.com / vaghasiyajenil29@gmail.com / password: admin123\n";

    // 2. Hero Section Seed
    $pdo->exec("INSERT INTO hero_section (tag, title_line1, title_line2, subtitle, desc, stat1_val, stat1_lbl, stat2_val, stat2_lbl, stat3_val, stat3_lbl, btn_text, btn2_text, badge1_title, badge1_value, badge2_title, badge2_value, image) VALUES (
        'Online Consultations Available',
        'Heal Naturally with',
        'Dr. Aisha Malik',
        'BHMS · Hijama Therapist · Holistic Wellness Specialist',
        'Bridging ancient healing wisdom with modern medicine. Offering personalized homoeopathic treatment and evidence-based Hijama therapy from the comfort of your home.',
        '12+',
        'Years Experience',
        '3k+',
        'Patients Treated',
        '95%',
        'Satisfaction Rate',
        '📅 Book Free Consultation',
        'View Case Studies',
        'Certified in',
        'Homoeopathy',
        'Next slot',
        'Today 4:00 PM',
        ''
    )");
    echo "Hero section seeded.\n";

    // 2b. About Section Seed
    $aboutCardsJson = json_encode([
        [
            "icon" => "GraduationCap",
            "title" => "BHMS — Bachelor of Homoeopathic Medicine & Surgery",
            "desc" => "National University of Medical Sciences, Rawalpindi — 2011"
        ],
        [
            "icon" => "Award",
            "title" => "Certified Hijama (Wet Cupping) Practitioner",
            "desc" => "International Hijama Institute — 2015"
        ],
        [
            "icon" => "Globe",
            "title" => "Treating Patients Globally Since 2019",
            "desc" => "Pakistan · UAE · UK · Canada · USA"
        ]
    ]);
    $pdo->exec("INSERT INTO about_section (tag, title, desc1, desc2, cards, image) VALUES (
        'About the Doctor',
        'Holistic Healing, \nPersonalised Care',
        'Dr. Aisha Malik is a board-certified Homoeopathic Physician with over 12 years of clinical experience. She specialises in chronic disease management, women''s health, and detoxification through evidence-based Hijama (cupping) therapy.',
        'Her patient-first approach blends classical homoeopathic case-taking with functional medicine insights, delivering lasting results for complex and long-standing conditions — all through secure video consultations.',
        '$aboutCardsJson',
        ''
    )");
    echo "About section seeded.\n";

    // 3. Navbar Seed
    $pdo->exec("INSERT INTO navbar (logo_text, logo_accent, cta_text) VALUES ('Dr. Aisha', 'Malik', 'Book Consult')");
    echo "Navbar seeded.\n";

    // 4. Footer Seed
    $pdo->exec("INSERT INTO footer (logo_text, logo_accent, description, email, whatsapp, address, hours) VALUES (
        'Dr. Aisha',
        'Malik',
        'Holistic healing through the wisdom of homoeopathy and Sunnah-based Hijama therapy. Serving patients globally via secure online consultations.',
        'dr.aisha@healnaturally.com',
        '+92 300 123 4567',
        'Online · Worldwide',
        '9 AM – 9 PM PKT'
    )");
    echo "Footer seeded.\n";

    // 5. Treatments Seeds
    $treatmentsData = [
        ['Leaf', 'Classical Homoeopathy', 'In-depth constitutional case analysis to select the most precise homoeopathic remedy for your mind-body type, targeting root causes rather than symptoms.', '["Chronic Illness", "Autoimmune", "Anxiety", "Allergies"]', 0],
        ['Droplet', 'Hijama Therapy (Wet Cupping)', 'Sunnah-based detoxification technique for blood purification, pain relief, and immune boosting. Remote guidance with certified local therapist coordination.', '["Migraines", "Back Pain", "Hypertension", "Fatigue"]', 1],
        ['Sparkles', "Women's Health & Hormones", 'Specialised protocols for PCOS, endometriosis, menstrual irregularities, menopause, and fertility support through natural homoeopathic treatment.', '["PCOS", "Menopause", "Fertility", "PMS"]', 2],
        ['Brain', 'Mental & Emotional Wellbeing', 'Homoeopathic and holistic support for anxiety, depression, stress-induced disorders, and sleep dysfunction — gentle, non-addictive, effective.', '["Anxiety", "Depression", "Insomnia", "Burnout"]', 3],
        ['Baby', 'Paediatric Homoeopathy', 'Safe, gentle treatment for children without side effects. Addressing recurrent infections, developmental concerns, skin issues, and digestive problems.', '["Recurrent Fever", "Eczema", "Tonsillitis", "Colic"]', 4],
        ['Activity', 'Chronic Disease Management', 'Long-term holistic management of diabetes, thyroid disorders, arthritis, IBS, and other chronic conditions alongside conventional medicine.', '["Diabetes Support", "Thyroid", "Arthritis", "IBS"]', 5]
    ];
    foreach ($treatmentsData as $t) {
        $stmt = $pdo->prepare("INSERT INTO treatments (icon, title, desc, tags, sort_order) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute($t);
    }
    echo "Treatments seeded.\n";

    // 6. Case Studies Seeds
    $casesData = [
        [
            'FM', 'Fatima M.', 32, 'Dubai, UAE', 'Recovered', 'PCOS + Hormonal Imbalance',
            "Patient presented with irregular cycles (2–3x/year), elevated androgens, and acne for 6 years. After 5 months of constitutional homoeopathy and dietary guidance, cycles normalised and androgens reduced to healthy range.",
            '[{"val":"5mo","label":"Duration"},{"val":"Regular","label":"Cycle Now"},{"val":"89%","label":"Improvement"}]',
            'linear-gradient(135deg, var(--accent), var(--gold))', 0
        ],
        [
            'AK', 'Asim K.', 47, 'London, UK', 'Managed', 'Chronic Migraines + Hypertension',
            '12-year history of weekly debilitating migraines (up to 3 days bedrest) and borderline hypertension. Combined Hijama protocol and homoeopathic treatment reduced frequency from 4/month to 1 mild episode in 3 months.',
            '[{"val":"3mo","label":"Duration"},{"val":"75%","label":"Less Freq."},{"val":"BP 120/80","label":"BP Now"}]',
            'linear-gradient(135deg, #5b8bd4, #a87dcf)', 1
        ],
        [
            'SN', 'Sara N.', 28, 'Karachi, Pakistan', 'Clear', 'Severe Eczema (Atopic Dermatitis)',
            'Full-body eczema since childhood, unresponsive to topical steroids. Deep constitutional analysis revealed suppressed grief pattern. After 8 months of treatment, skin 95% clear with no relapse in 18 months.',
            '[{"val":"8mo","label":"Duration"},{"val":"95%","label":"Skin Clear"},{"val":"18mo","label":"No Relapse"}]',
            'linear-gradient(135deg, #d47a5b, #d4b87a)', 2
        ],
        [
            'MR', 'Mohammed R.', 55, 'Toronto, Canada', 'Stabilised', 'Type 2 Diabetes Support',
            'Patient seeking natural adjunct support with medications. After 6 months of homoeopathy + Hijama detox protocol + dietary coaching, HbA1c dropped from 8.2% to 6.8% — within the pre-diabetic range.',
            '[{"val":"6mo","label":"Duration"},{"val":"6.8%","label":"HbA1c Now"},{"val":"-17%","label":"Drop"}]',
            'linear-gradient(135deg, #5ba47a, #7dd4a5)', 3
        ],
        [
            'ZH', 'Zainab H.', 24, 'Birmingham, UK', 'Recovered', 'Anxiety Disorder + Insomnia',
            'Generalised anxiety with panic attacks and chronic insomnia (2–3 hrs/night). Homoeopathic constitutional treatment over 4 months resulted in no panic attacks, 7–8 hrs sleep, and return to university.',
            '[{"val":"4mo","label":"Duration"},{"val":"0","label":"Panic Attacks"},{"val":"8hrs","label":"Sleep Now"}]',
            'linear-gradient(135deg, #a45bb8, #d47acf)', 4
        ],
        [
            'OA', 'Omar A.', 6, 'Lahore, Pakistan', 'Well', 'Recurrent Tonsillitis in Child',
            'Child had 7 episodes of tonsillitis in one year, parents facing advice for tonsillectomy. After homoeopathic treatment for 3 months, zero recurrences in 14 months. Surgery avoided.',
            '[{"val":"3mo","label":"Duration"},{"val":"0","label":"Recurrences"},{"val":"Avoided","label":"Surgery"}]',
            'linear-gradient(135deg, #5b8bd4, #5bb89e)', 5
        ]
    ];
    foreach ($casesData as $c) {
        $stmt = $pdo->prepare("INSERT INTO case_studies (initials, name, age, location, case_status, condition, desc, metrics, avatarGradient, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute($c);
    }
    echo "Case studies seeded.\n";

    // 7. Reviews Seeds
    $reviewsData = [
        [
            5, 'I suffered from PCOS for 6 years and had given up on ever having a regular cycle. Dr. Aisha listened to me for over an hour in the first consultation — something no other doctor had ever done. Within 5 months my body was completely transformed.',
            'FM', 'Fatima M.', 'Dubai · PCOS Patient', 'linear-gradient(135deg, var(--accent), var(--gold))', 0
        ],
        [
            5, 'My migraines were destroying my career. After 3 months of combined Hijama and homoeopathy, I went from 4 migraines a month to barely one — and a mild one at that. I genuinely feel like I have my life back.',
            'AK', 'Asim K.', 'London · Migraine Patient', 'linear-gradient(135deg, #5b8bd4, #a87dcf)', 1
        ],
        [
            5, "My son had surgery recommended for his tonsils at age 6. Dr. Aisha's treatment changed everything. It's been over a year — not a single episode. We are so grateful to have found her through online consultation.",
            'UB', 'Umm Bilal', 'Lahore · Parent', 'linear-gradient(135deg, #5bb89e, #7dd4a5)', 2
        ],
        [
            5, "I was sceptical about online consultations but Dr. Aisha's thorough case-taking and follow-up system is better than most in-person clinics I've visited. My eczema is 95% clear after 8 months. Remarkable.",
            'SN', 'Sara N.', 'Karachi · Eczema Patient', 'linear-gradient(135deg, #d47a5b, #d4b87a)', 3
        ],
        [
            5, 'My HbA1c has come down significantly and my energy levels have improved massively. The combination of Hijama and homoeopathy, along with her dietary advice, has changed my relationship with my health completely.',
            'MR', 'Mohammed R.', 'Toronto · Diabetes Management', 'linear-gradient(135deg, #5ba47a, #a4d45b)', 4
        ],
        [
            4, "The anxiety I had was crippling. Dr. Aisha took time to understand my emotional state, not just my physical symptoms. I haven't had a panic attack in months. I sleep well. I feel human again. Thank you, doctor.",
            'ZH', 'Zainab H.', 'Birmingham · Anxiety Patient', 'linear-gradient(135deg, #a45bb8, #d47acf)', 5
        ]
    ];
    foreach ($reviewsData as $r) {
        $stmt = $pdo->prepare("INSERT INTO reviews (stars, text, initials, name, role, avatarGradient, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute($r);
    }
    echo "Reviews seeded.\n";

    // 8. Process Steps Seeds
    $processData = [
        [1, 'Book Your Slot', 'Choose a convenient time via the booking form. First consultations are free of charge.', 0],
        [2, 'Detailed Case-Taking', 'Video call where Dr. Aisha explores your full health history, lifestyle, and emotional patterns.', 1],
        [3, 'Personalised Treatment', 'Receive your customised remedy plan with dosing, lifestyle, and dietary recommendations.', 2],
        [4, 'Ongoing Follow-Up', 'Regular check-ins via WhatsApp/video call to track progress and adjust treatment as needed.', 3]
    ];
    foreach ($processData as $p) {
        $stmt = $pdo->prepare("INSERT INTO process_steps (num, title, desc, sort_order) VALUES (?, ?, ?, ?)");
        $stmt->execute($p);
    }
    echo "Process steps seeded.\n";

    // 9. Global Headings Seeds
    $headingsSeeds = [
        'treatments_heading'  => ['What I Offer', 'Specialised Treatments', 'Holistic, root-cause focused therapies delivered safely and effectively through online consultations.'],
        'case_studies_heading'=> ['Real Results', 'Documented Case Studies', 'Anonymised patient cases with measurable outcomes — because results matter more than promises.'],
        'reviews_heading'     => ['Patient Voices', 'What Patients Say', 'Real words from real people whose lives have changed through natural healing.'],
        'process_steps_heading'=> ['How It Works', 'Your Healing Journey in 4 Steps', 'From first contact to lasting results — a simple, guided process.']
    ];
    foreach ($headingsSeeds as $tbl => $data) {
        $stmtHead = $pdo->prepare("INSERT INTO \"$tbl\" (tag, title, desc) VALUES (?, ?, ?)");
        $stmtHead->execute($data);
    }
    echo "Global Headings seeded successfully.\n";

    // 10. Sample Bookings Seed
    $pdo->exec("INSERT INTO bookings (name, phone, email, service, stylist, date, time, note, status) VALUES (
        'Aarav Mehta',
        '+91 98765 43210',
        'aarav.mehta@gmail.com',
        'Classical Homoeopathy',
        'Online Video Call',
        '2026-05-20',
        '10:30 AM',
        'Chronic sinus allergies since 3 years. Looking for constitutional remedy.',
        'Pending'
    )");
    echo "Bookings seeded.\n";

    echo "SUCCESS: Database successfully fully initialized and seeded with Dr. Aisha Malik data!\n";
} catch (PDOException $e) {
    die('Database initialization failed: ' . $e->getMessage() . "\n");
}
