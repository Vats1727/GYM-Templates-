export const SPECIALTIES = [
  {
    num: "01",
    icon: "Dumbbell",
    title: "Strength & Hypertrophy",
    desc: "Progressive overload programming using powerlifting, bodybuilding, and hybrid methodologies. Build real, functional muscle that performs as good as it looks.",
    tags: ["Powerlifting", "Bodybuilding", "Periodisation"]
  },
  {
    num: "02",
    icon: "Flame",
    title: "Fat Loss & Recomposition",
    desc: "Science-based body recomposition protocols: strategic calorie management, metabolic conditioning, and body composition tracking — no crash diets.",
    tags: ["Recomp", "DEXA Tracking", "Nutrition"]
  },
  {
    num: "03",
    icon: "Zap",
    title: "Athletic Performance",
    desc: "Speed, power, agility, and sport-specific conditioning. Trusted by competitive athletes in football, MMA, basketball, and track & field.",
    tags: ["Speed", "Power", "Agility"]
  },
  {
    num: "04",
    icon: "Utensils",
    title: "Nutrition Coaching",
    desc: "Macro programming, meal timing, and sustainable dietary habits. No rigid meal plans — flexible dieting frameworks that fit your lifestyle.",
    tags: ["Macros", "Flexible Dieting", "Habits"]
  },
  {
    num: "05",
    icon: "Activity",
    title: "Mobility & Injury Prevention",
    desc: "FMS-based movement screening and corrective exercise protocols. Move better, train harder, and stay injury-free long-term.",
    tags: ["FMS", "Corrective", "Flexibility"]
  },
  {
    num: "06",
    icon: "Laptop",
    title: "Online Coaching",
    desc: "Full-service remote coaching via a dedicated app — custom programs, weekly check-ins, video form reviews, and 24/7 messaging support.",
    tags: ["App-Based", "Video Reviews", "24/7 Support"]
  }
];

export const TRANSFORMATIONS = [
  {
    name: "James K.",
    detail: "32 · Sales Director · 6-Month Program",
    metrics: [
      { val: "-22kg", label: "Weight Lost" },
      { val: "+14%", label: "Muscle" },
      { val: "6mo", label: "Timeline" }
    ],
    beforeType: "male_skinny_fat",
    afterType: "male_muscular"
  },
  {
    name: "Rania M.",
    detail: "28 · Nurse · 4-Month Program",
    metrics: [
      { val: "-15kg", label: "Weight Lost" },
      { val: "-12%", label: "Body Fat" },
      { val: "4mo", label: "Timeline" }
    ],
    beforeType: "female_before",
    afterType: "female_after"
  },
  {
    name: "Yusuf A.",
    detail: "24 · Student Athlete · 5-Month Program",
    metrics: [
      { val: "+18kg", label: "Muscle" },
      { val: "180kg", label: "Deadlift" },
      { val: "5mo", label: "Timeline" }
    ],
    beforeType: "male_athletic_before",
    afterType: "male_athletic_after"
  }
];

export const PRICING_PLANS = [
  {
    name: "Starter",
    price: "149",
    billing: "/mo",
    desc: "For beginners and those getting back into fitness. Build your foundation right.",
    features: [
      { text: "Custom training program", ok: true },
      { text: "Nutrition macro targets", ok: true },
      { text: "Weekly check-in (text)", ok: true },
      { text: "Exercise video library", ok: true },
      { text: "App-based tracking", ok: true },
      { text: "Video form reviews", ok: false },
      { text: "1:1 monthly calls", ok: false }
    ],
    featured: false,
    btnText: "Get Started"
  },
  {
    name: "Elite Coaching",
    price: "299",
    billing: "/mo",
    desc: "Full-service online coaching for serious results. This is the flagship experience.",
    features: [
      { text: "Custom periodised program", ok: true },
      { text: "Full nutrition coaching", ok: true },
      { text: "Weekly check-in (video call)", ok: true },
      { text: "Unlimited form video reviews", ok: true },
      { text: "Daily WhatsApp access", ok: true },
      { text: "Monthly 1:1 strategy call", ok: true },
      { text: "Supplement guidance", ok: true }
    ],
    featured: true,
    btnText: "Start Elite"
  },
  {
    name: "VIP In-Person",
    price: "799",
    billing: "/mo",
    desc: "12 in-person sessions per month in Dubai, plus all Elite Online features.",
    features: [
      { text: "12 x PT sessions/month", ok: true },
      { text: "Custom periodised program", ok: true },
      { text: "Full nutrition coaching", ok: true },
      { text: "Body composition scans", ok: true },
      { text: "Unlimited messaging", ok: true },
      { text: "Monthly 1:1 calls", ok: true },
      { text: "Recovery & mobility plan", ok: true }
    ],
    featured: false,
    btnText: "Apply for VIP"
  }
];

