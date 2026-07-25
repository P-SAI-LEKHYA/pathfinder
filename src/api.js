// Client wrappers around /api with graceful fallbacks.

const MOCK_NEWS = {
  'AI ethics governance regulations technology trends': [
    {
      title: 'Global Regulators Finalize New Compliance Standards for Frontier AI Models',
      source: 'Tech Policy Review',
      publishedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      url: 'https://techcrunch.com/tag/artificial-intelligence/',
      description: 'New international guidelines mandate independent bias auditing and safety verification before commercial deployment.'
    },
    {
      title: 'Enterprise Demand Surges for Algorithmic Fairness & Audit Frameworks',
      source: 'Harvard Business Review',
      publishedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      url: 'https://hbr.org/topic/subject/technology-and-analytics',
      description: 'Fortune 500 tech leaders are establishing dedicated AI governance boards to oversee automated decision engines.'
    },
    {
      title: 'Open Source Community Launches Automated Bias Detection Pipelines for LLMs',
      source: 'MIT Technology Review',
      publishedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
      url: 'https://www.technologyreview.com/',
      description: 'New evaluation benchmarks allow developers to scan datasets for demographic bias and toxic hallucinations in real time.'
    },
    {
      title: 'How Responsible AI Architecture is Redefining Enterprise Software Standards',
      source: 'Wired',
      publishedAt: new Date(Date.now() - 3600000 * 72).toISOString(),
      url: 'https://www.wired.com/tag/artificial-intelligence/',
      description: 'Ethical engineering practices are shifting from optional compliance checks to core software design principles.'
    },
    {
      title: 'Data Privacy Directives Challenge Unsanctioned Scraping for Model Training',
      source: 'Reuters Tech',
      publishedAt: new Date(Date.now() - 3600000 * 96).toISOString(),
      url: 'https://www.reuters.com/technology/',
      description: 'Courts clarify intellectual property boundaries, requiring transparent sourcing and synthetic data validation.'
    },
    {
      title: 'The Shift Toward Explainable AI (XAI) in High-Stakes Financial Decisioning',
      source: 'Forbes Tech',
      publishedAt: new Date(Date.now() - 3600000 * 120).toISOString(),
      url: 'https://www.forbes.com/innovation/',
      description: 'Institutions adopt glass-box machine learning architectures to comply with consumer transparency mandates.'
    }
  ],
  'bioinformatics genomics biotech breakthroughs market': [
    {
      title: 'AI-Driven Protein Folding Models Accelerate Novel Drug Discovery Timelines',
      source: 'Nature Biotechnology',
      publishedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
      url: 'https://www.nature.com/nbt/',
      description: 'Computational genomics labs cut targeted compound synthesis times from years to weeks using generative bio-models.'
    },
    {
      title: 'Single-Cell RNA Sequencing Yields Breakthrough Insights in Oncology Research',
      source: 'BioTech World',
      publishedAt: new Date(Date.now() - 3600000 * 30).toISOString(),
      url: 'https://www.nature.com/subjects/bioinformatics',
      description: 'High-throughput sequencing pipelines provide unprecedented clarity into cellular mutation pathways.'
    },
    {
      title: 'Nextflow Pipeline Automation Standardizes Genomic Data Processing Globally',
      source: 'Genome Web',
      publishedAt: new Date(Date.now() - 3600000 * 60).toISOString(),
      url: 'https://www.genomeweb.com/',
      description: 'Cloud-native bioinformatics infrastructure enables instant multi-center clinical data collaboration.'
    },
    {
      title: 'CRISPR Gene Editing Enters Phase III Clinical Trials for Rare Blood Disorders',
      source: 'Scientific American',
      publishedAt: new Date(Date.now() - 3600000 * 90).toISOString(),
      url: 'https://www.scientificamerican.com/',
      description: 'Precision genomic targeting demonstrates durable curative outcomes in international patient cohorts.'
    },
    {
      title: 'Integrative Proteomics and Metabolomics Advance Personalized Cancer Therapies',
      source: 'Cell Genomics',
      publishedAt: new Date(Date.now() - 3600000 * 110).toISOString(),
      url: 'https://www.cell.com/',
      description: 'Multi-omic data integration allows oncologists to tailor treatment regimens to specific tumor profiles.'
    },
    {
      title: 'Cloud Computational Biology Infrastructure Expands Access for Independent Researchers',
      source: 'Bio IT World',
      publishedAt: new Date(Date.now() - 3600000 * 140).toISOString(),
      url: 'https://www.bio-itworld.com/',
      description: 'Scalable cloud clusters democratize petabyte-scale genetic analysis for academic research teams.'
    }
  ],
  'software engineering full stack cloud architecture tech trends': [
    {
      title: 'Next-Generation Full-Stack Frameworks Prioritize Zero-Bundle Server Components',
      source: 'InfoQ',
      publishedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      url: 'https://www.infoq.com/',
      description: 'Modern web architectures reduce client overhead through streaming SSR and edge runtime execution.'
    },
    {
      title: 'AI Coding Assistants Shift Software Engineer Focus Toward Systems Design',
      source: 'IEEE Spectrum',
      publishedAt: new Date(Date.now() - 3600000 * 20).toISOString(),
      url: 'https://spectrum.ieee.org/',
      description: 'Developers spend significantly more time on data modeling, API contract design, and architecture validation.'
    },
    {
      title: 'Distributed Database Innovations Bring Instant Multi-Region Synchronization',
      source: 'DevClass',
      publishedAt: new Date(Date.now() - 3600000 * 40).toISOString(),
      url: 'https://devclass.com/',
      description: 'Serverless SQL platforms eliminate traditional replication lag for global real-time applications.'
    },
    {
      title: 'WebAssembly (Wasm) Expands Native Compute Speed Directly inside Web Browsers',
      source: 'The New Stack',
      publishedAt: new Date(Date.now() - 3600000 * 70).toISOString(),
      url: 'https://thenewstack.io/',
      description: 'Complex image processing and heavy mathematical simulations migrate seamlessly to client environments.'
    },
    {
      title: 'Micro-Frontend Architectures Streamline Large-Scale Enterprise Product Shipping',
      source: 'Software Engineering Daily',
      publishedAt: new Date(Date.now() - 3600000 * 100).toISOString(),
      url: 'https://softwareengineeringdaily.com/',
      description: 'Independent deployability allows large engineering organizations to iterate rapidly without deployment bottlenecks.'
    },
    {
      title: 'TypeScript 5.x Ecosystem Adoption Accelerates Across Modern Frontend Stacks',
      source: 'Dev.to Tech Insights',
      publishedAt: new Date(Date.now() - 3600000 * 130).toISOString(),
      url: 'https://dev.to/',
      description: 'Strict type safety and improved compiler speeds solidify TypeScript as the industry baseline for web applications.'
    }
  ]
};

