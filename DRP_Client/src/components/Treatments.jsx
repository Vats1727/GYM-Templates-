import React from 'react';
import useFetchData from '../hooks/useFetchData';
import { TREATMENTS } from '../constants/data';

export default function Treatments() {
  const { data: treatments } = useFetchData('treatments', TREATMENTS);

  return (
    <section className="treatments" id="treatments">
      <div className="container">
        <div className="reveal visible">
          <div className="section-tag">What I Offer</div>
          <h2 className="section-title">Specialised Treatments</h2>
          <p className="section-desc">Holistic, root-cause focused therapies delivered safely and effectively through online consultations.</p>
        </div>
        <div className="treatments-grid">
          {treatments.map((t, idx) => (
            <div
              className={`treatment-card reveal visible reveal-delay-${idx % 3}`}
              key={t.title || idx}
            >
              <div className="t-icon">{t.icon}</div>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
              <div className="t-conditions">
                {t.tags && t.tags.map((tag, tagIdx) => (
                  <span className="t-tag" key={tagIdx}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
