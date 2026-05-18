import { MapPin, Clock, Phone, Mail, Car, Calendar, Sparkles, Leaf } from "lucide-react";
import { SERVICES, STAFF } from "../constants/data";
import Av from "./Av";

export default function Booking({ theme, c, bk, setBk, bkStep, setBkStep, booked, setBooked }) {
  return (
    <section id="book" style={{ background: c.bg }}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 64, alignItems: "start" }}>
          <div style={{ position: "sticky", top: 90 }}>
            <div className="label">Reserve Your Spot</div>
            <h2 className="h2" style={{ marginTop: 12 }}>Book an<br />Appointment</h2>
            <div className="rule" />
            <p className="body-sm" style={{ marginBottom: 36 }}>Select your service, choose your artist, and secure your time. Same-day slots available. No deposit required for first visit.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[[<MapPin size={17} />, "Location", "23 Law Garden Road, Ellisbridge, Ahmedabad 380006"],
                [<Clock size={17} />, "Hours", "Tue–Sat 10am–8pm  ·  Sun 11am–6pm  ·  Mon Closed"],
                [<Phone size={17} />, "Call / WhatsApp", "+91 98765 43210"],
                [<Mail size={17} />, "Email", "hello@velourstudio.in"],
                [<Car size={17} />, "Parking", "Free client parking behind the building"]].map(([ico, lbl, val]) => (
                <div key={lbl} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 3, background: c.bgCard, border: `1px solid ${c.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>{ico}</div>
                  <div><div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: c.accent, marginBottom: 3 }}>{lbl}</div><div style={{ fontSize: 13, color: c.textMuted, lineHeight: 1.5 }}>{val}</div></div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 8, padding: 40 }}>
            {booked ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ display: "flex", justifyContent: "center", color: c.accent, marginBottom: 20 }}><Leaf size={48} /></div>
                <h3 style={{ fontFamily: "'Lora', serif", fontSize: 26, color: c.text, marginBottom: 12 }}>See you soon!</h3>
                <p style={{ color: c.textMuted, lineHeight: 1.7, marginBottom: 8, fontSize: 14 }}>Confirmation sent to <strong style={{ color: c.text }}>{bk.email}</strong></p>
                <p style={{ color: c.textMuted, fontSize: 13, marginBottom: 28 }}>{bk.service} with {bk.staff} on {bk.date} at {bk.time}</p>
                <div style={{ padding: "16px", background: c.bgAlt, borderRadius: 4, fontSize: 13, color: c.textMuted, marginBottom: 28, display: "flex", alignItems: "center", gap: 8 }}>
                  <Sparkles size={16} style={{ color: c.accent, flexShrink: 0 }} />
                  <span>Arrive 5 min early. Skip conditioner 48hrs before color services.</span>
                </div>
                <button className="btn btn-o" onClick={() => { setBooked(false); setBkStep(1); setBk({ service: "", staff: "", date: "", time: "", name: "", phone: "", email: "", note: "" }); }}>Book Another →</button>
              </div>
            ) : (
              <>
                {/* Step indicators */}
                <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
                  {[1, 2, 3].map((s) => (
                    <div key={s} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
                      <div style={{ height: 3, width: "100%", borderRadius: 2, background: s <= bkStep ? c.accent : c.border, transition: "background 0.3s" }} />
                      <div style={{ fontSize: 10, color: s <= bkStep ? c.accent : c.textFaint }}>{["Service & Artist", "Date & Time", "Your Details"][s - 1]}</div>
                    </div>
                  ))}
                </div>

                {bkStep === 1 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <div>
                      <label style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: c.textMuted, display: "block", marginBottom: 8 }}>Service</label>
                      <select value={bk.service} onChange={(e) => setBk({ ...bk, service: e.target.value })} style={{ width: "100%", padding: "13px 16px", borderRadius: 3, background: c.bgAlt, border: `1px solid ${c.border}`, color: bk.service ? c.text : c.textFaint, fontSize: 14, transition: "border 0.2s" }}
                        onFocus={(e) => (e.target.style.borderColor = c.accent)} onBlur={(e) => (e.target.style.borderColor = c.border)}>
                        <option value="">Choose a service...</option>
                        {SERVICES.flatMap((cat) => cat.items.map((item) => (<option key={item.n} value={item.n}>{item.n} — {item.p}</option>)))}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: c.textMuted, display: "block", marginBottom: 8 }}>Choose Your Artist</label>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        {STAFF.map((m) => (
                          <div key={m.name} onClick={() => setBk({ ...bk, staff: m.name })} style={{ padding: "12px 14px", background: bk.staff === m.name ? c.accent + "18" : c.bgAlt, border: `1px solid ${bk.staff === m.name ? c.accent : c.border}`, borderRadius: 4, cursor: "pointer", display: "flex", gap: 10, alignItems: "center", transition: "all 0.2s" }}>
                            <Av init={m.init} col={m.col} size={32} />
                            <div><div style={{ fontSize: 12, fontWeight: 600, color: c.text }}>{m.name.split(" ")[0]}</div><div style={{ fontSize: 10, color: c.textMuted }}>{m.role}</div></div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button className="btn btn-p" disabled={!bk.service || !bk.staff} onClick={() => setBkStep(2)} style={{ opacity: !bk.service || !bk.staff ? 0.5 : 1, justifyContent: "center" }}>Continue →</button>
                  </div>
                )}

                {bkStep === 2 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    {[["Date", "date", "date", { min: new Date().toISOString().split("T")[0] }],
                    ].map(([lbl, key, type, extra]) => (
                      <div key={key}>
                        <label style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: c.textMuted, display: "block", marginBottom: 8 }}>{lbl}</label>
                        <input type={type} value={bk[key]} onChange={(e) => setBk({ ...bk, [key]: e.target.value })} {...extra} style={{ width: "100%", padding: "13px 16px", borderRadius: 3, background: c.bgAlt, border: `1px solid ${c.border}`, color: c.text, fontSize: 14 }} onFocus={(e) => (e.target.style.borderColor = c.accent)} onBlur={(e) => (e.target.style.borderColor = c.border)} />
                      </div>
                    ))}
                    <div>
                      <label style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: c.textMuted, display: "block", marginBottom: 8 }}>Preferred Time</label>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
                        {["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"].map((t) => (
                          <button key={t} onClick={() => setBk({ ...bk, time: t })} style={{ padding: "9px 4px", border: `1px solid ${bk.time === t ? c.accent : c.border}`, borderRadius: 3, background: bk.time === t ? c.accent + "20" : "transparent", color: bk.time === t ? c.accent : c.textMuted, fontSize: 12, fontFamily: "inherit", transition: "all 0.2s" }}>{t}</button>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button className="btn btn-o" onClick={() => setBkStep(1)} style={{ flex: 1, justifyContent: "center" }}>← Back</button>
                      <button className="btn btn-p" disabled={!bk.date || !bk.time} onClick={() => setBkStep(3)} style={{ flex: 2, justifyContent: "center", opacity: !bk.date || !bk.time ? 0.5 : 1 }}>Continue →</button>
                    </div>
                  </div>
                )}

                {bkStep === 3 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {[["Full Name", "name", "text", "Your full name"],
                      ["Phone / WhatsApp", "phone", "tel", "+91 XXXXX XXXXX"],
                      ["Email", "email", "email", "your@email.com"]].map(([lbl, key, type, ph]) => (
                      <div key={key}>
                        <label style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: c.textMuted, display: "block", marginBottom: 8 }}>{lbl}</label>
                        <input type={type} placeholder={ph} value={bk[key]} onChange={(e) => setBk({ ...bk, [key]: e.target.value })} style={{ width: "100%", padding: "13px 16px", borderRadius: 3, background: c.bgAlt, border: `1px solid ${c.border}`, color: c.text, fontSize: 14 }} onFocus={(e) => (e.target.style.borderColor = c.accent)} onBlur={(e) => (e.target.style.borderColor = c.border)} />
                      </div>
                    ))}
                    <div>
                      <label style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: c.textMuted, display: "block", marginBottom: 8 }}>Special Requests (optional)</label>
                      <textarea placeholder="Allergies, references, or anything we should know..." value={bk.note} onChange={(e) => setBk({ ...bk, note: e.target.value })} rows={2} style={{ width: "100%", padding: "13px 16px", borderRadius: 3, background: c.bgAlt, border: `1px solid ${c.border}`, color: c.text, fontFamily: "inherit", fontSize: 14, resize: "none" }} onFocus={(e) => (e.target.style.borderColor = c.accent)} onBlur={(e) => (e.target.style.borderColor = c.border)} />
                    </div>
                    {/* Summary */}
                    <div style={{ padding: "14px 16px", background: c.bgAlt, borderRadius: 4, fontSize: 13, lineHeight: 2, color: c.textMuted }}>
                      <div><span style={{ color: c.text, fontWeight: 500 }}>Service:</span> {bk.service}</div>
                      <div><span style={{ color: c.text, fontWeight: 500 }}>Artist:</span> {bk.staff}</div>
                      <div><span style={{ color: c.text, fontWeight: 500 }}>When:</span> {bk.date} at {bk.time}</div>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button className="btn btn-o" onClick={() => setBkStep(2)} style={{ flex: 1, justifyContent: "center" }}>← Back</button>
                      <button className="btn btn-p" disabled={!bk.name || !bk.email} onClick={() => setBooked(true)} style={{ flex: 2, justifyContent: "center", opacity: !bk.name || !bk.email ? 0.5 : 1 }}>Confirm Booking ✓</button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
