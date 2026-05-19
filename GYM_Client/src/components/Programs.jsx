import React from 'react';
import { Zap } from 'lucide-react';
import { PRICING_PLANS } from '../constants/data';

export default function Programs() {
  const handleBooking = (planName) => {
    alert(`Redirecting to booking/payment system for ${planName} Plan`);
  };

  return (
    <section className="programs" id="programs">
      <div className="container">
        <div className="reveal" style={{ marginBottom: '3.5rem' }}>
          <div className="section-label">Programs</div>
          <h2 className="section-title">Choose Your <span className="dim">Level</span></h2>
          <p className="section-desc">All plans include personalised programming, nutrition guidance, and direct coach access. No cookie-cutter templates.</p>
        </div>
        <div className="pricing-grid">
          {PRICING_PLANS.map((plan, idx) => (
            <div className={`price-card reveal ${plan.featured ? 'featured' : ''}`} key={plan.name || idx}>
              <div className="plan-name">{plan.name}</div>
              <div className="plan-price">
                <sup>$</sup>
                {plan.price}
                <sub>{plan.billing}</sub>
              </div>
              <div className="plan-desc">{plan.desc}</div>
              <ul className="plan-features">
                {plan.features && plan.features.map((feature, featureIdx) => (
                  <li className={feature.ok ? '' : 'off'} key={featureIdx}>
                    {feature.text}
                  </li>
                ))}
              </ul>
              <button 
                className={`btn-plan ${plan.featured ? '' : 'outline'}`} 
                onClick={() => handleBooking(plan.name)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}
              >
                {plan.featured && <Zap size={16} fill="currentColor" />}
                {plan.btnText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
