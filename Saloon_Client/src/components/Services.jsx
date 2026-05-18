import React, { useState } from "react";
import { Star } from "lucide-react";
import { SERVICES } from "../constants/data";
import useFetchData from "../hooks/useFetchData";
import VisualEditorTrigger from "./Admin/VisualEditorTrigger";
import GlobalHeadingEditor from "./Admin/GlobalHeadingEditor";

export default function Services({ c, go }) {
  const [activeSvc, setActiveSvc] = useState(0);
  const { data: dbServices } = useFetchData('services', []);
  
  const groupedServices = React.useMemo(() => {
    if (!dbServices || dbServices.length === 0) return SERVICES;
    
    const groups = {};
    dbServices.forEach(item => {
      const cat = item.category || 'Other';
      if (!groups[cat]) {
        groups[cat] = {
          cat: cat,
          icon: cat.toLowerCase().includes('hair') ? '💇‍♀️' : cat.toLowerCase().includes('nail') ? '💅' : cat.toLowerCase().includes('make') ? '💄' : '✨',
          items: []
        };
      }
      groups[cat].items.push({
        n: item.name,
        d: `${item.desc || ''} (${item.duration || ''})`,
        p: item.price
      });
    });
    return Object.values(groups);
  }, [dbServices]);

  // Handle activeSvc index safety
  const safeActiveIdx = activeSvc >= groupedServices.length ? 0 : activeSvc;
  const currentCategory = groupedServices[safeActiveIdx] || { cat: 'Services', icon: '✨', items: [] };

  return (
    <section id="services" style={{ background: c.bgAlt, position: 'relative' }}>
      <VisualEditorTrigger sectionPath="/admin/services" />
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 52, flexWrap: "wrap", gap: 24 }}>
          <div>
            <div className="label">What We Offer</div>
            <GlobalHeadingEditor slug="services_heading" defaultText="Our Services" />
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {groupedServices.map((s, i) => (
              <button key={i} onClick={() => setActiveSvc(i)} style={{ padding: "7px 16px", borderRadius: 2, border: `1px solid ${safeActiveIdx === i ? c.accent : c.border}`, background: safeActiveIdx === i ? c.accent + "18" : "transparent", color: safeActiveIdx === i ? c.accent : c.textMuted, fontSize: 11, fontWeight: 500, letterSpacing: 0.5, fontFamily: "inherit", transition: "all 0.2s" }}>
                {s.icon} {s.cat}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
          <div style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 6, padding: "28px", height: "fit-content" }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{currentCategory.icon}</div>
            <div className="h2" style={{ fontSize: 24, marginBottom: 8 }}>{currentCategory.cat}</div>
            <div className="rule" />
            <p className="body-sm" style={{ marginBottom: 24 }}>Expert services tailored to your unique look. All services include consultation and aftercare advice.</p>
            <button className="btn btn-p" style={{ width: "100%", justifyContent: "center" }} onClick={() => go("book")}>Book This Service</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 1, borderRadius: 6, overflow: "hidden", border: `1px solid ${c.border}` }}>
            {currentCategory.items.map((item, i) => (
              <div key={i} style={{ background: c.bgCard, padding: "22px 28px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, borderBottom: i < currentCategory.items.length - 1 ? `1px solid ${c.border}` : "none", transition: "background 0.2s" }}
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
              <div style={{ fontSize: 13, color: c.text, display: 'inline-flex', alignItems: 'center', gap: '8px' }}><Star size={14} color={c.accent} /> New clients get <strong>15% off</strong> first visit</div>
              <button className="btn btn-o" style={{ padding: "7px 16px", fontSize: 10 }} onClick={() => go("book")}>Claim →</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
