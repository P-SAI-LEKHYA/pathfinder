// Vercel serverless + shared chat processor. Env: GROQ_API_KEY

const DISCOVER_SYSTEM = `You are PathFinder, a warm, sharp career counselor in a live chat.

VOICE
- Sound like a thoughtful human mentor, not a form or quiz bot.
- Short paragraphs. React specifically to what the user just said (quote or paraphrase their words).
- Never offer multiple-choice option buttons. Never say "pick A/B/C".
- Do not recycle the same question. Each question must follow from their last answer.

SCOPE
- Only careers, skills, education, training, and professional paths.
- If they ask about movies, celebrities, sports scores, jokes, trivia, or anything non-career: briefly refuse and steer back to interests or work goals.
- Hobbies ARE valid starting points (dance, music, cooking, gaming, etc.) — treat them as career seeds and explore real roles from that passion.

FLOW
1. Open by inviting them to share what they love or are curious about.
2. Ask 3–6 adaptive follow-ups (style, goals, training pace, setting, strengths) until you can recommend confidently.
3. If an answer is vague ("idk", "maybe"), ask a clearer follow-up about that same topic.
4. When ready, give exactly THREE career recommendations tailored to THIS conversation — any real careers, not a fixed list.
5. After recommendations, answer follow-up questions helpfully. If they pick one career, you may attach a personalized roadmap.

OUTPUT
Respond with ONLY valid JSON (no markdown fences):
{
  "message": "natural chat reply the user will read",
  "phase": "asking" | "results" | "followup" | "offtopic",
  "topThree": null | [
    { "name": "Career title", "why": "1-2 sentences tied to their words", "salary": "realistic range or Typical: …", "tag": "short label" }
  ],
  "roadmap": null | {
    "careerName": "…",
    "salary": "…",
    "tag": "…",
    "reason": "one sentence",
    "profileSummary": "brief signals from chat",
    "stops": [
      { "title": "short stop name", "detail": "personalized next step using their answers" }
    ]
  }
}

Rules for JSON fields:
- phase "asking": topThree and roadmap are null; message asks the next useful question.
- phase "results": topThree has exactly 3 items; message introduces them naturally; roadmap may be null or filled for the #1 fit.
- phase "followup": answer their question; include roadmap when they ask for a path or choose a career (4–6 stops, varied by THEIR pace/style/goals — never a generic copy-paste).
- phase "offtopic": polite redirect; topThree and roadmap null.
- stops must change based on what they said (e.g. dance + teaching ≠ dance + performing).`;

const MODEL = 'llama-3.3-70b-versatile';

function extractJson(raw) {
  const cleaned = raw.trim().replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/, '');
  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(cleaned.slice(start, end + 1));
      } catch {
        /* fall through */
      }
    }
    return {
      message: cleaned.slice(0, 600) || 'Tell me a bit more about what you enjoy, and I will help find fitting careers.',
      phase: 'asking',
      topThree: null,
      roadmap: null,
    };
  }
}

export async function processChatRequest(body, apiKey) {
  const { mode = 'discover', messages = [], careers, career, taskDidWell } = body || {};

  if (!apiKey) {
    return { status: 500, data: { error: 'GROQ_API_KEY not configured on server' } };
  }

  let systemPrompt;
  let groqMessages;

  if (mode === 'discover' || mode === 'assist') {
    systemPrompt = DISCOVER_SYSTEM;
    const history = (messages || [])
      .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && m.content)
      .map((m) => ({ role: m.role, content: String(m.content).slice(0, 4000) }))
      .slice(-20);

    if (history.length === 0) {
      history.push({
        role: 'user',
        content: '[Session start] Greet me briefly and ask what I love doing or want to explore career-wise. Free text only.',
      });
    }

    groqMessages = [{ role: 'system', content: systemPrompt }, ...history];
  } else if (mode === 'followup') {
    systemPrompt = `You are a career guidance assistant. Ask ONE short clarifying question to distinguish two careers. JSON only: {"question":"...","optionA":"...","optionB":"..."}`;
    groqMessages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Careers: "${careers?.[0]}" and "${careers?.[1]}".` },
    ];
  } else if (mode === 'summary') {
    systemPrompt = `Write a 2-sentence career fit summary. JSON only: {"summary":"..."}`;
    groqMessages = [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: `Career: "${career}". They ${taskDidWell ? 'did well' : 'tried'} the mini-task.`,
      },
    ];
  } else {
    return { status: 400, data: { error: 'Invalid mode' } };
  }

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: groqMessages,
        temperature: mode === 'discover' || mode === 'assist' ? 0.75 : 0.6,
        max_tokens: mode === 'discover' || mode === 'assist' ? 1200 : 250,
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      return { status: 502, data: { error: 'Groq API error', details: errText } };
    }

    const data = await groqRes.json();
    const raw = data.choices?.[0]?.message?.content?.trim() || '{}';

    if (mode === 'discover' || mode === 'assist') {
      const parsed = extractJson(raw);
      if (!parsed.message) {
        parsed.message = 'I am here — tell me what you enjoy or what kind of work you are curious about.';
      }
      if (!parsed.phase) parsed.phase = parsed.topThree?.length ? 'results' : 'asking';
      if (!parsed.topThree) parsed.topThree = null;
      if (!parsed.roadmap) parsed.roadmap = null;
      return { status: 200, data: parsed };
    }

    let parsed;
    try {
      parsed = JSON.parse(raw.replace(/^```json\s*/i, '').replace(/```$/i, '').trim());
    } catch {
      parsed =
        mode === 'followup'
          ? { question: 'Which sounds more like you?', optionA: careers?.[0], optionB: careers?.[1] }
          : { summary: `${career} could be a strong fit based on how you approached the task.` };
    }
    return { status: 200, data: parsed };
  } catch (err) {
    return { status: 500, data: { error: 'Server error', details: String(err) } };
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const result = await processChatRequest(req.body, process.env.GROQ_API_KEY);
  return res.status(result.status).json(result.data);
}
