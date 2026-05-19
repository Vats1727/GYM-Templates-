import React from "react";
import Stars from "./Stars";
import { REVIEWS, PRESS } from "../constants/data";
import useFetchData from "../hooks/useFetchData";
import VisualEditorTrigger from "./Admin/VisualEditorTrigger";
import GlobalHeadingEditor from "./Admin/GlobalHeadingEditor";

export default function Reviews({ c, go }) {
  const { data: dbReviews } = useFetchData('reviews', []);

  const items = dbReviews && dbReviews.length > 0
    ? dbReviews.map(r => ({
        name: r.name,
        service: r.service || "Precision Style",
        text: r.comment || r.text || "",
        rating: Number(r.rating || 5),
        date: r.date || "Just now"
      }))
    : REVIEWS.map(r => ({ ...r, rating: 5 }));

  return (
    <section id="reviews" style={{ background: c.bg, position: 'relative' }}>
      <VisualEditorTrigger sectionPath="/admin/reviews" />
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
          <div>
            <GlobalHeadingEditor slug="reviews_heading" defaultText="What Clients Say" defaultTag="Client Stories" />
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
          {items.map((r, i) => (
            <div key={i} className="card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Stars n={r.rating} />
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
  );
}
