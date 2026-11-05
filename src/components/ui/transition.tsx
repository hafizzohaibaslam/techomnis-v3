'use client'

import { useEffect, useRef } from 'react'

function getMotionEnabled(): boolean {
  if (typeof window === 'undefined') return true
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let saved: string | null = null
  try { saved = localStorage.getItem('to-motion') } catch {}
  return saved ? saved === 'on' : !reduce
}

export function TransitionOverlay() {
  const transRef = useRef<HTMLDivElement>(null)
  const trwRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const handlePopState = () => {
      if (!getMotionEnabled()) return
      document.documentElement.classList.add('to-arrive')
    }
    window.addEventListener('popstate', handlePopState)
    
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) location.reload()
    }
    window.addEventListener('pageshow', handlePageShow)
    
    return () => {
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('pageshow', handlePageShow)
    }
  }, [])

  return (
    <div ref={transRef} className="trans" id="trans" aria-hidden="true">
      <div ref={trwRef} className="trw">
        <p>
          <span ref={titleRef} id="transT">Home.</span>
        </p>
      </div>
    </div>
  )
}
