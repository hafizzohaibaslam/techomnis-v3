import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Work | TechOmnis',
  description:
    'Explore our portfolio of 21+ case studies across FinTech, Healthcare, E-commerce, AI, and more. See how we help startups and scale-ups build exceptional products.',
  openGraph: {
    title: 'Our Work | TechOmnis',
    description:
      'Explore our portfolio of 21+ case studies across FinTech, Healthcare, E-commerce, AI, and more.',
    type: 'website',
  },
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children
}
