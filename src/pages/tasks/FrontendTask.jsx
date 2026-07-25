import { useState, useMemo } from 'react';

const STARTER_CSS = `.header {
  background-color: #2b2b2b;
  color: #333333;
  padding: 4px;
  font-size: 1.5rem;
}`;

const HTML_SHELL = (css) => `
  <html>
    <head><style>
      body { margin:0; font-family: sans-serif; }
      ${css}
    </style></head>
    <body>
      <div class="header">Welcome to Acme Co.</div>
      <p style="padding:16px">Some page content goes here...</p>
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
      <h3>Mini Task: Frontend Developer</h3>
      <p style={{ marginTop: 8, marginBottom: 16 }}>
        This header is hard to read and cramped. Edit the CSS so the text is
        clearly readable against the background, and give the header at least
        16px of padding.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <textarea
          value={css}
          onChange={(e) => setCss(e.target.value)}
          rows={10}
          style={styles.editor}
          spellCheck={false}
        />
        <iframe title="preview" srcDoc={preview} style={styles.preview} />
      </div>
      <button className="btn" style={{ marginTop: 16 }} onClick={finish}>
        Check My Work
      </button>
      {checked && (
        <p style={{ marginTop: 12 }}>
          {passed
            ? 'Readable contrast and comfortable spacing — nice work.'
            : `Not quite: ${!contrastFixed ? 'text/background contrast still needs work. ' : ''}${!paddingFixed ? 'padding is still under 16px.' : ''}`}
        </p>
      )}
    </div>
  );
}

const styles = {
  editor: {
    fontFamily: 'var(--font-mono)', fontSize: '0.85rem', padding: 12,
    borderRadius: 6, border: '1px solid #ccc', background: '#1e1e1e',
    color: '#d4d4d4', resize: 'vertical', minHeight: 200,
  },
  preview: { border: '1px solid #ccc', borderRadius: 6, minHeight: 200 },
};