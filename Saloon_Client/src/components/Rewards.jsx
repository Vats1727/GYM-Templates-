import React from "react";
import { Leaf, Users, Gift, Smartphone } from "lucide-react";
import LoyaltyCard from "./LoyaltyCard";
import GiftCardSection from "./GiftCardSection";
import useFetchData from "../hooks/useFetchData";
import VisualEditorTrigger from "./Admin/VisualEditorTrigger";
import GlobalHeadingEditor from "./Admin/GlobalHeadingEditor";

export default function Rewards({ theme, c, go }) {
  const { data: dbRewards } = useFetchData('rewards', []);

  const defaultBenefits = [
    { title: "Earn on every visit", desc: "1 point per ₹100 spent on services", icon: "Leaf" },
    { title: "Referral rewards", desc: "500 pts for every new client you bring", icon: "Users" },
    { title: "Birthday bonus", desc: "Double points + free add-on in your birthday month", icon: "Gift" },
    { title: "Social rewards", desc: "100 pts for tagging us in your transformation", icon: "Smartphone" }
  ];

  const benefits = dbRewards && dbRewards.length > 0
    ? dbRewards.map(item => ({
        title: item.title,
        desc: item.benefit || item.desc,
        icon: item.icon || "Gift"
      }))
    : defaultBenefits;

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'Leaf': return <Leaf size={18} />;
      case 'Users': return <Users size={18} />;
      case 'Smartphone': return <Smartphone size={18} />;
      default: return <Gift size={18} />;
    }
  };

  return (
    <section id="rewards" style={{ background: c.bg, position: 'relative' }}>
      <VisualEditorTrigger sectionPath="/admin/rewards" />
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 64, alignItems: "start" }}>
          <div>
            <div className="label">Member Benefits</div>
            <GlobalHeadingEditor slug="rewards_heading" defaultText="Velour Loyalty Programme" />
            <div className="rule" />
            <p className="body-sm" style={{ marginBottom: 32 }}>Earn points on every visit, referral, and product purchase. Redeem for free services, upgrades, and exclusive experiences.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {benefits.map((b) => (
                <div key={b.title} style={{ display: "flex", gap: 14, padding: "14px 18px", background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 4, alignItems: "center" }}>
                  <span style={{ color: c.accent, display: "flex", alignItems: "center" }}>{renderIcon(b.icon)}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: c.text }}>{b.title}</div>
                    <div style={{ fontSize: 12, color: c.textMuted, marginTop: 2 }}>{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-p" onClick={() => go("book")}>Join Free — Book First Visit</button>
          </div>
          <div>
            <LoyaltyCard theme={theme} />
          </div>
        </div>

        {/* ── GIFT CARDS ── */}
        <div style={{ marginTop: 72, paddingTop: 64, borderTop: `1px solid ${c.border}` }}>
          <div style={{ marginBottom: 36 }}>
            <div className="label">Give the Gift of Beauty</div>
            <h2 className="h2" style={{ marginTop: 12 }}>Gift Cards</h2>
            <div className="rule" />
            <p className="body-sm">Delivered digitally. Valid for all services. The perfect gift for anyone who deserves a little luxury.</p>
          </div>
          <GiftCardSection theme={theme} />
        </div>
      </div>
    </section>
  );
}
