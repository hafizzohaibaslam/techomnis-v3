export interface Client {
  name: string
  logo: string
  subtitle?: string
}

export const clientsRow1: Client[] = [
  { name: 'Disney', logo: '/clients/disney.svg' },
  { name: 'GLAAD', logo: '/clients/glaad.png' },
  { name: 'Six Senses', logo: '/clients/six-senses.png' },
  { name: 'Mucker Capital', logo: '/clients/mucker-white.png' },
]

export const clientsRow2Left: Client[] = [
  { name: 'Edulog', logo: '/clients/edulog.png' },
  { name: 'Vote.org', logo: '/clients/vote-org.svg', subtitle: 'via Authentic' },
  { name: 'Archyr', logo: '/clients/archyr.png' },
  { name: 'Waivs.ai', logo: '/clients/waivs.svg' },
]

export const clientsRow2Right: Client[] = [
  { name: 'REACH Pathways', logo: '/clients/reach-pathways.png' },
  { name: 'Tuck Advisors', logo: '/clients/tuck-advisors.png' },
  { name: 'BaboBot', logo: '/clients/babobot.png' },
  { name: 'Bellhopt', logo: '/clients/bellhopt.svg' },
  { name: 'Othego', logo: '/clients/othego.svg', subtitle: 'Own product' },
]

export const businessDomains: string[] = [
  'EdTech & K-12',
  'M&A & Venture',
  'HealthTech',
  'Hospitality',
  'Fintech',
  'Media & Advocacy',
  'SaaS & AI Tools',
  'Immigration & Talent',
  'Nonprofits',
  'Marketplaces',
]

export interface ProofRow {
  signal: string
  figure: string
  source: string
}

export const proofInNumbers: ProofRow[] = [
  {
    signal: 'Case studies',
    figure: '17',
    source: 'Products shipped end to end',
  },
  {
    signal: 'Industries',
    figure: '12+',
    source: 'From EdTech to HealthTech',
  },
  {
    signal: 'Client impact',
    figure: '$2B+',
    source: 'Raised and closed across the portfolio',
  },
]

export interface BuiltForLoadRow {
  project: string
  reach: string
  shipped: string
}

export const builtForLoad: BuiltForLoadRow[] = [
  {
    project: 'Edulog Athena V2',
    reach: 'Modernized field workflows serving 85,000+ students across North America',
    shipped: 'Engineering on the multi-tenant, GPS-integrated rebuild of a legacy platform',
  },
  {
    project: 'Low Rate Co',
    reach: '29,354+ clients; one application shops 30+ wholesale lenders',
    shipped: 'A campaign-aware lead platform with Cindie, an AI mortgage advisor',
  },
  {
    project: 'Authentic Spark',
    reach: 'Operations for an agency that has raised $1B+ online. Vote.org: 10.2M voter emails, $725K raised',
    shipped: 'An AI-powered operations hub across dozens of campaign clients',
  },
  {
    project: 'The Build Fellowship',
    reach: '200+ active fellows · 1,300+ students trained · 54 universities',
    shipped: 'A public platform plus an internal operations hub',
  },
]

export const brandsServed = [
  'Disney',
  'GLAAD',
  'Six Senses',
  'Mucker Capital',
  'Edulog',
  'Vote.org',
  'Authentic',
]
