import { useState, useEffect } from 'react';
import { careers } from '../data/careers';
import { getCareerNews } from '../api';
import Compass from '../components/Compass';

const OTHER_VALUE = '__other__';

export default function News() {
  const [selected, setSelected] = useState('ai_ethics');
  const [customQuery, setCustomQuery] = useState('');
  const [customLabel, setCustomLabel] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorHint, setErrorHint] = useState('');
  const [filterText, setFilterText] = useState('');

  async function loadNews(query, label) {
    setLoading(true);
    setErrorHint('');
    try {
      const data = await getCareerNews(query);
      const list = data.articles || [];
      setArticles(list);
      if (!list.length) {
        setErrorHint('No recent articles found for that topic. Try a different profession name.');
      }
    } catch {
      setArticles([]);
      setErrorHint('Could not load trends. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNews(careers.ai_ethics.newsQuery, careers.ai_ethics.name);
  }, []);

  function handleSelectChange(e) {
    const value = e.target.value;
    setSelected(value);
    setErrorHint('');
    setFilterText('');

    if (value === OTHER_VALUE) {
      setArticles([]);
      setCustomLabel('');
      return;
    }

    setCustomQuery('');
    setCustomLabel('');
    const career = careers[value];
    if (career) loadNews(career.newsQuery, career.name);
  }

  function handleCustomSubmit(e) {
    e.preventDefault();
    const q = customQuery.trim();
    if (!q) return;

    if (/\b(movie|film|actor|hero of|cricket|joke|song)\b/i.test(q)) {
      setErrorHint('Please enter a profession or career field, not entertainment topics.');
      setArticles([]);
      return;
    }

    setCustomLabel(q);
    loadNews(`${q} technology innovation market trends analysis`, q);
  }

  const activeCareer = selected !== OTHER_VALUE ? careers[selected] : null;
  const displayName = activeCareer?.name || customLabel || 'Custom Profession';
  const displayTag = activeCareer?.tag || 'Custom Search';
  const displaySalary = activeCareer?.salary || 'Varies by region';

  const filteredArticles = articles.filter(a => {
    if (!filterText.trim()) return true;
    const term = filterText.toLowerCase();
    return a.title?.toLowerCase().includes(term) ||
           a.source?.toLowerCase().includes(term) ||
           a.description?.toLowerCase().includes(term);
  });

  return (
    <div className="page-wrapper trends-page">
      <section className="page-intro">
        <div className="container" style={{ maxWidth: 960 }}>
          <span className="badge badge-amber" style={{ marginBottom: 12 }}>Live Market Intelligence</span>
          <h1>Industry & Market Trends</h1>
          <p className="page-intro-lead">
            Real-time market insights, breakthroughs, and regulatory shifts across major professions to help you stay ahead.
          </p>

          <div className="trends-controls-card surface-3d" style={{ padding: '24px', marginTop: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', alignItems: 'end' }}>
              <div>
                <label className="field-label" htmlFor="trends-select">
                  Select Profession Track
                </label>
                <select
                  id="trends-select"
                  value={selected}
                  onChange={handleSelectChange}
                  className="input-field select-field"
                  style={{ maxWidth: '100%', margin: 0 }}
                >
                  {Object.values(careers).map((c) => (
                    <option key={c.key} value={c.key}>
                      {c.icon} {c.name}
                    </option>
                  ))}
                  <option value={OTHER_VALUE}>✨ Other — Search any profession...</option>
                </select>
              </div>

              {selected === OTHER_VALUE ? (
                <form onSubmit={handleCustomSubmit} className="other-profession-form" style={{ margin: 0 }}>
                  <label className="field-label" htmlFor="custom-profession">
                    Enter Profession Name
                  </label>
                  <div className="inline-form-row" style={{ maxWidth: '100%' }}>
                    <input
                      id="custom-profession"
                      type="text"
                      className="input-field"
                      placeholder="e.g. Data Scientist, Architect..."
                      value={customQuery}
                      onChange={(e) => setCustomQuery(e.target.value)}
                    />
                    <button type="submit" className="btn btn-3d" disabled={!customQuery.trim()}>
                      Search
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <label className="field-label" htmlFor="article-filter">
                    Filter Current Articles
                  </label>
                  <input
                    id="article-filter"
                    type="text"
                    className="input-field"
                    placeholder="Search keywords in articles..."
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container" style={{ maxWidth: 960 }}>
        {(activeCareer || customLabel) && (
          <header className="roadmap-header" style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span className="badge badge-cyan">{displayTag}</span>
                <h2 style={{ fontSize: '1.8rem', marginTop: '8px' }}>{displayName}</h2>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Typical Salary Range</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-warm)' }}>
                  {displaySalary}
                </div>
              </div>
            </div>
          </header>
        )}

        {errorHint && <p className="form-hint" style={{ textAlign: 'center', margin: '20px 0' }}>{errorHint}</p>}

        {loading ? (
          <div className="loading-block">
            <Compass size={44} />
            <p style={{ marginTop: '16px', color: 'var(--text-secondary)' }}>Fetching live market trends & news articles...</p>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Showing {filteredArticles.length} market articles
              </p>
            </div>

            <div className="trends-grid">
              {filteredArticles.map((a, i) => (
                <article key={i} className="trend-card surface-3d">
                  <div className="trend-card-header">
                    <span className="badge badge-emerald">{a.source}</span>
                    <time dateTime={a.publishedAt}>
                      {new Date(a.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </time>
                  </div>
                  <h3>{a.title}</h3>
                  {a.description && <p className="trend-description">{a.description}</p>}
                  <a href={a.url} target="_blank" rel="noreferrer" className="trend-read-btn">
                    Read Article →
                  </a>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
