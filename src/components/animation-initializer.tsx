'use client'

import { useEffect, useRef, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { useMotion } from '@/hooks/use-motion'

const ARR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6"/></svg>'

function bezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by
  const X = (t: number) => ((ax * t + bx) * t + cx) * t
  const Y = (t: number) => ((ay * t + by) * t + cy) * t
  const D = (t: number) => (3 * ax * t + 2 * bx) * t + cx
  return (x: number) => {
    if (x <= 0) return 0
    if (x >= 1) return 1
    let t = x
    for (let i = 0; i < 8; i++) {
      const e = X(t) - x
      if (Math.abs(e) < 1e-6) return Y(t)
      const d = D(t)
      if (Math.abs(d) < 1e-6) break
      t -= e / d
    }
    let lo = 0, hi = 1
    t = x
    for (let i = 0; i < 40; i++) {
      if (X(t) < x) lo = t
      else hi = t
      t = (lo + hi) / 2
    }
    return Y(t)
  }
}

const E = {
  css: bezier(0.25, 0.1, 0.25, 1),
  cnt: bezier(0, 0, 0.53, 0.995),
  p1: bezier(0.181, 0.691, 0.398, 0.854),
  p2: bezier(0.55, 0.055, 0.825, 0.41),
  pOut: bezier(0.07, 0.398, 0.462, 0.86),
}

function seg(el: HTMLElement, u: number, p: string) {
  u *= 3
  let s: number, e: number
  if (u < 1) { s = 0; e = u }
  else if (u < 2) { s = u - 1; e = 1 }
  else { s = 0; e = Math.min(1, u - 2) }
  el.style.setProperty(p + 's', s.toFixed(4))
  el.style.setProperty(p + 'e', e.toFixed(4))
}

function draw3(el: HTMLElement, dur: number, ease: (t: number) => number, p: string = '--') {
  const start = performance.now()
  const animate = () => {
    const t = Math.min(1, (performance.now() - start) / (dur * 1000))
    seg(el, ease(t), p)
    if (t < 1) requestAnimationFrame(animate)
    else {
      el.style.removeProperty(p + 's')
      el.style.removeProperty(p + 'e')
    }
  }
  requestAnimationFrame(animate)
}

const lineDur = (L: number) => Math.min(12, Math.max(0.6, L * 3 / 1000 * (1 + Math.random())))

function makePillPath(w: number, h: number): string {
  const r = Math.max(1, h / 2 - 0.5)
  const x0 = 0.5, y0 = 0.5, x1 = w - 0.5, y1 = h - 0.5, c = h / 2
  return `M${x0},${c}A${r},${r} 0 0 1 ${(x0 + r).toFixed(1)},${y0}L${(x1 - r).toFixed(1)},${y0}A${r},${r} 0 0 1 ${x1.toFixed(1)},${c}A${r},${r} 0 0 1 ${(x1 - r).toFixed(1)},${y1.toFixed(1)}L${(x0 + r).toFixed(1)},${y1.toFixed(1)}A${r},${r} 0 0 1 ${x0},${c}Z`
}

function sizePills() {
  document.querySelectorAll('.btn svg.pill').forEach((svg) => {
    const parent = svg.parentElement
    if (!parent) return
    const rect = parent.getBoundingClientRect()
    if (!rect.width) return
    svg.setAttribute('viewBox', `0 0 ${rect.width.toFixed(1)} ${rect.height.toFixed(1)}`)
    const path = svg.querySelector('path')
    if (path) path.setAttribute('d', makePillPath(rect.width, rect.height))
  })
}

function hoverLoop(host: HTMLElement, tgt: SVGElement, prop: string, amp: number) {
  let animating = false
  let currentX = 0
  let targetX = 0
  
  const animate = () => {
    if (!animating) return
    currentX += (targetX - currentX) * 0.15
    tgt.style.transform = `translate${prop.toUpperCase()}(${currentX}px)`
    if (Math.abs(targetX - currentX) > 0.1) {
      requestAnimationFrame(animate)
    } else {
      tgt.style.transform = `translate${prop.toUpperCase()}(${targetX}px)`
    }
  }
  
  const rem = () => parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
  let loopId: number | null = null
  let phase = 0
  
  const loop = () => {
    phase += 0.05
    targetX = Math.sin(phase) * amp * rem()
    if (animating) loopId = requestAnimationFrame(loop)
  }
  
  host.addEventListener('mouseenter', () => {
    animating = true
    phase = 0
    loop()
    animate()
  })
  
  host.addEventListener('mouseleave', () => {
    animating = false
    if (loopId) cancelAnimationFrame(loopId)
    targetX = 0
    const reset = () => {
      currentX += (0 - currentX) * 0.2
      tgt.style.transform = `translateX(${currentX}px)`
      if (Math.abs(currentX) > 0.1) requestAnimationFrame(reset)
      else tgt.style.transform = ''
    }
    reset()
  })
}

