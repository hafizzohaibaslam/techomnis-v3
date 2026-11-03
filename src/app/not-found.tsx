import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="page not-found" id="top">
      <div className="wrap">
        <div className="not-found-content center">
          <span className="not-found-code h-large">404</span>
          <h1 className="h-medium">Page not found</h1>
          <p className="t-reg grey">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="not-found-actions">
            <Button href="/">Go home</Button>
            <Link href="/contact" className="t-reg ul">
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
