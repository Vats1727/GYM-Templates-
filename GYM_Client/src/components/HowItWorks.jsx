import React from 'react';
import * as LucideIcons from 'lucide-react';
import useFetchData from '../hooks/useFetchData';

export default function HowItWorks() {
  const { data: dbHeading } = useFetchData('process_steps_heading/active', []);
  const { data: dbSteps } = useFetchData('process_steps/active', []);

  const heading = dbHeading && dbHeading.length > 0 ? dbHeading[0] : {
    tag: "Process",
    title: "How We Work",
    desc: "Four steps from enquiry to your first session."
  };

  const steps = dbSteps && dbSteps.length > 0 ? dbSteps : [
    { num: '01', icon: 'ClipboardList', title: 'Apply Online', desc: 'Fill out a short intake form covering your goals, training history, schedule, and lifestyle. Takes 5 minutes.' },
    { num: '02', icon: 'Video', title: 'Strategy Call', desc: 'Free 20-minute video call to discuss your goals, ask questions, and see if we\'re a great fit. No pressure, no pitch.' },
    { num: '03', icon: 'Smartphone', title: 'Program Delivered', desc: 'Your custom program and nutrition plan arrive in the app within 48 hours. Walk-through video included.' },
    { num: '04', icon: 'TrendingUp', title: 'Train & Progress', desc: 'Weekly check-ins, form reviews, and ongoing adjustments. Your program evolves as you improve.' }
  ];

  return (
    <section className="process" id="process">
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>{heading.tag}</div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>{heading.title}</h2>
          <p className="section-desc" style={{ margin: '0 auto', textAlign: 'center' }}>{heading.desc}</p>
        </div>
        <div className="process-steps reveal">
          {steps.map((step, idx) => {
            const IconComponent = LucideIcons[step.icon] || LucideIcons.ClipboardList;
            return (
              <div className="process-step" key={step.num || idx}>
                <div className="step-num">{step.num}</div>
                <div className="step-icon" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--accent)', marginBottom: '0.75rem' }}>
                  <IconComponent size={28} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                {idx < steps.length - 1 && (
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
