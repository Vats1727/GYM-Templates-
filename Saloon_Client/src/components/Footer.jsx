export default function Footer({ c }) {
  return (
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
  );
}
