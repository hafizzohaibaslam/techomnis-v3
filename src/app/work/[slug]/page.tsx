import { notFound } from 'next/navigation'
import { TransitionLink } from '@/components/ui/transition-link'
import type { Metadata } from 'next'
import { cases, getCaseBySlug, type CaseStudy } from '@/content/cases'
import { InnerFooter } from '@/components/layout/inner-footer'
import { BreadcrumbSchema, CaseStudySchema } from '@/components/schema/breadcrumb'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return cases.filter((c) => c.hasPage).map((caseStudy) => ({
    slug: caseStudy.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = getCaseBySlug(slug)

  if (!caseStudy) {
    return { title: 'Case Study Not Found · TechOmnis' }
  }

  const shortOutcome = caseStudy.metric ? `${caseStudy.metric.value} ${caseStudy.metric.label}` : caseStudy.category
  const title = `${caseStudy.name}: ${shortOutcome} | TechOmnis`
  const description = `${caseStudy.name}: ${caseStudy.description}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://techomnis.com/work/${slug}`,
      type: 'article',
      images: caseStudy.image ? [{ url: caseStudy.image, width: 1200, height: 630, alt: `${caseStudy.name} case study cover` }] : undefined,
    },
    twitter: {
      title,
      description,
      images: caseStudy.image ? [caseStudy.image] : undefined,
    },
    alternates: {
      canonical: `https://techomnis.com/work/${slug}`,
    },
  }
}

function CaseArt({ gradient, rotation = -5 }: { gradient: [string, string]; rotation?: number }) {
  const gradientStyle = `linear-gradient(120deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`
  return (
    <div className="art" style={{ background: gradientStyle }}>
      <div
        className="scr"
        style={{
          left: '6%',
          top: '16%',
          width: '30%',
          height: '78%',
          transform: `rotate(${rotation}deg)`,
          background: '#2B2F36',
        }}
      >
        <i style={{ top: '18%' }}></i>
        <i style={{ top: '26%', right: '30%' }}></i>
        <b
          style={{
            left: '8%',
            right: '8%',
            top: '38%',
            height: '40%',
            background: gradient[1],
            opacity: 0.35,
          }}
        ></b>
      </div>
      <div
        className="scr"
        style={{
          left: '34%',
          top: '10%',
          width: '36%',
          height: '86%',
          transform: `rotate(${rotation}deg)`,
          background: '#2B2F36',
        }}
      >
        <i style={{ top: '14%' }}></i>
        <b
          style={{
            left: '8%',
            width: '40%',
            top: '24%',
            height: '22%',
            background: gradient[0],
          }}
        ></b>
        <b
          style={{
            right: '8%',
            width: '38%',
            top: '24%',
            height: '22%',
            background: gradient[1],
            opacity: 0.4,
          }}
        ></b>
        <i style={{ top: '56%' }}></i>
        <i style={{ top: '64%', right: '40%' }}></i>
        <i style={{ top: '72%' }}></i>
      </div>
      <div
        className="scr"
        style={{
          left: '68%',
          top: '20%',
          width: '26%',
          height: '70%',
          transform: `rotate(${rotation}deg)`,
          background: '#2B2F36',
        }}
      >
        <i style={{ top: '20%' }}></i>
        <i style={{ top: '30%', right: '20%' }}></i>
        <b style={{ left: '8%', right: '8%', top: '44%', height: '14%', background: '#222' }}></b>
      </div>
    </div>
  )
}

