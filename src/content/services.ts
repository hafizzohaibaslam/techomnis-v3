export interface ServiceItem {
  slug: string
  name: string
  shortName: string
  headline: string
  description: string
  outcome: string
  deliverables: string
  tags: string[]
  icon: 'shield' | 'dashboard' | 'chart' | 'phone'
}

export const services: ServiceItem[] = [
  {
    slug: 'mvp-rescue',
    name: 'Production Rescue',
    shortName: 'Production Rescue',
    headline: 'It works in the demo.',
    description:
      'Lovable, Bolt, Cursor, Replit, v0, a legacy platform, or a codebase a previous team left behind. We take it to production.',
    outcome: 'Safe to put in front of paying users.',
    deliverables: 'A risk-ranked audit and a fixed plan to production.',
    tags: [
      'Auth that works for the founder and no one else',
      'Database rules off. Keys in the client.',
      'Payments that charge but never update the subscription',
      'An AI bill that tripled overnight',
      'Automations that time out on long jobs',
      'No tests, no staging, no rollback',
    ],
    icon: 'shield',
  },
  {
    slug: 'product-design',
    name: 'Product Design',
    shortName: 'Product Design',
    headline: 'Design that survives the build.',
    description:
      'Research, UX/UI and design systems, designed by a team that also ships the code.',
    outcome: 'A product users understand without a demo call.',
    deliverables: 'Flows, UI, design system, prototype, build-ready specs or working frontend.',
    tags: [
      'UX/UI design',
      'SaaS & dashboard design',
      'Mobile UI',
      'AI product UX',
      'Design systems',
      'UX audits',
    ],
    icon: 'dashboard',
  },
  {
    slug: 'product-engineering',
    name: 'Product Engineering',
    shortName: 'Web & SaaS',
    headline: 'Products, not prototypes.',
    description:
      'Web apps, SaaS platforms, marketplaces and mobile apps on one backend and one design system.',
    outcome: 'A product that takes payments, handles roles and scales past launch day.',
    deliverables: 'Production app, CI/CD, tests on revenue paths, monitoring, documentation.',
    tags: [
      'Next.js',
      'Flutter',
      'React Native',
      'Node',
      'Python',
      'Postgres',
      'Supabase',
      'MongoDB',
      'Stripe',
      'AWS',
      'Google Cloud',
      'Vercel',
    ],
    icon: 'dashboard',
  },
  {
    slug: 'ai-llm',
    name: 'AI Systems',
    shortName: 'AI Systems',
    headline: 'AI inside the product.',
    description:
      'RAG, copilots, chatbots and agents with evaluation sets, human approval, cost limits and tracing.',
    outcome: 'AI that users trust, at a cost finance can predict.',
    deliverables: 'Shipped AI feature or agent, evaluation set, monitoring and tracing, cost report.',
    tags: [
      'AI integration',
      'RAG',
      'Agents',
      'Chatbots',
      'Automations',
      'Evals',
      'OpenAI',
      'Anthropic',
      'Gemini',
      'Vertex AI',
    ],
    icon: 'chart',
  },
  {
    slug: 'mobile-apps',
    name: 'Mobile Apps',
    shortName: 'Mobile',
    headline: 'One product. Every screen.',
    description:
      'iOS and Android apps in Flutter or React Native, sharing one backend and design system with your web product.',
    outcome: 'Built for the store, not the demo.',
    deliverables: 'Production mobile app, store submission, shared backend.',
    tags: [
      'Flutter',
      'React Native',
      'iOS',
      'Android',
      'App Store',
      'Google Play',
    ],
    icon: 'phone',
  },
]

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return services.find((s) => s.slug === slug)
}

export const engagements = [
  {
    name: 'Production Audit',
    forWhom: 'AI-built, stalled or legacy products',
    shape: 'Fixed fee, written verdict',
    youGet: 'A risk-ranked audit and a fixed plan',
    price: '$500',
  },
  {
    name: 'Product Build',
    forWhom: 'New MVPs, SaaS, marketplaces, mobile',
    shape: 'Production Brief → milestones',
    youGet: 'A shipped product',
    price: '$8,000',
  },
  {
    name: 'Studio Retainer',
    forWhom: 'Teams that need ongoing senior capacity',
    shape: 'Monthly',
    youGet: 'Weekly shipped increments',
    price: '$5,000 / mo',
  },
  {
    name: 'Partners',
    forWhom: 'Agencies (white-label)',
    shape: 'Per project or retainer',
    youGet: 'Shipped work under your brand',
    price: 'On request',
  },
]

export const specialServices = [
  {
    title: 'Production audit',
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
    title: 'RAG & embeddings',
    description:
      'Retrieval over your own data for chatbots and assistants, as in Othego.',
    icon: 'bot',
  },
  {
    title: 'Evals & test sets',
    description:
      'Evaluation sets from real cases so AI quality is measured, not guessed.',
    icon: 'flask',
  },
  {
    title: 'Monitoring',
    description:
      'Alerts and dashboards in production so you know before users complain.',
    icon: 'bell',
  },
]

export const techStack = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind',
  'Vue',
  'Node',
  'Express',
  'Python',
  'Postgres',
  'Supabase',
  'Firebase',
  'MongoDB',
  'Redis',
  'Stripe',
  'AWS',
  'Google Cloud Run',
  'Vercel',
  'Docker',
  'Flutter',
  'React Native',
  'OpenAI',
  'Anthropic',
  'Gemini',
  'Vertex AI',
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
  'Flutter apps',
  'React Native apps',
  'Data pipelines',
  'Monitoring',
  'CI/CD',
]
