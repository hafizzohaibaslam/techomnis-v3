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

const sectionMappings = [
  { selector: '#top', label: 'Home' },
  { selector: '#work', label: 'Work' },
  { selector: '#services', label: 'Services' },
  { selector: '#clients', label: 'Clients' },
  { selector: '#reviews', label: 'Reviews' },
  { selector: '#about', label: 'About' },
]

export function Navigation() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  
  const initialSection = useMemo(() => {
    if (!isHomePage) {
      const current = navItems.find((item) => pathname.startsWith(item.href))
      return current?.label || 'Home'
    }
    return 'Home'
  }, [pathname, isHomePage])
  
  const [activeSection, setActiveSection] = useState(initialSection)
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

  useEffect(() => {
    if (!isHomePage) {
      requestAnimationFrame(() => setActiveSection(initialSection))
      return
    }

    const handleScroll = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight

      for (let i = sectionMappings.length - 1; i >= 0; i--) {
        const mapping = sectionMappings[i]
        const el = document.querySelector(mapping.selector)
        if (el) {
          const rect = el.getBoundingClientRect()
          const top = rect.top + scrollY
          if (scrollY >= top - viewportHeight * 0.45) {
            setActiveSection(mapping.label)
            break
          }
        }
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const mapping = sectionMappings.find(
              (s) => document.querySelector(s.selector) === entry.target
            )
            if (mapping) {
              setActiveSection(mapping.label)
            }
          }
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )

    sectionMappings.forEach((mapping) => {
      const el = document.querySelector(mapping.selector)
      if (el) observer.observe(el)
    })

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isHomePage, pathname, initialSection])

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
          className={activeSection === 'Home' ? 'on' : ''}
          onClick={closeMobileMenu}
        >
          <ArrowRight className="h-[5.13rem] w-[5.13rem] fill-none stroke-white stroke-[1.6]" />
          Home
        </TransitionLink>
        {navItems.map((item) => (
          <TransitionLink
            key={item.href}
            href={item.href}
            label={item.label}
            className={activeSection === item.label ? 'on' : ''}
            onClick={closeMobileMenu}
          >
            <ArrowRight className="h-[5.13rem] w-[5.13rem] fill-none stroke-white stroke-[1.6]" />
            {item.label}
          </TransitionLink>
        ))}
        <button
          type="button"
          aria-pressed={!motionEnabled}
          onClick={toggleMotion}
        >
          Reduce motion
        </button>
      </div>

      <nav className="menu" id="menu" aria-label="Main">
        <div className="menu-c">
          <TransitionLink
            href="/"
            label="Home"
            className={`mi home ${activeSection === 'Home' ? 'on' : ''}`}
            data-hover
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
                className={`mi ${activeSection === item.label ? 'on' : ''}`}
                data-hover
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
            <span id="mobLbl">{activeSection}</span>
            <span className="sr-only"> menu</span>
          </button>

          <TransitionLink
            href="/contact"
            label="Contact"
            className="talk"
            data-hover
          >
            Let&apos;s talk{' '}
            <ArrowRight className="h-[1.25rem] w-[1.25rem] fill-none stroke-white stroke-[1.6]" />
          </TransitionLink>
        </div>
      </nav>
    </>
  )
}
