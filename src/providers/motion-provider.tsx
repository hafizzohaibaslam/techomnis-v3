'use client'

import { createContext, useContext, useEffect, useState, useCallback, useRef, type ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'

interface MotionContextType {
  motion: boolean
  toggleMotion: () => void
  isNavigating: boolean
  navigateTo: (href: string, label?: string) => void
}

const MotionContext = createContext<MotionContextType | null>(null)

export function useMotionContext() {
  const ctx = useContext(MotionContext)
  if (!ctx) throw new Error('useMotionContext must be used within MotionProvider')
  return ctx
}

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
  if (path.startsWith('/work/')) return 'Case Study'
  if (path.startsWith('/services/')) return 'Service'
  return ROUTE_LABELS[path] || 'TechOmnis'
}

function getInitialMotion(): boolean {
  if (typeof window === 'undefined') return true
  const saved = localStorage.getItem('to-motion')
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return saved ? saved === 'on' : !reduce
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const [motion, setMotion] = useState(getInitialMotion)
  const [isNavigating, setIsNavigating] = useState(false)
  const [transLabel, setTransLabel] = useState('Home')
  const pendingNavRef = useRef<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    document.documentElement.classList.toggle('motion-off', !motion)
  }, [motion])

  useEffect(() => {
    if (pendingNavRef.current && !isNavigating) {
      const href = pendingNavRef.current
      pendingNavRef.current = null
      router.push(href)
    }
  }, [isNavigating, router])

  useEffect(() => {
    const root = document.documentElement
    if (root.classList.contains('to-arrive') && motion) {
      const timer = setTimeout(() => root.classList.remove('to-arrive'), 1200)
      return () => clearTimeout(timer)
    }
    root.classList.remove('to-arrive')
  }, [pathname, motion])

  const toggleMotion = useCallback(() => {
    setMotion((prev) => {
      const next = !prev
      localStorage.setItem('to-motion', next ? 'on' : 'off')
      return next
    })
  }, [])

  const navigateTo = useCallback(
    (href: string, label?: string) => {
      if (!motion || href === pathname) {
        router.push(href)
        return
      }

      setTransLabel(label || getLabelForPath(href))
      setIsNavigating(true)
      document.documentElement.classList.add('to-leave')

      setTimeout(() => {
        document.documentElement.classList.remove('to-leave')
        document.documentElement.classList.add('to-arrive')
        setIsNavigating(false)
        pendingNavRef.current = href
      }, 800)
    },
    [motion, pathname, router]
  )

  return (
    <MotionContext.Provider value={{ motion, toggleMotion, isNavigating, navigateTo }}>
      {children}
      <TransitionOverlay label={transLabel} />
    </MotionContext.Provider>
  )
}

function TransitionOverlay({ label }: { label: string }) {
  return (
    <div className="trans" id="trans" aria-hidden="true">
      <div className="trw">
        <p>
          <span id="transT">{label}.</span>
        </p>
      </div>
    </div>
  )
}
