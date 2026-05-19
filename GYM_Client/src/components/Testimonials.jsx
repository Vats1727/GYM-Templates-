import React from 'react';
import { Zap } from 'lucide-react';
import useFetchData from '../hooks/useFetchData';

export default function Testimonials() {
  const { data: dbHeading } = useFetchData('testimonials_heading/active', []);
  const { data: dbTestimonials } = useFetchData('testimonials/active', []);

  const heading = dbHeading && dbHeading.length > 0 ? dbHeading[0] : {
    tag: "Client Reviews",
    title: "The Proof",
    desc: "Results speak louder. Here's what clients say after committing to the process."
  };

  const testimonials = dbTestimonials && dbTestimonials.length > 0 ? dbTestimonials : [
    {
      avatar: 'JK', stars: 5,
      text: "I'd tried 3 other trainers before Marcus. This was different from week one. The program was actually tailored to me — my schedule, my gym, my food preferences. Lost 22kg and kept every kilo off for over a year now.",
      authorName: 'James K.', authorMeta: 'Sales Director · Dubai · 6 months', result: 'Lost 22kg · Dropped from 24% to 11% body fat', featured: 1,
      avatarColors: ['#e8ff00', '#aabb00']
    },
    {
      avatar: 'RM', stars: 5,
      text: 'As a nurse working rotating shifts, I told Marcus I could never stick to a plan. He built something that actually worked around my life. 4 months later, I\'m the smallest and strongest I\'ve ever been. I genuinely love training now.',
      authorName: 'Rania M.', authorMeta: 'Registered Nurse · Online Client · 4 months', result: 'Lost 15kg · Now deadlifts 100kg', featured: 0,
      avatarColors: ['#ff6b35', '#f7c59f']
    },
    {
      avatar: 'YA', stars: 5,
      text: 'I went from benching 60kg to 120kg in 5 months. The programming is periodised in a way no generic gym plan even comes close to. Marcus explains the why behind everything, which made me way more committed to the process.',
      authorName: 'Yusuf A.', authorMeta: 'Student Athlete · Dubai · 5 months', result: 'Bench 60→120kg · Deadlift 180kg', featured: 0,
      avatarColors: ['#00d2ff', '#3a47d5']
    }
  ];

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="reveal" style={{ marginBottom: '3.5rem' }}>
          <div className="section-label">{heading.tag}</div>
          <h2 className="section-title">{heading.title}</h2>
          <p className="section-desc">{heading.desc}</p>
        </div>
        <div className="testi-grid">
          {testimonials.map((t, idx) => {
            const colors = Array.isArray(t.avatarColors) ? t.avatarColors : ['#e8ff00', '#aabb00'];
            const avatarStyle = { background: `linear-gradient(135deg, ${colors[0]}, ${colors[1] || colors[0]})` };

            const isFeatured = String(t.featured) === '1' || t.featured === 1 || t.featured === true;

            return (
              <div className={`testi-card reveal ${isFeatured ? 'featured' : ''}`} key={t.authorName || idx}>
                <div className="testi-top">
                  <div className="testi-avatar" style={avatarStyle}>
                    {t.avatar}
                  </div>
                  <div className="stars-block">
                    {'★'.repeat(Number(t.stars) || 5)}
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
