export const PRESETS = {
  fontStyles: ['serif', 'sans', 'round'],
  themes: ['light', 'dark']
};

export const TREATMENTS = [
  {
    icon: 'Leaf',
    title: 'Classical Homoeopathy',
    desc: 'In-depth constitutional case analysis to select the most precise homoeopathic remedy for your mind-body type, targeting root causes rather than symptoms.',
    tags: ['Chronic Illness', 'Autoimmune', 'Anxiety', 'Allergies']
  },
  {
    icon: 'Droplet',
    title: 'Hijama Therapy (Wet Cupping)',
    desc: 'Sunnah-based detoxification technique for blood purification, pain relief, and immune boosting. Remote guidance with certified local therapist coordination.',
    tags: ['Migraines', 'Back Pain', 'Hypertension', 'Fatigue']
  },
  {
    icon: 'Sparkles',
    title: "Women's Health & Hormones",
    desc: 'Specialised protocols for PCOS, endometriosis, menstrual irregularities, menopause, and fertility support through natural homoeopathic treatment.',
    tags: ['PCOS', 'Menopause', 'Fertility', 'PMS']
  },
  {
    icon: 'Brain',
    title: 'Mental & Emotional Wellbeing',
    desc: 'Homoeopathic and holistic support for anxiety, depression, stress-induced disorders, and sleep dysfunction — gentle, non-addictive, effective.',
    tags: ['Anxiety', 'Depression', 'Insomnia', 'Burnout']
  },
  {
    icon: 'Baby',
    title: 'Paediatric Homoeopathy',
    desc: 'Safe, gentle treatment for children without side effects. Addressing recurrent infections, developmental concerns, skin issues, and digestive problems.',
    tags: ['Recurrent Fever', 'Eczema', 'Tonsillitis', 'Colic']
  },
  {
    icon: 'Activity',
    title: 'Chronic Disease Management',
    desc: 'Long-term holistic management of diabetes, thyroid disorders, arthritis, IBS, and other chronic conditions alongside conventional medicine.',
    tags: ['Diabetes Support', 'Thyroid', 'Arthritis', 'IBS']
  }
];

export const CASE_STUDIES = [
  {
    initials: 'FM',
    name: 'Fatima M.',
    age: 32,
    location: 'Dubai, UAE',
    status: 'Recovered',
    condition: 'PCOS + Hormonal Imbalance',
    desc: "Patient presented with irregular cycles (2–3x/year), elevated androgens, and acne for 6 years. After 5 months of constitutional homoeopathy and dietary guidance, cycles normalised and androgens reduced to healthy range.",
    metrics: [
      { val: '5mo', label: 'Duration' },
      { val: 'Regular', label: 'Cycle Now' },
      { val: '89%', label: 'Improvement' }
    ],
    avatarGradient: 'linear-gradient(135deg, var(--accent), var(--gold))'
  },
  {
    initials: 'AK',
    name: 'Asim K.',
    age: 47,
    location: 'London, UK',
    status: 'Managed',
    condition: 'Chronic Migraines + Hypertension',
    desc: '12-year history of weekly debilitating migraines (up to 3 days bedrest) and borderline hypertension. Combined Hijama protocol and homoeopathic treatment reduced frequency from 4/month to 1 mild episode in 3 months.',
    metrics: [
      { val: '3mo', label: 'Duration' },
      { val: '75%', label: 'Less Freq.' },
      { val: 'BP 120/80', label: 'BP Now' }
    ],
    avatarGradient: 'linear-gradient(135deg, #5b8bd4, #a87dcf)'
  },
  {
    initials: 'SN',
    name: 'Sara N.',
    age: 28,
    location: 'Karachi, Pakistan',
    status: 'Clear',
    condition: 'Severe Eczema (Atopic Dermatitis)',
    desc: 'Full-body eczema since childhood, unresponsive to topical steroids. Deep constitutional analysis revealed suppressed grief pattern. After 8 months of treatment, skin 95% clear with no relapse in 18 months.',
    metrics: [
      { val: '8mo', label: 'Duration' },
      { val: '95%', label: 'Skin Clear' },
      { val: '18mo', label: 'No Relapse' }
    ],
    avatarGradient: 'linear-gradient(135deg, #d47a5b, #d4b87a)'
  },
  {
    initials: 'MR',
    name: 'Mohammed R.',
    age: 55,
    location: 'Toronto, Canada',
    status: 'Stabilised',
    condition: 'Type 2 Diabetes Support',
    desc: 'Patient seeking natural adjunct support with medications. After 6 months of homoeopathy + Hijama detox protocol + dietary coaching, HbA1c dropped from 8.2% to 6.8% — within the pre-diabetic range.',
    metrics: [
      { val: '6mo', label: 'Duration' },
      { val: '6.8%', label: 'HbA1c Now' },
      { val: '-17%', label: 'Drop' }
    ],
    avatarGradient: 'linear-gradient(135deg, #5ba47a, #7dd4a5)'
  },
  {
    initials: 'ZH',
    name: 'Zainab H.',
    age: 24,
    location: 'Birmingham, UK',
    status: 'Recovered',
    condition: 'Anxiety Disorder + Insomnia',
    desc: 'Generalised anxiety with panic attacks and chronic insomnia (2–3 hrs/night). Homoeopathic constitutional treatment over 4 months resulted in no panic attacks, 7–8 hrs sleep, and return to university.',
    metrics: [
      { val: '4mo', label: 'Duration' },
      { val: '0', label: 'Panic Attacks' },
      { val: '8hrs', label: 'Sleep Now' }
    ],
    avatarGradient: 'linear-gradient(135deg, #a45bb8, #d47acf)'
  },
  {
    initials: 'OA',
    name: 'Omar A.',
    age: 6,
    location: 'Lahore, Pakistan',
    status: 'Well',
    condition: 'Recurrent Tonsillitis in Child',
    desc: 'Child had 7 episodes of tonsillitis in one year, parents facing advice for tonsillectomy. After homoeopathic treatment for 3 months, zero recurrences in 14 months. Surgery avoided.',
    metrics: [
      { val: '3mo', label: 'Duration' },
      { val: '0', label: 'Recurrences' },
      { val: 'Avoided', label: 'Surgery' }
    ],
    avatarGradient: 'linear-gradient(135deg, #5b8bd4, #5bb89e)'
  }
];

