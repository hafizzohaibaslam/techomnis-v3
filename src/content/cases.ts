export interface CaseStudyMeta {
  client: string
  industry: string
  services: string[]
  stack: string[]
  timeline: string
  year: string
}

export interface CaseStudySection {
  title: string
  content: string
}

export interface CaseStudyMetric {
  value: string
  label: string
  isPlaceholder?: boolean
}

export interface CaseStudy {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  tags: string[]
  image: string
  heroImage?: string
  gallery?: string[]
  meta: CaseStudyMeta
  challenge?: CaseStudySection
  approach?: CaseStudySection
  solution?: CaseStudySection
  results: CaseStudyMetric[]
  testimonial?: {
    quote: string
    author: string
    role: string
    isPlaceholder?: boolean
  }
  isFeatured?: boolean
  isPlaceholder?: boolean
}

export const industries = [
  'All',
  'FinTech',
  'E-commerce',
  'AI & Machine Learning',
  'Healthcare',
  'EdTech',
  'SaaS',
  'AgriTech',
  'Logistics',
  'Networking',
  'Wellness',
  'Aviation',
  'Food & Beverage',
] as const

export const serviceFilters = [
  'All',
  'Product Engineering',
  'AI & LLM',
  'Web Development',
  'Mobile Development',
  'MVP Rescue',
  'UI/UX Design',
] as const

