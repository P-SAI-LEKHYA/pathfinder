import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/finder', label: 'Career Finder' },
  { to: '/roadmap', label: 'Road map' },
  { to: '/trends', label: 'Market Trends' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  return (
    <header className="site-header">
      <nav className="container site-nav">
        <NavLink to="/" className="site-logo" end>
          Path<span className="logo-accent">Finder</span>
        </NavLink>

        <ul className="site-nav-list">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.end}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
