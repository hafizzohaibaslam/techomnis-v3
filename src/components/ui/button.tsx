'use client'

import { useRef, useEffect, type ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import { ArrowRight } from './icons'

interface ButtonProps extends ComponentProps<'a'> {
  isPlaceholder?: boolean
}

export function Button({ children, className, isPlaceholder, ...props }: ButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const rectRef = useRef<SVGRectElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    const rect = rectRef.current
    if (!button || !rect) return

    const updateSize = () => {
      const bounds = button.getBoundingClientRect()
      if (!bounds.width) return

      const w = Math.max(2, bounds.width - 1)
      const h = Math.max(2, bounds.height - 1)

      rect.setAttribute('width', w.toFixed(1))
      rect.setAttribute('height', h.toFixed(1))
      rect.setAttribute('rx', (h / 2).toFixed(1))
      rect.setAttribute('ry', (h / 2).toFixed(1))

      const svg = rect.closest('svg')
      if (svg) {
        svg.setAttribute('viewBox', `0 0 ${bounds.width.toFixed(1)} ${bounds.height.toFixed(1)}`)
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    document.fonts?.ready.then(updateSize)

    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return (
    <a
      ref={buttonRef}
      className={cn('btn', className)}
      data-hover
      data-btn
      {...props}
    >
      <svg className="pill" aria-hidden="true">
        <rect ref={rectRef} x="0.5" y="0.5" />
      </svg>
      <span className="lbl">{children}</span>
      {isPlaceholder && <span className="ph">Placeholder</span>}
      <span className="arw" aria-hidden="true">
        <ArrowRight className="h-full w-full fill-none stroke-current stroke-[1.6]" />
        <ArrowRight className="h-full w-full fill-none stroke-current stroke-[1.6]" />
      </span>
    </a>
  )
}
