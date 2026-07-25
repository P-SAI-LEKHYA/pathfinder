import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { processChatRequest } from './api/chat.js';
import { processNewsRequest } from './api/news.js';

function localApiPlugin(env) {
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        // Handle /api/chat
        if (req.url.startsWith('/api/chat') && req.method === 'POST') {
          try {
            const chunks = [];
            for await (const chunk of req) chunks.push(chunk);
            const raw = Buffer.concat(chunks).toString('utf8');
            const body = raw ? JSON.parse(raw) : {};
            const result = await processChatRequest(body, env.GROQ_API_KEY || process.env.GROQ_API_KEY);

            res.statusCode = result.status;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify(result.data));
          } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ error: 'Local Chat API failed', details: String(err) }));
          }
        }

        // Handle /api/news
        if (req.url.startsWith('/api/news') && req.method === 'GET') {
          try {
            const urlObj = new URL(req.url, 'http://localhost');
            const query = urlObj.searchParams.get('q') || 'industry trends';
            const apiKey = env.NEWS_API_KEY || process.env.NEWS_API_KEY;

            const payload = await processNewsRequest(query, apiKey);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify(payload));
          } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ error: 'Local News API failed', details: String(err) }));
          }
        }

        next();
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  if (env.GROQ_API_KEY) process.env.GROQ_API_KEY = env.GROQ_API_KEY;
  if (env.NEWS_API_KEY) process.env.NEWS_API_KEY = env.NEWS_API_KEY;

  return {
    plugins: [react(), localApiPlugin(env)],
  };
});
