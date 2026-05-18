import React from "react";
import useFetchData from "../hooks/useFetchData";
import VisualEditorTrigger from "./Admin/VisualEditorTrigger";

export default function Hero({ hover, unhover }) {
  const { data: heroList } = useFetchData('hero_section/active', []);
  
  if (!heroList || heroList.length === 0) return null;
  
  const heroData = heroList[0] || {
    tag: 'Now Accepting Members',
    title_line1: 'FORGE YOUR',
    title_line2: 'BEST',
    title_line3: 'BODY',
    btn1_text: 'Start Free Trial',
    btn2_text: 'Explore Programs',
    subtitle: 'Elite coaching. Cutting-edge equipment. A community that pushes you further than you thought possible.',
    stat1_val: '2.4K+',
    stat1_lbl: 'Active Members',
    stat2_val: '98%',
    stat2_lbl: 'Satisfaction Rate',
    image: ''
  };

  const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const baseUrl = import.meta.env.VITE_API_URL || '/gym_v1/server/public';
    return `${baseUrl}/${path}`;
  };

  return (
    <section className="hero" id="home">
      <VisualEditorTrigger sectionPath="/admin/hero_section" />
      <div className="hero-bg" />
      <div className="hero-divider" />
      <div className="hero-content">
        <div className="hero-tag fade-in visible">{heroData.tag}</div>
        <h1 className="hero-title fade-in visible" style={{ transitionDelay: "0.1s" }}>
          {heroData.title_line1 && <>{heroData.title_line1}<br /></>}
          {heroData.title_line2 && <><span className="accent">{heroData.title_line2}</span><br /></>}
          {heroData.title_line3 && <span className="stroke">{heroData.title_line3}</span>}
        </h1>
        <p className="hero-sub fade-in visible" style={{ transitionDelay: "0.2s" }}>
          {heroData.subtitle}
        </p>
        <div className="hero-actions fade-in visible" style={{ transitionDelay: "0.3s" }}>
          <a href="#join" className="btn-primary" onMouseEnter={hover} onMouseLeave={unhover}>
            {heroData.btn1_text}
          </a>
          <a href="#programs" className="btn-ghost" onMouseEnter={hover} onMouseLeave={unhover}>
            {heroData.btn2_text}
          </a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-img-wrap">
          <div className="hero-img-shadow" />
          <div className="hero-img" style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {heroData.image ? (
              <img 
                src={getImageUrl(heroData.image)} 
                alt="Hero" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            ) : (
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                <rect x="30" y="85" width="140" height="30" rx="6" fill="currentColor" />
                <rect x="10" y="75" width="30" height="50" rx="8" fill="currentColor" />
                <rect x="160" y="75" width="30" height="50" rx="8" fill="currentColor" />
                <rect x="70" y="60" width="60" height="80" rx="4" fill="currentColor" opacity=".6" />
                <circle cx="100" cy="100" r="15" fill="var(--accent)" opacity=".8" />
              </svg>
            )}
          </div>
          <div className="hero-stat-card left">
            <div className="stat-num">{heroData.stat1_val}</div>
            <div className="stat-label">{heroData.stat1_lbl}</div>
          </div>
          <div className="hero-stat-card right">
            <div className="stat-num">{heroData.stat2_val}</div>
            <div className="stat-label">{heroData.stat2_lbl}</div>
          </div>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="scroll-line" />
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
