import { Phone, Calendar } from "lucide-react";

export default function FloatingCTA({ c, go }) {
  return (
    <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 998, display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}>
      <div style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 6, padding: "10px 14px", fontSize: 12, color: c.textMuted, backdropFilter: "blur(12px)", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
        <Phone size={14} style={{ color: c.accent }} /> <span>+91 98765 43210</span>
      </div>
      <button className="btn btn-p animate-cta" onClick={() => go("book")} style={{ padding: "14px 24px", borderRadius: 28, boxShadow: `0 4px 20px ${c.accent}40`, display: "flex", alignItems: "center", gap: 8, transition: "all 0.3s" }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05) translateY(-2px)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1) translateY(0)"}>
        <Calendar size={15} /> <span>Book Now</span>
      </button>
    </div>
  );
}
