import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="page-wrapper landing-page">
      <section className="landing-hero">
        <div className="landing-hero-bg" aria-hidden="true" />
        
        <div className="landing-hero-content container">
          <div className="hero-glass-card">
            <div className="hero-badge">
              <span className="live-dot" /> Live Interactive Career Intelligence
            </div>

            <h1 className="hero-title">Find Work That Fits How You Actually Think</h1>
            
            <p className="hero-lead">
              Have an organic conversation about your interests and strengths. Get top career fits, live market trends, and a custom step-by-step roadmap tailored to you.
            </p>

            <div className="hero-cta-row">
              <Link to="/finder" className="btn-hero-primary">
                Start Career Chat →
              </Link>
              <Link to="/trends" className="btn-hero-secondary">
                See Market Trends 📈
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-strip container">
        <div className="landing-step surface-3d">
          <span className="landing-step-num">01</span>
          <h2>Converse</h2>
          <p>Share what excites you — code, art, science, dance. The AI counselor listens and adapts.</p>
        </div>
        <div className="landing-step surface-3d">
          <span className="landing-step-num">02</span>
          <h2>Match</h2>
          <p>Receive your top career fits with real reasoning, salary insights in Rupees, and market demand.</p>
        </div>
        <div className="landing-step surface-3d">
          <span className="landing-step-num">03</span>
          <h2>Map</h2>
          <p>Navigate a personalized roadmap — click each stop directly on the winding road for action steps.</p>
        </div>
      </section>
    </div>
  );
}
