// Vercel serverless function. Fetches real, recent articles from NewsAPI.org.
// Env var required: NEWS_API_KEY (free tier at https://newsapi.org/register)

const cache = new Map(); // query -> { data, expires }
const CACHE_MS = 30 * 60 * 1000; // 30 minutes

export default async function handler(req, res) {
  const query = (req.query.q || 'career trends').toString();
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'NEWS_API_KEY not configured on server' });
  }

  const cached = cache.get(query);
  if (cached && cached.expires > Date.now()) {
    return res.status(200).json(cached.data);
  }

  try {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=5&apiKey=${apiKey}`;
    const newsRes = await fetch(url);

    if (!newsRes.ok) {
      const errText = await newsRes.text();
      return res.status(502).json({ error: 'News API error', details: errText });
    }

    const raw = await newsRes.json();
    const articles = (raw.articles || []).map((a) => ({
      title: a.title,
      source: a.source?.name || 'Unknown source',
      url: a.url,
      publishedAt: a.publishedAt,
    }));

    const payload = { articles };
    cache.set(query, { data: payload, expires: Date.now() + CACHE_MS });

    return res.status(200).json(payload);
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: String(err) });
  }
}