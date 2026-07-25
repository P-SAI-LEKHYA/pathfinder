const steps = [
  { num: '01', title: 'Questionnaire', desc: 'Tell us what excites you and how you like to work.' },
  { num: '02', title: 'AI Chat Guide', desc: 'A real AI follow-up question narrows your best-fit careers.' },
  { num: '03', title: 'Mini Task', desc: 'Try a bite-sized, actually-scored task from the field.' },
  { num: '04', title: 'Match + News', desc: 'Get your result plus what\'s trending in that career right now.' },
];

export default function HowItWorks() {
  return (
    <div className="container">
      <h2>How It Works</h2>
      <div style={styles.grid}>
        {steps.map((s) => (
          <div key={s.num} className="card" style={styles.step}>
            <div style={styles.num}>{s.num}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginTop: 32 },
  step: { borderLeft: '4px solid var(--teal)' },
  num: { fontFamily: 'var(--font-mono)', color: 'var(--amber)', fontSize: '1.4rem', fontWeight: 'bold' },
};