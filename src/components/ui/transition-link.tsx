'use client'

import { useCallback, forwardRef, type ReactNode, type MouseEvent, type AnchorHTMLAttributes } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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

interface TransitionLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string
  children: ReactNode
  label?: string
}

export const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  function TransitionLink({ href, children, label, onClick, ...props }, ref) {
    const router = useRouter()

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
        document.documentElement.classList.add('to-arrive')
        window.scrollTo(0, 0)
        router.push(href)
      }, 1600)
    }, [href, label, onClick, router])

    return (
      <Link ref={ref} href={href} onClick={handleClick} {...props}>
        {children}
      </Link>
    )
  }
)
