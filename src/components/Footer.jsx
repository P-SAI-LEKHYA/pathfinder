export default function Footer() {
  return (
    <footer style={styles.footer}>
      © 2026 PathFinder — Discover the career that actually fits you.
    </footer>
  );
}

const styles = {
  footer: {
    textAlign: 'center', padding: '40px 20px',
    background: 'var(--navy)', color: '#9fb0c3',
  },
};