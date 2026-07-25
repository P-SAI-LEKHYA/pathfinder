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
      <h3>Mini Task: {career.name}</h3>
      <p style={{ marginTop: 8, marginBottom: 16 }}>{prompt}</p>
      {options.map((opt, i) => (
        <button
          key={i}
          className={`option ${selected !== null ? (i === correct ? 'correct' : i === selected ? 'incorrect' : '') : ''}`}
          onClick={() => selected === null && choose(i)}
          disabled={selected !== null}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}