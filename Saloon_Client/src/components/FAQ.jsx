import { useState } from "react";
import { FAQS } from "../constants/data";

export default function FAQ({ c }) {
  const [openFaq, setOpenFaq] = useState(null);

  return (
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
  );
}
