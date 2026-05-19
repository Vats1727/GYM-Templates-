import React from 'react';
import { MessageCircle, Mail, MapPin, Clock, Zap } from 'lucide-react';

export default function Footer() {
  const handleBooking = () => {
    alert('Redirecting to Calendly or booking page');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/+971501234567', '_blank');
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ======= CTA BANNER ======= */}
      <section className="cta-banner" id="booking">
        <h2>STOP<br />WAITING.<br />START NOW.</h2>
        <p>3 online coaching spots available this month — they won't last</p>
        <div className="cta-btns">
          <button className="btn-dark" onClick={handleBooking} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
            <Zap size={18} fill="currentColor" /> Claim Your Spot
          </button>
          <button className="btn-dark-outline" onClick={handleWhatsApp} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
            <MessageCircle size={18} /> WhatsApp Marcus
          </button>
        </div>
      </section>

      {/* ======= FOOTER ======= */}
      <footer>
        <div className="footer-inner">
          <div>
            <div className="footer-logo">MARCUS<span>/REID</span></div>
            <p className="footer-bio">Elite personal training and online coaching for those who are serious about results. Based in Dubai, coaching clients globally.</p>
            <div className="footer-social">
              {/* Instagram SVG */}
              <div className="social-btn" title="Instagram" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
              {/* YouTube SVG */}
              <div className="social-btn" title="YouTube" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </div>
              {/* TikTok SVG */}
              <div className="social-btn" title="TikTok" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                </svg>
              </div>
              {/* WhatsApp Icon */}
              <div className="social-btn" title="WhatsApp" onClick={handleWhatsApp} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageCircle size={18} />
              </div>
            </div>
          </div>
          <div className="footer-col">
            <h4>Navigate</h4>
            <ul>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a></li>
              <li><a href="#specialties" onClick={(e) => { e.preventDefault(); scrollToSection('specialties'); }}>Training</a></li>
              <li><a href="#transformations" onClick={(e) => { e.preventDefault(); scrollToSection('transformations'); }}>Transformations</a></li>
              <li><a href="#programs" onClick={(e) => { e.preventDefault(); scrollToSection('programs'); }}>Programs</a></li>
              <li><a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollToSection('testimonials'); }}>Reviews</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><a href="#programs" onClick={(e) => { e.preventDefault(); scrollToSection('programs'); }}>Online Coaching</a></li>
              <li><a href="#programs" onClick={(e) => { e.preventDefault(); scrollToSection('programs'); }}>In-Person PT</a></li>
              <li><a href="#programs" onClick={(e) => { e.preventDefault(); scrollToSection('programs'); }}>Nutrition Plans</a></li>
              <li><a href="#programs" onClick={(e) => { e.preventDefault(); scrollToSection('programs'); }}>Athlete Prep</a></li>
              <li><a href="#programs" onClick={(e) => { e.preventDefault(); scrollToSection('programs'); }}>Corporate Wellness</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text3)' }}>
                <Mail size={16} style={{ color: 'var(--accent)' }} />
                <a href="mailto:marcus@marcusreid.fit" style={{ color: 'inherit' }}>marcus@marcusreid.fit</a>
              </li>
              <li style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text3)', cursor: 'pointer' }} onClick={handleWhatsApp}>
                <MessageCircle size={16} style={{ color: 'var(--accent)' }} />
                <span>WhatsApp +971 50 123 4567</span>
              </li>
              <li style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text3)' }}>
                <MapPin size={16} style={{ color: 'var(--accent)' }} />
                <span>Dubai, UAE & Online</span>
              </li>
              <li style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text3)' }}>
                <Clock size={16} style={{ color: 'var(--accent)' }} />
                <span>7 Days · 6 AM – 9 PM GST</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Marcus Reid Fitness. All rights reserved.</span>
          <span style={{ color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            NO EXCUSES. ONLY RESULTS. <Zap size={14} fill="currentColor" />
          </span>
        </div>
      </footer>
    </>
  );
}
