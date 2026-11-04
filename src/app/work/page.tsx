import type { Metadata } from 'next'
import Link from 'next/link'
import { InnerHeader } from '@/components/layout/inner-header'
import { InnerFooter } from '@/components/layout/inner-footer'
import { InnerNavigation } from '@/components/layout/inner-navigation'
import { cases } from '@/content/cases'

export const metadata: Metadata = {
  title: 'Work · TechOmnis',
  description:
    '17 case studies across 12+ industries: MVP rescue, product engineering and AI products shipped by TechOmnis.',
}

function CaseArt({
  gradient,
  darkTheme,
  rotation,
}: {
  gradient: [string, string]
  darkTheme?: boolean
  rotation: number
}) {
  const bgColor = darkTheme ? '#2B2F36' : ''
  return (
    <div
      className="art"
      style={{ background: `linear-gradient(135deg,${gradient[0]},${gradient[1]})` }}
    >
      <div
        className="scr"
        style={{
          left: '6%',
          top: '16%',
          width: '30%',
          height: '78%',
          transform: `rotate(${rotation}deg)`,
          background: bgColor || undefined,
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
          background: bgColor || undefined,
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
          background: bgColor || undefined,
        }}
      >
        <i style={{ top: '20%' }}></i>
        <i style={{ top: '30%', right: '20%' }}></i>
        <b
          style={{
            left: '8%',
            right: '8%',
            top: '44%',
            height: '14%',
            background: '#222',
          }}
        ></b>
      </div>
    </div>
  )
}

function AwardIcon() {
  return (
    <svg className="awi" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 4h10v5a5 5 0 01-10 0z" />
      <path d="M7 6H4a3 3 0 003 4M17 6h3a3 3 0 01-3 4M12 14v4M8 21h8" />
    </svg>
  )
}

