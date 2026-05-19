import React, { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const [theme, setTheme] = useState(document.documentElement.dataset.theme || 'light');
  const [font, setFont] = useState(document.documentElement.dataset.font || 'serif');
  const [fontMenuOpen, setFontMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const fontMenuRef = useRef(null);

  useEffect(() => {
    // Sync initial state with DOM
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.font = font;
  }, [theme, font]);

  useEffect(() => {
    // Close font dropdown on clicking outside
    function handleClickOutside(e) {
      if (fontMenuRef.current && !fontMenuRef.current.contains(e.target)) {
        setFontMenuOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    // Highlight active section on scroll
    const sections = ['about', 'treatments', 'success', 'testimonials', 'process'];
    const handleScroll = () => {
      let current = '';
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el && window.scrollY >= el.offsetTop - 100) {
          current = sectionId;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleSetFont = (f) => {
    setFont(f);
    setFontMenuOpen(false);
  };

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav>
        <div className="nav-brand" style={{ cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="dot"></div>
          Dr. Aisha <span>Malik</span>
        </div>

        <ul className="nav-links">
          {[['About', 'about'],
            ['Treatments', 'treatments'],
            ['Case Studies', 'success'],
            ['Reviews', 'testimonials'],
            ['How It Works', 'process']].map(([label, id]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo(id);
                }}
                style={{ color: activeSection === id ? 'var(--accent)' : '' }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-controls">
          <div className="font-menu" ref={fontMenuRef}>
            <button
              className="ctrl-btn"
              title="Change Font"
              onClick={() => setFontMenuOpen(!fontMenuOpen)}
            >
              Aa
            </button>
            <div className={`font-dropdown ${fontMenuOpen ? 'open' : ''}`}>
              <div
                className={`font-opt ${font === 'serif' ? 'active' : ''}`}
                onClick={() => handleSetFont('serif')}
              >
                Serif (Classic)
              </div>
              <div
                className={`font-opt ${font === 'sans' ? 'active' : ''}`}
                onClick={() => handleSetFont('sans')}
              >
                Sans (Modern)
              </div>
              <div
                className={`font-opt ${font === 'round' ? 'active' : ''}`}
                onClick={() => handleSetFont('round')}
              >
                Rounded (Soft)
              </div>
            </div>
          </div>

          <button
            className="ctrl-btn"
            title="Toggle Theme"
            onClick={handleToggleTheme}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <button
            className="btn-consult"
            onClick={() => handleScrollTo('booking')}
          >
            Book Consult
          </button>

          <div className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            handleScrollTo('about');
          }}
        >
          About
        </a>
        <a
          href="#treatments"
          onClick={(e) => {
            e.preventDefault();
            handleScrollTo('treatments');
          }}
        >
          Treatments
        </a>
        <a
          href="#success"
          onClick={(e) => {
            e.preventDefault();
            handleScrollTo('success');
          }}
        >
          Case Studies
        </a>
        <a
          href="#testimonials"
          onClick={(e) => {
            e.preventDefault();
            handleScrollTo('testimonials');
          }}
        >
          Reviews
        </a>
        <a
          href="#process"
          onClick={(e) => {
            e.preventDefault();
            handleScrollTo('process');
          }}
        >
          How It Works
        </a>
      </div>
    </>
  );
}
