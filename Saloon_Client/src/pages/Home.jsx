import { useState, useEffect, useMemo, memo } from "react";
import { Sun, Moon, Trophy, Star, Leaf, MapPin, Clock, Phone, Mail, Car, Calendar, Users, Gift, Smartphone, Sparkles } from "lucide-react";
import { T, AWARDS, PRESS, WORKS, PRODUCTS, STAFF, SERVICES, FAQS, REVIEWS } from "../constants/data";
import Av from "../components/Av";
import Stars from "../components/Stars";
import BASlider from "../components/BASlider";
import LoyaltyCard from "../components/LoyaltyCard";
import GiftCardSection from "../components/GiftCardSection";

const GlobalStyles = memo(({ css }) => (
  <style dangerouslySetInnerHTML={{ __html: css }} />
));

/* ─── MAIN ─── */
export default function Home() {
  const [theme, setTheme] = useState("dark");
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [activeSvc, setActiveSvc] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [bkStep, setBkStep] = useState(1);
  const [bk, setBk] = useState({ service: "", staff: "", date: "", time: "", name: "", phone: "", email: "", note: "" });
  const [booked, setBooked] = useState(false);
  const [activeWork, setActiveWork] = useState("all");
  const c = T[theme];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setNavOpen(false); };

  const filtWork = activeWork === "all" ? WORKS : WORKS.filter((w) => w.type.toLowerCase() === activeWork);
  const filtStaff = activeTab === "all" ? STAFF : STAFF.filter((s) => s.type === activeTab);

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
    @media(max-width:768px){section{padding:56px 0}.wrap{padding:0 18px}}
  `, [c]);

  return (
    <>
      <GlobalStyles css={G} />

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 999, background: scrolled ? c.nav : "transparent", backdropFilter: "blur(24px)", borderBottom: scrolled ? `1px solid ${c.border}` : "none", transition: "all 0.35s", padding: "0 28px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <button onClick={() => go("hero")} style={{ fontFamily: "'Lora', serif", fontSize: 21, fontWeight: 600, color: c.text, background: "none", border: "none", letterSpacing: 0.5 }}>
            Velour<span style={{ color: c.accent }}>.</span>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <div style={{ display: "flex", gap: 28 }}>
              {NAVLINKS.map((l) => (
                <button key={l.id} onClick={() => go(l.id)} style={{ background: "none", border: "none", fontSize: 12, fontWeight: 500, letterSpacing: 0.5, color: c.textMuted, fontFamily: "'Inter', sans-serif", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.target.style.color = c.text)} onMouseLeave={(e) => (e.target.style.color = c.textMuted)}>
                  {l.label}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} style={{ width: 36, height: 36, borderRadius: "50%", background: c.bgCard, border: `1px solid ${c.border}`, color: c.accent, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button className="btn btn-p" style={{ padding: "8px 18px", fontSize: 11 }} onClick={() => go("book")}>Book Now</button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: 0 }}>
        <div style={{ position: "absolute", inset: 0, background: theme === "dark" ? `radial-gradient(ellipse 80% 60% at 50% 0%, ${c.accent}0C 0%, transparent 70%)` : `radial-gradient(ellipse 80% 60% at 50% 0%, ${c.accent}10 0%, transparent 70%)` }} />
        {/* Organic blobs */}
        <div style={{ position: "absolute", top: "10%", right: "-5%", width: 480, height: 480, borderRadius: "62% 38% 46% 54% / 60% 44% 56% 40%", background: c.accent + "08", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: "5%", left: "-8%", width: 380, height: 380, borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%", background: c.accent + "06", filter: "blur(60px)" }} />

        <div className="wrap" style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", paddingTop: 80 }}>
          <div>
            {/* Press strip */}
            <div className="au au1" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32, padding: "8px 14px", background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 20, display: "inline-flex" }}>
              <Stars n={5} size={11} />
              <span style={{ fontSize: 11, color: c.textMuted }}>Featured in Vogue India & Harper's Bazaar</span>
            </div>
            <div className="au au1 label" style={{ marginBottom: 16 }}>Ahmedabad's Premier Studio</div>
            <h1 className="au au2" style={{ fontFamily: "'Lora', serif", fontSize: "clamp(42px, 6vw, 76px)", fontWeight: 500, lineHeight: 1.08, color: c.text, marginBottom: 28, letterSpacing: -0.5 }}>
              Beauty is<br />a <em style={{ color: c.accent }}>practice,</em><br />not an event.
            </h1>
            <p className="au au3 body-sm" style={{ maxWidth: 420, marginBottom: 44 }}>
              Where master barbers and certified beauticians craft transformations that last. Six specialists. One shared obsession with craft.
            </p>
            <div className="au au4" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="btn btn-p" onClick={() => go("book")}>Reserve Your Visit →</button>
              <button className="btn btn-o" onClick={() => go("work")}>See Transformations</button>
            </div>
            {/* Stats */}
            <div className="au au4" style={{ display: "flex", gap: 40, marginTop: 56, paddingTop: 40, borderTop: `1px solid ${c.border}` }}>
              {[["3,500+", "Happy Clients"], ["9 yrs", "In Business"], ["4.97★", "Avg Rating"]].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Lora', serif", fontSize: 26, fontWeight: 600, color: c.accent }}>{v}</div>
                  <div style={{ fontSize: 11, color: c.textMuted, marginTop: 4, letterSpacing: 0.5 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Stacked mini showcase */}
          <div className="au au3" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Featured award */}
            <div style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 6, padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: c.accent + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}><Trophy size={20} /></div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: c.text }}>Best Salon 2024</div>
                <div style={{ fontSize: 11, color: c.textMuted }}>Ahmedabad Times · 4th consecutive year</div>
              </div>
            </div>
            {/* Mini before/after preview */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {WORKS.slice(0, 4).map((w) => (
                <div key={w.id} style={{ height: 110, borderRadius: 6, background: w.afterBg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, border: `1px solid ${c.border}`, cursor: "pointer", transition: "transform 0.2s" }}
                  onClick={() => go("work")}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                  <div style={{ color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>{w.emoji}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.8)", letterSpacing: 1, textTransform: "uppercase" }}>{w.tag}</div>
                </div>
              ))}
            </div>
            {/* Quick book */}
            <div style={{ background: c.bgCard, border: `1px solid ${c.borderStrong}`, borderRadius: 6, padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: c.text }}>Available today</div>
                <div style={{ fontSize: 11, color: c.textMuted }}>3 openings remaining</div>
              </div>
              <button className="btn btn-p" style={{ padding: "9px 18px", fontSize: 11 }} onClick={() => go("book")}>Quick Book</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRESS TICKER ── */}
      <div style={{ background: c.accent, padding: "12px 0", overflow: "hidden", borderTop: `1px solid ${c.accentHover}`, borderBottom: `1px solid ${c.accentDim}` }}>
        <div style={{ display: "flex", gap: 0, animation: "ticker 18s linear infinite", width: "max-content" }}>
          {[...AWARDS, ...AWARDS].map((a, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 40px", whiteSpace: "nowrap" }}>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: c.accentText }}><Trophy size={20} /> {a.title}</span>
              <span style={{ fontSize: 11, color: c.accentText + "AA" }}>{a.body} · {a.year}</span>
              <span style={{ color: c.accentText + "44", fontSize: 18 }}>◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section id="services" style={{ background: c.bgAlt }}>
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 52, flexWrap: "wrap", gap: 24 }}>
            <div>
              <div className="label">What We Offer</div>
              <h2 className="h2" style={{ marginTop: 12 }}>Our Services</h2>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {SERVICES.map((s, i) => (
                <button key={i} onClick={() => setActiveSvc(i)} style={{ padding: "7px 16px", borderRadius: 2, border: `1px solid ${activeSvc === i ? c.accent : c.border}`, background: activeSvc === i ? c.accent + "18" : "transparent", color: activeSvc === i ? c.accent : c.textMuted, fontSize: 11, fontWeight: 500, letterSpacing: 0.5, fontFamily: "inherit", transition: "all 0.2s" }}>
                  {s.icon} {s.cat}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "350px 1fr", gap: 32 }}>
            <div style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 6, padding: "28px", height: "fit-content", position: "sticky", top: 90 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{SERVICES[activeSvc].icon}</div>
              <div className="h2" style={{ fontSize: 24, marginBottom: 8 }}>{SERVICES[activeSvc].cat}</div>
              <div className="rule" />
              <p className="body-sm" style={{ marginBottom: 24 }}>Expert services tailored to your unique look. All services include consultation and aftercare advice.</p>
              <button className="btn btn-p" style={{ width: "100%", justifyContent: "center" }} onClick={() => go("book")}>Book This Service</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 1, borderRadius: 6, overflow: "hidden", border: `1px solid ${c.border}` }}>
              {SERVICES[activeSvc].items.map((item, i) => (
                <div key={i} style={{ background: c.bgCard, padding: "22px 28px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, borderBottom: i < SERVICES[activeSvc].items.length - 1 ? `1px solid ${c.border}` : "none", transition: "background 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = c.bgCardHover)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = c.bgCard)}>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 15, color: c.text, marginBottom: 5 }}>{item.n}</div>
                    <div style={{ fontSize: 13, color: c.textMuted }}>{item.d}</div>
                  </div>
                  <div style={{ fontFamily: "'Lora', serif", fontSize: 17, fontWeight: 600, color: c.accent, whiteSpace: "nowrap" }}>{item.p}</div>
                </div>
              ))}
              {/* Promo banner */}
              <div style={{ background: c.accent + "12", padding: "18px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 13, color: c.text }}><Star size={14} /> New clients get <strong>15% off</strong> first visit</div>
                <button className="btn btn-o" style={{ padding: "7px 16px", fontSize: 10 }} onClick={() => go("book")}>Claim →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WORK SHOWCASES (Before/After) ── */}
      <section id="work" style={{ background: c.bg }}>
        <div className="wrap">
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div className="label">Portfolio</div>
            <h2 className="h2" style={{ marginTop: 12 }}>Famous Transformations</h2>
            <div className="rule" style={{ margin: "20px auto" }} />
            <p className="body-sm" style={{ maxWidth: 500, margin: "0 auto 32px" }}>
              Drag the slider on each card to reveal the before & after. Real clients. Real results.
            </p>
            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              {["all", "color", "cut", "grooming", "beauty"].map((f) => (
                <button key={f} onClick={() => setActiveWork(f)} style={{ padding: "7px 18px", borderRadius: 20, border: `1px solid ${activeWork === f ? c.accent : c.border}`, background: activeWork === f ? c.accent : "transparent", color: activeWork === f ? c.accentText : c.textMuted, fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "capitalize", fontFamily: "inherit", transition: "all 0.2s" }}>
                  {f === "all" ? "All Work" : f}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
            {filtWork.map((w) => <BASlider key={w.id} work={w} theme={theme} />)}
          </div>
          {/* Testimonial attached to work */}
          <div style={{ marginTop: 48, background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 6, padding: "32px 40px", display: "flex", gap: 32, alignItems: "flex-start" }}>
            <div style={{ fontSize: 48, lineHeight: 1, color: c.accent, fontFamily: "Georgia, serif" }}>"</div>
            <div>
              <p style={{ fontFamily: "'Lora', serif", fontSize: 19, fontStyle: "italic", color: c.text, lineHeight: 1.65, marginBottom: 16 }}>
                I've been to salons in Mumbai, Delhi, and London. Velour is the only place that consistently delivers results that exceed what I imagined. The before/after difference isn't incremental — it's complete reinvention.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Av init="SN" col={c.accent} size={40} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: c.text }}>Sneha Nair</div>
                  <div style={{ fontSize: 12, color: c.textMuted }}>Fashion Director, Femina India</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team" style={{ background: c.bgAlt }}>
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
            <div>
              <div className="label">The Artists</div>
              <h2 className="h2" style={{ marginTop: 12 }}>Meet Your Stylists</h2>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {[["all", "All"], ["barber", "Barbers"], ["beauty", "Beauticians"]].map(([v, l]) => (
                <button key={v} onClick={() => setActiveTab(v)} style={{ padding: "7px 18px", borderRadius: 2, border: `1px solid ${activeTab === v ? c.accent : c.border}`, background: activeTab === v ? c.accent + "18" : "transparent", color: activeTab === v ? c.accent : c.textMuted, fontSize: 11, fontFamily: "inherit", transition: "all 0.2s" }}>{l}</button>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 20 }}>
            {filtStaff.map((m) => (
              <div key={m.name} className="card" style={{ padding: "24px" }}>
                <div style={{ display: "flex", gap: 16, marginBottom: 18 }}>
                  <Av init={m.init} col={m.col} size={56} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: c.text }}>{m.name}</div>
                        <div style={{ fontSize: 13, color: c.accent, marginTop: 2 }}>{m.role}</div>
                      </div>
                      <div className="pill" style={{ background: m.type === "barber" ? "#3D7A5820" : "#7A3D5820", color: m.type === "barber" ? "#7EC8A0" : "#C87EA0" }}>{m.type}</div>
                    </div>
                    <div style={{ fontSize: 11, color: c.textFaint, marginTop: 4, letterSpacing: 0.5 }}>{m.exp} experience</div>
                  </div>
                </div>
                <div style={{ padding: "10px 12px", background: c.bgAlt, borderRadius: 3, fontSize: 12, color: c.textMuted, marginBottom: 16 }}>
                  <span style={{ color: c.accent }}>Speciality: </span>{m.specialty}
                </div>
                {/* Time slots */}
                <div style={{ fontSize: 11, color: c.textMuted, marginBottom: 8, letterSpacing: 0.5 }}>Available slots today</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {m.slots.map((sl) => (
                    <button key={sl} onClick={() => { setBk({ ...bk, staff: m.name, time: sl }); go("book"); }} style={{ padding: "5px 10px", border: `1px solid ${c.border}`, borderRadius: 3, background: "transparent", color: c.textMuted, fontSize: 11, fontFamily: "inherit", transition: "all 0.2s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.accent; e.currentTarget.style.color = c.accent; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.textMuted; }}>
                      {sl}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REWARDS & LOYALTY ── */}
      <section id="rewards" style={{ background: c.bg }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
            <div>
              <div className="label">Member Benefits</div>
              <h2 className="h2" style={{ marginTop: 12 }}>Velour Loyalty<br />Programme</h2>
              <div className="rule" />
              <p className="body-sm" style={{ marginBottom: 32 }}>Earn points on every visit, referral, and product purchase. Redeem for free services, upgrades, and exclusive experiences.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                {[
                  [<Leaf size={18} />, "Earn on every visit", "1 point per ₹100 spent on services"],
                  [<Users size={18} />, "Referral rewards", "500 pts for every new client you bring"],
                  [<Gift size={18} />, "Birthday bonus", "Double points + free add-on in your birthday month"],
                  [<Smartphone size={18} />, "Social rewards", "100 pts for tagging us in your transformation"]
                ].map(([em, t, d]) => (
                  <div key={t} style={{ display: "flex", gap: 14, padding: "14px 18px", background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 4, alignItems: "center" }}>
                    <span style={{ color: c.accent, display: "flex", alignItems: "center" }}>{em}</span>
                    <div><div style={{ fontSize: 13, fontWeight: 500, color: c.text }}>{t}</div><div style={{ fontSize: 12, color: c.textMuted, marginTop: 2 }}>{d}</div></div>
                  </div>
                ))}
              </div>
              <button className="btn btn-p" onClick={() => go("book")}>Join Free — Book First Visit</button>
            </div>
            <div>
              <LoyaltyCard theme={theme} />
            </div>
          </div>

          {/* ── GIFT CARDS ── */}
          <div style={{ marginTop: 72, paddingTop: 64, borderTop: `1px solid ${c.border}` }}>
            <div style={{ marginBottom: 36 }}>
              <div className="label">Give the Gift of Beauty</div>
              <h2 className="h2" style={{ marginTop: 12 }}>Gift Cards</h2>
              <div className="rule" />
              <p className="body-sm">Delivered digitally. Valid for all services. The perfect gift for anyone who deserves a little luxury.</p>
            </div>
            <GiftCardSection theme={theme} />
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section style={{ background: c.bgAlt, padding: "72px 0" }}>
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div className="label">In-Studio Shop</div>
              <h2 className="h2" style={{ marginTop: 12 }}>Professional Products</h2>
            </div>
            <button className="btn btn-o" style={{ fontSize: 11 }}>View All Products →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
            {PRODUCTS.map((p) => (
              <div key={p.name} className="card" style={{ padding: "22px" }}>
                <div style={{ width: 52, height: 52, borderRadius: 6, background: c.bgAlt, display: "flex", alignItems: "center", justifyContent: "center", color: c.accent, marginBottom: 14, border: `1px solid ${c.border}` }}>
                  {p.emoji}
                </div>
                <div className="pill" style={{ marginBottom: 10, fontSize: 9 }}>{p.category}</div>
                <div style={{ fontSize: 14, fontWeight: 500, color: c.text, marginBottom: 6 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: c.textMuted, lineHeight: 1.6, marginBottom: 14 }}>{p.desc}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontFamily: "'Lora', serif", fontSize: 16, fontWeight: 600, color: c.accent }}>{p.price}</div>
                  <button style={{ padding: "6px 14px", background: c.accent + "18", border: `1px solid ${c.accentDim}`, borderRadius: 2, color: c.accent, fontSize: 11, fontFamily: "inherit", transition: "all 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = c.accent + "30")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = c.accent + "18")}>
                    Add →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" style={{ background: c.bg }}>
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
            <div>
              <div className="label">Client Stories</div>
              <h2 className="h2" style={{ marginTop: 12 }}>What Clients Say</h2>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "'Lora', serif", fontSize: 32, fontWeight: 600, color: c.accent }}>4.97</div>
                <div style={{ fontSize: 11, color: c.textMuted }}>from 850+ reviews</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {[5, 4, 3, 2, 1].map((s) => (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ fontSize: 10, color: c.textFaint, width: 6 }}>{s}</div>
                    <div style={{ width: 80, height: 4, borderRadius: 2, background: c.bgAlt, overflow: "hidden" }}>
                      <div style={{ height: "100%", background: c.accent, width: s === 5 ? "92%" : s === 4 ? "6%" : "2%" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 20, marginBottom: 32 }}>
            {REVIEWS.map((r, i) => (
              <div key={i} className="card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Stars />
                  <div className="pill" style={{ fontSize: 9 }}>{r.service}</div>
                </div>
                <p style={{ fontFamily: "'Lora', serif", fontSize: 15, fontStyle: "italic", color: c.text, lineHeight: 1.7 }}>"{r.text}"</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: c.textMuted }}>{r.name}</div>
                  <div style={{ fontSize: 11, color: c.textFaint }}>{r.date}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Press logos */}
          <div style={{ padding: "28px 0", borderTop: `1px solid ${c.border}`, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <div style={{ fontSize: 11, color: c.textFaint, letterSpacing: 1, textTransform: "uppercase", marginRight: 8 }}>As seen in</div>
            {PRESS.map((p) => (
              <div key={p} style={{ padding: "6px 18px", background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 2, fontSize: 12, fontWeight: 600, color: c.textMuted, letterSpacing: 1, fontFamily: "'Syne', sans-serif" }}>{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: c.bgAlt, padding: "72px 0" }}>
        <div className="wrap" style={{ maxWidth: 780 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="label">Common Questions</div>
            <h2 className="h2" style={{ marginTop: 12 }}>FAQs</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {FAQS.map((f, i) => (
              <div key={i} style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 4, overflow: "hidden" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", color: c.text, fontSize: 14, fontWeight: 500, fontFamily: "inherit", textAlign: "left", cursor: "pointer" }}>
                  {f.q}
                  <span style={{ color: c.accent, fontSize: 18, transition: "transform 0.25s", transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)", flexShrink: 0 }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 22px 18px", fontSize: 14, color: c.textMuted, lineHeight: 1.75 }}>{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING ── */}
      <section id="book" style={{ background: c.bg }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 64, alignItems: "start" }}>
            <div style={{ position: "sticky", top: 90 }}>
              <div className="label">Reserve Your Spot</div>
              <h2 className="h2" style={{ marginTop: 12 }}>Book an<br />Appointment</h2>
              <div className="rule" />
              <p className="body-sm" style={{ marginBottom: 36 }}>Select your service, choose your artist, and secure your time. Same-day slots available. No deposit required for first visit.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[[<MapPin size={17} />, "Location", "23 Law Garden Road, Ellisbridge, Ahmedabad 380006"],
                  [<Clock size={17} />, "Hours", "Tue–Sat 10am–8pm  ·  Sun 11am–6pm  ·  Mon Closed"],
                  [<Phone size={17} />, "Call / WhatsApp", "+91 98765 43210"],
                  [<Mail size={17} />, "Email", "hello@velourstudio.in"],
                  [<Car size={17} />, "Parking", "Free client parking behind the building"]].map(([ico, lbl, val]) => (
                  <div key={lbl} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 3, background: c.bgCard, border: `1px solid ${c.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>{ico}</div>
                    <div><div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: c.accent, marginBottom: 3 }}>{lbl}</div><div style={{ fontSize: 13, color: c.textMuted, lineHeight: 1.5 }}>{val}</div></div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 8, padding: 40 }}>
              {booked ? (
                <div style={{ textAlign: "center", padding: "32px 0" }}>
                  <div style={{ fontSize: 52, marginBottom: 20 }}><Leaf size={48} /></div>
                  <h3 style={{ fontFamily: "'Lora', serif", fontSize: 26, color: c.text, marginBottom: 12 }}>See you soon!</h3>
                  <p style={{ color: c.textMuted, lineHeight: 1.7, marginBottom: 8, fontSize: 14 }}>Confirmation sent to <strong style={{ color: c.text }}>{bk.email}</strong></p>
                  <p style={{ color: c.textMuted, fontSize: 13, marginBottom: 28 }}>{bk.service} with {bk.staff} on {bk.date} at {bk.time}</p>
                  <div style={{ padding: "16px", background: c.bgAlt, borderRadius: 4, fontSize: 13, color: c.textMuted, marginBottom: 28, display: "flex", alignItems: "center", gap: 8 }}>
                    <Sparkles size={16} style={{ color: c.accent, flexShrink: 0 }} />
                    <span>Arrive 5 min early. Skip conditioner 48hrs before color services.</span>
                  </div>
                  <button className="btn btn-o" onClick={() => { setBooked(false); setBkStep(1); setBk({ service: "", staff: "", date: "", time: "", name: "", phone: "", email: "", note: "" }); }}>Book Another →</button>
                </div>
              ) : (
                <>
                  {/* Step indicators */}
                  <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
                    {[1, 2, 3].map((s) => (
                      <div key={s} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
                        <div style={{ height: 3, width: "100%", borderRadius: 2, background: s <= bkStep ? c.accent : c.border, transition: "background 0.3s" }} />
                        <div style={{ fontSize: 10, color: s <= bkStep ? c.accent : c.textFaint }}>{["Service & Artist", "Date & Time", "Your Details"][s - 1]}</div>
                      </div>
                    ))}
                  </div>

                  {bkStep === 1 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                      <div>
                        <label style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: c.textMuted, display: "block", marginBottom: 8 }}>Service</label>
                        <select value={bk.service} onChange={(e) => setBk({ ...bk, service: e.target.value })} style={{ width: "100%", padding: "13px 16px", borderRadius: 3, background: c.bgAlt, border: `1px solid ${c.border}`, color: bk.service ? c.text : c.textFaint, fontSize: 14, transition: "border 0.2s" }}
                          onFocus={(e) => (e.target.style.borderColor = c.accent)} onBlur={(e) => (e.target.style.borderColor = c.border)}>
                          <option value="">Choose a service...</option>
                          {SERVICES.flatMap((cat) => cat.items.map((item) => (<option key={item.n} value={item.n}>{item.n} — {item.p}</option>)))}
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: c.textMuted, display: "block", marginBottom: 8 }}>Choose Your Artist</label>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                          {STAFF.map((m) => (
                            <div key={m.name} onClick={() => setBk({ ...bk, staff: m.name })} style={{ padding: "12px 14px", background: bk.staff === m.name ? c.accent + "18" : c.bgAlt, border: `1px solid ${bk.staff === m.name ? c.accent : c.border}`, borderRadius: 4, cursor: "pointer", display: "flex", gap: 10, alignItems: "center", transition: "all 0.2s" }}>
                              <Av init={m.init} col={m.col} size={32} />
                              <div><div style={{ fontSize: 12, fontWeight: 600, color: c.text }}>{m.name.split(" ")[0]}</div><div style={{ fontSize: 10, color: c.textMuted }}>{m.role}</div></div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button className="btn btn-p" disabled={!bk.service || !bk.staff} onClick={() => setBkStep(2)} style={{ opacity: !bk.service || !bk.staff ? 0.5 : 1, justifyContent: "center" }}>Continue →</button>
                    </div>
                  )}

                  {bkStep === 2 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                      {[["Date", "date", "date", { min: new Date().toISOString().split("T")[0] }],
                      ].map(([lbl, key, type, extra]) => (
                        <div key={key}>
                          <label style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: c.textMuted, display: "block", marginBottom: 8 }}>{lbl}</label>
                          <input type={type} value={bk[key]} onChange={(e) => setBk({ ...bk, [key]: e.target.value })} {...extra} style={{ width: "100%", padding: "13px 16px", borderRadius: 3, background: c.bgAlt, border: `1px solid ${c.border}`, color: c.text, fontSize: 14 }} onFocus={(e) => (e.target.style.borderColor = c.accent)} onBlur={(e) => (e.target.style.borderColor = c.border)} />
                        </div>
                      ))}
                      <div>
                        <label style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: c.textMuted, display: "block", marginBottom: 8 }}>Preferred Time</label>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
                          {["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"].map((t) => (
                            <button key={t} onClick={() => setBk({ ...bk, time: t })} style={{ padding: "9px 4px", border: `1px solid ${bk.time === t ? c.accent : c.border}`, borderRadius: 3, background: bk.time === t ? c.accent + "20" : "transparent", color: bk.time === t ? c.accent : c.textMuted, fontSize: 12, fontFamily: "inherit", transition: "all 0.2s" }}>{t}</button>
                          ))}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 10 }}>
                        <button className="btn btn-o" onClick={() => setBkStep(1)} style={{ flex: 1, justifyContent: "center" }}>← Back</button>
                        <button className="btn btn-p" disabled={!bk.date || !bk.time} onClick={() => setBkStep(3)} style={{ flex: 2, justifyContent: "center", opacity: !bk.date || !bk.time ? 0.5 : 1 }}>Continue →</button>
                      </div>
                    </div>
                  )}

                  {bkStep === 3 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      {[["Full Name", "name", "text", "Your full name"],
                        ["Phone / WhatsApp", "phone", "tel", "+91 XXXXX XXXXX"],
                        ["Email", "email", "email", "your@email.com"]].map(([lbl, key, type, ph]) => (
                        <div key={key}>
                          <label style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: c.textMuted, display: "block", marginBottom: 8 }}>{lbl}</label>
                          <input type={type} placeholder={ph} value={bk[key]} onChange={(e) => setBk({ ...bk, [key]: e.target.value })} style={{ width: "100%", padding: "13px 16px", borderRadius: 3, background: c.bgAlt, border: `1px solid ${c.border}`, color: c.text, fontSize: 14 }} onFocus={(e) => (e.target.style.borderColor = c.accent)} onBlur={(e) => (e.target.style.borderColor = c.border)} />
                        </div>
                      ))}
                      <div>
                        <label style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: c.textMuted, display: "block", marginBottom: 8 }}>Special Requests (optional)</label>
                        <textarea placeholder="Allergies, references, or anything we should know..." value={bk.note} onChange={(e) => setBk({ ...bk, note: e.target.value })} rows={2} style={{ width: "100%", padding: "13px 16px", borderRadius: 3, background: c.bgAlt, border: `1px solid ${c.border}`, color: c.text, fontFamily: "inherit", fontSize: 14, resize: "none" }} onFocus={(e) => (e.target.style.borderColor = c.accent)} onBlur={(e) => (e.target.style.borderColor = c.border)} />
                      </div>
                      {/* Summary */}
                      <div style={{ padding: "14px 16px", background: c.bgAlt, borderRadius: 4, fontSize: 13, lineHeight: 2, color: c.textMuted }}>
                        <div><span style={{ color: c.text, fontWeight: 500 }}>Service:</span> {bk.service}</div>
                        <div><span style={{ color: c.text, fontWeight: 500 }}>Artist:</span> {bk.staff}</div>
                        <div><span style={{ color: c.text, fontWeight: 500 }}>When:</span> {bk.date} at {bk.time}</div>
                      </div>
                      <div style={{ display: "flex", gap: 10 }}>
                        <button className="btn btn-o" onClick={() => setBkStep(2)} style={{ flex: 1, justifyContent: "center" }}>← Back</button>
                        <button className="btn btn-p" disabled={!bk.name || !bk.email} onClick={() => setBooked(true)} style={{ flex: 2, justifyContent: "center", opacity: !bk.name || !bk.email ? 0.5 : 1 }}>Confirm Booking ✓</button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: c.bgAlt, borderTop: `1px solid ${c.border}`, padding: "56px 0 28px" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
            <div>
              <div style={{ fontFamily: "'Lora', serif", fontSize: 24, fontWeight: 600, color: c.text, marginBottom: 14, letterSpacing: 0.5 }}>Velour<span style={{ color: c.accent }}>.</span></div>
              <p style={{ fontSize: 13, color: c.textMuted, lineHeight: 1.8, maxWidth: 260, marginBottom: 20 }}>Ahmedabad's award-winning beauty studio. Where craft meets care.</p>
              <div style={{ display: "flex", gap: 8 }}>
                {["IG", "FB", "TW", "YT"].map((s) => (
                  <div key={s} style={{ width: 34, height: 34, borderRadius: "50%", border: `1px solid ${c.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: c.textMuted, fontSize: 11, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.accent; e.currentTarget.style.color = c.accent; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.textMuted; }}>
                    {s}
                  </div>
                ))}
              </div>
            </div>
            {[
              { h: "Services", ls: ["Haircuts & Styling", "Color & Balayage", "Grooming", "Skincare", "Bridal Packages"] },
              { h: "Studio", ls: ["About Us", "Our Team", "Work Portfolio", "Press & Awards", "Careers"] },
              { h: "Client", ls: ["Book Now", "Gift Cards", "Loyalty Rewards", "Product Shop", "FAQs"] },
            ].map((col) => (
              <div key={col.h}>
                <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: c.accent, marginBottom: 18 }}>{col.h}</div>
                {col.ls.map((l) => (
                  <div key={l} style={{ fontSize: 13, color: c.textMuted, marginBottom: 10, cursor: "pointer", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.target.style.color = c.text)} onMouseLeave={(e) => (e.target.style.color = c.textMuted)}>{l}</div>
                ))}
              </div>
            ))}
          </div>
          {/* Newsletter */}
          <div style={{ padding: "28px 32px", background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 6, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, marginBottom: 32, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: c.text, marginBottom: 4 }}>Stay in the loop</div>
              <div style={{ fontSize: 13, color: c.textMuted }}>Tips, trends, and exclusive offers — no spam, ever.</div>
            </div>
            <div style={{ display: "flex", gap: 8, flex: "0 0 auto" }}>
              <input type="email" placeholder="your@email.com" style={{ padding: "10px 16px", borderRadius: 2, background: c.bgAlt, border: `1px solid ${c.border}`, color: c.text, fontSize: 13, width: 220 }} />
              <button className="btn btn-p" style={{ padding: "10px 20px", fontSize: 11 }}>Subscribe →</button>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <div style={{ fontSize: 12, color: c.textFaint }}>© 2025 Velour Studio · All rights reserved · Ahmedabad, Gujarat</div>
            <div style={{ display: "flex", gap: 20 }}>
              {["Privacy Policy", "Terms", "Accessibility"].map((l) => (
                <div key={l} style={{ fontSize: 12, color: c.textFaint, cursor: "pointer" }}>{l}</div>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── FLOATING BOOK CTA ── */}
      <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 998, display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}>
        <div style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 6, padding: "10px 14px", fontSize: 12, color: c.textMuted, backdropFilter: "blur(12px)", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
          <Phone size={14} style={{ color: c.accent }} /> <span>+91 98765 43210</span>
        </div>
        <button className="btn btn-p animate-cta" onClick={() => go("book")} style={{ padding: "14px 24px", borderRadius: 28, boxShadow: `0 4px 20px ${c.accent}40`, display: "flex", alignItems: "center", gap: 8, transition: "all 0.3s" }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05) translateY(-2px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1) translateY(0)"}>
          <Calendar size={15} /> <span>Book Now</span>
        </button>
      </div>
    </>
  );
}
