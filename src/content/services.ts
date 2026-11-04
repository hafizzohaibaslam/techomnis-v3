export interface ServiceItem {
  slug: string
  name: string
  shortName: string
  description: string
  tags: string[]
  icon: 'shield' | 'dashboard' | 'chart'
}

export const services: ServiceItem[] = [
  {
    slug: 'mvp-rescue',
    name: 'MVP rescue',
    shortName: 'MVP rescue',
    description:
      'Broken MVP or AI-built code gets audited, fixed, hardened and tested so it survives real users. You get a clear fix plan before any build work starts.',
    tags: [
      'Code audit',
      'AI-code clean-up',
      'Current state review',
      'Auth & secrets',
      'Bug triage',
      'Test coverage',
      'CI/CD',
      'Core Web Vitals',
      'Error monitoring',
      'Database clean-up',
      'Security review',
      'Launch checklist',
      'Fixed-fee audit',
      'Handover docs',
    ],
    icon: 'shield',
  },
  {
    slug: 'product-engineering',
    name: 'Product engineering',
    shortName: 'Product engineering',
    description:
      'Design and engineering of the whole product, from the first sketch to billing and launch. One senior team owns UI, API, data and infra.',
    tags: [
      'Next.js',
      'TypeScript',
      'Tailwind',
      'shadcn/ui',
      'SaaS',
      'Marketplaces',
      'EdTech',
      'Stripe billing',
      'Dashboards',
      'Roles & auth',
    ],
    icon: 'dashboard',
  },
  {
    slug: 'ai-llm',
    name: 'AI & LLM',
    shortName: 'AI & LLM',
    description:
      'AI features that hold up in production, like our own RAG chatbot SaaS, Othego. They are measured, monitored and priced so they stay affordable.',
    tags: [
      'RAG',
      'Chatbots',
      'Agents',
      'Evals',
      'Vector search',
      'Prompt pipelines',
      'Cost control',
    ],
    icon: 'chart',
  },
]

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return services.find((s) => s.slug === slug)
}

export const specialServices = [
  {
    title: 'Code audit',
    description:
      'We read the repo, infra and data, then rank every risk in a written report.',
    icon: 'search',
  },
  {
    title: 'CI/CD',
    description:
      'Pipelines, preview deploys and rollback, so every change ships the same way.',
    icon: 'branch',
  },
  {
    title: 'Stripe billing',
    description:
      'Subscriptions, tiers and webhooks wired into the product and tested end to end.',
    icon: 'card',
  },
  {
    title: 'Roles & auth',
    description: 'Sign-in, roles and secrets handled properly before real users arrive.',
    icon: 'lock',
  },
  {
    title: 'Dashboards',
    description: 'Admin and analytics views that show the numbers your team needs.',
    icon: 'grid',
  },
  {
    title: 'Vector search',
    description:
      'Retrieval over your own data for chatbots and assistants, as in Othego.',
    icon: 'bot',
  },
  {
    title: 'Evals',
    description:
      'Test sets and scoring for LLM features, so quality is measured and not guessed.',
    icon: 'flask',
  },
  {
    title: 'Error monitoring',
    description:
      'Alerts and dashboards in production, with before and after metrics for every fix.',
    icon: 'bell',
  },
]

export const buildItems = [
  'SaaS',
  'Marketplaces',
  'EdTech platforms',
  'Dashboards',
  'Admin panels',
  'Chatbots',
  'AI agents',
  'RAG search',
  'Stripe billing',
  'Roles & auth',
  'APIs',
  'Next.js apps',
  'Data pipelines',
  'Monitoring',
  'CI/CD',
  'Landing pages',
  'Handover docs',
]
