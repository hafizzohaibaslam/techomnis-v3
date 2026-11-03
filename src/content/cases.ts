export interface CaseStudy {
  id: string
  name: string
  description: string
  tags: string[]
  image: string
  metric: string
  metricLabel: string
}

export interface FeaturedCase {
  id: string
  name: string
  subtitle: string
  description: string
  tags: string[]
  image: string
  metrics: {
    label: string
    value: string
  }[]
}

export const featuredCase: FeaturedCase = {
  id: 'finvera',
  name: 'Finvera',
  subtitle: 'FinTech Platform',
  description: 'AI-powered financial management platform with smart analytics.',
  tags: ['FinTech', 'AI', 'Analytics'],
  image: '/finvera.jpg',
  metrics: [
    { label: 'User Growth', value: '340%' },
    { label: 'Processing Time', value: '-65%' },
  ],
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'kitahub',
    name: 'Kitahub',
    description: 'E-commerce platform with seamless checkout experience.',
    tags: ['E-commerce', 'UX Design'],
    image: '/kitahub-website.jpg',
    metric: '2.5x',
    metricLabel: 'Conversion rate increase',
  },
  {
    id: 'leaf-ai',
    name: 'Leaf AI',
    description: 'AI-powered agricultural insights platform.',
    tags: ['AI', 'AgriTech'],
    image: '/LeafAi-Web.jpg',
    metric: '89%',
    metricLabel: 'Prediction accuracy',
  },
  {
    id: 'babobot',
    name: 'Babobot',
    description: 'Intelligent chatbot solution for customer support.',
    tags: ['AI', 'Chatbot', 'SaaS'],
    image: '/Babobot.jpg',
    metric: '70%',
    metricLabel: 'Support ticket reduction',
  },
]

export const additionalCases: CaseStudy[] = [
  {
    id: 'agerlink',
    name: 'Agerlink',
    description: 'Healthcare connectivity platform.',
    tags: ['Healthcare', 'Platform'],
    image: '/Agerlink 1.jpg',
    metric: '45%',
    metricLabel: 'Efficiency improvement',
  },
  {
    id: 'atusglobal',
    name: 'AtusGlobal',
    description: 'Global logistics management system.',
    tags: ['Logistics', 'Enterprise'],
    image: '/AtusGlobal.jpg',
    metric: '3x',
    metricLabel: 'Faster deliveries',
  },
  {
    id: 'bell-hopt',
    name: 'Bell Hopt',
    description: 'Healthcare appointment management.',
    tags: ['Healthcare', 'Booking'],
    image: '/Bell Hopt- Web.jpg',
    metric: '60%',
    metricLabel: 'No-show reduction',
  },
  {
    id: 'lms',
    name: 'LMS Platform',
    description: 'Learning management system for enterprises.',
    tags: ['EdTech', 'Enterprise'],
    image: '/LMS-Web.jpg',
    metric: '85%',
    metricLabel: 'Course completion rate',
  },
  {
    id: 'ritual',
    name: 'Ritual',
    description: 'Wellness and habit tracking application.',
    tags: ['Wellness', 'Mobile'],
    image: '/Ritual- Web.jpg',
    metric: '4.8',
    metricLabel: 'App Store rating',
  },
  {
    id: 'icard',
    name: 'iCard',
    description: 'Digital business card solution.',
    tags: ['Networking', 'Mobile'],
    image: '/icard 1.jpg',
    metric: '50K+',
    metricLabel: 'Active users',
  },
]

export const totalCaseStudies = 21
