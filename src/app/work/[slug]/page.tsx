import { notFound } from 'next/navigation'
import { TransitionLink } from '@/components/ui/transition-link'
import type { Metadata } from 'next'
import { cases, getCaseBySlug, type CaseStudy } from '@/content/cases'
import { InnerFooter } from '@/components/layout/inner-footer'

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

  return {
    title: `${caseStudy.name} case study · TechOmnis`,
    description: `${caseStudy.name}: ${caseStudy.description} A TechOmnis case study.`,
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
        data-ph={!caseStudy.hasPage ? true : undefined}
        data-go={caseStudy.name}
        aria-label={`${caseStudy.name} case study${!caseStudy.hasPage ? ' (page coming soon)' : ''}`}
      >
        <CaseArt gradient={caseStudy.gradient} rotation={caseStudy.rotation} />
        <div className="dark"></div>
        <span className="more" aria-hidden="true">
          Read more
        </span>
        <span className="ph phtag">Product shot placeholder</span>
      </TransitionLink>
      <div className="case-meta">
        <h3 className="h-small">
          <span className="ul">{caseStudy.name}</span>
        </h3>
        {caseStudy.metric && (
          <div className="case-stat">
            <span className="num">{caseStudy.metric.value}</span>
            <p className="t-reg">{caseStudy.metric.label}</p>
            {caseStudy.metric.placeholder && <span className="ph">Placeholder</span>}
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
  const relatedCases = cases.filter((c, i) => i !== currentIndex && c.hasPage).slice(0, 2)

  return (
    <>
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
                {caseStudy.description}
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
              <span className="ph phtag">Product shot placeholder</span>
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
                    {caseStudy.description}{' '}
                    <span className="ph">Extended description placeholder</span>
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
                          Why we built {caseStudy.name} and the problem it solves for its users.{' '}
                          <span className="ph">Placeholder</span>
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
                          Built the product end to end: the chat experience, the retrieval pipeline
                          and the Stripe subscription tiers.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="qrow ln lb">
                    <div className="ch">
                      <div className="qt2">
                        <h3 className="tt">What users say</h3>
                        <a href="#" className="cap3 grey" data-ph>
                          <span className="ul" style={{ ['--ulh' as string]: '1px' }}>
                            Review source
                          </span>
                        </a>
                      </div>
                      <svg
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                        style={{
                          width: '3.33rem',
                          height: '3.33rem',
                          fill: 'none',
                          stroke: '#D2D2D2',
                          strokeWidth: 1.2,
                        }}
                      >
                        <path d="M5 40V25C5 15 10 9 20 7v6c-5 1.5-8 5-8 10h8v17z" />
                        <path d="M27 40V25c0-10 5-16 15-18v6c-5 1.5-8 5-8 10h8v17z" />
                      </svg>
                    </div>
                    <div className="qbody">
                      <p className="t-reg t-bold">
                        &quot;Verbatim user or customer quote about {caseStudy.name} goes
                        here.&quot;
                      </p>
                      <p className="t-reg grey">
                        Name, role <span className="ph">Placeholder, not a real quote</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="about-g res" aria-label="Results">
            <div className="wrap" style={{ height: '100%' }}>
              <div className="g2 ln lb" style={{ height: '100%' }}>
                <div className="g2 g2keep ln lr">
                  <div className="ncell ln lr lb mr">
                    <p className="num">xN</p>
                    <p className="t-reg">
                      Key outcome for {caseStudy.name}, to confirm{' '}
                      <span className="ph">Placeholder</span>
                    </p>
                  </div>
                  <div className="ncell ln lb">
                    <p className="num">
                      XX<small>%</small>
                    </p>
                    <p className="t-reg">
                      Second outcome, to confirm <span className="ph">Placeholder</span>
                    </p>
                  </div>
                  <div className="chartc ln lr mr">
                    <div className="t">
                      <h3 className="eyebrow">Usage trend</h3>
                      <p className="t-small grey">
                        Data source TBC <span className="ph">Placeholder</span>
                      </p>
                    </div>
                    <svg viewBox="0 0 260 150" aria-hidden="true" preserveAspectRatio="none">
                      <path
                        d="M0 140 L30 128 L60 132 L90 110 L120 114 L150 90 L180 96 L210 60 L240 52 L260 30"
                        fill="none"
                        stroke="#5B6CFF"
                        strokeWidth="2"
                      />
                      <g stroke="#EDEDED">
                        <line x1="0" y1="149" x2="260" y2="149" />
                        <line x1="0" y1="100" x2="260" y2="100" />
                        <line x1="0" y1="50" x2="260" y2="50" />
                      </g>
                    </svg>
                  </div>
                  <div className="chartc">
                    <div className="t">
                      <h3 className="eyebrow">Subscriptions</h3>
                      <p className="t-small grey">
                        Data source TBC <span className="ph">Placeholder</span>
                      </p>
                    </div>
                    <svg viewBox="0 0 260 150" aria-hidden="true" preserveAspectRatio="none">
                      <g fill="#C9B8FF">
                        <rect x="8" y="110" width="22" height="40" />
                        <rect x="44" y="88" width="22" height="62" />
                        <rect x="80" y="95" width="22" height="55" />
                        <rect x="116" y="70" width="22" height="80" />
                        <rect x="152" y="54" width="22" height="96" />
                        <rect x="188" y="40" width="22" height="110" />
                        <rect x="224" y="22" width="22" height="128" />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="achieved">
                  <span className="eyebrow">What we achieved</span>
                  <p className="h-medium">
                    Result statement for {caseStudy.name} goes here, backed by a real number.{' '}
                    <span className="ph">Placeholder</span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="tagline" aria-label="Product">
            <h2 className="h-xl" data-split>
              Product
            </h2>
            <div className="tags xl" data-rise>
              <span className="tag">Chat experience</span>
              <span className="tag">Knowledge base</span>
              <span className="tag">Onboarding</span>
              <span className="tag">Subscription tiers</span>
            </div>
          </section>

          <section className="wrap cshot" data-rise>
            <div className="ph-img" style={{ height: '58.4rem' }}>
              <CaseArt gradient={caseStudy.gradient} rotation={-6} />
              <span className="ph">Screenshot placeholder</span>
            </div>
            <p className="t-reg">Chat interface. Caption placeholder.</p>
          </section>

          <section className="wrap cshot two" data-rise>
            <div className="pair">
              <div>
                <div className="ph-img" style={{ height: '40rem', position: 'relative' }}>
                  <div
                    className="art"
                    style={{
                      background: `linear-gradient(135deg, ${caseStudy.gradient[0]}, ${caseStudy.gradient[1]})`,
                    }}
                  >
                    <div
                      className="scr"
                      style={{
                        left: '10%',
                        top: '18%',
                        width: '46%',
                        height: '88%',
                        transform: 'rotate(4deg)',
                      }}
                    >
                      <i style={{ top: '16%' }}></i>
                      <i style={{ top: '24%', right: '40%' }}></i>
                      <b
                        style={{
                          left: '8%',
                          right: '8%',
                          top: '36%',
                          height: '36%',
                          background: caseStudy.gradient[1],
                          opacity: 0.55,
                        }}
                      ></b>
                    </div>
                    <div
                      className="scr"
                      style={{
                        left: '52%',
                        top: '28%',
                        width: '38%',
                        height: '80%',
                        transform: 'rotate(4deg)',
                      }}
                    >
                      <i style={{ top: '18%' }}></i>
                      <b
                        style={{
                          left: '8%',
                          width: '38%',
                          top: '30%',
                          height: '24%',
                          background: caseStudy.gradient[1],
                        }}
                      ></b>
                      <i style={{ top: '64%' }}></i>
                      <i style={{ top: '72%', right: '30%' }}></i>
                    </div>
                  </div>
                  <span className="ph">Screenshot placeholder</span>
                </div>
              </div>
              <div>
                <div className="ph-img" style={{ height: '40rem', position: 'relative' }}>
                  <div
                    className="art"
                    style={{
                      background: `linear-gradient(135deg, ${caseStudy.gradient[0]}, ${caseStudy.gradient[1]})`,
                    }}
                  >
                    <div
                      className="scr"
                      style={{
                        left: '10%',
                        top: '18%',
                        width: '46%',
                        height: '88%',
                        transform: 'rotate(4deg)',
                      }}
                    >
                      <i style={{ top: '16%' }}></i>
                      <i style={{ top: '24%', right: '40%' }}></i>
                      <b
                        style={{
                          left: '8%',
                          right: '8%',
                          top: '36%',
                          height: '36%',
                          background: caseStudy.gradient[1],
                          opacity: 0.55,
                        }}
                      ></b>
                    </div>
                    <div
                      className="scr"
                      style={{
                        left: '52%',
                        top: '28%',
                        width: '38%',
                        height: '80%',
                        transform: 'rotate(4deg)',
                      }}
                    >
                      <i style={{ top: '18%' }}></i>
                      <b
                        style={{
                          left: '8%',
                          width: '38%',
                          top: '30%',
                          height: '24%',
                          background: caseStudy.gradient[1],
                        }}
                      ></b>
                      <i style={{ top: '64%' }}></i>
                      <i style={{ top: '72%', right: '30%' }}></i>
                    </div>
                  </div>
                  <span className="ph">Screenshot placeholder</span>
                </div>
              </div>
            </div>
            <p className="t-reg">Knowledge base upload · Bot settings</p>
          </section>

          <section className="tagline" aria-label="Engineering">
            <h2 className="h-xl" data-split>
              Engineering
            </h2>
            <div className="tags xl" data-rise>
              <span className="tag">Retrieval pipeline</span>
              <span className="tag">Vector search</span>
              <span className="tag">Prompt pipelines</span>
              <span className="tag">Cost control</span>
              <span className="tag">Evals</span>
            </div>
          </section>

          <section className="wrap cshot" data-rise>
            <div className="ph-img" style={{ height: '58.4rem' }}>
              <div
                className="art"
                style={{
                  background: `linear-gradient(135deg, #F3F3F7, ${caseStudy.gradient[1]})`,
                }}
              >
                <div
                  className="scr"
                  style={{
                    left: '10%',
                    top: '18%',
                    width: '46%',
                    height: '88%',
                    transform: 'rotate(-6deg)',
                  }}
                >
                  <i style={{ top: '16%' }}></i>
                  <i style={{ top: '24%', right: '40%' }}></i>
                  <b
                    style={{
                      left: '8%',
                      right: '8%',
                      top: '36%',
                      height: '36%',
                      background: caseStudy.gradient[1],
                      opacity: 0.55,
                    }}
                  ></b>
                </div>
                <div
                  className="scr"
                  style={{
                    left: '52%',
                    top: '28%',
                    width: '38%',
                    height: '80%',
                    transform: 'rotate(-6deg)',
                  }}
                >
                  <i style={{ top: '18%' }}></i>
                  <b
                    style={{
                      left: '8%',
                      width: '38%',
                      top: '30%',
                      height: '24%',
                      background: caseStudy.gradient[1],
                    }}
                  ></b>
                  <i style={{ top: '64%' }}></i>
                  <i style={{ top: '72%', right: '30%' }}></i>
                </div>
              </div>
              <span className="ph">Screenshot placeholder</span>
            </div>
            <p className="t-reg">Retrieval pipeline overview. Caption placeholder.</p>
          </section>

          <section className="tagline" aria-label="Billing">
            <h2 className="h-xl" data-split>
              Billing
            </h2>
            <div className="tags xl" data-rise>
              <span className="tag">Stripe</span>
              <span className="tag">Subscription tiers</span>
              <span className="tag">Webhooks</span>
            </div>
          </section>

          <section className="wrap cshot" data-rise>
            <div className="ph-img" style={{ height: '58.4rem' }}>
              <CaseArt gradient={['#151515', '#5B6CFF']} rotation={-6} />
              <span className="ph">Screenshot placeholder</span>
            </div>
            <p className="t-reg">Plans and checkout. Caption placeholder.</p>
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
                      <span data-count="17">17</span>
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
                      <span data-count="12">12</span>+
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
                        5.0
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
                      $<span data-count="300">300</span>K+
                    </p>
                    <p className="t-reg">
                      earned on Upwork <br />
                      as Top Rated Plus
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
