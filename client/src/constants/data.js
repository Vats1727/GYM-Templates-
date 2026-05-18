export const TICKER_ITEMS = [
  "Strength Training","HIIT Classes","Yoga & Mindfulness","Boxing","Spinning",
  "Personal Training","CrossFit","Recovery Zone","Olympic Lifting","Calisthenics",
  "Strength Training","HIIT Classes","Yoga & Mindfulness","Boxing","Spinning",
  "Personal Training","CrossFit","Recovery Zone","Olympic Lifting","Calisthenics",
];

export const PROGRAMS = [
  { num:"01", icon:"⚡", tag:"High Intensity", name:"HIIT TRAINING", desc:"Push your limits with explosive intervals designed to torch calories and build endurance fast." },
  { num:"02", icon:"🥊", tag:"Combat", name:"BOXING", desc:"Full-body conditioning through technical boxing drills, bag work, and sparring fundamentals.", featured:true },
  { num:"03", icon:"🏋️", tag:"Powerlifting", name:"STRENGTH", desc:"Progressive overload built around the big three — squat, bench, deadlift." },
  { num:"04", icon:"🧘", tag:"Mind & Body", name:"YOGA", desc:"Restore flexibility, calm the nervous system, and reconnect with breath and movement." },
  { num:"05", icon:"🚴", tag:"Cardio", name:"SPINNING", desc:"High-energy indoor cycling synced to music for maximum cardiovascular performance." },
  { num:"06", icon:"🔥", tag:"Functional", name:"CROSSFIT", desc:"Varied functional movements at high intensity — constantly forging elite fitness." },
];

export const TRAINERS = [
  { num:"01", name:"Marcus Cole", role:"Strength & Power", icon:"💪", color:"trainer-color-1" },
  { num:"02", name:"Priya Nair", role:"Yoga & Mobility", icon:"🧘", color:"trainer-color-2" },
  { num:"03", name:"Jake Torres", role:"HIIT & Combat", icon:"🥊", color:"trainer-color-3" },
  { num:"04", name:"Sofia Reyes", role:"Endurance & Spin", icon:"🚴", color:"trainer-color-4" },
];

export const SCHEDULE = {
  Mon:[
    { time:"06:00", name:"Morning HIIT", trainer:"Jake Torres", duration:"45 min", type:"HIIT", spots:80 },
    { time:"08:30", name:"Vinyasa Yoga", trainer:"Priya Nair", duration:"60 min", type:"Yoga", spots:40 },
    { time:"12:00", name:"Power Lifting", trainer:"Marcus Cole", duration:"60 min", type:"Strength", spots:90 },
    { time:"17:30", name:"Boxing Basics", trainer:"Jake Torres", duration:"45 min", type:"Boxing", spots:60 },
    { time:"19:00", name:"Evening Spin", trainer:"Sofia Reyes", duration:"45 min", type:"Cardio", spots:30 },
  ],
  Tue:[
    { time:"06:30", name:"Sunrise Yoga", trainer:"Priya Nair", duration:"60 min", type:"Yoga", spots:70 },
    { time:"09:00", name:"CrossFit WOD", trainer:"Marcus Cole", duration:"60 min", type:"HIIT", spots:50 },
    { time:"12:30", name:"Core Strength", trainer:"Sofia Reyes", duration:"45 min", type:"Strength", spots:85 },
    { time:"18:00", name:"Boxing Advanced", trainer:"Jake Torres", duration:"60 min", type:"Boxing", spots:25 },
    { time:"19:30", name:"Recovery Flow", trainer:"Priya Nair", duration:"45 min", type:"Yoga", spots:95 },
  ],
  Wed:[
    { time:"06:00", name:"Tabata HIIT", trainer:"Jake Torres", duration:"30 min", type:"HIIT", spots:65 },
    { time:"07:00", name:"Deadlift Day", trainer:"Marcus Cole", duration:"60 min", type:"Strength", spots:75 },
    { time:"11:00", name:"Midday Spin", trainer:"Sofia Reyes", duration:"45 min", type:"Cardio", spots:20 },
    { time:"17:00", name:"Flow Yoga", trainer:"Priya Nair", duration:"60 min", type:"Yoga", spots:80 },
    { time:"19:00", name:"Circuit Training", trainer:"Marcus Cole", duration:"45 min", type:"HIIT", spots:55 },
  ],
};

export const TESTIMONIALS = [
  { quote:"Six months in and I'm a completely different person. The programming, community, and coaching here is unlike anything I've experienced.", name:"Alex M.", detail:"Member since 2024 · Lost 28 lbs", avatar:"👨", stars:5 },
  { quote:"Priya's yoga classes changed my relationship with recovery. I'm lifting heavier than ever and my mobility has transformed.", name:"Rachel K.", detail:"Member since 2023 · Yoga Enthusiast", avatar:"👩", stars:5 },
  { quote:"The HIIT classes are brutally effective. Jake pushes you past mental limits while keeping everything safe. Worth every penny.", name:"Derek S.", detail:"Member since 2024 · HIIT Regular", avatar:"🧑", stars:5 },
];

export const PRICING_PLANS = [
  { plan:"Starter", amount:"49", features:[
    {text:"Gym Floor Access",ok:true},{text:"5 Classes / Month",ok:true},
    {text:"Locker Room",ok:true},{text:"Personal Training",ok:false},{text:"Nutrition Coaching",ok:false},
  ]},
  { plan:"Elite", amount:"89", popular:true, features:[
    {text:"Unlimited Gym Access",ok:true},{text:"Unlimited Classes",ok:true},
    {text:"Premium Locker",ok:true},{text:"2x PT Sessions / Month",ok:true},{text:"Nutrition Coaching",ok:false},
  ]},
  { plan:"Pro", amount:"149", features:[
    {text:"Unlimited Everything",ok:true},{text:"Unlimited Classes",ok:true},
    {text:"VIP Locker Suite",ok:true},{text:"Unlimited PT Sessions",ok:true},{text:"Full Nutrition Plan",ok:true},
  ]},
];
