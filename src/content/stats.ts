export interface CounterStat {
  value: number
  suffix?: string
  prefix?: string
  decimal?: number
  description: string
}

export interface AwardStat {
  value: string
  description: string
}

export const counterStats: CounterStat[] = [
  {
    value: 17,
    description: 'case studies of products we shipped',
  },
  {
    value: 12,
    suffix: '+',
    description: 'industries, from EdTech to hospitality',
  },
  {
    value: 5,
    decimal: 1,
    suffix: ' of 5.0',
    description: 'average rating from 68 Upwork reviews',
  },
  {
    value: 300,
    prefix: '$',
    suffix: 'K+',
    description: 'earned on Upwork as Top Rated Plus',
  },
]

export const awardStats: AwardStat[] = [
  {
    value: 'Top Rated+',
    description: 'Top Rated Plus on Upwork',
  },
  {
    value: '$2B+',
    description: 'client impact across the portfolio',
  },
  {
    value: '2024',
    description: 'founded in Lahore, working worldwide',
  },
]

export const radarAxes = ['Audit', 'Blueprint', 'Build', 'Ship', 'Scale', 'Support'] as const

export const radarData = {
  mvp: [0.62, 0.34, 0.5, 0.72, 0.28, 0.4],
  full: [0.82, 0.74, 0.86, 0.8, 0.72, 0.76],
}

export const radarAnimationTarget = {
  mvp: [0.5, 0.42, 0.38, 0.6, 0.36, 0.5],
  full: [0.86, 0.8, 0.78, 0.88, 0.8, 0.7],
}
