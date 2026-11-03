import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | TechOmnis',
  description: 'TechOmnis Privacy Policy - How we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <main className="page" id="top">
      <div className="wrap">
        <header className="legal-header">
          <span className="eyebrow">Legal</span>
          <h1 className="h-large">Privacy Policy</h1>
          <p className="t-small grey">Last updated: November 2024</p>
        </header>

        <div className="legal-content">
          <div className="placeholder-legal-notice">
            <span className="ph">This is placeholder legal copy. Please replace with actual privacy policy before launch.</span>
          </div>

          <section className="legal-section">
            <h2 className="h-sub">1. Information We Collect</h2>
            <p className="t-reg">
              We collect information you provide directly to us, such as when you fill out a contact form, 
              request a quote, or communicate with us via email.
            </p>
            <p className="t-reg">
              This may include your name, email address, company name, phone number, and any other 
              information you choose to provide.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="h-sub">2. How We Use Your Information</h2>
            <p className="t-reg">We use the information we collect to:</p>
            <ul className="legal-list">
              <li>Respond to your inquiries and provide customer service</li>
              <li>Send you project proposals and quotes</li>
              <li>Communicate with you about our services</li>
              <li>Improve our website and services</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2 className="h-sub">3. Information Sharing</h2>
            <p className="t-reg">
              We do not sell, trade, or otherwise transfer your personal information to third parties. 
              This does not include trusted third parties who assist us in operating our website or 
              conducting our business, so long as those parties agree to keep this information confidential.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="h-sub">4. Data Security</h2>
            <p className="t-reg">
              We implement a variety of security measures to maintain the safety of your personal information. 
              However, no method of transmission over the Internet or electronic storage is 100% secure.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="h-sub">5. Cookies</h2>
            <p className="t-reg">
              Our website may use cookies to enhance your experience. You can choose to have your computer 
              warn you each time a cookie is being sent, or you can choose to turn off all cookies.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="h-sub">6. Contact Us</h2>
            <p className="t-reg">
              If you have any questions about this Privacy Policy, please contact us at{' '}
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
