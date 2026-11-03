'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { directionTitles, directionItems } from '@/content/navigation'
import { Button } from '@/components/ui/button'
import { useMotion } from '@/hooks/use-motion'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function Direction() {
  const { motionEnabled } = useMotion()
  const [currentTitle, setCurrentTitle] = useState(0)
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([])

  useGSAP(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(max-width: 1023px)').matches) return
    if (!motionEnabled) return

    const triggers: ScrollTrigger[] = []

    directionItems.forEach((item) => {
      const cell = document.querySelector(`[data-dir="${item.group}"]`)
      if (!cell) return

      const trigger = ScrollTrigger.create({
        trigger: cell,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => {
          if (self.isActive) {
            setCurrentTitle(item.group)
          }
        },
      })
      triggers.push(trigger)
    })

    return () => {
      triggers.forEach((t) => t.kill())
    }
  }, { dependencies: [motionEnabled] })

  useEffect(() => {
    if (!motionEnabled) return

    wordsRef.current.forEach((word, index) => {
      if (!word) return
      if (index === currentTitle) {
        gsap.to(word, { yPercent: 0, duration: 0.6, ease: 'power3.inOut' })
      } else {
        const direction = index < currentTitle ? -110 : 110
        gsap.to(word, { yPercent: direction, duration: 0.6, ease: 'power3.inOut' })
      }
    })
  }, [currentTitle, motionEnabled])

  return (
    <section className="direction" aria-label="What we build">
      <div className="wrap">
        <span className="vline" aria-hidden="true"></span>
        <div className="dir-grid">
          <div className="dir-left">
            <div className="dir-title">
              <h2 className="tw h-large" id="dirTw">
                {directionTitles.map((title, index) => (
                  <span
                    key={index}
                    className="w"
                    ref={(el) => { wordsRef.current[index] = el }}
                    aria-hidden={index !== 0}
                    style={index !== 0 ? { transform: 'translateY(110%)' } : undefined}
                  >
                    {title}
                  </span>
                ))}
              </h2>
            </div>
          </div>
          <div className="dir-right">
            <div className="dir-cell center ln lt lb" data-dir="0">
              <h3 className="h-sub">AI / LLM products</h3>
            </div>
            <div className="g2">
              <div className="dir-cell center ln lr lb" data-dir="0">
                <h3 className="h-sub">MVP rescue</h3>
              </div>
              <div className="dir-cell center ln lb" data-dir="1">
                <h3 className="h-sub">SaaS</h3>
              </div>
            </div>
            <div className="g2">
              <div className="dir-cell center ln lr lb" data-dir="1">
                <h3 className="h-sub">Marketplaces</h3>
              </div>
              <div className="dir-cell center ln lb" data-dir="1">
                <h3 className="h-sub">EdTech</h3>
              </div>
            </div>
            <div className="dir-cell center ln lb" data-dir="2">
              <h3 className="h-sub">Web · Mobile · Cloud</h3>
            </div>
            <div className="dir-cell center ln lb" data-dir="2">
              <Button href="#services" data-go="Services">
                Explore our services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
