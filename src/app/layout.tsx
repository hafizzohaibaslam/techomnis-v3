import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'
import { SiteMotion } from '@/components/site-motion'
import { TransitionOverlay } from '@/components/ui/transition'

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-figtree',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://techomnis.com'),
  title: 'TechOmnis — Product Studio for Web, Mobile & AI',
  description:
    'TechOmnis designs, engineers and ships web, mobile and AI products to production. 17 case studies, 12+ industries, $2B+ in client impact.',
  keywords: [
    'product studio',
    'product engineering',
    'MVP rescue',
    'AI development',
    'web development agency',
    'mobile app development',
    'SaaS development',
    'AI agents',
    'RAG chatbot',
    'Next.js agency',
    'Flutter development',
    'React Native development',
  ],
  authors: [{ name: 'TechOmnis' }],
  creator: 'TechOmnis',
  publisher: 'TechOmnis',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://techomnis.com',
    siteName: 'TechOmnis',
    title: 'TechOmnis — Product Studio for Web, Mobile & AI',
    description:
      'TechOmnis designs, engineers and ships web, mobile and AI products to production. 17 case studies, 12+ industries, $2B+ in client impact.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TechOmnis — Product Studio for Web, Mobile & AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechOmnis — Product Studio for Web, Mobile & AI',
    description:
      'TechOmnis designs, engineers and ships web, mobile and AI products to production. 17 case studies, 12+ industries, $2B+ in client impact.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/TechOmnis-Icon-Framed.svg',
        type: 'image/svg+xml',
      },
    ],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'TechOmnis',
  url: 'https://techomnis.com',
  logo: 'https://techomnis.com/logo.svg',
  description:
    'TechOmnis is a founder-led product studio for design, engineering and AI. We take products from idea, or from prototype, to production.',
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@techomnis.com',
    contactType: 'customer service',
  },
  foundingDate: '2024',
  foundingLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lahore',
      addressCountry: 'PK',
    },
  },
  priceRange: '$500 - $50,000+',
  areaServed: ['US', 'UK', 'UAE'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={figtree.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SiteMotion />
        <TransitionOverlay />
        {children}
      </body>
    </html>
  )
}
