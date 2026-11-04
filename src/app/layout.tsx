import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'
import { MotionProvider } from '@/hooks/use-motion'
import { AnimationInitializer } from '@/components/animation-initializer'

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-figtree',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://techomnis.com'),
  title: 'TechOmnis: End-to-end product engineering',
  description:
    'TechOmnis ships the whole system, end to end: MVP rescue, product engineering and AI products.',
  keywords: [
    'product engineering',
    'MVP rescue',
    'AI products',
    'LLM',
    'RAG',
    'SaaS',
    'Next.js',
    'TypeScript',
    'full-stack development',
  ],
  authors: [{ name: 'TechOmnis' }],
  creator: 'TechOmnis',
  publisher: 'TechOmnis',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://techomnis.com',
    siteName: 'TechOmnis',
    title: 'TechOmnis: End-to-end product engineering',
    description:
      'TechOmnis ships the whole system, end to end: MVP rescue, product engineering and AI products.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TechOmnis - End-to-end product engineering',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechOmnis: End-to-end product engineering',
    description:
      'TechOmnis ships the whole system, end to end: MVP rescue, product engineering and AI products.',
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
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='15' fill='none' stroke='%23222' stroke-width='5.5' stroke-dasharray='80 14.2' transform='rotate(-50 20 20)'/%3E%3Ccircle cx='20' cy='20' r='4.2' fill='%23222'/%3E%3C/svg%3E",
        type: 'image/svg+xml',
      },
    ],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TechOmnis',
  url: 'https://techomnis.com',
  logo: 'https://techomnis.com/logo.svg',
  description:
    'TechOmnis ships the whole system, end to end: MVP rescue, product engineering and AI products.',
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
        <MotionProvider>
          <AnimationInitializer />
          {children}
        </MotionProvider>
      </body>
    </html>
  )
}
