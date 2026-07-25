// Central database of traditional and emerging lesser-known careers with step-by-step action roadmaps.

export const careers = {
  ai_ethics: {
    key: 'ai_ethics',
    name: 'AI Ethics & Governance Specialist',
    icon: '⚖️',
    image: '/images/developer.png',
    tag: 'Emerging & Niche',
    isEmerging: true,
    salary: '₹15,00,000 - ₹28,00,000 / yr',
    reason: 'Ensures artificial intelligence models operate safely, ethically, and without bias.',
    newsQuery: 'AI ethics governance regulations technology trends',
    roadmap: {
      studies: [
        'B.S. or M.S. in Computer Science, Philosophy, or Law',
        'Specialized Coursework in AI Fairness, Algorithmic Bias, & Data Privacy',
        'Machine Learning & Responsible AI Specialization (Stanford / MIT Online)',
      ],
      exams: [
        'Certified Information Privacy Professional (CIPP/E or CIPP/US)',
        'IEEE Ethics in AI Certification',
        'Certified AI Governance Professional (AIGP)',
      ],
      activities: [
        'Audit open-source AI models (e.g. HuggingFace datasets) for bias',
        'Publish policy whitepapers on LLM safety & data governance',
        'Participate in Responsible AI hackathons and policy forums',
      ],
      milestones: [
        { phase: 'Phase 1: Foundations', detail: 'Master CS fundamentals, ethics principles, and Python machine learning basics.' },
        { phase: 'Phase 2: Deep Specialization', detail: 'Study algorithmic auditing tools (Fairlearn, IBM AI Fairness 360).' },
        { phase: 'Phase 3: Certification & Projects', detail: 'Complete CIPP or AIGP exam and publish an AI bias audit case study.' },
        { phase: 'Phase 4: Industry Placement', detail: 'Apply to tech ethics boards, AI governance teams, or policy think tanks.' },
      ],
    },
  },

  bioinformatics: {
    key: 'bioinformatics',
    name: 'Bio-Informatics Data Scientist',
    icon: '🧬',
    image: '/images/doctor.png',
    tag: 'Biotech & Data',
    isEmerging: true,
    salary: '₹12,00,000 - ₹24,00,000 / yr',
    reason: 'Combines biology, computer science, and big data to analyze genetic sequences and discover medical breakthroughs.',
    newsQuery: 'bioinformatics genomics biotech breakthroughs market',
    roadmap: {
      studies: [
        'B.S. in Computational Biology, Bio-Informatics, or Biotechnology',
        'Advanced Python / R for Genomic Sequencing Analysis',
        'M.S. or Ph.D. in Computational Genomics (Recommended for R&D)',
      ],
      exams: [
        'Bio-Informatics Certification (ISCB Standards)',
        'Biotechnology General Aptitude Test (GAT-B)',
      ],
      activities: [
        'Analyze DNA/RNA datasets from NCBI & GenBank repositories',
        'Build genomic pipeline scripts using Nextflow & Biopython',
        'Contribute to open-source computational genomics research',
      ],
      milestones: [
        { phase: 'Phase 1: Foundations', detail: 'Learn molecular biology, genetics fundamentals, Python, and R programming.' },
        { phase: 'Phase 2: Genomic Algorithms', detail: 'Master BLAST alignment algorithms, PyMOL 3D modeling, and RNA-seq analysis.' },
        { phase: 'Phase 3: Portfolio & Research', detail: 'Build a Github portfolio showcasing automated genome sequencing pipelines.' },
        { phase: 'Phase 4: Biotech Placement', detail: 'Join pharma R&D labs, CRISPR research institutes, or biotech startups.' },
      ],
    },
  },

  cyber_forensics: {
    key: 'cyber_forensics',
    name: 'Cybersecurity Forensics Specialist',
    icon: '🛡️',
    image: '/images/developer.png',
    tag: 'High Demand Security',
    isEmerging: false,
    salary: '₹14,00,000 - ₹26,00,000 / yr',
    reason: 'Investigates digital security breaches, recovers encrypted evidence, and thwarts cyber threats.',
    newsQuery: 'cybersecurity digital forensics threat analysis market',
    roadmap: {
      studies: [
        'B.S. in Cybersecurity, Computer Forensic Science, or Information Technology',
        'Hands-on Training in Memory Forensics, Wireshark, & EnCase Software',
      ],
      exams: [
        'Certified Forensic Computer Examiner (CFCE)',
        'GIAC Certified Forensic Analyst (GCFA)',
        'Certified Ethical Hacker (CEH) / CompTIA Security+',
      ],
      activities: [
        'Participate in Capture The Flag (CTF) digital forensic competitions',
        'Analyze mock malware samples inside isolated sandbox environments',
        'Document formal chain-of-custody digital evidence reports',
      ],
      milestones: [
        { phase: 'Phase 1: Networking & Linux', detail: 'Master TCP/IP networking, Linux administration, and file systems (NTFS, EXT4).' },
        { phase: 'Phase 2: Forensic Tools', detail: 'Learn Autopsy, Volatility memory analysis, and FTK Imager software.' },
        { phase: 'Phase 3: Certification', detail: 'Earn CEH or GCFA credentials and complete 10 CTF forensic challenges.' },
        { phase: 'Phase 4: Professional Role', detail: 'Join incident response teams, law enforcement forensics labs, or corporate SOCs.' },
      ],
    },
  },

  ux_researcher: {
    key: 'ux_researcher',
    name: 'UX Researcher & HCI Specialist',
    icon: '🔍',
    image: '/images/frontend.png',
    tag: 'Human Factors & Tech',
    isEmerging: true,
    salary: '₹10,00,000 - ₹22,00,000 / yr',
    reason: 'Studies human behavior and psychology to design effortless digital experiences.',
    newsQuery: 'UX research product design usability AI trends',
    roadmap: {
      studies: [
        'B.S. or M.S. in Cognitive Psychology, Human-Computer Interaction (HCI), or Design',
        'Qualitative & Quantitative User Testing Methodologies',
      ],
      exams: [
        'Nielsen Norman Group UX Master Certification (NN/g)',
        'Certified Usability Analyst (CUA by Human Factors International)',
      ],
      activities: [
        'Conduct usability interviews, eye-tracking tests, & card sorting exercises',
        'Publish UX case studies detailing user pain points & wireframe improvements',
        'Create interactive Figma research prototypes & persona maps',
      ],
      milestones: [
        { phase: 'Phase 1: Psychology & Design', detail: 'Understand cognitive bias, accessibility standards (WCAG), and interview methods.' },
        { phase: 'Phase 2: Research Tools', detail: 'Master Maze, UserTesting.com, Hotjar heatmaps, and SPSS quantitative analysis.' },
        { phase: 'Phase 3: Portfolio Building', detail: 'Publish 3 comprehensive UX research case studies demonstrating redesign impact.' },
        { phase: 'Phase 4: Design Team Entry', detail: 'Join product research teams at software companies or design agencies.' },
      ],
    },
  },

  quantum_computing: {
    key: 'quantum_computing',
    name: 'Quantum Computing Researcher',
    icon: '⚛️',
    image: '/images/developer.png',
    tag: 'Cutting-Edge Frontier',
    isEmerging: true,
    salary: '₹18,00,000 - ₹38,00,000 / yr',
    reason: 'Builds quantum algorithms leveraging qubits for breakthroughs in physics, cryptography, and chemistry.',
    newsQuery: 'quantum computing breakthroughs algorithms hardware market',
    roadmap: {
      studies: [
        'B.S. in Physics, Applied Mathematics, or Quantum Information Science',
        'M.S. or Ph.D. in Quantum Computing & Linear Algebra',
        'IBM Qiskit & Q# Programming Framework Training',
      ],
      exams: [
        'IBM Quantum Certified Associate Developer',
        'Graduate Record Examination (GRE Physics Advanced)',
      ],
      activities: [
        'Write quantum circuit simulations using IBM Qiskit and PennyLane',
        'Experiment on cloud-accessible real quantum hardware',
        'Contribute to open-source quantum algorithm repositories',
      ],
      milestones: [
        { phase: 'Phase 1: Math & Physics', detail: 'Master linear algebra, complex numbers, quantum mechanics, and Python.' },
        { phase: 'Phase 2: Quantum Algorithms', detail: 'Study Shor\'s algorithm, Grover\'s search, and Variational Quantum Eigensolvers.' },
        { phase: 'Phase 3: Developer Certification', detail: 'Pass IBM Quantum Certified Associate exam and simulate quantum circuits.' },
        { phase: 'Phase 4: R&D Lab Entry', detail: 'Join quantum computing divisions at IBM, Google Quantum AI, or research labs.' },
      ],
    },
  },

  renewable_energy: {
    key: 'renewable_energy',
    name: 'Renewable Energy Systems Engineer',
    icon: '🌱',
    image: '/images/interior.png',
    tag: 'Green Tech & Climate',
    isEmerging: false,
    salary: '₹9,00,000 - ₹18,00,000 / yr',
    reason: 'Designs clean energy infrastructure including solar grids, wind farms, and battery storage.',
    newsQuery: 'renewable energy solar wind green tech market trends',
    roadmap: {
      studies: [
        'B.S. in Electrical, Mechanical, or Sustainable Energy Engineering',
        'CAD Modeling & Photovoltaic System Design (PVSyst Software)',
      ],
      exams: [
        'Fundamentals of Engineering (FE Exam / EIT Certification)',
        'Professional Engineer (PE License)',
        'NABCEP Solar PV Installation Professional Certification',
      ],
      activities: [
        'Design grid-tied solar microgrid layouts using CAD and PVSyst',
        'Conduct environmental feasibility & energy efficiency audits',
        'Participate in clean-tech sustainability competitions',
      ],
      milestones: [
        { phase: 'Phase 1: Engineering Core', detail: 'Master thermodynamics, circuit analysis, CAD software, and fluid dynamics.' },
        { phase: 'Phase 2: Clean Tech Tools', detail: 'Learn PVSyst, Homer Pro energy modeling, and smart grid architecture.' },
        { phase: 'Phase 3: Licensure & FE Exam', detail: 'Pass FE exam to earn Engineer in Training (EIT) credential.' },
        { phase: 'Phase 4: Energy Sector Job', detail: 'Join solar/wind developers, utility companies, or clean energy startups.' },
      ],
    },
  },

  prompt_engineer: {
    key: 'prompt_engineer',
    name: 'AI Prompt Engineer & Systems Architect',
    icon: '🤖',
    image: '/images/developer.png',
    tag: 'Emerging AI',
    isEmerging: true,
    salary: '₹16,00,000 - ₹32,00,000 / yr',
    reason: 'Engineers system prompts, RAG architectures, and fine-tunes LLMs for business automation.',
    newsQuery: 'generative AI prompt engineering RAG LLM enterprise adoption',
    roadmap: {
      studies: [
        'B.S. in Computer Science, Data Science, or Computational Linguistics',
        'LangChain, LlamaIndex, & Vector Database Architecture Courses',
      ],
      exams: [
        'AWS Certified Machine Learning - Specialty',
        'DeepLearning.AI LLM Application Engineering Certification',
      ],
      activities: [
        'Build RAG (Retrieval-Augmented Generation) search applications using Pinecone',
        'Benchmark LLM output accuracy, token latency, and hallucination rates',
        'Create open-source AI agent workflows using Python & LangChain',
      ],
      milestones: [
        { phase: 'Phase 1: Python & APIs', detail: 'Master Python, OpenAI API, Anthropic Claude API, and JSON structured data.' },
        { phase: 'Phase 2: RAG & Vector DBs', detail: 'Build vector search embeddings with ChromaDB, Pinecone, and LangChain.' },
        { phase: 'Phase 3: Application Portfolio', detail: 'Ship 2 production AI agents showcasing low hallucination rates.' },
        { phase: 'Phase 4: Enterprise Placement', detail: 'Join AI engineering teams at tech startups or enterprise AI labs.' },
      ],
    },
  },

  developer: {
    key: 'developer',
    name: 'Full-Stack Software Developer',
    icon: '💻',
    image: '/images/developer.png',
    tag: 'High Demand Core',
    isEmerging: false,
    salary: '₹12,00,000 - ₹25,00,000 / yr',
    reason: 'Builds modern web applications, scalable database backends, and cloud software.',
    newsQuery: 'software engineering full stack cloud architecture tech trends',
    roadmap: {
      studies: [
        'B.S. in Computer Science, Software Engineering, or Accredited Coding Bootcamp',
        'Full-Stack Web Development (React, Node.js, PostgreSQL, TypeScript)',
      ],
      exams: [
        'AWS Certified Developer - Associate',
        'Meta Front-End / Back-End Developer Professional Certificate',
      ],
      activities: [
        'Build & deploy full-stack web applications with authentication & databases',
        'Solve 150+ LeetCode data structures & algorithms challenges',
        'Contribute pull requests to open-source GitHub repositories',
      ],
      milestones: [
        { phase: 'Phase 1: Web Fundamentals', detail: 'Master HTML, CSS, JavaScript ES6+, Git version control, and APIs.' },
        { phase: 'Phase 2: Stack Mastery', detail: 'Build React frontend apps connected to Express/Node backends & SQL databases.' },
        { phase: 'Phase 3: Cloud & Deployment', detail: 'Deploy web apps to AWS/Vercel and earn AWS Associate certification.' },
        { phase: 'Phase 4: Software Role', detail: 'Apply to software engineer roles, pass technical interviews, and start coding.' },
      ],
    },
  },

  doctor: {
    key: 'doctor',
    name: 'Healthcare & Clinical Specialist',
    icon: '🩺',
    image: '/images/doctor.png',
    tag: 'Vital Impact',
    isEmerging: false,
    salary: '₹20,00,000 - ₹45,00,000+ / yr',
    reason: 'Diagnoses medical conditions, prescribes treatments, and provides clinical care.',
    newsQuery: 'healthcare innovation medical AI clinical research breakthroughs',
    roadmap: {
      studies: [
        'Pre-Med Bachelor Degree (Biology, Chemistry, or Bio-Sciences)',
        'Doctor of Medicine (M.D.) or Doctor of Osteopathic Medicine (D.O.) Degree',
      ],
      exams: [
        'Medical College Admission Test (MCAT)',
        'United States Medical Licensing Examination (USMLE Step 1, Step 2, Step 3)',
      ],
      activities: [
        'Complete 100+ clinical shadowing hours in hospital departments',
        'Volunteer in emergency care units or community health centers',
        'Complete medical residency and specialized fellowship training',
      ],
      milestones: [
        { phase: 'Phase 1: Pre-Med Studies', detail: 'Complete undergraduate pre-med courses and score 510+ on the MCAT exam.' },
        { phase: 'Phase 2: Medical School', detail: 'Complete 4 years of Medical School (M.D. or D.O.) covering anatomy & clinical rotations.' },
        { phase: 'Phase 3: Licensing & Residency', detail: 'Pass USMLE Step exams and complete 3-7 years of hospital residency.' },
        { phase: 'Phase 4: Medical Practice', detail: 'Obtain state medical license and practice as board-certified physician.' },
      ],
    },
  },

  marketer: {
    key: 'marketer',
    name: 'Digital Growth & Analytics Strategist',
    icon: '📈',
    image: '/images/marketer.png',
    tag: 'Growth Strategy',
    isEmerging: false,
    salary: '₹8,00,000 - ₹18,00,000 / yr',
    reason: 'Drives customer acquisition through data-driven storytelling, SEO, and paid media.',
    newsQuery: 'digital marketing analytics growth strategy AI advertising trends',
    roadmap: {
      studies: [
        'B.S. in Marketing, Communications, Business Analytics, or Economics',
        'Courses in Google Analytics 4, SEO Strategy, & Performance Marketing',
      ],
      exams: [
        'Google Ads & Google Analytics Individual Qualification (GAIQ)',
        'HubSpot Inbound Marketing & Content Certification',
        'Meta Certified Digital Marketing Associate',
      ],
      activities: [
        'Manage live ad campaigns on Meta & Google Ads with measurable ROI',
        'Optimize website landing page conversion rates (A/B testing)',
        'Write SEO content strategies that rank on search engines',
      ],
      milestones: [
        { phase: 'Phase 1: Marketing Core', detail: 'Learn consumer psychology, copywriting, and digital channel strategy.' },
        { phase: 'Phase 2: Analytics & Ads', detail: 'Master Google Analytics 4, Meta Ads Manager, and SEO keyword tools.' },
        { phase: 'Phase 3: Certifications', detail: 'Earn Google & HubSpot certifications and manage a small test campaign budget.' },
        { phase: 'Phase 4: Growth Lead Role', detail: 'Join marketing agencies, e-commerce brands, or tech growth teams.' },
      ],
    },
  },

  choreographer: {
    key: 'choreographer',
    name: 'Choreographer & Performance Artist',
    icon: '💃',
    image: '/images/marketer.png',
    tag: 'Performing Arts',
    isEmerging: false,
    salary: '₹5,00,000 - ₹14,00,000 / yr',
    reason: 'Creates original dance works, directs rehearsals, and stages performances for companies, festivals, and media.',
    newsQuery: 'contemporary dance choreography performing arts theatre trends',
    roadmap: {
      studies: [
        'B.F.A. or diploma in Dance, Choreography, or Performing Arts',
        'Intensive training in technique (contemporary, classical, hip-hop, or your style)',
        'Composition, improvisation, and stagecraft workshops',
      ],
      exams: [
        'Conservatory / company audition portfolios (primary gate)',
        'Optional: Dance teaching certificates if you also instruct',
      ],
      activities: [
        'Build a showreel of original pieces and live performances',
        'Join a dance company, collective, or festival circuit',
        'Collaborate with musicians, directors, and production teams',
      ],
      milestones: [
        { phase: 'Phase 1: Technique', detail: 'Train consistently and document progressive performance skill.' },
        { phase: 'Phase 2: Composition', detail: 'Create short works and present them at showcases or student festivals.' },
        { phase: 'Phase 3: Portfolio', detail: 'Assemble a professional reel and audition packet.' },
        { phase: 'Phase 4: Professional work', detail: 'Book company roles, commissions, or independent productions.' },
      ],
    },
  },

  dance_educator: {
    key: 'dance_educator',
    name: 'Dance Educator & Studio Director',
    icon: '🩰',
    image: '/images/marketer.png',
    tag: 'Arts Education',
    isEmerging: false,
    salary: '₹4,50,000 - ₹12,00,000 / yr',
    reason: 'Teaches dance technique and artistry in schools, studios, or community programs, and may run a studio.',
    newsQuery: 'dance education arts pedagogy studio movement training',
    roadmap: {
      studies: [
        'Degree or certification in Dance Education, Physical Education, or Performing Arts',
        'Pedagogy courses: how to teach movement safely across age groups',
        'Business basics if you plan to run a studio',
      ],
      exams: [
        'State teaching license / education credential where required',
        'First aid & safe dance practice certifications',
      ],
      activities: [
        'Assist or teach classes at a local studio',
        'Design age-appropriate syllabi and recital pieces',
        'Build student progress systems and parent communication',
      ],
      milestones: [
        { phase: 'Phase 1: Train & assist', detail: 'Keep personal technique strong while assisting experienced teachers.' },
        { phase: 'Phase 2: Lead classes', detail: 'Take ownership of regular class slots and student outcomes.' },
        { phase: 'Phase 3: Credentials', detail: 'Complete teaching credentials and safe-practice certifications.' },
        { phase: 'Phase 4: Studio or school role', detail: 'Join a school arts faculty or grow into studio leadership.' },
      ],
    },
  },

  dance_therapist: {
    key: 'dance_therapist',
    name: 'Dance / Movement Therapist',
    icon: '🕊️',
    image: '/images/doctor.png',
    tag: 'Arts & Wellness',
    isEmerging: true,
    salary: '₹6,00,000 - ₹14,00,000 / yr',
    reason: 'Uses dance and movement to support mental health, rehabilitation, and emotional wellbeing.',
    newsQuery: 'dance movement therapy mental health wellness research',
    roadmap: {
      studies: [
        'Bachelor’s in Psychology, Dance, or related field',
        'Master’s in Dance/Movement Therapy (ADTA-aligned programs)',
        'Clinical internship hours in therapeutic settings',
      ],
      exams: [
        'Board Certified Dance/Movement Therapist (BC-DMT) pathway',
        'Counseling / mental health licensure requirements by region',
      ],
      activities: [
        'Volunteer in wellness, rehab, or community mental-health programs',
        'Practice facilitated movement sessions under supervision',
        'Study trauma-informed and inclusive movement methods',
      ],
      milestones: [
        { phase: 'Phase 1: Dual foundation', detail: 'Build both dance skill and psychology coursework.' },
        { phase: 'Phase 2: Graduate training', detail: 'Enter an accredited dance/movement therapy master’s program.' },
        { phase: 'Phase 3: Clinical hours', detail: 'Complete supervised practice and certification requirements.' },
        { phase: 'Phase 4: Practice', detail: 'Work in clinics, schools, hospitals, or private practice.' },
      ],
    },
  },
};