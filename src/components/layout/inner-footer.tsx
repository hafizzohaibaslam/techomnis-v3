import { TransitionLink } from '@/components/ui/transition-link'
import { LinkedInIcon, UpworkIcon, GitHubIcon } from '@/components/ui/icons'

export function InnerFooter() {
  return (
    <footer id="footer" aria-label="Contact">
      <div
        className="wrap"
        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        <div className="ft-cta">
          <TransitionLink
            href="/contact"
            label="Contact"
            data-hover
            data-go="Contact"
            aria-label="Let's talk: open the contact page"
          >
            <span className="ltx h-large ul" data-split>
              Let&apos;s talk
            </span>
            <span className="emo" aria-hidden="true">
              🤝
            </span>
          </TransitionLink>
        </div>
        <div className="ft-bar">
          <div className="l t-reg">
            <span>© 2026 TechOmnis.</span>
            <TransitionLink href="/privacy" label="Privacy" data-go="Privacy">
              <span className="ul">Privacy Policy</span>
            </TransitionLink>
            <span className="grey">
              hello@techomnis.com <span className="ph">Confirm</span>
            </span>
          </div>
          <div className="social">
            <a
              href="#"
              data-ph
              aria-label="TechOmnis on LinkedIn (link to be added)"
              data-hover
            >
              <LinkedInIcon />
            </a>
            <a
              href="#"
              data-ph
              aria-label="TechOmnis on Upwork (link to be added)"
              data-hover
            >
              <UpworkIcon />
            </a>
            <a
              href="#"
              data-ph
              aria-label="TechOmnis on GitHub (link to be added)"
              data-hover
            >
              <GitHubIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
