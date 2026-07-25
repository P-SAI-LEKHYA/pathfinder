import { useState } from 'react';

const STARTER_CODE = `function sumUpTo(n) {
  let total = 0;
  for (let i = 0; i <= n; i++) {
    total += i;
  }
  return total;
}`;

const TEST_CASES = [
  { input: 3, expected: 6 },
  { input: 5, expected: 15 },
  { input: 1, expected: 1 },
];

export default function DebuggerTask({ onComplete }) {
  const [code, setCode] = useState(STARTER_CODE);
  const [result, setResult] = useState(null);

  function runTests() {
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function(`${code}; return sumUpTo;`)();
      let passed = 0;
      for (const t of TEST_CASES) {
        if (fn(t.input) === t.expected) passed++;
      }
      setResult({ passed, total: TEST_CASES.length, error: null });
    } catch (err) {
      setResult({ passed: 0, total: TEST_CASES.length, error: err.message });
    }
  }

  function finish() {
    const didWell = result && result.passed === result.total;
    onComplete(didWell);
  }

  return (
    <div>
      <h3>Mini Task: Software Developer</h3>
      <p style={{ marginTop: 8, marginBottom: 16 }}>
        This function should sum all numbers from 1 to <code>n</code>. It has a bug — find and fix it.
      </p>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={8}
        style={styles.editor}
        spellCheck={false}
      />
      <div style={{ marginTop: 12, display: 'flex', gap: 12 }}>
        <button className="btn" onClick={runTests}>Run Tests</button>
        {result && (
          <button className="btn secondary" style={{ color: 'var(--navy)', border: '2px solid var(--navy)' }} onClick={finish}>
            Continue
          </button>
        )}
      </div>
      {result && (
        <p style={{ marginTop: 12 }}>
          {result.error
            ? `Error: ${result.error}`
            : `Passed ${result.passed} / ${result.total} test cases.`}
        </p>
      )}
    </div>
  );
}

const styles = {
  editor: {
    width: '100%', fontFamily: 'var(--font-mono)', fontSize: '0.9rem',
    padding: 16, borderRadius: 6, border: '1px solid #ccc', background: '#1e1e1e',
    color: '#d4d4d4', resize: 'vertical',
  },
};