import React from 'react';
import { Calendar, Leaf, CheckCircle } from 'lucide-react';
import useFetchData from '../hooks/useFetchData';

export default function Hero() {
  const { data: dbHero } = useFetchData('hero_section/active', []);

  const hero = dbHero && dbHero.length > 0 ? dbHero[0] : {
    tag: "Online Consultations Available",
    title_line1: "Heal Naturally with",
    title_line2: "Dr. Aisha Malik",
    subtitle: "BHMS · Hijama Therapist · Holistic Wellness Specialist",
    desc: "Bridging ancient healing wisdom with modern medicine. Offering personalized homoeopathic treatment and evidence-based Hijama therapy from the comfort of your home.",
    stat1_val: "12",
    stat1_lbl: "Years Experience",
    stat2_val: "3k+",
    stat2_lbl: "Patients Treated",
    stat3_val: "95%",
    stat3_lbl: "Satisfaction Rate",
    btn_text: "Book Free Consultation",
    btn2_text: "View Case Studies",
    badge1_title: "Certified in",
    badge1_value: "Homoeopathy",
    badge2_title: "Next slot",
    badge2_value: "Today 4:00 PM"
  };

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Clean button text if it starts with the calendar emoji from previous edits or database seeds
  const cleanBtnText = hero.btn_text ? hero.btn_text.replace(/^[📅\s]+/, '') : "Book Free Consultation";

  const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('blob:')) return path;
    const baseUrl = import.meta.env.VITE_API_URL || '/GYM-Templates-/DRP_Server/public';
    return `${baseUrl}/${path.startsWith('upload/') ? path : 'upload/' + path}`;
  };

  return (
    <section className="hero" id="home">
      <div className="hero-bg"></div>
      <div className="hero-pattern"></div>
      <div className="hero-inner container">
        <div className="hero-content">
          <div className="hero-tag">{hero.tag}</div>
          <h1>{hero.title_line1} <em>{hero.title_line2}</em></h1>
          <div className="hero-subtitle">{hero.subtitle}</div>
          <p className="hero-desc">{hero.desc}</p>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-num">{hero.stat1_val}</div>
              <div className="stat-label">{hero.stat1_lbl}</div>
            </div>
            <div className="stat">
              <div className="stat-num">{hero.stat2_val}</div>
              <div className="stat-label">{hero.stat2_lbl}</div>
            </div>
            <div className="stat">
              <div className="stat-num">{hero.stat3_val}</div>
              <div className="stat-label">{hero.stat3_lbl}</div>
            </div>
          </div>
          <div className="hero-btns">
            <button className="btn-primary" style={{ gap: '8px' }} onClick={() => handleScrollTo('booking')}>
              <Calendar size={18} /> {cleanBtnText}
            </button>
            <button className="btn-secondary" onClick={() => handleScrollTo('success')}>
              {hero.btn2_text || "View Case Studies"}
            </button>
          </div>
        </div>

        <div className="hero-visual">
          {/* Floating badges */}
          <div className="badge-float badge1">
            <span className="badge-icon" style={{ color: 'var(--accent)', display: 'inline-flex' }}><Leaf size={20} /></span>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text3)' }}>{hero.badge1_title}</div>
              <div style={{ fontSize: '0.82rem' }}>{hero.badge1_value}</div>
            </div>
          </div>
          <div className="badge-float badge2">
            <span className="badge-icon" style={{ color: 'var(--accent)', display: 'inline-flex' }}><CheckCircle size={20} /></span>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text3)' }}>{hero.badge2_title}</div>
              <div style={{ fontSize: '0.82rem' }}>{hero.badge2_value}</div>
            </div>
          </div>

          {/* Doctor Card */}
          <div className="hero-card">
            <div className="hero-img-placeholder">
              {hero.image ? (
                <img 
                  src={getImageUrl(hero.image)} 
                  alt={hero.title_line2} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              ) : (
                /* SVG Doctor Illustration */
                <svg viewBox="0 0 200 280" width="170" height="238" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Body / coat */}
                  <rect x="40" y="130" width="120" height="140" rx="10" fill="#2e6b5e" opacity="0.9"/>
                  {/* White coat details */}
                  <rect x="85" y="130" width="30" height="140" fill="rgba(255,255,255,0.15)"/>
                  {/* Collar */}
                  <polygon points="85,130 100,155 115,130" fill="rgba(255,255,255,0.3)"/>
                  {/* Stethoscope */}
                  <circle cx="100" cy="185" r="12" fill="none" stroke="var(--gold)" stroke-width="2.5" opacity="0.7"/>
                  <path d="M88,185 Q75,200 75,215" stroke="var(--gold)" stroke-width="2.5" fill="none" opacity="0.7"/>
                  {/* Neck */}
                  <rect x="88" y="110" width="24" height="28" rx="8" fill="#c8a882"/>
                  {/* Head */}
                  <ellipse cx="100" cy="90" rx="38" ry="44" fill="#c8a882"/>
                  {/* Hair */}
                  <ellipse cx="100" cy="55" rx="38" ry="20" fill="#4a2c1a"/>
                  <rect x="62" y="55" width="10" height="40" rx="5" fill="#4a2c1a"/>
                  <rect x="128" y="55" width="10" height="40" rx="5" fill="#4a2c1a"/>
                  {/* Hijab/scarf suggestion */}
                  <path d="M62,78 Q62,48 100,44 Q138,48 138,78 L138,100 Q120,115 100,115 Q80,115 62,100 Z" fill="#2e6b5e" opacity="0.85"/>
                  {/* Eyes */}
                  <ellipse cx="88" cy="88" rx="5" ry="6" fill="#2a1a0e"/>
                  <ellipse cx="112" cy="88" rx="5" ry="6" fill="#2a1a0e"/>
                  <circle cx="90" cy="86" r="1.5" fill="white"/>
                  <circle cx="114" cy="86" r="1.5" fill="white"/>
                  {/* Smile */}
                  <path d="M90,103 Q100,112 110,103" stroke="#8b5e3c" stroke-width="2" fill="none" stroke-linecap="round"/>
                  {/* Pocket & pen */}
                  <rect x="48" y="165" width="28" height="22" rx="4" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
                  <rect x="55" y="158" width="4" height="12" rx="2" fill="var(--gold)" opacity="0.8"/>
                  <rect x="63" y="158" width="4" height="12" rx="2" fill="var(--gold)" opacity="0.8"/>
                </svg>
              )}
              <div className="verified-badge">✓</div>
            </div>
            <div className="hero-card-info">
              <div className="hero-card-name">{hero.title_line2}</div>
              <div className="hero-card-title">Homoeopathic Physician & Hijama Specialist</div>
              <div className="availability-chip">Available for Online Consult</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

