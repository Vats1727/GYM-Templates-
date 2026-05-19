import React from 'react';
import * as LucideIcons from 'lucide-react';
import { PROCESS_STEPS } from '../constants/data';

export default function HowItWorks() {
  return (
    <section className="process" id="process">
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Process</div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>How We <span className="dim">Work</span></h2>
          <p className="section-desc" style={{ margin: '0 auto', textAlign: 'center' }}>Four steps from enquiry to your first session.</p>
        </div>
        <div className="process-steps reveal">
          {PROCESS_STEPS.map((step, idx) => {
            const IconComponent = LucideIcons[step.icon] || LucideIcons.ClipboardList;
            return (
              <div className="process-step" key={step.num || idx}>
                <div className="step-num">{step.num}</div>
                <div className="step-icon" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--accent)', marginBottom: '0.75rem' }}>
                  <IconComponent size={28} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                {idx < PROCESS_STEPS.length - 1 && (
                  <div className="step-arrow">→</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
