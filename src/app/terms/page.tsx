import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service · TechOmnis',
  description: 'Terms and conditions for using the TechOmnis website and services.',
}

export default function TermsPage() {
  return (
    <div className="page" id="page">
      <main id="main">
        <Link
          href="/"
          className="closeb"
          data-back
          data-go="Home"
          data-hover
          aria-label="Close and go to the homepage"
        >
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M2 2l12 12M14 2L2 14" fill="none" />
          </svg>
        </Link>
        <section className="policy" aria-label="Terms of service">
          <div className="pol">
            <div className="blk">
              <h1>Terms of Service</h1>
              <p>
                These terms govern your use of the TechOmnis website and our product engineering
                services.
              </p>
              <p>Last updated: 5 November 2026</p>
            </div>
            <div className="blk">
              <h2>Agreement to terms</h2>
              <p>
                By accessing or using the TechOmnis website, you agree to be bound by these Terms
                of Service. If you disagree with any part of the terms, you may not access the
                website.
              </p>
            </div>
            <div className="blk">
              <h2>Services</h2>
              <p>
                TechOmnis provides product engineering services including MVP rescue, full product
                builds and AI/LLM features. Specific terms for each engagement are defined in
                individual project agreements.
              </p>
              <ul>
                <li>MVP rescue and code audit</li>
                <li>Full product engineering</li>
                <li>AI and LLM features</li>
              </ul>
            </div>
            <div className="blk">
              <h2>Intellectual property</h2>
              <p>
                Unless otherwise agreed in writing, all intellectual property created during a
                project belongs to the client upon full payment. TechOmnis retains the right to
                use general knowledge and techniques learned during the engagement.
              </p>
            </div>
            <div className="blk">
              <h2>Limitation of liability</h2>
              <p>
                TechOmnis shall not be liable for any indirect, incidental, special, consequential
                or punitive damages resulting from your use of or inability to use the service.
              </p>
            </div>
            <div className="blk">
              <h2>Governing law</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of
                Pakistan, without regard to its conflict of law provisions.
              </p>
            </div>
            <div className="blk">
              <h2>Changes to terms</h2>
              <p>
                We reserve the right to modify or replace these terms at any time. We will provide
                notice of any changes by posting the new terms on this page.
              </p>
            </div>
            <div className="blk">
              <h2>Contact</h2>
              <p>Questions about these terms can be sent to hello@techomnis.com.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
