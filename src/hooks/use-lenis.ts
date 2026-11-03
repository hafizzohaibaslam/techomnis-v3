'use client'

import { useEffect, useRef, useCallback } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMotion } from './use-motion'

gsap.registerPlugin(ScrollTrigger)

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null)
  const { motionEnabled } = useMotion()

  useEffect(() => {
    if (!motionEnabled) {
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }
      return
    }

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1.3,
      gestureOrientation: 'vertical',
    })

    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const rafCallback = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(rafCallback)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [motionEnabled])

  const scrollTo = useCallback(
    (target: string | HTMLElement, options?: { immediate?: boolean; force?: boolean }) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, options)
      } else {
        const el = typeof target === 'string' ? document.querySelector(target) : target
        if (el) {
          el.scrollIntoView({ behavior: 'auto' })
        }
      }
    },
    []
  )

  const stop = useCallback(() => {
    lenisRef.current?.stop()
  }, [])

  const start = useCallback(() => {
    lenisRef.current?.start()
  }, [])

  const getLenis = useCallback(() => lenisRef.current, [])

  return { getLenis, scrollTo, stop, start }
}
