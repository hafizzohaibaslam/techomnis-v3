import { notFound } from 'next/navigation'
import type { ReactElement } from 'react'
import { TransitionLink } from '@/components/ui/transition-link'
import type { Metadata } from 'next'
import { services, getServiceBySlug } from '@/content/services'
import { cases, type CaseStudy } from '@/content/cases'
import { InnerHeader } from '@/components/layout/inner-header'
import { InnerFooter } from '@/components/layout/inner-footer'
import { InnerNavigation } from '@/components/layout/inner-navigation'

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
    return { title: 'Service Not Found · TechOmnis' }
  }

  return {
    title: `${service.name} · TechOmnis`,
    description: `${service.name} by TechOmnis: ${service.description}`,
  }
}

function SpiralDiagram() {
  return (
    <svg
      className="dia spiral"
      viewBox="0 0 632 329"
      style={{ width: '43.9rem', height: '22.85rem' }}
      role="img"
      aria-label="MVP rescue loop: audit, fix plan, stabilise, test, ship, monitor"
    >
      <path
        d="M316 164 C316 140 344 132 360 146 C382 166 366 204 330 210 C282 218 254 174 270 136 C290 88 360 76 404 104 C460 140 456 222 396 254 C320 294 222 262 196 190 C166 106 236 36 330 30 C430 24 520 76 560 150 L620 190"
        fill="none"
        stroke="#222"
        strokeWidth="1"
      />
      <g fill="#fff" stroke="#222" strokeWidth="1.2">
        <circle cx="360" cy="146" r="5" />
        <circle cx="270" cy="136" r="5" />
        <circle cx="404" cy="104" r="5" />
        <circle cx="396" cy="254" r="5" />
        <circle cx="196" cy="190" r="5" />
        <circle cx="560" cy="150" r="5" />
      </g>
      <circle cx="316" cy="164" r="6" fill="#fff" stroke="#222" strokeWidth="1.4" />
      <g fontSize="13">
        <text x="370" y="142">
          Audit
        </text>
        <text x="214" y="131">
          Fix plan
        </text>
        <text x="414" y="100">
          Stabilise
        </text>
        <text x="406" y="270">
          Test
        </text>
        <text x="130" y="194">
          Ship
        </text>
        <text x="530" y="134">
          Monitor
        </text>
      </g>
    </svg>
  )
}

