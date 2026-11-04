export interface CaseStudy {
  slug: string
  name: string
  category: string
  description: string
  tags: string[]
  gradient: [string, string]
  darkTheme?: boolean
  metric?: { value: string; label: string; placeholder?: boolean }
  quote?: { text: string; author: string; role: string; placeholder?: boolean }
  award?: string
  rotation?: number
  hasPage: boolean
}

export const cases: CaseStudy[] = [
  {
    slug: 'othego',
    name: 'Othego',
    category: 'Own product',
    description: 'Our own RAG chatbot SaaS with Stripe subscription tiers.',
    tags: ['AI · RAG', 'SaaS', 'Stripe'],
    gradient: ['#5B6CFF', '#C9B8FF'],
    metric: { value: 'X.X', label: 'Key metric', placeholder: true },
    rotation: -6,
    hasPage: true,
  },
  {
    slug: 'edulog-athena-v2',
    name: 'Edulog Athena V2',
    category: 'Product engineering',
    description: 'One-line summary of the project from The Playbook.',
    tags: ['EdTech', 'Client: Edulog'],
    gradient: ['#DDF3EE', '#6FCFB9'],
    quote: {
      text: 'Verbatim client quote goes here.',
      author: 'Client name',
      role: 'role',
      placeholder: true,
    },
    metric: { value: 'xN', label: 'Outcome to confirm', placeholder: true },
    rotation: 5,
    hasPage: false,
  },
  {
    slug: 'archyr',
    name: 'Archyr',
    category: 'Project type',
    description: 'One-line summary of the project from The Playbook.',
    tags: ['Tags TBC'],
    gradient: ['#1E2126', '#3A3F47'],
    darkTheme: true,
    award: 'Award or recognition, if any',
    rotation: -6,
    hasPage: false,
  },
  {
    slug: 'waivs-ai',
    name: 'Waivs.ai',
    category: 'Project type',
    description: 'One-line summary of the project from The Playbook.',
    tags: ['AI', 'Tags TBC'],
    gradient: ['#DDEBFF', '#5C9DFF'],
    metric: { value: 'XX%', label: 'Outcome for Waivs.ai, to confirm', placeholder: true },
    rotation: 5,
    hasPage: false,
  },
  {
    slug: 'babobot',
    name: 'BaboBot',
    category: 'Project type',
    description: 'One-line summary of the project from The Playbook.',
    tags: ['Tags TBC'],
    gradient: ['#FFE9D6', '#FF9F5A'],
    metric: { value: 'X.X', label: 'Key metric', placeholder: true },
    rotation: -6,
    hasPage: false,
  },
  {
    slug: 'authentic-spark',
    name: 'Authentic Spark',
    category: 'Project type',
    description: 'One-line summary of the project from The Playbook.',
    tags: ['Tags TBC'],
    gradient: ['#F3E8FF', '#B57BFF'],
    quote: {
      text: 'Verbatim client quote goes here.',
      author: 'Client name',
      role: 'role',
      placeholder: true,
    },
    metric: { value: 'xN', label: 'Outcome to confirm', placeholder: true },
    rotation: 5,
    hasPage: false,
  },
  {
    slug: 'tuck-advisors',
    name: 'Tuck Advisors',
    category: 'Project type',
    description: 'One-line summary of the project from The Playbook.',
    tags: ['Tags TBC'],
    gradient: ['#E7ECF3', '#7D8DA6'],
    metric: { value: 'XX%', label: 'Outcome for Tuck Advisors, to confirm', placeholder: true },
    rotation: -6,
    hasPage: false,
  },
  {
    slug: 'reach-pathways',
    name: 'REACH Pathways',
    category: 'Project type',
    description: 'One-line summary of the project from The Playbook.',
    tags: ['Tags TBC'],
    gradient: ['#E2F6E9', '#53B97A'],
    award: 'Award or recognition, if any',
    rotation: 5,
    hasPage: false,
  },
  {
    slug: 'bellhopt',
    name: 'Bellhopt',
    category: 'Project type',
    description: 'One-line summary of the project from The Playbook.',
    tags: ['Tags TBC'],
    gradient: ['#FFF4CC', '#F2B705'],
    metric: { value: 'X.X', label: 'Key metric', placeholder: true },
    rotation: -6,
    hasPage: false,
  },
  {
    slug: 'testfiesta',
    name: 'TestFiesta',
    category: 'Project type',
    description: 'One-line summary of the project from The Playbook.',
    tags: ['Tags TBC'],
    gradient: ['#FFE3E8', '#F25C7A'],
    metric: { value: 'XX%', label: 'Outcome for TestFiesta, to confirm', placeholder: true },
    rotation: 5,
    hasPage: false,
  },
  {
    slug: 'atus-global',
    name: 'Atus Global',
    category: 'Project type',
    description: 'One-line summary of the project from The Playbook.',
    tags: ['Tags TBC'],
    gradient: ['#DFF1FF', '#3AA0E8'],
    quote: {
      text: 'Verbatim client quote goes here.',
      author: 'Client name',
      role: 'role',
      placeholder: true,
    },
    metric: { value: 'xN', label: 'Outcome to confirm', placeholder: true },
    rotation: -6,
    hasPage: false,
  },
  {
    slug: 'finvera',
    name: 'Finvera',
    category: 'Project type',
    description: 'One-line summary of the project from The Playbook.',
    tags: ['Tags TBC'],
    gradient: ['#1D2B2A', '#2F6F64'],
    darkTheme: true,
    metric: { value: 'X.X', label: 'Key metric', placeholder: true },
    rotation: 5,
    hasPage: false,
  },
  {
    slug: 'kitahub',
    name: 'Kitahub',
    category: 'Project type',
    description: 'One-line summary of the project from The Playbook.',
    tags: ['Tags TBC'],
    gradient: ['#EEF0F2', '#9AA3AD'],
    award: 'Award or recognition, if any',
    rotation: -6,
    hasPage: false,
  },
  {
    slug: 'leaf-ai',
    name: 'Leaf AI',
    category: 'Project type',
    description: 'One-line summary of the project from The Playbook.',
    tags: ['AI', 'Tags TBC'],
    gradient: ['#E5F7DF', '#6CC04A'],
    metric: { value: 'XX%', label: 'Outcome for Leaf AI, to confirm', placeholder: true },
    rotation: 5,
    hasPage: false,
  },
]

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug)
}

export function getPublishedCases(): CaseStudy[] {
  return cases
}

export { cases as caseStudies }
