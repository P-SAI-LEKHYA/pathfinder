// Vercel serverless function. Fetches real, recent market trend articles from NewsAPI.org.
// Env var required: NEWS_API_KEY (free tier at https://newsapi.org/register)

const cache = new Map(); // query -> { data, expires }
const CACHE_MS = 15 * 60 * 1000; // 15 minutes cache for fresh trends

export async function processNewsRequest(query, apiKey) {
  if (!apiKey) {
    throw new Error('NEWS_API_KEY not configured');
  }

  const cleanQuery = (query || 'industry trends market analysis').toString();
  const cached = cache.get(cleanQuery);
  if (cached && cached.expires > Date.now()) {
    return cached.data;
  }

  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(cleanQuery)}&language=en&sortBy=publishedAt&pageSize=14&apiKey=${apiKey}`;
  const newsRes = await fetch(url);

  if (!newsRes.ok) {
    const errText = await newsRes.text();
    throw new Error(`News API returned ${newsRes.status}: ${errText}`);
  }

  const raw = await newsRes.json();
  const RECRUIT_REGEX = /\b(hiring|job opening|recruiter|apply now|job search|career fair|now hiring|vacancy|resume tips)\b/i;

  const articles = (raw.articles || [])
    .filter((a) => a.title && !RECRUIT_REGEX.test(a.title))
    .slice(0, 10)
    .map((a) => ({
      title: a.title,
      source: a.source?.name || 'Industry Analysis',
      url: a.url,
      publishedAt: a.publishedAt || new Date().toISOString(),
      description: a.description || 'Key industry shifts and market developments in this sector.',
    }));

  const payload = { articles };
  cache.set(cleanQuery, { data: payload, expires: Date.now() + CACHE_MS });
  return payload;
}

export default async function handler(req, res) {
  const query = req.query.q;
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'NEWS_API_KEY not configured on server' });
  }

  try {
    const payload = await processNewsRequest(query, apiKey);
    return res.status(200).json(payload);
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: String(err) });
  }
}