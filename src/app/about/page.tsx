import type { Metadata } from 'next'
import type { ReactElement } from 'react'
import Image from 'next/image'
import { TransitionLink } from '@/components/ui/transition-link'
import { InnerHeader } from '@/components/layout/inner-header'
import { InnerFooter } from '@/components/layout/inner-footer'
import { InnerNavigation } from '@/components/layout/inner-navigation'
import { LinkedInIcon, UpworkIcon } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import { WorldMap } from '@/components/sections/world-map'
import { ClientsSection } from '@/components/sections/clients-section'
import { BreadcrumbSchema } from '@/components/schema/breadcrumb'
import { team, mindsetItems, quotes } from '@/content/team'
import { reviews, scoreCards } from '@/content/reviews'

export const metadata: Metadata = {
  title: 'About TechOmnis — Founder-Led Product Studio',
  description:
    'TechOmnis is a founder-led product studio founded in 2024. 17 case studies across 12+ industries, built for teams in the US, UK and UAE.',
  openGraph: {
    title: 'About TechOmnis — Founder-Led Product Studio',
    description:
      'TechOmnis is a founder-led product studio founded in 2024. 17 case studies across 12+ industries, built for teams in the US, UK and UAE.',
    url: 'https://techomnis.com/about',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'TechOmnis — Product Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About TechOmnis — Founder-Led Product Studio',
    description:
      'TechOmnis is a founder-led product studio founded in 2024. 17 case studies across 12+ industries, built for teams in the US, UK and UAE.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://techomnis.com/about',
  },
}