export const caseStudies: CaseStudy[] = [
  {
    id: 'finvera',
    slug: 'finvera',
    name: 'Finvera',
    tagline: 'AI-Powered Financial Management',
    description: 'AI-powered financial management platform with smart analytics and automated insights for modern businesses.',
    tags: ['FinTech', 'AI', 'Analytics', 'SaaS'],
    image: '/finvera.jpg',
    heroImage: '/finvera.jpg',
    meta: {
      client: 'Finvera Inc.',
      industry: 'FinTech',
      services: ['Product Engineering', 'AI & LLM', 'UI/UX Design'],
      stack: ['Next.js', 'Python', 'OpenAI', 'PostgreSQL', 'AWS'],
      timeline: '6 months',
      year: '2024',
    },
    challenge: {
      title: 'The Challenge',
      content: 'Finvera needed a comprehensive financial platform that could process complex financial data in real-time while providing actionable AI-powered insights to their users.',
    },
    approach: {
      title: 'Our Approach',
      content: 'We designed a modular architecture with a focus on real-time data processing, implementing AI models for predictive analytics and automated reporting.',
    },
    solution: {
      title: 'The Solution',
      content: 'A full-stack platform with intelligent dashboards, automated financial insights, and seamless integrations with major financial institutions.',
    },
    results: [
      { value: '340%', label: 'User growth in first quarter' },
      { value: '-65%', label: 'Processing time reduction' },
      { value: '99.9%', label: 'Uptime achieved' },
    ],
    isFeatured: true,
  },
  {
    id: 'kitahub',
    slug: 'kitahub',
    name: 'Kitahub',
    tagline: 'Modern E-commerce Experience',
    description: 'E-commerce platform with seamless checkout experience and intelligent product recommendations.',
    tags: ['E-commerce', 'UX Design', 'Web Development'],
    image: '/kitahub-website.jpg',
    heroImage: '/Kitahub/kitahub-dribble.jpg',
    gallery: ['/kitahub-website.jpg', '/Kitahub/kitahub-dribble.jpg'],
    meta: {
      client: 'Kitahub',
      industry: 'E-commerce',
      services: ['Product Engineering', 'UI/UX Design', 'Web Development'],
      stack: ['Next.js', 'Shopify', 'Tailwind CSS', 'Vercel'],
      timeline: '4 months',
      year: '2024',
    },
    challenge: {
      title: 'The Challenge',
      content: 'Kitahub wanted to modernize their e-commerce experience with a focus on mobile-first design and streamlined checkout process.',
    },
    approach: {
      title: 'Our Approach',
      content: 'We conducted extensive user research and implemented a headless commerce architecture for maximum flexibility and performance.',
    },
    solution: {
      title: 'The Solution',
      content: 'A blazing-fast, mobile-optimized storefront with one-click checkout and personalized product recommendations.',
    },
    results: [
      { value: '2.5x', label: 'Conversion rate increase' },
      { value: '40%', label: 'Faster page loads' },
      { value: '60%', label: 'Mobile sales increase' },
    ],
  },
  {
    id: 'leaf-ai',
    slug: 'leaf-ai',
    name: 'Leaf AI',
    tagline: 'Agricultural Intelligence Platform',
    description: 'AI-powered agricultural insights platform for precision farming and crop optimization.',
    tags: ['AI', 'AgriTech', 'Machine Learning'],
    image: '/LeafAi-Web.jpg',
    heroImage: '/Leaf ai/Leaf ai-dribble.jpg',
    gallery: ['/LeafAi-Web.jpg', '/Leaf ai-website.jpg', '/Leaf ai/Leaf ai-dribble.jpg'],
    meta: {
      client: 'Leaf AI',
      industry: 'AgriTech',
      services: ['AI & LLM', 'Product Engineering', 'Mobile Development'],
      stack: ['Python', 'TensorFlow', 'React Native', 'AWS', 'IoT'],
      timeline: '8 months',
      year: '2024',
    },
    challenge: {
      title: 'The Challenge',
      content: 'Agricultural businesses needed accurate, real-time predictions for crop health and yield optimization based on multiple environmental factors.',
    },
    approach: {
      title: 'Our Approach',
      content: 'We developed custom machine learning models trained on satellite imagery and IoT sensor data to provide actionable agricultural insights.',
    },
    solution: {
      title: 'The Solution',
      content: 'An end-to-end platform with mobile app for field workers, dashboard for farm managers, and API integrations for existing agricultural systems.',
    },
    results: [
      { value: '89%', label: 'Prediction accuracy' },
      { value: '35%', label: 'Yield improvement' },
      { value: '50K+', label: 'Acres monitored' },
    ],
  },
  {
    id: 'babobot',
    slug: 'babobot',
    name: 'Babobot',
    tagline: 'Intelligent Customer Support',
    description: 'Intelligent chatbot solution for customer support with natural language understanding.',
    tags: ['AI', 'Chatbot', 'SaaS', 'NLP'],
    image: '/Babobot.jpg',
    heroImage: '/Babobot v2.jpg',
    gallery: ['/Babobot.jpg', '/Babobot v2.jpg'],
    meta: {
      client: 'Babobot',
      industry: 'SaaS',
      services: ['AI & LLM', 'Product Engineering'],
      stack: ['Node.js', 'OpenAI', 'React', 'MongoDB', 'Redis'],
      timeline: '5 months',
      year: '2024',
    },
    challenge: {
      title: 'The Challenge',
      content: 'Businesses needed an intelligent chatbot that could handle complex customer queries while maintaining natural conversation flow.',
    },
    approach: {
      title: 'Our Approach',
      content: 'We built a multi-turn conversation system using large language models with custom fine-tuning for specific business contexts.',
    },
    solution: {
      title: 'The Solution',
      content: 'A white-label chatbot platform with easy integration, custom training capabilities, and comprehensive analytics dashboard.',
    },
    results: [
      { value: '70%', label: 'Support ticket reduction' },
      { value: '24/7', label: 'Availability' },
      { value: '4.8', label: 'Customer satisfaction score' },
    ],
  },
  {
    id: 'agerlink',
    slug: 'agerlink',
    name: 'Agerlink',
    tagline: 'Healthcare Connectivity',
    description: 'Healthcare connectivity platform bridging patients with providers.',
    tags: ['Healthcare', 'Platform', 'Telemedicine'],
    image: '/Agerlink 1.jpg',
    heroImage: '/Agerlink 2.jpg',
    gallery: ['/Agerlink 1.jpg', '/Agerlink 2.jpg'],
    meta: {
      client: 'Agerlink Health',
      industry: 'Healthcare',
      services: ['Product Engineering', 'Web Development', 'Mobile Development'],
      stack: ['React', 'Node.js', 'PostgreSQL', 'WebRTC', 'HIPAA Compliant'],
      timeline: '7 months',
      year: '2024',
    },
    challenge: {
      title: 'The Challenge',
      content: 'Healthcare providers needed a secure, HIPAA-compliant platform for telemedicine and patient communication.',
    },
    approach: {
      title: 'Our Approach',
      content: 'We implemented end-to-end encryption, secure video conferencing, and seamless EHR integrations while maintaining ease of use.',
    },
    solution: {
      title: 'The Solution',
      content: 'A comprehensive telehealth platform with video consultations, secure messaging, prescription management, and appointment scheduling.',
    },
    results: [
      { value: '45%', label: 'Efficiency improvement' },
      { value: '10K+', label: 'Patient consultations' },
      { value: '99.5%', label: 'Uptime SLA met' },
    ],
  },
  {
    id: 'lms',
    slug: 'lms',
    name: 'LMS Platform',
    tagline: 'Enterprise Learning System',
    description: 'Learning management system for enterprises with progress tracking and certifications.',
    tags: ['EdTech', 'Enterprise', 'SaaS'],
    image: '/LMS-Web.jpg',
    meta: {
      client: 'Enterprise Client',
      industry: 'EdTech',
      services: ['Product Engineering', 'Web Development'],
      stack: ['Next.js', 'Node.js', 'PostgreSQL', 'AWS S3', 'Stripe'],
      timeline: '6 months',
      year: '2024',
    },
    challenge: {
      title: 'The Challenge',
      content: 'Large organizations needed a scalable learning platform that could handle thousands of concurrent users while providing detailed analytics.',
    },
    approach: {
      title: 'Our Approach',
      content: 'We built a microservices architecture with real-time progress tracking and gamification elements to boost engagement.',
    },
    solution: {
      title: 'The Solution',
      content: 'A full-featured LMS with course creation tools, progress tracking, certifications, and integration with HR systems.',
    },
    results: [
      { value: '85%', label: 'Course completion rate' },
      { value: '3x', label: 'Engagement increase' },
      { value: '50K+', label: 'Active learners' },
    ],
  },
  {
    id: 'icard',
    slug: 'icard',
    name: 'iCard',
    tagline: 'Digital Business Cards',
    description: 'Digital business card solution for modern networking.',
    tags: ['Networking', 'Mobile', 'SaaS'],
    image: '/icard 1.jpg',
    heroImage: '/icard 2.jpg',
    gallery: ['/icard 1.jpg', '/icard 2.jpg'],
    meta: {
      client: 'iCard',
      industry: 'Networking',
      services: ['Mobile Development', 'Product Engineering'],
      stack: ['React Native', 'Node.js', 'MongoDB', 'NFC', 'QR Code'],
      timeline: '4 months',
      year: '2024',
    },
    challenge: {
      title: 'The Challenge',
      content: 'Professionals needed a modern alternative to paper business cards with instant sharing and contact management.',
    },
    approach: {
      title: 'Our Approach',
      content: 'We designed a mobile-first experience with NFC and QR code sharing, plus seamless CRM integrations.',
    },
    solution: {
      title: 'The Solution',
      content: 'A sleek mobile app with customizable digital cards, NFC sharing, analytics, and lead management features.',
    },
    results: [
      { value: '50K+', label: 'Active users' },
      { value: '1M+', label: 'Cards shared' },
      { value: '4.8', label: 'App Store rating' },
    ],
  },
  {
    id: 'bell-hopt',
    slug: 'bell-hopt',
    name: 'Bell Hopt',
    tagline: 'Healthcare Appointments',
    description: 'Healthcare appointment management system reducing no-shows.',
    tags: ['Healthcare', 'Booking', 'SaaS'],
    image: '/Bell Hopt- Web.jpg',
    meta: {
      client: 'Bell Hopt Healthcare',
      industry: 'Healthcare',
      services: ['Product Engineering', 'Web Development'],
      stack: ['React', 'Node.js', 'PostgreSQL', 'Twilio', 'Calendar APIs'],
      timeline: '5 months',
      year: '2024',
    },
    challenge: {
      title: 'The Challenge',
      content: 'Healthcare facilities faced high no-show rates and inefficient appointment scheduling processes.',
    },
    approach: {
      title: 'Our Approach',
      content: 'We implemented smart scheduling with automated reminders, waitlist management, and predictive analytics.',
    },
    solution: {
      title: 'The Solution',
      content: 'An intelligent appointment system with SMS/email reminders, patient self-scheduling, and EHR integration.',
    },
    results: [
      { value: '60%', label: 'No-show reduction' },
      { value: '2hrs', label: 'Staff time saved daily' },
      { value: '95%', label: 'Patient satisfaction' },
    ],
  },
  {
    id: 'aviation',
    slug: 'aviation',
    name: 'Aviation Platform',
    tagline: 'Flight Operations Management',
    description: 'Comprehensive flight operations and crew management platform.',
    tags: ['Aviation', 'Enterprise', 'Operations'],
    image: '/Aviation(1).jpg',
    meta: {
      client: 'Aviation Client',
      industry: 'Aviation',
      services: ['Product Engineering', 'Web Development'],
      stack: ['React', 'Node.js', 'PostgreSQL', 'Real-time APIs'],
      timeline: '8 months',
      year: '2024',
    },
    challenge: {
      title: 'The Challenge',
      content: 'Aviation companies needed a unified platform for managing flight schedules, crew assignments, and operational logistics.',
    },
    approach: {
      title: 'Our Approach',
      content: 'We built a real-time system with complex scheduling algorithms and compliance tracking features.',
    },
    solution: {
      title: 'The Solution',
      content: 'A comprehensive operations platform with crew scheduling, flight tracking, compliance management, and reporting.',
    },
    results: [
      { value: '30%', label: 'Operational efficiency gain', isPlaceholder: true },
      { value: '100%', label: 'Compliance rate', isPlaceholder: true },
      { value: '500+', label: 'Flights managed monthly', isPlaceholder: true },
    ],
    isPlaceholder: true,
  },
  {
    id: 'atusglobal',
    slug: 'atusglobal',
    name: 'AtusGlobal',
    tagline: 'Global Logistics Solutions',
    description: 'Global logistics management system with real-time tracking.',
    tags: ['Logistics', 'Enterprise', 'Supply Chain'],
    image: '/AtusGlobal.jpg',
    meta: {
      client: 'AtusGlobal',
      industry: 'Logistics',
      services: ['Product Engineering', 'Web Development'],
      stack: ['React', 'Node.js', 'PostgreSQL', 'Maps API', 'IoT'],
      timeline: '6 months',
      year: '2024',
    },
    challenge: {
      title: 'The Challenge',
      content: 'Global logistics operations needed better visibility and coordination across multiple regions and carriers.',
    },
    approach: {
      title: 'Our Approach',
      content: 'We implemented real-time tracking, automated carrier selection, and predictive delivery estimates.',
    },
    solution: {
      title: 'The Solution',
      content: 'A unified logistics platform with shipment tracking, carrier management, and analytics dashboard.',
    },
    results: [
      { value: '3x', label: 'Faster deliveries' },
      { value: '25%', label: 'Cost reduction', isPlaceholder: true },
      { value: '99%', label: 'Tracking accuracy', isPlaceholder: true },
    ],
  },
  {
    id: 'deli',
    slug: 'deli',
    name: 'Deli',
    tagline: 'Food Delivery Excellence',
    description: 'Modern food delivery platform with real-time order tracking.',
    tags: ['Food & Beverage', 'Mobile', 'Marketplace'],
    image: '/Deli Cover- Web.jpg',
    heroImage: '/Deli Cover- Web copy.jpg',
    gallery: ['/Deli Cover- Web.jpg', '/Deli Cover- Web copy.jpg'],
    meta: {
      client: 'Deli',
      industry: 'Food & Beverage',
      services: ['Product Engineering', 'Mobile Development'],
      stack: ['React Native', 'Node.js', 'PostgreSQL', 'Maps API', 'Stripe'],
      timeline: '5 months',
      year: '2024',
    },
    challenge: {
      title: 'The Challenge',
      content: 'The food delivery market needed a platform that could handle high-volume orders while providing excellent user experience.',
    },
    approach: {
      title: 'Our Approach',
      content: 'We designed for scale from day one, with efficient order routing and real-time driver tracking.',
    },
    solution: {
      title: 'The Solution',
      content: 'A complete delivery ecosystem with customer app, driver app, restaurant dashboard, and admin panel.',
    },
    results: [
      { value: '15min', label: 'Average delivery time', isPlaceholder: true },
      { value: '10K+', label: 'Orders per month', isPlaceholder: true },
      { value: '4.7', label: 'App rating', isPlaceholder: true },
    ],
    isPlaceholder: true,
  },
  {
    id: 'othego',
    slug: 'othego',
    name: 'Othego',
    tagline: 'RAG Chatbot SaaS',
    description: 'Our own RAG chatbot SaaS with Stripe subscription tiers.',
    tags: ['AI · RAG', 'SaaS', 'Own Product'],
    image: '/wave.ai2.jpg',
    meta: {
      client: 'TechOmnis (Own Product)',
      industry: 'SaaS',
      services: ['Product Engineering', 'AI & LLM'],
      stack: ['Next.js', 'Python', 'OpenAI', 'Pinecone', 'Stripe'],
      timeline: 'Ongoing',
      year: '2024',
    },
    challenge: {
      title: 'The Challenge',
      content: 'We identified a market need for accessible RAG-powered chatbots that businesses could deploy without technical expertise.',
    },
    approach: {
      title: 'Our Approach',
      content: 'We built a no-code platform where users can upload documents and deploy custom AI chatbots in minutes.',
    },
    solution: {
      title: 'The Solution',
      content: 'A SaaS platform with document ingestion, custom chatbot training, embeddable widgets, and usage-based pricing.',
    },
    results: [
      { value: 'Beta', label: 'Current stage', isPlaceholder: true },
      { value: '100+', label: 'Beta users', isPlaceholder: true },
      { value: '95%', label: 'Query accuracy', isPlaceholder: true },
    ],
    isPlaceholder: true,
  },
  {
    id: 'waivs-ai',
    slug: 'waivs-ai',
    name: 'Waivs.ai',
    tagline: 'AI-Powered Platform',
    description: 'Advanced AI platform with custom model training capabilities.',
    tags: ['AI', 'Machine Learning', 'Platform'],
    image: '/wave.ai2.jpg',
    meta: {
      client: 'Waivs.ai',
      industry: 'AI & Machine Learning',
      services: ['AI & LLM', 'Product Engineering'],
      stack: ['Python', 'PyTorch', 'FastAPI', 'React', 'AWS'],
      timeline: 'TBC',
      year: '2024',
    },
    results: [
      { value: 'TBC', label: 'Metrics to be confirmed', isPlaceholder: true },
    ],
    isPlaceholder: true,
  },
  {
    id: 'archyr',
    slug: 'archyr',
    name: 'Archyr',
    tagline: 'Platform Solution',
    description: 'Details from The Playbook to be added.',
    tags: ['Platform', 'TBC'],
    image: '/thumbnail 1.jpg',
    meta: {
      client: 'Archyr',
      industry: 'TBC',
      services: ['Product Engineering'],
      stack: ['TBC'],
      timeline: 'TBC',
      year: '2024',
    },
    results: [
      { value: 'TBC', label: 'Summary from The Playbook', isPlaceholder: true },
    ],
    isPlaceholder: true,
  },
  {
    id: 'edulog',
    slug: 'edulog',
    name: 'Edulog Athena V2',
    tagline: 'EdTech Platform',
    description: 'Educational technology platform for Edulog.',
    tags: ['EdTech', 'Platform'],
    image: '/thumbnail 2.jpg',
    meta: {
      client: 'Edulog',
      industry: 'EdTech',
      services: ['Product Engineering', 'Web Development'],
      stack: ['React', 'Node.js', 'PostgreSQL'],
      timeline: 'TBC',
      year: '2024',
    },
    results: [
      { value: 'TBC', label: 'Outcome to be confirmed', isPlaceholder: true },
    ],
    isPlaceholder: true,
  },
  {
    id: 'ritual',
    slug: 'ritual',
    name: 'Ritual',
    tagline: 'Wellness & Habit Tracking',
    description: 'Wellness and habit tracking application for mindful living.',
    tags: ['Wellness', 'Mobile', 'Health'],
    image: '/Ritual- Web.jpg',
    meta: {
      client: 'Ritual',
      industry: 'Wellness',
      services: ['Mobile Development', 'Product Engineering'],
      stack: ['React Native', 'Node.js', 'MongoDB'],
      timeline: '4 months',
      year: '2024',
    },
    results: [
      { value: '4.8', label: 'App Store rating', isPlaceholder: true },
      { value: '25K+', label: 'Active users', isPlaceholder: true },
      { value: '80%', label: '30-day retention', isPlaceholder: true },
    ],
    isPlaceholder: true,
  },
  {
    id: 'webbting',
    slug: 'webbting',
    name: 'Webbting',
    tagline: 'Web Platform',
    description: 'Modern web platform solution.',
    tags: ['Web Development', 'Platform'],
    image: '/Webbting.jpg',
    meta: {
      client: 'Webbting',
      industry: 'SaaS',
      services: ['Web Development', 'Product Engineering'],
      stack: ['Next.js', 'Node.js', 'PostgreSQL'],
      timeline: 'TBC',
      year: '2024',
    },
    results: [
      { value: 'TBC', label: 'Metrics to be confirmed', isPlaceholder: true },
    ],
    isPlaceholder: true,
  },
  {
    id: 'storyheat',
    slug: 'storyheat',
    name: 'StoryHEAT',
    tagline: 'Media Platform',
    description: 'Ground Media content platform.',
    tags: ['Media', 'Content', 'Platform'],
    image: '/StoryHEAT — Ground Media-01.jpg',
    meta: {
      client: 'Ground Media',
      industry: 'Media',
      services: ['Product Engineering', 'Web Development'],
      stack: ['Next.js', 'Node.js', 'PostgreSQL', 'CDN'],
      timeline: 'TBC',
      year: '2024',
    },
    results: [
      { value: 'TBC', label: 'Metrics to be confirmed', isPlaceholder: true },
    ],
    isPlaceholder: true,
  },
  {
    id: 'reach',
    slug: 'reach',
    name: 'Reach',
    tagline: 'Communication Platform',
    description: 'Modern communication and outreach platform.',
    tags: ['Communication', 'SaaS', 'Platform'],
    image: '/Reach-Web.jpg',
    meta: {
      client: 'Reach',
      industry: 'SaaS',
      services: ['Product Engineering', 'Web Development'],
      stack: ['React', 'Node.js', 'PostgreSQL'],
      timeline: 'TBC',
      year: '2024',
    },
    results: [
      { value: 'TBC', label: 'Metrics to be confirmed', isPlaceholder: true },
    ],
    isPlaceholder: true,
  },
  {
    id: 'pet-cover',
    slug: 'pet-cover',
    name: 'Pet Cover',
    tagline: 'Pet Insurance Platform',
    description: 'Modern pet insurance and care platform.',
    tags: ['Insurance', 'Platform', 'Pets'],
    image: '/Pet Cover- Web.jpg',
    meta: {
      client: 'Pet Cover',
      industry: 'Insurance',
      services: ['Product Engineering', 'Web Development'],
      stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
      timeline: 'TBC',
      year: '2024',
    },
    results: [
      { value: 'TBC', label: 'Metrics to be confirmed', isPlaceholder: true },
    ],
    isPlaceholder: true,
  },
]

export const featuredCase = caseStudies.find((c) => c.isFeatured) || caseStudies[0]

export const totalCaseStudies = 21

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug)
}

export function getRelatedCases(currentSlug: string, limit = 3): CaseStudy[] {
  const current = getCaseBySlug(currentSlug)
  if (!current) return caseStudies.slice(0, limit)
  
  return caseStudies
    .filter((c) => c.slug !== currentSlug)
    .filter((c) => c.meta.industry === current.meta.industry || c.tags.some((t) => current.tags.includes(t)))
    .slice(0, limit)
}

export function filterCases(industry?: string, service?: string): CaseStudy[] {
  return caseStudies.filter((c) => {
    if (industry && industry !== 'All' && c.meta.industry !== industry) return false
    if (service && service !== 'All' && !c.meta.services.includes(service)) return false
    return true
  })
}
