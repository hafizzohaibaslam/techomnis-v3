'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'

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

export function TransitionOverlay() {
  const [motionEnabled, setMotionEnabled] = useState(true)
  const pathname = usePathname()
  const router = useRouter()
  const [label, setLabel] = useState(() => getLabelForPath(pathname))
  const [isLeaving, setIsLeaving] = useState(false)
  const [isArriving, setIsArriving] = useState(false)
  const pendingNavRef = useRef<string | null>(null)
  const initializedRef = useRef(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMotionEnabled(getMotionEnabled())
  }, [])

  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true
      const root = document.documentElement
      if (root.classList.contains('to-arrive') && motionEnabled) {
        const timer = setTimeout(() => {
          root.classList.remove('to-arrive')
        }, 1700)
        return () => clearTimeout(timer)
      }
      root.classList.remove('to-arrive')
    }
  }, [pathname, motionEnabled])

  useEffect(() => {
    if (pendingNavRef.current && !isLeaving) {
      const href = pendingNavRef.current
      pendingNavRef.current = null
      router.push(href)
    }
  }, [isLeaving, router])

  const handleLinkClick = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href]') as HTMLAnchorElement | null
      
      if (!anchor) return
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      
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
          target.scrollIntoView({ behavior: motionEnabled ? 'smooth' : 'auto' })
        }
        return
      }
      
      if (anchor.target === '_blank' || anchor.hasAttribute('download')) return
      if (/^(mailto|tel):/i.test(href)) return
      if (/^[a-z]+:/i.test(href) && anchor.host !== location.host) return
      if (href.includes('#')) return
      
      if (!motionEnabled) return
      
      e.preventDefault()
      
      const newLabel = anchor.dataset.go || getLabelForPath(href)
      setLabel(newLabel)
      setIsLeaving(true)
      
      setTimeout(() => {
        setIsLeaving(false)
        setIsArriving(true)
        pendingNavRef.current = href
        
        setTimeout(() => {
          setIsArriving(false)
        }, 1700)
      }, 1600)
    },
    [motionEnabled]
  )

  useEffect(() => {
    document.addEventListener('click', handleLinkClick)
    return () => document.removeEventListener('click', handleLinkClick)
  }, [handleLinkClick])

  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        location.reload()
      }
    }
    window.addEventListener('pageshow', handlePageShow)
    return () => window.removeEventListener('pageshow', handlePageShow)
  }, [])

  const isVisible = isLeaving || isArriving

  return (
    <div 
      className={`trans ${isVisible ? 'trans-visible' : ''} ${isLeaving ? 'trans-leave' : ''} ${isArriving ? 'trans-arrive' : ''}`}
      id="trans" 
      aria-hidden="true"
      style={{ display: isVisible ? 'flex' : 'none' }}
    >
      <div className="trw">
        <p>
          <span id="transT">{label}.</span>
        </p>
      </div>
    </div>
  )
}
