'use client'

import { useEffect, useRef, useCallback } from 'react'

export function useHairlineAnimation() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const L = Math.max(el.offsetWidth, el.offsetHeight)
            const dur = Math.min(12, Math.max(0.6, (L * 3) / 1000 * (1 + Math.random())))
            animateHairline(el, dur)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0 }
    )

    document.querySelectorAll('.ln').forEach((el) => {
      const htmlEl = el as HTMLElement
      htmlEl.style.setProperty('--e', '0')
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])
}

function animateHairline(el: HTMLElement, dur: number) {
  const start = performance.now()
  const animate = (now: number) => {
    const t = Math.min(1, (now - start) / (dur * 1000))
    const u = t * 3
    let s: number, e: number
    if (u < 1) {
      s = 0; e = u
    } else if (u < 2) {
      s = u - 1; e = 1
    } else {
      s = 0; e = Math.min(1, u - 2)
    }
    el.style.setProperty('--s', s.toFixed(4))
    el.style.setProperty('--e', e.toFixed(4))
    if (t < 1) requestAnimationFrame(animate)
    else {
      el.style.removeProperty('--s')
      el.style.removeProperty('--e')
    }
  }
  requestAnimationFrame(animate)
}

export function useCounterAnimation() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const end = parseFloat(el.dataset.count || '0')
            const dec = !!el.dataset.dec
            animateCounter(el, end, dec)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0 }
    )

    document.querySelectorAll('[data-count]').forEach((el) => {
      const htmlEl = el as HTMLElement
      htmlEl.textContent = htmlEl.dataset.dec ? '0.0' : '0'
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])
}

function animateCounter(el: HTMLElement, end: number, dec: boolean) {
  const dur = 3000
  const start = performance.now()
  const ease = (t: number) => {
    if (t >= 1) return 1
    return 1 - Math.pow(1 - t, 3) * (1 - t * 0.47)
  }

  const animate = (now: number) => {
    const t = Math.min(1, (now - start) / dur)
    const v = end * ease(t)
    el.textContent = dec ? v.toFixed(1) : Math.round(v).toString()
    if (t < 1) requestAnimationFrame(animate)
    else el.textContent = dec ? end.toFixed(1) : end.toString()
  }
  requestAnimationFrame(animate)
}

export function useButtonAnimation() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const makePillPath = (w: number, h: number): string => {
      const r = Math.max(1, h / 2 - 0.5)
      const x0 = 0.5, y0 = 0.5, x1 = w - 0.5, y1 = h - 0.5, c = h / 2
      return `M${x0},${c}A${r},${r} 0 0 1 ${(x0 + r).toFixed(1)},${y0}L${(x1 - r).toFixed(1)},${y0}A${r},${r} 0 0 1 ${x1.toFixed(1)},${c}A${r},${r} 0 0 1 ${(x1 - r).toFixed(1)},${y1.toFixed(1)}L${(x0 + r).toFixed(1)},${y1.toFixed(1)}A${r},${r} 0 0 1 ${x0},${c}Z`
    }

    const sizePills = () => {
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const btn = entry.target as HTMLElement
            setTimeout(() => btn.classList.add('drawn'), 500)
            observer.unobserve(btn)
          }
        })
      },
      { threshold: 0 }
    )

    document.querySelectorAll('[data-btn]:not([data-built])').forEach((btn) => {
      const el = btn as HTMLElement
      el.dataset.built = '1'
      const text = el.textContent?.trim() || ''
      el.innerHTML = `<svg class="pill" aria-hidden="true"><path pathLength="1"/></svg><span class="lbl">${text}</span><span class="arw" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 12h16M14 6l6 6-6 6"/></svg></span>`
      observer.observe(el)
    })

    document.querySelectorAll('[data-bbtn]:not([data-built])').forEach((btn) => {
      const el = btn as HTMLElement
      el.dataset.built = '1'
      const text = el.textContent?.trim() || ''
      el.innerHTML = `<span class="lbl">${text}</span><span class="arw" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 12h16M14 6l6 6-6 6"/></svg></span>`
    })

    sizePills()
    window.addEventListener('resize', sizePills)
    document.fonts?.ready.then(sizePills)

    return () => {
      window.removeEventListener('resize', sizePills)
      observer.disconnect()
    }
  }, [])
}

