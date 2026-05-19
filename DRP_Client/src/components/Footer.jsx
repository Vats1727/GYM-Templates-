import React from 'react';
import { Mail, MessageSquare, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="nav-brand" style={{ fontSize: '1.15rem' }}>
            <div className="dot"></div>
            Dr. Aisha <span>Malik</span>
          </div>
          <p>Holistic healing through the wisdom of homoeopathy and Sunnah-based Hijama therapy. Serving patients globally via secure online consultations.</p>
        </div>
        <div className="footer-col">
          <h4>Navigate</h4>
          <ul>
            <li>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo('about');
                }}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#treatments"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo('treatments');
                }}
              >
                Treatments
              </a>
            </li>
            <li>
              <a
                href="#success"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo('success');
                }}
              >
                Case Studies
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo('testimonials');
                }}
              >
                Reviews
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Treatments</h4>
          <ul>
            <li>
              <a
                href="#treatments"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo('treatments');
                }}
              >
                Homoeopathy
              </a>
            </li>
            <li>
              <a
                href="#treatments"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo('treatments');
                }}
              >
                Hijama Therapy
              </a>
            </li>
            <li>
              <a
                href="#treatments"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo('treatments');
                }}
              >
                Women's Health
              </a>
            </li>
            <li>
              <a
                href="#treatments"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo('treatments');
                }}
              >
                Paediatric Care
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:dr.aisha@healnaturally.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}><Mail size={16} /> dr.aisha@healnaturally.com</a></li>
            <li><a href="https://wa.me/+923001234567" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}><MessageSquare size={16} /> WhatsApp +92 300 123 4567</a></li>
            <li><a href="#home" onClick={(e) => { e.preventDefault(); handleScrollTo('home'); }} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} /> Online · Worldwide</a></li>
            <li><a href="#home" onClick={(e) => { e.preventDefault(); handleScrollTo('home'); }} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}><Clock size={16} /> 9 AM – 9 PM PKT</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom container">
        <span>© {new Date().getFullYear()} Dr. Aisha Malik. All rights reserved.</span>
        <span>Designed with care for patient wellbeing</span>
      </div>
    </footer>
  );
}
