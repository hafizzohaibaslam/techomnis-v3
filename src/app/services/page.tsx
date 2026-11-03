import Link from 'next/link'
import type { Metadata } from 'next'
import { services, serviceHighlights } from '@/content/services'
import { ArrowRight } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Services | TechOmnis',
  description:
    'Product Engineering, AI & LLM, Web Development, Mobile Apps, MVP Rescue. End-to-end engineering for startups and scale-ups.',
  openGraph: {
    title: 'Services | TechOmnis',
    description:
      'Product Engineering, AI & LLM, Web Development, Mobile Apps, MVP Rescue. End-to-end engineering for startups and scale-ups.',
    type: 'website',
  },
}

function ServiceCard({ service }: { service: (typeof services)[0] }) {
  return (
    <article className="service-card ln lb lr">
      <Link href={`/services/${service.slug}`} className="service-link">
        <div className="service-icon">{getServiceIcon(service.icon)}</div>
        <h3 className="h-sub">{service.name}</h3>
        <p className="t-reg grey">{service.tagline}</p>
        <span className="service-arrow">
          <ArrowRight className="h-5 w-5" />
        </span>
      </Link>
    </article>
  )
}

function getServiceIcon(icon: string) {
  const icons: Record<string, React.ReactNode> = {
    rocket: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
    brain: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
        <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
        <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
        <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
        <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
        <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
        <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
        <path d="M6 18a4 4 0 0 1-1.967-.516" />
        <path d="M19.967 17.484A4 4 0 0 1 18 18" />
      </svg>
    ),
    code: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    mobile: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
    rescue: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="m4.93 4.93 4.24 4.24" />
        <path d="m14.83 9.17 4.24-4.24" />
        <path d="m14.83 14.83 4.24 4.24" />
        <path d="m9.17 14.83-4.24 4.24" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    design: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="m12 19 7-7 3 3-7 7-3-3z" />
        <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="m2 2 7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  }
  return icons[icon] || icons.code
}

export default function ServicesPage() {
  return (
    <main className="page" id="top">
      <div className="wrap">
        <header className="services-header">
          <span className="eyebrow">What We Do</span>
          <h1 className="h-large" data-split>
            Services
          </h1>
          <p className="t-reg services-intro">
            One senior team across UI, API, LLM, data, and infra. We think like product owners
            and ship like engineers.
          </p>
        </header>

        {/* Highlights */}
        <section className="highlights g4 ln lt lb">
          {serviceHighlights.map((highlight, index) => (
            <div key={index} className={`highlight ln ${index < 2 ? 'lr' : ''}`}>
              <div className="highlight-icon">{getServiceIcon(highlight.icon)}</div>
              <h3 className="h-sub">{highlight.title}</h3>
              <p className="t-reg grey">{highlight.description}</p>
            </div>
          ))}
        </section>

        {/* All Services */}
        <section className="all-services">
          <h2 className="h-bigup services-section-title">All Services</h2>
          <div className="services-grid g2">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="services-cta center ln lt lb">
          <h2 className="h-medium">Not sure what you need?</h2>
          <p className="t-reg grey">
            Let's discuss your project. We'll help identify the right approach.
          </p>
          <div className="btnw">
            <Button href="/contact">Start a conversation</Button>
          </div>
        </section>
      </div>
    </main>
  )
}
