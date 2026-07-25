// Thin wrappers around our Vercel serverless functions.
// These only work once deployed on Vercel (or run via `vercel dev` locally).

export async function getChatFollowup(topTwoCareerNames) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mode: 'followup',
      careers: topTwoCareerNames,
    }),
  });
  if (!res.ok) throw new Error('Chat request failed');
  return res.json(); // { question, optionA, optionB }
}

export async function getResultSummary(careerName, taskDidWell) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mode: 'summary',
      career: careerName,
      taskDidWell,
    }),
  });
  if (!res.ok) throw new Error('Chat request failed');
  return res.json(); // { summary }
}

export async function getCareerNews(query) {
  const res = await fetch(`/api/news?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('News request failed');
  return res.json(); // { articles: [{ title, source, url }] }
}