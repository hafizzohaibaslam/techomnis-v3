import {
  clientsRow1,
  clientsRow2Left,
  businessDomains,
  type Client,
} from '@/content/clients'

function ClientCell({ client, className }: { client: Client; className?: string }) {
  return (
    <div className={`client-cell ${className || ''}`}>
      <span className="nm">
        {client.name.split('\n').map((line, i) => (
          <span key={i}>
            {i > 0 && <br />}
            {line}
          </span>
        ))}
        {client.subtitle && <small>{client.subtitle}</small>}
      </span>
    </div>
  )
}

const allClients = [...clientsRow1, ...clientsRow2Left]

export function Clients() {
  return (
    <section id="clients" aria-label="Our clients">
      <div className="wrap">
        <div className="clients-grid">
          {/* Left half: Client logo grid */}
          <div className="clients-left">
            <div className="clients-intro ln lt lr lb">
              <span className="eyebrow">We built for</span>
              <h2 className="h-large" data-split>
                Our clients
              </h2>
              <p className="t-reg">
                From global brands and campaigns to venture-backed startups that need an MVP
                shipped or rescued.
              </p>
              <span className="ph">Logo files to be supplied</span>
            </div>
            <div className="clients-logos">
              {allClients.map((client, idx) => {
                const row = Math.floor(idx / 2)
                const col = idx % 2
                const isFirstCol = col === 0
                const isLastRow = row === Math.floor((allClients.length - 1) / 2)
                return (
                  <ClientCell
                    key={client.name}
                    client={client}
                    className={`ln lb ${isFirstCol ? 'lr' : ''} ${!isLastRow ? '' : ''}`}
                  />
                )
              })}
            </div>
          </div>

          {/* Right half: Business domains */}
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
              <p style={{ marginTop: '1.43rem' }}>
                <span className="ph">Full industry list to confirm</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
