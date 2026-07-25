import { Link } from 'react-router-dom';
import Compass from '../components/Compass';

export default function Home() {
  return (
    <div style={styles.hero}>
      <Compass />
      <h1 style={styles.h1}>Don't just learn about a career.<br />Experience it.</h1>
      <p style={styles.p}>
        Answer a few questions, chat with our AI guide, try a real mini-task,
        and get matched — backed by live career trends.
      </p>
      <Link to="/quiz" className="btn">Start Your Journey</Link>
    </div>
  );
}

const styles = {
  hero: {
    textAlign: 'center', padding: '100px 32px',
    background: 'linear-gradient(180deg, var(--navy), var(--navy-light))',
    color: 'var(--paper)',
  },
  h1: { color: 'var(--paper)', fontSize: '2.6rem', marginBottom: '16px' },
  p: { fontSize: '1.15rem', color: '#cdd6e0', marginBottom: '32px', maxWidth: '600px', marginInline: 'auto' },
};