export function AnimationInitializer() {
  const { motionEnabled } = useMotion()
  const pathname = usePathname()
  const observersRef = useRef<IntersectionObserver[]>([])
  const cleanupRef = useRef<(() => void) | null>(null)

  const initAnimations = useCallback(() => {
    // Clean up previous observers
    observersRef.current.forEach((obs) => obs.disconnect())
    observersRef.current = []

    if (!motionEnabled) {
      document.querySelectorAll('.ln, .vline, .header.hl').forEach((l) => {
        const el = l as HTMLElement
        ;['--s', '--e', '--hs', '--he'].forEach((k) => el.style.removeProperty(k))
      })
      document.querySelectorAll('[data-count]').forEach((c) => {
        const el = c as HTMLElement
        el.textContent = el.dataset.dec
          ? parseFloat(el.dataset.count || '0').toFixed(1)
          : el.dataset.count || '0'
      })
      document.querySelectorAll('.ft-cta').forEach((f) => f.classList.add('ft-on'))
      document.querySelectorAll('.btn').forEach((b) => b.classList.add('drawn'))
      return
    }

    document.querySelectorAll('[data-btn]:not([data-built])').forEach((btn) => {
      const el = btn as HTMLElement
      el.dataset.built = '1'
      const text = el.textContent?.trim() || ''
      el.innerHTML = `<svg class="pill" aria-hidden="true"><path pathLength="1"/></svg><span class="lbl">${text}</span><span class="arw" aria-hidden="true">${ARR}</span>`
    })

    document.querySelectorAll('[data-bbtn]:not([data-built])').forEach((btn) => {
      const el = btn as HTMLElement
      el.dataset.built = '1'
      const text = el.textContent?.trim() || ''
      el.innerHTML = `<span class="lbl">${text}</span><span class="arw" aria-hidden="true">${ARR}</span>`
    })

    sizePills()
    window.addEventListener('resize', sizePills)
    document.fonts?.ready.then(sizePills)

    const lnObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const L = Math.max(el.offsetWidth, el.offsetHeight)
            draw3(el, lineDur(L), E.css)
            lnObserver.unobserve(el)
          }
        })
      },
      { threshold: 0 }
    )
    document.querySelectorAll('.ln').forEach((el) => {
      const htmlEl = el as HTMLElement
      htmlEl.style.setProperty('--e', '0')
      lnObserver.observe(el)
    })
    observersRef.current.push(lnObserver)

    const vlineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            draw3(el, lineDur(el.offsetHeight), E.css)
            vlineObserver.unobserve(el)
          }
        })
      },
      { threshold: 0 }
    )
    document.querySelectorAll('.vline').forEach((el) => {
      const htmlEl = el as HTMLElement
      htmlEl.style.setProperty('--e', '0')
      vlineObserver.observe(el)
    })
    observersRef.current.push(vlineObserver)

    document.querySelectorAll('.header.hl').forEach((h) => {
      draw3(h as HTMLElement, 4, E.css, '--h')
    })

    const btnObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const btn = entry.target as HTMLElement
            setTimeout(() => btn.classList.add('drawn'), 500)
            btnObserver.unobserve(btn)
          }
        })
      },
      { threshold: 0 }
    )
    document.querySelectorAll('.btn').forEach((btn) => btnObserver.observe(btn))
    observersRef.current.push(btnObserver)

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const end = parseFloat(el.dataset.count || '0')
            const dec = !!el.dataset.dec
            animateCounter(el, end, dec)
            counterObserver.unobserve(el)
          }
        })
      },
      { threshold: 0 }
    )
    document.querySelectorAll('[data-count]').forEach((el) => {
      const htmlEl = el as HTMLElement
      htmlEl.textContent = htmlEl.dataset.dec ? '0.0' : '0'
      counterObserver.observe(el)
    })
    observersRef.current.push(counterObserver)

    const ftObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cta = entry.target as HTMLElement
            cta.classList.add('ft-on')
            ftObserver.unobserve(cta)
          }
        })
      },
      { threshold: 0.2 }
    )
    document.querySelectorAll('.ft-cta').forEach((cta) => ftObserver.observe(cta))
    observersRef.current.push(ftObserver)

    const diaObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const svg = entry.target as SVGElement
            animateDiagram(svg)
            diaObserver.unobserve(svg)
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('svg.dia, svg.venn, svg.pyr, svg.spiral, .loop, .appr svg').forEach((svg) => {
      diaObserver.observe(svg)
    })
    observersRef.current.push(diaObserver)

    document.querySelectorAll('.btn, .bbtn').forEach((b) => {
      const btn = b as HTMLElement
      const svg = btn.querySelector('.arw svg') as SVGElement | null
      if (svg) hoverLoop(btn, svg, 'x', 0.2)
    })
    document.querySelectorAll('.talk').forEach((b) => {
      const btn = b as HTMLElement
      const svg = btn.querySelector('svg') as SVGElement | null
      if (svg) hoverLoop(btn, svg, 'x', 0.2)
    })
    document.querySelectorAll('[data-media]').forEach((m) => {
      const media = m as HTMLElement
      const svg = media.querySelector('.more .arw svg') as SVGElement | null
      if (svg) hoverLoop(media, svg, 'x', 0.2)
    })

    const pinObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pins = document.querySelectorAll('.pin')
            pins.forEach((pin, i) => {
              const el = pin as HTMLElement
              el.style.opacity = '0'
              setTimeout(() => {
                el.style.transition = 'opacity 0.3s ease-out'
                el.style.opacity = '1'
              }, 300 * (i + 1))
            })
            pinObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    const mapContainer = document.querySelector('.map')
    if (mapContainer) pinObserver.observe(mapContainer)
    observersRef.current.push(pinObserver)

    // Quote slider (About page)
    document.querySelectorAll('[data-slider]').forEach((slider) => {
      initQuoteSlider(slider as HTMLElement)
    })

    // "What we build" crossfade (homepage direction section)
    initWeBuildCrossfade()

    cleanupRef.current = () => {
      window.removeEventListener('resize', sizePills)
      observersRef.current.forEach((obs) => obs.disconnect())
      observersRef.current = []
    }
  }, [motionEnabled])

  useEffect(() => {
    // Small delay to ensure DOM is ready after navigation
    const timer = setTimeout(() => {
      initAnimations()
    }, 100)

    return () => {
      clearTimeout(timer)
      if (cleanupRef.current) {
        cleanupRef.current()
        cleanupRef.current = null
      }
    }
  }, [pathname, initAnimations])

  return null
}

