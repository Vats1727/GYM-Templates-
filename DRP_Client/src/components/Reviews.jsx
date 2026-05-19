import React from 'react';
import useFetchData from '../hooks/useFetchData';
import { REVIEWS } from '../constants/data';

export default function Reviews() {
  const { data: reviews } = useFetchData('reviews', REVIEWS);

  const renderStars = (count) => {
    return '★'.repeat(count) + '☆'.repeat(5 - count);
  };

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="reveal visible">
          <div className="section-tag">Patient Voices</div>
          <h2 className="section-title">What Patients Say</h2>
          <p className="section-desc">Real words from real people whose lives have changed through natural healing.</p>
        </div>
        <div className="testi-grid">
          {reviews.map((r, idx) => (
            <div
              className={`testi-card reveal visible reveal-delay-${idx % 3}`}
              key={r.name || idx}
            >
              <div className="stars">{renderStars(r.stars)}</div>
              <div className="quote-mark">"</div>
              <p className="testi-text">{r.text}</p>
              <div className="testi-author">
                <div className="testi-avatar" style={{ background: r.avatarGradient }}>
                  {r.initials}
                </div>
                <div>
                  <div className="testi-name">{r.name}</div>
                  <div className="testi-loc">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