export const REVIEWS = [
  {
    stars: 5,
    text: 'I suffered from PCOS for 6 years and had given up on ever having a regular cycle. Dr. Aisha listened to me for over an hour in the first consultation — something no other doctor had ever done. Within 5 months my body was completely transformed.',
    initials: 'FM',
    name: 'Fatima M.',
    role: 'Dubai · PCOS Patient',
    avatarGradient: 'linear-gradient(135deg, var(--accent), var(--gold))'
  },
  {
    stars: 5,
    text: 'My migraines were destroying my career. After 3 months of combined Hijama and homoeopathy, I went from 4 migraines a month to barely one — and a mild one at that. I genuinely feel like I have my life back.',
    initials: 'AK',
    name: 'Asim K.',
    role: 'London · Migraine Patient',
    avatarGradient: 'linear-gradient(135deg, #5b8bd4, #a87dcf)'
  },
  {
    stars: 5,
    text: "My son had surgery recommended for his tonsils at age 6. Dr. Aisha's treatment changed everything. It's been over a year — not a single episode. We are so grateful to have found her through online consultation.",
    initials: 'UB',
    name: 'Umm Bilal',
    role: 'Lahore · Parent',
    avatarGradient: 'linear-gradient(135deg, #5bb89e, #7dd4a5)'
  },
  {
    stars: 5,
    text: "I was sceptical about online consultations but Dr. Aisha's thorough case-taking and follow-up system is better than most in-person clinics I've visited. My eczema is 95% clear after 8 months. Remarkable.",
    initials: 'SN',
    name: 'Sara N.',
    role: 'Karachi · Eczema Patient',
    avatarGradient: 'linear-gradient(135deg, #d47a5b, #d4b87a)'
  },
  {
    stars: 5,
    text: 'My HbA1c has come down significantly and my energy levels have improved massively. The combination of Hijama and homoeopathy, along with her dietary advice, has changed my relationship with my health completely.',
    initials: 'MR',
    name: 'Mohammed R.',
    role: 'Toronto · Diabetes Management',
    avatarGradient: 'linear-gradient(135deg, #5ba47a, #a4d45b)'
  },
  {
    stars: 4,
    text: "The anxiety I had was crippling. Dr. Aisha took time to understand my emotional state, not just my physical symptoms. I haven't had a panic attack in months. I sleep well. I feel human again. Thank you, doctor.",
    initials: 'ZH',
    name: 'Zainab H.',
    role: 'Birmingham · Anxiety Patient',
    avatarGradient: 'linear-gradient(135deg, #a45bb8, #d47acf)'
  }
];

export const PROCESS_STEPS = [
  {
    num: 1,
    title: 'Book Your Slot',
    desc: 'Choose a convenient time via the booking form. First consultations are free of charge.'
  },
  {
    num: 2,
    title: 'Detailed Case-Taking',
    desc: 'Video call where Dr. Aisha explores your full health history, lifestyle, and emotional patterns.'
  },
  {
    num: 3,
    title: 'Personalised Treatment',
    desc: 'Receive your customised remedy plan with dosing, lifestyle, and dietary recommendations.'
  },
  {
    num: 4,
    title: 'Ongoing Follow-Up',
    desc: 'Regular check-ins via WhatsApp/video call to track progress and adjust treatment as needed.'
  }
];
