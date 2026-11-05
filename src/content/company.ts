export interface CompanyStat {
  value: string
  label: string
  description?: string
}

export interface CompanyValue {
  title: string
  description: string
}

export interface ProcessStep {
  number: string
  title: string
  timing?: string
  description: string
  details?: string[]
}

export const companyStats: CompanyStat[] = [
  {
    value: '17',
    label: 'Case Studies',
    description: 'Products shipped end to end',
  },
  {
    value: '12+',
    label: 'Industries',
    description: 'From EdTech to HealthTech',
  },
  {
    value: '$2B+',
    label: 'Client Impact',
    description: 'Raised and closed across the portfolio',
  },
]

export const companyValues: CompanyValue[] = [
  {
    title: 'Senior by default',
    description: 'The people who scope your product are the people who build it.',
  },
  {
    title: 'Whole system',
    description: 'Design, code, cloud and AI, owned together.',
  },
  {
    title: 'Written, not assumed',
    description: 'Scope, risks and non-goals on paper first.',
  },
  {
    title: 'Built to hand over',
    description: 'Your repo, your keys, documentation your next hire can read.',
  },
]

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Brief',
    timing: 'Week 0–1',
    description: 'We read what exists: repo, deck, data, users. You get a written Production Brief covering the problem, scope, non-goals, risks and a fixed price for the next step.',
  },
  {
    number: '02',
    title: 'Architecture',
    timing: 'Week 1–2',
    description: 'One diagram anyone on your team can read: data model, services, AI layer and running costs.',
  },
  {
    number: '03',
    title: 'Design & Build',
    timing: 'Weekly',
    description: 'Design and engineering in one team. A shipped, clickable increment every week.',
  },
  {
    number: '04',
    title: 'Harden',
    description: 'We try to break it before your users do: QA, security review, load checks, AI evaluations, monitoring.',
  },
  {
    number: '05',
    title: 'Launch & Grow',
    description: 'A monitored production launch with rollback. Then we measure, improve and build what\'s next, or hand over cleanly.',
  },
]

export const processPrinciples = [
  'We read the code before we quote.',
  'Rescue before rewrite.',
  'One team, one repo.',
  'You own everything.',
  'No evaluation set, no AI launch.',
  'We say no in writing.',
]

export const companyStory = {
  headline: 'A studio built to ship.',
  intro: 'TechOmnis is a founder-led product studio for design, engineering and AI. Founded in 2024 in Lahore, it builds for teams in the US, UK and UAE.',
  whyWeExist: [
    'Products rarely fail because the idea is wrong. They fail in the gap between a working demo and a working business: hand-offs between vendors, prototypes nobody can extend, AI that never leaves the pilot.',
    'We started TechOmnis to close that gap with one studio for design, engineering and AI, and one standard: production.',
  ],
  beliefs: [
    'Speed is cheap now. Judgment isn\'t.',
    'Software isn\'t done when it demos. It\'s done when it survives users.',
    'The best studio is the one you don\'t have to manage.',
  ],
}

export const industries = [
  'EdTech & K-12',
  'Immigration & Talent',
  'M&A & Venture',
  'Fintech & Mortgage',
  'HealthTech',
  'Hospitality & PropTech',
  'Media & Advocacy',
  'SaaS & AI Tools',
]

export const industriesWithExamples = [
  { name: 'EdTech & K-12', examples: 'REACH Pathways, The Build Fellowship, BaboBot, Edulog' },
  { name: 'Immigration & Talent', examples: 'Build Talent Labs' },
  { name: 'M&A & Venture', examples: 'Tuck Advisors, Archyr' },
  { name: 'Fintech & Mortgage', examples: 'Low Rate Co' },
  { name: 'HealthTech', examples: 'Waivs.ai' },
  { name: 'Hospitality & PropTech', examples: 'Bellhopt, Atus Global' },
  { name: 'Media & Advocacy', examples: 'StoryHEAT, Authentic Spark' },
  { name: 'SaaS & AI Tools', examples: 'TestFiesta, Othego, MJ Ventures' },
]
