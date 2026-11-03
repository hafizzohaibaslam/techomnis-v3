import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | TechOmnis',
  description:
    'Start a project with TechOmnis. Tell us about your product engineering, AI, or web development needs.',
  openGraph: {
    title: 'Contact | TechOmnis',
    description: 'Start a project with TechOmnis. Tell us about your needs.',
    type: 'website',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
