import React from 'react';
import useFetchData from '../hooks/useFetchData';
import { TREATMENTS } from '../constants/data';
import * as LucideIcons from 'lucide-react';

export default function Treatments() {
  const { data: treatments } = useFetchData('treatments', TREATMENTS);
  const { data: dbHeading } = useFetchData('treatments_heading/active', []);

  const heading = dbHeading && dbHeading.length > 0 ? dbHeading[0] : {
    tag: "What I Offer",
    title: "Specialised Treatments",
    desc: "Holistic, root-cause focused therapies delivered safely and effectively through online consultations."
  };

  return (
    <section className="treatments" id="treatments">
      <div className="container">
        <div className="reveal visible">
          <div className="section-tag">{heading.tag}</div>
          <h2 className="section-title">{heading.title}</h2>
          <p className="section-desc">{heading.desc}</p>
        </div>
        <div className="treatments-grid">
          {treatments.map((t, idx) => {
            const IconComponent = LucideIcons[t.icon] || LucideIcons.Leaf;
            return (
              <div
                className={`treatment-card reveal visible reveal-delay-${idx % 3}`}
                key={t.title || idx}
              >
                <div className="t-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                  <IconComponent size={24} />
                </div>
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
            );
          })}
        </div>
      </div>
    </section>
  );
}

