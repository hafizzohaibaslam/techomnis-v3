import { LinkedInIcon, UpworkIcon, GitHubIcon } from '@/components/ui/icons'

export function Footer() {
  return (
    <footer id="contact" aria-label="Contact">
      <div className="wrap" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="ft-cta">
          <a href="mailto:hello@techomnis.com" data-hover aria-label="Let's talk: email hello@techomnis.com">
            <span className="ltx h-large ul" data-split>
              Let&apos;s talk
            </span>
            <span className="emo" aria-hidden="true">
              🤝
            </span>
          </a>
        </div>
        <div className="ft-bar">
          <div className="l t-reg">
            <span>© 2026 TechOmnis.</span>
            <a href="#" data-ph>
              <span className="ul">Privacy Policy</span>
            </a>
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
              <LinkedInIcon className="h-[1.6rem] w-[1.6rem] fill-[#222]" />
            </a>
            <a
              href="#"
              data-ph
              aria-label="TechOmnis on Upwork (link to be added)"
              data-hover
            >
              <UpworkIcon className="h-[1.6rem] w-[1.6rem] fill-[#222]" />
            </a>
            <a
              href="#"
              data-ph
              aria-label="TechOmnis on GitHub (link to be added)"
              data-hover
            >
              <GitHubIcon className="h-[1.6rem] w-[1.6rem] fill-[#222]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