function MindsetIcon({ type }: { type: string }) {
  const icons: Record<string, ReactElement> = {
    target: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.3" />
      </svg>
    ),
    users: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5" />
        <path d="M16 4.6a3.5 3.5 0 010 6.8M18.5 14.8c1.7.8 2.7 2.6 3 5.2" />
      </svg>
    ),
    rocket: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 15c-1.5 1.5-2 4-2 6 2 0 4.5-.5 6-2M9 15l-3-3c1.5-4.5 5-9 13-9 0 8-4.5 11.5-9 13z" />
        <circle cx="15" cy="9" r="1.6" />
      </svg>
    ),
    gauge: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3.5 17a9 9 0 1117 0" />
        <path d="M12 13l4-5" />
        <circle cx="12" cy="13" r="1.2" />
      </svg>
    ),
    search: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="6.5" />
        <path d="M16 16l5 5" />
      </svg>
    ),
    bot: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="8" width="16" height="11" rx="3" />
        <path d="M12 4v4M9 13h.01M15 13h.01M9 16h6" />
      </svg>
    ),
    doc: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v4h4M9 12h6M9 16h6" />
      </svg>
    ),
    info: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v6M12 7.5v.5" />
      </svg>
    ),
  }
  return icons[type] || null
}

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://techomnis.com' },
          { name: 'About', url: 'https://techomnis.com/about' },
        ]}
      />
      <div className="inner">
        <a className="skip" href="#main">
          Skip to content
        </a>
      <div className="page" id="page">
        <main id="main">
          <section className="start ihero" id="top" aria-label="Introduction">
            <div className="wrap">
              <InnerHeader />
              <div className="topic">
                <span className="eyebrow">About us</span>
                <h1 className="h-big w1029" data-split>
                  One senior team that ships the whole product, end to end.
                </h1>
                <div className="btnw">
                  <Button href="#team" className="dn" data-go="Leadership team">
                    Leadership team
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className="team" id="team" aria-label="Leadership team">
            <div className="wrap">
              <div className="g2 ln lb" style={{ height: '100%' }}>
                {team.map((member, idx) => (
                  <article
                    key={member.name}
                    className={`titem ${idx % 2 === 1 ? 'r' : ''} ${idx === 0 ? 'ln lr' : ''}`}
                  >
                    <div className="ttop">
                      {member.image ? (
                        <div 
                          className="tphoto-img" 
                          aria-label={`Photo of ${member.name}`}
                          style={{ backgroundColor: member.bgColor || '#EDEDEB', position: 'relative' }}
                        >
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            sizes="(max-width: 1023px) 30vw, 17rem"
                            style={{ objectFit: 'cover', objectPosition: 'top', borderRadius: '0.5rem' }}
                          />
                        </div>
                      ) : (
                        <div
                          className="tphoto"
                          role="img"
                          aria-label={member.name}
                        >
                          {member.initials}
                        </div>
                      )}
                      <div className="tyears">
                        <p className="num">{member.metric.value}</p>
                        <p className="t-reg">{member.metric.label}</p>
                        {idx === 0 && (
                          <span className="tbadge" aria-hidden="true">
                            TR+
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="tabout">
                      <div>
                        <h3 className="h-small">{member.name}</h3>
                        <p className="eyebrow role">{member.role}</p>
                      </div>
                      <div className="bio">
                        {member.bio.map((para, i) => (
                          <p key={i} className="t-reg">{para}</p>
                        ))}
                      </div>
                      <div className="prof">
                        <p className="t-reg">Proficient in:</p>
                        <div className="tags">
                          {member.skills.map((skill) => (
                            <span key={skill} className="tag">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="tsoc">
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-hover
                            aria-label={`${member.name} on LinkedIn`}
                          >
                            <LinkedInIcon />
                          </a>
                        )}
                        {member.upwork && (
                          <a
                            href={member.upwork}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-hover
                            aria-label={`${member.name} on Upwork`}
                          >
                            <UpworkIcon />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="chess" aria-label="Our mindset">
            <div className="wrap">
              <div className="g2">
                <div className="chess-title ln lr lb">
                  <span className="sub-up">HOW WE THINK</span>
                  <h2 className="h-big" data-split>
                    Our mindset
                  </h2>
                  <p className="t-reg" data-rise>
                    How we work with clients, in a few plain rules. They shape every audit,
                    build and handover.
                  </p>
                </div>
                <div className="g2 g2keep">
                  {mindsetItems.slice(0, 4).map((item, idx) => (
                    <div
                      key={item.title}
                      className={`cell ln lb ${idx % 2 === 0 ? 'lr mr' : ''}`}
                    >
                      <div className="ch">
                        <h3 className="tt s">{item.title}</h3>
                        <MindsetIcon type={item.icon} />
                      </div>
                      <div className="cb">
                        <p className="t-reg grey">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="g2">
                <div className="g2 g2keep">
                  {mindsetItems.slice(4).map((item, idx) => (
                    <div key={item.title} className={`cell ln lb ${idx % 2 === 0 ? 'lr mr' : 'lr'}`}>
                      <div className="ch">
                        <h3 className="tt s">{item.title}</h3>
                        <MindsetIcon type={item.icon} />
                      </div>
                      <div className="cb">
                        <p className="t-reg grey">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="qcell ln lb" data-slider>
                  <div className="qtop">
                    <p className="t-reg t-bold">We share the same views:</p>
                    <div className="dots" role="group" aria-label="Choose a quote">
                      {quotes.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          aria-label={`Quote ${i + 1}`}
                          aria-pressed="false"
                          data-hover
                          className={i === 0 ? 'on' : ''}
                        ></button>
                      ))}
                    </div>
                  </div>
                  <div className="qslides" aria-live="polite">
                    {quotes.map((quote, i) => (
                      <div key={i} className={`qslide ${i === 0 ? 'on' : ''}`}>
                        <p className="h-medium">&quot;{quote.text}&quot;</p>
                        <div className="qauth">
                          <span className="av" aria-hidden="true">
                            {quote.initials}
                          </span>
                          <div>
                            <p className="h-sub">{quote.author}</p>
                            <p className="t-small grey">{quote.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="split" aria-label="Our superpower">
            <div className="wrap">
              <div className="g2 ln lb">
                <div className="split-l ln lr">
                  <span className="eyebrow">Our superpower</span>
                  <h2 className="h-big" data-split>
                    We own the whole system
                  </h2>
                  <p className="t-reg" data-rise>
                    UI, API, LLM, data and infra sit with one senior team. That is how the
                    parts fit together and the product works end to end.
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
                      Let&apos;s talk
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
                <div className="pyr-wrap vcell pyr-vcell">
                  {/* Central vertical guide - extends full OUTER canvas height via CSS */}
                  <span className="pyr-guide-line" aria-hidden="true"></span>
                  <svg
                    className="pyr-diagram"
                    viewBox="0 0 352 260"
                    role="img"
                    aria-label="One team across five layers: UI, API, LLM, data and infra"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    {/* Triangle: 229w × 197h, ratio 0.86, centered at x=176 */}
                    {/* Draw as 3 separate lines to ensure all edges render completely */}
                    {/* Left edge: apex to bottom-left */}
                    <line className="pyr-edge pyr-edge-left" x1="176" y1="30" x2="61.5" y2="227" stroke="#222" strokeWidth="1" />
                    {/* Right edge: apex to bottom-right */}
                    <line className="pyr-edge pyr-edge-right" x1="176" y1="30" x2="290.5" y2="227" stroke="#222" strokeWidth="1" />
                    {/* Base: bottom-left to bottom-right */}
                    <line className="pyr-edge pyr-edge-base" x1="61.5" y1="227" x2="290.5" y2="227" stroke="#222" strokeWidth="1" />

                    {/* 4 tier lines - UXIS proportions: top tier 35%, others ~16% each */}
                    {/* y=99: 35% from apex */}
                    <line className="pyr-tier" x1="136" y1="99" x2="216" y2="99" stroke="#222" strokeWidth="1" />
                    {/* y=130: 51% from apex (divider position) */}
                    <line className="pyr-tier" x1="117" y1="130" x2="235" y2="130" stroke="#222" strokeWidth="1" />
                    {/* y=162: 67% from apex */}
                    <line className="pyr-tier" x1="99" y1="162" x2="253" y2="162" stroke="#222" strokeWidth="1" />
                    {/* y=194: 83% from apex */}
                    <line className="pyr-tier" x1="81" y1="194" x2="271" y2="194" stroke="#222" strokeWidth="1" />

                    {/* Horizontal black divider at tier 2/3 boundary */}
                    <line className="pyr-divider" x1="12" y1="130" x2="340" y2="130" stroke="#222" strokeWidth="1" />

                    {/* Tier labels - Top 2 bolder */}
                    <g className="pyr-labels" textAnchor="middle" fill="#222">
                      <text className="pyr-label-top" x="176" y="72" fontSize="12" fontWeight="600">UI</text>
                      <text className="pyr-label-top" x="176" y="118" fontSize="12" fontWeight="600">API</text>
                      <text x="176" y="150" fontSize="11" fontWeight="500">LLM</text>
                      <text x="176" y="182" fontSize="11" fontWeight="500">Data</text>
                      <text x="176" y="214" fontSize="11" fontWeight="500">Infra</text>
                    </g>

                    {/* Left annotation - top */}
                    <g className="pyr-ann pyr-ann-lt">
                      <g transform="translate(18, 42)">
                        <path d="M0 4 L8 0 L16 4 V6 H14 V14 H2 V6 H0 Z" fill="none" stroke="#222" strokeWidth="1.2" />
                        <line x1="4" y1="10" x2="12" y2="10" stroke="#222" strokeWidth="1" />
                        <line x1="4" y1="12" x2="12" y2="12" stroke="#222" strokeWidth="1" />
                      </g>
                      <text x="26" y="74" fontSize="9" fill="#555">
                        <tspan x="26" textAnchor="middle">Full-stack</tspan>
                        <tspan x="26" dy="11" textAnchor="middle">ownership</tspan>
                        <tspan x="26" dy="11" textAnchor="middle">here</tspan>
                      </text>
                    </g>

                    {/* Right annotation - top: clear of triangle, right-aligned */}
                    {/* At y~55, right edge is at x~190, so start text at x=205 min */}
                    <g className="pyr-ann pyr-ann-rt">
                      <text x="345" y="50" fontSize="9" textAnchor="end" fill="#222">
                        <tspan x="345" fontWeight="600" fontSize="10">unified team</tspan>
                        <tspan x="345" dy="12" fontWeight="400" fill="#555">handles all</tspan>
                        <tspan x="345" dy="11" fontWeight="400" fill="#555">layers</tspan>
                      </text>
                    </g>

                    {/* Left annotation - bottom: aligned with right annotation */}
                    <g className="pyr-ann pyr-ann-lb">
                      <g transform="translate(10, 188)">
                        <circle cx="8" cy="8" r="9" fill="none" stroke="#222" strokeWidth="1.2" />
                        <path d="M4 8 L7 11 L12 5" fill="none" stroke="#222" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <text x="26" y="224" fontSize="9" fill="#555">
                        <tspan x="26" textAnchor="middle">No handoffs</tspan>
                        <tspan x="26" dy="11" textAnchor="middle">between</tspan>
                        <tspan x="26" dy="11" textAnchor="middle">vendors</tspan>
                      </text>
                    </g>

                    {/* Right annotation - bottom: positioned well BELOW tier 4 for clearance */}
                    {/* At y=215, right edge at x~284, text at x=345 gives safe 20px+ margin */}
                    <g className="pyr-ann pyr-ann-rb">
                      <text x="345" y="215" fontSize="9" textAnchor="end" fill="#222">
                        <tspan x="345" fontWeight="600" fontSize="10">one team</tspan>
                        <tspan x="345" dy="12" fontWeight="400" fill="#555">means fewer</tspan>
                        <tspan x="345" dy="11" fontWeight="400" fill="#555">gaps</tspan>
                      </text>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </section>

          <WorldMap />

          <ClientsSection 
            showReviews={true} 
            reviews={reviews.map(r => ({ quote: r.quote, clientName: r.clientName, isPlaceholder: r.isPlaceholder, isWide: r.isWide }))}
            scoreCards={scoreCards}
          />

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
                      $<span data-count="2">0</span>B+
                    </p>
                    <p className="t-reg">
                      client impact across <br />
                      the portfolio
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
                    <span className="big">5.0</span>
                    <p className="t-reg">
                      68 Upwork reviews, <br />
                      perfect rating
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
      </div>
    </>
  )
}
