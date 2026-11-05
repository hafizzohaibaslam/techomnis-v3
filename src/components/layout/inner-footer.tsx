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
            <a href="mailto:hello@techomnis.com" className="grey">
              hello@techomnis.com
            </a>
          </div>
          <div className="social">
            <a
              href="https://linkedin.com/company/techomnis"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TechOmnis on LinkedIn"
              data-hover
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://www.upwork.com/agencies/techomnis"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TechOmnis on Upwork"
              data-hover
            >
              <UpworkIcon />
            </a>
            <a
              href="https://github.com/techomnis"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TechOmnis on GitHub"
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
