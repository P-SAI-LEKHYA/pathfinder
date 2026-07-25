import { useState } from 'react';

const STARTER_CODE = `function sumUpTo(n) {
  let total = 0;
  // Bug: i <= n should sum all numbers up to n
  for (let i = 0; i < n; i++) {
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
      <div style={{ marginBottom: 16 }}>
        <h4 style={{ fontSize: '1.15rem', color: 'var(--accent-amber)' }}>Task: Fix the Loop Boundary Bug</h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: 4 }}>
          This JavaScript function should calculate the sum of integers from 1 up to <code>n</code>. Fix the loop condition so <code>sumUpTo(3)</code> returns 6.
        </p>
      </div>

      {/* Code Editor Window */}
      <div style={styles.windowFrame}>
        <div style={styles.windowHeader}>
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981' }} />
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            sumUpTo.js
          </span>
        </div>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={8}
          style={styles.editor}
          spellCheck={false}
        />
      </div>

      <div style={{ marginTop: 16, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <button className="btn btn-cyan" onClick={runTests} style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
          ▶ Run Test Suite
        </button>

        {result && (
          <button className="btn" onClick={finish} style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
            Submit & Continue →
          </button>
        )}
      </div>

      {/* Test Results Output */}
      {result && (
        <div style={{ ...styles.resultBox, borderColor: result.passed === result.total ? 'var(--success)' : 'var(--danger)' }}>
          {result.error ? (
            <span style={{ color: 'var(--danger)' }}>❌ Syntax/Runtime Error: {result.error}</span>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className={`badge ${result.passed === result.total ? 'badge-emerald' : 'badge-amber'}`}>
                {result.passed === result.total ? '✓ ALL TESTS PASSED' : '⚠️ PARTIAL PASS'}
              </span>
              <span style={{ fontSize: '0.9rem' }}>
                Passed {result.passed} of {result.total} test cases.
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  windowFrame: {
    background: '#0D1117',
    borderRadius: 12,
    border: '1px solid rgba(255, 255, 255, 0.12)',
    overflow: 'hidden',
    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
  },
  windowHeader: {
    background: '#161B22',
    padding: '10px 16px',
    display: 'flex',
    justify: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  },
  editor: {
    width: '100%',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.9rem',
    padding: 16,
    border: 'none',
    background: 'transparent',
    color: '#E6EDF3',
    resize: 'vertical',
    outline: 'none',
    lineHeight: 1.5,
  },
  resultBox: {
    marginTop: 16,
    padding: '14px 18px',
    borderRadius: 10,
    background: 'rgba(18, 24, 39, 0.9)',
    border: '1px solid transparent',
  },
};