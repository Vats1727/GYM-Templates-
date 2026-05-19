import React from 'react';
import useFetchData from '../hooks/useFetchData';
import { CASE_STUDIES } from '../constants/data';

export default function CaseStudies() {
  const { data: cases } = useFetchData('case_studies', CASE_STUDIES);

  return (
    <section className="success" id="success">
      <div className="container">
        <div className="reveal visible">
          <div className="section-tag">Real Results</div>
          <h2 className="section-title">Documented Case Studies</h2>
          <p className="section-desc">Anonymised patient cases with measurable outcomes — because results matter more than promises.</p>
        </div>
        <div className="cases-grid">
          {cases.map((c, idx) => (
            <div
              className={`case-card reveal visible reveal-delay-${idx % 3}`}
              key={c.name || idx}
            >
              <div className="case-header">
                <div className="case-person">
                  <div className="case-avatar" style={{ background: c.avatarGradient }}>
                    {c.initials}
                  </div>
                  <div>
                    <div className="case-name">{c.name}</div>
                    <div className="case-meta">Age {c.age} · {c.location}</div>
                  </div>
                </div>
                <div className="outcome-badge">✓ {c.status}</div>
              </div>
              <div className="case-condition">{c.condition}</div>
              <p className="case-desc">{c.desc}</p>
              <div className="case-metrics">
                {c.metrics && c.metrics.map((m, mIdx) => (
                  <div className="metric" key={mIdx}>
                    <div className="metric-val">{m.val}</div>
                    <div className="metric-label">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
