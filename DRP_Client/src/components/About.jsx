import React from 'react';
import { GraduationCap, Award, Globe } from 'lucide-react';

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container about-inner">
        <div className="about-visual reveal visible">
          <div className="about-deco"></div>
          <div className="about-deco2"></div>
          <div className="about-img-wrap">
            <svg viewBox="0 0 240 300" width="200" height="250" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Clipboard / file */}
              <rect x="60" y="80" width="120" height="160" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="1.5"/>
              <rect x="90" y="70" width="60" height="24" rx="8" fill="var(--accent)"/>
              {/* Lines on clipboard */}
              <rect x="76" y="120" width="88" height="3" rx="2" fill="var(--border)"/>
              <rect x="76" y="135" width="70" height="3" rx="2" fill="var(--border)"/>
              <rect x="76" y="150" width="80" height="3" rx="2" fill="var(--border)"/>
              <rect x="76" y="165" width="60" height="3" rx="2" fill="var(--border)"/>
              {/* Check mark */}
              <circle cx="148" cy="185" r="18" fill="var(--accent)" opacity="0.15"/>
              <path d="M138,185 L145,193 L158,177" stroke="var(--accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              {/* Star of life / medicine symbol */}
              <text x="110" y="108" font-size="14" fill="white" text-anchor="middle" font-weight="bold">✚</text>
              {/* Leaves decoration */}
              <ellipse cx="50" cy="170" rx="18" ry="10" fill="var(--accent)" opacity="0.3" transform="rotate(-30 50 170)"/>
              <ellipse cx="48" cy="155" rx="15" ry="8" fill="var(--gold)" opacity="0.25" transform="rotate(-40 48 155)"/>
              <ellipse cx="190" cy="130" rx="18" ry="10" fill="var(--accent)" opacity="0.25" transform="rotate(20 190 130)"/>
            </svg>
          </div>
        </div>
        <div className="about-content reveal reveal-delay-1 visible">
          <div className="section-tag">About the Doctor</div>
          <h2 className="section-title">Holistic Healing, <br/>Personalised Care</h2>
          <p style={{ color: 'var(--text2)', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: '1.8' }}>
            Dr. Aisha Malik is a board-certified Homoeopathic Physician with over 12 years of clinical experience. She specialises in chronic disease management, women's health, and detoxification through evidence-based Hijama (cupping) therapy.
          </p>
          <p style={{ color: 'var(--text2)', marginBottom: '2rem', fontSize: '0.95rem', lineHeight: '1.8' }}>
            Her patient-first approach blends classical homoeopathic case-taking with functional medicine insights, delivering lasting results for complex and long-standing conditions — all through secure video consultations.
          </p>
          <ul className="qual-list">
            <li className="qual-item">
              <span className="qual-icon" style={{ color: 'var(--accent)', display: 'inline-flex' }}><GraduationCap size={22} /></span>
              <div className="qual-text">
                <strong>BHMS — Bachelor of Homoeopathic Medicine & Surgery</strong>
                <span>National University of Medical Sciences, Rawalpindi — 2011</span>
              </div>
            </li>
            <li className="qual-item">
              <span className="qual-icon" style={{ color: 'var(--accent)', display: 'inline-flex' }}><Award size={22} /></span>
              <div className="qual-text">
                <strong>Certified Hijama (Wet Cupping) Practitioner</strong>
                <span>International Hijama Institute — 2015</span>
              </div>
            </li>
            <li className="qual-item">
              <span className="qual-icon" style={{ color: 'var(--accent)', display: 'inline-flex' }}><Globe size={22} /></span>
              <div className="qual-text">
                <strong>Treating Patients Globally Since 2019</strong>
                <span>Pakistan · UAE · UK · Canada · USA</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
