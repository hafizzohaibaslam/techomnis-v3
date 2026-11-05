import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work — SaaS, AI & Mobile Case Studies | TechOmnis',
  description:
    '17 products shipped end to end: AI platforms, EdTech, M&A automation, hospitality marketplaces, HealthTech, fintech and venture operations.',
  openGraph: {
    title: 'Work — SaaS, AI & Mobile Case Studies | TechOmnis',
    description:
      '17 products shipped end to end: AI platforms, EdTech, M&A automation, hospitality marketplaces, HealthTech, fintech and venture operations.',
    type: 'website',
  },
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children
}
