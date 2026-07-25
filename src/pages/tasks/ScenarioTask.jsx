import { useState } from 'react';

export default function ScenarioTask({ career, onComplete }) {
  const [selected, setSelected] = useState(null);
  const { prompt, options, correct } = career.scenario;

  function choose(i) {
    setSelected(i);
    onComplete(i === correct);
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h4 style={{ fontSize: '1.15rem', color: 'var(--accent-amber)' }}>
          Real-World Scenario: {career.name}
        </h4>
        <p style={{ color: 'var(--text-primary)', fontSize: '1.05rem', marginTop: 8, lineHeight: 1.5 }}>
          "{prompt}"
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {options.map((opt, i) => (
          <button
            key={i}
            className={`option ${selected !== null ? (i === correct ? 'correct' : i === selected ? 'incorrect' : '') : ''}`}
            onClick={() => selected === null && choose(i)}
            disabled={selected !== null}
          >
            <span>{opt}</span>
            {selected !== null && i === correct && (
              <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>✓ Optimal Decision</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}