function animateCounter(el: HTMLElement, end: number, dec: boolean) {
  const dur = 3000
  const start = performance.now()
  el.classList.add('counted')
  const animate = () => {
    const t = Math.min(1, (performance.now() - start) / dur)
    const v = end * E.cnt(t)
    el.textContent = dec ? v.toFixed(1) : Math.round(v).toString()
    if (t < 1) requestAnimationFrame(animate)
    else el.textContent = dec ? end.toFixed(1) : end.toString()
  }
  requestAnimationFrame(animate)
}

function animateDiagram(svg: SVGElement) {
  const paths = svg.querySelectorAll('path, line, polyline, polygon, circle, ellipse')
  const texts = svg.querySelectorAll('text')

  paths.forEach((path, i) => {
    const el = path as SVGGeometryElement
    if (el.getTotalLength) {
      try {
        const length = el.getTotalLength()
        el.style.strokeDasharray = `${length}`
        el.style.strokeDashoffset = `${length}`
        el.style.transition = `stroke-dashoffset 1.6s ease-in-out ${i * 0.08}s`
        requestAnimationFrame(() => {
          el.style.strokeDashoffset = '0'
        })
      } catch {
        // Some elements may not support getTotalLength
      }
    }
  })

  texts.forEach((text, i) => {
    const el = text as SVGTextElement
    el.style.opacity = '0'
    el.style.transition = `opacity 0.5s ease ${1.4 + i * 0.05}s`
    requestAnimationFrame(() => {
      el.style.opacity = '1'
    })
  })
}

