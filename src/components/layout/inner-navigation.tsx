'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { TransitionLink } from '@/components/ui/transition-link'
import { HomeIcon, ArrowRight, MenuIcon } from '@/components/ui/icons'

const navItems = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/process', label: 'Process' },
  { href: '/about', label: 'About' },
]

export function InnerNavigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const mobBtnRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const [motionEnabled, setMotionEnabled] = useState(true)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let saved: string | null = null
    try { saved = localStorage.getItem('to-motion') } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMotionEnabled(saved ? saved === 'on' : !reduce)
  }, [])

  const toggleMotion = useCallback(() => {
    const newValue = !motionEnabled
    setMotionEnabled(newValue)
    try { localStorage.setItem('to-motion', newValue ? 'on' : 'off') } catch {}
    if (newValue) location.reload()
  }, [motionEnabled])

  const activeLabel = useMemo(() => {
    const current = navItems.find((item) => pathname.startsWith(item.href))
    return current?.label || 'Home'
  }, [pathname])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
        mobBtnRef.current?.focus()
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileMenuOpen &&
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !mobBtnRef.current?.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    const handler = () => {
      if (!mq.matches) setMobileMenuOpen(false)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <>
      <div
        ref={panelRef}
        className={`mpanel ${mobileMenuOpen ? 'open' : ''}`}
        id="mpanel"
        role="dialog"
        aria-label="Site menu"
      >
        <TransitionLink
          href="/"
          label="Home"
          className={activeLabel === 'Home' ? 'on' : ''}
          onClick={closeMobileMenu}
          data-go="Home"
        >
          <ArrowRight className="h-[5.13rem] w-[5.13rem] fill-none stroke-white stroke-[1.6]" />
          Home
        </TransitionLink>
        {navItems.map((item) => (
          <TransitionLink
            key={item.href}
            href={item.href}
            label={item.label}
            className={activeLabel === item.label ? 'on' : ''}
            aria-current={activeLabel === item.label ? 'page' : undefined}
            onClick={closeMobileMenu}
            data-go={item.label}
          >
            <ArrowRight className="h-[5.13rem] w-[5.13rem] fill-none stroke-white stroke-[1.6]" />
            {item.label}
          </TransitionLink>
        ))}
        <button type="button" aria-pressed={!motionEnabled} onClick={toggleMotion}>
          Reduce motion
        </button>
      </div>

      <nav className="menu" id="menu" aria-label="Main">
        <div className="menu-c">
          <TransitionLink
            href="/"
            label="Home"
            className={`mi home ${activeLabel === 'Home' ? 'on' : ''}`}
            data-hover
            data-go="Home"
            aria-label="Home"
          >
            <span className="bg"></span>
            <HomeIcon />
          </TransitionLink>

          <div className="mlist">
            {navItems.map((item) => (
              <TransitionLink
                key={item.href}
                href={item.href}
                label={item.label}
                className={`mi ${activeLabel === item.label ? 'on' : ''}`}
                aria-current={activeLabel === item.label ? 'page' : undefined}
                data-hover
                data-go={item.label}
              >
                <span className="bg"></span>
                {item.label}
              </TransitionLink>
            ))}
          </div>

          <button
            ref={mobBtnRef}
            className="mob"
            id="mobBtn"
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="mpanel"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <MenuIcon />
            <span id="mobLbl">{activeLabel}</span>
            <span className="sr"> menu</span>
          </button>

          <TransitionLink href="/contact" label="Contact" className="talk" data-hover data-go="Contact">
            Let&apos;s talk{' '}
            <ArrowRight className="h-[1.25rem] w-[1.25rem] fill-none stroke-white stroke-[1.6]" />
          </TransitionLink>
        </div>
      </nav>
    </>
  )
}
