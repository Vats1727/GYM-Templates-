import { useState } from "react";
import { Gift, Star, Smile, Crown, Award, Sparkles, Leaf, Scissors } from "lucide-react";
import { T } from "../constants/data";
import useFetchData from "../hooks/useFetchData";

const renderIcon = (name) => {
  const n = (name || "").toLowerCase();
  if (n === "star") return <Star size={16} />;
  if (n === "smile") return <Smile size={16} />;
  if (n === "crown") return <Crown size={16} />;
  if (n === "award") return <Award size={16} />;
  if (n === "sparkles") return <Sparkles size={16} />;
  if (n === "leaf") return <Leaf size={16} />;
  if (n === "scissors") return <Scissors size={16} />;
  return <Gift size={16} />;
};

export default function LoyaltyCard({ theme }) {
  const c = T[theme];
  const [pts, setPts] = useState(340);
  const { data: dbRewards } = useFetchData('rewards', []);

  const tiers = [
    { name: "Leaf", min: 0, max: 300, col: "#6B9E77" },
    { name: "Fern", min: 300, max: 700, col: "#3D8B5E" },
    { name: "Orchid", min: 700, max: 1200, col: "#9E6B8A" },
    { name: "Gold Leaf", min: 1200, max: 2000, col: "#B89A45" },
  ];
  const tier = tiers.find((t) => pts >= t.min && pts < t.max) || tiers[3];
  const next = tiers[tiers.indexOf(tier) + 1];
  const pct = next ? ((pts - tier.min) / (next.min - tier.min)) * 100 : 100;

  const defaultRewards = [
    { title: "Free Add-on", desc: "at 500 pts", points: 500, icon: "Gift" },
    { title: "15% Off", desc: "at 800 pts", points: 800, icon: "Star" },
    { title: "Free Facial", desc: "at 1200 pts", points: 1200, icon: "Smile" },
    { title: "VIP Day", desc: "at 2000 pts", points: 2000, icon: "Crown" }
  ];

  const rewardsList = dbRewards && dbRewards.length > 0
    ? dbRewards.map(item => {
        const parsedPts = parseInt(item.points) || 500;
        return {
          title: item.title || "Reward",
          desc: item.desc || `at ${parsedPts} pts`,
          points: parsedPts,
          icon: item.icon || "Gift"
        };
      })
    : defaultRewards;

  return (
    <div style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 8, overflow: "hidden" }}>
      <div style={{ background: `linear-gradient(135deg, ${tier.col}22, ${tier.col}08)`, padding: "24px 28px", borderBottom: `1px solid ${c.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: c.textMuted, marginBottom: 4 }}>Velour Loyalty</div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 22, color: tier.col }}>{tier.name} Member</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 32, fontWeight: 600, color: tier.col, lineHeight: 1 }}>{pts}</div>
            <div style={{ fontSize: 11, color: c.textMuted }}>points</div>
          </div>
        </div>
        <div style={{ height: 6, borderRadius: 3, background: c.bgAlt, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: tier.col, borderRadius: 3, transition: "width 0.5s" }} />
        </div>
        {next && <div style={{ fontSize: 11, color: c.textMuted, marginTop: 6 }}>{next.min - pts} pts to {next.name}</div>}
      </div>
      <div style={{ padding: "16px 28px" }}>
        <div style={{ fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: c.textMuted, marginBottom: 12 }}>Simulate Points</div>
        <input type="range" min={0} max={2000} step={10} value={pts} onChange={(e) => setPts(+e.target.value)} style={{ width: "100%", accentColor: tier.col }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 16 }}>
          {rewardsList.map((r) => (
            <div key={r.title} style={{ padding: "10px 12px", background: c.bgAlt, borderRadius: 4, display: "flex", gap: 8, alignItems: "center", opacity: pts >= r.points ? 1 : 0.4 }}>
              <span style={{ display: "inline-flex", color: c.accent }}>{renderIcon(r.icon)}</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: c.text }}>{r.title}</div>
                <div style={{ fontSize: 10, color: c.textMuted }}>{r.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
