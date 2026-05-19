import React from 'react';
import useFetchData from '../hooks/useFetchData';
import { PROCESS_STEPS } from '../constants/data';

export default function HowItWorks() {
  const { data: steps } = useFetchData('process_steps', PROCESS_STEPS);

  return (
    <section className="process" id="process">
      <div className="container">
        <div className="reveal visible" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-tag">How It Works</div>
          <h2 className="section-title">Your Healing Journey in 4 Steps</h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>From first contact to lasting results — a simple, guided process.</p>
        </div>
        <div className="steps-grid">
          {steps.map((s, idx) => (
            <div
              className={`step reveal visible reveal-delay-${idx}`}
              key={s.num || idx}
            >
              <div className="step-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
