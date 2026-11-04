import type { Metadata } from 'next'
import type { ReactElement } from 'react'
import Link from 'next/link'
import { InnerHeader } from '@/components/layout/inner-header'
import { InnerFooter } from '@/components/layout/inner-footer'
import { InnerNavigation } from '@/components/layout/inner-navigation'
import { ClientsSection } from '@/components/sections/clients-section'
import { services, specialServices, buildItems } from '@/content/services'
import { reviews, scoreCards } from '@/content/reviews'

export const metadata: Metadata = {
  title: 'Services · TechOmnis',
  description:
    'MVP rescue, product engineering and AI & LLM features: what TechOmnis builds and how.',
}

function ServiceIcon({ type }: { type: string }) {
  switch (type) {
    case 'shield':
      return (
        <svg className="si" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z" />
          <path d="M8.5 12l2.4 2.4 4.6-4.8" />
        </svg>
      )
    case 'dashboard':
      return (
        <svg className="si" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9h18M9 9v11" />
        </svg>
      )
    case 'chart':
      return (
        <svg className="si" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
        </svg>
      )
    default:
      return null
  }
}

function SpecialIcon({ type }: { type: string }) {
  const icons: Record<string, ReactElement> = {
    search: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="6.5" />
        <path d="M16 16l5 5" />
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
    card: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2.5" y="5" width="19" height="14" rx="2" />
        <path d="M2.5 10h19M6 15h4" />
      </svg>
    ),
    lock: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 018 0v3" />
      </svg>
    ),
    grid: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="7.5" height="7.5" rx="1" />
        <rect x="13.5" y="3" width="7.5" height="7.5" rx="1" />
        <rect x="3" y="13.5" width="7.5" height="7.5" rx="1" />
        <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1" />
      </svg>
    ),
    bot: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="8" width="16" height="11" rx="3" />
        <path d="M12 4v4M9 13h.01M15 13h.01M9 16h6" />
      </svg>
    ),
    flask: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 001.3 2h12.4a1.5 1.5 0 001.3-2L14 9V3" />
        <path d="M7 15h10" />
      </svg>
    ),
    bell: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 16V11a6 6 0 0112 0v5l2 2H4z" />
        <path d="M10 21h4" />
      </svg>
    ),
  }
  return icons[type] || null
}

export default function ServicesPage() {
  return (
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
                <span className="eyebrow">Our services</span>
                <h1 className="h-big" data-split>
                  We turn business requirements into production-ready software.
                </h1>
                <div className="btnw">
                  <a href="#most" className="btn dn" data-hover data-btn data-go="Explore">
                    Explore
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="split" id="most" aria-label="Most popular service">
            <div className="wrap">
              <div className="g2 ln lb">
                <div className="split-l ln lr">
                  <span className="eyebrow">Most popular service</span>
                  <h2 className="h-big" data-split>
                    MVP rescue
                  </h2>
                  <p className="t-reg" data-rise>
                    Broken MVP or AI-built code? We audit it, fix it and harden it, then
                    ship it to production with monitoring and rollback.
                  </p>
                  <div className="btns" data-rise>
                    <Link
                      href="/contact"
                      className="bbtn"
                      data-hover
                      data-bbtn
                      data-go="Contact"
                    >
                      Request this service
                    </Link>
                    <Link
                      href="/services/mvp-rescue"
                      className="btn"
                      data-hover
                      data-btn
                      data-go="MVP rescue"
                    >
                      Service details
                    </Link>
                  </div>
                </div>
                <div className="center vcell">
                  <span className="cx" aria-hidden="true"></span>
                  <span className="cy" aria-hidden="true"></span>
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
                </div>
              </div>
            </div>
          </section>

          <section className="services" id="services-list" aria-label="Services">
            <div className="wrap">
              {services.map((service) => (
                <div key={service.slug} className="g2 srow ln lb">
                  <div className="sl">
                    <ServiceIcon type={service.icon} />
                    <h3 className="h-bigup">{service.name}</h3>
                    <p className="t-reg">{service.description}</p>
                  </div>
                  <div className="sright">
                    <div className="tags">
                      {service.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="chess" aria-label="Special services">
            <div className="wrap">
              <div className="g2">
                <div className="chess-title ln lr lb">
                  <span className="sub-up">HAVE SPECIFIC NEEDS?</span>
                  <h2 className="h-big" data-split>
                    Special services
                  </h2>
                  <p className="t-reg" data-rise>
                    Need one piece rather than the whole product? These are the parts
                    clients most often ask us to take on alone.
                  </p>
                </div>
                <div className="g2 g2keep">
                  {specialServices.slice(0, 4).map((item, idx) => (
                    <div
                      key={item.title}
                      className={`cell ln lb ${idx % 2 === 0 ? 'lr mr' : ''}`}
                    >
                      <div className="ch">
                        <h3 className="tt">{item.title}</h3>
                        <SpecialIcon type={item.icon} />
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
                  {specialServices.slice(4).map((item, idx) => (
                    <div
                      key={item.title}
                      className={`cell ln lb ${idx % 2 === 0 ? 'lr mr' : 'lr'}`}
                    >
                      <div className="ch">
                        <h3 className="tt">{item.title}</h3>
                        <SpecialIcon type={item.icon} />
                      </div>
                      <div className="cb">
                        <p className="t-reg grey">{item.description}</p>
                      </div>
                    </div>
                  ))}
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
                          Role, company{' '}
                          <span className="ph">Placeholder, not a real quote</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="deal" id="we-build" aria-label="What we build">
            <div className="wrap">
              <span className="vgap" aria-hidden="true"></span>
              <div className="g4 ln lt">
                <div className="deal-title ln lr lb">
                  <h2 className="h-large" data-split>
                    #we-build
                  </h2>
                </div>
                {buildItems.map((item, idx) => (
                  <div
                    key={item}
                    className={`lab ln lb ${idx < buildItems.length - 1 ? 'lr mr' : 'lr'} ${
                      item === 'Handover docs' ? 'w2' : ''
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <ClientsSection 
            showReviews={true} 
            reviews={reviews.map(r => ({ quote: r.quote, isWide: r.isWide }))}
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
    </div>
  )
}
