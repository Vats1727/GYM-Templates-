import { useState, useEffect, useMemo, memo } from "react";
import { T } from "../constants/data";

// Import separate components
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PressTicker from "../components/PressTicker";
import Services from "../components/Services";
import Work from "../components/Work";
import Team from "../components/Team";
import Rewards from "../components/Rewards";
import Products from "../components/Products";
import Reviews from "../components/Reviews";
import FAQ from "../components/FAQ";
import Booking from "../components/Booking";
import Footer from "../components/Footer";
import FloatingCTA from "../components/FloatingCTA";

const GlobalStyles = memo(({ css }) => (
  <style dangerouslySetInnerHTML={{ __html: css }} />
));

/* ─── MAIN ─── */
export default function Home() {
  const [theme, setTheme] = useState("dark");
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bkStep, setBkStep] = useState(1);
  const [bk, setBk] = useState({ service: "", staff: "", date: "", time: "", name: "", phone: "", email: "", note: "" });
  const [booked, setBooked] = useState(false);
  const c = T[theme];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setNavOpen(false); };

  const NAVLINKS = [
    { label: "Services", id: "services" },
    { label: "Our Work", id: "work" },
    { label: "Team", id: "team" },
    { label: "Rewards", id: "rewards" },
    { label: "Reviews", id: "reviews" },
    { label: "Book", id: "book" },
  ];

  const G = useMemo(() => `
    @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Syne:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{font-family:'Inter',sans-serif;background:${c.bg};color:${c.text};transition:background 0.35s,color 0.35s;-webkit-font-smoothing:antialiased}
    ::selection{background:${c.accent}30}
    ::-webkit-scrollbar{width:4px}
    ::-webkit-scrollbar-track{background:${c.bg}}
    ::-webkit-scrollbar-thumb{background:${c.accentDim};border-radius:10px}
    input,select,textarea{outline:none;font-family:'Inter',sans-serif}
    button{cursor:pointer}
    section{padding:88px 0}
    .wrap{max-width:1180px;margin:0 auto;padding:0 28px}
    .label{font-size:10px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:${c.accent}}
    .h2{font-family:'Lora',serif;font-size:clamp(30px,4vw,48px);font-weight:500;line-height:1.18;color:${c.text}}
    .rule{width:40px;height:2px;background:${c.accent};margin:20px 0}
    .body-sm{font-size:15px;color:${c.textMuted};line-height:1.8;font-weight:300}
    .pill{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:20px;font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;background:${c.tag};color:${c.tagText}}
    .card{background:${c.bgCard};border:1px solid ${c.border};border-radius:6px;transition:border-color 0.25s,transform 0.25s}
    .card:hover{border-color:${c.borderStrong};transform:translateY(-2px)}
    .btn{display:inline-flex;align-items:center;gap:8px;padding:13px 28px;border-radius:2px;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;font-family:'Syne',sans-serif;transition:all 0.22s;border:none}
    .btn-p{background:${c.accent};color:${c.accentText}}
    .btn-p:hover{background:${c.accentHover};transform:translateY(-1px)}
    .btn-o{background:transparent;color:${c.accent};border:1px solid ${c.accentDim}}
    .btn-o:hover{background:${c.accent}15;border-color:${c.accent}}
    @keyframes up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    .au{animation:up 0.65s ease both}
    .au1{animation-delay:.08s}.au2{animation-delay:.16s}.au3{animation-delay:.24s}.au4{animation-delay:.32s}
    @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1.2fr 1.2fr 1.2fr;
      gap: 48px;
      margin-bottom: 48px;
    }
    @media (max-width: 900px) {
      .footer-grid {
        grid-template-columns: 1fr 1fr;
        gap: 36px;
      }
    }
    @media (max-width: 600px) {
      .footer-grid {
        grid-template-columns: 1fr;
        gap: 28px;
      }
    }
    @media(max-width:768px){section{padding:56px 0}.wrap{padding:0 18px}}
  `, [c]);

  return (
    <>
      <GlobalStyles css={G} />

      <Navbar theme={theme} setTheme={setTheme} scrolled={scrolled} go={go} c={c} NAVLINKS={NAVLINKS} />
      <Hero theme={theme} c={c} go={go} />
      <PressTicker c={c} />
      <Services c={c} go={go} />
      <Work theme={theme} c={c} go={go} />
      <Team c={c} bk={bk} setBk={setBk} go={go} />
      <Rewards theme={theme} c={c} go={go} />
      <Products c={c} go={go} />
      <Reviews c={c} go={go} />
      <FAQ c={c} />
      <Booking theme={theme} c={c} bk={bk} setBk={setBk} bkStep={bkStep} setBkStep={setBkStep} booked={booked} setBooked={setBooked} />
      <Footer c={c} />
      <FloatingCTA c={c} go={go} />
    </>
  );
}
