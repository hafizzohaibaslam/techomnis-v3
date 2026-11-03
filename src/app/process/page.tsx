import type { Metadata } from 'next'
import { processSteps } from '@/content/company'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Our Process | TechOmnis',
  description:
    'How we work: Discovery, Strategy, Design, Development, Launch, and Scale. Our proven process for delivering exceptional digital products.',
  openGraph: {
    title: 'Our Process | TechOmnis',
    description: 'How we work: Our proven process for delivering exceptional digital products.',
    type: 'website',
  },
}

function ProcessStep({ step, index }: { step: (typeof processSteps)[0]; index: number }) {
  const isEven = index % 2 === 0
  return (
    <div className={`process-step-card ln lb ${isEven ? 'lr' : ''}`}>
      <div className="step-header">
        <span className="step-number-lg h-large">{step.number}</span>
        <h3 className="h-medium">{step.title}</h3>
      </div>
      <p className="t-reg step-desc">{step.description}</p>
      <ul className="step-details">
        {step.details.map((detail, i) => (
          <li key={i} className="t-small">
            {detail}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ProcessPage() {
  return (
    <main className="page" id="top">
      <div className="wrap">
        <header className="process-header">
          <span className="eyebrow">How We Work</span>
          <h1 className="h-large" data-split>
            Our Process
          </h1>
          <p className="t-reg process-intro">
            A proven methodology refined over 60+ projects. Clear milestones, predictable timelines,
            and no surprises.
          </p>
        </header>

        <section className="process-steps g2">
          {processSteps.map((step, index) => (
            <ProcessStep key={step.number} step={step} index={index} />
          ))}
        </section>

        {/* Key Principles */}
        <section className="principles ln lt lb">
          <h2 className="h-bigup">Key Principles</h2>
          <div className="principles-grid g4">
            <div className="principle ln lr lb">
              <h3 className="h-sub">Transparency</h3>
              <p className="t-reg grey">
                Weekly updates, shared project boards, and open communication channels.
              </p>
            </div>
            <div className="principle ln lr lb">
              <h3 className="h-sub">Quality First</h3>
              <p className="t-reg grey">
                Code reviews, automated testing, and thorough QA on every feature.
              </p>
            </div>
            <div className="principle ln lr lb">
              <h3 className="h-sub">Agile Delivery</h3>
              <p className="t-reg grey">
                2-week sprints with working software at the end of each iteration.
              </p>
            </div>
            <div className="principle ln lb">
              <h3 className="h-sub">Partnership</h3>
              <p className="t-reg grey">
                We're not just vendors. We think like co-founders and care about your success.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="typical-timeline">
          <h2 className="h-bigup">Typical Timelines</h2>
          <div className="timeline-grid g4">
            <div className="timeline-item ln lb lr">
              <span className="h-medium">2-4 weeks</span>
              <p className="t-reg">MVP / Prototype</p>
              <p className="t-small grey">Validate ideas quickly</p>
            </div>
            <div className="timeline-item ln lb lr">
              <span className="h-medium">2-3 months</span>
              <p className="t-reg">Web Application</p>
              <p className="t-small grey">Full-featured launch</p>
            </div>
            <div className="timeline-item ln lb lr">
              <span className="h-medium">3-4 months</span>
              <p className="t-reg">Mobile App</p>
              <p className="t-small grey">iOS & Android</p>
            </div>
            <div className="timeline-item ln lb">
              <span className="h-medium">4-6 months</span>
              <p className="t-reg">Complex Platform</p>
              <p className="t-small grey">Enterprise-grade</p>
            </div>
          </div>
          <p className="t-small grey timeline-note">
            * Actual timelines depend on project scope and complexity. We provide detailed estimates after discovery.
          </p>
        </section>

        {/* CTA */}
        <section className="process-cta center ln lt lb">
          <h2 className="h-medium">Ready to start?</h2>
          <p className="t-reg grey">
            Let's discuss your project and create a tailored plan.
          </p>
          <div className="btnw">
            <Button href="/contact">Get in touch</Button>
          </div>
        </section>
      </div>
    </main>
  )
}
