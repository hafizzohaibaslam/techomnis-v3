import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy · TechOmnis',
  description: 'How TechOmnis handles personal data sent through this website.',
}

export default function PrivacyPage() {
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
        <section className="policy" aria-label="Privacy policy">
          <div className="pol">
            <div className="blk">
              <h1>Privacy Policy</h1>
              <p>
                <span className="ph">Placeholder text, needs legal review before launch</span>
              </p>
              <p>
                Last updated: <span className="ph">Date TBC</span>
              </p>
            </div>
            <div className="blk">
              <h2>Who we are</h2>
              <p>
                TechOmnis is a product engineering team founded in Lahore in 2024. This policy
                explains what personal data we collect through this website and how we use it.
              </p>
            </div>
            <div className="blk">
              <h2>What we collect</h2>
              <p>
                When you contact us we collect the details you send, such as your name, email
                address and project details. We may also collect basic usage data, such as pages
                visited and device type.
              </p>
              <ul>
                <li>Name and email address</li>
                <li>Project details you choose to share</li>
                <li>Basic, anonymous usage data</li>
              </ul>
            </div>
            <div className="blk">
              <h2>How we use it</h2>
              <p>
                We use your details to reply to you, to prepare proposals and to deliver the work
                you ask for. We do not sell your personal data.
              </p>
            </div>
            <div className="blk">
              <h2>Cookies</h2>
              <p>
                This site may use cookies for basic functionality and anonymous analytics. You can
                block cookies in your browser settings.
              </p>
            </div>
            <div className="blk">
              <h2>How long we keep it</h2>
              <p>
                We keep enquiry data only as long as needed to answer you and to meet legal and
                accounting duties.
              </p>
            </div>
            <div className="blk">
              <h2>Your rights</h2>
              <p>
                You can ask to see, correct or delete the personal data we hold about you. Contact
                us and we will reply as soon as we can.
              </p>
            </div>
            <div className="blk">
              <h2>Contact</h2>
              <p>Questions about this policy can be sent to hello@techomnis.com.</p>
              <p>
                <span className="ph">Confirm address</span>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
