import { Button } from '@/components/ui/button'

function VennDiagram() {
  return (
    <svg
      className="venn"
      viewBox="0 0 276 287"
      role="img"
      aria-label="Audit, Build and Ship overlap in production-ready software"
    >
      <g fill="none" stroke="#8f8f8f" strokeWidth="0.8">
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
        strokeWidth="0.8"
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

export function Thesis() {
  return (
    <section id="process" className="thesis" aria-label="Our approach">
      <div className="wrap" style={{ height: '100%' }}>
        <div className="g2 ln lb" style={{ height: '100%' }}>
          <div className="thesis-left ln lr">
            <span className="eyebrow">The demo-to-production gap</span>
            <h2 className="h-large" data-split>
              Demos are cheap now. Production isn&apos;t.
            </h2>
            <p className="t-reg">
              AI writes the first 80% of most software. The last 20% decides whether a product
              survives: auth, data, payments, performance, and an AI bill that scales with usage.
              That&apos;s where we work. Then we keep building.
            </p>
            <div className="btnw">
              <Button href="/process" data-go="Process">
                How we work
              </Button>
            </div>
          </div>
          <div className="center vcell">
            <span className="cx" aria-hidden="true"></span>
            <span className="cy" aria-hidden="true"></span>
            <VennDiagram />
          </div>
        </div>
      </div>
    </section>
  )
}
