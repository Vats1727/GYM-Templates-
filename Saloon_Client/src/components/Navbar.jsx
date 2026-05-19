import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import useFetchData from "../hooks/useFetchData";
import VisualEditorTrigger from "./Admin/VisualEditorTrigger";

export default function Navbar({ theme, setTheme, scrolled, go, c, NAVLINKS }) {
  const { data: dbNavbar } = useFetchData('navbar/active', []);
  const [width, setWidth] = useState(window.innerWidth);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = width <= 768;

  const navData = dbNavbar && dbNavbar.length > 0 ? {
    logo_text: dbNavbar[0].logo_text || "Velour",
    logo_accent: dbNavbar[0].logo_accent || ".",
    btn_text: dbNavbar[0].cta_text || "Book Now"
  } : {
    logo_text: "Velour",
    logo_accent: ".",
    btn_text: "Book Now"
  };

  const handleMobileNavClick = (target) => {
    setMenuOpen(false);
    go(target);
  };

  return (
    <>
      <nav style={{ 
        position: "fixed", 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 999, 
        background: scrolled ? c.nav : "transparent", 
        backdropFilter: "blur(24px)", 
        borderBottom: scrolled ? `1px solid ${c.border}` : "none", 
        transition: "all 0.35s", 
        padding: "0 20px" 
      }} id="navbar">
        <VisualEditorTrigger sectionPath="/admin/navbar" />
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          
          {/* Logo */}
          <button onClick={() => go("hero")} style={{ fontFamily: "'Lora', serif", fontSize: 21, fontWeight: 600, color: c.text, background: "none", border: "none", letterSpacing: 0.5, cursor: "pointer" }}>
            {navData.logo_text}<span style={{ color: c.accent }}>{navData.logo_accent}</span>
          </button>

          {/* Desktop Navigation Links */}
          {!isMobile && (
            <div style={{ display: "flex", gap: 28 }}>
              {NAVLINKS.map((l) => (
                <button key={l.id} onClick={() => go(l.id)} style={{ background: "none", border: "none", fontSize: 12, fontWeight: 500, letterSpacing: 0.5, color: c.textMuted, fontFamily: "'Inter', sans-serif", transition: "color 0.2s", cursor: "pointer" }}
                  onMouseEnter={(e) => (e.target.style.color = c.text)} onMouseLeave={(e) => (e.target.style.color = c.textMuted)}>
                  {l.label}
                </button>
              ))}
            </div>
          )}

          {/* Navbar Right Actions (Desktop) */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} style={{ width: 36, height: 36, borderRadius: "50%", background: c.bgCard, border: `1px solid ${c.border}`, color: c.accent, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", cursor: "pointer" }}>
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {!isMobile && (
              <button className="btn btn-p" style={{ padding: "8px 18px", fontSize: 11 }} onClick={() => go("book")}>
                {navData.btn_text}
              </button>
            )}

            {/* Mobile Hamburger Menu Trigger */}
            {isMobile && (
              <button 
                onClick={() => setMenuOpen(!menuOpen)} 
                aria-label="Toggle Navigation Menu"
                style={{ 
                  width: 36, 
                  height: 36, 
                  borderRadius: "50%", 
                  background: c.bgCard, 
                  border: `1px solid ${c.border}`, 
                  color: c.text, 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  cursor: "pointer" 
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            )}
          </div>

        </div>
      </nav>

      {/* Full-Screen Backdrop Blurred Mobile Drawer */}
      {isMobile && menuOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 10000,
          background: "rgba(10, 10, 10, 0.95)",
          backdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          padding: "24px 30px",
          boxSizing: "border-box"
        }}>
          {/* Header area in Drawer */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 60 }}>
            <span style={{ fontFamily: "'Lora', serif", fontSize: 22, fontWeight: 600, color: "#fff" }}>
              {navData.logo_text}<span style={{ color: c.accent }}>{navData.logo_accent}</span>
            </span>
            <button 
              onClick={() => setMenuOpen(false)}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
                border: "none",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Links list in Drawer */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {NAVLINKS.map((l) => (
              <button 
                key={l.id} 
                onClick={() => handleMobileNavClick(l.id)} 
                style={{ 
                  background: "none", 
                  border: "none", 
                  fontSize: 24, 
                  fontFamily: "'Lora', serif", 
                  color: "#fff", 
                  textAlign: "left", 
                  padding: 0,
                  cursor: "pointer"
                }}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Footer Area with Book Now button */}
          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 20 }}>
            <button 
              className="btn btn-p" 
              style={{ padding: "16px", fontSize: 13, width: "100%", justifyContent: "center" }} 
              onClick={() => handleMobileNavClick("book")}
            >
              {navData.btn_text}
            </button>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textAlign: "center" }}>
              © {new Date().getFullYear()} {navData.logo_text} Studio
            </div>
          </div>

        </div>
      )}
    </>
  );
}
