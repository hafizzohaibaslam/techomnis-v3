export interface Stage {
  icon: 'eye' | 'shield' | 'pencil' | 'dashboard' | 'chart'
  title: string
  description: string
}

export interface Service {
  id: string
  title: string
  tags: string[]
  stages: Stage[]
}

export const services: Service[] = [
  {
    id: 'mvp-rescue',
    title: 'MVP rescue',
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
    stages: [
      {
        icon: 'eye',
        title: 'Audit',
        description:
          'We read the repo, infra and data, then rank every risk. You get a clear fix plan before any build work starts.',
      },
      {
        icon: 'shield',
        title: 'Stabilise',
        description:
          'Broken MVP or AI-built code gets fixed, hardened and tested so it survives real users.',
      },
      {
        icon: 'pencil',
        title: 'Ship',
        description:
          'Production deploy with monitoring and rollback, plus before and after metrics for every fix.',
      },
    ],
  },
  {
    id: 'product-engineering',
    title: 'Product engineering',
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
    stages: [
      {
        icon: 'dashboard',
        title: 'Build',
        description:
          'Design and engineering of the whole product, from the first sketch to billing and launch. One senior team owns UI, API, data and infra.',
      },
    ],
  },
  {
    id: 'ai-llm',
    title: 'AI & LLM',
    tags: [
      'RAG',
      'Chatbots',
      'Agents',
      'Evals',
      'Vector search',
      'Prompt pipelines',
      'Cost control',
    ],
    stages: [
      {
        icon: 'chart',
        title: 'Integrate',
        description:
          'AI features that hold up in production, like our own RAG chatbot SaaS, Othego. They are measured, monitored and priced so they stay affordable.',
      },
    ],
  },
]
