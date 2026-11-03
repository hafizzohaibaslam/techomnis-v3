import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | TechOmnis',
  description: 'TechOmnis Terms of Service - The terms and conditions for using our services.',
}

export default function TermsPage() {
  return (
    <main className="page" id="top">
      <div className="wrap">
        <header className="legal-header">
          <span className="eyebrow">Legal</span>
          <h1 className="h-large">Terms of Service</h1>
          <p className="t-small grey">Last updated: November 2024</p>
        </header>

        <div className="legal-content">
          <div className="placeholder-legal-notice">
            <span className="ph">This is placeholder legal copy. Please replace with actual terms of service before launch.</span>
          </div>

          <section className="legal-section">
            <h2 className="h-sub">1. Acceptance of Terms</h2>
            <p className="t-reg">
              By accessing and using the TechOmnis website and services, you accept and agree to be bound by 
              the terms and provisions of this agreement.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="h-sub">2. Services</h2>
            <p className="t-reg">
              TechOmnis provides product engineering, software development, and related consulting services. 
              Specific terms for individual projects will be outlined in separate service agreements.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="h-sub">3. Intellectual Property</h2>
            <p className="t-reg">
              Unless otherwise specified in a project agreement, all intellectual property rights for work 
              created by TechOmnis will be assigned to the client upon full payment.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="h-sub">4. Confidentiality</h2>
            <p className="t-reg">
              TechOmnis agrees to maintain the confidentiality of all client information and proprietary 
              materials shared during the course of any engagement.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="h-sub">5. Limitation of Liability</h2>
            <p className="t-reg">
              TechOmnis shall not be liable for any indirect, incidental, special, consequential, or punitive 
              damages resulting from your use of our services.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="h-sub">6. Termination</h2>
            <p className="t-reg">
              Either party may terminate a service agreement with written notice as specified in the 
              individual project contract.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="h-sub">7. Governing Law</h2>
            <p className="t-reg">
              These terms shall be governed by and construed in accordance with applicable laws.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="h-sub">8. Contact</h2>
            <p className="t-reg">
              For questions about these terms, contact us at{' '}
              <a href="mailto:hello@techomnis.com" className="ul">
                hello@techomnis.com
              </a>
              <span className="ph" style={{ marginLeft: '0.5rem' }}>Email placeholder</span>
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
