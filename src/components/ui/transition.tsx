'use client'

import { useEffect, useRef, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
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
  },
}

export function TransitionOverlay() {
  const pathname = usePathname()
  const router = useRouter()
  const transRef = useRef<HTMLDivElement>(null)
  const trwRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLSpanElement>(null)
  const leavingRef = useRef(false)
  const motionRef = useRef(true)

  useEffect(() => {
    motionRef.current = getMotionEnabled()
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const trans = transRef.current
    const trw = trwRef.current
    const transT = titleRef.current
    
    if (!trans || !trw || !transT) return
    
    if (root.classList.contains('to-arrive') && motionRef.current) {
      const pH = trans.querySelector('p')?.offsetHeight || 100
      gsap.set(trans, { display: 'flex', visibility: 'visible', y: 0, yPercent: 0 })
      gsap.set(trw, { y: 0, yPercent: 0 })
      gsap.set(transT, { y: 0, yPercent: 0 })
      root.classList.remove('to-arrive')
      gsap.to(transT, { y: -pH, duration: 0.7, delay: 0.7, ease: (t: number) => E.tIn(t) })
      gsap.to(trans, { yPercent: -100, duration: 0.8, delay: 0.9, ease: (t: number) => E.tOut(t) })
      gsap.to(trw, { yPercent: 100, duration: 0.8, delay: 0.9, ease: (t: number) => E.tOut(t), onComplete: () => {
        gsap.set(trans, { display: 'none', visibility: 'hidden' })
      }})
    } else {
      root.classList.remove('to-arrive')
      gsap.set(trans, { display: 'none', visibility: 'hidden' })
    }
  }, [pathname])

  const leave = useCallback((href: string, label: string) => {
    const trans = transRef.current
    const trw = trwRef.current
    const transT = titleRef.current
    
    if (!trans || !trw || !transT || !motionRef.current) {
      router.push(href)
      return
    }
    
    if (leavingRef.current) return
    leavingRef.current = true
    
    transT.textContent = label + '.'
    
    gsap.killTweensOf([trans, trw, transT])
    
    const pH = trans.querySelector('p')?.offsetHeight || 100
    gsap.set(trans, { display: 'flex', visibility: 'visible', y: 0, yPercent: 100 })
    gsap.set(trw, { y: 0, yPercent: -100 })
    gsap.set(transT, { yPercent: 0, y: pH * 0.6 })
    
    gsap.to([trans, trw], { yPercent: 0, duration: 0.8, ease: 'circ.in' })
    gsap.to(transT, { y: 0, duration: 0.9, delay: 0.6, ease: 'expo.out' })
    
    setTimeout(() => {
      leavingRef.current = false
      document.documentElement.classList.add('to-arrive')
      router.push(href)
    }, 1600)
  }, [router])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      
      const anchor = (e.target as HTMLElement).closest('a[href]') as HTMLAnchorElement | null
      if (!anchor) return
      
      const href = anchor.getAttribute('href')
      if (!href) return
      
      if (href === '#' || anchor.hasAttribute('data-ph')) {
        e.preventDefault()
        return
      }
      
      if (href.startsWith('#')) {
        const target = document.querySelector(href)
        if (target) {
          e.preventDefault()
          target.scrollIntoView({ behavior: motionRef.current ? 'smooth' : 'auto' })
        }
        return
      }
      
      if (anchor.target === '_blank' || anchor.hasAttribute('download')) return
      if (/^(mailto|tel):/i.test(href)) return
      if (/^[a-z]+:/i.test(href) && anchor.host !== location.host) return
      if (href.includes('#')) return
      
      if (!motionRef.current) return
      
      e.preventDefault()
      const label = anchor.dataset.go || getLabelForPath(href)
      leave(href, label)
    }
    
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [leave])

  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) location.reload()
    }
    window.addEventListener('pageshow', handlePageShow)
    return () => window.removeEventListener('pageshow', handlePageShow)
  }, [])

  return (
    <div ref={transRef} className="trans" id="trans" aria-hidden="true" style={{ display: 'none' }}>
      <div ref={trwRef} className="trw">
        <p>
          <span ref={titleRef} id="transT">Home.</span>
        </p>
      </div>
    </div>
  )
}
