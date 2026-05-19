import React from 'react';
import { Zap } from 'lucide-react';
import { TESTIMONIALS } from '../constants/data';

export default function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="reveal" style={{ marginBottom: '3.5rem' }}>
          <div className="section-label">Client Reviews</div>
          <h2 className="section-title">The <span className="dim">Proof</span></h2>
          <p className="section-desc">Results speak louder. Here's what clients say after committing to the process.</p>
        </div>
        <div className="testi-grid">
          {TESTIMONIALS.map((t, idx) => {
            const avatarStyle = t.avatarColors 
              ? { background: `linear-gradient(135deg, ${t.avatarColors[0]}, ${t.avatarColors[1]})` }
              : { background: 'linear-gradient(135deg, #e8ff00, #aabb00)' };

            return (
              <div className={`testi-card reveal ${t.featured ? 'featured' : ''}`} key={t.authorName || idx}>
                <div className="testi-top">
                  <div className="testi-avatar" style={avatarStyle}>
                    {t.avatar}
                  </div>
                  <div className="stars-block">
                    {'★'.repeat(t.stars)}
                  </div>
                </div>
                <p className="testi-text">{t.text}</p>
                <div className="testi-author-name">{t.authorName}</div>
                <div className="testi-author-meta">{t.authorMeta}</div>
                {t.result && (
                  <div className="testi-result" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', width: 'fit-content' }}>
                    <Zap size={14} fill="currentColor" style={{ flexShrink: 0 }} />
                    <span>{t.result}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
