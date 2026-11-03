export interface ServiceFeature {
  title: string
  description: string
}

export interface ServiceProcess {
  step: number
  title: string
  description: string
}

export interface Service {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  icon: 'rocket' | 'code' | 'brain' | 'mobile' | 'rescue' | 'design'
  features: ServiceFeature[]
  process: ServiceProcess[]
  stack: string[]
  relatedCases: string[]
}

export const services: Service[] = [
  {
    id: 'product-engineering',
    slug: 'product-engineering',
    name: 'Product Engineering',
    tagline: 'End-to-end product development',
    description: 'From concept to launch, we build scalable products that users love. Our full-stack teams handle architecture, development, deployment, and ongoing optimization.',
    icon: 'rocket',
    features: [
      {
        title: 'Technical Architecture',
        description: 'Scalable system design that grows with your business',
      },
      {
        title: 'Full-Stack Development',
        description: 'Frontend, backend, APIs, and infrastructure',
      },
      {
        title: 'DevOps & CI/CD',
        description: 'Automated pipelines for reliable deployments',
      },
      {
        title: 'Performance Optimization',
        description: 'Fast, efficient applications that scale',
      },
      {
        title: 'Code Reviews & QA',
        description: 'Rigorous testing and quality assurance',
      },
      {
        title: 'Documentation',
        description: 'Comprehensive technical documentation',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Discovery',
        description: 'We dive deep into your requirements, user needs, and business goals.',
      },
      {
        step: 2,
        title: 'Architecture',
        description: 'Design scalable system architecture and technical roadmap.',
      },
      {
        step: 3,
        title: 'Development',
        description: 'Agile sprints with continuous delivery and feedback loops.',
      },
      {
        step: 4,
        title: 'Launch & Scale',
        description: 'Production deployment with monitoring and optimization.',
      },
    ],
    stack: ['Next.js', 'React', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Vercel'],
    relatedCases: ['finvera', 'kitahub', 'agerlink'],
  },
  {
    id: 'ai-llm',
    slug: 'ai-llm',
    name: 'AI & LLM',
    tagline: 'Intelligent solutions powered by AI',
    description: 'We build AI-powered features and products using the latest in machine learning and large language models. From chatbots to predictive analytics.',
    icon: 'brain',
    features: [
      {
        title: 'Custom AI Models',
        description: 'Fine-tuned models for your specific use case',
      },
      {
        title: 'RAG Applications',
        description: 'Knowledge-augmented AI with your data',
      },
      {
        title: 'Conversational AI',
        description: 'Intelligent chatbots and virtual assistants',
      },
      {
        title: 'Predictive Analytics',
        description: 'Data-driven insights and forecasting',
      },
      {
        title: 'Computer Vision',
        description: 'Image and video analysis solutions',
      },
      {
        title: 'AI Integration',
        description: 'Seamlessly add AI to existing systems',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Data Assessment',
        description: 'Evaluate data quality, availability, and requirements.',
      },
      {
        step: 2,
        title: 'Model Selection',
        description: 'Choose the right approach: fine-tuning, RAG, or custom training.',
      },
      {
        step: 3,
        title: 'Development',
        description: 'Build, train, and validate AI components.',
      },
      {
        step: 4,
        title: 'Deployment',
        description: 'Production deployment with monitoring and iteration.',
      },
    ],
    stack: ['OpenAI', 'Python', 'LangChain', 'Pinecone', 'TensorFlow', 'PyTorch', 'Hugging Face'],
    relatedCases: ['babobot', 'leaf-ai', 'othego'],
  },
  {
    id: 'web-development',
    slug: 'web-development',
    name: 'Web Development',
    tagline: 'Modern web applications',
    description: 'Fast, responsive web applications built with modern frameworks. From marketing sites to complex web apps, we deliver pixel-perfect results.',
    icon: 'code',
    features: [
      {
        title: 'React & Next.js',
        description: 'Server-rendered React applications',
      },
      {
        title: 'E-commerce',
        description: 'Shopify, headless commerce, custom stores',
      },
      {
        title: 'Web Apps',
        description: 'Complex interactive applications',
      },
      {
        title: 'Marketing Sites',
        description: 'High-converting landing pages',
      },
      {
        title: 'CMS Integration',
        description: 'Content management with Sanity, Contentful',
      },
      {
        title: 'Performance',
        description: 'Core Web Vitals optimization',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Design Review',
        description: 'Analyze designs and plan technical implementation.',
      },
      {
        step: 2,
        title: 'Setup',
        description: 'Configure project, CI/CD, and development environment.',
      },
      {
        step: 3,
        title: 'Build',
        description: 'Component development with responsive design.',
      },
      {
        step: 4,
        title: 'Launch',
        description: 'Deploy, test, and optimize for production.',
      },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Shopify'],
    relatedCases: ['kitahub', 'lms', 'webbting'],
  },
  {
    id: 'mobile-development',
    slug: 'mobile-development',
    name: 'Mobile Development',
    tagline: 'Native & cross-platform apps',
    description: 'Beautiful, performant mobile apps for iOS and Android. We use React Native for efficient cross-platform development without sacrificing quality.',
    icon: 'mobile',
    features: [
      {
        title: 'React Native',
        description: 'Cross-platform apps from a single codebase',
      },
      {
        title: 'Native Modules',
        description: 'Platform-specific features when needed',
      },
      {
        title: 'App Store Optimization',
        description: 'Guidance for store submissions',
      },
      {
        title: 'Push Notifications',
        description: 'Engaging user communication',
      },
      {
        title: 'Offline Support',
        description: 'Apps that work without connectivity',
      },
      {
        title: 'Analytics',
        description: 'User behavior tracking and insights',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Platform Strategy',
        description: 'Decide iOS, Android, or both; native vs cross-platform.',
      },
      {
        step: 2,
        title: 'UI/UX Adaptation',
        description: 'Optimize designs for mobile platforms.',
      },
      {
        step: 3,
        title: 'Development',
        description: 'Build with testing on real devices.',
      },
      {
        step: 4,
        title: 'Store Launch',
        description: 'App Store and Play Store submission.',
      },
    ],
    stack: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'RevenueCat'],
    relatedCases: ['icard', 'deli', 'ritual'],
  },
  {
    id: 'mvp-rescue',
    slug: 'mvp-rescue',
    name: 'MVP Rescue',
    tagline: 'Fix and scale struggling products',
    description: 'Inherited a codebase that\'s holding you back? We specialize in rescuing MVPs - refactoring, stabilizing, and preparing them for scale.',
    icon: 'rescue',
    features: [
      {
        title: 'Code Audit',
        description: 'Thorough assessment of existing codebase',
      },
      {
        title: 'Technical Debt',
        description: 'Strategic reduction of accumulated debt',
      },
      {
        title: 'Refactoring',
        description: 'Restructure code for maintainability',
      },
      {
        title: 'Performance Fixes',
        description: 'Resolve bottlenecks and improve speed',
      },
      {
        title: 'Security Hardening',
        description: 'Fix vulnerabilities and improve security',
      },
      {
        title: 'Documentation',
        description: 'Document systems for future teams',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Audit',
        description: 'Comprehensive code and infrastructure review.',
      },
      {
        step: 2,
        title: 'Prioritize',
        description: 'Identify critical issues and quick wins.',
      },
      {
        step: 3,
        title: 'Stabilize',
        description: 'Fix critical bugs and security issues.',
      },
      {
        step: 4,
        title: 'Improve',
        description: 'Refactor and optimize for the future.',
      },
    ],
    stack: ['Depends on existing stack', 'Code analysis tools', 'Testing frameworks'],
    relatedCases: ['edulog'],
  },
  {
    id: 'ui-ux-design',
    slug: 'ui-ux-design',
    name: 'UI/UX Design',
    tagline: 'User-centered design',
    description: 'Beautiful, intuitive interfaces designed with your users in mind. From research to high-fidelity prototypes, we create experiences that convert.',
    icon: 'design',
    features: [
      {
        title: 'User Research',
        description: 'Understand user needs and behaviors',
      },
      {
        title: 'Wireframing',
        description: 'Low-fidelity prototypes for validation',
      },
      {
        title: 'Visual Design',
        description: 'High-fidelity UI with design systems',
      },
      {
        title: 'Prototyping',
        description: 'Interactive prototypes for testing',
      },
      {
        title: 'Design Systems',
        description: 'Scalable component libraries',
      },
      {
        title: 'Usability Testing',
        description: 'Validate designs with real users',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Research',
        description: 'User interviews, competitor analysis, and requirements.',
      },
      {
        step: 2,
        title: 'Wireframe',
        description: 'Information architecture and low-fi mockups.',
      },
      {
        step: 3,
        title: 'Design',
        description: 'High-fidelity designs with design system.',
      },
      {
        step: 4,
        title: 'Handoff',
        description: 'Developer-ready specs and assets.',
      },
    ],
    stack: ['Figma', 'Framer', 'Principle', 'Maze', 'Hotjar'],
    relatedCases: ['kitahub', 'finvera', 'icard'],
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export const serviceHighlights = [
  {
    title: 'MVP Rescue',
    description: 'Inherited a stalled build? We stabilise and ship v1.',
    icon: 'rescue' as const,
  },
  {
    title: 'Product Engineering',
    description: 'Full-stack dev from 0→1 and beyond.',
    icon: 'rocket' as const,
  },
  {
    title: 'AI & LLM',
    description: 'Custom RAG, agents, fine-tunes that actually work.',
    icon: 'brain' as const,
  },
]
