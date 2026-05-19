import React from 'react';
import useFetchData from '../hooks/useFetchData';

function BodySVG({ type }) {
  if (type === 'male_skinny_fat') {
    return (
      <svg viewBox="0 0 80 120" width="60" height="90" fill="none">
        <ellipse cx="40" cy="30" rx="16" ry="17" fill="#555" />
        <rect x="20" y="47" width="40" height="55" rx="8" fill="#444" />
        <rect x="8" y="52" width="16" height="45" rx="8" fill="#555" />
        <rect x="56" y="52" width="16" height="45" rx="8" fill="#555" />
        <rect x="18" y="98" width="18" height="28" rx="6" fill="#3a3a3a" />
        <rect x="44" y="98" width="18" height="28" rx="6" fill="#3a3a3a" />
      </svg>
    );
  }
  if (type === 'male_muscular') {
    return (
      <svg viewBox="0 0 80 120" width="60" height="90" fill="none">
        <ellipse cx="40" cy="28" rx="15" ry="16" fill="#c8a882" />
        <rect x="22" y="44" width="36" height="52" rx="6" fill="#2a2a2a" />
        <path d="M22,60 L40,68 L58,60" stroke="rgba(232,255,0,0.4)" strokeWidth="1.5" fill="none" />
        <rect x="6" y="48" width="18" height="42" rx="8" fill="#c8a882" />
        <rect x="56" y="48" width="18" height="42" rx="8" fill="#c8a882" />
        <rect x="20" y="92" width="16" height="28" rx="5" fill="#1a1a1a" />
        <rect x="44" y="92" width="16" height="28" rx="5" fill="#1a1a1a" />
      </svg>
    );
  }
  if (type === 'female_before') {
    return (
      <svg viewBox="0 0 80 120" width="60" height="90" fill="none">
        <ellipse cx="40" cy="29" rx="14" ry="15" fill="#888" />
        <rect x="22" y="44" width="36" height="50" rx="6" fill="#666" />
        <rect x="8" y="50" width="16" height="40" rx="7" fill="#888" />
        <rect x="56" y="50" width="16" height="40" rx="7" fill="#888" />
        <rect x="22" y="90" width="15" height="26" rx="5" fill="#555" />
        <rect x="43" y="90" width="15" height="26" rx="5" fill="#555" />
      </svg>
    );
  }
  if (type === 'female_after') {
    return (
      <svg viewBox="0 0 80 120" width="60" height="90" fill="none">
        <ellipse cx="40" cy="27" rx="13" ry="14" fill="#d4a882" />
        <rect x="24" y="41" width="32" height="48" rx="5" fill="#1a1a1a" />
        <rect x="8" y="44" width="18" height="40" rx="8" fill="#d4a882" />
        <rect x="54" y="44" width="18" height="40" rx="8" fill="#d4a882" />
        <rect x="23" y="87" width="14" height="26" rx="4" fill="#333" />
        <rect x="43" y="87" width="14" height="26" rx="4" fill="#333" />
      </svg>
    );
  }
  if (type === 'male_athletic_before') {
    return (
      <svg viewBox="0 0 80 120" width="60" height="90" fill="none">
        <ellipse cx="40" cy="30" rx="13" ry="14" fill="#777" />
        <rect x="23" y="44" width="34" height="48" rx="6" fill="#555" />
        <rect x="10" y="50" width="15" height="38" rx="6" fill="#777" />
        <rect x="55" y="50" width="15" height="38" rx="6" fill="#777" />
        <rect x="22" y="89" width="15" height="25" rx="5" fill="#444" />
        <rect x="43" y="89" width="15" height="25" rx="5" fill="#444" />
      </svg>
    );
  }
  if (type === 'male_athletic_after') {
    return (
      <svg viewBox="0 0 80 120" width="60" height="90" fill="none">
        <ellipse cx="40" cy="28" rx="13" ry="14" fill="#c8a882" />
        <rect x="23" y="42" width="34" height="48" rx="5" fill="#111" />
        <path d="M23,56 L40,64 L57,56" stroke="rgba(232,255,0,0.5)" strokeWidth="1.5" fill="none" />
        <rect x="7" y="45" width="18" height="42" rx="8" fill="#c8a882" />
        <rect x="55" y="45" width="18" height="42" rx="8" fill="#c8a882" />
        <rect x="22" y="87" width="14" height="26" rx="4" fill="#222" />
        <rect x="44" y="87" width="14" height="26" rx="4" fill="#222" />
      </svg>
    );
  }
  return null;
}

export default function Transformations() {
  const { data: dbHeading } = useFetchData('transformations_heading/active', []);
  const { data: dbTransformations } = useFetchData('transformations/active', []);

  const heading = dbHeading && dbHeading.length > 0 ? dbHeading[0] : {
    tag: "Client Results",
    title: "Real Client Results",
    desc: "Check out the before/after physical metrics of clients."
  };

  const transformations = dbTransformations && dbTransformations.length > 0 ? dbTransformations : [
    {
      name: 'James K.',
      detail: '32 · Sales Director · 6-Month Program',
      metrics: [{ val: '-22kg', label: 'Weight Lost' }, { val: '+14%', label: 'Muscle' }, { val: '6mo', label: 'Timeline' }],
      beforeType: 'male_skinny_fat',
      afterType: 'male_muscular'
    },
    {
      name: 'Rania M.',
      detail: '28 · Nurse · 4-Month Program',
      metrics: [{ val: '-15kg', label: 'Weight Lost' }, { val: '-12%', label: 'Body Fat' }, { val: '4mo', label: 'Timeline' }],
      beforeType: 'female_before',
      afterType: 'female_after'
    },
    {
      name: 'Yusuf A.',
      detail: '24 · Student Athlete · 5-Month Program',
      metrics: [{ val: '+18kg', label: 'Muscle' }, { val: '180kg', label: 'Deadlift' }, { val: '5mo', label: 'Timeline' }],
      beforeType: 'male_athletic_before',
      afterType: 'male_athletic_after'
    }
  ];

  return (
    <section className="transformations" id="transformations">
      <div className="container">
        <div className="reveal" style={{ marginBottom: '3.5rem' }}>
          <div className="section-label">{heading.tag}</div>
          <h2 className="section-title">{heading.title}</h2>
          <p className="section-desc">{heading.desc}</p>
        </div>
        <div className="trans-grid">
          {transformations.map((t, idx) => {
            const metrics = Array.isArray(t.metrics) ? t.metrics : [];
            return (
              <div className="trans-card reveal" key={t.name || idx}>
                <div className="before-after">
                  <div className="ba-side before">
                    <span className="ba-label">Before</span>
                    <BodySVG type={t.beforeType} />
                  </div>
                  <div className="ba-divider"></div>
                  <div className="ba-side after">
                    <span className="ba-label">After</span>
                    <BodySVG type={t.afterType} />
                  </div>
                </div>
                <div className="trans-body">
                  <div className="trans-name">{t.name}</div>
                  <div className="trans-detail">{t.detail}</div>
                  <div className="trans-metrics">
                    {metrics.map((metric, metricIdx) => (
                      <div className="t-metric" key={metricIdx}>
                        <div className="t-metric-val">{metric.val}</div>
                        <div className="t-metric-label">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
