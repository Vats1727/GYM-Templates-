import React from "react";
import { PRICING_PLANS } from "../constants/data";
import useFetchData from "../hooks/useFetchData";
import VisualEditorTrigger from "./Admin/VisualEditorTrigger";

export default function Pricing({ hover, unhover }) {
  const { data: sectionHeadings } = useFetchData('pricing_section/active', []);
  const { data: dbPricingList } = useFetchData('pricing/active', []);
  
  if (!sectionHeadings || sectionHeadings.length === 0) return null;
  
  const sectionHead = sectionHeadings[0];
  
  const pricingPlans = (Array.isArray(dbPricingList) && dbPricingList.length > 0) 
    ? dbPricingList.map(p => {
        let parsedFeatures = [];
        try {
          parsedFeatures = typeof p.features_json === 'string' ? JSON.parse(p.features_json) : p.features_json;
        } catch (e) { parsedFeatures = []; }
        return {
          ...p,
          features: Array.isArray(parsedFeatures) ? parsedFeatures : [],
          popular: Boolean(p.popular === 1 || p.popular === "1" || p.popular === true)
        };
      })
    : PRICING_PLANS;

  return (
    <section className="pricing" id="pricing">
      <VisualEditorTrigger sectionPath="/admin/pricing" />
      <div className="pricing-header">
        <div className="section-label fade-in">{sectionHead.tag}</div>
        <h2 className="section-title fade-in">
          {sectionHead.title ? sectionHead.title.split('\n').map((line, idx) => (
            <React.Fragment key={idx}>{line}{idx < sectionHead.title.split('\n').length - 1 && <br />}</React.Fragment>
          )) : "CHOOSE YOUR COMMITMENT"}
        </h2>
        <p className="section-sub fade-in">{sectionHead.desc}</p>
      </div>
      <div className="pricing-grid">
        {pricingPlans.map((p, i) => (
          <div
            key={i}
            className={`price-card fade-in${p.popular ? " popular" : ""}`}
            style={{ transitionDelay: `${i * 0.1}s` }}
            onMouseEnter={hover}
            onMouseLeave={unhover}
          >
            {p.popular && <div className="popular-badge">Most Popular</div>}
            <div className="price-plan">{p.plan}</div>
            <div className="price-amount">
              <sup>$</sup>
              {p.amount}
            </div>
            <div className="price-period">per month</div>
            <ul className="price-features">
              {(Array.isArray(p.features) ? p.features : []).map((f, j) => (
                <li key={j} className={!f.ok ? "inactive" : ""}>
                  <span className={f.ok ? "check" : "check-x"}>{f.ok ? "✓" : "✕"}</span>
                  {f.text}
                </li>
              ))}
            </ul>
            {p.popular ? (
              <button className="btn-plan-accent">Get Started</button>
            ) : (
              <button className="btn-plan">Choose Plan</button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