function CaseArt({ gradient, rotation = -5 }: { gradient: [string, string]; rotation?: number }) {
  return (
    <div className="art" style={{ background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }}>
      <div
        className="scr"
        style={{
          left: '10%',
          top: '18%',
          width: '46%',
          height: '88%',
          transform: `rotate(${rotation}deg)`,
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
            background: gradient[1],
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
          transform: `rotate(${rotation}deg)`,
        }}
      >
        <i style={{ top: '18%' }}></i>
        <b
          style={{
            left: '8%',
            width: '38%',
            top: '30%',
            height: '24%',
            background: gradient[1],
          }}
        ></b>
        <i style={{ top: '64%' }}></i>
        <i style={{ top: '72%', right: '30%' }}></i>
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

function LoopArrow() {
  return (
    <div className="loop">
      <svg
        className="loopsvg"
        viewBox="0 0 100 30"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M83.3 2 V20 H50 V4"
          fill="none"
          stroke="#9a9a9a"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <svg className="loophead" viewBox="0 0 10 10" aria-hidden="true">
        <path d="M2 6l3-4 3 4" fill="none" stroke="#9a9a9a" strokeWidth="1.2" />
      </svg>
      <i className="loopdot" aria-hidden="true"></i>
    </div>
  )
}

const cellIcons: Record<string, ReactElement> = {
  search: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l5 5" />
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 018 0v3" />
    </svg>
  ),
  flag: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 21V4M5 4h11l-2 4 2 4H5" />
    </svg>
  ),
  flask: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 001.3 2h12.4a1.5 1.5 0 001.3-2L14 9V3" />
      <path d="M7 15h10" />
    </svg>
  ),
  branch: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="9" r="2.5" />
      <path d="M6 8.5v7M18 11.5c0 3-3 3.5-6 3.5H8.5" />
    </svg>
  ),
  bell: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 16V11a6 6 0 0112 0v5l2 2H4z" />
      <path d="M10 21h4" />
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4M9 12h6M9 16h6" />
    </svg>
  ),
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const relatedCases = cases.slice(0, 2)

  return (
    <>
      <div className="page" id="page">
        <main id="main">
          <section className="start ihero" id="top" aria-label="Introduction">
            <div className="wrap">
              <InnerHeader />
              <div className="topic">
                <span className="eyebrow">Service · {service.name}</span>
                <h1 className="h-big" data-split>
                  {service.description.split('.')[0]}.
                </h1>
                <div className="btnw">
                  <a href="#how" className="btn dn" data-hover data-btn data-go="Explore">
                    Explore
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="split" id="how" aria-label="How it works">
            <div className="wrap">
              <div className="g2 ln lb">
                <div className="split-l ln lr">
                  <span className="eyebrow">How it works</span>
                  <h2 className="h-big" data-split>
                    Audit, stabilise, ship
                  </h2>
                  <p className="t-reg" data-rise>
                    A fixed-fee audit comes first, so you see every risk and a clear fix plan
                    before any build work starts. Then we fix, harden and ship to production.
                  </p>
                  <div className="btns" data-rise>
                    <TransitionLink
                      href="/contact"
                      label="Contact"
                      className="bbtn"
                      data-hover
                      data-bbtn
                      data-go="Contact"
                    >
                      Request this service
                    </TransitionLink>
                    <TransitionLink
                      href="/process"
                      label="Process"
                      className="btn"
                      data-hover
                      data-btn
                      data-go="Process"
                    >
                      Explore the process
                    </TransitionLink>
                  </div>
                </div>
                <div className="center vcell">
                  <span className="cx" aria-hidden="true"></span>
                  <span className="cy" aria-hidden="true"></span>
                  <SpiralDiagram />
                </div>
              </div>
            </div>
          </section>

          <section className="prows" aria-label="How an MVP rescue runs">
            <div className="wrap">
              <div className="pr-row ln lb">
                <div className="pr-head">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 4h10v5a5 5 0 01-10 0z" />
                    <path d="M7 6H4a3 3 0 003 4M17 6h3a3 3 0 01-3 4M12 14v4M8 21h8" />
                  </svg>
                  <h3 className="h-bigup">Audit. Build. Ship.</h3>
                  <span className="best">How we work</span>
                </div>
                <p className="t-reg">
                  Every rescue starts with a fixed-fee audit. Then we stabilise and build, ship to
                  production with monitoring and rollback, and measure every fix.
                </p>
                <div className="pr-units" data-rise>
                  <div className="pr-grp">
                    <div className="pr-cells">
                      <span>Code audit</span>
                      <span>Risk review</span>
                      <span>Fix plan</span>
                    </div>
                    <div className="pr-bar">Audit</div>
                  </div>
                  <div className="pr-grp">
                    <div className="pr-cells">
                      <span>Stabilise</span>
                      <span>Build</span>
                      <span>Test</span>
                    </div>
                    <div className="pr-bar">Build</div>
                  </div>
                  <div className="pr-grp">
                    <div className="pr-cells">
                      <span>Deploy</span>
                      <span>Monitor</span>
                      <span>Metrics</span>
                    </div>
                    <div className="pr-bar">Ship</div>
                  </div>
                </div>
                <LoopArrow />
              </div>
            </div>
          </section>

          <section className="chess" aria-label="What is included">
            <div className="wrap">
              <div className="g2">
                <div className="chess-title ln lr lb">
                  <span className="sub-up">WHAT&apos;S INCLUDED</span>
                  <h2 className="h-big" data-split>
                    Everything a rescue needs
                  </h2>
                  <p className="t-reg" data-rise>
                    The parts of an MVP rescue. Most projects need all of them, some need only a
                    few.
                  </p>
                </div>
                <div className="g2 g2keep">
                  <div className="cell ln lb lr mr">
                    <div className="ch">
                      <h3 className="tt">Code audit</h3>
                      {cellIcons.search}
                    </div>
                    <div className="cb">
                      <p className="t-reg grey">
                        We read the repo, infra and data, then rank every risk in a written report.
                      </p>
                    </div>
                  </div>
                  <div className="cell ln lb">
                    <div className="ch">
                      <h3 className="tt">AI-code clean-up</h3>
                      {cellIcons.code}
                    </div>
                    <div className="cb">
                      <p className="t-reg grey">
                        Code written by AI tools gets reviewed, refactored and covered by tests.
                      </p>
                    </div>
                  </div>
                  <div className="cell ln lb lr mr">
                    <div className="ch">
                      <h3 className="tt">Auth &amp; secrets</h3>
                      {cellIcons.lock}
                    </div>
                    <div className="cb">
                      <p className="t-reg grey">
                        Sign-in, roles and secrets are checked and fixed before real users arrive.
                      </p>
                    </div>
                  </div>
                  <div className="cell ln lb">
                    <div className="ch">
                      <h3 className="tt">Bug triage</h3>
                      {cellIcons.flag}
                    </div>
                    <div className="cb">
                      <p className="t-reg grey">
                        Open bugs are ranked by impact, so the worst ones are fixed first.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="g2">
                <div className="g2 g2keep">
                  <div className="cell ln lb lr mr">
                    <div className="ch">
                      <h3 className="tt">Test coverage</h3>
                      {cellIcons.flask}
                    </div>
                    <div className="cb">
                      <p className="t-reg grey">
                        Tests for the critical paths, so every fix stays fixed.
                      </p>
                    </div>
                  </div>
                  <div className="cell ln lb lr">
                    <div className="ch">
                      <h3 className="tt">CI/CD</h3>
                      {cellIcons.branch}
                    </div>
                    <div className="cb">
                      <p className="t-reg grey">
                        Pipelines, preview deploys and rollback, so every change ships the same
                        way.
                      </p>
                    </div>
                  </div>
                  <div className="cell ln lb lr mr">
                    <div className="ch">
                      <h3 className="tt">Error monitoring</h3>
                      {cellIcons.bell}
                    </div>
                    <div className="cb">
                      <p className="t-reg grey">
                        Alerts and dashboards in production, with before and after metrics for
                        every fix.
                      </p>
                    </div>
                  </div>
                  <div className="cell ln lb lr">
                    <div className="ch">
                      <h3 className="tt">Handover docs</h3>
                      {cellIcons.doc}
                    </div>
                    <div className="cb">
                      <p className="t-reg grey">
                        Docs and a launch checklist, so your team can own the code after we leave.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="qcell ln lb">
                  <div>
                    <svg
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                      style={{
                        width: '3.33rem',
                        height: '3.33rem',
                        fill: 'none',
                        stroke: '#D2D2D2',
                        strokeWidth: 1.2,
                        marginBottom: '2.86rem',
                      }}
                    >
                      <path d="M5 40V25C5 15 10 9 20 7v6c-5 1.5-8 5-8 10h8v17z" />
                      <path d="M27 40V25c0-10 5-16 15-18v6c-5 1.5-8 5-8 10h8v17z" />
                    </svg>
                    <p className="h-medium">
                      &quot;Verbatim client quote about a special project goes here.&quot;
                    </p>
                    <div className="qauth">
                      <span className="av" aria-hidden="true">
                        ?
                      </span>
                      <div>
                        <p className="h-sub">Client name</p>
                        <p className="t-small grey">
                          Role, company <span className="ph">Placeholder, not a real quote</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="disc" aria-label="Related work">
            <div className="wrap">
              <div className="disc-head ln lb">
                <h2 className="h-big" data-split>
                  Related work
                </h2>
                <div className="btnw">
                  <TransitionLink href="/work" label="Work" className="btn" data-hover data-btn data-go="Work">
                    All projects
                  </TransitionLink>
                </div>
              </div>
              <div className="g2">
                {relatedCases.map((caseStudy, i) => (
                  <RelatedCase key={caseStudy.slug} caseStudy={caseStudy} isRight={i === 1} />
                ))}
              </div>
              <div className="allp">
                <TransitionLink href="/work" label="Work" className="btn" data-hover data-btn data-go="Work">
                  All projects
                </TransitionLink>
              </div>
            </div>
          </section>

          <section id="clients" aria-label="Our clients">
            <div className="wrap">
              <div className="g2">
                <div className="intro ln lr lb nb">
                  <span className="eyebrow">We built for</span>
                  <h2 className="h-large" data-split>
                    Our clients
                  </h2>
                  <p className="t-reg">
                    From global brands and campaigns to venture-backed startups that need an MVP
                    shipped or rescued.
                  </p>
                  <span className="ph">Logo files to be supplied</span>
                </div>
                <div className="g2 g2keep">
                  <div className="client ln lt lr lb mr">
                    <span className="nm">Disney</span>
                  </div>
                  <div className="client ln lt lb">
                    <span className="nm">GLAAD</span>
                  </div>
                  <div className="client ln lr lb mr">
                    <span className="nm">Six Senses</span>
                  </div>
                  <div className="client ln lb">
                    <span className="nm">
                      Mucker
                      <br />
                      Capital
                    </span>
                  </div>
                </div>
              </div>
              <div className="g2">
                <div className="g2 g2keep">
                  <div className="client ln lr lb mr">
                    <span className="nm">Edulog</span>
                  </div>
                  <div className="client ln lr lb">
                    <span className="nm">
                      Biden
                      <br />
                      campaign
                      <small>via Authentic</small>
                    </span>
                  </div>
                  <div className="client ln lr lb mr">
                    <span className="nm">Archyr</span>
                  </div>
                  <div className="client ln lr lb">
                    <span className="nm">Waivs.ai</span>
                  </div>
                </div>
                <div className="domains ln lb">
                  <h3 className="h-small">Business domains</h3>
                  <p className="t-reg">
                    We have shipped products across 12+ industries, including:
                  </p>
                  <div className="tags big">
                    <span className="tag">AI</span>
                    <span className="tag">SaaS</span>
                    <span className="tag">Marketplaces</span>
                    <span className="tag">EdTech</span>
                    <span className="tag">Student transportation</span>
                    <span className="tag">Hospitality</span>
                    <span className="tag">Media &amp; entertainment</span>
                    <span className="tag">Non-profit</span>
                    <span className="tag">Venture capital</span>
                    <span className="tag">Political campaigns</span>
                  </div>
                  <p style={{ marginTop: '1.43rem' }}>
                    <span className="ph">Full industry list to confirm</span>
                  </p>
                </div>
              </div>
            </div>
          </section>

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
                      $<span data-count="300">0</span>K+
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

      <InnerNavigation />
    </>
  )
}
