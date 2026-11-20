export interface TeamMember {
  initials: string
  name: string
  role: string
  image?: string
  bgColor?: string
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
    role: 'Founder',
    image: '/images/team/zohaib-aslam.png',
    bgColor: '#8B5CF6',
    metric: { value: '5.0', label: 'Upwork rating' },
    bio: [
      'A full-stack AI engineer who leads product, architecture and AI systems at TechOmnis.',
      'Top Rated Plus with a 5.0 rating on Upwork.',
    ],
    skills: [
      'Product engineering',
      'AI & LLM',
      'Architecture',
      'Next.js',
      'TypeScript',
      'Python',
    ],
    linkedin: 'https://www.linkedin.com/in/hzohaibaslam',
    upwork: 'https://www.upwork.com/freelancers/~013f9f91b47aa1ba3c',
  },
  {
    initials: 'ZM',
    name: 'Zohaib Murtaza',
    role: 'Co-founder & CTO',
    image: '/images/team/zohaib-murtaza.webp',
    bgColor: '#1a1a1a',
    metric: { value: '8+', label: 'years experience' },
    bio: [
      'Eight years shipping web products.',
      'Leads engineering across frontend, backend and delivery at TechOmnis.',
    ],
    skills: [
      'Engineering',
      'Frontend',
      'Backend',
      'Delivery',
      'React',
      'Node.js',
    ],
    linkedin: 'https://www.linkedin.com/in/zohaib-m/',
  },
]

export { teamMembers as team }

export const mindsetItems = [
  {
    title: 'Senior by default',
    description:
      'The people who scope your product are the people who build it.',
    icon: 'target',
  },
  {
    title: 'The whole system',
    description:
      'Design, code, cloud and AI, owned together. No vendor hand-offs.',
    icon: 'users',
  },
  {
    title: 'Written, not assumed',
    description:
      'Scope, risks and non-goals on paper first in a Production Brief.',
    icon: 'doc',
  },
  {
    title: 'Built to hand over',
    description:
      'Your repo, your keys, documentation your next hire can read.',
    icon: 'rocket',
  },
  {
    title: 'Rescue before rewrite',
    description:
      'We audit first. Most AI-built MVPs don\'t need a full rewrite.',
    icon: 'search',
  },
  {
    title: 'AI that stays affordable',
    description:
      'Evaluation sets, cost limits and monitoring so AI holds up in production.',
    icon: 'bot',
  },
  {
    title: 'One team, one repo',
    description:
      'UI, API, data, infra and AI in one team, so nothing falls between vendors.',
    icon: 'gauge',
  },
  {
    title: 'We say no in writing',
    description:
      'If it isn\'t worth building, the Production Brief will say so.',
    icon: 'info',
  },
]

export const quotes = [
  {
    text: 'Speed is cheap now. Judgment isn\'t.',
    author: 'TechOmnis',
    role: 'Studio principle',
    initials: 'TO',
  },
  {
    text: 'Software isn\'t done when it demos. It\'s done when it survives users.',
    author: 'TechOmnis',
    role: 'Studio principle',
    initials: 'TO',
  },
  {
    text: 'The best studio is the one you don\'t have to manage.',
    author: 'TechOmnis',
    role: 'Studio principle',
    initials: 'TO',
  },
]
