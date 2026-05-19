import React from 'react';
import { Zap } from 'lucide-react';

export default function Hero() {
  const scrollToPrograms = () => {
    const el = document.getElementById('programs');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTransformations = () => {
    const el = document.getElementById('transformations');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home">
      <div className="hero-bg"></div>
      <div className="hero-grid"></div>
      <div className="hero-watermark">10</div>

      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-tag">Elite Personal Training · Online & In-Person</div>
          <h1>
            <span className="outline">BUILD</span><br />
            <span className="highlight">YOUR</span><br />
            BEST<br />
            <span className="outline">BODY</span>
          </h1>
          <p className="hero-tagline">Strength · Conditioning · Body Recomposition · Athletic Performance</p>

          <div className="hero-stats">
            <div>
              <div className="h-stat-num">500<em>+</em></div>
              <div className="h-stat-label">Clients Transformed</div>
            </div>
            <div>
              <div className="h-stat-num">10<em>yr</em></div>
              <div className="h-stat-label">Experience</div>
            </div>
            <div>
              <div className="h-stat-num">98<em>%</em></div>
              <div className="h-stat-label">Goal Achievement</div>
            </div>
          </div>

          <div className="hero-btns">
            <button className="btn-primary" onClick={scrollToPrograms} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              <Zap size={18} fill="currentColor" /> Get My Program
            </button>
            <button className="btn-ghost" onClick={scrollToTransformations}>
              View Transformations
            </button>
          </div>
        </div>

        {/* Side card */}
        <div className="hero-card">
          <div className="trainer-visual">
            {/* SVG Trainer Illustration */}
            <svg viewBox="0 0 280 340" width="230" height="280" className="body-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Torso */}
              <rect x="85" y="150" width="110" height="130" rx="8" fill="#2a2a2a" />
              {/* Shirt details */}
              <path d="M85,155 L140,175 L195,155" stroke="rgba(232,255,0,0.4)" strokeWidth="1.5" fill="none" />
              {/* Arms */}
              <rect x="50" y="148" width="38" height="90" rx="16" fill="#c8a882" />
              <rect x="192" y="148" width="38" height="90" rx="16" fill="#c8a882" />
              {/* Forearms angled */}
              <rect x="30" y="225" width="32" height="55" rx="12" fill="#c8a882" transform="rotate(15 46 252)" />
              <rect x="218" y="225" width="32" height="55" rx="12" fill="#c8a882" transform="rotate(-15 234 252)" />
              {/* Dumbbells */}
              <rect x="8" y="258" width="40" height="12" rx="4" fill="#888" />
              <rect x="8" y="258" width="10" height="12" rx="2" fill="#555" />
              <rect x="38" y="258" width="10" height="12" rx="2" fill="#555" />
              <rect x="232" y="258" width="40" height="12" rx="4" fill="#888" />
              <rect x="232" y="258" width="10" height="12" rx="2" fill="#555" />
              <rect x="262" y="258" width="10" height="12" rx="2" fill="#555" />
              {/* Legs */}
              <rect x="90" y="275" width="44" height="65" rx="8" fill="#1a1a1a" />
              <rect x="146" y="275" width="44" height="65" rx="8" fill="#1a1a1a" />
              {/* Shoes */}
              <rect x="86" y="330" width="52" height="16" rx="6" fill="#333" />
              <rect x="142" y="330" width="52" height="16" rx="6" fill="#333" />
              {/* Neck */}
              <rect x="122" y="120" width="36" height="38" rx="10" fill="#c8a882" />
              {/* Head */}
              <ellipse cx="140" cy="85" rx="40" ry="44" fill="#c8a882" />
              {/* Hair */}
              <path d="M100,75 Q100,42 140,40 Q180,42 180,75 L178,60 Q165,30 140,28 Q115,30 102,60 Z" fill="#1a1a1a" />
              {/* Fade haircut sides */}
              <rect x="100" y="65" width="8" height="30" rx="4" fill="#2a2a2a" />
              <rect x="172" y="65" width="8" height="30" rx="4" fill="#2a2a2a" />
              {/* Eyes */}
              <ellipse cx="128" cy="83" rx="5" ry="5.5" fill="#1a1a1a" />
              <ellipse cx="152" cy="83" rx="5" ry="5.5" fill="#1a1a1a" />
              <circle cx="130" cy="81" r="1.5" fill="white" />
              <circle cx="154" cy="81" r="1.5" fill="white" />
              {/* Brow */}
              <path d="M122,76 Q128,73 134,76" stroke="#3a2a1a" stroke-width="2.5" stroke-linecap="round" fill="none" />
              <path d="M146,76 Q152,73 158,76" stroke="#3a2a1a" stroke-width="2.5" stroke-linecap="round" fill="none" />
              {/* Jaw / stubble hint */}
              <path d="M118,95 Q140,108 162,95" stroke="#b8987a" stroke-width="1.5" fill="none" stroke-linecap="round" />
              {/* Chest muscle lines */}
              <path d="M110,168 Q140,178 170,168" stroke="rgba(255,255,255,0.06)" stroke-width="1" fill="none" />
              {/* Yellow accent stripe on shirt */}
              <rect x="130" y="150" width="20" height="4" rx="2" fill="rgba(232,255,0,0.5)" />
            </svg>
          </div>
          <div className="hero-card-body">
            <div className="trainer-name">Marcus Reid</div>
            <div className="trainer-title">CSCS · Precision Nutrition · 10+ Years</div>
            <div className="cert-list">
              <div className="cert-item"><div className="cert-dot"></div> NSCA Certified Strength & Conditioning Specialist</div>
              <div className="cert-item"><div className="cert-dot"></div> Precision Nutrition Level 2 Coach</div>
              <div className="cert-item"><div className="cert-dot"></div> FMS Certified Movement Specialist</div>
            </div>
            <div className="avail-bar">
              <div className="pulse-dot"></div>
              Accepting new clients — 3 spots left
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-hint">
        <span>Scroll</span>
        <div className="scroll-arrow">↓</div>
      </div>
    </section>
  );
}
