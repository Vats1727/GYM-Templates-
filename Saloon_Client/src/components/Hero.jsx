import React from "react";
import { Trophy } from "lucide-react";
import Stars from "./Stars";
import { WORKS } from "../constants/data";
import useFetchData from "../hooks/useFetchData";
import { getImageUrl } from "../services/api";
import VisualEditorTrigger from "./Admin/VisualEditorTrigger";

export default function Hero({ theme, c, go }) {
  const { data: heroList } = useFetchData('hero_section/active', []);
  const heroData = heroList && heroList.length > 0 ? heroList[0] : {
    tag: "Ahmedabad's Premier Studio",
    title_line1: "Beauty is",
    title_line2: "a practice,",
    title_line3: "not an event.",
    btn_text: "Reserve Your Visit →",
    stat1_val: "3,500+",
    stat1_lbl: "Happy Clients",
    stat2_val: "9 yrs",
    stat2_lbl: "In Business",
    stat3_val: "4.97★",
    stat3_lbl: "Avg Rating",
    image: ""
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

      <div className="wrap" style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", paddingTop: 80, width: "100%" }}>
        <div>
          {/* Press strip */}
          <div className="au au1" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32, padding: "8px 14px", background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 20, display: "inline-flex" }}>
            <Stars n={5} size={11} />
            <span style={{ fontSize: 11, color: c.textMuted }}>Featured in Vogue India & Harper's Bazaar</span>
          </div>
          <div className="au au1 label" style={{ marginBottom: 16 }}>{heroData.tag}</div>
          <h1 className="au au2" style={{ fontFamily: "'Lora', serif", fontSize: "clamp(42px, 6vw, 76px)", fontWeight: 500, lineHeight: 1.08, color: c.text, marginBottom: 28, letterSpacing: -0.5 }}>
            {heroData.title_line1}<br />
            <em style={{ color: c.accent }}>{heroData.title_line2}</em><br />
            {heroData.title_line3 || "not an event."}
          </h1>
          <p className="au au3 body-sm" style={{ maxWidth: 420, marginBottom: 44 }}>
            Where master barbers and certified beauticians craft transformations that last. Six specialists. One shared obsession with craft.
          </p>
          <div className="au au4" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn btn-p" onClick={() => go("book")}>{heroData.btn_text}</button>
            <button className="btn btn-o" onClick={() => go("work")}>See Transformations</button>
          </div>
          {/* Stats */}
          <div className="au au4" style={{ display: "flex", gap: 40, marginTop: 56, paddingTop: 40, borderTop: `1px solid ${c.border}` }}>
            {[
              [heroData.stat1_val, heroData.stat1_lbl],
              [heroData.stat2_val, heroData.stat2_lbl],
              [heroData.stat3_val, heroData.stat3_lbl]
            ].map(([v, l]) => (
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
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: c.accent + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: c.accent }}><Trophy size={20} /></div>
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
  );
}
