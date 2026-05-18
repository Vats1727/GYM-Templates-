import useFetchData from "../hooks/useFetchData";
import { renderDynamicIcon } from "../utils/IconRenderer";

export default function Footer({ hover, unhover }) {
  const { data: footerList } = useFetchData('footer/active', []);
  const footerData = footerList[0] || {
    logo_text: 'IRON',
    logo_accent: 'X',
    description: 'The premier training destination for those serious about transformation. Elite coaching meets community.',
    fb_link: 'https://facebook.com/',
    tw_link: 'https://twitter.com/',
    ig_link: 'https://instagram.com/',
    yt_link: 'https://youtube.com/',
    address_line1: '123 Iron District',
    address_line2: 'New York, NY 10001',
    hours_line1: 'Mon–Fri: 5am – 11pm',
    hours_line2: 'Sat–Sun: 7am – 9pm',
    phone_number: '+1 (212) 555-0100'
  };

  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 24, letterSpacing: 3, color: "var(--text)" }}>
            {footerData.logo_text}<span style={{ color: "var(--accent)" }}>{footerData.logo_accent}</span>
          </div>
          <p>
            {footerData.description}
          </p>
          <div className="footer-socials" style={{ display: 'flex', gap: '8px' }}>
            {footerData.fb_link && (
              <a href={footerData.fb_link} target="_blank" rel="noopener noreferrer" className="social-btn" onMouseEnter={hover} onMouseLeave={unhover} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%' }}>
                {renderDynamicIcon('Facebook', 16, '🌐')}
              </a>
            )}
            {footerData.tw_link && (
              <a href={footerData.tw_link} target="_blank" rel="noopener noreferrer" className="social-btn" onMouseEnter={hover} onMouseLeave={unhover} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%' }}>
                {renderDynamicIcon('Twitter', 16, '🌐')}
              </a>
            )}
            {footerData.ig_link && (
              <a href={footerData.ig_link} target="_blank" rel="noopener noreferrer" className="social-btn" onMouseEnter={hover} onMouseLeave={unhover} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%' }}>
                {renderDynamicIcon('Instagram', 16, '🌐')}
              </a>
            )}
            {footerData.yt_link && (
              <a href={footerData.yt_link} target="_blank" rel="noopener noreferrer" className="social-btn" onMouseEnter={hover} onMouseLeave={unhover} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%' }}>
                {renderDynamicIcon('Youtube', 16, '🌐')}
              </a>
            )}
          </div>
        </div>
        <div className="footer-col">
          <h4>Programs</h4>
          <ul>
            {["HIIT Training", "Boxing", "Strength", "Yoga", "Spinning", "CrossFit"].map(l => (
              <li key={l}>
                <a href="#">{l}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            {["About Us", "Our Coaches", "Careers", "Press", "Blog", "Contact"].map(l => (
              <li key={l}>
                <a href="#">{l}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h4>Visit Us</h4>
          <ul>
            {footerData.address_line1 && (
              <li>
                <a href="#">{footerData.address_line1}</a>
              </li>
            )}
            {footerData.address_line2 && (
              <li>
                <a href="#">{footerData.address_line2}</a>
              </li>
            )}
            {footerData.hours_line1 && (
              <li>
                <a href="#">{footerData.hours_line1}</a>
              </li>
            )}
            {footerData.hours_line2 && (
              <li>
                <a href="#">{footerData.hours_line2}</a>
              </li>
            )}
            {footerData.phone_number && (
              <li style={{ marginTop: 12 }}>
                <a href={`tel:${footerData.phone_number.replace(/\s+/g, '')}`} style={{ color: "var(--accent)" }}>
                  {footerData.phone_number}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 IronX Fitness. All rights reserved.</p>
        <p>Privacy Policy · Terms of Service · Cookie Settings</p>
      </div>
    </footer>
  );
}
