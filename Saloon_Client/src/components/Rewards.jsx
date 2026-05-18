import { Leaf, Users, Gift, Smartphone } from "lucide-react";
import LoyaltyCard from "./LoyaltyCard";
import GiftCardSection from "./GiftCardSection";

export default function Rewards({ theme, c, go }) {
  return (
    <section id="rewards" style={{ background: c.bg }}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <div>
            <div className="label">Member Benefits</div>
            <h2 className="h2" style={{ marginTop: 12 }}>Velour Loyalty<br />Programme</h2>
            <div className="rule" />
            <p className="body-sm" style={{ marginBottom: 32 }}>Earn points on every visit, referral, and product purchase. Redeem for free services, upgrades, and exclusive experiences.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {[
                [<Leaf size={18} />, "Earn on every visit", "1 point per ₹100 spent on services"],
                [<Users size={18} />, "Referral rewards", "500 pts for every new client you bring"],
                [<Gift size={18} />, "Birthday bonus", "Double points + free add-on in your birthday month"],
                [<Smartphone size={18} />, "Social rewards", "100 pts for tagging us in your transformation"]
              ].map(([em, t, d]) => (
                <div key={t} style={{ display: "flex", gap: 14, padding: "14px 18px", background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 4, alignItems: "center" }}>
                  <span style={{ color: c.accent, display: "flex", alignItems: "center" }}>{em}</span>
                  <div><div style={{ fontSize: 13, fontWeight: 500, color: c.text }}>{t}</div><div style={{ fontSize: 12, color: c.textMuted, marginTop: 2 }}>{d}</div></div>
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
