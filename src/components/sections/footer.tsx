import Link from 'next/link'
import { LinkedInIcon, UpworkIcon, GitHubIcon } from '@/components/ui/icons'

export function Footer() {
  return (
    <footer id="contact" aria-label="Contact">
      <div className="wrap" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="ft-cta">
          <Link href="/contact" data-hover aria-label="Let's talk: Start a project">
            <span className="ltx h-large ul" data-split>
              Let&apos;s talk
            </span>
            <span className="emo" aria-hidden="true">
              🤝
            </span>
          </Link>
        </div>
        <div className="ft-bar">
          <div className="l t-reg">
            <span>© {new Date().getFullYear()} TechOmnis.</span>
            <Link href="/privacy">
              <span className="ul">Privacy</span>
            </Link>
            <Link href="/terms">
              <span className="ul">Terms</span>
            </Link>
          </div>
          <div className="social">
            <a
              href="https://linkedin.com/company/techomnis"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TechOmnis on LinkedIn"
              data-hover
            >
              <LinkedInIcon className="h-[1.6rem] w-[1.6rem] fill-[#222]" />
            </a>
            <a
              href="https://www.upwork.com/agencies/techomnis"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TechOmnis on Upwork"
              data-hover
            >
              <UpworkIcon className="h-[1.6rem] w-[1.6rem] fill-[#222]" />
            </a>
            <a
              href="https://github.com/techomnis"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TechOmnis on GitHub"
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
