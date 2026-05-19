import React from "react";
import useFetchData from "../hooks/useFetchData";
import VisualEditorTrigger from "./Admin/VisualEditorTrigger";

export default function Footer({ c }) {
  const { data: dbFooter } = useFetchData('footer/active', []);
  const footerData = dbFooter && dbFooter.length > 0 ? {
    logo_text: dbFooter[0].logo_text || "Velour",
    logo_accent: dbFooter[0].logo_accent || ".",
    tagline: dbFooter[0].description || "Ahmedabad's award-winning beauty studio. Where craft meets care.",
    facebook_url: dbFooter[0].fb_link || "#",
    instagram_url: dbFooter[0].ig_link || "#",
    twitter_url: dbFooter[0].tw_link || "#",
    youtube_url: dbFooter[0].yt_link || "#",
    address_line1: dbFooter[0].address_line1 || "123 Law Garden Road",
    address_line2: dbFooter[0].address_line2 || "Ahmedabad, Gujarat 380009",
    hours_line1: dbFooter[0].hours_line1 || "Mon–Sat: 10am – 8pm",
    hours_line2: dbFooter[0].hours_line2 || "Sunday: 11am – 6pm",
    phone_number: dbFooter[0].phone_number || "+91 79 555 0199",
    copyright_text: `© ${new Date().getFullYear()} ${dbFooter[0].logo_text || "Velour"} Studio · All rights reserved · Ahmedabad, Gujarat`
  } : {
    logo_text: "Velour",
    logo_accent: ".",
    tagline: "Ahmedabad's award-winning beauty studio. Where craft meets care.",
    facebook_url: "#",
    instagram_url: "#",
    twitter_url: "#",
    youtube_url: "#",
    address_line1: "123 Law Garden Road",
    address_line2: "Ahmedabad, Gujarat 380009",
    hours_line1: "Mon–Sat: 10am – 8pm",
    hours_line2: "Sunday: 11am – 6pm",
    phone_number: "+91 79 555 0199",
    copyright_text: `© ${new Date().getFullYear()} Velour Studio · All rights reserved · Ahmedabad, Gujarat`
  };

  // High-fidelity Inline SVGs for social accounts
  const socialLinks = [
    { 
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ), 
      url: footerData.instagram_url, 
      label: "Instagram" 
    },
    { 
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ), 
      url: footerData.facebook_url, 
      label: "Facebook" 
    },
    { 
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      ), 
      url: footerData.twitter_url, 
      label: "Twitter" 
    },
    { 
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.95 1.96C5.12 19.5 12 19.5 12 19.5s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
        </svg>
      ), 
      url: footerData.youtube_url, 
      label: "Youtube" 
    }
  ];

  return (
    <footer style={{ background: c.bgAlt, borderTop: `1px solid ${c.border}`, padding: "64px 0 28px", position: 'relative' }} id="footer">
      <VisualEditorTrigger sectionPath="/admin/footer" />
      <div className="wrap">
        
        {/* Responsive Footer Columns */}
        <div className="footer-grid">
          
          {/* Logo & Tagline column */}
          <div>
            <div style={{ fontFamily: "'Lora', serif", fontSize: 24, fontWeight: 600, color: c.text, marginBottom: 14, letterSpacing: 0.5 }}>
              {footerData.logo_text}<span style={{ color: c.accent }}>{footerData.logo_accent}</span>
            </div>
            <p style={{ fontSize: 13, color: c.textMuted, lineHeight: 1.8, marginBottom: 20, maxWidth: 280 }}>
              {footerData.tagline}
            </p>
            
            {/* Social Media Links with Inline SVGs */}
            <div style={{ display: "flex", gap: 10 }}>
              {socialLinks.map((s, idx) => (
                <a 
                  key={idx} 
                  href={s.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={s.label}
                  style={{ 
                    width: 36, 
                    height: 36, 
                    borderRadius: "50%", 
                    border: `1.5px solid ${c.border}`, 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    color: c.textMuted, 
                    cursor: "pointer", 
                    transition: "all 0.25s", 
                    textDecoration: 'none' 
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.accent; e.currentTarget.style.color = c.accent; e.currentTarget.style.transform = "scale(1.05)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.textMuted; e.currentTarget.style.transform = "scale(1)"; }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Details Columns */}
          {[
            { h: "Services", ls: ["Haircuts & Styling", "Color & Balayage", "Grooming", "Skincare", "Bridal Packages"] },
            { h: "Visit Us", ls: [footerData.address_line1, footerData.address_line2, footerData.phone_number] },
            { h: "Timing", ls: [footerData.hours_line1, footerData.hours_line2] },
          ].map((col) => (
            <div key={col.h}>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: c.accent, marginBottom: 18, fontWeight: 700 }}>
                {col.h}
              </div>
              {col.ls.map((l, lIdx) => (
                <div key={lIdx} style={{ fontSize: 13, color: c.textMuted, marginBottom: 12, cursor: "default", lineHeight: 1.5 }}>
                  {l}
                </div>
              ))}
            </div>
          ))}

        </div>

        {/* Premium Newsletter Box */}
        <div style={{ 
          padding: "32px 40px", 
          background: `linear-gradient(135deg, ${c.bgCard}, ${c.bgAlt})`, 
          border: `1.5px solid ${c.borderStrong}`, 
          borderRadius: 8, 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          gap: 24, 
          marginBottom: 36, 
          flexWrap: "wrap",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
        }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 4, letterSpacing: 0.5 }}>Stay in the loop</div>
            <div style={{ fontSize: 13, color: c.textMuted }}>Tips, trends, and exclusive member offers — no spam, ever.</div>
          </div>
          <div style={{ display: "flex", gap: 10, flex: "0 1 auto", minWidth: 280, width: "100%", maxWidth: 400 }}>
            <input 
              type="email" 
              placeholder="your@email.com" 
              style={{ 
                padding: "12px 18px", 
                borderRadius: 4, 
                background: c.bgAlt, 
                border: `1.5px solid ${c.border}`, 
                color: c.text, 
                fontSize: 13, 
                width: "100%",
                outline: "none",
                transition: "border-color 0.2s"
              }} 
              onFocus={(e) => e.target.style.borderColor = c.accent}
              onBlur={(e) => e.target.style.borderColor = c.border}
            />
            <button className="btn btn-p" style={{ padding: "12px 24px", fontSize: 11, display: "flex", alignItems: "center", gap: 8, borderRadius: 4 }}>
              Subscribe 
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom copyright block */}
        <div style={{ borderTop: `1.5px solid ${c.border}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 12, color: c.textFaint }}>{footerData.copyright_text}</div>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms", "Accessibility"].map((l) => (
              <div 
                key={l} 
                style={{ fontSize: 12, color: c.textFaint, cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={(e) => e.target.style.color = c.textMuted}
                onMouseLeave={(e) => e.target.style.color = c.textFaint}>
                {l}
              </div>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
