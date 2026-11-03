'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { HomeIcon, ArrowRight, MenuIcon } from '@/components/ui/icons'
import { mainNavItems, sectionMappings } from '@/content/navigation'
import { useMotion } from '@/hooks/use-motion'

export function Navigation() {
  const [activeSection, setActiveSection] = useState('Home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const mobBtnRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const { motionEnabled, toggleMotion } = useMotion()

  useEffect(() => {
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
  }, [])

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

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
    [motionEnabled]
  )

  return (
    <>
      <div
        ref={panelRef}
        className={`mpanel ${mobileMenuOpen ? 'open' : ''}`}
        id="mpanel"
        role="dialog"
        aria-label="Site menu"
      >
        <a
          href="#top"
          data-go="Home"
          className={activeSection === 'Home' ? 'on' : ''}
          onClick={(e) => handleNavClick(e, '#top')}
        >
          <ArrowRight className="h-[5.13rem] w-[5.13rem] fill-none stroke-white stroke-[1.6]" />
          Home
        </a>
        <a
          href="#work"
          data-go="Work"
          className={activeSection === 'Work' ? 'on' : ''}
          onClick={(e) => handleNavClick(e, '#work')}
        >
          <ArrowRight className="h-[5.13rem] w-[5.13rem] fill-none stroke-white stroke-[1.6]" />
          Work
        </a>
        <a
          href="#services"
          data-go="Services"
          className={activeSection === 'Services' ? 'on' : ''}
          onClick={(e) => handleNavClick(e, '#services')}
        >
          <ArrowRight className="h-[5.13rem] w-[5.13rem] fill-none stroke-white stroke-[1.6]" />
          Services
        </a>
        <a
          href="#process"
          data-go="Process"
          className={activeSection === 'Process' ? 'on' : ''}
          onClick={(e) => handleNavClick(e, '#process')}
        >
          <ArrowRight className="h-[5.13rem] w-[5.13rem] fill-none stroke-white stroke-[1.6]" />
          Process
        </a>
        <a
          href="#about"
          data-go="About"
          className={activeSection === 'About' ? 'on' : ''}
          onClick={(e) => handleNavClick(e, '#about')}
        >
          <ArrowRight className="h-[5.13rem] w-[5.13rem] fill-none stroke-white stroke-[1.6]" />
          About
        </a>
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
          <a
            href="#top"
            className={`mi home ${activeSection === 'Home' ? 'on' : ''}`}
            data-hover
            data-go="Home"
            aria-label="Home"
            onClick={(e) => handleNavClick(e, '#top')}
          >
            <span className="bg"></span>
            <HomeIcon />
          </a>

          <div className="mlist">
            {mainNavItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`mi ${activeSection === item.label ? 'on' : ''}`}
                data-hover
                data-go={item.dataGo}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                <span className="bg"></span>
                {item.label}
              </a>
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

          <a
            href="#contact"
            className="talk"
            data-hover
            data-go="Contact"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Let&apos;s talk{' '}
            <ArrowRight className="h-[1.25rem] w-[1.25rem] fill-none stroke-white stroke-[1.6]" />
          </a>
        </div>
      </nav>
    </>
  )
}
