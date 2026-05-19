import React, { useState } from "react";
import * as LucideIcons from "lucide-react";
import { SERVICES } from "../constants/data";
import useFetchData from "../hooks/useFetchData";
import { getImageUrl } from "../services/api";
import { GROOMING_ICONS } from "../utils/groomingIcons";
import VisualEditorTrigger from "./Admin/VisualEditorTrigger";
import GlobalHeadingEditor from "./Admin/GlobalHeadingEditor";

const renderCategoryIcon = (iconName) => {
  if (!iconName) return '✨';
  // If it's an emoji (length <= 2), render it as-is
  if (iconName.length <= 2) return iconName;
  // If it's a custom grooming icon
  if (GROOMING_ICONS[iconName]) {
    const CustomIcon = GROOMING_ICONS[iconName];
    return <CustomIcon style={{ display: "inline-block", verticalAlign: "middle", width: "1.2em", height: "1.2em" }} />;
  }
  // Otherwise, try to find the Lucide icon
  const IconComponent = LucideIcons[iconName];
  if (IconComponent) {
    return <IconComponent size={14} style={{ display: "inline-block", verticalAlign: "middle" }} />;
  }
  return '✨';
};

export default function Services({ c, go }) {
  const [activeSvc, setActiveSvc] = useState(0);
  const { data: dbServices } = useFetchData('services', []);
  const { data: dbHeading } = useFetchData('services_heading', []);

  const headingDesc = dbHeading && dbHeading.length > 0 && dbHeading[0].desc
    ? dbHeading[0].desc
    : "Expert services tailored to your unique look. All services include consultation and aftercare advice.";
  
  const groupedServices = React.useMemo(() => {
    if (!dbServices || dbServices.length === 0) return SERVICES;
    
    const groups = {};
    dbServices.forEach(item => {
      const cat = item.category || 'Other';
      if (!groups[cat]) {
        groups[cat] = {
          cat: cat,
          icon: item.icon || '✨',
          items: []
        };
      }
      
      if (item.features) {
        try {
          const nestedItems = Array.isArray(item.features) 
            ? item.features 
            : JSON.parse(item.features);
          (nestedItems || []).forEach(itm => {
            groups[cat].items.push({
              n: itm.n || itm.name || '',
              p: itm.p || itm.price || '',
              d: itm.d || itm.desc || '',
              duration: itm.duration || '',
              image: itm.image ? getImageUrl(itm.image) : ''
            });
          });
        } catch (e) {
          groups[cat].items.push({
            n: item.name || '',
            p: item.price || '',
            d: item.desc || '',
            duration: item.duration || '',
            image: item.image ? getImageUrl(item.image) : ''
          });
        }
      } else {
        groups[cat].items.push({
          n: item.name || '',
          p: item.price || '',
          d: item.desc || '',
          duration: item.duration || '',
          image: item.image ? getImageUrl(item.image) : ''
        });
      }
    });
    return Object.values(groups);
  }, [dbServices]);

  // Handle activeSvc index safety
  const safeActiveIdx = activeSvc >= groupedServices.length ? 0 : activeSvc;
  const currentCategory = groupedServices[safeActiveIdx] || { cat: 'Services', icon: '✨', items: [] };
  const displayItems = currentCategory.items || [];

  return (
    <section id="services" style={{ background: c.bgAlt, position: 'relative' }}>
      <VisualEditorTrigger sectionPath="/admin/services" />
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 52, flexWrap: "wrap", gap: 24 }}>
          <div>
            <GlobalHeadingEditor slug="services_heading" defaultText="Our Services" defaultTag="What We Offer" />
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {groupedServices.map((s, i) => (
              <button key={i} onClick={() => setActiveSvc(i)} style={{ padding: "7px 16px", borderRadius: 2, border: `1px solid ${safeActiveIdx === i ? c.accent : c.border}`, background: safeActiveIdx === i ? c.accent + "18" : "transparent", color: safeActiveIdx === i ? c.accent : c.textMuted, fontSize: 11, fontWeight: 500, letterSpacing: 0.5, fontFamily: "inherit", transition: "all 0.2s" }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  {renderCategoryIcon(s.icon)}
                  <span>{s.cat}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {displayItems.map((item, i) => (
            <div key={i} className="card" style={{ padding: "0", overflow: "hidden", border: `1px solid ${c.border}`, borderRadius: 8, background: c.bgCard, display: "flex", flexDirection: "column", height: "100%", transition: "all 0.3s ease" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = c.accent;
                e.currentTarget.style.boxShadow = `0 10px 20px ${c.accent}12`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = c.border;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Image / Icon Header */}
              <div style={{ height: "180px", width: "100%", background: c.bgAlt, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {item.image ? (
                  <img src={item.image} alt={item.n} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", color: c.accent }}>
                    <div style={{ fontSize: "28px" }}>{renderCategoryIcon(currentCategory.icon)}</div>
                    <span style={{ fontSize: "9px", color: c.textMuted, letterSpacing: "1px", textTransform: "uppercase", fontWeight: "600" }}>{currentCategory.cat}</span>
                  </div>
                )}
                
                {/* Price Tag Badge */}
                <div style={{ position: "absolute", top: "12px", right: "12px", background: c.accent, color: c.accentText, padding: "4px 10px", fontSize: "11px", fontWeight: "700", borderRadius: "4px", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
                  {item.p}
                </div>

                {/* Duration Badge */}
                {item.duration && (
                  <div style={{ position: "absolute", bottom: "12px", left: "12px", background: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(4px)", color: "#fff", padding: "3px 8px", fontSize: "9px", fontWeight: "500", borderRadius: "3px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    ⏱️ {item.duration}
                  </div>
                )}
              </div>
              
              {/* Content Area */}
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <div style={{ fontSize: "16px", fontWeight: "600", color: c.text, marginBottom: "8px" }}>
                  {item.n}
                </div>
                <p style={{ color: c.textMuted, fontSize: "12.5px", lineHeight: "1.6", marginBottom: "20px", flexGrow: 1 }}>
                  {item.d || "No description provided."}
                </p>
                <button className="btn btn-p" style={{ width: "100%", justifyContent: "center", fontSize: "11px", padding: "8px 16px" }} onClick={() => go("book")}>
                  Book Service
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Promo banner below cards */}
        <div style={{ marginTop: "32px", background: c.accent + "12", padding: "18px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: "6px", border: `1px solid ${c.border}` }}>
          <div style={{ fontSize: "13px", color: c.text, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <LucideIcons.Star size={14} color={c.accent} /> New clients get <strong>15% off</strong> first visit
          </div>
          <button className="btn btn-o" style={{ padding: "7px 16px", fontSize: "10px" }} onClick={() => go("book")}>Claim →</button>
        </div>
      </div>
    </section>
  );
}
