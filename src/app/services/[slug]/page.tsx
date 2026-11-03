import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { services, getServiceBySlug } from '@/content/services'
import { getCaseBySlug } from '@/content/cases'
import { ArrowRight, ArrowLeft } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    return {
      title: 'Service Not Found | TechOmnis',
    }
  }

  return {
    title: `${service.name} | TechOmnis Services`,
    description: service.description,
    openGraph: {
      title: `${service.name} | TechOmnis Services`,
      description: service.description,
      type: 'website',
    },
  }
}

function ProcessStep({ step }: { step: (typeof services)[0]['process'][0] }) {
  return (
    <div className="process-step ln lb lr">
      <span className="step-number h-bigup">{String(step.step).padStart(2, '0')}</span>
      <h3 className="h-sub">{step.title}</h3>
      <p className="t-reg grey">{step.description}</p>
    </div>
  )
}

function FeatureItem({ feature }: { feature: (typeof services)[0]['features'][0] }) {
  return (
    <div className="feature-item">
      <h4 className="t-bold">{feature.title}</h4>
      <p className="t-small grey">{feature.description}</p>
    </div>
  )
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const relatedCases = service.relatedCases
    .map((slug) => getCaseBySlug(slug))
    .filter(Boolean)

  const currentIndex = services.findIndex((s) => s.slug === slug)
  const nextService = services[currentIndex + 1] || services[0]

  return (
    <main className="page service-detail" id="top">
      <div className="wrap">
        {/* Hero */}
        <header className="service-hero">
          <Link href="/services" className="back-link t-small">
            <ArrowLeft className="h-4 w-4" />
            All services
          </Link>
          <div className="hero-content">
            <span className="eyebrow">Service</span>
            <h1 className="h-large" data-split>
              {service.name}
            </h1>
            <p className="h-sub hero-tagline">{service.tagline}</p>
          </div>
        </header>

        {/* Description */}
        <section className="service-desc ln lt lb">
          <p className="t-reg">{service.description}</p>
        </section>

        {/* What's Included */}
        <section className="service-features">
          <h2 className="h-bigup">What's Included</h2>
          <div className="features-grid g2">
            {service.features.map((feature, index) => (
              <div key={index} className="ln lb lr">
                <FeatureItem feature={feature} />
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="service-process">
          <h2 className="h-bigup">Our Process</h2>
          <div className="process-grid g4">
            {service.process.map((step) => (
              <ProcessStep key={step.step} step={step} />
            ))}
          </div>
        </section>

        {/* Stack */}
        <section className="service-stack ln lt lb">
          <h2 className="h-bigup">Tech Stack</h2>
          <div className="tags big">
            {service.stack.map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Related Cases */}
        {relatedCases.length > 0 && (
          <section className="related-work">
            <h2 className="h-bigup">Related Work</h2>
            <div className="related-grid g4">
              {relatedCases.map(
                (caseStudy) =>
                  caseStudy && (
                    <article key={caseStudy.id} className="related-case ln lb lr">
                      <Link href={`/work/${caseStudy.slug}`} className="media">
                        <img
                          src={caseStudy.image}
                          alt={caseStudy.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div className="dark"></div>
                        <span className="more">
                          View case{' '}
                          <ArrowRight className="h-[1.25rem] w-[1.25rem] stroke-white" />
                        </span>
                      </Link>
                      <div className="related-meta">
                        <h3 className="h-sub">
                          <Link href={`/work/${caseStudy.slug}`} className="ul">
                            {caseStudy.name}
                          </Link>
                        </h3>
                        <p className="t-small grey">{caseStudy.meta.industry}</p>
                      </div>
                    </article>
                  )
              )}
            </div>
          </section>
        )}

        {/* Next Service */}
        <nav className="service-nav ln lt">
          <Link href={`/services/${nextService.slug}`} className="next-service-link">
            <span className="cap grey">Next Service</span>
            <span className="h-sub">{nextService.name}</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </nav>

        {/* CTA */}
        <section className="service-cta center ln lt lb">
          <h2 className="h-medium">Ready to start?</h2>
          <p className="t-reg grey">
            Let's discuss your {service.name.toLowerCase()} needs.
          </p>
          <div className="btnw">
            <Button href="/contact">Get in touch</Button>
          </div>
        </section>
      </div>
    </main>
  )
}
