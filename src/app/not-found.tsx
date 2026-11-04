import Link from 'next/link'
import { LogoMark } from '@/components/ui/icons'

export default function NotFound() {
  return (
    <div className="page" id="page">
      <main id="main">
        <section className="e404" aria-label="Page not found">
          <h1 className="dg" aria-label="404, page not found">
            <span aria-hidden="true">4</span>
            <LogoMark className="inline h-[1em] w-[1em]" />
            <span aria-hidden="true">4</span>
          </h1>
          <p className="t-reg">
            The page you are looking for does not exist or has been moved. Let&apos;s get you back
            on track.
          </p>
          <Link href="/" className="bbtn bk" data-hover data-bbtn data-go="Home">
            Back to homepage
          </Link>
        </section>
      </main>
    </div>
  )
}
