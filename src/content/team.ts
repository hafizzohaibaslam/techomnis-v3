export interface TeamMember {
  initials: string
  name: string
  role: string
  metric: { value: string; label: string; placeholder?: boolean }
  bio: string[]
  skills: string[]
  linkedin?: string
  upwork?: string
}

export const teamMembers: TeamMember[] = [
  {
    initials: 'ZA',
    name: 'Zohaib Aslam',
    role: 'Founder, TechOmnis',
    metric: { value: '$300K+', label: 'earned on Upwork' },
    bio: [
      'Founded TechOmnis in 2024 in Lahore. Top Rated Plus on Upwork with 5.0 from 68 reviews and $300K+ earned.',
      'Leads 17 case studies across 12+ industries, from MVP rescue to full product builds and AI features.',
    ],
    skills: [
      'Product engineering',
      'MVP rescue',
      'AI & LLM',
      'Next.js',
      'TypeScript',
      'Stripe billing',
    ],
  },
  {
    initials: 'ZM',
    name: 'Zohaib Mehmood',
    role: 'Team lead, TechOmnis',
    metric: { value: 'X+', label: 'years of experience', placeholder: true },
    bio: [
      'Leads delivery across the engineering team, from audit to production deploy.',
      'Second paragraph of the bio goes here.',
    ],
    skills: ['Skills to confirm'],
  },
]

export { teamMembers as team }

export const mindsetItems = [
  {
    title: 'We think like product owners',
    description:
      'Every decision is weighed against the product and the business, not only the ticket in front of us.',
    icon: 'target',
  },
  {
    title: 'One senior team, end to end',
    description:
      'UI, API, LLM, data and infra sit with one team, so nothing falls between vendors.',
    icon: 'users',
  },
  {
    title: 'We ship to production',
    description:
      'A fix is not done until it is deployed, monitored and has a rollback plan.',
    icon: 'rocket',
  },
  {
    title: 'We measure every fix',
    description:
      'You get before and after metrics, so progress is visible and not a matter of opinion.',
    icon: 'gauge',
  },
  {
    title: 'Audit before we build',
    description:
      'A fixed-fee audit comes first. You see the risks and the plan before any build work starts.',
    icon: 'search',
  },
  {
    title: 'AI that stays affordable',
    description:
      'LLM features are measured, monitored and priced so they hold up in production, like Othego.',
    icon: 'bot',
  },
  {
    title: 'Clear handover',
    description:
      'Docs, tests and CI/CD come with the code, so your team can own it after we leave.',
    icon: 'doc',
  },
  {
    title: 'We are honest about unknowns',
    description:
      'If something is not confirmed, we say so and label it, as on this page.',
    icon: 'info',
  },
]

export const quotes = [
  {
    text: 'Simplicity is prerequisite for reliability.',
    author: 'Edsger W. Dijkstra',
    role: 'Computer scientist',
    initials: 'ED',
  },
  {
    text: 'Programs must be written for people to read, and only incidentally for machines to execute.',
    author: 'Harold Abelson',
    role: 'Structure and Interpretation of Computer Programs',
    initials: 'HA',
  },
  {
    text: 'Talk is cheap. Show me the code.',
    author: 'Linus Torvalds',
    role: 'Creator of Linux',
    initials: 'LT',
  },
  {
    text: 'Premature optimization is the root of all evil.',
    author: 'Donald Knuth',
    role: 'Computer scientist',
    initials: 'DK',
  },
  {
    text: 'Make it work, make it right, make it fast.',
    author: 'Kent Beck',
    role: 'Software engineer',
    initials: 'KB',
  },
]
