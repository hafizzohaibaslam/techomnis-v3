import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { caseStudies, getCaseBySlug, getRelatedCases } from '@/content/cases'
import { ArrowRight, ArrowLeft } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = getCaseBySlug(slug)

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found | TechOmnis',
    }
  }

  return {
    title: `${caseStudy.name} | TechOmnis Case Study`,
    description: caseStudy.description,
    openGraph: {
      title: `${caseStudy.name} | TechOmnis Case Study`,
      description: caseStudy.description,
      type: 'article',
      images: [{ url: caseStudy.image }],
    },
  }
}

function MetaItem({ label, value }: { label: string; value: string | string[] }) {
  return (
    <div className="meta-item">
      <dt className="cap grey">{label}</dt>
      <dd className="t-bold">{Array.isArray(value) ? value.join(', ') : value}</dd>
    </div>
  )
}

function ResultCard({
  result,
}: {
  result: { value: string; label: string; isPlaceholder?: boolean }
}) {
  return (
    <div className="result-card ln lb lr">
      <span className="num">{result.value}</span>
      <p className="t-reg">{result.label}</p>
      {result.isPlaceholder && <span className="ph">Placeholder</span>}
    </div>
  )
}

function RelatedCaseCard({
  caseStudy,
}: {
  caseStudy: (typeof caseStudies)[0]
}) {
  return (
    <article className="related-case ln lb lr">
      <Link href={`/work/${caseStudy.slug}`} className="media">
        <img
          src={caseStudy.image}
          alt={caseStudy.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div className="dark"></div>
        <span className="more">
          View case <ArrowRight className="h-[1.25rem] w-[1.25rem] stroke-white" />
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
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const caseStudy = getCaseBySlug(slug)

  if (!caseStudy) {
    notFound()
  }

  const relatedCases = getRelatedCases(slug, 3)
  const currentIndex = caseStudies.findIndex((c) => c.slug === slug)
  const nextCase = caseStudies[currentIndex + 1] || caseStudies[0]
  const prevCase = caseStudies[currentIndex - 1] || caseStudies[caseStudies.length - 1]

  return (
    <main className="page case-detail" id="top">
      <div className="wrap">
        {/* Hero */}
        <header className="case-hero">
          <Link href="/work" className="back-link t-small">
            <ArrowLeft className="h-4 w-4" />
            All cases
          </Link>
          <div className="hero-content">
            <span className="eyebrow">{caseStudy.meta.industry}</span>
            <h1 className="h-large" data-split>
              {caseStudy.name}
            </h1>
            <p className="h-sub hero-tagline">{caseStudy.tagline}</p>
          </div>
          {caseStudy.isPlaceholder && (
            <div className="placeholder-notice">
              <span className="ph">Some details on this page are placeholders pending client approval</span>
            </div>
          )}
        </header>

        {/* Hero Image */}
        <div className="case-hero-image ln lb">
          <img
            src={caseStudy.heroImage || caseStudy.image}
            alt={caseStudy.name}
          />
        </div>

        {/* Meta */}
        <section className="case-meta-section g4 ln lb">
          <MetaItem label="Client" value={caseStudy.meta.client} />
          <MetaItem label="Industry" value={caseStudy.meta.industry} />
          <MetaItem label="Services" value={caseStudy.meta.services} />
          <MetaItem label="Timeline" value={`${caseStudy.meta.timeline} · ${caseStudy.meta.year}`} />
        </section>

        {/* Stack */}
        <section className="case-stack ln lb">
          <h2 className="cap grey">Tech Stack</h2>
          <div className="tags big">
            {caseStudy.meta.stack.map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Challenge, Approach, Solution */}
        <div className="case-content">
          {caseStudy.challenge && (
            <section className="content-section ln lb">
              <h2 className="h-bigup">{caseStudy.challenge.title}</h2>
              <p className="t-reg">{caseStudy.challenge.content}</p>
            </section>
          )}

          {caseStudy.approach && (
            <section className="content-section ln lb">
              <h2 className="h-bigup">{caseStudy.approach.title}</h2>
              <p className="t-reg">{caseStudy.approach.content}</p>
            </section>
          )}

          {caseStudy.solution && (
            <section className="content-section ln lb">
              <h2 className="h-bigup">{caseStudy.solution.title}</h2>
              <p className="t-reg">{caseStudy.solution.content}</p>
            </section>
          )}
        </div>

        {/* Results */}
        <section className="case-results">
          <h2 className="h-bigup results-title">Results</h2>
          <div className="results-grid g4">
            {caseStudy.results.map((result, index) => (
              <ResultCard key={index} result={result} />
            ))}
          </div>
        </section>

        {/* Gallery */}
        {caseStudy.gallery && caseStudy.gallery.length > 1 && (
          <section className="case-gallery ln lt lb">
            <h2 className="h-bigup">Gallery</h2>
            <div className="gallery-grid">
              {caseStudy.gallery.map((image, index) => (
                <div key={index} className="gallery-item">
                  <img src={image} alt={`${caseStudy.name} screenshot ${index + 1}`} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Testimonial */}
        {caseStudy.testimonial && (
          <section className="case-testimonial ln lt lb center">
            <blockquote className="h-medium">"{caseStudy.testimonial.quote}"</blockquote>
            <cite className="t-bold">{caseStudy.testimonial.author}</cite>
            <p className="t-small grey">{caseStudy.testimonial.role}</p>
            {caseStudy.testimonial.isPlaceholder && <span className="ph">Quote placeholder</span>}
          </section>
        )}

        {/* Navigation */}
        <nav className="case-nav g2 ln lt">
          <Link href={`/work/${prevCase.slug}`} className="case-nav-link prev ln lr">
            <span className="cap grey">Previous</span>
            <span className="h-sub">{prevCase.name}</span>
          </Link>
          <Link href={`/work/${nextCase.slug}`} className="case-nav-link next ln lr">
            <span className="cap grey">Next</span>
            <span className="h-sub">{nextCase.name}</span>
          </Link>
        </nav>

        {/* Related */}
        {relatedCases.length > 0 && (
          <section className="related-cases">
            <h2 className="h-bigup">Related Work</h2>
            <div className="related-grid g4">
              {relatedCases.map((related) => (
                <RelatedCaseCard key={related.id} caseStudy={related} />
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="case-cta center ln lt lb">
          <h2 className="h-medium">Have a similar project?</h2>
          <p className="t-reg grey">Let's discuss how we can help.</p>
          <div className="btnw">
            <Button href="/contact">Start a conversation</Button>
          </div>
        </section>
      </div>
    </main>
  )
}
