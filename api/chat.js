// Vercel serverless function. Runs on the server, keeps GROQ_API_KEY secret.
// Env var required: GROQ_API_KEY

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { mode, careers, career, taskDidWell } = req.body;
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY not configured on server' });
  }

  let systemPrompt, userPrompt;

  if (mode === 'followup') {
    systemPrompt = `You are a friendly career guidance assistant. A user's quiz answers
put them between two possible careers. Ask ONE short, clarifying question (max 20 words)
that would help distinguish which of the two fits them better. Respond ONLY as JSON:
{"question": "...", "optionA": "short label for career A choice", "optionB": "short label for career B choice"}
No markdown, no extra text.`;
    userPrompt = `The two candidate careers are: "${careers[0]}" and "${careers[1]}".`;
  } else if (mode === 'summary') {
    systemPrompt = `You are a warm, encouraging career guide. Write a 2-sentence, specific,
non-generic explanation of why this career could suit someone, given how they did on a
hands-on mini-task. Respond ONLY as JSON: {"summary": "..."}. No markdown, no extra text.`;
    userPrompt = `Career: "${career}". They ${taskDidWell ? 'did well' : 'gave it a solid attempt'} on the mini-task.`;
  } else {
    return res.status(400).json({ error: 'Invalid mode' });
  }

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.6,
        max_tokens: 200,
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      return res.status(502).json({ error: 'Groq API error', details: errText });
    }

    const data = await groqRes.json();
    const raw = data.choices?.[0]?.message?.content?.trim() || '{}';

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = mode === 'followup'
        ? { question: 'Which sounds more like you?', optionA: careers[0], optionB: careers[1] }
        : { summary: `${career} could be a strong fit based on how you approached the task.` };
    }

    return res.status(200).json(parsed);
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: String(err) });
  }
}