import { useState } from "react";
import { STAFF } from "../constants/data";
import Av from "./Av";

export default function Team({ c, bk, setBk, go }) {
  const [activeTab, setActiveTab] = useState("all");
  const filtStaff = activeTab === "all" ? STAFF : STAFF.filter((s) => s.type === activeTab);

  return (
    <section id="team" style={{ background: c.bgAlt }}>
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
          <div>
            <div className="label">The Artists</div>
            <h2 className="h2" style={{ marginTop: 12 }}>Meet Your Stylists</h2>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {[["all", "All"], ["barber", "Barbers"], ["beauty", "Beauticians"]].map(([v, l]) => (
              <button key={v} onClick={() => setActiveTab(v)} style={{ padding: "7px 18px", borderRadius: 2, border: `1px solid ${activeTab === v ? c.accent : c.border}`, background: activeTab === v ? c.accent + "18" : "transparent", color: activeTab === v ? c.accent : c.textMuted, fontSize: 11, fontFamily: "inherit", transition: "all 0.2s" }}>{l}</button>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 20 }}>
          {filtStaff.map((m) => (
            <div key={m.name} className="card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", gap: 16, marginBottom: 18 }}>
                <Av init={m.init} col={m.col} size={56} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: c.text }}>{m.name}</div>
                      <div style={{ fontSize: 13, color: c.accent, marginTop: 2 }}>{m.role}</div>
                    </div>
                    <div className="pill" style={{ background: m.type === "barber" ? "#3D7A5820" : "#7A3D5820", color: m.type === "barber" ? "#7EC8A0" : "#C87EA0" }}>{m.type}</div>
                  </div>
                  <div style={{ fontSize: 11, color: c.textFaint, marginTop: 4, letterSpacing: 0.5 }}>{m.exp} experience</div>
                </div>
              </div>
              <div style={{ padding: "10px 12px", background: c.bgAlt, borderRadius: 3, fontSize: 12, color: c.textMuted, marginBottom: 16 }}>
                <span style={{ color: c.accent }}>Speciality: </span>{m.specialty}
              </div>
              {/* Time slots */}
              <div style={{ fontSize: 11, color: c.textMuted, marginBottom: 8, letterSpacing: 0.5 }}>Available slots today</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {m.slots.map((sl) => (
                  <button key={sl} onClick={() => { setBk({ ...bk, staff: m.name, time: sl }); go("book"); }} style={{ padding: "5px 10px", border: `1px solid ${c.border}`, borderRadius: 3, background: "transparent", color: c.textMuted, fontSize: 11, fontFamily: "inherit", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.accent; e.currentTarget.style.color = c.accent; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.textMuted; }}>
                    {sl}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
