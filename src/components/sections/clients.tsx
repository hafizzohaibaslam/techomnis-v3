import Image from 'next/image'
import {
  clientsRow1,
  clientsRow2Left,
  businessDomains,
  type Client,
} from '@/content/clients'

function ClientCell({ client, className }: { client: Client; className?: string }) {
  return (
    <div className={`client-cell ${className || ''}`}>
      <div className="client-logo">
        <Image
          src={client.logo}
          alt={client.name}
          width={320}
          height={120}
          className="logo-img"
          unoptimized
        />
        {client.subtitle && <small className="client-sub">{client.subtitle}</small>}
      </div>
    </div>
  )
}

export function Clients() {
  return (
    <section id="clients" aria-label="Our clients">
      <div className="wrap">
        <div className="clients-grid">
          {/* Row 1: Intro (left) | First 4 logos (right) */}
          <div className="clients-intro ln lt lr lb">
            <span className="eyebrow">We built for</span>
            <h2 className="h-large" data-split>
              Our clients
            </h2>
            <p className="t-reg">
              From global brands and campaigns to venture-backed startups that need an MVP
              shipped or rescued.
            </p>
          </div>
          <div className="clients-logos ln lt lb">
            {clientsRow1.map((client, idx) => (
              <ClientCell
                key={client.name}
                client={client}
                className={idx % 2 === 0 ? 'lr lb' : 'lb'}
              />
            ))}
          </div>

          {/* Row 2: Next 4 logos (left) | Business domains (right) */}
          <div className="clients-logos ln lr lb">
            {clientsRow2Left.map((client, idx) => (
              <ClientCell
                key={client.name}
                client={client}
                className={idx % 2 === 0 ? 'lr lb' : 'lb'}
              />
            ))}
          </div>
          <div className="clients-right ln lb">
            <div className="domains-content">
              <h3 className="h-small">Business domains</h3>
              <p className="t-reg">
                We have shipped products across 12+ industries, including:
              </p>
              <div className="tags big">
                {businessDomains.map((domain) => (
                  <span key={domain} className="tag">
                    {domain}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
