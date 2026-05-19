import React, { useState } from "react";
import { FAQS } from "../constants/data";
import useFetchData from "../hooks/useFetchData";
import VisualEditorTrigger from "./Admin/VisualEditorTrigger";
import GlobalHeadingEditor from "./Admin/GlobalHeadingEditor";

export default function FAQ({ c }) {
  const [openFaq, setOpenFaq] = useState(null);
  const { data: dbFaqs } = useFetchData('faq', []);

  const items = dbFaqs && dbFaqs.length > 0
    ? dbFaqs.map(f => ({
        q: f.question || f.q,
        a: f.answer || f.a
      }))
    : FAQS;

  return (
    <section style={{ background: c.bgAlt, padding: "72px 0", position: 'relative' }} id="faq">
      <VisualEditorTrigger sectionPath="/admin/faq" />
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <GlobalHeadingEditor slug="faq_heading" defaultText="FAQs" defaultTag="Common Questions" centered />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {items.map((f, i) => (
            <div key={i} style={{ background: c.bgCard, border: `1px solid ${c.border}`, borderRadius: 4, overflow: "hidden" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", color: c.text, fontSize: 14, fontWeight: 500, fontFamily: "inherit", textAlign: "left", cursor: "pointer" }}>
                {f.q}
                <span style={{ color: c.accent, fontSize: 18, transition: "transform 0.25s", transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)", flexShrink: 0 }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: "0 22px 18px", fontSize: 14, color: c.textMuted, lineHeight: 1.75 }}>{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
