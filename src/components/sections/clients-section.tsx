import Link from 'next/link'
import {
  clientsRow1,
  clientsRow2Left,
  clientsRow2Right,
  businessDomains,
  proofInNumbers,
} from '@/content/clients'

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
    </svg>
  )
}

function QuoteMark() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M5 40V25C5 15 10 9 20 7v6c-5 1.5-8 5-8 10h8v17z" />
      <path d="M27 40V25c0-10 5-16 15-18v6c-5 1.5-8 5-8 10h8v17z" />
    </svg>
  )
}

interface Review {
  quote: string
  isWide?: boolean
}

interface ScoreCard {
  mainValue: string
  mainLabel: string
  stats: { label: string; value: string }[]
}

interface ClientsSectionProps {
  showReviews?: boolean
  reviews?: Review[]
  scoreCards?: ScoreCard[]
}

export function ClientsSection({
  showReviews = true,
  reviews = [],
  scoreCards = [],
}: ClientsSectionProps) {
  return (
    <section id="clients" aria-label="Our clients">
      <div className="wrap">
        <div className="g2">
          <div className="intro ln lr lb nb">
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
          <div className="g2 g2keep">
            {clientsRow1.map((client, idx) => (
              <div
                key={client.name}
                className={`client ln ${idx === 0 || idx === 2 ? 'lr' : ''} ${idx < 2 ? 'lt' : ''} lb ${idx % 2 === 0 ? 'mr' : ''}`}
              >
                <span className="nm">
                  {client.name.split(' ').length > 1 ? (
                    <>
                      {client.name.split(' ')[0]}
                      <br />
                      {client.name.split(' ').slice(1).join(' ')}
                    </>
                  ) : (
                    client.name
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="g2">
          <div className="g2 g2keep">
            {clientsRow2Left.map((client, idx) => (
              <div
                key={client.name}
                className={`client ln lr lb ${idx % 2 === 0 ? 'mr' : ''}`}
              >
                <span className="nm">
                  {client.name.includes('\n') ? (
                    client.name.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < client.name.split('\n').length - 1 && <br />}
                      </span>
                    ))
                  ) : (
                    <>
                      {client.name}
                      {client.subtitle && <small>{client.subtitle}</small>}
                    </>
                  )}
                </span>
              </div>
            ))}
          </div>
          <div className="domains ln lb">
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
              {proofInNumbers.map((row, idx) => (
                <div key={row.signal} className="row t-small" role="row">
                  <span role="cell" className="vn">
                    #{idx + 1}
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
          {clientsRow2Right.slice(0, 2).map((client, idx) => (
            <div key={client.name} className={`client ln lb ${idx === 0 ? 'mr' : ''}`}>
              <span className="nm">
                {client.name.split(' ').map((word, i, arr) => (
                  <span key={i}>
                    {word}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </span>
            </div>
          ))}
          {clientsRow2Right.slice(2, 4).map((client, idx) => (
            <div key={client.name} className={`client ln lr lb ${idx === 0 ? 'mr' : ''}`}>
              <span className="nm">{client.name}</span>
            </div>
          ))}
          <div className="client ln lr lb mr">
            <span className="nm">
              Othego<small>Own product</small>
            </span>
          </div>
          <div className="client ln lb">
            <p className="num more21">
              17 <small>case studies</small>
            </p>
          </div>
        </div>

        {showReviews && (
          <div className="g4" id="reviews">
            <div className="rv-title ln lr lb">
              <span className="eyebrow">Client reviews</span>
              <h2 className="h-large" data-split>
                What they say
              </h2>
            </div>
            {reviews.slice(0, 3).map((review, idx) => (
              <div
                key={idx}
                className={`quote ln ${idx % 2 === 0 ? 'lr' : ''} lb`}
                data-q
              >
                <div className="qt">
                  <p className="t-reg t-bold">&quot;{review.quote}&quot;</p>
                  <QuoteMark />
                </div>
                <div className="who">
                  <p className="t-reg grey">
                    Client name,
                    <br />
                    role, company
                  </p>
                  <span className="ph">Placeholder, not a real quote</span>
                </div>
              </div>
            ))}
            {scoreCards.slice(0, 1).map((card, idx) => (
              <div key={idx} className="score ln lb">
                <div>
                  <p className="sc">
                    {card.mainValue} <small>{card.mainLabel}</small>
                  </p>
                  <div className="stars" role="img" aria-label="5 out of 5 stars" data-stars>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                </div>
                <dl className="t-reg">
                  {card.stats.map((stat) => (
                    <span key={stat.label}>
                      <dt>{stat.label}</dt>
                      <dd>{stat.value}</dd>
                    </span>
                  ))}
                </dl>
              </div>
            ))}
            {scoreCards.slice(1, 2).map((card, idx) => (
              <div key={idx} className="score ln lr lb">
                <div>
                  <p className="sc">
                    {card.mainValue} <small>{card.mainLabel}</small>
                  </p>
                  <div className="stars" role="img" aria-label="5 out of 5 stars" data-stars>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                </div>
                <dl className="t-reg">
                  {card.stats.map((stat) => (
                    <span key={stat.label}>
                      <dt>{stat.label}</dt>
                      <dd>{stat.value}</dd>
                    </span>
                  ))}
                </dl>
              </div>
            ))}
            {reviews.slice(3, 4).map((review, idx) => (
              <div key={idx} className="quote ln lr lb" data-q>
                <div className="qt">
                  <p className="t-reg t-bold">&quot;{review.quote}&quot;</p>
                  <QuoteMark />
                </div>
                <div className="who">
                  <p className="t-reg grey">
                    Client name,
                    <br />
                    role, company
                  </p>
                  <span className="ph">Placeholder, not a real quote</span>
                </div>
              </div>
            ))}
            {reviews
              .filter((r) => r.isWide)
              .slice(0, 2)
              .map((review, idx) => (
                <div
                  key={idx}
                  className={`quote w ln ${idx === 1 ? 'lr' : ''} lb`}
                  data-q
                  style={{ gridColumn: 'span 2' }}
                >
                  <div className="qt">
                    <p className="t-reg t-bold">&quot;{review.quote}&quot;</p>
                    <QuoteMark />
                  </div>
                  <div className="who">
                    <p className="t-reg grey">
                      Client name,
                      <br />
                      role, company
                    </p>
                    <span className="ph">Placeholder, not a real quote</span>
                  </div>
                </div>
              ))}
            {reviews.slice(6, 7).map((review, idx) => (
              <div key={idx} className="quote ln lr lb" data-q>
                <div className="qt">
                  <p className="t-reg t-bold">&quot;{review.quote}&quot;</p>
                  <QuoteMark />
                </div>
                <div className="who">
                  <p className="t-reg grey">
                    Client name,
                    <br />
                    role, company
                  </p>
                  <span className="ph">Placeholder, not a real quote</span>
                </div>
              </div>
            ))}
            <div className="center ln lb">
              <Link href="#" className="btn" data-hover data-btn data-ph>
                All reviews on Upwork
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
