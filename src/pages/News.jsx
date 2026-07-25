import { useState } from 'react';
import { careers } from '../data/careers';
import { getCareerNews } from '../api';

export default function News() {
  const [selected, setSelected] = useState('developer');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loadNews(careerKey) {
    setSelected(careerKey);
    setLoading(true);
    setError(null);
    try {
      const data = await getCareerNews(careers[careerKey].newsQuery);
      setArticles(data.articles || []);
    } catch (err) {
      setError('Could not load live news right now. Try again shortly.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h2>Career News</h2>
      <p style={{ marginTop: 8, marginBottom: 24 }}>Pick a field to see real, recent headlines.</p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
        {Object.values(careers).map((c) => (
          <button
            key={c.key}
            className="btn secondary"
            style={{ color: 'var(--navy)', border: '2px solid var(--navy)', background: selected === c.key ? 'var(--amber)' : 'transparent' }}
            onClick={() => loadNews(c.key)}
          >
            {c.name}
          </button>
        ))}
      </div>

      {loading && <p>Loading latest headlines...</p>}
      {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}

      <div style={{ display: 'grid', gap: 16, marginTop: 16 }}>
        {articles.map((a, i) => (
          <a key={i} href={a.url} target="_blank" rel="noreferrer" className="card" style={{ textDecoration: 'none' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--teal)' }}>
              {a.source} · {new Date(a.publishedAt).toLocaleDateString()}
            </div>
            <p style={{ marginTop: 8, color: 'var(--ink)' }}>{a.title}</p>
          </a>
        ))}
      </div>
    </div>
  );
}