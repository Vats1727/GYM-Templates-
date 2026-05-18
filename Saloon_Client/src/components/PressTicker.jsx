import React from "react";
import * as LucideIcons from "lucide-react";
import { AWARDS } from "../constants/data";
import useFetchData from "../hooks/useFetchData";
import VisualEditorTrigger from "./Admin/VisualEditorTrigger";

export default function PressTicker({ c }) {
  const { data: tickerItems } = useFetchData('ticker', []);
  
  // Transform or fallback
  const items = tickerItems && tickerItems.length > 0 
    ? tickerItems.map(item => ({ title: item.text, body: "Special Mention", icon: item.icon || "Trophy" }))
    : AWARDS.map(a => ({ title: a.title, body: `${a.body} · ${a.year}`, icon: "Trophy" }));

  return (
    <div style={{ position: 'relative', background: c.accent, padding: "12px 0", overflow: "hidden", borderTop: `1px solid ${c.accentHover}`, borderBottom: `1px solid ${c.accentDim}` }} id="ticker">
      <VisualEditorTrigger sectionPath="/admin/ticker" />
      <div style={{ display: "flex", gap: 0, animation: "ticker 18s linear infinite", width: "max-content" }}>
        {[...items, ...items].map((a, i) => {
          const IconComponent = LucideIcons[a.icon] || LucideIcons.Trophy;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 40px", whiteSpace: "nowrap" }}>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: c.accentText, display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <IconComponent size={14} /> {a.title}
              </span>
              <span style={{ fontSize: 11, color: c.accentText + "AA" }}>{a.body}</span>
              <span style={{ color: c.accentText + "44", fontSize: 18 }}>◆</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
