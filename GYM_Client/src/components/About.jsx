import React from 'react';
import { Dumbbell, Apple, Activity, Heart, Trophy, Target } from 'lucide-react';

export default function About() {
  const certifications = [
    { icon: Dumbbell, title: "NSCA — CSCS", desc: "Strength & Conditioning" },
    { icon: Apple, title: "Precision Nutrition L2", desc: "Nutrition Coaching" },
    { icon: Activity, title: "FMS Certified", desc: "Movement Screening" },
    { icon: Heart, title: "ACSM — CPT", desc: "Clinical Exercise" }
  ];

  return (
    <section className="about" id="about">
      <div className="container about-inner">
        <div className="about-img-wrap reveal-left">
          <div className="about-img">
            <svg viewBox="0 0 240 360" width="200" height="300" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Trophy / achievement icon */}
              <circle cx="120" cy="140" r="70" fill="rgba(232,255,0,0.06)" stroke="rgba(232,255,0,0.15)" strokeWidth="1" />
              <circle cx="120" cy="140" r="50" fill="rgba(232,255,0,0.04)" stroke="rgba(232,255,0,0.1)" strokeWidth="1" />
              {/* Lightning bolt */}
              <path d="M135,95 L108,145 L125,145 L105,190 L148,130 L130,130 Z" fill="rgba(232,255,0,0.55)" stroke="rgba(232,255,0,0.9)" strokeWidth="1.5" />
              
              {/* Medal circles with Lucide Icons instead of emojis */}
              <circle cx="60" cy="270" r="28" fill="rgba(232,255,0,0.1)" stroke="rgba(232,255,0,0.3)" strokeWidth="1.5" />
              <foreignObject x="48" y="258" width="24" height="24">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', color: 'var(--accent)' }}>
                  <Trophy size={20} />
                </div>
              </foreignObject>

              <circle cx="120" cy="285" r="28" fill="rgba(232,255,0,0.1)" stroke="rgba(232,255,0,0.3)" strokeWidth="1.5" />
              <foreignObject x="108" y="273" width="24" height="24">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', color: 'var(--accent)' }}>
                  <Dumbbell size={20} />
                </div>
              </foreignObject>

              <circle cx="180" cy="270" r="28" fill="rgba(232,255,0,0.1)" stroke="rgba(232,255,0,0.3)" strokeWidth="1.5" />
              <foreignObject x="168" y="258" width="24" height="24">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', color: 'var(--accent)' }}>
                  <Target size={20} />
                </div>
              </foreignObject>
            </svg>
          </div>
          <div className="exp-badge">
            <div className="num">10</div>
            <div className="lbl">Years</div>
          </div>
        </div>

        <div className="about-content reveal">
          <div className="section-label">About Marcus</div>
          <h2 className="section-title">No Excuses.<br /><span className="dim">Only Results.</span></h2>
          <p>Marcus Reid is a NSCA-certified Strength & Conditioning Specialist based in Dubai with a decade of transforming everyday people into the best versions of themselves — athletes, executives, new mums, and complete beginners included.</p>
          <p>His approach cuts through the noise of the fitness industry: no fads, no gimmicks. Just intelligent, periodised programming backed by sport science, precise nutrition strategy, and relentless accountability — delivered online or in-person.</p>
          <p>Marcus has trained professional athletes, corporate executives, and hundreds of everyday clients across 4 countries. His philosophy: <strong style={{ color: 'var(--accent)' }}>consistency beats perfection every single time.</strong></p>

          <div className="certs-grid">
            {certifications.map((c, idx) => {
              const IconComponent = c.icon;
              return (
                <div className="cert-card" key={idx}>
                  <div className="icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                    <IconComponent size={22} />
                  </div>
                  <div className="text">
                    <strong>{c.title}</strong>
                    <span>{c.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
