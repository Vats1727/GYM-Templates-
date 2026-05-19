import React from 'react';
import * as LucideIcons from 'lucide-react';
import { SPECIALTIES } from '../constants/data';

export default function Specialties() {
  return (
    <section className="specialties" id="specialties">
      <div className="container">
        <div className="reveal" style={{ maxWidth: '700px', marginBottom: '3.5rem' }}>
          <div className="section-label">What I Do</div>
          <h2 className="section-title">Training <span className="dim">Disciplines</span></h2>
          <p className="section-desc">Every program is periodised, personalised, and built around your life — not against it.</p>
        </div>
        <div className="spec-grid reveal">
          {SPECIALTIES.map((spec, idx) => {
            const IconComponent = LucideIcons[spec.icon] || LucideIcons.Dumbbell;
            return (
              <div className="spec-card" key={spec.num || idx}>
                <div className="spec-num">{spec.num}</div>
                <div className="spec-icon" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--accent)' }}>
                  <IconComponent size={28} />
                </div>
                <h3>{spec.title}</h3>
                <p>{spec.desc}</p>
                <div className="spec-tags">
                  {spec.tags && spec.tags.map((tag, tagIdx) => (
                    <span className="spec-tag" key={tagIdx}>
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
