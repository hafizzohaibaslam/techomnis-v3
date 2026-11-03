export interface NavItem {
  label: string
  href: string
  dataGo: string
}

export const mainNavItems: NavItem[] = [
  { label: 'Work', href: '#work', dataGo: 'Work' },
  { label: 'Services', href: '#services', dataGo: 'Services' },
  { label: 'Process', href: '#process', dataGo: 'Process' },
  { label: 'About', href: '#about', dataGo: 'About' },
]

export const sectionMappings: {
  selector: string
  label: string
  href?: string
}[] = [
  { selector: '#top', label: 'Home' },
  { selector: '#services', label: 'Services' },
  { selector: '#work', label: 'Work' },
  { selector: '#process', label: 'Process' },
  { selector: '.direction', label: 'Services', href: '#services' },
  { selector: '#clients', label: 'Work', href: '#work' },
  { selector: '#about', label: 'About' },
  { selector: '#contact', label: 'Contact' },
]

export const directionTitles = ['What we build', 'In love with', 'Find out more']

export const directionItems: { title: string; group: number }[] = [
  { title: 'AI / LLM products', group: 0 },
  { title: 'MVP rescue', group: 0 },
  { title: 'SaaS', group: 1 },
  { title: 'Marketplaces', group: 1 },
  { title: 'EdTech', group: 1 },
  { title: 'Web · Mobile · Cloud', group: 2 },
]
