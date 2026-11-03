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
    quote: 'Verbatim Upwork review goes here.',
    clientName: 'Client name, role, company',
    isPlaceholder: true,
  },
  {
    id: '2',
    quote: 'Verbatim Upwork review goes here.',
    clientName: 'Client name, role, company',
    isPlaceholder: true,
  },
  {
    id: '3',
    quote: 'Verbatim Upwork review goes here.',
    clientName: 'Client name, role, company',
    isPlaceholder: true,
  },
  {
    id: '4',
    quote: 'Verbatim Upwork review goes here.',
    clientName: 'Client name, role, company',
    isPlaceholder: true,
  },
  {
    id: '5',
    quote:
      "Longer verbatim Upwork review goes here, copied word for word from the profile with the client's permission.",
    clientName: 'Client name, role, company',
    isPlaceholder: true,
    isWide: true,
  },
  {
    id: '6',
    quote:
      "Longer verbatim Upwork review goes here, copied word for word from the profile with the client's permission.",
    clientName: 'Client name, role, company',
    isPlaceholder: true,
    isWide: true,
  },
  {
    id: '7',
    quote: 'Verbatim Upwork review goes here.',
    clientName: 'Client name, role, company',
    isPlaceholder: true,
  },
]

export const scoreCards: ScoreCard[] = [
  {
    mainValue: '5.0',
    mainLabel: 'of 5.0',
    stats: [
      { label: 'Reviews', value: '68' },
      { label: 'Badge', value: 'Top Rated Plus' },
      { label: 'Earned', value: '$300K+' },
      { label: 'Platform', value: 'Upwork' },
    ],
  },
  {
    mainValue: '68',
    mainLabel: 'reviews',
    stats: [
      { label: 'Average', value: '5.0' },
      { label: 'Badge', value: 'Top Rated Plus' },
      { label: 'Earned', value: '$300K+' },
      { label: 'Platform', value: 'Upwork' },
    ],
  },
]
