import {
  clientsRow1,
  clientsRow2Left,
  clientsRow2Right,
  businessDomains,
  proofInNumbers,
  type Client,
} from '@/content/clients'

function ClientCell({ client, className }: { client: Client; className?: string }) {
  return (
    <div className={`client ${className || ''}`}>
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

export function Clients() {
  return (
    <section id="clients" aria-label="Our clients">
      <div className="wrap">
        {/* Row 1: Intro + First 4 clients */}
        <div className="g2">
          <div className="intro ln lr lb nb">
            <span className="eyebrow">We built for</span>
            <h2 className="h-large" data-split>
              Our clients
            </h2>
            <p className="t-reg">
              From global brands and campaigns to venture-backed startups that need an MVP shipped
              or rescued.
            </p>
            <span className="ph">Logo files to be supplied</span>
          </div>
          <div className="g2 g2keep">
            <ClientCell client={clientsRow1[0]} className="ln lt lr lb mr" />
            <ClientCell client={clientsRow1[1]} className="ln lt lb" />
            <ClientCell client={clientsRow1[2]} className="ln lr lb mr" />
            <ClientCell client={clientsRow1[3]} className="ln lb" />
          </div>
        </div>

        {/* Row 2: 4 clients + Domains */}
        <div className="g2">
          <div className="g2 g2keep">
            <ClientCell client={clientsRow2Left[0]} className="ln lr lb mr" />
            <ClientCell client={clientsRow2Left[1]} className="ln lr lb" />
            <ClientCell client={clientsRow2Left[2]} className="ln lr lb mr" />
            <ClientCell client={clientsRow2Left[3]} className="ln lr lb" />
          </div>
          <div className="domains ln lb">
            <h3 className="h-small">Business domains</h3>
            <p className="t-reg">We have shipped products across 12+ industries, including:</p>
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

        {/* Row 3: Proof table + remaining clients */}
        <div className="g4">
          <div className="value ln lr lb">
            <h3 className="h-small">Proof in numbers</h3>
            <p className="t-reg">
              The numbers behind the work, from our Upwork record and portfolio.
            </p>
            <div className="vt" role="table" aria-label="Proof in numbers">
              <div className="row h t-small" role="row">
                <span role="columnheader">#</span>
                <span role="columnheader">Signal</span>
                <span role="columnheader">Figure</span>
                <span role="columnheader">Source</span>
              </div>
              {proofInNumbers.map((row, index) => (
                <div key={index} className="row t-small" role="row">
                  <span role="cell" className="vn">
                    #{index + 1}
                  </span>
                  <span role="cell" data-l="Signal" className="t-reg t-bold">
                    {row.signal}
                  </span>
                  <span role="cell" data-l="Figure" className="t-bold">
                    {row.figure}
                  </span>
                  <span role="cell" data-l="Source">
                    {row.source}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <ClientCell client={clientsRow2Right[0]} className="ln lb mr" />
          <ClientCell client={clientsRow2Right[1]} className="ln lb" />
          <ClientCell client={clientsRow2Right[2]} className="ln lr lb mr" />
          <ClientCell client={clientsRow2Right[3]} className="ln lr lb" />
          <ClientCell client={clientsRow2Right[4]} className="ln lr lb mr" />
          <div className="client ln lb">
            <p className="num more21">
              17 <small>case studies</small>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
