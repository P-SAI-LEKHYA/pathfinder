import { Link } from 'react-router-dom';
import Compass from '../components/Compass';

const steps = [
  {
    num: '01',
    icon: '📊',
    title: 'Interactive Questionnaire',
    desc: 'Answer a brief 3-question survey about what excites you, your preferred work environment, and your problem-solving style.',
    badge: 'Step 1 · 1 Min',
  },
  {
    num: '02',
    icon: '🤖',
    title: 'AI Guide Consultation',
    desc: 'Our conversational AI guide calculates your top 2 career matches and asks a tailored follow-up question to refine your preference.',
    badge: 'Step 2 · 1 Min',
  },
  {
    num: '03',
    icon: '⚡',
    title: 'Hands-On Mini Task',
    desc: 'Test-drive real tasks: debug software code, design room floorplans, or optimize marketing copy. Get instant feedback on your work.',
    badge: 'Step 3 · Interactive',
  },
  {
    num: '04',
    icon: '🎯',
    title: 'Match Result + Live News',
    desc: 'Receive your verified career match summary alongside live market trends, real headlines, and salary expectations for your role.',
    badge: 'Step 4 · Career Insights',
  },
];

export default function HowItWorks() {
  return (
    <div className="page-wrapper container">
      {/* Header Banner */}
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <span className="badge badge-cyan" style={{ marginBottom: 12 }}>Experiential Discovery</span>
        <h1 className="gradient-text" style={{ marginBottom: 16 }}>How PathFinder Works</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 640, margin: '0 auto', fontSize: '1.1rem' }}>
          Moving beyond traditional static career advice. Here is how our 4-step interactive pipeline helps you discover your true calling.
        </p>
      </div>

      {/* Grid of Steps */}
      <div style={styles.grid}>
        {steps.map((s, index) => (
          <div key={s.num} className="card card-hover" style={styles.stepCard}>
            <div style={styles.cardHeader}>
              <div style={styles.numBadge}>{s.num}</div>
              <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>{s.badge}</span>
            </div>

            <div style={styles.iconCircle}>{s.icon}</div>

            <h3 style={{ fontSize: '1.35rem', marginBottom: 10 }}>{s.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Launch Banner */}
      <div className="card" style={styles.launchBanner}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Compass size={44} />
            <div>
              <h3 style={{ fontSize: '1.4rem' }}>Ready to experience your first task?</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Takes less than 3 minutes to complete.</p>
            </div>
          </div>
          <Link to="/quiz" className="btn" style={{ padding: '14px 32px' }}>
            Launch Quiz & Task →
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    marginBottom: '56px',
  },
  stepCard: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  cardHeader: {
    display: 'flex',
    justify: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  numBadge: {
    fontFamily: 'var(--font-mono)',
    fontSize: '1.2rem',
    fontWeight: 800,
    color: 'var(--accent-amber)',
    background: 'rgba(255, 158, 59, 0.1)',
    padding: '4px 12px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 158, 59, 0.3)',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justify: 'center',
    fontSize: '1.4rem',
    marginBottom: '16px',
  },
  launchBanner: {
    background: 'linear-gradient(135deg, rgba(18, 24, 39, 0.9), rgba(255, 158, 59, 0.12))',
    border: '1px solid rgba(255, 158, 59, 0.3)',
    padding: '32px 40px',
  },
};