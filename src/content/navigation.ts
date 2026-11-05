export interface NavItem {
  label: string
  href: string
  dataGo: string
}

export const mainNavItems: NavItem[] = [
  { label: 'Work', href: '/work', dataGo: 'Work' },
  { label: 'Services', href: '/services', dataGo: 'Services' },
  { label: 'Process', href: '/process', dataGo: 'Process' },
  { label: 'About', href: '/about', dataGo: 'About' },
]

export const sectionMappings: {
  selector: string
  label: string
  href?: string
}[] = [
  { selector: '#top', label: 'Home' },
  { selector: '#services', label: 'Services' },
  { selector: '#work', label: 'Work' },
  { selector: '#process', label: 'Process' },
  { selector: '.direction', label: 'Services', href: '#services' },
  { selector: '#clients', label: 'Work', href: '#work' },
  { selector: '#about', label: 'About' },
  { selector: '#contact', label: 'Contact' },
]

export const directionTitles = ['Our process', 'MVP rescue', 'Full product build']

export const directionItems: { title: string; group: number }[] = [
  { title: 'AI / LLM products', group: 0 },
  { title: 'Production rescue', group: 0 },
  { title: 'SaaS', group: 1 },
  { title: 'Marketplaces', group: 1 },
  { title: 'Mobile apps', group: 1 },
  { title: 'Web · Mobile · Cloud', group: 2 },
]

export const painScenarios = [
  {
    quote: '"AI got us 80% there."',
    description: 'Now every fix breaks something else.',
  },
  {
    quote: '"Our platform outgrew its legacy stack."',
    description: 'It can\'t scale and nobody wants to touch it.',
  },
  {
    quote: '"Our AI pilot never shipped."',
    description: 'It works in the demo. It fails on real data.',
  },
  {
    quote: '"We\'re managing three vendors."',
    description: 'Design here, dev there, AI somewhere else.',
  },
  {
    quote: '"We\'re an agency and need a senior build partner."',
    link: '/services/partners',
  },
]

export const faq = [
  {
    question: 'Can you take an app built with Lovable, Bolt or Cursor to production?',
    answer: 'Yes. It\'s a dedicated practice. We audit first, then keep, refactor or rebuild module by module. Most AI-built MVPs don\'t need a full rewrite.',
  },
  {
    question: 'What does it cost?',
    answer: 'Production audits start at $500. MVP and product builds start at $8,000. Studio retainers start at $5,000 a month. Every build is scoped in a written Production Brief first.',
  },
  {
    question: 'How long does it take?',
    answer: 'It depends on scope. Typically 3–6 weeks for an MVP, 6–12 weeks for a SaaS product and 3+ months for AI platforms. The Production Brief commits to a timeline.',
  },
  {
    question: 'Do you design, build, or both?',
    answer: 'Both, plus the AI layer. One studio means nothing gets lost in hand-off.',
  },
  {
    question: 'Do you build mobile apps?',
    answer: 'Yes, in Flutter or React Native, on the same backend as your web product.',
  },
  {
    question: 'Who owns the code?',
    answer: 'You do. Your repo, your cloud, your keys, from day one.',
  },
  {
    question: 'How do you keep AI features safe and affordable?',
    answer: 'Evaluation sets built from real cases, human approval on consequential actions, cost limits, and full tracing and monitoring.',
  },
  {
    question: 'Do you partner with agencies?',
    answer: 'Yes. White-label, NDA first, on your process.',
  },
]
