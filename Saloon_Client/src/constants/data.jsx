import { Palette, Scissors, Flower2, Droplet, Sparkles, Flame, Heart, Leaf } from "lucide-react";

export const T = {
  dark: {
    bg: "#111714", bgAlt: "#161D18", bgCard: "#1C2420", bgCardHover: "#212C27",
    accent: "#7EC8A0", accentHover: "#9EDAB8", accentDim: "#3D7A58",
    accentText: "#111714",
    text: "#EEF2EF", textMuted: "#8BA898", textFaint: "#4A5E52",
    border: "rgba(126,200,160,0.12)", borderStrong: "rgba(126,200,160,0.28)",
    nav: "rgba(17,23,20,0.93)", overlay: "rgba(17,23,20,0.85)",
    tag: "#1C2C24", tagText: "#7EC8A0",
  },
  light: {
    bg: "#F8FBF9", bgAlt: "#EEF5F0", bgCard: "#FFFFFF", bgCardHover: "#F2FAF5",
    accent: "#2E7D52", accentHover: "#1F6341", accentDim: "#7EC8A0",
    accentText: "#FFFFFF",
    text: "#111714", textMuted: "#4A6352", textFaint: "#A8C2B2",
    border: "rgba(46,125,82,0.12)", borderStrong: "rgba(46,125,82,0.28)",
    nav: "rgba(248,251,249,0.93)", overlay: "rgba(248,251,249,0.85)",
    tag: "#E3F2E9", tagText: "#2E7D52",
  },
};

export const AWARDS = [
  { year: "2024", title: "Best Salon", body: "Ahmedabad Times" },
  { year: "2023", title: "Top Stylist Award", body: "Vogue India" },
  { year: "2022", title: "Luxury Salon of Year", body: "Harper's Bazaar" },
  { year: "2021", title: "Best Color Artist", body: "Elle India" },
];

export const PRESS = ["Vogue", "Harper's", "Elle", "Femina", "Grazia"];

export const WORKS = [
  { id: 1, type: "Color", artist: "Aisha O.", tag: "Balayage", beforeDesc: "Flat dark brown, no dimension", afterDesc: "Sun-kissed caramel balayage", time: "4 hrs", beforeBg: "#3D2E1E", afterBg: "#B8814A", emoji: <Palette /> },
  { id: 2, type: "Cut", artist: "Marcus R.", tag: "Skin Fade", beforeDesc: "Overgrown, uneven sides", afterDesc: "Sharp high skin fade with taper", time: "45 min", beforeBg: "#2A2A2A", afterBg: "#1A1A1A", emoji: <Scissors /> },
  { id: 3, type: "Color", artist: "Sofia M.", tag: "Color Melt", beforeDesc: "Bleached, brassy roots", afterDesc: "Seamless rose-to-blonde melt", time: "3.5 hrs", beforeBg: "#C8A882", afterBg: "#F5CDD0", emoji: <Flower2 /> },
  { id: 4, type: "Grooming", artist: "Eli N.", tag: "Beard Sculpt", beforeDesc: "Wild, unkempt full beard", afterDesc: "Sculpted sharp angular beard", time: "40 min", beforeBg: "#4A3728", afterBg: "#2C1E14", emoji: <Scissors /> },
  { id: 5, type: "Beauty", artist: "Priya S.", tag: "Brow Design", beforeDesc: "Over-plucked, sparse arches", afterDesc: "Defined lifted arch brows", time: "30 min", beforeBg: "#E8D5C4", afterBg: "#F5EBE0", emoji: <Sparkles /> },
  { id: 6, type: "Cut", artist: "James T.", tag: "Textured Cut", beforeDesc: "Shapeless overgrown curls", afterDesc: "Defined textured fringe", time: "1 hr", beforeBg: "#1A1208", afterBg: "#0D0A05", emoji: <Flame /> },
];

export const PRODUCTS = [
  { name: "Hydra Repair Mask", price: "₹1,200", category: "Hair Care", emoji: <Heart />, desc: "Deep conditioning for color-treated hair" },
  { name: "Scalp Balance Serum", price: "₹1,800", category: "Scalp", emoji: <Leaf />, desc: "Botanical scalp treatment, anti-flake" },
  { name: "Glow Facial Oil", price: "₹2,400", category: "Skin Care", emoji: <Sparkles />, desc: "Rosehip + vitamin C brightening oil" },
  { name: "Beard Conditioning Balm", price: "₹900", category: "Grooming", emoji: <Droplet />, desc: "Softens and shapes coarse beard hair" },
];