export default function WorkPage() {
  return (
    <div className="inner">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="page" id="page">
        <main id="main">
          <section className="start" id="top" aria-label="Work">
            <div className="wrap">
              <InnerHeader />
              <h1 className="sr">Our work: case studies</h1>
            </div>
          </section>

          <section className="plist" aria-label="Case studies">
            <div className="wrap">
              {cases.map((caseItem, idx) => (
                <article key={caseItem.slug} className="pitem feature ln lb">
                  {caseItem.hasPage ? (
                    <Link
                      href={`/work/${caseItem.slug}`}
                      className="media"
                      data-media
                      data-go={caseItem.name}
                      aria-label={`${caseItem.name} case study`}
                    >
                      <CaseArt
                        gradient={caseItem.gradient}
                        darkTheme={caseItem.darkTheme}
                        rotation={caseItem.rotation ?? (idx % 2 === 0 ? -6 : 5)}
                      />
                      <div className="dark"></div>
                      <span className="more" aria-hidden="true">
                        Read more
                      </span>
                      <span className="ph phtag">Product shot placeholder</span>
                    </Link>
                  ) : (
                    <a
                      href="#"
                      className="media"
                      data-media
                      data-ph
                      aria-label={`${caseItem.name} case study (page coming soon)`}
                    >
                      <CaseArt
                        gradient={caseItem.gradient}
                        darkTheme={caseItem.darkTheme}
                        rotation={caseItem.rotation ?? (idx % 2 === 0 ? -6 : 5)}
                      />
                      <div className="dark"></div>
                      <span className="more" aria-hidden="true">
                        Read more
                      </span>
                      <span className="ph phtag">Product shot placeholder</span>
                    </a>
                  )}
                  <div className="feature-row">
                    <div className="nm">
                      <h2 className="h-medium">
                        <span className="ul">{caseItem.name}</span>
                      </h2>
                      <div className="tags">
                        {caseItem.tags.map((tag) => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="ov">
                      <div className="desc">
                        <p className="h-sub">{caseItem.category}</p>
                        <p className="t-reg">
                          {caseItem.description}{' '}
                          {caseItem.category === 'Project type' && (
                            <span className="ph">Placeholder</span>
                          )}
                        </p>
                      </div>
                      {caseItem.quote && (
                        <div className="met q ln ll">
                          <p className="t-reg t-bold">
                            &quot;{caseItem.quote.text}&quot;
                          </p>
                          <p className="t-small grey">
                            {caseItem.quote.author}, {caseItem.quote.role}{' '}
                            {caseItem.quote.placeholder && (
                              <span className="ph">Placeholder</span>
                            )}
                          </p>
                        </div>
                      )}
                      {caseItem.award && !caseItem.metric && (
                        <div className="met aw ln ll">
                          <AwardIcon />
                          <p className="t-reg">
                            {caseItem.award} <span className="ph">Placeholder</span>
                          </p>
                        </div>
                      )}
                      {caseItem.metric && (
                        <div className="met stat ln ll">
                          <span className="num">{caseItem.metric.value}</span>
                          <p className="t-reg">
                            {caseItem.metric.label}{' '}
                            {caseItem.metric.placeholder && (
                              <span className="ph">Placeholder</span>
                            )}
                          </p>
                        </div>
                      )}
                      {!caseItem.quote && !caseItem.metric && !caseItem.award && <div></div>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="split nda" aria-label="More case studies">
            <div className="wrap">
              <div className="g2 ln lb">
                <div className="split-l nda-l ln lr">
                  <span className="eyebrow">17 case studies</span>
                  <h2 className="h-large" data-split>
                    12+ industries
                  </h2>
                  <p className="t-reg">
                    Three further case studies sit behind the 14 above. We can walk you
                    through them on a call.
                  </p>
                  <div className="tags big" data-rise>
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
                </div>
                <div className="g2 g2keep pcells">
                  <div className="cell pcell ln lr mr lb mb">
                    <div className="ch">
                      <div>
                        <p className="cap2">Case study 15</p>
                        <p className="h-sub2">Industry TBC</p>
                      </div>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M3 3l18 18M10.6 5.1A10 10 0 0112 5c6.4 0 10 7 10 7a17 17 0 01-3.2 4M6.5 6.6C3.7 8.4 2 12 2 12s3.6 7 10 7a9.6 9.6 0 004.6-1.2" />
                        <path d="M9.9 9.9a3 3 0 004.2 4.2" />
                      </svg>
                    </div>
                    <div className="cb">
                      <p className="t-reg grey">
                        Short description of the project and what we shipped.{' '}
                        <span className="ph">Placeholder</span>
                      </p>
                    </div>
                  </div>
                  <div className="cell pcell ln lb mb">
                    <div className="ch">
                      <div>
                        <p className="cap2">Case study 16</p>
                        <p className="h-sub2">Industry TBC</p>
                      </div>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M3 3l18 18M10.6 5.1A10 10 0 0112 5c6.4 0 10 7 10 7a17 17 0 01-3.2 4M6.5 6.6C3.7 8.4 2 12 2 12s3.6 7 10 7a9.6 9.6 0 004.6-1.2" />
                        <path d="M9.9 9.9a3 3 0 004.2 4.2" />
                      </svg>
                    </div>
                    <div className="cb">
                      <p className="t-reg grey">
                        Short description of the project and what we shipped.{' '}
                        <span className="ph">Placeholder</span>
                      </p>
                    </div>
                  </div>
                  <div className="cell pcell ln lr mr">
                    <div className="ch">
                      <div>
                        <p className="cap2">Case study 17</p>
                        <p className="h-sub2">Industry TBC</p>
                      </div>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M3 3l18 18M10.6 5.1A10 10 0 0112 5c6.4 0 10 7 10 7a17 17 0 01-3.2 4M6.5 6.6C3.7 8.4 2 12 2 12s3.6 7 10 7a9.6 9.6 0 004.6-1.2" />
                        <path d="M9.9 9.9a3 3 0 004.2 4.2" />
                      </svg>
                    </div>
                    <div className="cb">
                      <p className="t-reg grey">
                        Short description of the project and what we shipped.{' '}
                        <span className="ph">Placeholder</span>
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className="cell pcell ln"
                    data-go="Contact"
                    data-hover
                  >
                    <div className="ch">
                      <div>
                        <p className="cap2">Your product</p>
                        <p className="h-sub2">Next case</p>
                      </div>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M5 15c-1.5 1.5-2 4-2 6 2 0 4.5-.5 6-2M9 15l-3-3c1.5-4.5 5-9 13-9 0 8-4.5 11.5-9 13z" />
                        <circle cx="15" cy="9" r="1.6" />
                      </svg>
                    </div>
                    <div className="cb">
                      <p className="t-reg grey">
                        Tell us about the product you need shipped or rescued.
                      </p>
                    </div>
                  </Link>
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
      <InnerNavigation />
    </div>
  )
}
