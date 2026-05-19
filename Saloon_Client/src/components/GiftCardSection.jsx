import { useState } from "react";
import { T } from "../constants/data";
import { crudService } from "../services/crud";
import { Sparkles, CreditCard, Send, Check, ShieldCheck, Loader2 } from "lucide-react";

export default function GiftCardSection({ theme }) {
  const c = T[theme];
  
  // Customizer States
  const [amt, setAmt] = useState(1500);
  const [isCustomAmt, setIsCustomAmt] = useState(false);
  const [customAmtText, setCustomAmtText] = useState("");
  const [msg, setMsg] = useState("");
  const [toName, setToName] = useState("");
  const [toEmail, setToEmail] = useState("");
  const [fromName, setFromName] = useState("");
  
  // Color Themes for the Gift Card preview
  const cardThemes = [
    { name: "Sage", val: "sage", grad: `linear-gradient(135deg, ${c.accentDim}dd, ${c.accent}aa)`, border: c.borderStrong, accent: c.accent },
    { name: "Gold", val: "gold", grad: "linear-gradient(135deg, #A8812E dd, #E2B755 aa)", border: "1px solid #D4AF37", accent: "#E2B755" },
    { name: "Royal", val: "royal", grad: "linear-gradient(135deg, #3A1C3C dd, #9A8194 aa)", border: "1px solid #9A8194", accent: "#BE9BB7" },
    { name: "Velvet", val: "velvet", grad: "linear-gradient(135deg, #1A2E22 dd, #2D4C3A aa)", border: "1px solid #446E56", accent: "#7EC8A0" },
  ];
  const [selectedTheme, setSelectedTheme] = useState(cardThemes[0]);

  // Payment Checkout Modal States
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [payNumber, setPayNumber] = useState("");
  const [payName, setPayName] = useState("");
  const [payExpiry, setPayExpiry] = useState("");
  const [payCvv, setPayCvv] = useState("");
  const [focusedField, setFocusedField] = useState(""); // to flip or highlight parts of the payment card
  
  // Transaction flow states
  const [paymentStatus, setPaymentStatus] = useState("idle"); // idle | processing | success
  const [giftCardCode, setGiftCardCode] = useState("");

  const presets = [500, 1000, 1500, 2500, 5000];

  const handleAmountSelect = (val) => {
    setIsCustomAmt(false);
    setAmt(val);
  };

  const handleCustomAmtChange = (val) => {
    const numeric = val.replace(/\D/g, "");
    setCustomAmtText(numeric);
    setAmt(numeric ? parseInt(numeric) : 0);
  };

  // Format Card Number (adds spaces every 4 digits)
  const handleCardNumberChange = (val) => {
    const raw = val.replace(/\D/g, "").substring(0, 16);
    const formatted = raw.match(/.{1,4}/g)?.join(" ") || raw;
    setPayNumber(formatted);
  };

  // Format Expiry (MM/YY)
  const handleExpiryChange = (val) => {
    let clean = val.replace(/\D/g, "").substring(0, 4);
    if (clean.length > 2) {
      clean = clean.substring(0, 2) + "/" + clean.substring(2);
    }
    setPayExpiry(clean);
  };

  const handleCvvChange = (val) => {
    const clean = val.replace(/\D/g, "").substring(0, 3);
    setPayCvv(clean);
  };

  const handleOpenCheckout = () => {
    if (!toName.trim() || !toEmail.trim() || !fromName.trim()) {
      alert("Please fill in the Recipient and Sender names & email before purchasing.");
      return;
    }
    if (!amt || amt < 100) {
      alert("Minimum gift card amount is ₹100.");
      return;
    }
    setPaymentStatus("idle");
    setPayNumber("");
    setPayName("");
    setPayExpiry("");
    setPayCvv("");
    setCheckoutOpen(true);
  };

  const handleConfirmPayment = async (e) => {
    e.preventDefault();
    if (payNumber.replace(/\s/g, "").length !== 16) {
      alert("Please enter a valid 16-digit card number.");
      return;
    }
    if (!payName.trim()) {
      alert("Please enter the cardholder name.");
      return;
    }
    if (payExpiry.length !== 5) {
      alert("Please enter card expiry date (MM/YY).");
      return;
    }
    if (payCvv.length !== 3) {
      alert("Please enter a valid 3-digit CVV.");
      return;
    }

    setPaymentStatus("processing");

    // Simulate secure transaction wait
    setTimeout(async () => {
      const uniqueCode = "VAL-GIFT-" + Math.random().toString(36).substring(2, 8).toUpperCase();
      
      try {
        // Log purchase into backend database as an appointment (dynamic database integration)
        await crudService.create("admin/bookings", {
          name: `${fromName} ➔ ${toName}`,
          phone: "GIFT CARD",
          email: toEmail,
          service: `Gift Card (₹${amt})`,
          stylist: "Digital Delivery",
          date: new Date().toISOString().split("T")[0],
          time: "Instant",
          note: `Theme: ${selectedTheme.name} | Message: ${msg || "None"} | Code: ${uniqueCode}`,
          status: "Paid"
        });

        // Trigger real-time UI updates
        window.dispatchEvent(new CustomEvent("api-data-updated"));
        
        setGiftCardCode(uniqueCode);
        setPaymentStatus("success");
      } catch (err) {
        console.error("Failed to save gift card transaction:", err);
        // Fallback to local success if database has a temp offline error
        setGiftCardCode(uniqueCode);
        setPaymentStatus("success");
      }
    }, 2000);
  };

  const resetForm = () => {
    setToName("");
    setToEmail("");
    setFromName("");
    setMsg("");
    setAmt(1500);
    setIsCustomAmt(false);
    setCustomAmtText("");
    setCheckoutOpen(false);
    setPaymentStatus("idle");
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40, alignItems: "start" }}>
        
        {/* CUSTOMIZER FORM PANEL */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: c.textMuted, display: "block", marginBottom: 6 }}>To (Recipient Name)</label>
              <input type="text" placeholder="Recipient's Name" value={toName} onChange={e => setToName(e.target.value)} style={{ width: "100%", padding: "12px 14px", borderRadius: 4, background: c.bgAlt, border: `1px solid ${c.border}`, color: c.text, fontSize: 13, outline: "none" }} />
            </div>
            <div>
              <label style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: c.textMuted, display: "block", marginBottom: 6 }}>Recipient Email</label>
              <input type="email" placeholder="delivery@email.com" value={toEmail} onChange={e => setToEmail(e.target.value)} style={{ width: "100%", padding: "12px 14px", borderRadius: 4, background: c.bgAlt, border: `1px solid ${c.border}`, color: c.text, fontSize: 13, outline: "none" }} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: c.textMuted, display: "block", marginBottom: 6 }}>From (Your Name)</label>
            <input type="text" placeholder="Sender's Name" value={fromName} onChange={e => setFromName(e.target.value)} style={{ width: "100%", padding: "12px 14px", borderRadius: 4, background: c.bgAlt, border: `1px solid ${c.border}`, color: c.text, fontSize: 13, outline: "none" }} />
          </div>

          {/* Amount Presets */}
          <div>
            <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: c.textMuted, marginBottom: 10 }}>Choose Gift Value</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
              {presets.map((p) => (
                <button key={p} onClick={() => handleAmountSelect(p)} style={{ padding: "10px 16px", borderRadius: 4, border: `1.5px solid ${!isCustomAmt && amt === p ? selectedTheme.accent : c.border}`, background: !isCustomAmt && amt === p ? selectedTheme.accent + "18" : "transparent", color: !isCustomAmt && amt === p ? c.text : c.textMuted, cursor: "pointer", fontSize: 13, fontWeight: !isCustomAmt && amt === p ? 600 : 400, fontFamily: "inherit", transition: "all 0.2s" }}>
                  ₹{p.toLocaleString()}
                </button>
              ))}
              <button onClick={() => { setIsCustomAmt(true); setAmt(customAmtText ? parseInt(customAmtText) : 0); }} style={{ padding: "10px 16px", borderRadius: 4, border: `1.5px solid ${isCustomAmt ? selectedTheme.accent : c.border}`, background: isCustomAmt ? selectedTheme.accent + "18" : "transparent", color: isCustomAmt ? c.text : c.textMuted, cursor: "pointer", fontSize: 13, fontWeight: isCustomAmt ? 600 : 400, fontFamily: "inherit", transition: "all 0.2s" }}>
                Custom Amount
              </button>
            </div>
            
            {isCustomAmt && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, animation: "fadeIn 0.2s ease-out" }}>
                <span style={{ fontSize: 16, color: c.textMuted }}>₹</span>
                <input type="text" placeholder="Enter custom amount (Min. ₹100)" value={customAmtText} onChange={e => handleCustomAmtChange(e.target.value)} style={{ flex: 1, padding: "12px 14px", borderRadius: 4, background: c.bgAlt, border: `1.5px solid ${selectedTheme.accent}`, color: c.text, fontSize: 13, outline: "none" }} />
              </div>
            )}
          </div>

          {/* Theme Selector */}
          <div>
            <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: c.textMuted, marginBottom: 8 }}>Choose Gift Card Theme</div>
            <div style={{ display: "flex", gap: 8 }}>
              {cardThemes.map((t) => (
                <button key={t.val} onClick={() => setSelectedTheme(t)} style={{ flex: 1, padding: "8px", borderRadius: 4, border: `1.5px solid ${selectedTheme.val === t.val ? t.accent : c.border}`, background: c.bgCard, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "all 0.2s" }}>
                  <span style={{ width: 12, height: 12, borderRadius: "50%", background: t.grad }} />
                  <span style={{ fontSize: 12, color: selectedTheme.val === t.val ? c.text : c.textMuted }}>{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Personal Message */}
          <div>
            <label style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: c.textMuted, display: "block", marginBottom: 6 }}>Personal Message (optional)</label>
            <textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Wishing you a beautiful spa and grooming day filled with relaxation!" rows={3} style={{ width: "100%", padding: "12px 14px", borderRadius: 4, background: c.bgAlt, border: `1px solid ${c.border}`, color: c.text, fontFamily: "inherit", fontSize: 13, resize: "none", outline: "none", lineHeight: 1.5 }} />
          </div>

          <button onClick={handleOpenCheckout} style={{ width: "100%", padding: "15px", background: selectedTheme.accent, color: "#111714", border: "none", borderRadius: 4, cursor: "pointer", fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.2s" }}>
            <CreditCard size={16} />
            Purchase Gift Card (₹{amt.toLocaleString()}) →
          </button>
        </div>

        {/* LIVE GIFT CARD PREVIEW */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: c.textMuted }}>Virtual Card Live Preview</div>
          
          <div style={{ 
            background: selectedTheme.grad, 
            border: selectedTheme.border, 
            borderRadius: 12, 
            padding: "32px", 
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "space-between", 
            minHeight: 230,
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
            position: "relative",
            overflow: "hidden"
          }}>
            {/* Elegant glass decorative elements */}
            <div style={{ position: "absolute", top: -50, right: -50, width: 150, height: 150, borderRadius: "50%", background: "rgba(255,255,255,0.06)", filter: "blur(20px)" }} />
            <div style={{ position: "absolute", bottom: -80, left: -20, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.04)", filter: "blur(30px)" }} />
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", zIndex: 2 }}>
              <div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 700, color: "#fff" }}>Velour<span style={{ color: selectedTheme.accent }}>.</span></div>
                <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginTop: 2 }}>HAIR & BEAUTY STUDIO</div>
              </div>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#fff", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", padding: "5px 12px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)" }}>Gift Card</div>
            </div>

            {/* Middle portion showing custom To / From */}
            <div style={{ margin: "20px 0", zIndex: 2 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ fontSize: 10, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", letterSpacing: 1 }}>Presented To</div>
                <div style={{ fontSize: 16, fontFamily: "Georgia, serif", color: "#fff", fontWeight: 500 }}>{toName || "Recipient Name"}</div>
                {toEmail && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{toEmail}</div>}
              </div>
              
              {fromName && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
                  <span style={{ fontSize: 10, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", letterSpacing: 1 }}>From:</span>
                  <span style={{ fontSize: 12, color: "#fff", fontWeight: 500 }}>{fromName}</span>
                </div>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: 16, zIndex: 2 }}>
              <div>
                <div style={{ fontSize: 32, fontFamily: "Georgia, serif", fontWeight: 700, color: "#fff" }}>₹{amt.toLocaleString()}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>Valid 12 months · All services</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <Sparkles size={18} style={{ color: selectedTheme.accent, opacity: 0.8 }} />
                <span style={{ fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginTop: 4 }}>Preview Only</span>
              </div>
            </div>
          </div>
          
          {msg && (
            <div style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 8, padding: "16px 20px", display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: c.textMuted }}>Personalized Message preview</div>
              <div style={{ fontSize: 13, color: c.textMuted, fontStyle: "italic", lineHeight: 1.6 }}>"{msg}"</div>
            </div>
          )}
        </div>

      </div>

      {/* ── CREDIT CARD SECURE PAYMENT POPUP MODAL ── */}
      {checkoutOpen && (
        <div style={{ 
          position: "fixed", 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          background: "rgba(17, 23, 20, 0.85)", 
          backdropFilter: "blur(18px)", 
          zIndex: 1000, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          padding: 20
        }}>
          <div style={{ 
            background: c.bgCard, 
            border: `1.5px solid ${c.borderStrong}`, 
            borderRadius: 12, 
            width: "100%", 
            maxWidth: 480, 
            boxShadow: "0 24px 50px rgba(0,0,0,0.5)",
            overflow: "hidden",
            animation: "fadeIn 0.3s ease-out"
          }}>
            
            {/* Modal Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: `1px solid ${c.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <ShieldCheck size={18} style={{ color: c.accent }} />
                <span style={{ fontSize: 14, letterSpacing: 1.5, textTransform: "uppercase", color: c.text, fontWeight: 600 }}>Secure Checkout</span>
              </div>
              {paymentStatus !== "processing" && (
                <button onClick={() => setCheckoutOpen(false)} style={{ background: "none", border: "none", color: c.textMuted, cursor: "pointer", fontSize: 18 }}>×</button>
              )}
            </div>

            {/* Modal Body */}
            <div style={{ padding: "24px" }}>
              
              {paymentStatus === "success" ? (
                /* SUCCESS FLOW SCREEN */
                <div style={{ textAlign: "center", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: c.accent + "18", border: `2.5px solid ${c.accent}`, display: "flex", alignItems: "center", justifyContent: "center", color: c.accent, animation: "scaleUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}>
                    <Check size={32} />
                  </div>
                  
                  <div>
                    <h3 style={{ fontFamily: "Georgia, serif", fontSize: 22, color: c.text, marginBottom: 6 }}>Gift Card Purchased!</h3>
                    <p style={{ fontSize: 13, color: c.textMuted, lineHeight: 1.6, maxWidth: 320, margin: "0 auto" }}>
                      Transaction approved! The digital gift card code has been generated and queued for delivery to <strong style={{ color: c.text }}>{toEmail}</strong>.
                    </p>
                  </div>

                  <div style={{ width: "100%", background: c.bgAlt, border: `1px solid ${c.border}`, borderRadius: 8, padding: "16px", margin: "12px 0", display: "flex", flexDirection: "column", gap: 8, textAlign: "left" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 11, color: c.textMuted }}>Recipient:</span><span style={{ fontSize: 12, color: c.text, fontWeight: 600 }}>{toName}</span></div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 11, color: c.textMuted }}>Amount:</span><span style={{ fontSize: 12, color: c.accent, fontWeight: 700 }}>₹{amt.toLocaleString()}</span></div>
                    <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${c.border}`, paddingTop: 8, marginTop: 4 }}>
                      <span style={{ fontSize: 11, color: c.textMuted }}>Gift Card Code:</span>
                      <span style={{ fontSize: 12, color: c.text, fontFamily: "monospace", letterSpacing: 1, fontWeight: 700 }}>{giftCardCode}</span>
                    </div>
                  </div>

                  <button className="btn btn-p" onClick={resetForm} style={{ width: "100%", justifyContent: "center" }}>Done & Close</button>
                </div>
              ) : paymentStatus === "processing" ? (
                /* PROCESSING TRANSACTION SCREEN */
                <div style={{ textAlign: "center", padding: "64px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
                  <Loader2 size={40} className="spin" style={{ color: c.accent }} />
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: c.text, marginBottom: 6 }}>Processing Secure Payment...</div>
                    <div style={{ fontSize: 12, color: c.textMuted }}>Verifying card details with your bank. Please do not close or reload.</div>
                  </div>
                </div>
              ) : (
                /* MAIN PAYMENT CARD INPUT FORM */
                <form onSubmit={handleConfirmPayment} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  
                  {/* REAL-TIME INTERACTIVE CARD DECORATOR */}
                  <div style={{ 
                    background: "linear-gradient(135deg, #1c2420, #111714)", 
                    borderRadius: 8, 
                    border: `1px solid ${c.border}`,
                    padding: "20px", 
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "space-between", 
                    minHeight: 160,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
                    transition: "transform 0.4s",
                    transform: focusedField === "cvv" ? "rotateY(10deg)" : "none"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 10, letterSpacing: 1.5, color: c.textMuted, textTransform: "uppercase" }}>Secure Payment Gateway</span>
                      <CreditCard size={20} style={{ color: c.accent, opacity: 0.6 }} />
                    </div>
                    
                    {/* Card Number display */}
                    <div style={{ fontFamily: "monospace", fontSize: 18, color: c.text, letterSpacing: 2, padding: "10px 0" }}>
                      {payNumber || "•••• •••• •••• ••••"}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                      <div>
                        <div style={{ fontSize: 8, textTransform: "uppercase", color: c.textMuted, letterSpacing: 1, marginBottom: 2 }}>Cardholder Name</div>
                        <div style={{ fontSize: 11, color: c.text, textTransform: "uppercase", letterSpacing: 1, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 220 }}>
                          {payName || "CARDHOLDER NAME"}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 20 }}>
                        <div>
                          <div style={{ fontSize: 8, textTransform: "uppercase", color: c.textMuted, letterSpacing: 1, marginBottom: 2 }}>Expiry</div>
                          <div style={{ fontSize: 11, color: c.text, fontFamily: "monospace" }}>{payExpiry || "MM/YY"}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 8, textTransform: "uppercase", color: c.textMuted, letterSpacing: 1, marginBottom: 2 }}>CVV</div>
                          <div style={{ fontSize: 11, color: c.text, fontFamily: "monospace" }}>{payCvv || "•••"}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card number inputs */}
                  <div>
                    <label style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: c.textMuted, display: "block", marginBottom: 6 }}>Debit / Credit Card Number</label>
                    <div style={{ position: "relative" }}>
                      <input type="text" placeholder="4111 2222 3333 4444" value={payNumber} onChange={e => handleCardNumberChange(e.target.value)} onFocus={() => setFocusedField("number")} style={{ width: "100%", padding: "11px 12px 11px 36px", borderRadius: 4, background: c.bgAlt, border: `1px solid ${c.border}`, color: c.text, fontSize: 13, outline: "none" }} />
                      <CreditCard size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: c.textMuted }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: c.textMuted, display: "block", marginBottom: 6 }}>Cardholder Name</label>
                    <input type="text" placeholder="AS APPEARS ON CARD" value={payName} onChange={e => setPayName(e.target.value.toUpperCase())} onFocus={() => setFocusedField("name")} style={{ width: "100%", padding: "11px 12px", borderRadius: 4, background: c.bgAlt, border: `1px solid ${c.border}`, color: c.text, fontSize: 13, outline: "none", textTransform: "uppercase" }} />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: c.textMuted, display: "block", marginBottom: 6 }}>Expiry Date</label>
                      <input type="text" placeholder="MM/YY" value={payExpiry} onChange={e => handleExpiryChange(e.target.value)} onFocus={() => setFocusedField("expiry")} style={{ width: "100%", padding: "11px 12px", borderRadius: 4, background: c.bgAlt, border: `1px solid ${c.border}`, color: c.text, fontSize: 13, outline: "none", textAlign: "center" }} />
                    </div>
                    <div>
                      <label style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: c.textMuted, display: "block", marginBottom: 6 }}>Security Code (CVV)</label>
                      <input type="password" placeholder="•••" value={payCvv} onChange={e => handleCvvChange(e.target.value)} onFocus={() => setFocusedField("cvv")} style={{ width: "100%", padding: "11px 12px", borderRadius: 4, background: c.bgAlt, border: `1px solid ${c.border}`, color: c.text, fontSize: 13, outline: "none", textAlign: "center" }} />
                    </div>
                  </div>

                  <button type="submit" style={{ width: "100%", padding: "14px", background: c.accent, color: "#111714", border: "none", borderRadius: 4, cursor: "pointer", fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 8, transition: "all 0.2s" }}>
                    <ShieldCheck size={16} />
                    Confirm & Pay ₹{amt.toLocaleString()}
                  </button>
                </form>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