function RelatedCase({ caseStudy, isRight }: { caseStudy: CaseStudy; isRight?: boolean }) {
  const href = caseStudy.hasPage ? `/work/${caseStudy.slug}` : '#'
  return (
    <div className={`case ln lb ${isRight ? 'r' : 'lr'}`}>
      <TransitionLink
        href={href}
        label={caseStudy.name}
        className="media"
        data-media
        data-go={caseStudy.name}
        aria-label={`${caseStudy.name} case study`}
      >
        <CaseArt gradient={caseStudy.gradient} rotation={caseStudy.rotation} />
        <div className="dark"></div>
        <span className="more" aria-hidden="true">
          Read more
        </span>
      </TransitionLink>
      <div className="case-meta">
        <h3 className="h-small">
          <span className="ul">{caseStudy.name}</span>
        </h3>
        {caseStudy.metric && (
          <div className="case-stat">
            <span className="num">{caseStudy.metric.value}</span>
            <p className="t-reg">{caseStudy.metric.label}</p>
          </div>
        )}
        <div className="tags">
          {caseStudy.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const caseStudy = getCaseBySlug(slug)

  if (!caseStudy || !caseStudy.hasPage) {
    notFound()
  }

  const currentIndex = cases.findIndex((c) => c.slug === slug)
  const relatedCases = cases.filter((c, i) => i !== currentIndex).slice(0, 4)

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://techomnis.com' },
          { name: 'Work', url: 'https://techomnis.com/work' },
          { name: caseStudy.name, url: `https://techomnis.com/work/${slug}` },
        ]}
      />
      <CaseStudySchema
        name={caseStudy.name}
        description={caseStudy.description}
        url={`https://techomnis.com/work/${slug}`}
        image={caseStudy.image ? `https://techomnis.com${caseStudy.image}` : undefined}
        category={caseStudy.category}
      />
      <div className="page" id="page">
        <main id="main">
          <TransitionLink
            href="/work"
            label="Work"
            className="closeb"
            data-go="Work"
            data-hover
            aria-label="Close case study and go back to Work"
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M2 2l12 12M14 2L2 14" fill="none" />
            </svg>
          </TransitionLink>

          <section className="chero" id="top" aria-label={`${caseStudy.name} case study`}>
            <div className="wrap center">
              <span className="eyebrow">
                {caseStudy.name} · {caseStudy.category.toLowerCase()}
              </span>
              <h1 className="h-big" data-split>
                {caseStudy.headline || caseStudy.description}
              </h1>
              <a
                href="#about-project"
                className="rnd"
                data-hover
                aria-label="Scroll to the project overview"
              >
                <svg className="ring" viewBox="0 0 62 62" aria-hidden="true">
                  <circle cx="31" cy="31" r="30" />
                </svg>
                <svg className="ar" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 4v16M6 14l6 6 6-6" />
                </svg>
              </a>
            </div>
          </section>

          <div className="wrap">
            <div className="cmedia media" data-rise style={{ borderRadius: 0 }}>
              <CaseArt gradient={caseStudy.gradient} rotation={caseStudy.rotation} />
            </div>
          </div>

          <section className="about-g" id="about-project" aria-label="About the project">
            <div className="wrap" style={{ height: '100%' }}>
              <div className="g2" style={{ height: '100%' }}>
                <div className="about-l ln lr lb">
                  <h2 className="h-big" data-split>
                    About project
                  </h2>
                  <p className="t-reg" data-rise>
                    {caseStudy.description}
                  </p>
                  <div className="tags lg" data-rise>
                    {caseStudy.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                    <span className="tag">{caseStudy.category}</span>
                  </div>
                </div>
                <div className="ab-r">
                  <div className="g2 g2keep">
                    <div className="cell tall ln lr lb mr">
                      <div className="ch">
                        <h3 className="tt">The context</h3>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 11v6M12 7.5v.5" />
                        </svg>
                      </div>
                      <div className="cb">
                        <p className="t-reg grey">
                          {slug === 'othego'
                            ? 'Every founder building an AI product faces the same problem: chatbots are expensive to run and hard to keep accurate. We built Othego to solve that for ourselves first.'
                            : `The context behind ${caseStudy.name} and why we built it.`}
                        </p>
                      </div>
                    </div>
                    <div className="cell tall ln lb">
                      <div className="ch">
                        <h3 className="tt">What we did</h3>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <circle cx="12" cy="12" r="9" />
                          <path d="M8 12.3l2.7 2.7L16 9.7" />
                        </svg>
                      </div>
                      <div className="cb">
                        <p className="t-reg grey">
                          {slug === 'othego'
                            ? 'Built the product end to end: the chat experience, the RAG retrieval pipeline, lead capture, analytics dashboard, and Stripe subscription tiers.'
                            : `Built the full product for ${caseStudy.name}.`}
                        </p>
                      </div>
                    </div>
                  </div>
                  {caseStudy.metric && (
                    <div className="qrow ln lb">
                      <div className="ch">
                        <div className="qt2">
                          <h3 className="tt">Key metric</h3>
                        </div>
                      </div>
                      <div className="qbody">
                        <p className="h-medium">
                          {caseStudy.metric.value}
                        </p>
                        <p className="t-reg grey">{caseStudy.metric.label}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="tagline" aria-label="Product">
            <h2 className="h-xl" data-split>
              Product
            </h2>
            <div className="tags xl" data-rise>
              {slug === 'othego' ? (
                <>
                  <span className="tag">Chat experience</span>
                  <span className="tag">Knowledge base</span>
                  <span className="tag">Lead capture</span>
                  <span className="tag">Analytics</span>
                  <span className="tag">Subscription tiers</span>
                </>
              ) : (
                caseStudy.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))
              )}
            </div>
          </section>

          <div className="wrap">
            <div className="cmedia media" data-rise style={{ borderRadius: 0 }}>
              <CaseArt gradient={caseStudy.gradient} rotation={-6} />
            </div>
          </div>

          <section className="tagline" aria-label="Engineering">
            <h2 className="h-xl" data-split>
              Engineering
            </h2>
            <div className="tags xl" data-rise>
              {slug === 'othego' ? (
                <>
                  <span className="tag">Retrieval pipeline</span>
                  <span className="tag">Vector search</span>
                  <span className="tag">Prompt pipelines</span>
                  <span className="tag">Cost control</span>
                  <span className="tag">Evals</span>
                </>
              ) : (
                <>
                  <span className="tag">Full-stack</span>
                  <span className="tag">API</span>
                  <span className="tag">Infrastructure</span>
                </>
              )}
            </div>
          </section>

          {relatedCases.length > 0 && (
            <section className="disc" aria-label="Discover more">
              <div className="wrap">
                <div className="disc-head ln lb">
                  <h2 className="h-big" data-split>
                    Discover more
                  </h2>
                  <div className="btnw">
                    <TransitionLink href="/work" label="Work" className="btn" data-hover data-btn data-go="Work">
                      All projects
                    </TransitionLink>
                  </div>
                </div>
                <div className="g2">
                  {relatedCases.slice(0, 2).map((related, i) => (
                    <RelatedCase key={related.slug} caseStudy={related} isRight={i === 1} />
                  ))}
                </div>
                <div className="allp">
                  <TransitionLink href="/work" label="Work" className="btn" data-hover data-btn data-go="Work">
                    All projects
                  </TransitionLink>
                </div>
              </div>
            </section>
          )}

          <section id="why" className="why" aria-label="Why us">
            <div className="wrap">
              <div className="g4 cnt">
                <div className="counter-cell ln lr lb">
                  <div className="in">
                    <p className="num">
                      <span data-count="17">0</span>
                    </p>
                    <p className="t-reg">
                      case studies of <br />
                      products we shipped
                    </p>
                  </div>
                </div>
                <div className="counter-cell ln lr lb">
                  <div className="in">
                    <p className="num">
                      <span data-count="12">0</span>+
                    </p>
                    <p className="t-reg">
                      industries, from <br />
                      EdTech to hospitality
                    </p>
                  </div>
                </div>
                <div className="counter-cell ln lr lb">
                  <div className="in">
                    <p className="num">
                      <span data-count="5" data-dec="1">
                        0.0
                      </span>{' '}
                      <small>of 5.0</small>
                    </p>
                    <p className="t-reg">
                      average rating from <br />
                      68 Upwork reviews
                    </p>
                  </div>
                </div>
                <div className="counter-cell ln lb">
                  <div className="in">
                    <p className="num">
                      <span data-count="100">0</span>M+
                    </p>
                    <p className="t-reg">
                      user sessions powered <br />
                      by our systems
                    </p>
                  </div>
                </div>
              </div>
              <div className="g4">
                <div className="award ln lr lb">
                  <div className="in">
                    <span className="big">
                      Top
                      <br />
                      Rated+
                    </span>
                    <p className="t-reg">
                      Top Rated Plus <br />
                      on Upwork
                    </p>
                  </div>
                </div>
                <div
                  className="award ln lb"
                  style={{ gridColumn: 'span 3', justifyContent: 'space-around' }}
                >
                  <div className="in">
                    <span className="big">$2B+</span>
                    <p className="t-reg">
                      client impact across <br />
                      the portfolio
                    </p>
                  </div>
                  <div className="in">
                    <span className="big">2024</span>
                    <p className="t-reg">
                      founded in Lahore, <br />
                      working worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <InnerFooter />
      </div>

      <nav className="menu case-menu" aria-label="Case navigation">
        <div className="menu-c">
          <TransitionLink
            href="/work"
            label="Work"
            className="mi prev"
            data-hover
            data-go="Work"
            aria-label="Previous case (opens Work)"
          >
            <span className="bg"></span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
            <span className="lbl">Prev case</span>
          </TransitionLink>
          <TransitionLink
            href="/work"
            label="Work"
            className="mi next"
            data-hover
            data-go="Work"
            aria-label="Next case (opens Work)"
          >
            <span className="bg"></span>
            <span className="lbl">Next case</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </TransitionLink>
        </div>
      </nav>
    </>
  )
}
