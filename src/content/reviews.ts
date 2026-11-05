export interface Review {
  id: string
  quote: string
  clientName: string
  isPlaceholder?: boolean
  isWide?: boolean
}

export interface ScoreCard {
  mainValue: string
  mainLabel: string
  stats: { label: string; value: string }[]
}

export const reviews: Review[] = [
  {
    id: '1',
    quote: 'Zohaib delivers exactly what he promises — on time, high quality, and without errors. A rare find.',
    clientName: 'Founder, aviation AI product',
    isPlaceholder: false,
  },
  {
    id: '2',
    quote: 'one of the most talented and hard-working developers',
    clientName: 'Sam Aguilar, PM and lead developer, MJV',
    isPlaceholder: false,
  },
  {
    id: '3',
    quote: 'a fantastic developer… a great communicator and asset to any team',
    clientName: 'Forrest Alonso Haydon, Co-Founder & Chief Project Officer, MJV',
    isPlaceholder: false,
  },
  {
    id: '4',
    quote: 'Zohaib, was awesome to work with and very attentive to every detail. We completed the project on time and on budget.',
    clientName: 'Client, AI product build',
    isPlaceholder: false,
  },
  {
    id: '5',
    quote: 'Zohaib was great. We brought him in for the migration of a chrome extension to a new CRM we deployed and he did a great job. I would highly recommend him.',
    clientName: 'Client, M&A advisory firm',
    isPlaceholder: false,
    isWide: true,
  },
  {
    id: '6',
    quote: 'Zohaib is an excellent software developer. He makes web applications very visually pleasing.',
    clientName: 'Client, React product',
    isPlaceholder: false,
    isWide: true,
  },
  {
    id: '7',
    quote: 'Smart, flexible, and startup-friendly.',
    clientName: 'Upwork client',
    isPlaceholder: false,
  },
]

export const scoreCards: ScoreCard[] = [
  {
    mainValue: '17',
    mainLabel: 'case studies',
    stats: [
      { label: 'Industries', value: '12+' },
      { label: 'Impact', value: '$2B+' },
      { label: 'Founded', value: '2024' },
      { label: 'Studio', value: 'Lahore' },
    ],
  },
  {
    mainValue: '$2B+',
    mainLabel: 'client impact',
    stats: [
      { label: 'Cases', value: '17' },
      { label: 'Industries', value: '12+' },
      { label: 'Founded', value: '2024' },
      { label: 'Studio', value: 'Lahore' },
    ],
  },
]
