import React from 'react';

export default function Hero() {
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="home">
      <div className="hero-bg"></div>
      <div className="hero-pattern"></div>
      <div className="hero-inner container">
        <div className="hero-content">
          <div className="hero-tag">Online Consultations Available</div>
          <h1>Heal Naturally with <em>Dr. Aisha Malik</em></h1>
          <div className="hero-subtitle">BHMS · Hijama Therapist · Holistic Wellness Specialist</div>
          <p className="hero-desc">
            Bridging ancient healing wisdom with modern medicine. Offering personalized homoeopathic treatment and evidence-based Hijama therapy from the comfort of your home.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-num">12<span>+</span></div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat">
              <div className="stat-num">3<span>k+</span></div>
              <div className="stat-label">Patients Treated</div>
            </div>
            <div className="stat">
              <div className="stat-num">95<span>%</span></div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
          </div>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => handleScrollTo('booking')}>
              📅 Book Free Consultation
            </button>
            <button className="btn-secondary" onClick={() => handleScrollTo('success')}>
              View Case Studies
            </button>
          </div>
        </div>

        <div className="hero-visual">
          {/* Floating badges */}
          <div className="badge-float badge1">
            <span className="badge-icon">🌿</span>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text3)' }}>Certified in</div>
              <div style={{ fontSize: '0.82rem' }}>Homoeopathy</div>
            </div>
          </div>
          <div className="badge-float badge2">
            <span className="badge-icon">✅</span>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text3)' }}>Next slot</div>
              <div style={{ fontSize: '0.82rem' }}>Today 4:00 PM</div>
            </div>
          </div>

          {/* Doctor Card */}
          <div className="hero-card">
            <div className="hero-img-placeholder">
              {/* SVG Doctor Illustration */}
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
              <div className="verified-badge">✓</div>
            </div>
            <div className="hero-card-info">
              <div className="hero-card-name">Dr. Aisha Malik</div>
              <div className="hero-card-title">Homoeopathic Physician & Hijama Specialist</div>
              <div className="availability-chip">Available for Online Consult</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