function buildGenericArticles(query) {
  const topic = query
    .replace(/jobs|hiring|recruiting|trends/gi, '')
    .trim() || 'this industry';

  const cleanTopic = topic.charAt(0).toUpperCase() + topic.slice(1);

  return [
    {
      title: `Key Innovations and Strategic Market Trends Shaping ${cleanTopic} This Year`,
      source: 'Industry Insights Review',
      publishedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
      url: 'https://news.google.com/',
      description: `Rapid technological advances and shifting global demands are driving widespread transformation across ${topic}.`
    },
    {
      title: `Global Market Adoption Accelerates for Advanced ${cleanTopic} Solutions`,
      source: 'Global Tech Monitor',
      publishedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      url: 'https://news.google.com/',
      description: `Leading enterprises report increased capital investment in modernizing core operations within ${topic}.`
    },
    {
      title: `How Automation and AI Integration Are Redefining ${cleanTopic} Workflows`,
      source: 'Technology Quarterly',
      publishedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
      url: 'https://news.google.com/',
      description: `Practitioners in ${topic} are leveraging next-generation tools to elevate precision, efficiency, and scale.`
    },
    {
      title: `Regulatory Shifts and Standardizations Impacting ${cleanTopic} Ecosystems`,
      source: 'Policy & Market Journal',
      publishedAt: new Date(Date.now() - 3600000 * 72).toISOString(),
      url: 'https://news.google.com/',
      description: `New international standards provide clear frameworks for sustainability, security, and quality assurance.`
    },
    {
      title: `Research & Development Investment Reaches Record Highs in ${cleanTopic}`,
      source: 'Venture & Research Index',
      publishedAt: new Date(Date.now() - 3600000 * 96).toISOString(),
      url: 'https://news.google.com/',
      description: `Cross-disciplinary partnerships are unlocking breakthrough methodologies and high-value innovations.`
    },
    {
      title: `Future Outlook: What the Next 5 Years Hold for ${cleanTopic} Pioneers`,
      source: 'Forward Vision Magazine',
      publishedAt: new Date(Date.now() - 3600000 * 120).toISOString(),
      url: 'https://news.google.com/',
      description: `Expert analysis forecasts sustained growth and emerging opportunities for specialized leaders in ${topic}.`
    }
  ];
}

/**
 * Live Groq career counselor turn.
 * @param {{role: 'user'|'assistant', content: string}[]} messages
 * @param {'discover'|'assist'} mode
 */
export async function sendCareerChat(messages, mode = 'discover') {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mode, messages }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const detail = data?.details || data?.error || res.statusText;
    throw new Error(typeof detail === 'string' ? detail : 'Chat request failed');
  }

  return {
    message: data.message || 'Tell me more about what you enjoy.',
    phase: data.phase || 'asking',
    topThree: Array.isArray(data.topThree) ? data.topThree : null,
    roadmap: data.roadmap || null,
  };
}

export async function getChatFollowup(topTwoCareerNames) {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: 'followup', careers: topTwoCareerNames }),
    });
    if (!res.ok) throw new Error('Chat request failed');
    return await res.json();
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      question: `Which matters more right now — ${topTwoCareerNames[0]} or ${topTwoCareerNames[1]}?`,
      optionA: topTwoCareerNames[0],
      optionB: topTwoCareerNames[1],
    };
  }
}

export async function getResultSummary(careerName, taskDidWell) {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: 'summary', career: careerName, taskDidWell }),
    });
    if (!res.ok) throw new Error('Chat request failed');
    return await res.json();
  } catch {
    return {
      summary: `Your profile shows promise for ${careerName}. Keep building skills with deliberate practice.`,
    };
  }
}

export async function getCareerNews(query) {
  try {
    const res = await fetch(`/api/news?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('News request failed');
    const data = await res.json();
    if (data && data.articles && data.articles.length > 0) return data;
    throw new Error('No live articles');
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { articles: MOCK_NEWS[query] || buildGenericArticles(query) };
  }
}
