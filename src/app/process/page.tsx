import type { Metadata } from 'next'
import { TransitionLink } from '@/components/ui/transition-link'
import { InnerHeader } from '@/components/layout/inner-header'
import { InnerFooter } from '@/components/layout/inner-footer'
import { InnerNavigation } from '@/components/layout/inner-navigation'
import { LinkedInIcon, UpworkIcon } from '@/components/ui/icons'

export const metadata: Metadata = {
  title: 'Process · TechOmnis',
  description:
    'How TechOmnis works: audit, build and ship, then measure and repeat. A delivery plan and the ways we engage.',
}

function VennDiagram() {
  return (
    <svg
      className="venn"
      viewBox="0 0 276 287"
      role="img"
      aria-label="Audit, Build and Ship overlap in production-ready software"
    >
      <g fill="none" stroke="#8f8f8f" strokeWidth=".8">
        <circle cx="138" cy="78" r="70" />
        <circle cx="85" cy="170" r="70" />
        <circle cx="191" cy="170" r="70" />
      </g>
      <line
        x1="138"
        y1="140"
        x2="138"
        y2="252"
        stroke="#555"
        strokeWidth=".8"
        strokeDasharray="3 3"
      />
      <circle cx="138" cy="140" r="3" fill="#222" />
      <text x="138" y="62" textAnchor="middle">
        AUDIT
      </text>
      <text x="60" y="173" textAnchor="middle">
        SHIP
      </text>
      <text x="216" y="173" textAnchor="middle">
        BUILD
      </text>
      <text x="138" y="272" textAnchor="middle">
        PRODUCTION-READY SOFTWARE HERE
      </text>
    </svg>
  )
}

function ProcessIcon({ type }: { type: 'cycle' | 'trophy' | 'winner' }) {
  if (type === 'cycle') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 12a8 8 0 01-14 5.3M4 12a8 8 0 0114-5.3" />
        <path d="M18 3v4h-4M6 21v-4h4" />
      </svg>
    )
  }
  if (type === 'trophy') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="15" r="5" />
        <path d="M8.5 11L6 3h4l2 5 2-5h4l-2.5 8" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 4h10v5a5 5 0 01-10 0z" />
      <path d="M7 6H4a3 3 0 003 4M17 6h3a3 3 0 01-3 4M12 14v4M8 21h8" />
    </svg>
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

