// Central definition of every career the quiz can match to.
// `taskType` maps to a component in src/pages/tasks/
// `newsQuery` is the keyword sent to the /api/news endpoint

export const careers = {
  developer: {
    key: 'developer',
    name: 'Software Developer',
    reason: 'You enjoy logical problem-solving and building things step by step.',
    taskType: 'debugger',
    newsQuery: 'software engineering jobs',
  },
  frontend: {
    key: 'frontend',
    name: 'Frontend / UI Developer',
    reason: 'You like making things both work correctly and look right.',
    taskType: 'frontend',
    newsQuery: 'frontend developer trends',
  },
  interior: {
    key: 'interior',
    name: 'Interior Designer',
    reason: 'You have a natural sense of space, flow, and how a room should feel.',
    taskType: 'interior',
    newsQuery: 'interior design trends',
  },
  doctor: {
    key: 'doctor',
    name: 'Doctor / Healthcare Professional',
    reason: "You're driven by helping people and reasoning through complex situations.",
    taskType: 'scenario',
    scenario: {
      prompt: 'A patient reports fatigue and frequent thirst. What\'s your next best question?',
      options: [
        'Have you been urinating more than usual?',
        'Do you like your job?',
        'What\'s your favorite food?',
      ],
      correct: 0,
    },
    newsQuery: 'healthcare jobs',
  },
  marketer: {
    key: 'marketer',
    name: 'Marketing Specialist',
    reason: 'You think in stories and enjoy connecting with people persuasively.',
    taskType: 'scenario',
    scenario: {
      prompt: 'Which headline is more likely to convert for a reusable water bottle brand?',
      options: [
        '"Our Bottles Are Made of Plastic"',
        '"Stay Hydrated, Ditch the Waste"',
        '"Bottle Product Page"',
      ],
      correct: 1,
    },
    newsQuery: 'marketing jobs trends',
  },
  lawyer: {
    key: 'lawyer',
    name: 'Lawyer',
    reason: 'You enjoy structured argument, evidence, and ethical reasoning.',
    taskType: 'scenario',
    scenario: {
      prompt: 'Two witnesses disagree on a timeline. What\'s your first move?',
      options: [
        'Assume the more confident witness is right',
        'Check for physical or documented evidence to verify',
        'Ignore both testimonies',
      ],
      correct: 1,
    },
    newsQuery: 'legal industry jobs',
  },
};

// Each question maps its options to weighted career scores.
export const questions = [
  {
    q: 'What excites you more?',
    options: [
      { text: 'Solving logical puzzles', w: { developer: 2, lawyer: 1 } },
      { text: 'Helping people directly', w: { doctor: 2, marketer: 1 } },
      { text: 'Making things look and feel right', w: { frontend: 2, interior: 1 } },
      { text: 'Arranging space or visuals thoughtfully', w: { interior: 2, frontend: 1 } },
    ],
  },
  {
    q: 'How do you prefer to work?',
    options: [
      { text: 'Alone, deep-focused', w: { developer: 2, frontend: 1 } },
      { text: 'In a team, discussing ideas', w: { marketer: 2, lawyer: 1 } },
      { text: 'One-on-one with people', w: { doctor: 2 } },
      { text: 'Hands-on, adjusting things until they feel right', w: { interior: 2, frontend: 1 } },
    ],
  },
  {
    q: 'Pick a task you\'d enjoy:',
    options: [
      { text: 'Debugging a tricky piece of code', w: { developer: 2 } },
      { text: 'Fixing a webpage\'s look and feel', w: { frontend: 2 } },
      { text: 'Rearranging a room to feel more balanced', w: { interior: 2 } },
      { text: 'Diagnosing a real-world problem', w: { doctor: 2, lawyer: 1 } },
    ],
  },
];

export function scoreToTopTwo(scores) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([key]) => key);
}