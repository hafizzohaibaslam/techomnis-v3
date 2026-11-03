export interface CompanyStat {
  value: string
  label: string
  description?: string
}

export interface CompanyValue {
  title: string
  description: string
}

export interface ProcessStep {
  number: string
  title: string
  description: string
  details: string[]
}

export const companyStats: CompanyStat[] = [
  {
    value: '21',
    label: 'Case Studies',
    description: 'Delivered projects across industries',
  },
  {
    value: '12+',
    label: 'Industries',
    description: 'From FinTech to Healthcare',
  },
  {
    value: '$2B+',
    label: 'Client Impact',
    description: 'Value created for our clients',
  },
  {
    value: '5.0',
    label: 'Upwork Rating',
    description: 'From 68 reviews, Top Rated Plus',
  },
  {
    value: '$300K+',
    label: 'Earned',
    description: 'On Upwork platform',
  },
]

export const companyValues: CompanyValue[] = [
  {
    title: 'Ship, Don\'t Slip',
    description: 'We deliver on time, every time. No excuses, no surprises. Our track record speaks for itself.',
  },
  {
    title: 'Think Like Owners',
    description: 'We treat every project as if it were our own. We care about outcomes, not just outputs.',
  },
  {
    title: 'Quality Over Quantity',
    description: 'We\'d rather do fewer things exceptionally well than many things poorly.',
  },
  {
    title: 'Transparent Always',
    description: 'Clear communication, honest estimates, and no hidden surprises. You always know where things stand.',
  },
  {
    title: 'End-to-End Thinking',
    description: 'We consider the whole system - UI, API, data, infra - because everything affects everything.',
  },
  {
    title: 'Continuous Learning',
    description: 'Technology evolves fast. We stay current so your products don\'t become outdated.',
  },
]

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We start by understanding your business, users, and goals. This forms the foundation for everything that follows.',
    details: [
      'Stakeholder interviews',
      'Requirements gathering',
      'Technical assessment',
      'Competitive analysis',
      'User research (if needed)',
    ],
  },
  {
    number: '02',
    title: 'Strategy & Planning',
    description: 'We create a detailed roadmap with clear milestones, timelines, and deliverables.',
    details: [
      'Technical architecture',
      'Project timeline',
      'Resource planning',
      'Risk assessment',
      'Success metrics',
    ],
  },
  {
    number: '03',
    title: 'Design & Prototype',
    description: 'For new products, we design the user experience before writing code.',
    details: [
      'Wireframes',
      'UI design',
      'Interactive prototypes',
      'Design system',
      'User testing',
    ],
  },
  {
    number: '04',
    title: 'Development',
    description: 'Agile sprints with continuous delivery. You see progress every week.',
    details: [
      '2-week sprints',
      'Daily standups',
      'Code reviews',
      'Automated testing',
      'Continuous deployment',
    ],
  },
  {
    number: '05',
    title: 'Launch',
    description: 'We handle production deployment, monitoring setup, and launch support.',
    details: [
      'Production deployment',
      'Performance testing',
      'Security review',
      'Monitoring setup',
      'Launch support',
    ],
  },
  {
    number: '06',
    title: 'Scale & Iterate',
    description: 'Post-launch, we help you iterate based on user feedback and scale as you grow.',
    details: [
      'Analytics review',
      'Performance optimization',
      'Feature iterations',
      'Scaling support',
      'Ongoing maintenance',
    ],
  },
]

export const companyStory = {
  headline: 'Engineering Excellence, Delivered',
  intro: 'TechOmnis is a product engineering studio founded in 2024. We help startups and scale-ups build exceptional digital products.',
  story: [
    'We started TechOmnis after years of building products at startups and agencies. We saw too many projects fail - not because of bad ideas, but because of poor execution, miscommunication, and technical debt.',
    'Our mission is simple: deliver high-quality engineering with clear communication and reliable timelines. No scope creep, no disappearing acts, no surprises.',
    'Today, we work with clients across 12+ industries, from early-stage startups to established companies. Our Top Rated Plus status on Upwork with a perfect 5.0 rating reflects our commitment to excellence.',
  ],
  founder: {
    name: 'Zohaib Aslam',
    role: 'Founder',
    image: '/zohaib-a-image.png',
    bio: 'Full-stack engineer with a passion for building products that matter. Before founding TechOmnis, Zohaib worked at multiple startups and delivered 60+ projects across various industries.',
    linkedin: 'https://linkedin.com/in/zohaib-aslam',
    upwork: 'https://www.upwork.com/freelancers/~01d4a8b7c5e6f7a8b9',
  },
}

export const clients = [
  { name: 'Finvera', industry: 'FinTech' },
  { name: 'Kitahub', industry: 'E-commerce' },
  { name: 'Leaf AI', industry: 'AgriTech' },
  { name: 'Babobot', industry: 'SaaS' },
  { name: 'Agerlink', industry: 'Healthcare' },
  { name: 'Edulog', industry: 'EdTech' },
  { name: 'Bell Hopt', industry: 'Healthcare' },
  { name: 'AtusGlobal', industry: 'Logistics' },
  { name: 'iCard', industry: 'Networking' },
]

export const industries = [
  'FinTech',
  'E-commerce', 
  'AI & ML',
  'Healthcare',
  'EdTech',
  'SaaS',
  'AgriTech',
  'Logistics',
  'Aviation',
  'Food & Beverage',
  'Wellness',
  'Media',
]
