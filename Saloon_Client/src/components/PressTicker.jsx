import { Trophy } from "lucide-react";
import { AWARDS } from "../constants/data";

export default function PressTicker({ c }) {
  return (
    <div style={{ background: c.accent, padding: "12px 0", overflow: "hidden", borderTop: `1px solid ${c.accentHover}`, borderBottom: `1px solid ${c.accentDim}` }}>
      <div style={{ display: "flex", gap: 0, animation: "ticker 18s linear infinite", width: "max-content" }}>
        {[...AWARDS, ...AWARDS].map((a, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 40px", whiteSpace: "nowrap" }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: c.accentText }}><Trophy size={20} /> {a.title}</span>
            <span style={{ fontSize: 11, color: c.accentText + "AA" }}>{a.body} · {a.year}</span>
            <span style={{ color: c.accentText + "44", fontSize: 18 }}>◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}