export const STAFF = [
  { name: "Marcus Rivera", role: "Master Barber", exp: "12 yrs", specialty: "Fades & Line-ups", type: "barber", init: "MR", col: "#6B9E77", slots: ["10:00", "12:00", "14:00", "16:00"] },
  { name: "Aisha Okonkwo", role: "Color Director", exp: "9 yrs", specialty: "Balayage & Color", type: "beauty", init: "AO", col: "#9E6B8A", slots: ["11:00", "13:00", "15:00"] },
  { name: "James Tan", role: "Expert Barber", exp: "7 yrs", specialty: "Textured Hair", type: "barber", init: "JT", col: "#6B7E9E", slots: ["10:00", "11:00", "13:00", "17:00"] },
  { name: "Sofia Marchetti", role: "Color Specialist", exp: "11 yrs", specialty: "Highlights & Toning", type: "beauty", init: "SM", col: "#9E8A6B", slots: ["09:00", "12:00", "15:00"] },
  { name: "Eli Nakamura", role: "Grooming Artist", exp: "5 yrs", specialty: "Hot Shaves & Scalp", type: "barber", init: "EN", col: "#7A9E6B", slots: ["10:00", "12:00", "14:00", "16:00", "18:00"] },
  { name: "Priya Sharma", role: "Skin & Beauty", exp: "8 yrs", specialty: "Facials & Brows", type: "beauty", init: "PS", col: "#9E6B6B", slots: ["10:00", "13:00", "15:00"] },
];

export const SERVICES = [
  { cat: "Cuts & Styling", icon: <Scissors size={20} />, items: [{ n: "Signature Cut", p: "₹1,500", d: "Shampoo, precision cut, blow-dry" }, { n: "Men's Classic Cut", p: "₹900", d: "Clipper or scissor cut + finish" }, { n: "Kids Cut (under 12)", p: "₹600", d: "Gentle shampoo, trim & style" }] },
  { cat: "Color & Texture", icon: <Palette size={20} />, items: [{ n: "Full Balayage", p: "₹6,500+", d: "Hand-painted, consultation incl." }, { n: "Root Touch-Up", p: "₹2,800+", d: "Single process color" }, { n: "Keratin Treatment", p: "₹8,000+", d: "Smoothing, 3–5 month results" }] },
  { cat: "Grooming", icon: <Scissors size={20} />, items: [{ n: "Hot Towel Shave", p: "₹1,200", d: "Traditional straight razor ritual" }, { n: "Beard Sculpt", p: "₹800", d: "Shape, define, condition" }, { n: "Scalp Treatment", p: "₹1,500", d: "Therapeutic massage + serum" }] },
  { cat: "Skin & Beauty", icon: <Sparkles size={20} />, items: [{ n: "Signature Facial", p: "₹3,200", d: "Cleanse, exfoliate, mask, serum" }, { n: "Brow Architecture", p: "₹1,200", d: "Design, thread, tint" }, { n: "Lash Extensions", p: "₹4,500+", d: "Classic, hybrid or volume" }] },
];

export const FAQS = [
  { q: "How do I book an appointment?", a: "Use our online booking tool on this page — choose service, artist, and a time. You can also call us or DM on Instagram." },
  { q: "What should I do before a color appointment?", a: "Arrive with clean, dry hair. Avoid heavy conditioners 48 hours prior. Consultation is included at no extra charge." },
  { q: "Do you have parking available?", a: "Yes — dedicated client parking behind our building on Law Garden Road, plus free street parking after 6pm." },
  { q: "What is your cancellation policy?", a: "We request 24-hour notice for cancellations. Late cancellations (under 4 hours) may incur a 50% service fee." },
  { q: "Do you offer bridal packages?", a: "Absolutely — full bridal packages with trial, day-of styling, and on-location services. Contact us for a custom quote." },
];

export const REVIEWS = [
  { name: "Divya P.", stars: 5, text: "Aisha's color work is genuinely transformative. I've been going to salons for 15 years and this is the first time I've left speechless.", service: "Balayage", date: "May 2025" },
  { name: "Rohan M.", stars: 5, text: "Marcus is an artist. The fade was so clean I couldn't stop looking in the mirror. Booked again before I even walked out.", service: "Skin Fade", date: "Apr 2025" },
  { name: "Shreya K.", stars: 5, text: "Priya completely redesigned my brows after years of over-plucking. The difference to my face structure is dramatic.", service: "Brow Design", date: "Apr 2025" },
  { name: "Arjun S.", stars: 5, text: "Eli's hot towel shave was meditative. The ritual, the warm towels, the straight razor — it's not a haircut, it's an experience.", service: "Hot Shave", date: "Mar 2025" },
];
