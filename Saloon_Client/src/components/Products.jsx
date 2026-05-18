import { PRODUCTS } from "../constants/data";

export default function Products({ c, go }) {
  return (
    <section style={{ background: c.bgAlt, padding: "72px 0" }}>
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div className="label">In-Studio Shop</div>
            <h2 className="h2" style={{ marginTop: 12 }}>Professional Products</h2>
          </div>
          <button className="btn btn-o" style={{ fontSize: 11 }}>View All Products →</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
          {PRODUCTS.map((p) => (
            <div key={p.name} className="card" style={{ padding: "22px" }}>
              <div style={{ width: 52, height: 52, borderRadius: 6, background: c.bgAlt, display: "flex", alignItems: "center", justifyContent: "center", color: c.accent, marginBottom: 14, border: `1px solid ${c.border}` }}>
                {p.emoji}
              </div>
              <div className="pill" style={{ marginBottom: 10, fontSize: 9 }}>{p.category}</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: c.text, marginBottom: 6 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: c.textMuted, lineHeight: 1.6, marginBottom: 14 }}>{p.desc}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontFamily: "'Lora', serif", fontSize: 16, fontWeight: 600, color: c.accent }}>{p.price}</div>
                <button style={{ padding: "6px 14px", background: c.accent + "18", border: `1px solid ${c.accentDim}`, borderRadius: 2, color: c.accent, fontSize: 11, fontFamily: "inherit", transition: "all 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = c.accent + "30")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = c.accent + "18")}>
                  Add →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
