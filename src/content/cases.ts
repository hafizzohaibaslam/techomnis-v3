export interface CaseStudy {
  id: string
  name: string
  description: string
  tags: string[]
  gradientFrom: string
  gradientTo: string
  metric: string
  metricLabel: string
  isPlaceholder: true
}

export interface FeaturedCase {
  id: string
  name: string
  subtitle: string
  description: string
  tags: string[]
  gradientFrom: string
  gradientTo: string
  metrics: {
    label: string
    value: string
    isPlaceholder: true
  }[]
}

export const featuredCase: FeaturedCase = {
  id: 'othego',
  name: 'Othego',
  subtitle: 'Own product',
  description: 'Our own RAG chatbot SaaS with Stripe subscription tiers.',
  tags: ['AI · RAG', 'SaaS', 'Stripe'],
  gradientFrom: '#5B6CFF',
  gradientTo: '#C9B8FF',
  metrics: [
    { label: 'Key metric', value: 'X.X TBC', isPlaceholder: true },
    { label: 'Result', value: 'XX%', isPlaceholder: true },
  ],
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'edulog',
    name: 'Edulog Athena V2',
    description: 'Outcome for Edulog, to confirm.',
    tags: ['EdTech', 'Client: Edulog'],
    gradientFrom: '#DDF3EE',
    gradientTo: '#6FCFB9',
    metric: 'XX%',
    metricLabel: 'Outcome for Edulog, to confirm.',
    isPlaceholder: true,
  },
  {
    id: 'archyr',
    name: 'Archyr',
    description: 'Summary from The Playbook.',
    tags: ['Tags TBC'],
    gradientFrom: '#1E2126',
    gradientTo: '#3A3F47',
    metric: 'xN',
    metricLabel: 'Summary from The Playbook.',
    isPlaceholder: true,
  },
  {
    id: 'waivs',
    name: 'Waivs.ai',
    description: 'Summary from The Playbook.',
    tags: ['AI', 'Tags TBC'],
    gradientFrom: '#DDEBFF',
    gradientTo: '#5C9DFF',
    metric: 'XX%',
    metricLabel: 'Summary from The Playbook.',
    isPlaceholder: true,
  },
]

export const totalCaseStudies = 17
