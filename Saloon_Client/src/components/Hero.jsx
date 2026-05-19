import React from "react";
import { Trophy, Scissors, Palette, Flower2 } from "lucide-react";
import Stars from "./Stars";
import { WORKS } from "../constants/data";
import useFetchData from "../hooks/useFetchData";
import { getImageUrl } from "../services/api";
import VisualEditorTrigger from "./Admin/VisualEditorTrigger";

const getWorkIcon = (emoji, tag) => {
  const t = (tag || "").toLowerCase();
  const e = (emoji || "");
  if (e === "🎨" || t.includes("balayage") || t.includes("color")) {
    return <Palette size={24} strokeWidth={1.5} />;
  }
  if (e === "🌸" || t.includes("melt") || t.includes("flower")) {
    return <Flower2 size={24} strokeWidth={1.5} />;
  }
  return <Scissors size={24} strokeWidth={1.5} />;
};

export default function Hero({ theme, c, go }) {
  const { data: heroList } = useFetchData('hero_section/active', []);
  const { data: dbWorks } = useFetchData('work', []);
  const displayWorks = dbWorks && dbWorks.length > 0 ? dbWorks : WORKS;

  const [width, setWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = width <= 768;

  const rawHero = heroList && heroList.length > 0 ? heroList[0] : {};
  const heroData = {
    tag: rawHero.tag || "Ahmedabad's Premier Studio",
    title_line1: rawHero.title_line1 || "Beauty is",
    title_line2: rawHero.title_line2 || "a practice,",
    title_line3: rawHero.title_line3 !== undefined && rawHero.title_line3 !== null ? rawHero.title_line3 : "not an event.",
    subtitle: rawHero.subtitle || "Where master barbers and certified beauticians craft transformations that last. Six specialists. One shared obsession with craft.",
    btn_text: rawHero.btn_text || "Reserve Your Visit →",
    btn_link: rawHero.btn_link || "book",
    btn2_text: rawHero.btn2_text || "See Transformations",
    btn2_link: rawHero.btn2_link || "work",
    stat1_val: rawHero.stat1_val || "3,500+",
    stat1_lbl: rawHero.stat1_lbl || "Happy Clients",
    stat2_val: rawHero.stat2_val || "9 yrs",
    stat2_lbl: rawHero.stat2_lbl || "In Business",
    stat3_val: rawHero.stat3_val || "4.97★",
    stat3_lbl: rawHero.stat3_lbl || "Avg Rating",
    image: rawHero.image || "",
    rating_stars: rawHero.rating_stars !== undefined && rawHero.rating_stars !== null ? rawHero.rating_stars : 5,
    featured_in: rawHero.featured_in || "Featured in Vogue India & Harper's Bazaar",
    award_title: rawHero.award_title || "Best Salon 2024",
    award_subtitle: rawHero.award_subtitle || "Ahmedabad Times · 4th consecutive year",
    quick_book_title: rawHero.quick_book_title || "Available today",
    quick_book_subtitle: rawHero.quick_book_subtitle || "3 openings remaining",
    quick_book_btn_text: rawHero.quick_book_btn_text || "Quick Book"
  };

  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: 0 }}>
      <VisualEditorTrigger sectionPath="/admin/hero_section" />
      
      {/* Background Image/Cover Underlay */}
      {heroData.image ? (
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${getImageUrl(heroData.image)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.22,
          zIndex: 0
        }} />
      ) : null}

      <div style={{ position: "absolute", inset: 0, background: theme === "dark" ? `radial-gradient(ellipse 80% 60% at 50% 0%, ${c.accent}0C 0%, transparent 70%)` : `radial-gradient(ellipse 80% 60% at 50% 0%, ${c.accent}10 0%, transparent 70%)`, zIndex: 0 }} />
      {/* Organic blobs */}
      <div style={{ position: "absolute", top: "10%", right: "-5%", width: 480, height: 480, borderRadius: "62% 38% 46% 54% / 60% 44% 56% 40%", background: c.accent + "08", filter: "blur(60px)", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "5%", left: "-8%", width: 380, height: 380, borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%", background: c.accent + "06", filter: "blur(60px)", zIndex: 0 }} />

      <div className="wrap" style={{ 
        position: "relative", 
        zIndex: 1, 
        display: "grid", 
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", 
        gap: isMobile ? 40 : 60, 
        alignItems: "center", 
        paddingTop: isMobile ? 110 : 80, 
        paddingBottom: isMobile ? 40 : 0,
        width: "100%" 
      }}>
        <div>
          {/* Press strip */}
          <div className="au au1" style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            gap: 10, 
            marginBottom: 24, 
            padding: "8px 14px", 
            background: c.bgCard, 
            border: `1px solid ${c.border}`, 
            borderRadius: 20,
            maxWidth: "100%",
            boxSizing: "border-box"
          }}>
            <Stars n={heroData.rating_stars} size={11} />
            <span style={{ fontSize: 10, color: c.textMuted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{heroData.featured_in}</span>
          </div>
          <div className="au au1 label" style={{ marginBottom: 16 }}>{heroData.tag}</div>
          <h1 className="au au2" style={{ fontFamily: "'Lora', serif", fontSize: isMobile ? "clamp(34px, 8vw, 48px)" : "clamp(42px, 6vw, 76px)", fontWeight: 500, lineHeight: 1.1, color: c.text, marginBottom: 20, letterSpacing: -0.5 }}>
            {heroData.title_line1}<br />
            <em style={{ color: c.accent }}>{heroData.title_line2}</em><br />
            {heroData.title_line3 || "not an event."}
          </h1>
          <p className="au au3 body-sm" style={{ maxWidth: 420, marginBottom: 32, fontSize: isMobile ? 13 : 14 }}>
            {heroData.subtitle}
          </p>
          <div className="au au4" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: isMobile ? 20 : 0 }}>
            {heroData.btn_text && (
              <button className="btn btn-p" onClick={() => go(heroData.btn_link || "book")}>
                {heroData.btn_text}
              </button>
            )}
            {heroData.btn2_text && (
              <button className="btn btn-o" onClick={() => go(heroData.btn2_link || "work")}>
                {heroData.btn2_text}
              </button>
            )}
          </div>

        </div>

        {/* Right: Stacked mini showcase */}
        <div className="au au3" style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%" }}>
          {/* Featured award */}
          <div style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 6, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 42, height: 42, borderRadius: "50%", background: c.accent + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: c.accent, flexShrink: 0 }}><Trophy size={18} /></div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{heroData.award_title}</div>
              <div style={{ fontSize: 11, color: c.textMuted }}>{heroData.award_subtitle}</div>
            </div>
          </div>
          {/* Mini before/after preview */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {displayWorks.slice(0, 4).map((w) => (
              <div key={w.id} style={{ height: 100, borderRadius: 6, background: w.afterBg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, border: `1px solid ${c.border}`, cursor: "pointer", transition: "transform 0.2s" }}
                onClick={() => go("work")}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                <div style={{ color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {getWorkIcon(w.emoji, w.tag)}
                </div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.8)", letterSpacing: 1, textTransform: "uppercase", fontWeight: "600" }}>{w.tag}</div>
              </div>
            ))}
          </div>
          {/* Quick book */}
          <div style={{ background: c.bgCard, border: `1px solid ${c.borderStrong}`, borderRadius: 6, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: c.text }}>{heroData.quick_book_title}</div>
              <div style={{ fontSize: 11, color: c.textMuted }}>{heroData.quick_book_subtitle}</div>
            </div>
            <button className="btn btn-p" style={{ padding: "8px 16px", fontSize: 10, flexShrink: 0 }} onClick={() => go("book")}>{heroData.quick_book_btn_text}</button>
          </div>
        </div>
      </div>
    </section>
  );
}
