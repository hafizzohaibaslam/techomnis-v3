'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { HomeIcon, ArrowRight, MenuIcon } from '@/components/ui/icons'
import { useMotion } from '@/hooks/use-motion'

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
  const [activeSection, setActiveSection] = useState('Home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const mobBtnRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const { motionEnabled, toggleMotion } = useMotion()

  useEffect(() => {
    if (!isHomePage) {
      const current = navItems.find((item) => pathname.startsWith(item.href))
      setActiveSection(current?.label || 'Home')
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
  }, [isHomePage, pathname])

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

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!isHomePage) return
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: motionEnabled ? 'smooth' : 'auto' })
        if (href === '#contact') {
          const ctaLink = target.querySelector('.ft-cta a')
          if (ctaLink) (ctaLink as HTMLElement).focus({ preventScroll: true })
        } else {
          ;(target as HTMLElement).setAttribute('tabindex', '-1')
          ;(target as HTMLElement).focus({ preventScroll: true })
        }
      }
      setMobileMenuOpen(false)
    },
    [motionEnabled, isHomePage]
  )

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
        <Link
          href="/"
          className={activeSection === 'Home' ? 'on' : ''}
          onClick={closeMobileMenu}
        >
          <ArrowRight className="h-[5.13rem] w-[5.13rem] fill-none stroke-white stroke-[1.6]" />
          Home
        </Link>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={activeSection === item.label ? 'on' : ''}
            onClick={closeMobileMenu}
          >
            <ArrowRight className="h-[5.13rem] w-[5.13rem] fill-none stroke-white stroke-[1.6]" />
            {item.label}
          </Link>
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
          <Link
            href="/"
            className={`mi home ${activeSection === 'Home' ? 'on' : ''}`}
            data-hover
            aria-label="Home"
          >
            <span className="bg"></span>
            <HomeIcon />
          </Link>

          <div className="mlist">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`mi ${activeSection === item.label ? 'on' : ''}`}
                data-hover
              >
                <span className="bg"></span>
                {item.label}
              </Link>
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

          <Link
            href="/contact"
            className="talk"
            data-hover
          >
            Let&apos;s talk{' '}
            <ArrowRight className="h-[1.25rem] w-[1.25rem] fill-none stroke-white stroke-[1.6]" />
          </Link>
        </div>
      </nav>
    </>
  )
}
