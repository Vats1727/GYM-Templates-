import React from 'react';
import useFetchData from '../hooks/useFetchData';
import { TREATMENTS } from '../constants/data';
import { Leaf, Droplet, Sparkles, Brain, Baby, Activity } from 'lucide-react';

const iconMap = {
  Leaf: Leaf,
  Droplet: Droplet,
  Sparkles: Sparkles,
  Brain: Brain,
  Baby: Baby,
  Activity: Activity
};

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
          {treatments.map((t, idx) => {
            const IconComponent = iconMap[t.icon] || Leaf;
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

