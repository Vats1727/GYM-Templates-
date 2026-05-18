import React from "react";
import { Sun, Moon } from "lucide-react";
import useFetchData from "../hooks/useFetchData";
import VisualEditorTrigger from "./Admin/VisualEditorTrigger";

export default function Navbar({ theme, setTheme, scrolled, go, c, NAVLINKS }) {
  const { data: dbNavbar } = useFetchData('navbar/active', []);
  const navData = dbNavbar && dbNavbar.length > 0 ? dbNavbar[0] : {
    logo_text: "Velour",
    btn_text: "Book Now"
  };

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 999, background: scrolled ? c.nav : "transparent", backdropFilter: "blur(24px)", borderBottom: scrolled ? `1px solid ${c.border}` : "none", transition: "all 0.35s", padding: "0 28px" }} id="navbar">
      <VisualEditorTrigger sectionPath="/admin/navbar" />
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <button onClick={() => go("hero")} style={{ fontFamily: "'Lora', serif", fontSize: 21, fontWeight: 600, color: c.text, background: "none", border: "none", letterSpacing: 0.5 }}>
          {navData.logo_text}<span style={{ color: c.accent }}>.</span>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div style={{ display: "flex", gap: 28, flexWrap: 'wrap' }}>
            {NAVLINKS.map((l) => (
              <button key={l.id} onClick={() => go(l.id)} style={{ background: "none", border: "none", fontSize: 12, fontWeight: 500, letterSpacing: 0.5, color: c.textMuted, fontFamily: "'Inter', sans-serif", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.target.style.color = c.text)} onMouseLeave={(e) => (e.target.style.color = c.textMuted)}>
                {l.label}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} style={{ width: 36, height: 36, borderRadius: "50%", background: c.bgCard, border: `1px solid ${c.border}`, color: c.accent, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button className="btn btn-p" style={{ padding: "8px 18px", fontSize: 11 }} onClick={() => go("book")}>{navData.btn_text}</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