export default function ProcessPage() {
  return (
    <>
      <div className="page" id="page">
        <main id="main">
          <section className="start ihero" id="top" aria-label="Introduction">
            <div className="wrap">
              <InnerHeader />
              <div className="topic">
                <span className="eyebrow">Our process</span>
                <h1 className="h-big" data-split>
                  Audit. Build. Ship. Then we measure and repeat.
                </h1>
                <div className="btnw">
                  <a href="#loop" className="btn dn" data-hover data-btn data-go="Explore">
                    Explore
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="venn-sec" id="loop" aria-label="Audit, build, ship">
            <div className="wrap" style={{ height: '100%' }}>
              <div className="center vcell ln lb">
                <span className="cx" aria-hidden="true"></span>
                <span className="cy" aria-hidden="true"></span>
                <VennDiagram />
              </div>
              <div className="vsteps ln lb">
                <div>
                  <h3>Step 1: Audit</h3>
                  <p className="t-reg">
                    We read the repo, infra and data, then rank every risk. You get a clear fix
                    plan.
                  </p>
                </div>
                <div>
                  <h3>Step 2: Build</h3>
                  <p className="t-reg">
                    We fix, harden and build what is missing, with tests for every change.
                  </p>
                </div>
                <div>
                  <h3>Step 3: Ship</h3>
                  <p className="t-reg">
                    Production deploy with monitoring and rollback, then we measure and repeat.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="prows" aria-label="Process comparison">
            <div className="wrap">
              <div className="pr-row ln lb">
                <div className="pr-head">
                  <ProcessIcon type="cycle" />
                  <h3 className="h-bigup">Build-only process</h3>
                </div>
                <p className="t-reg">
                  Many teams jump straight into code. It can work for small changes, but risks
                  found later cost more to fix.
                </p>
                <div className="pr-units" data-rise>
                  <div className="pr-grp">
                    <div className="pr-cells">
                      <span>Specs</span>
                      <span>Code</span>
                      <span>Handover</span>
                    </div>
                    <div className="pr-bar">Build</div>
                  </div>
                </div>
              </div>

              <div className="pr-row ln lb">
                <div className="pr-head">
                  <ProcessIcon type="trophy" />
                  <h3 className="h-bigup">Audit-first process</h3>
                </div>
                <p className="t-reg">
                  A fixed-fee audit comes before any build work. You see the risks and get a clear
                  fix plan, so the build stays focused.
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
                </div>
              </div>

              <div className="pr-row ln lb">
                <div className="pr-head">
                  <ProcessIcon type="winner" />
                  <h3 className="h-bigup">Audit. Build. Ship.</h3>
                  <span className="best">How we work</span>
                </div>
                <p className="t-reg">
                  Our default loop. We ship to production with monitoring and rollback, then
                  measure every fix and feed it back into the next build.
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

          <section className="plan-sec" id="plan" aria-label="Delivery plan">
            <div className="wrap">
              <div className="plan-top">
                <span className="eyebrow">Working steps example</span>
                <h2 className="h-large" data-split>
                  Delivery plan
                </h2>
                <p className="t-reg" data-rise>
                  An example of the steps in an MVP rescue. Every project gets its own plan, but
                  most follow this shape.
                </p>
              </div>
              <div className="ptab ln lt lb">
                <div className="pt-h pt-l ln lb" style={{ ['--o' as string]: 1 }}>
                  <h3 className="h-small">Audit</h3>
                </div>
                <div className="pt-h pt-b ln ll lb" style={{ ['--o' as string]: 8 }}>
                  <h3 className="h-small">Build</h3>
                </div>
                <div className="pt-h pt-s ln ll lb" style={{ ['--o' as string]: 11 }}>
                  <h3 className="h-small">Ship</h3>
                </div>
                <div className="pt-k ln lb" style={{ ['--o' as string]: 2 }}>
                  <p className="pk">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
                    </svg>
                    Repo
                  </p>
                </div>
                <div className="pt-k ln lb" style={{ ['--o' as string]: 4 }}>
                  <p className="pk">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="16" rx="2" />
                      <path d="M3 9h18M9 9v11" />
                    </svg>
                    Infra
                  </p>
                </div>
                <div className="pt-k ln lb" style={{ ['--o' as string]: 6 }}>
                  <p className="pk">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
                    </svg>
                    Data
                  </p>
                </div>
                <div className="pt-k pt-b ln ll lb" style={{ ['--o' as string]: 9 }}>
                  <p className="pk">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 19l4-1 10-10a2.1 2.1 0 00-3-3L6 15z" />
                      <path d="M14 7l3 3" />
                    </svg>
                    Implementation
                  </p>
                </div>
                <div className="pt-k pt-s ln ll lb" style={{ ['--o' as string]: 12 }}>
                  <p className="pk">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 15c-1.5 1.5-2 4-2 6 2 0 4.5-.5 6-2M9 15l-3-3c1.5-4.5 5-9 13-9 0 8-4.5 11.5-9 13z" />
                      <circle cx="15" cy="9" r="1.6" />
                    </svg>
                    Release
                  </p>
                </div>
                <div className="pt-v" style={{ ['--o' as string]: 3 }}>
                  <ul>
                    <li>Code audit</li>
                    <li>AI-code clean-up</li>
                    <li>Test coverage</li>
                    <li>Bug triage</li>
                  </ul>
                </div>
                <div className="pt-v" style={{ ['--o' as string]: 5 }}>
                  <ul>
                    <li>CI/CD</li>
                    <li>Auth &amp; secrets</li>
                    <li>Error monitoring</li>
                    <li>Core Web Vitals</li>
                  </ul>
                </div>
                <div className="pt-v" style={{ ['--o' as string]: 7 }}>
                  <ul>
                    <li>Database clean-up</li>
                    <li>Security review</li>
                    <li>Current state review</li>
                    <li>Risk report</li>
                  </ul>
                </div>
                <div className="pt-v pt-b ln ll" style={{ ['--o' as string]: 10 }}>
                  <ul>
                    <li>Fix plan delivery</li>
                    <li>Stabilise and harden</li>
                    <li>Roles &amp; auth</li>
                    <li>Stripe billing</li>
                    <li>Dashboards</li>
                    <li>RAG and AI features</li>
                    <li>Tests for every fix</li>
                  </ul>
                </div>
                <div className="pt-v pt-s ln ll" style={{ ['--o' as string]: 13 }}>
                  <ul>
                    <li>Production deploy</li>
                    <li>Monitoring</li>
                    <li>Rollback plan</li>
                    <li>Before and after metrics</li>
                    <li>Launch checklist</li>
                    <li>Handover docs</li>
                  </ul>
                </div>
              </div>
              <p className="plan-note ln lb">
                * Every project needs its own plan. This is an example and is adapted to your
                product, team and deadlines.
              </p>
            </div>
          </section>

          <section className="split h672 apph" aria-label="Ways of working">
            <div className="wrap">
              <div className="g2 ln lb">
                <div className="split-l ln lr">
                  <span className="eyebrow">How will we do it?</span>
                  <h2 className="h-large" data-split>
                    Ways of working
                  </h2>
                  <p className="t-reg" data-rise>
                    Based on the state of your product, its size and the deadline, we pick the
                    engagement that fits.
                  </p>
                </div>
                <div className="vcell dar">
                  <span className="cy" aria-hidden="true" style={{ left: '50%' }}></span>
                  <span className="cx" aria-hidden="true"></span>
                  <svg className="darrow" viewBox="0 0 600 20" aria-hidden="true">
                    <path
                      d="M8 10H592M16 3L8 10l8 7M584 3l8 7-8 7"
                      fill="none"
                      stroke="#222"
                      strokeWidth="1.2"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </section>

          <section className="apprs" aria-label="Engagement types">
            <div className="wrap">
              <div className="g2">
                <div className="appr ln lr ln lb">
                  <svg viewBox="0 0 370 224" aria-hidden="true">
                    <text x="0" y="10" fontSize="10">
                      One audit
                    </text>
                    <line x1="0" y1="22" x2="365" y2="22" />
                    <path d="M359 18l6 4-6 4" />
                    <rect x="0" y="22" width="360" height="160" />
                    <line x1="120" y1="22" x2="120" y2="182" />
                    <line x1="240" y1="22" x2="240" y2="182" />
                    <line x1="0" y1="182" x2="365" y2="182" />
                    <path d="M359 178l6 4-6 4" />
                    <line x1="0" y1="178" x2="0" y2="186" />
                    <text x="0" y="200" textAnchor="middle" fontSize="9">
                      Code
                    </text>
                    <line x1="120" y1="178" x2="120" y2="186" />
                    <text x="120" y="200" textAnchor="middle" fontSize="9">
                      Infra
                    </text>
                    <line x1="240" y1="178" x2="240" y2="186" />
                    <text x="240" y="200" textAnchor="middle" fontSize="9">
                      Data
                    </text>
                  </svg>
                  <h3 className="h-medium">Fixed-fee audit</h3>
                  <p className="t-reg">
                    A one-off review of the repo, infra and data at a fixed price. You get a ranked
                    risk list and a fix plan.
                  </p>
                </div>
                <div className="appr r ln lb">
                  <svg viewBox="0 0 370 224" aria-hidden="true">
                    <text x="0" y="10" fontSize="10">
                      Module 1
                    </text>
                    <line x1="0" y1="24" x2="365" y2="24" />
                    <path d="M359 20l6 4-6 4" />
                    <line x1="0" y1="20" x2="0" y2="28" />
                    <text x="0" y="42" textAnchor="middle" fontSize="9">
                      Audit
                    </text>
                    <line x1="170" y1="20" x2="170" y2="28" />
                    <text x="170" y="42" textAnchor="middle" fontSize="9">
                      Fix
                    </text>
                    <line x1="340" y1="20" x2="340" y2="28" />
                    <text x="340" y="42" textAnchor="middle" fontSize="9">
                      Ship
                    </text>
                    <text x="0" y="76" fontSize="10">
                      Module 2
                    </text>
                    <line x1="0" y1="90" x2="365" y2="90" />
                    <path d="M359 86l6 4-6 4" />
                    <line x1="0" y1="86" x2="0" y2="94" />
                    <text x="0" y="108" textAnchor="middle" fontSize="9">
                      Audit
                    </text>
                    <line x1="170" y1="86" x2="170" y2="94" />
                    <text x="170" y="108" textAnchor="middle" fontSize="9">
                      Fix
                    </text>
                    <line x1="340" y1="86" x2="340" y2="94" />
                    <text x="340" y="108" textAnchor="middle" fontSize="9">
                      Ship
                    </text>
                    <text x="0" y="142" fontSize="10">
                      Module 3
                    </text>
                    <line x1="0" y1="156" x2="365" y2="156" />
                    <path d="M359 152l6 4-6 4" />
                    <line x1="0" y1="152" x2="0" y2="160" />
                    <text x="0" y="174" textAnchor="middle" fontSize="9">
                      Audit
                    </text>
                    <line x1="170" y1="152" x2="170" y2="160" />
                    <text x="170" y="174" textAnchor="middle" fontSize="9">
                      Fix
                    </text>
                    <line x1="340" y1="152" x2="340" y2="160" />
                    <text x="340" y="174" textAnchor="middle" fontSize="9">
                      Ship
                    </text>
                  </svg>
                  <h3 className="h-medium">MVP rescue</h3>
                  <p className="t-reg">
                    We split a broken product into modules and take each one through audit, fix and
                    ship, so value lands early.
                  </p>
                </div>
                <div className="appr ln lr ln lb">
                  <svg viewBox="0 0 370 224" aria-hidden="true">
                    <text x="0" y="10" fontSize="10">
                      Product build
                    </text>
                    <rect x="0" y="22" width="360" height="160" />
                    <line x1="72" y1="22" x2="72" y2="182" />
                    <line x1="144" y1="22" x2="144" y2="182" />
                    <line x1="216" y1="22" x2="216" y2="182" />
                    <line x1="288" y1="22" x2="288" y2="182" />
                    <line x1="0" y1="182" x2="365" y2="182" />
                    <path d="M359 178l6 4-6 4" />
                    <line x1="0" y1="178" x2="0" y2="186" />
                    <text x="0" y="200" textAnchor="middle" fontSize="9">
                      Scope
                    </text>
                    <line x1="72" y1="178" x2="72" y2="186" />
                    <text x="72" y="200" textAnchor="middle" fontSize="9">
                      Design
                    </text>
                    <line x1="144" y1="178" x2="144" y2="186" />
                    <text x="144" y="200" textAnchor="middle" fontSize="9">
                      Build
                    </text>
                    <line x1="216" y1="178" x2="216" y2="186" />
                    <text x="216" y="200" textAnchor="middle" fontSize="9">
                      Test
                    </text>
                    <line x1="288" y1="178" x2="288" y2="186" />
                    <text x="288" y="200" textAnchor="middle" fontSize="9">
                      Launch
                    </text>
                  </svg>
                  <h3 className="h-medium">Full product build</h3>
                  <p className="t-reg">
                    Design and engineering of the whole product, from the first sketch to billing
                    and launch, by one senior team.
                  </p>
                </div>
                <div className="appr r ln lb">
                  <svg viewBox="0 0 370 224" aria-hidden="true">
                    <text x="0" y="10" fontSize="10">
                      Feature 1
                    </text>
                    <text x="190" y="10" fontSize="10">
                      Feature 2
                    </text>
                    <rect x="0" y="22" width="170" height="160" />
                    <rect x="190" y="22" width="170" height="160" />
                    <line x1="56" y1="22" x2="56" y2="182" />
                    <line x1="246" y1="22" x2="246" y2="182" />
                    <line x1="0" y1="182" x2="170" y2="182" />
                    <line x1="0" y1="178" x2="0" y2="186" />
                    <text x="0" y="200" textAnchor="middle" fontSize="9">
                      Prototype
                    </text>
                    <line x1="56" y1="178" x2="56" y2="186" />
                    <text x="56" y="200" textAnchor="middle" fontSize="9">
                      Evals
                    </text>
                    <line x1="112" y1="178" x2="112" y2="186" />
                    <text x="112" y="200" textAnchor="middle" fontSize="9">
                      Prod
                    </text>
                    <line x1="190" y1="182" x2="360" y2="182" />
                    <line x1="190" y1="178" x2="190" y2="186" />
                    <text x="190" y="200" textAnchor="middle" fontSize="9">
                      Prototype
                    </text>
                    <line x1="246" y1="178" x2="246" y2="186" />
                    <text x="246" y="200" textAnchor="middle" fontSize="9">
                      Evals
                    </text>
                    <line x1="302" y1="178" x2="302" y2="186" />
                    <text x="302" y="200" textAnchor="middle" fontSize="9">
                      Prod
                    </text>
                  </svg>
                  <h3 className="h-medium">AI features</h3>
                  <p className="t-reg">
                    LLM features go from prototype to evals to production, measured and priced so
                    they stay affordable.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="split" aria-label="Need more details">
            <div className="wrap">
              <div className="g2 ln lb">
                <div className="split-l ln lr">
                  <span className="eyebrow">Not enough information?</span>
                  <h2 className="h-large" data-split>
                    Need more details?
                  </h2>
                  <p className="t-reg" data-rise>
                    If you want more detail on any step, or a plan for your own product, we are
                    happy to walk you through it.
                  </p>
                  <div className="btnw" data-rise>
                    <TransitionLink
                      href="/contact"
                      label="Contact"
                      className="btn"
                      data-hover
                      data-btn
                      data-go="Contact"
                    >
                      Let&apos;s start a live conversation
                    </TransitionLink>
                  </div>
                </div>
                <div className="center vcell">
                  <span className="cx" aria-hidden="true"></span>
                  <span className="cy" aria-hidden="true"></span>
                  <svg
                    className="dia chart"
                    viewBox="0 0 330 330"
                    style={{ width: '31rem', height: '31rem' }}
                    role="img"
                    aria-label="Chart: the value of each step grows over time"
                  >
                    <g stroke="#222" strokeWidth="1" fill="none">
                      <path d="M40 10V290H325" />
                      <path d="M60 270 C140 250 210 200 260 120" strokeWidth="1.4" />
                    </g>
                    <g fill="#222">
                      <circle cx="60" cy="270" r="2.5" />
                      <circle cx="260" cy="120" r="2.5" />
                    </g>
                    <g fontSize="8" letterSpacing=".5">
                      <text x="40" y="306">
                        FIRST FIX
                      </text>
                      <text x="170" y="306" textAnchor="middle">
                        STABLE
                      </text>
                      <text x="325" y="306" textAnchor="end">
                        FULL VALUE
                      </text>
                      <text transform="translate(28 290) rotate(-90)">AUDIT</text>
                      <text transform="translate(28 150) rotate(-90)" textAnchor="middle">
                        BUILD
                      </text>
                      <text transform="translate(28 10) rotate(-90)" textAnchor="end">
                        SHIP
                      </text>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </section>

          <section id="why" className="why" aria-label="Why us">
            <div className="wrap">
              <div className="g2 top">
                <div className="why-left ln lr lb">
                  <div className="ttl">
                    <span className="eyebrow">Leadership team</span>
                    <h2 className="h-large" data-split>
                      Why us
                    </h2>
                  </div>
                  <p className="t-reg">
                    One senior team across UI, API, LLM, data and infra. We think like product
                    owners and ship like engineers, so the whole system works end to end.
                  </p>
                  <div className="btnw">
                    <TransitionLink href="/about" label="About" className="btn" data-hover data-btn data-go="About">
                      Read more about us
                    </TransitionLink>
                  </div>
                </div>
                <div className="g2 prof">
                  <div className="profile ln lr lb">
                    <div className="avatar" role="img" aria-label="Photo placeholder for Zohaib Aslam">
                      ZA
                    </div>
                    <p className="nm">Zohaib Aslam</p>
                    <p className="cap">Founder, TechOmnis</p>
                    <p className="t-reg bio">
                      Founded TechOmnis in 2024. Top Rated Plus on Upwork with 5.0 from 68 reviews
                      and $300K+ earned.
                    </p>
                    <TransitionLink href="/about#team" label="About" className="read t-reg" data-go="About">
                      <span className="ul">Read details</span>
                    </TransitionLink>
                    <span className="foot psoc">
                      <a
                        href="#"
                        data-ph
                        data-hover
                        aria-label="Zohaib Aslam on LinkedIn (link to be added)"
                      >
                        <LinkedInIcon />
                      </a>
                      <a
                        href="#"
                        data-ph
                        data-hover
                        aria-label="Zohaib Aslam on Upwork (link to be added)"
                      >
                        <UpworkIcon />
                      </a>
                      <span className="ph">Photo + links placeholder</span>
                    </span>
                  </div>
                  <div className="profile ln lb">
                    <div className="avatar" role="img" aria-label="Photo placeholder for Zohaib Mehmood">
                      ZM
                    </div>
                    <p className="nm">Zohaib Mehmood</p>
                    <p className="cap">Team lead, TechOmnis</p>
                    <p className="t-reg bio">
                      Leads delivery across the engineering team. <span className="ph">Bio placeholder</span>
                    </p>
                    <TransitionLink href="/about#team" label="About" className="read t-reg" data-go="About">
                      <span className="ul">Read details</span>
                    </TransitionLink>
                    <span className="foot psoc">
                      <a
                        href="#"
                        data-ph
                        data-hover
                        aria-label="Zohaib Mehmood on LinkedIn (link to be added)"
                      >
                        <LinkedInIcon />
                      </a>
                      <span className="ph">Placeholder</span>
                    </span>
                  </div>
                </div>
              </div>

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