export const TESTIMONIALS = [
  {
    avatar: "JK",
    stars: 5,
    text: "I'd tried 3 other trainers before Marcus. This was different from week one. The program was actually tailored to me — my schedule, my gym, my food preferences. Lost 22kg and kept every kilo off for over a year now.",
    authorName: "James K.",
    authorMeta: "Sales Director · Dubai · 6 months",
    result: "Lost 22kg · Dropped from 24% to 11% body fat",
    featured: true,
    avatarColors: ["#e8ff00", "#aabb00"]
  },
  {
    avatar: "RM",
    stars: 5,
    text: "As a nurse working rotating shifts, I told Marcus I could never stick to a plan. He built something that actually worked around my life. 4 months later, I'm the smallest and strongest I've ever been. I genuinely love training now.",
    authorName: "Rania M.",
    authorMeta: "Registered Nurse · Online Client · 4 months",
    result: "Lost 15kg · Now deadlifts 100kg",
    featured: false,
    avatarColors: ["#ff6b35", "#f7c59f"]
  },
  {
    avatar: "YA",
    stars: 5,
    text: "I went from benching 60kg to 120kg in 5 months. The programming is periodised in a way no generic gym plan even comes close to. Marcus explains the why behind everything, which made me way more committed to the process.",
    authorName: "Yusuf A.",
    authorMeta: "Student Athlete · Dubai · 5 months",
    result: "Bench 60→120kg · Deadlift 180kg",
    featured: false,
    avatarColors: ["#00d2ff", "#3a47d5"]
  },
  {
    avatar: "LP",
    stars: 5,
    text: "After having two kids, I honestly didn't think I could get my body back. Marcus never once made me feel like that was unrealistic. 7 months later, I'm in the best shape of my life. The nutrition coaching alone was worth every penny.",
    authorName: "Layla P.",
    authorMeta: "Mother of 2 · UK · Online · 7 months",
    result: "-18kg · Completed first 5K race",
    featured: false,
    avatarColors: ["#f953c6", "#b91d73"]
  },
  {
    avatar: "OB",
    stars: 5,
    text: "Marcus trained me for my first powerlifting competition. The programming was meticulous — peaked me perfectly on the day. Hit 3 personal bests and won my weight class. I owe that result entirely to him.",
    authorName: "Omar B.",
    authorMeta: "Powerlifter · UAE · 8 months",
    result: "3 x PBs · 1st place at nationals (U83)",
    featured: false,
    avatarColors: ["#43e97b", "#38f9d7"]
  },
  {
    avatar: "SH",
    stars: 5,
    text: "I'm a CEO and I have almost no time. The online coaching format Marcus uses is the most efficient and effective I've found. Thirty-minute sessions, zero fluff, and results that showed up in 3 months. Actually sustainable too.",
    authorName: "Sam H.",
    authorMeta: "CEO · London · Online · 3 months",
    result: "-10kg · Runs 5km before every board meeting",
    featured: false,
    avatarColors: ["#f7971e", "#ffd200"]
  }
];

export const PROCESS_STEPS = [
  {
    num: "01",
    icon: "ClipboardList",
    title: "Apply Online",
    desc: "Fill out a short intake form covering your goals, training history, schedule, and lifestyle. Takes 5 minutes."
  },
  {
    num: "02",
    icon: "Video",
    title: "Strategy Call",
    desc: "Free 20-minute video call to discuss your goals, ask questions, and see if we're a great fit. No pressure, no pitch."
  },
  {
    num: "03",
    icon: "Smartphone",
    title: "Program Delivered",
    desc: "Your custom program and nutrition plan arrive in the app within 48 hours. Walk-through video included."
  },
  {
    num: "04",
    icon: "TrendingUp",
    title: "Train & Progress",
    desc: "Weekly check-ins, form reviews, and ongoing adjustments. Your program evolves as you improve."
  }
];
