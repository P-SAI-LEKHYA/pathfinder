import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/quiz', label: 'Try It' },
  { to: '/news', label: 'Career News' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <NavLink to="/" style={styles.logo}>PathFinder</NavLink>
      <ul style={styles.list}>
        {links.map((l) => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              end={l.end}
              style={({ isActive }) => ({
                ...styles.link,
                color: isActive ? 'var(--amber)' : 'var(--paper)',
              })}
            >
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    position: 'sticky', top: 0, zIndex: 100,
    background: 'var(--navy)', padding: '16px 32px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    flexWrap: 'wrap', gap: '12px',
  },
  logo: {
    color: 'var(--amber)', fontFamily: 'var(--font-display)',
    fontSize: '1.4rem', fontWeight: 'bold', textDecoration: 'none',
  },
  list: { listStyle: 'none', display: 'flex', gap: '20px', flexWrap: 'wrap' },
  link: { textDecoration: 'none', fontSize: '0.95rem' },
};