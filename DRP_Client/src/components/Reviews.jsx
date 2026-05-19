import React from 'react';
import useFetchData from '../hooks/useFetchData';
import { REVIEWS } from '../constants/data';

export default function Reviews() {
  const { data: reviews } = useFetchData('reviews/active', REVIEWS);
  const { data: dbHeading } = useFetchData('reviews_heading/active', []);

  const heading = dbHeading && dbHeading.length > 0 ? dbHeading[0] : {
    tag: "Patient Voices",
    title: "What Patients Say",
    desc: "Real words from real people whose lives have changed through natural healing."
  };

  const renderStars = (count) => {
    return '★'.repeat(count) + '☆'.repeat(5 - count);
  };

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="reveal visible">
          <div className="section-tag">{heading.tag}</div>
          <h2 className="section-title">{heading.title}</h2>
          <p className="section-desc">{heading.desc}</p>
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
