'use client'

import { useEffect, useRef } from 'react'
import { useMotion } from '@/hooks/use-motion'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const { motionEnabled } = useMotion()
  const posRef = useRef({ mx: -100, my: -100, x: -100, y: -100 })
  const hovRef = useRef<HTMLElement | null>(null)
  const loopingRef = useRef(false)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const isFinePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches
    const cursorOn = () => motionEnabled && isFinePointer

    document.documentElement.classList.toggle('no-cursor', !cursorOn())

    const loop = () => {
      if (!cursorOn()) {
        loopingRef.current = false
        cursor.style.opacity = '0'
        return
      }

      let tx = posRef.current.mx
      let ty = posRef.current.my

      if (hovRef.current?.isConnected) {
        const r = hovRef.current.getBoundingClientRect()
        tx = r.left + r.width / 2
        ty = r.top + r.height / 2
      }

      posRef.current.x += (tx - posRef.current.x) * 0.2
      posRef.current.y += (ty - posRef.current.y) * 0.2

      cursor.style.transform = `translate(${posRef.current.x.toFixed(1)}px, ${posRef.current.y.toFixed(1)}px) translate(-50%, -50%)`
      requestAnimationFrame(loop)
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      posRef.current.mx = e.clientX
      posRef.current.my = e.clientY

      if (cursorOn() && !cursor.dataset.hidden) {
        cursor.style.opacity = '1'
      }

      if (!loopingRef.current && cursorOn()) {
        loopingRef.current = true
        requestAnimationFrame(loop)
      }
    }

    const handleMouseLeave = () => {
      cursor.style.opacity = '0'
    }

    const handleMouseOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('[data-hover]') as HTMLElement | null
      if (el === hovRef.current) return
      hovRef.current = el

      if (el && cursorOn()) {
        const r = el.getBoundingClientRect()
        const cs = getComputedStyle(el)
        cursor.style.width = `${r.width}px`
        cursor.style.height = `${r.height}px`
        cursor.style.borderRadius = cs.borderRadius === '0px' ? '0.6rem' : cs.borderRadius
        cursor.style.backgroundColor = 'rgba(0,0,0,0.1)'
      } else {
        cursor.style.width = ''
        cursor.style.height = ''
        cursor.style.borderRadius = '50%'
        cursor.style.backgroundColor = ''
      }
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [motionEnabled])

  return <div ref={cursorRef} className="cur" id="cur" aria-hidden="true"></div>
}

export function TransitionOverlay() {
  return (
    <div className="trans" id="trans" aria-hidden="true">
      <p>
        <span id="transT">Work.</span>
      </p>
    </div>
  )
}