function initQuoteSlider(container: HTMLElement) {
  const box = container.querySelector('.qslides') as HTMLElement | null
  const slides = container.querySelectorAll('.qslide')
  const dots = container.querySelectorAll('.dots button')
  if (!box || !slides.length) return

  let currentIndex = 0
  let busy = false

  // Add xs class for CSS grid stacking
  box.classList.add('xs')

  const mark = () => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('on', i === currentIndex)
      slide.setAttribute('aria-hidden', String(i !== currentIndex))
    })
    dots.forEach((dot, i) => {
      dot.classList.toggle('on', i === currentIndex)
      dot.setAttribute('aria-pressed', String(i === currentIndex))
    })
  }

  const show = (n: number, dir?: number) => {
    n = (n + slides.length) % slides.length
    if (n === currentIndex || busy) return
    const d = dir || (n > currentIndex ? 1 : -1)
    const from = slides[currentIndex] as HTMLElement
    const to = slides[n] as HTMLElement
    currentIndex = n
    mark()

    busy = true
    to.style.transform = `translateX(${100 * d}%)`
    to.style.visibility = 'visible'
    
    requestAnimationFrame(() => {
      from.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)'
      to.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)'
      from.style.transform = `translateX(${-100 * d}%)`
      to.style.transform = 'translateX(0)'
      
      setTimeout(() => {
        busy = false
        from.style.visibility = 'hidden'
        from.style.transition = ''
        to.style.transition = ''
      }, 500)
    })
  }

  // Initialize slide positions (CSS grid stacks them, we use transform for positioning)
  slides.forEach((slide, i) => {
    const el = slide as HTMLElement
    el.style.transform = i === 0 ? 'translateX(0)' : 'translateX(100%)'
    el.style.visibility = i === 0 ? 'visible' : 'hidden'
  })
  mark()

  dots.forEach((dot, i) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation()
      show(i)
    })
  })

  let startX: number | null = null
  box.addEventListener('pointerdown', (e) => { startX = e.clientX })
  box.addEventListener('pointerup', (e) => {
    if (startX === null) return
    const dx = e.clientX - startX
    startX = null
    if (Math.abs(dx) > 40) show(currentIndex + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1)
  })

  // Cursor-following next button
  const nb = document.createElement('button')
  nb.type = 'button'
  nb.className = 'qnext'
  nb.setAttribute('aria-label', 'Next quote')
  nb.innerHTML = ARR
  container.appendChild(nb)

  nb.addEventListener('click', (e) => {
    e.stopPropagation()
    show(currentIndex + 1, 1)
  })

  let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0, on = false

  const loop = () => {
    cx += (tx - cx) * 0.35
    cy += (ty - cy) * 0.35
    nb.style.transform = `translate(${cx.toFixed(1)}px, ${cy.toFixed(1)}px) translate(-50%, -50%)`
    raf = (on || Math.abs(tx - cx) + Math.abs(ty - cy) > 0.5) ? requestAnimationFrame(loop) : 0
  }

  container.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 991) return
    const r = container.getBoundingClientRect()
    tx = e.clientX - r.left
    ty = e.clientY - r.top
    if (!raf) raf = requestAnimationFrame(loop)
  })

  container.addEventListener('mouseenter', (e) => {
    if (window.innerWidth <= 991) return
    const r = container.getBoundingClientRect()
    cx = tx = e.clientX - r.left
    cy = ty = e.clientY - r.top
    on = true
    nb.style.display = 'flex'
    nb.style.opacity = '0'
    requestAnimationFrame(() => {
      nb.style.transition = 'opacity 0.3s ease-out'
      nb.style.opacity = '1'
    })
    if (!raf) raf = requestAnimationFrame(loop)
  })

  container.addEventListener('mouseleave', () => {
    on = false
    nb.style.transition = 'opacity 0.1s ease-in'
    nb.style.opacity = '0'
    setTimeout(() => { nb.style.display = 'none' }, 100)
  })

  container.addEventListener('click', (e) => {
    if (window.innerWidth <= 991 || (e.target as HTMLElement).closest('a, button')) return
    show(currentIndex + 1, 1)
  })
}

function initWeBuildCrossfade() {
  const tw = document.getElementById('dirTw')
  if (!tw) return
  
  const ws = tw.querySelectorAll('.w')
  if (ws.length < 2) return

  tw.classList.add('scrub')
  ws.forEach((w) => {
    const el = w as HTMLElement
    el.style.opacity = '0'
    el.style.transform = 'translateY(110%) scale(0.8)'
    el.style.transformOrigin = '50% 50%'
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease'
  })
  // Show first one
  const first = ws[0] as HTMLElement
  first.style.opacity = '1'
  first.style.transform = 'translateY(0) scale(1)'

  const handleScroll = () => {
    const section = tw.closest('.direction')
    if (!section) return
    
    const rect = section.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (viewportHeight + rect.height)))
    
    const thresholds = [0, 0.4, 0.7]
    let activeIndex = 0
    thresholds.forEach((th, i) => {
      if (progress >= th) activeIndex = i
    })

    ws.forEach((w, i) => {
      const el = w as HTMLElement
      if (i === activeIndex) {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0) scale(1)'
      } else if (i < activeIndex) {
        el.style.opacity = '0'
        el.style.transform = 'translateY(-110%) scale(0.8)'
      } else {
        el.style.opacity = '0'
        el.style.transform = 'translateY(110%) scale(0.8)'
      }
    })
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
}
