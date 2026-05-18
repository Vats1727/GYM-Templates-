import { useState } from "react";
import { T } from "../constants/data";

export default function GiftCardSection({ theme }) {
  const c = T[theme];
  const [amt, setAmt] = useState(1500);
  const [msg, setMsg] = useState("");
  const presets = [500, 1000, 1500, 2500, 5000];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      <div>
        <div style={{ fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: c.textMuted, marginBottom: 16 }}>Choose Amount</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          {presets.map((p) => (
            <button key={p} onClick={() => setAmt(p)} style={{ padding: "8px 16px", borderRadius: 2, border: `1px solid ${amt === p ? c.accent : c.border}`, background: amt === p ? c.accent + "20" : "transparent", color: amt === p ? c.accent : c.textMuted, cursor: "pointer", fontSize: 13, fontWeight: amt === p ? 600 : 400, fontFamily: "inherit", transition: "all 0.2s" }}>
              ₹{p.toLocaleString()}
            </button>
          ))}
        </div>
        <div style={{ fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: c.textMuted, marginBottom: 8 }}>Personal Message (optional)</div>
        <textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Treat yourself or someone you love..." rows={3} style={{ width: "100%", padding: "12px 14px", borderRadius: 2, background: c.bgAlt, border: `1px solid ${c.border}`, color: c.text, fontFamily: "inherit", fontSize: 14, resize: "none", outline: "none" }} />
        <button style={{ marginTop: 16, width: "100%", padding: "14px", background: c.accent, color: c.accentText, border: "none", borderRadius: 2, cursor: "pointer", fontSize: 13, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "inherit", transition: "all 0.2s" }}>
          Purchase Gift Card →
        </button>
      </div>
      <div style={{ background: `linear-gradient(135deg, ${c.accentDim}30, ${c.accent}15)`, border: `1px solid ${c.borderStrong}`, borderRadius: 8, padding: "28px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 200 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 700, color: c.text }}>Velour<span style={{ color: c.accent }}>.</span></div>
          <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: c.textMuted, background: c.bgCard, padding: "4px 10px", borderRadius: 20 }}>Gift Card</div>
        </div>
        <div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 36, fontWeight: 700, color: c.accent }}>₹{amt.toLocaleString()}</div>
          {msg && <div style={{ fontSize: 13, color: c.textMuted, marginTop: 8, fontStyle: "italic", lineHeight: 1.5 }}>"{msg}"</div>}
          <div style={{ fontSize: 11, color: c.textFaint, marginTop: 12 }}>Valid 12 months · All services</div>
        </div>
      </div>
    </div>
  );
}
