'use client'

import { useEffect, useRef } from 'react'
import lottie, { AnimationItem } from 'lottie-web'
import { Header } from '@/components/layout/header'

function RadarLottie() {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<AnimationItem | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    animationRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/animations/radar.json',
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet',
      },
    })

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy()
        animationRef.current = null
      }
    }
  }, [])

  return <div ref={containerRef} className="radar-lottie" />
}

export function Hero() {
  return (
    <section className="start" id="top" aria-label="Introduction">
      <div className="wrap">
        <Header />
        <div className="hero">
          <div className="hx" aria-hidden="true">
            <b className="hl" style={{ left: 0, right: 0, top: 0, height: '1px' }}></b>
            <b className="hl" style={{ left: 0, right: 0, bottom: 0, height: '1px' }}></b>
            <b className="vl" style={{ left: '50%', top: 0, bottom: 0, width: '1px' }}></b>
            <b className="vl" style={{ left: '25%', top: 0, bottom: 0, width: '1px' }}></b>
            <b className="hl" style={{ left: 0, width: '50%', top: '50%', height: '1px' }}></b>
          </div>
          <div className="g2">
            <div className="hero-left">
              <i className="mx v" aria-hidden="true"></i>
              <i className="mx h" aria-hidden="true"></i>
              <span className="cap eyebrow-s">Our process</span>
              <RadarLottie />
              <div className="legend" aria-hidden="true">
                <span>
                  <i style={{ background: '#7a7a7a' }}></i>MVP rescue
                </span>
                <span>
                  <i style={{ background: '#E4E4E4' }}></i>Full product build
                </span>
              </div>
            </div>
            <div className="hero-right">
              <h1 className="h-big" data-split>
                We ship the whole system, end to end.
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
