export interface Review {
  id: string
  quote: string
  clientName: string
  isPlaceholder: true
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
    quote: 'Client quote about working with TechOmnis.',
    clientName: 'Client name, role, company',
    isPlaceholder: true,
  },
  {
    id: '2',
    quote: 'Client quote about working with TechOmnis.',
    clientName: 'Client name, role, company',
    isPlaceholder: true,
  },
  {
    id: '3',
    quote: 'Client quote about working with TechOmnis.',
    clientName: 'Client name, role, company',
    isPlaceholder: true,
  },
  {
    id: '4',
    quote: 'Client quote about working with TechOmnis.',
    clientName: 'Client name, role, company',
    isPlaceholder: true,
  },
  {
    id: '5',
    quote: 'Client quote about the TechOmnis engagement and what it delivered.',
    clientName: 'Client name, role, company',
    isPlaceholder: true,
    isWide: true,
  },
  {
    id: '6',
    quote: 'Client quote about the TechOmnis engagement and what it delivered.',
    clientName: 'Client name, role, company',
    isPlaceholder: true,
    isWide: true,
  },
  {
    id: '7',
    quote: 'Client quote about working with TechOmnis.',
    clientName: 'Client name, role, company',
    isPlaceholder: true,
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
