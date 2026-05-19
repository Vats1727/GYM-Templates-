<?php

require_once __DIR__ . '/../config/database.php';

try {
    $dbPath = __DIR__ . '/../database/gym_v2.sqlite';
    $pdo = new PDO('sqlite:' . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->exec("PRAGMA busy_timeout = 5000;");

    // Drop all existing tables to perform a pristine Saloon reset
    $tablesToDrop = ['users', 'hero_section', 'ticker', 'navbar', 'footer', 'cta_section', 'services', 'work', 'team', 'rewards', 'products', 'reviews', 'faq', 'bookings'];
    foreach ($tablesToDrop as $tbl) {
        $pdo->exec("DROP TABLE IF EXISTS $tbl");
    }

    echo "Cleared old tables.\n";

    // 1. Users Table (Admin authentication)
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

    // 2. Hero Section Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS hero_section (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tag TEXT,
        title_line1 TEXT,
        title_line2 TEXT,
        title_line3 TEXT,
        btn_text TEXT,
        btn_link TEXT DEFAULT 'book',
        btn2_text TEXT DEFAULT 'See Transformations',
        btn2_link TEXT DEFAULT 'work',
        subtitle TEXT,
        stat1_val TEXT,
        stat1_lbl TEXT,
        stat2_val TEXT,
        stat2_lbl TEXT,
        stat3_val TEXT,
        stat3_lbl TEXT,
        image TEXT,
        rating_stars INTEGER DEFAULT 5,
        featured_in TEXT,
        award_title TEXT,
        award_subtitle TEXT,
        quick_book_title TEXT,
        quick_book_subtitle TEXT,
        quick_book_btn_text TEXT,
        sort_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // 3. Ticker Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS ticker (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT,
        body TEXT,
        icon TEXT DEFAULT 'Trophy',
        sort_order INTEGER DEFAULT 0,
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
        socials_json TEXT,
        fb_link TEXT DEFAULT '#',
        tw_link TEXT DEFAULT '#',
        ig_link TEXT DEFAULT '#',
        yt_link TEXT DEFAULT '#',
        address_line1 TEXT DEFAULT '123 Law Garden Road',
        address_line2 TEXT DEFAULT 'Ahmedabad, Gujarat 380009',
        hours_line1 TEXT DEFAULT 'Mon–Sat: 10am – 8pm',
        hours_line2 TEXT DEFAULT 'Sunday: 11am – 6pm',
        phone_number TEXT DEFAULT '+91 79 555 0199',
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // 6. CTA Section Table
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

    // 7. Services Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT,
        icon TEXT DEFAULT '✨',
        image TEXT,
        name TEXT,
        price TEXT,
        duration TEXT,
        desc TEXT,
        popular INTEGER DEFAULT 0,
        features TEXT,
        sort_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // 8. Work/Portfolio Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS work (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        desc TEXT,
        type TEXT,
        before_image TEXT DEFAULT '',
        after_image TEXT DEFAULT '',
        beforeBg TEXT DEFAULT '#2A2020',
        afterBg TEXT DEFAULT '#2A2020',
        emoji TEXT DEFAULT '💇‍♀️',
        beforeDesc TEXT DEFAULT 'Faded color & split ends',
        afterDesc TEXT DEFAULT 'Vibrant honey balayage & cut',
        tag TEXT DEFAULT 'Signature Balayage',
        artist TEXT DEFAULT 'Aisha Sharma',
        time TEXT DEFAULT '3.5 hrs',
        sort_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // 9. Team Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS team (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        role TEXT,
        specialty TEXT,
        experience TEXT,
        image TEXT DEFAULT '',
        slots TEXT,
        sort_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // 10. Rewards Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS rewards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        benefit TEXT,
        icon TEXT DEFAULT 'Gift',
        sort_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // 11. Products Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        category TEXT,
        desc TEXT,
        price TEXT,
        image TEXT DEFAULT '',
        sort_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // 12. Reviews Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        service TEXT,
        comment TEXT,
        rating INTEGER DEFAULT 5,
        date TEXT,
        sort_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // 13. FAQ Table
    $pdo->exec("CREATE TABLE IF NOT EXISTS faq (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT,
        answer TEXT,
        sort_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // 14. Bookings Table
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

    // 15. Global Heading Tables
    $headingTables = ['services_heading', 'work_heading', 'team_heading', 'rewards_heading', 'products_heading', 'reviews_heading', 'faq_heading'];
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
    $pdo->exec("INSERT INTO users (email, password) VALUES ('admin@velour.com', '$pass')");
    $pdo->exec("INSERT INTO users (email, password) VALUES ('admin@saloon.com', '$pass')");
    $pdo->exec("INSERT INTO users (email, password) VALUES ('admin@gym.com', '$pass')");
    echo "Admins seeded: admin@velour.com, admin@saloon.com, admin@gym.com / password: admin123\n";

    // 2. Hero Section
    $pdo->exec("INSERT INTO hero_section (tag, title_line1, title_line2, title_line3, btn_text, btn_link, btn2_text, btn2_link, subtitle, stat1_val, stat1_lbl, stat2_val, stat2_lbl, stat3_val, stat3_lbl, image, rating_stars, featured_in, award_title, award_subtitle, quick_book_title, quick_book_subtitle, quick_book_btn_text) VALUES (
        'Ahmedabad''s Premier Studio',
        'Beauty is',
        'a practice,',
        'not an event.',
        'Reserve Your Visit →',
        'book',
        'See Transformations',
        'work',
        'Where master barbers and certified beauticians craft transformations that last. Six specialists. One shared obsession with craft.',
        '3,500+',
        'Happy Clients',
        '9 yrs',
        'In Business',
        '4.97★',
        'Avg Rating',
        '',
        5,
        'Featured in Vogue India & Harper''s Bazaar',
        'Best Salon 2024',
        'Ahmedabad Times · 4th consecutive year',
        'Available today',
        '3 openings remaining',
        'Quick Book'
    )");
    echo "Hero section seeded.\n";

    // 3. Ticker items
    $tickerItems = [
        ["Best Salon", "Ahmedabad Times · 2024", "Trophy"],
        ["Top Stylist Award", "Vogue India · 2023", "Award"],
        ["Luxury Salon of Year", "Harper's Bazaar · 2022", "Sparkles"],
        ["Best Color Artist", "Elle India · 2021", "Heart"]
    ];
    foreach ($tickerItems as $idx => $item) {
        $stmtInsert = $pdo->prepare("INSERT INTO ticker (text, body, icon, sort_order) VALUES (?, ?, ?, ?)");
        $stmtInsert->execute([$item[0], $item[1], $item[2], $idx]);
    }
    echo "Ticker items seeded.\n";

    // 4. Navbar
    $pdo->exec("INSERT INTO navbar (logo_text, logo_accent, cta_text) VALUES ('Velour', '.', 'Book Now')");
    echo "Navbar seeded.\n";

    // 5. Footer
    $pdo->exec("INSERT INTO footer (logo_text, logo_accent, description, socials_json, fb_link, tw_link, ig_link, yt_link, address_line1, address_line2, hours_line1, hours_line2, phone_number) VALUES (
        'Velour',
        '.',
        'Ahmedabad''s award-winning beauty studio. Where craft meets care.',
        '[]',
        'https://facebook.com/',
        'https://twitter.com/',
        'https://instagram.com/',
        'https://youtube.com/',
        '123 Law Garden Road',
        'Ahmedabad, Gujarat 380009',
        'Mon–Sat: 10am – 8pm',
        'Sunday: 11am – 6pm',
        '+91 79 555 0199'
    )");
    echo "Footer seeded.\n";

    // 6. CTA Section
    $pdo->exec("INSERT INTO cta_section (tag, title_line1, title_line2, title_line3, subtitle, btn1_text, btn2_text) VALUES (
        'Exclusive Perks',
        'JOIN OUR',
        'LOYALTY',
        'PROGRAM',
        'Earn points on every visit, access birthday bonuses, and receive members-only rewards.',
        'Book First Visit',
        'Learn Rewards'
    )");
    echo "CTA section seeded.\n";

    // 7. Services
    $pdo->exec("INSERT INTO services (category, icon, image, name, price, duration, desc, popular, features) VALUES ('Cuts & Styling', '✂️', NULL, 'Signature Cut', '₹1,500', '60 min', 'Shampoo, precision cut, blow-dry', 1, '[\"Precision styling\",\"Scalp conditioning finish\"]')");
    $pdo->exec("INSERT INTO services (category, icon, image, name, price, duration, desc, popular, features) VALUES ('Cuts & Styling', '✂️', NULL, 'Men''s Classic Cut', '₹900', '45 min', 'Clipper or scissor cut + finish', 0, '[\"Warm towel service\",\"Edge outline trim\"]')");
    $pdo->exec("INSERT INTO services (category, icon, image, name, price, duration, desc, popular, features) VALUES ('Cuts & Styling', '✂️', NULL, 'Kids Cut (under 12)', '₹600', '30 min', 'Gentle shampoo, trim & style', 0, '[\"Gentle wash\",\"Fun styling finish\"]')");
    $pdo->exec("INSERT INTO services (category, icon, image, name, price, duration, desc, popular, features) VALUES ('Color & Texture', '🎨', NULL, 'Full Balayage', '₹6,500+', '180 min', 'Hand-painted, consultation incl.', 1, '[\"Premium L''Oreal gloss\",\"Post-color conditioning\"]')");
    $pdo->exec("INSERT INTO services (category, icon, image, name, price, duration, desc, popular, features) VALUES ('Color & Texture', '🎨', NULL, 'Root Touch-Up', '₹2,800+', '75 min', 'Single process color', 0, '[\"100% grey coverage\",\"Luster finish\"]')");
    $pdo->exec("INSERT INTO services (category, icon, image, name, price, duration, desc, popular, features) VALUES ('Color & Texture', '🎨', NULL, 'Keratin Treatment', '₹8,000+', '150 min', 'Smoothing, 3–5 month results', 1, '[\"Formaldehyde-free\",\"Ultra gloss texture\"]')");
    $pdo->exec("INSERT INTO services (category, icon, image, name, price, duration, desc, popular, features) VALUES ('Grooming', '🪒', NULL, 'Hot Towel Shave', '₹1,200', '45 min', 'Traditional straight razor ritual', 0, '[\"Pre-shave essential oils\",\"Dual hot towel fold\"]')");
    $pdo->exec("INSERT INTO services (category, icon, image, name, price, duration, desc, popular, features) VALUES ('Grooming', '🪒', NULL, 'Beard Sculpt', '₹800', '30 min', 'Shape, define, condition', 0, '[\"Precision edging\",\"Beard oil finish\"]')");
    $pdo->exec("INSERT INTO services (category, icon, image, name, price, duration, desc, popular, features) VALUES ('Grooming', '🪒', NULL, 'Scalp Treatment', '₹1,500', '45 min', 'Therapeutic massage + serum', 0, '[\"Deep clarifying shampoo\",\"Invigorating head massage\"]')");
    $pdo->exec("INSERT INTO services (category, icon, image, name, price, duration, desc, popular, features) VALUES ('Skin & Beauty', '✨', NULL, 'Signature Facial', '₹3,200', '75 min', 'Cleanse, exfoliate, mask, serum', 1, '[\"Skin health report\",\"Exfoliating peel\",\"Botanical extract mask\"]')");
    $pdo->exec("INSERT INTO services (category, icon, image, name, price, duration, desc, popular, features) VALUES ('Skin & Beauty', '✨', NULL, 'Brow Architecture', '₹1,200', '30 min', 'Design, thread, tint', 0, '[\"Custom facial mapping\",\"Premium organic tint\"]')");
    $pdo->exec("INSERT INTO services (category, icon, image, name, price, duration, desc, popular, features) VALUES ('Skin & Beauty', '✨', NULL, 'Lash Extensions', '₹4,500+', '120 min', 'Classic, hybrid or volume', 0, '[\"Ultra-lightweight mink\",\"Custom length match\"]')");
    echo "Services seeded.\n";

    // 8. Work/Portfolio
    $pdo->exec("INSERT INTO work (title, desc, type, beforeBg, afterBg, emoji, beforeDesc, afterDesc, tag, artist, time) VALUES ('Caramel Balayage', 'Hand-painted caramel tones.', 'Color', '#3D2E1E', '#B8814A', '🎨', 'Flat dark brown, no dimension', 'Sun-kissed caramel balayage', 'Balayage', 'Aisha O.', '4 hrs')");
    $pdo->exec("INSERT INTO work (title, desc, type, beforeBg, afterBg, emoji, beforeDesc, afterDesc, tag, artist, time) VALUES ('High Skin Fade', 'Sharp high skin fade.', 'Cut', '#2A2A2A', '#1A1A1A', '✂️', 'Overgrown, uneven sides', 'Sharp high skin fade with taper', 'Skin Fade', 'Marcus R.', '45 min')");
    $pdo->exec("INSERT INTO work (title, desc, type, beforeBg, afterBg, emoji, beforeDesc, afterDesc, tag, artist, time) VALUES ('Rose Color Melt', 'Seamless color transition melt.', 'Color', '#C8A882', '#F5CDD0', '🌸', 'Bleached, brassy roots', 'Seamless rose-to-blonde melt', 'Color Melt', 'Sofia M.', '3.5 hrs')");
    $pdo->exec("INSERT INTO work (title, desc, type, beforeBg, afterBg, emoji, beforeDesc, afterDesc, tag, artist, time) VALUES ('Angular Sculpt', 'Sculpted angular full beard.', 'Grooming', '#4A3728', '#2C1E14', '✂️', 'Wild, unkempt full beard', 'Sculpted sharp angular beard', 'Beard Sculpt', 'Eli N.', '40 min')");
    $pdo->exec("INSERT INTO work (title, desc, type, beforeBg, afterBg, emoji, beforeDesc, afterDesc, tag, artist, time) VALUES ('Lifted Arch brows', 'Defined lifted eyebrow arches.', 'Beauty', '#E8D5C4', '#F5EBE0', '✨', 'Over-placed, sparse arches', 'Defined lifted arch brows', 'Brow Design', 'Priya S.', '30 min')");
    $pdo->exec("INSERT INTO work (title, desc, type, beforeBg, afterBg, emoji, beforeDesc, afterDesc, tag, artist, time) VALUES ('Defined Textured Fringe', 'Textured curly top fringe.', 'Cut', '#1A1208', '#0D0A05', '🔥', 'Shapeless overgrown curls', 'Defined textured fringe', 'Textured Cut', 'James T.', '1 hr')");
    echo "Work/Portfolio seeded.\n";

    // 9. Team
    $pdo->exec("INSERT INTO team (name, role, specialty, experience, slots) VALUES ('Marcus Rivera', 'Master Barber', 'Fades & Line-ups', '12 yrs', '10:00,12:00,14:00,16:00')");
    $pdo->exec("INSERT INTO team (name, role, specialty, experience, slots) VALUES ('Aisha Okonkwo', 'Color Director', 'Balayage & Color', '9 yrs', '11:00,13:00,15:00')");
    $pdo->exec("INSERT INTO team (name, role, specialty, experience, slots) VALUES ('James Tan', 'Expert Barber', 'Textured Hair', '7 yrs', '10:00,11:00,13:00,17:00')");
    $pdo->exec("INSERT INTO team (name, role, specialty, experience, slots) VALUES ('Sofia Marchetti', 'Color Specialist', 'Highlights & Toning', '11 yrs', '09:00,12:00,15:00')");
    $pdo->exec("INSERT INTO team (name, role, specialty, experience, slots) VALUES ('Eli Nakamura', 'Grooming Artist', 'Hot Shaves & Scalp', '5 yrs', '10:00,12:00,14:00,16:00,18:00')");
    $pdo->exec("INSERT INTO team (name, role, specialty, experience, slots) VALUES ('Priya Sharma', 'Skin & Beauty', 'Facials & Brows', '8 yrs', '10:00,13:00,15:00')");
    echo "Team seeded.\n";

    // 10. Rewards
    $pdo->exec("INSERT INTO rewards (title, benefit, icon) VALUES ('Earn on every visit', '1 point per ₹100 spent on services', 'Leaf')");
    $pdo->exec("INSERT INTO rewards (title, benefit, icon) VALUES ('Referral rewards', '500 pts for every new client you bring', 'Users')");
    $pdo->exec("INSERT INTO rewards (title, benefit, icon) VALUES ('Birthday bonus', 'Double points + free add-on in your birthday month', 'Gift')");
    $pdo->exec("INSERT INTO rewards (title, benefit, icon) VALUES ('Social rewards', '100 pts for tagging us in your transformation', 'Smartphone')");
    echo "Rewards seeded.\n";

    // 11. Products
    $pdo->exec("INSERT INTO products (name, category, desc, price) VALUES ('Hydra Repair Mask', 'Hair Care', 'Deep conditioning for color-treated hair', '₹1,200')");
    $pdo->exec("INSERT INTO products (name, category, desc, price) VALUES ('Scalp Balance Serum', 'Scalp', 'Botanical scalp treatment, anti-flake', '₹1,800')");
    $pdo->exec("INSERT INTO products (name, category, desc, price) VALUES ('Glow Facial Oil', 'Skin Care', 'Rosehip + vitamin C brightening oil', '₹2,400')");
    $pdo->exec("INSERT INTO products (name, category, desc, price) VALUES ('Beard Conditioning Balm', 'Grooming', 'Softens and shapes coarse beard hair', '₹900')");
    echo "Products seeded.\n";

    // 12. Reviews
    $pdo->exec("INSERT INTO reviews (name, service, comment, rating, date) VALUES ('Divya P.', 'Balayage', 'Aisha''s color work is genuinely transformative. I''ve been going to salons for 15 years and this is the first time I''ve left speechless.', 5, 'May 2025')");
    $pdo->exec("INSERT INTO reviews (name, service, comment, rating, date) VALUES ('Rohan M.', 'Skin Fade', 'Marcus is an artist. The fade was so clean I couldn''t stop looking in the mirror. Booked again before I even walked out.', 5, 'Apr 2025')");
    $pdo->exec("INSERT INTO reviews (name, service, comment, rating, date) VALUES ('Shreya K.', 'Brow Design', 'Priya completely redesigned my brows after years of over-plucking. The difference to my face structure is dramatic.', 5, 'Apr 2025')");
    $pdo->exec("INSERT INTO reviews (name, service, comment, rating, date) VALUES ('Arjun S.', 'Hot Shave', 'Eli''s hot towel shave was meditative. The ritual, the warm towels, the straight razor — it''s not a haircut, it''s an experience.', 5, 'Mar 2025')");
    echo "Reviews seeded.\n";

    // 13. FAQs
    $pdo->exec("INSERT INTO faq (question, answer) VALUES ('How do I book an appointment?', 'Use our online booking tool on this page — choose service, artist, and a time. You can also call us or DM on Instagram.')");
    $pdo->exec("INSERT INTO faq (question, answer) VALUES ('What should I do before a color appointment?', 'Arrive with clean, dry hair. Avoid heavy conditioners 48 hours prior. Consultation is included at no extra charge.')");
    $pdo->exec("INSERT INTO faq (question, answer) VALUES ('Do you have parking available?', 'Yes — dedicated client parking behind our building on Law Garden Road, plus free street parking after 6pm.')");
    $pdo->exec("INSERT INTO faq (question, answer) VALUES ('What is your cancellation policy?', 'We request 24-hour notice for cancellations. Late cancellations (under 4 hours) may incur a 50% service fee.')");
    $pdo->exec("INSERT INTO faq (question, answer) VALUES ('Do you offer bridal packages?', 'Absolutely — full bridal packages with trial, day-of styling, and on-location services. Contact us for a custom quote.')");
    echo "FAQs seeded.\n";

    // 14. Bookings
    $pdo->exec("INSERT INTO bookings (name, phone, email, service, stylist, date, time, note, status) VALUES ('Rajesh Patel', '+91 98250 12345', 'rajesh@gmail.com', 'Signature Cut', 'Marcus R.', '2026-05-20', '11:00 AM', 'Looking for a clean skin fade on sides.', 'Pending')");
    $pdo->exec("INSERT INTO bookings (name, phone, email, service, stylist, date, time, note, status) VALUES ('Priya Sharma', '+91 97129 87654', 'priya.sharma@yahoo.com', 'Full Balayage', 'Aisha O.', '2026-05-21', '02:30 PM', 'Wants soft caramel highlights.', 'Confirmed')");
    $pdo->exec("INSERT INTO bookings (name, phone, email, service, stylist, date, time, note, status) VALUES ('Amit Shah', '+91 99099 55443', 'amit@shah.co', 'Hot Towel Shave', 'Eli N.', '2026-05-18', '10:00 AM', 'Classic razor shave, extra hot towels.', 'Completed')");
    $pdo->exec("INSERT INTO bookings (name, phone, email, service, stylist, date, time, note, status) VALUES ('Kunal Patel ➔ Anjali Patel', 'GIFT CARD', 'kunal@patel.com', 'Gift Card (₹2,500)', 'Digital Delivery', '2026-05-19', 'Instant', 'Voucher: VAL-GIFT-K9F2A6 | Theme: Sage Green | Happy Birthday, Sis! Enjoy your salon treatment!', 'Confirmed')");
    echo "Bookings seeded.\n";

    // 15. Global Headings Seeds
    $headingsSeeds = [
        'services_heading' => ['What We Offer', 'Our Services', 'Expert services tailored to your unique look. All services include consultation and aftercare advice.'],
        'work_heading'     => ['Portfolio', 'Famous Transformations', 'Drag the slider on each card to reveal the before & after. Real clients. Real results.'],
        'team_heading'     => ['The Artists', 'Meet Your Stylists', 'Six specialists. One shared obsession with craft.'],
        'rewards_heading'  => ['Member Benefits', 'Velour Loyalty Programme', 'Earn points on every visit, referral, and product purchase. Redeem for free services, upgrades, and exclusive experiences.'],
        'products_heading' => ['In-Studio Shop', 'Professional Products', 'Premium formulas selected by our colorists and stylists to keep your hair and skin perfect at home.'],
        'reviews_heading'  => ['Client Stories', 'What Clients Say', 'Real reviews from real guests. Read about the Velour experience.'],
        'faq_heading'      => ['Common Questions', 'FAQs', 'Answers to some of the most common questions about our services, booking, and policy.']
    ];

    foreach ($headingsSeeds as $tbl => $data) {
        $stmtHead = $pdo->prepare("INSERT INTO \"$tbl\" (tag, title, desc) VALUES (?, ?, ?)");
        $stmtHead->execute($data);
    }
    echo "Global Headings seeded successfully.\n";

    echo "SUCCESS: Database successfully fully initialized and seeded with premium Saloon Velour data!\n";
} catch (PDOException $e) {
    die('Database initialization failed: ' . $e->getMessage() . "\n");
}
