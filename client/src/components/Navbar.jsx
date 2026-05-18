import useFetchData from "../hooks/useFetchData";

export default function Navbar({ scrolled, dark, setDark, hover, unhover }) {
  const { data: navList } = useFetchData('navbar/active', []);
  const navData = navList[0] || { logo_text: 'IRON', logo_accent: 'X', cta_text: 'Join Now' };

  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <a href="#" className="nav-logo">{navData.logo_text}<span>{navData.logo_accent}</span></a>
      <ul className="nav-links">
        {["Programs", "Trainers", "Pricing", "Schedule"].map(l => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} onMouseEnter={hover} onMouseLeave={unhover}>
              {l}
            </a>
          </li>
        ))}
        <li>
          <a href="#join" className="nav-cta" onMouseEnter={hover} onMouseLeave={unhover}>
            {navData.cta_text}
          </a>
        </li>
      </ul>

      {/* THEME TOGGLE */}
      <button
        className="theme-toggle"
        onClick={() => setDark(d => !d)}
        onMouseEnter={hover} onMouseLeave={unhover}
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <div className="toggle-knob">{dark ? "🌙" : "☀️"}</div>
      </button>
    </nav>
  );
}
