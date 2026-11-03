'use client'

import { useEffect } from 'react'
import { Navigation } from '@/components/layout/navigation'
import { Hero } from '@/components/sections/hero'
import { Services } from '@/components/sections/services'
import { Works } from '@/components/sections/works'
import { Thesis } from '@/components/sections/thesis'
import { Direction } from '@/components/sections/direction'
import { Clients } from '@/components/sections/clients'
import { Reviews } from '@/components/sections/reviews'
import { WhyUs } from '@/components/sections/why-us'
import { Footer } from '@/components/sections/footer'
import { CustomCursor, TransitionOverlay } from '@/components/ui/cursor'
import { useLenis } from '@/hooks/use-lenis'

export default function Home() {
  useLenis()

  useEffect(() => {
    const handlePreventDefault = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[href="#"]')
      if (link) {
        e.preventDefault()
      }
    }

    document.addEventListener('click', handlePreventDefault)
    return () => document.removeEventListener('click', handlePreventDefault)
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <CustomCursor />
      <TransitionOverlay />
      <div className="page" id="page">
        <main id="main">
          <Hero />
          <Services />
          <Works />
          <Thesis />
          <Direction />
          <Clients />
          <div className="wrap">
            <Reviews />
          </div>
          <WhyUs />
        </main>
        <Footer />
      </div>
      <Navigation />
    </>
  )
}
