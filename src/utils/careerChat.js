import { careers } from '../data/careers';

const OFF_TOPIC_PATTERNS = [
  /\b(who is the hero of|hero of (the )?(movie|film)|favourite movie|favorite movie)\b/i,
  /\b(cricket score|match score|who won the)\b/i,
  /\b(tell me a joke|meme|what('?s| is) the weather)\b/i,
  /\b(what('?s| is) the capital of|who is the president of)\b/i,
  /\b(girlfriend|boyfriend|dating advice)\b/i,
];

/** Themes map free-text passions → careers + follow-up questions */
const INTEREST_THEMES = [
  {
    id: 'dance',
    label: 'dance & movement',
    words: ['dance', 'dancing', 'dancer', 'ballet', 'hip.?hop', 'choreograph', 'classical dance', 'kathak', 'bharatanatyam', 'contemporary dance', 'salsa', 'zumba'],
    careers: ['choreographer', 'dance_educator', 'dance_therapist'],
    reflect: (q) => `Dance is a real career path — glad you said “${q}”. `,
    followUps: [
      {
        id: 'dance_direction',
        text: 'With dance, what pulls you more — performing and creating pieces, teaching others, or using movement to help people’s wellbeing?',
      },
      {
        id: 'dance_setting',
        text: 'Where do you imagine working with dance — stage/company, a teaching studio or school, festivals/media, or wellness/therapy spaces?',
      },
      {
        id: 'dance_pace',
        text: 'For dance training, do you want intensive studio/audition practice soon, or a longer college / conservatory route?',
      },
    ],
  },
  {
    id: 'music',
    label: 'music',
    words: ['music', 'singing', 'singer', 'guitar', 'piano', 'instrument', 'compose', 'dj', 'rap', 'band'],
    careers: ['choreographer', 'marketer', 'dance_educator'],
    reflect: (q) => `Music came through clearly (“${q}”). We can connect that to performance, teaching, or creative industry roles. `,
    followUps: [
      {
        id: 'music_direction',
        text: 'With music, do you see yourself performing, teaching, producing/creating, or working on the business side of entertainment?',
      },
    ],
  },
  {
    id: 'visual_art',
    label: 'visual arts',
    words: ['paint', 'drawing', 'sketch', 'illustration', 'art', 'artist', 'sculpture', 'photography', 'photo'],
    careers: ['ux_researcher', 'marketer', 'choreographer'],
    reflect: (q) => `Creative / visual work stands out in “${q}”. `,
    followUps: [
      {
        id: 'art_direction',
        text: 'For art, are you more drawn to making work yourself, designing for products/users, or creative marketing and campaigns?',
      },
    ],
  },
  {
    id: 'writing',
    label: 'writing & storytelling',
    words: ['writ', 'story', 'poetry', 'blog', 'journalism', 'novel', 'content'],
    careers: ['marketer', 'ai_ethics', 'ux_researcher'],
    reflect: (q) => `Writing and storytelling show up in what you shared. `,
    followUps: [
      {
        id: 'writing_direction',
        text: 'Do you want writing as journalism/content, brand storytelling/marketing, or policy/research communication?',
      },
    ],
  },
  {
    id: 'sports',
    label: 'sports & fitness',
    words: ['sport', 'fitness', 'gym', 'coach', 'athlet', 'yoga', 'cricket', 'football', 'basketball'],
    careers: ['dance_educator', 'doctor', 'marketer'],
    reflect: (q) => `Physical performance / fitness is a strong interest signal. `,
    followUps: [
      {
        id: 'sports_direction',
        text: 'Is your goal coaching/teaching movement, sports business/marketing, or health/medical support for athletes?',
      },
    ],
  },
  {
    id: 'tech',
    label: 'technology',
    words: ['code', 'coding', 'software', 'program', 'developer', 'web', 'app', 'computer', 'tech', 'ai', 'ml', 'llm', 'gpt', 'prompt'],
    careers: ['developer', 'prompt_engineer', 'cyber_forensics', 'ai_ethics'],
    reflect: (q) => `Technology is clearly on your radar (“${q}”). `,
    followUps: [],
  },
  {
    id: 'science',
    label: 'science & health',
    words: ['bio', 'dna', 'gene', 'science', 'lab', 'medic', 'doctor', 'health', 'hospital', 'patient', 'physics', 'quantum', 'chem'],
    careers: ['bioinformatics', 'doctor', 'quantum_computing', 'dance_therapist'],
    reflect: (q) => `Science / health themes are landing. `,
    followUps: [],
  },
  {
    id: 'design',
    label: 'design & people',
    words: ['design', 'ux', 'user', 'psycholog', 'people', 'empathy'],
    careers: ['ux_researcher', 'marketer', 'ai_ethics'],
    reflect: (q) => `Human-centered / design signals noted. `,
    followUps: [],
  },
  {
    id: 'security',
    label: 'security',
    words: ['cyber', 'security', 'hack', 'forensic', 'malware', 'privacy'],
    careers: ['cyber_forensics', 'ai_ethics', 'developer'],
    reflect: (q) => `Security and digital risk came through clearly. `,
    followUps: [],
  },
  {
    id: 'climate',
    label: 'climate & energy',
    words: ['solar', 'energy', 'green', 'climate', 'wind', 'sustainab', 'renewable', 'environment'],
    careers: ['renewable_energy', 'ai_ethics', 'marketer'],
    reflect: (q) => `Climate / energy themes are landing. `,
    followUps: [],
  },
];

const CAREER_HINTS = [
  { key: 'ai_ethics', words: ['ethics', 'bias', 'fairness', 'governance', 'policy', 'responsible ai', 'ai safety', 'regulation'] },
  { key: 'bioinformatics', words: ['bio', 'dna', 'gene', 'genetic', 'genome', 'biology', 'biotech', 'cells', 'protein'] },
  { key: 'cyber_forensics', words: ['cyber', 'security', 'hack', 'forensic', 'malware', 'breach', 'infosec', 'privacy', 'network'] },
  { key: 'quantum_computing', words: ['quantum', 'physics', 'qubit', 'particle', 'optics'] },
  { key: 'ux_researcher', words: ['ux', 'user experience', 'design', 'psychology', 'hci', 'usability', 'persona'] },
  { key: 'renewable_energy', words: ['solar', 'energy', 'green', 'climate', 'wind', 'sustainab', 'renewable', 'environment'] },
  { key: 'prompt_engineer', words: ['prompt', 'llm', 'gpt', 'chatgpt', 'langchain', 'ai agent', 'generative'] },
  { key: 'developer', words: ['code', 'coding', 'software', 'program', 'developer', 'web', 'app', 'full stack', 'javascript'] },
  { key: 'doctor', words: ['doctor', 'medicine', 'clinical', 'hospital', 'patient', 'healthcare', 'physician', 'nurse', 'surgery'] },
  { key: 'marketer', words: ['market', 'brand', 'seo', 'ads', 'growth', 'content', 'campaign', 'social media', 'advertising'] },
  { key: 'choreographer', words: ['dance', 'dancing', 'dancer', 'ballet', 'choreograph', 'performance', 'stage', 'hip hop', 'kathak', 'bharatanatyam'] },
  { key: 'dance_educator', words: ['dance', 'teach dance', 'dance teacher', 'studio', 'instruct', 'ballet teacher'] },
  { key: 'dance_therapist', words: ['dance therapy', 'movement therapy', 'wellbeing', 'healing', 'therapy', 'mental health'] },
];

const VAGUE = /^(idk|i don'?t know|not sure|maybe|something|anything|whatever|hmm+|ok|okay|yes|no|sure|fine|nada|nothing|stuff)$/i;

function trimQuote(text) {
  const t = (text || '').trim().replace(/\s+/g, ' ');
  return t.length > 70 ? `${t.slice(0, 67)}…` : t;
}

export function detectThemes(blob) {
  const lower = blob.toLowerCase();
  return INTEREST_THEMES.filter((theme) =>
    theme.words.some((w) => new RegExp(w, 'i').test(lower))
  );
}

export function primaryTheme(answers) {
  const themes = detectThemes(answers.join(' '));
  return themes[0] || null;
}

export function isOffTopic(text) {
  const t = text.trim();
  if (t.length < 2) return true;
  const lower = t.toLowerCase();

  // Interests / hobbies that can become careers are NEVER off-topic
  if (detectThemes(lower).length > 0) return false;

  const careerWords =
    /\b(career|job|work|study|degree|exam|salary|skill|profession|roadmap|course|certif|internship|college|interested|interest|love|enjoy|passion|hobby)\b/i.test(
      t
    );
  const off = OFF_TOPIC_PATTERNS.some((re) => re.test(t));
  if (off && !careerWords) return true;
  return false;
}

export function extractProfile(answers) {
  const blob = answers.join(' ').toLowerCase();
  const themes = detectThemes(blob);
  const profile = {
    answers,
    interestsSnippet: answers[0] || '',
    themes: themes.map((t) => t.id),
    themeLabel: themes[0]?.label || null,
    domainKeys: [],
    style: null,
    drive: null,
    pace: null,
    setting: null,
    strengths: [],
  };

  for (const { key, words } of CAREER_HINTS) {
    if (words.some((w) => blob.includes(w.replace(/[.?]/g, '')))) profile.domainKeys.push(key);
  }
  // Theme careers count as domain
  for (const theme of themes) {
    for (const key of theme.careers) {
      if (!profile.domainKeys.includes(key)) profile.domainKeys.push(key);
    }
  }

  if (/solo|alone|independent|deep focus|analytic/.test(blob)) profile.style = 'solo';
  else if (/team|collab|people|stakeholder|teach|student|class/.test(blob)) profile.style = 'people';
  else if (/hands-?on|build|mak(e|ing)|create|perform|ship/.test(blob)) profile.style = 'build';

  if (/salary|earn|money|pay|income|wealth/.test(blob)) profile.drive = 'salary';
  else if (/impact|help people|society|climate|ethic|good|health|wellbeing|therapy/.test(blob)) profile.drive = 'impact';
  else if (/frontier|unsolved|research|curious|discover|novel|create|art/.test(blob)) profile.drive = 'frontier';

  if (/fast|quick|portfolio|bootcamp|skill|self[- ]?taught|studio|audition soon/.test(blob)) profile.pace = 'fast';
  else if (/degree|phd|master|academic|university|conservatory|college|long/.test(blob)) profile.pace = 'academic';

  if (/lab|research institute/.test(blob)) profile.setting = 'lab';
  else if (/product|startup|tech team/.test(blob)) profile.setting = 'product';
  else if (/hospital|clinic|patient|therapy/.test(blob)) profile.setting = 'clinical';
  else if (/stage|company|theatre|theater|festival/.test(blob)) profile.setting = 'stage';
  else if (/studio|school|teach/.test(blob)) profile.setting = 'studio';
  else if (/consult|industry/.test(blob)) profile.setting = 'industry';

  // Dance-direction signals from follow-ups
  if (/teach|teacher|studio|educator|students/.test(blob) && themes.some((t) => t.id === 'dance')) {
    if (!profile.domainKeys.includes('dance_educator')) profile.domainKeys.unshift('dance_educator');
  }
  if (/therap|wellbeing|well-being|healing|mental health|help people/.test(blob) && themes.some((t) => t.id === 'dance')) {
    if (!profile.domainKeys.includes('dance_therapist')) profile.domainKeys.unshift('dance_therapist');
  }
  if (/perform|stage|choreograph|creat(e|ing) pieces|company/.test(blob) && themes.some((t) => t.id === 'dance')) {
    if (!profile.domainKeys.includes('choreographer')) profile.domainKeys.unshift('choreographer');
  }

  return profile;
}

export function scoreAllCareers(answers) {
  const blob = answers.join(' ').toLowerCase();
  const themes = detectThemes(blob);
  const scores = {};

  for (const career of Object.values(careers)) {
    scores[career.key] = 0.05;
    career.name
      .toLowerCase()
      .split(/\s+/)
      .forEach((bit) => {
        if (bit.length > 3 && blob.includes(bit)) scores[career.key] += 2.5;
      });
  }

  for (const { key, words } of CAREER_HINTS) {
    for (const w of words) {
      if (blob.includes(w.replace(/[.?]/g, ''))) scores[key] = (scores[key] || 0) + 3.5;
    }
  }

  // Strong boost for theme-linked careers so "I love dance" ranks dance roles first
  for (const theme of themes) {
    theme.careers.forEach((key, idx) => {
      scores[key] = (scores[key] || 0) + (12 - idx * 2);
    });
  }

  if (/teach|teacher|studio|educator/.test(blob)) {
    scores.dance_educator = (scores.dance_educator || 0) + 6;
  }
  if (/therap|wellbeing|healing|mental/.test(blob)) {
    scores.dance_therapist = (scores.dance_therapist || 0) + 6;
  }
  if (/perform|stage|choreograph|create/.test(blob)) {
    scores.choreographer = (scores.choreographer || 0) + 5;
  }

  if (/solo|analytic|research|lab|deep/.test(blob)) {
    scores.quantum_computing += 1.5;
    scores.bioinformatics += 1.5;
  }
  if (/hands-?on|build|code|portfolio|fast|perform/.test(blob)) {
    scores.developer += 1.5;
    scores.choreographer += 1.5;
  }
  if (/people|stakeholder|collab|team|teach|student/.test(blob)) {
    scores.ux_researcher += 1.5;
    scores.dance_educator += 2;
    scores.marketer += 1.2;
  }
  if (/impact|help people|health|wellbeing/.test(blob)) {
    scores.doctor += 1.5;
    scores.dance_therapist += 2.5;
  }
  if (/salary|earn|money|high pay/.test(blob)) {
    scores.doctor += 1.5;
    scores.developer += 1;
  }

  // If a clear non-tech theme is present, suppress unrelated tech defaults
  const creative = themes.some((t) => ['dance', 'music', 'visual_art', 'sports'].includes(t.id));
  if (creative) {
    scores.developer *= 0.15;
    scores.prompt_engineer *= 0.15;
    scores.quantum_computing *= 0.1;
    scores.cyber_forensics *= 0.15;
    scores.bioinformatics *= 0.2;
  }

  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([key, score]) => ({ key, score, career: careers[key] }))
    .filter((row) => row.career);
}

export function scoreCareers(answers) {
  return scoreAllCareers(answers)[0]?.career || careers.developer;
}

function fitReason(career, profile) {
  const bits = [];
  const blob = profile.answers.join(' ').toLowerCase();
  const theme = primaryTheme(profile.answers);

  if (theme && theme.careers.includes(career.key)) {
    bits.push(`you said you care about ${theme.label} (“${trimQuote(profile.interestsSnippet)}”)`);
  }

  const hints = CAREER_HINTS.find((h) => h.key === career.key);
  const hit = hints?.words.find((w) => blob.includes(w.replace(/[.?]/g, '')));
  if (hit && !bits.length) bits.push(`you mentioned “${hit}”`);

  if (profile.style === 'people' && ['dance_educator', 'ux_researcher', 'marketer', 'doctor', 'dance_therapist'].includes(career.key)) {
    bits.push('you lean toward people-facing work');
  }
  if (profile.style === 'build' && ['choreographer', 'developer', 'prompt_engineer'].includes(career.key)) {
    bits.push('you like creating and performing work');
  }
  if (profile.drive === 'impact') bits.push('helping others / impact matters to you');
  if (profile.pace === 'fast') bits.push('you want a practice-led route');
  if (profile.pace === 'academic') bits.push('you are open to formal study');

  if (!bits.length) bits.push(career.reason);
  return bits.slice(0, 2).join('; ') + '.';
}

export function getTopThree(answers) {
  const profile = extractProfile(answers);
  return scoreAllCareers(answers)
    .slice(0, 3)
    .map((row, i) => ({
      rank: i + 1,
      key: row.key,
      score: row.score,
      career: row.career,
      why: fitReason(row.career, profile),
    }));
}

export function buildReflection(userText, allAnswers) {
  const theme = primaryTheme([userText, ...allAnswers]);
  const q = trimQuote(userText);

  if (theme?.reflect) {
    let msg = theme.reflect(q);
    if (allAnswers.length === 1) {
      msg +=
        theme.id === 'dance'
          ? 'Next questions will stay on dance careers — performing, teaching, or movement therapy — not unrelated tech topics. '
          : `Next questions will stay on ${theme.label}. `;
    }
    if (allAnswers.length === 2) msg += 'A couple more details will lock your top 3. ';
    return msg;
  }

  if (/salary|earn|money|pay/.test(userText.toLowerCase())) {
    return 'Compensation is an important filter for you. ';
  }
  if (/solo|alone|independent/.test(userText.toLowerCase())) {
    return 'You prefer focused independent work. ';
  }
  if (/team|people|collab|teach/.test(userText.toLowerCase())) {
    return 'Working with people matters to you. ';
  }
  if (userText.trim().length >= 8) {
    return `Got it — “${q}”. I will steer questions from that interest. `;
  }
  return 'Thanks — ';
}

export function needsClarity(answers, askedIds) {
  const last = answers[answers.length - 1]?.trim() || '';
  const profile = extractProfile(answers);
  const theme = primaryTheme(answers);
  const ranked = scoreAllCareers(answers);
  const topScore = ranked[0]?.score || 0;
  const second = ranked[1]?.score || 0;

  // Very short ONLY if no theme detected (e.g. "hi") — "I love dance" is enough
  if (last.length > 0 && last.length < 8 && !theme) {
    return {
      id: `clarify_short_${answers.length}`,
      text: `Could you say a bit more? What do you enjoy doing, studying, or practicing?`,
    };
  }
  if (VAGUE.test(last) && !theme) {
    return {
      id: `clarify_vague_${answers.length}`,
      text: 'I need something concrete — a hobby, subject, or skill you genuinely like (for example: dance, coding, biology, design).',
    };
  }

  // If we already know the theme (dance etc.), do NOT ask the tech-domain question
  if (!theme && answers.length >= 1 && profile.domainKeys.length === 0 && !askedIds.includes('clarify_domain')) {
    return {
      id: 'clarify_domain',
      text: 'Which area feels closest — performing arts (like dance/music), technology, science/health, design & people, or business/growth?',
    };
  }

  if (answers.length >= 2 && !profile.pace && !askedIds.includes('clarify_pace') && !theme) {
    return {
      id: 'clarify_pace',
      text: 'Do you want a faster skill-and-practice route, or a longer degree / formal training path?',
    };
  }

  if (
    answers.length >= 2 &&
    topScore - second < 1.5 &&
    profile.domainKeys.length >= 2 &&
    !askedIds.includes('clarify_conflict') &&
    theme
  ) {
    const a = careers[theme.careers[0]]?.name;
    const b = careers[theme.careers[1]]?.name;
    if (a && b) {
      return {
        id: 'clarify_conflict',
        text: `Between ${a} and ${b}, which feels closer to how you want to spend your weeks — and why?`,
      };
    }
  }
  return null;
}

const BASE_QUESTIONS = [
  {
    id: 'open_interest',
    build: () =>
      'What do you love doing or learning — a hobby, subject, or craft is perfect (for example dance, coding, biology). Type freely.',
  },
  {
    id: 'work_style',
    build: (profile) => {
      const theme = primaryTheme(profile.answers);
      if (theme?.id === 'dance') {
        return 'In dance work, do you prefer rehearsing/creating mostly on your own, teaching groups, or collaborating with a cast and crew?';
      }
      if (theme?.id === 'tech' || profile.domainKeys.includes('developer')) {
        return 'For tech work, do you prefer deep solo focus, pairing with a team, or mixing both with stakeholders?';
      }
      if (theme?.id === 'science') {
        return 'In science/health, do you prefer lab/research, direct people work, or a mix?';
      }
      return 'Do you thrive more in deep solo focus, hands-on creating/performing, or collaborating with people day to day?';
    },
  },
  {
    id: 'drive',
    build: (profile) => {
      const theme = primaryTheme(profile.answers);
      const top = scoreAllCareers(profile.answers)[0]?.career?.name;
      if (theme?.id === 'dance') {
        return `Given your interest in dance${top ? ` (heading toward roles like ${top})` : ''}, what matters more — artistic expression, stable teaching income, or helping others through movement?`;
      }
      if (top) {
        return `You are leaning toward areas like ${top}. What pulls you more — earning potential, creative/frontier challenges, or clear social impact?`;
      }
      return 'What matters most long-term: earning potential, creative challenge, or social impact?';
    },
  },
  {
    id: 'pace',
    build: (profile) => {
      const theme = primaryTheme(profile.answers);
      if (theme?.id === 'dance') {
        return 'How do you want to train — intensive studio practice and auditions soon, or a longer college / conservatory path?';
      }
      return 'How do you want to progress — faster skill-and-portfolio route, or a longer academic path?';
    },
  },
  {
    id: 'setting',
    build: (profile) => {
      const theme = primaryTheme(profile.answers);
      if (theme?.id === 'dance') {
        return 'Ideal setting — stage/company, dance studio or school, festivals/media, or wellness/therapy spaces?';
      }
      if (profile.pace === 'fast') {
        return 'Where would you rather start practicing soon — teams, freelance projects, apprenticeships, or something you have in mind?';
      }
      return 'Where do you picture yourself learning best — labs, universities, clinics, studios, or industry teams?';
    },
  },
];

export function pickNextQuestion(askedIds, answers) {
  const profile = extractProfile(answers);
  const theme = primaryTheme(answers);

  const clarity = needsClarity(answers, askedIds);
  if (clarity && !askedIds.includes(clarity.id)) return clarity;

  // Theme-specific follow-ups before generic ones
  if (theme?.followUps?.length) {
    for (const fq of theme.followUps) {
      if (!askedIds.includes(fq.id)) return fq;
    }
  }

  for (const q of BASE_QUESTIONS) {
    if (!askedIds.includes(q.id)) {
      return { id: q.id, text: q.build(profile) };
    }
  }
  return null;
}

export function shouldConclude(askedIds, answers) {
  const profile = extractProfile(answers);
  const theme = primaryTheme(answers);
  const substantive = answers.filter((a) => a.trim().length >= 8 && !VAGUE.test(a.trim()));
  const top = scoreAllCareers(answers)[0]?.score || 0;
  const hasDomain = profile.domainKeys.length > 0 || top > 4 || Boolean(theme);
  const coreAsked = askedIds.filter(
    (id) => !String(id).startsWith('clarify_short') && !String(id).startsWith('clarify_vague')
  ).length;
  const clarity = needsClarity(answers, askedIds);

  // Dance (and other clear themes): conclude a bit sooner once direction is clear
  if (theme && substantive.length >= 3 && coreAsked >= 3 && !clarity) return true;
  if (substantive.length >= 4 && coreAsked >= 4) return true;
  return substantive.length >= 3 && hasDomain && coreAsked >= 3 && !clarity;
}

export function buildPersonalizedPath(career, profile) {
  const base = career.roadmap;
  const pace = profile.pace || 'balanced';
  const style = profile.style || 'mixed';
  const drive = profile.drive || 'growth';
  const interest = profile.interestsSnippet?.slice(0, 80) || 'your stated interests';
  const theme = primaryTheme(profile.answers);

  const stops = [];

  if (theme?.id === 'dance' && pace === 'fast') {
    stops.push({
      title: 'Train weekly, visibly',
      detail: `Because you love dance, book consistent studio classes in your style and film short clips every month for ${career.name}.`,
    });
  } else if (pace === 'fast') {
    stops.push({
      title: 'Start lean',
      detail: `Pick 1–2 core courses tied to “${interest}”, and ship a small proof-of-skill project for ${career.name} in 4–6 weeks.`,
    });
  } else if (pace === 'academic') {
    stops.push({
      title: 'Academic / conservatory foundation',
      detail: `Plan formal study: ${base.studies[0]}. Keep “${interest}” at the center of electives and auditions.`,
    });
  } else {
    stops.push({
      title: 'Build foundations',
      detail: `Begin with ${base.studies[0]}, with weekly practice tied to what you enjoy (“${interest}”).`,
    });
  }

  stops.push({
    title: pace === 'fast' ? 'Credential or audition gate' : 'Deepen expertise',
    detail:
      pace === 'fast'
        ? `Prioritize: ${base.exams[0]}.`
        : `${base.studies[1] || base.studies[0]}. Then: ${base.exams.join(' · ')}.`,
  });

  stops.push({
    title: 'Stay true to your interest',
    detail: `Every month, reconnect to “${interest}” so the path stays about dance/your craft — not a generic checklist.`,
  });

  if (style === 'people' || /teach|educator/.test(career.key)) {
    stops.push({
      title: 'People-facing practice',
      detail: base.activities[1] || base.activities[0],
    });
  } else if (style === 'solo') {
    stops.push({
      title: 'Independent practice',
      detail: base.activities[0],
    });
  } else {
    stops.push({
      title: 'Build & show',
      detail: base.activities.join(' · '),
    });
  }

  const lastMilestone = base.milestones[base.milestones.length - 1];
  if (drive === 'impact' || career.key === 'dance_therapist') {
    stops.push({
      title: 'Work where impact is visible',
      detail: `${career.reason} Start with: ${base.activities[0]}.`,
    });
  } else if (drive === 'salary') {
    stops.push({
      title: 'Aim for sustainable pay',
      detail: `Target ${career.name} roles around ${career.salary}. ${lastMilestone.detail}`,
    });
  } else {
    stops.push({
      title: lastMilestone.phase.replace(/^Phase \d+:\s*/i, '') || 'Enter the field',
      detail: lastMilestone.detail,
    });
  }

  return {
    careerKey: career.key,
    careerName: career.name,
    salary: career.salary,
    tag: career.tag,
    reason: career.reason,
    profileSummary: summarizeProfile(profile),
    stops,
    studies: pace === 'fast' ? base.studies.slice(0, 2) : base.studies,
    exams: pace === 'academic' ? base.exams : base.exams.slice(0, Math.min(2, base.exams.length)),
    activities: base.activities,
  };
}

function summarizeProfile(profile) {
  const parts = [];
  if (profile.themeLabel) parts.push(`interest: ${profile.themeLabel}`);
  if (profile.style) parts.push(`style: ${profile.style}`);
  if (profile.pace) parts.push(`pace: ${profile.pace}`);
  if (profile.drive) parts.push(`drive: ${profile.drive}`);
  if (profile.setting) parts.push(`setting: ${profile.setting}`);
  return parts.length ? parts.join(' · ') : 'general exploration';
}

export function answerFollowUp(question, career, path) {
  if (!career) {
    return 'Tell me which career you want to explore, or finish discovery for a personalized top 3.';
  }
  const lower = question.toLowerCase();

  if (/salary|pay|earn|compensation|wage/.test(lower)) {
    return `For ${career.name}, typical pay is ${career.salary}.`;
  }
  if (/exam|certif|licen|audition/.test(lower)) {
    const exams = path?.exams || career.roadmap.exams;
    return `For your path, prioritize: ${exams.join('; ')}.`;
  }
  if (/study|degree|course|college|learn|train/.test(lower)) {
    const studies = path?.studies || career.roadmap.studies;
    return `Study / training focus: ${studies.join('; ')}.`;
  }
  if (/project|portfolio|practice|reel/.test(lower)) {
    const acts = path?.activities || career.roadmap.activities;
    return `Practice steps: ${acts.join('; ')}.`;
  }
  if (/roadmap|path|step|milestone|start|begin/.test(lower)) {
    if (path?.stops) {
      return path.stops.map((s, i) => `${i + 1}. ${s.title}: ${s.detail}`).join(' ');
    }
    return career.roadmap.milestones.map((m) => `${m.phase}: ${m.detail}`).join(' → ');
  }
  if (/why|fit|match|suit|top|other|second|third|dance/.test(lower)) {
    return `${career.name}: ${career.reason}`;
  }

  if (path?.stops?.[0]) {
    return `Next useful move: ${path.stops[0].title} — ${path.stops[0].detail}`;
  }
  return `For ${career.name}: ${career.reason}`;
}

export function getWelcomeMessages() {
  const first = BASE_QUESTIONS[0];
  return [
    {
      sender: 'bot',
      text: 'Tell me what you actually love — dance, music, coding, science, anything. I will ask follow-ups about that interest and suggest real career paths from it.',
    },
    {
      sender: 'bot',
      text: first.build(),
      questionId: first.id,
    },
  ];
}

export function buildMatchNarrative(topThree, profile) {
  const themeNote = profile.themeLabel
    ? `Based on your interest in ${profile.themeLabel}`
    : 'Based on this conversation';
  const lines = topThree.map((t) => `${t.rank}. ${t.career.name} — ${t.why}`);
  return `${themeNote}, here are your top 3 fits:\n\n${lines.join('\n\n')}\n\nProfile: ${summarizeProfile(profile)}. Pick one for its road map, or ask me anything about these roles.`;
}

export const SESSION_KEY = 'pathfinder_discovery';

export function saveDiscoverySession(payload) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(payload));
}

export function loadDiscoverySession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
