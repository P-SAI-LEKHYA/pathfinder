import { useState, useMemo } from 'react';

const STARTER_CSS = `.header {
  background-color: #1e293b;
  color: #f8fafc;
  padding: 20px;
  font-size: 1.5rem;
  border-radius: 8px;
}`;

const HTML_SHELL = (css) => `
  <html>
    <head><style>
      body { margin:0; font-family: sans-serif; background: #0f172a; color: #cbd5e1; padding: 12px; }
      ${css}
    </style></head>
    <body>
      <div class="header">Acme Design System</div>
      <p style="padding:12px 4px; font-size: 0.9rem;">Live preview component window.</p>
    </body>
  </html>
`;

function extractHeaderRule(css) {
  const match = css.match(/\.header\s*\{([^}]*)\}/i);
  if (!match) return null;
  const body = match[1];
  const get = (prop) => {
    const m = body.match(new RegExp(`${prop}\\s*:\\s*([^;]+);`, 'i'));
    return m ? m[1].trim() : null;
  };
  return {
    background: get('background-color') || get('background'),
    color: get('color'),
    padding: get('padding'),
  };
}

function isLightColor(hex) {
  if (!hex || !hex.startsWith('#')) return null;
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  if (full.length !== 6) return null;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}

function parsePx(val) {
  if (!val) return 0;
  const m = val.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

export default function FrontendTask({ onComplete }) {
  const [css, setCss] = useState(STARTER_CSS);
  const [checked, setChecked] = useState(false);

  const preview = useMemo(() => HTML_SHELL(css), [css]);

  const rule = extractHeaderRule(css);
  const bgLight = rule ? isLightColor(rule.background) : null;
  const textLight = rule ? isLightColor(rule.color) : null;
  const contrastFixed = bgLight !== null && textLight !== null && bgLight !== textLight;
  const paddingFixed = rule ? parsePx(rule.padding) >= 16 : false;
  const passed = contrastFixed && paddingFixed;

  function finish() {
    setChecked(true);
    onComplete(passed);
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <h4 style={{ fontSize: '1.15rem', color: 'var(--accent-cyan)' }}>Task: Style the Header Component</h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: 4 }}>
          Adjust the CSS so the header text has strong contrast against the background and at least 16px of padding.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        {/* Editor Pane */}
        <div>
          <div style={styles.paneHeader}>
            <span>CSS Editor</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-amber)' }}>style.css</span>
          </div>
          <textarea
            value={css}
            onChange={(e) => setCss(e.target.value)}
            rows={8}
            style={styles.editor}
            spellCheck={false}
          />
        </div>

        {/* Live Preview Pane */}
        <div>
          <div style={styles.paneHeader}>
            <span>Live Output Preview</span>
            <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>Active Render</span>
          </div>
          <iframe title="preview" srcDoc={preview} style={styles.preview} />
        </div>
      </div>

      <div style={{ marginTop: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
        <button className="btn" onClick={finish}>
          Verify CSS Code →
        </button>

        {checked && (
          <span className={`badge ${passed ? 'badge-emerald' : 'badge-amber'}`}>
            {passed ? '✓ Perfect Contrast & Spacing!' : '⚠️ Needs Padding or Contrast Adjustment'}
          </span>
        )}
      </div>
    </div>
  );
}

const styles = {
  paneHeader: {
    background: '#161B22',
    padding: '8px 14px',
    borderRadius: '10px 10px 0 0',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    justify: 'space-between',
    alignItems: 'center',
    fontSize: '0.85rem',
    fontWeight: 600,
  },
  editor: {
    width: '100%',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem',
    padding: 14,
    borderRadius: '0 0 10px 10px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderTop: 'none',
    background: '#0D1117',
    color: '#E6EDF3',
    resize: 'vertical',
    minHeight: 180,
    outline: 'none',
  },
  preview: {
    width: '100%',
    height: 180,
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderTop: 'none',
    borderRadius: '0 0 10px 10px',
    background: '#0F172A',
  },
};