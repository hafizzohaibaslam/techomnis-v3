'use client'

import { useRef, useEffect, type ComponentProps, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { ArrowRight } from './icons'
import { TransitionLink } from './transition-link'

interface ButtonProps {
  children: ReactNode
  className?: string
  isPlaceholder?: boolean
  href?: string
  label?: string
}

function ButtonInner({ 
  children,
  isPlaceholder,
  rectRef 
}: { 
  children: ReactNode
  isPlaceholder?: boolean
  rectRef: React.RefObject<SVGRectElement | null>
}) {
  return (
    <>
      <svg className="pill" aria-hidden="true">
        <rect ref={rectRef} x="0.5" y="0.5" />
      </svg>
      <span className="lbl">{children}</span>
      {isPlaceholder && <span className="ph">Placeholder</span>}
      <span className="arw" aria-hidden="true">
        <ArrowRight className="h-full w-full fill-none stroke-current stroke-[1.6]" />
        <ArrowRight className="h-full w-full fill-none stroke-current stroke-[1.6]" />
      </span>
    </>
  )
}

export function Button({ children, className, isPlaceholder, href, label, ...props }: ButtonProps & Omit<ComponentProps<'a'>, 'href'>) {
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

  const isInternal = href && href.startsWith('/') && !href.startsWith('//')
  
  if (isInternal && href) {
    return (
      <TransitionLink
        ref={buttonRef}
        href={href}
        label={label}
        className={cn('btn', className)}
        data-hover
        data-btn
        {...props}
      >
        <ButtonInner isPlaceholder={isPlaceholder} rectRef={rectRef}>
          {children}
        </ButtonInner>
      </TransitionLink>
    )
  }

  return (
    <a
      ref={buttonRef}
      href={href}
      className={cn('btn', className)}
      data-hover
      data-btn
      {...props}
    >
      <ButtonInner isPlaceholder={isPlaceholder} rectRef={rectRef}>
        {children}
      </ButtonInner>
    </a>
  )
}
