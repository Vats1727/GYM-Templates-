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

  const filtWork = activeWork === "all" 
    ? portfolio 
    : portfolio.filter((w) => (w.type || 'color').toLowerCase() === activeWork);

  return (
    <section id="work" style={{ background: c.bg, position: 'relative' }}>
      <VisualEditorTrigger sectionPath="/admin/work" />
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div className="label">Portfolio</div>
          <GlobalHeadingEditor slug="work_heading" defaultText="Famous Transformations" />
          <div className="rule" style={{ margin: "20px auto" }} />
          <p className="body-sm" style={{ maxWidth: 500, margin: "0 auto 32px" }}>
            Drag the slider on each card to reveal the before & after. Real clients. Real results.
          </p>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
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
        <div style={{ marginTop: 48, background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 6, padding: "32px 40px", display: "flex", gap: 32, alignItems: "flex-start", flexWrap: 'wrap' }}>
          <div style={{ fontSize: 48, lineHeight: 1, color: c.accent, fontFamily: "Georgia, serif" }}>"</div>
          <div style={{ flex: 1, minWidth: '280px' }}>
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
  );
}
