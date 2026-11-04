import { directionTitles } from '@/content/navigation'
import { Button } from '@/components/ui/button'

export function Direction() {
  return (
    <section className="direction" aria-label="What we build">
      <div className="wrap">
        <span className="vline" aria-hidden="true"></span>
        <div className="dir-grid">
          <div className="dir-left">
            <div className="dir-title">
              <h2 className="tw h-large" id="dirTw">
                {directionTitles.map((title, index) => (
                  <span key={index} className="w" aria-hidden={index !== 0}>
                    {title}
                  </span>
                ))}
              </h2>
            </div>
          </div>
          <div className="dir-right">
            <div className="dir-cell center ln lt lb" data-dir="0">
              <h3 className="h-sub">AI / LLM products</h3>
            </div>
            <div className="g2">
              <div className="dir-cell center ln lr lb" data-dir="0">
                <h3 className="h-sub">MVP rescue</h3>
              </div>
              <div className="dir-cell center ln lb" data-dir="1">
                <h3 className="h-sub">SaaS</h3>
              </div>
            </div>
            <div className="g2">
              <div className="dir-cell center ln lr lb" data-dir="1">
                <h3 className="h-sub">Marketplaces</h3>
              </div>
              <div className="dir-cell center ln lb" data-dir="1">
                <h3 className="h-sub">EdTech</h3>
              </div>
            </div>
            <div className="dir-cell center ln lb" data-dir="2">
              <h3 className="h-sub">Web · Mobile · Cloud</h3>
            </div>
            <div className="dir-cell center ln lb" data-dir="2">
              <Button href="#services" data-go="Services">
                Explore our services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