export function useSplitTextAnimation() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.classList.add('split-visible')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.2 }
    )

    document.querySelectorAll('[data-split]').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])
}

export function useRiseAnimation() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.classList.add('rise-visible')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.2 }
    )

    document.querySelectorAll('[data-rise]').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])
}

export function useQuoteSlider(containerRef: React.RefObject<HTMLElement | null>) {
  const currentIndex = useRef(0)

  const goTo = useCallback((index: number) => {
    const container = containerRef.current
    if (!container) return

    const slides = container.querySelectorAll('.qslide')
    const dots = container.querySelectorAll('.dots button')
    
    if (index < 0) index = slides.length - 1
    if (index >= slides.length) index = 0

    slides.forEach((slide, i) => {
      slide.classList.toggle('on', i === index)
      slide.setAttribute('aria-hidden', String(i !== index))
    })
    dots.forEach((dot, i) => {
      dot.classList.toggle('on', i === index)
      dot.setAttribute('aria-pressed', String(i === index))
    })

    currentIndex.current = index
  }, [containerRef])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const dots = container.querySelectorAll('.dots button')
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goTo(i))
    })

    let startX: number | null = null
    const box = container.querySelector('.qslides')
    if (box) {
      box.addEventListener('pointerdown', (e) => { startX = (e as PointerEvent).clientX })
      box.addEventListener('pointerup', (e) => {
        if (startX === null) return
        const dx = (e as PointerEvent).clientX - startX
        startX = null
        if (Math.abs(dx) > 40) goTo(currentIndex.current + (dx < 0 ? 1 : -1))
      })
    }
  }, [containerRef, goTo])

  return { goTo, currentIndex }
}

export function useWeBuildCrossfade() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const tw = document.getElementById('dirTw')
    if (!tw) return
    
    const ws = tw.querySelectorAll('.w')
    if (ws.length < 2) return

    let scrollHandler: (() => void) | null = null

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
          el.style.transform = 'translateY(0)'
        } else if (i < activeIndex) {
          el.style.opacity = '0'
          el.style.transform = 'translateY(-110%)'
        } else {
          el.style.opacity = '0'
          el.style.transform = 'translateY(110%)'
        }
      })
    }

    scrollHandler = handleScroll
    window.addEventListener('scroll', scrollHandler, { passive: true })
    handleScroll()

    return () => {
      if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
    }
  }, [])
}

export function useDiagramAnimation() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const svg = entry.target as SVGElement
            const paths = svg.querySelectorAll('path, line, polyline, polygon, circle, ellipse')
            
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

            const texts = svg.querySelectorAll('text')
            texts.forEach((text, i) => {
              const el = text as SVGTextElement
              el.style.opacity = '0'
              el.style.transition = `opacity 0.5s ease ${1.4 + i * 0.05}s`
              requestAnimationFrame(() => {
                el.style.opacity = '1'
              })
            })

            observer.unobserve(svg)
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('svg.dia, svg.venn, svg.pyr, svg.spiral').forEach((svg) => {
      observer.observe(svg)
    })

    return () => observer.disconnect()
  }, [])
}

export function useFooterAnimation() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cta = entry.target as HTMLElement
            cta.classList.add('ft-on')
            observer.unobserve(cta)
          }
        })
      },
      { threshold: 0.2 }
    )

    document.querySelectorAll('.ft-cta').forEach((cta) => {
      observer.observe(cta)
    })

    return () => observer.disconnect()
  }, [])
}

export function useAllAnimations() {
  useHairlineAnimation()
  useCounterAnimation()
  useButtonAnimation()
  useSplitTextAnimation()
  useRiseAnimation()
  useDiagramAnimation()
  useFooterAnimation()
}
