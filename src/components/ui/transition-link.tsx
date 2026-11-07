'use client'

import { useCallback, forwardRef, type ReactNode, type MouseEvent, type AnchorHTMLAttributes } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import gsap from 'gsap'

const ROUTE_LABELS: Record<string, string> = {
  '/': 'Home',
  '/work': 'Work',
  '/services': 'Services',
  '/process': 'Process',
  '/about': 'About',
  '/contact': 'Contact',
  '/privacy': 'Privacy',
  '/terms': 'Terms',
}

function getLabelForPath(path: string): string {
  if (path.startsWith('/work/')) {
    const slug = path.split('/').pop() || ''
    return slug.charAt(0).toUpperCase() + slug.slice(1)
  }
  if (path.startsWith('/services/')) {
    return 'Services'
  }
  return ROUTE_LABELS[path] || 'TechOmnis'
}

function getMotionEnabled(): boolean {
  if (typeof window === 'undefined') return true
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let saved: string | null = null
  try { saved = localStorage.getItem('to-motion') } catch {}
  return saved ? saved === 'on' : !reduce
}

function runArriveAnimation() {
  const trans = document.getElementById('trans')
  const trw = trans?.querySelector('.trw') as HTMLElement | null
  const transP = trans?.querySelector('p') as HTMLElement | null
  const transT = document.getElementById('transT')
  
  if (!trans || !trw || !transP || !transT) return
  
  const pH = transP.offsetHeight
  const E = {
    tIn: (t: number) => {
      const x1 = 0.645, y1 = 0.045, x2 = 0.355, y2 = 1
      const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx
      const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by
      return ((ay * t + by) * t + cy) * t
    },
    tOut: (t: number) => {
      const x1 = 0.215, y1 = 0.61, x2 = 0.355, y2 = 1
      const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx
      const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by
      return ((ay * t + by) * t + cy) * t
    }
  }
  
  gsap.set(trans, { display: 'flex', visibility: 'visible', y: 0, yPercent: 0 })
  gsap.set(trw, { y: 0, yPercent: 0 })
  gsap.set(transT, { y: 0, yPercent: 0 })
  document.documentElement.classList.remove('to-arrive')
  
  gsap.to(transT, { y: -pH, duration: 0.7, delay: 0.7, ease: (t: number) => E.tIn(t) })
  gsap.to(trans, { yPercent: -100, duration: 0.8, delay: 0.9, ease: (t: number) => E.tOut(t) })
  gsap.to(trw, { yPercent: 100, duration: 0.8, delay: 0.9, ease: (t: number) => E.tOut(t), onComplete: () => { 
    gsap.set(trans, { display: 'none', visibility: 'hidden' })
  } })
}

interface TransitionLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string
  children: ReactNode
  label?: string
}

export const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  function TransitionLink({ href, children, label, onClick, ...props }, ref) {
    const router = useRouter()
    const pathname = usePathname()

    const handleClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
      if (onClick) onClick(e)
      if (e.defaultPrevented) return
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

      if (href === '#' || (e.currentTarget as HTMLAnchorElement).hasAttribute('data-ph')) {
        e.preventDefault()
        return
      }

      if (href.startsWith('#')) {
        const target = document.querySelector(href)
        if (target) {
          e.preventDefault()
          target.scrollIntoView({ behavior: getMotionEnabled() ? 'smooth' : 'auto' })
        }
        return
      }

      if (!getMotionEnabled()) return

      e.preventDefault()

      const trans = document.getElementById('trans')
      const trw = trans?.querySelector('.trw') as HTMLElement | null
      const transT = document.getElementById('transT')

      if (!trans || !trw || !transT) {
        router.push(href)
        return
      }

      const targetPath = href.split('#')[0] || '/'
      const currentPath = pathname || '/'
      const isSameRoute = targetPath === currentPath
      
      const transLabel = label || getLabelForPath(href)
      transT.textContent = transLabel + '.'

      gsap.killTweensOf([trans, trw, transT])

      const pH = trans.querySelector('p')?.offsetHeight || 100
      gsap.set(trans, { display: 'flex', visibility: 'visible', y: 0, yPercent: 100 })
      gsap.set(trw, { y: 0, yPercent: -100 })
      gsap.set(transT, { yPercent: 0, y: pH * 0.6 })

      gsap.to([trans, trw], { yPercent: 0, duration: 0.8, ease: 'circ.in' })
      gsap.to(transT, { y: 0, duration: 0.9, delay: 0.6, ease: 'expo.out' })

      setTimeout(() => {
        const hasHash = href.includes('#')
        if (!hasHash) {
          window.scrollTo(0, 0)
        }
        
        if (isSameRoute) {
          runArriveAnimation()
        } else {
          document.documentElement.classList.add('to-arrive')
          router.push(href)
        }
      }, 1600)
    }, [href, label, onClick, router, pathname])

    return (
      <Link ref={ref} href={href} onClick={handleClick} {...props}>
        {children}
      </Link>
    )
  }
)
