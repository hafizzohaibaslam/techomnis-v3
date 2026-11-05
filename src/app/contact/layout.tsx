import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact TechOmnis — Start a Project',
  description:
    'Tell us about the product, whether it\'s an idea, a prototype or a legacy system. We reply within 24 hours. hello@techomnis.com',
  openGraph: {
    title: 'Contact TechOmnis — Start a Project',
    description: 'Tell us about the product. We reply within 24 hours. hello@techomnis.com',
    type: 'website',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
