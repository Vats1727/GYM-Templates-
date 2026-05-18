import { useState } from "react";
import { Star } from "lucide-react";
import { SERVICES } from "../constants/data";

export default function Services({ c, go }) {
  const [activeSvc, setActiveSvc] = useState(0);

  return (
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
  );
}
