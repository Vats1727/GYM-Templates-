import React, { useState } from "react";
import { WORKS } from "../constants/data";
import BASlider from "./BASlider";
import Av from "./Av";
import useFetchData from "../hooks/useFetchData";
import VisualEditorTrigger from "./Admin/VisualEditorTrigger";
import GlobalHeadingEditor from "./Admin/GlobalHeadingEditor";

export default function Work({ theme, c, go }) {
  const [activeWork, setActiveWork] = useState("all");
  const { data: dbWork } = useFetchData('work', []);

  const portfolio = dbWork && dbWork.length > 0 ? dbWork : WORKS;

  // Dynamically extract unique categories from the database items
  const categories = React.useMemo(() => {
    const uniqueTypes = new Set();
    uniqueTypes.add("all");
    portfolio.forEach((w) => {
      if (w.type) {
        uniqueTypes.add(w.type.toLowerCase().trim());
      }
    });
    return Array.from(uniqueTypes);
  }, [portfolio]);

  const filtWork = activeWork === "all" 
    ? portfolio 
    : portfolio.filter((w) => (w.type || 'color').toLowerCase().trim() === activeWork);

  return (
    <section id="work" style={{ background: c.bg, position: 'relative' }}>
      <VisualEditorTrigger sectionPath="/admin/work" />
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <GlobalHeadingEditor slug="work_heading" defaultText="Famous Transformations" defaultTag="Portfolio" centered />
          <div className="rule" style={{ margin: "20px auto 32px" }} />
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            {categories.map((f) => (
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
        {(() => {
          const { data: dbReviews } = useFetchData('reviews', []);
          const featured = dbReviews && dbReviews.length > 0 
            ? dbReviews[0] 
            : {
                comment: "I've been to salons in Mumbai, Delhi, and London. Velour is the only place that consistently delivers results that exceed what I imagined. The before/after difference isn't incremental — it's complete reinvention.",
                name: "Sneha Nair",
                service: "Fashion Director, Femina India"
              };
          const getInitials = (name) => {
            if (!name) return "SN";
            return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
          };
          return (
            <div style={{ marginTop: 48, background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 6, padding: "32px 40px", display: "flex", gap: 32, alignItems: "flex-start", flexWrap: 'wrap' }}>
              <div style={{ fontSize: 48, lineHeight: 1, color: c.accent, fontFamily: "Georgia, serif" }}>"</div>
              <div style={{ flex: 1, minWidth: '280px' }}>
                <p style={{ fontFamily: "'Lora', serif", fontSize: 19, fontStyle: "italic", color: c.text, lineHeight: 1.65, marginBottom: 16 }}>
                  {featured.comment || featured.text}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Av init={getInitials(featured.name)} col={c.accent} size={40} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{featured.name}</div>
                    <div style={{ fontSize: 12, color: c.textMuted }}>{featured.service}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
