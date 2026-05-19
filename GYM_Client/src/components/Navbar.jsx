import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function Navbar({ theme, setTheme, font, setFont }) {
  const [fontMenuOpen, setFontMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleFontMenu = (e) => {
    e.stopPropagation();
    setFontMenuOpen(prev => !prev);
  };

  const selectFont = (fontName) => {
    setFont(fontName);
    setFontMenuOpen(false);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const clickOutside = () => setFontMenuOpen(false);
    window.addEventListener('click', clickOutside);
    return () => window.removeEventListener('click', clickOutside);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav>
        <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer' }}>
          MARCUS<span className="slash">/</span>REID
        </div>

        <ul className="nav-links">
          <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a></li>
          <li><a href="#specialties" onClick={(e) => { e.preventDefault(); scrollToSection('specialties'); }}>Training</a></li>
          <li><a href="#transformations" onClick={(e) => { e.preventDefault(); scrollToSection('transformations'); }}>Results</a></li>
          <li><a href="#programs" onClick={(e) => { e.preventDefault(); scrollToSection('programs'); }}>Programs</a></li>
          <li><a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollToSection('testimonials'); }}>Reviews</a></li>
        </ul>

        <div className="nav-right">
          <div className="font-menu">
            <button className="ctrl-btn" title="Font" onClick={toggleFontMenu}>Aa</button>
            <div className={`font-dropdown ${fontMenuOpen ? 'open' : ''}`}>
              <div className={`font-opt ${font === 'impact' ? 'active' : ''}`} onClick={() => selectFont('impact')}>Impact (Bold)</div>
              <div className={`font-opt ${font === 'strong' ? 'active' : ''}`} onClick={() => selectFont('strong')}>Oswald (Strong)</div>
              <div className={`font-opt ${font === 'clean' ? 'active' : ''}`} onClick={() => selectFont('clean')}>Nunito (Clean)</div>
            </div>
          </div>

          <button className="ctrl-btn" id="themeBtn" title="Theme" onClick={toggleTheme} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button className="btn-nav" onClick={() => scrollToSection('programs')}>Start Now</button>

          <div className="hamburger" onClick={() => setMobileMenuOpen(prev => !prev)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`} id="mobileMenu">
        <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a>
        <a href="#specialties" onClick={(e) => { e.preventDefault(); scrollToSection('specialties'); }}>Training</a>
        <a href="#transformations" onClick={(e) => { e.preventDefault(); scrollToSection('transformations'); }}>Results</a>
        <a href="#programs" onClick={(e) => { e.preventDefault(); scrollToSection('programs'); }}>Programs</a>
        <a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollToSection('testimonials'); }}>Reviews</a>
      </div>
    </>
  );
}
