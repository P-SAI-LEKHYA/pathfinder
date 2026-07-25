import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand-text">
          Path<span className="logo-accent">Finder</span>
        </div>
        <nav className="footer-links" aria-label="Footer">
          <Link to="/finder">Career Finder</Link>
          <Link to="/roadmap">Road map</Link>
          <Link to="/trends">Market Trends</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <p className="footer-bottom-line">
          © {new Date().getFullYear()} PathFinder · Career guidance through conversation
        </p>
      </div>
    </footer>
  );
}
