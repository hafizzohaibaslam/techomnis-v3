export interface Client {
  name: string
  subtitle?: string
}

export const clientsRow1: Client[] = [
  { name: 'Disney' },
  { name: 'GLAAD' },
  { name: 'Six Senses' },
  { name: 'Mucker Capital' },
]

export const clientsRow2Left: Client[] = [
  { name: 'Edulog' },
  { name: 'Biden campaign', subtitle: 'via Authentic' },
  { name: 'Archyr' },
  { name: 'Waivs.ai' },
]

export const clientsRow2Right: Client[] = [
  { name: 'REACH Pathways' },
  { name: 'Tuck Advisors' },
  { name: 'BaboBot' },
  { name: 'Bellhopt' },
  { name: 'Othego', subtitle: 'Own product' },
]

export const businessDomains: string[] = [
  'AI',
  'SaaS',
  'Marketplaces',
  'EdTech',
  'Student transportation',
  'Hospitality',
  'Media & entertainment',
  'Non-profit',
  'Venture capital',
  'Political campaigns',
]

export interface ProofRow {
  signal: string
  figure: string
  source: string
}

export const proofInNumbers: ProofRow[] = [
  {
    signal: 'Upwork rating',
    figure: '5.0 of 5.0',
    source: '68 reviews on Upwork, Top Rated Plus',
  },
  {
    signal: 'Earned on Upwork',
    figure: '$300K+',
    source: 'Lifetime earnings on the Upwork profile',
  },
  {
    signal: 'Client impact',
    figure: '$2B+',
    source: 'Combined across 17 case studies in 12+ industries',
  },
]
