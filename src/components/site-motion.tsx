'use client'

import { useEffect, useRef, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const ARR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6"/></svg>'

function bz(x1: number, y1: number, x2: number, y2: number) {
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
  css: bz(0.25, 0.1, 0.25, 1),
  hero: bz(0.45, 0, 0.55, 1),
  p1: bz(0.181, 0.691, 0.398, 0.854),
  p2: bz(0.55, 0.055, 0.825, 0.41),
  pOut: bz(0.07, 0.398, 0.462, 0.86),
  nav: bz(0.094, 0.667, 0.316, 0.802),
  mob: bz(0.55, 0.085, 0.68, 0.53),
  tIn: bz(0.645, 0.045, 0.355, 1),
  tOut: bz(0.215, 0.61, 0.355, 1),
  cnt: bz(0, 0, 0.53, 0.995),
  drift: bz(0.088, 0.533, 0.398, 0.901),
  drift3: bz(0.152, 0.322, 0.661, 0.878),
}

const $ = (s: string) => document.querySelector(s)
const $$ = (s: string) => [...document.querySelectorAll(s)]
const rem = () => parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
const isMob = () => window.matchMedia('(max-width:1023px)').matches

const ss = {
  get: (k: string) => { try { return sessionStorage.getItem(k) } catch { return null } },
  set: (k: string, v: string) => { try { sessionStorage.setItem(k, v) } catch {} }
}

function pillD(w: number, h: number) {
  const r = Math.max(1, h / 2 - 0.5), x0 = 0.5, y0 = 0.5, x1 = w - 0.5, y1 = h - 0.5, c = h / 2
  return `M${x0},${c}A${r},${r} 0 0 1 ${(x0 + r).toFixed(1)},${y0}L${(x1 - r).toFixed(1)},${y0}A${r},${r} 0 0 1 ${x1.toFixed(1)},${c}A${r},${r} 0 0 1 ${(x1 - r).toFixed(1)},${y1.toFixed(1)}L${(x0 + r).toFixed(1)},${y1.toFixed(1)}A${r},${r} 0 0 1 ${x0},${c}Z`
}

function sizePills() {
  $$('.btn svg.pill').forEach((s) => {
    const svg = s as SVGElement
    const b = svg.parentElement?.getBoundingClientRect()
    if (!b?.width) return
    svg.setAttribute('viewBox', `0 0 ${b.width.toFixed(1)} ${b.height.toFixed(1)}`)
    const path = svg.querySelector('path')
    if (path) path.setAttribute('d', pillD(b.width, b.height))
  })
}

function makeBtns() {
  $$('[data-btn]:not([data-built])').forEach((b) => {
    const el = b as HTMLElement
    el.dataset.built = '1'
    const t = el.textContent?.trim() || ''
    el.innerHTML = `<svg class="pill" aria-hidden="true"><path pathLength="1"/></svg><span class="lbl">${t}</span><span class="arw" aria-hidden="true">${ARR}</span>`
  })
  $$('[data-bbtn]:not([data-built])').forEach((b) => {
    const el = b as HTMLElement
    el.dataset.built = '1'
    const t = el.textContent?.trim() || ''
    el.innerHTML = `<span class="lbl">${t}</span><span class="arw" aria-hidden="true">${ARR}</span>`
  })
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

function draw3(el: HTMLElement, dur: number, ease: (t: number) => number, delay: number, p: string = '--') {
  const o = { u: 0 }
  seg(el, 0, p)
  return gsap.to(o, {
    u: 1, duration: dur, delay: delay || 0, ease: (t: number) => ease(t),
    onUpdate: () => seg(el, o.u, p),
    onComplete: () => {
      el.style.removeProperty(p + 's')
      el.style.removeProperty(p + 'e')
      el.dataset.lineDrawn = '1'
    }
  })
}

const lineDur = (L: number) => Math.min(12, Math.max(0.6, L * 3 / 1000 * (1 + Math.random())))

function hoverLoop(host: HTMLElement, tgt: Element, prop: string, amp: number, mode?: string) {
  let tl: gsap.core.Timeline | null = null
  host.addEventListener('mouseenter', () => {
    if (tl) tl.kill()
    const a = amp * rem()
    tl = gsap.timeline({ repeat: -1 })
    if (mode === 'nav') {
      tl.to(tgt, { [prop]: a, duration: 0.7, ease: (t: number) => E.nav(t) })
        .to(tgt, { [prop]: 0, duration: 0.7, ease: (t: number) => E.nav(t) })
    } else {
      tl.to(tgt, { [prop]: a, duration: 0.7, ease: (t: number) => E.p1(t) })
        .to(tgt, { [prop]: -a, duration: 0.7, ease: (t: number) => E.p2(t) })
    }
  })
  host.addEventListener('mouseleave', () => {
    if (tl) { tl.kill(); tl = null }
    gsap.to(tgt, { [prop]: 0, duration: mode === 'nav' ? 0.7 : 0.2, ease: (t: number) => mode === 'nav' ? E.nav(t) : E.pOut(t) })
  })
}

function bindHovers() {
  $$('.btn,.bbtn').forEach((b) => {
    const el = b as HTMLElement
    const s = el.querySelector('.arw svg')
    if (s) hoverLoop(el, s, 'x', el.classList.contains('dn') ? 0.3 : 0.2)
  })
  $$('.talk').forEach((b) => {
    const el = b as HTMLElement
    const s = el.querySelector('svg')
    if (s) hoverLoop(el, s, 'x', 0.2)
  })
  $$('[data-media]').forEach((m) => {
    const el = m as HTMLElement
    const s = el.querySelector('.more .arw svg')
    if (s) hoverLoop(el, s, 'x', 0.2)
  })
  $$('.case-menu .mi.prev').forEach((b) => {
    const el = b as HTMLElement
    const s = el.querySelector('svg')
    if (s) hoverLoop(el, s, 'x', -0.5, 'nav')
  })
  $$('.case-menu .mi.next').forEach((b) => {
    const el = b as HTMLElement
    const s = el.querySelector('svg')
    if (s) hoverLoop(el, s, 'x', 0.5, 'nav')
  })
}

function initSliders() {
  $$('[data-slider]').forEach((s) => {
    const container = s as HTMLElement
    const box = container.querySelector('.qslides') as HTMLElement | null
    const sl = [...container.querySelectorAll('.qslide')] as HTMLElement[]
    const dots = [...container.querySelectorAll('.dots button')] as HTMLElement[]
    if (!box || !sl.length) return
    
    let i = 0, busy = false
    box.classList.add('xs')
    
    const mark = () => {
      sl.forEach((x, k) => { x.classList.toggle('on', k === i); x.setAttribute('aria-hidden', String(k !== i)) })
      dots.forEach((d, k) => { d.classList.toggle('on', k === i); d.setAttribute('aria-pressed', String(k === i)) })
    }
    
    const show = (n: number, dir?: number) => {
      n = (n + sl.length) % sl.length
      if (n === i || busy) return
      const d = dir || (n > i ? 1 : -1), from = sl[i], to = sl[n]
      i = n; mark()
      busy = true
      gsap.set(to, { xPercent: 100 * d, visibility: 'visible' })
      gsap.to(from, { xPercent: -100 * d, duration: 0.5, ease: (t: number) => E.css(t) })
      gsap.to(to, { xPercent: 0, duration: 0.5, ease: (t: number) => E.css(t), onComplete: () => { busy = false; gsap.set(from, { visibility: 'hidden' }) } })
    }
    
    sl.forEach((x, k) => { gsap.set(x, { xPercent: k === 0 ? 0 : 100, visibility: k === 0 ? 'visible' : 'hidden' }) })
    mark()
    
    dots.forEach((d, k) => d.addEventListener('click', (e) => { e.stopPropagation(); show(k) }))
    
    let sx: number | null = null
    box.addEventListener('pointerdown', (e) => { sx = e.clientX })
    box.addEventListener('pointerup', (e) => { if (sx === null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 40) show(i + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1) })
    
    const nb = document.createElement('button')
    nb.type = 'button'; nb.className = 'qnext'; nb.setAttribute('aria-label', 'Next quote'); nb.innerHTML = ARR
    container.appendChild(nb)
    nb.addEventListener('click', (e) => { e.stopPropagation(); show(i + 1, 1) })
    
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0, on = false
    const loop = () => {
      cx += (tx - cx) * 0.35; cy += (ty - cy) * 0.35
      nb.style.transform = `translate(${cx.toFixed(1)}px,${cy.toFixed(1)}px) translate(-50%,-50%)`
      raf = on || Math.abs(tx - cx) + Math.abs(ty - cy) > 0.5 ? requestAnimationFrame(loop) : 0
    }
    container.addEventListener('mousemove', (e) => { if (innerWidth <= 991) return; const r = container.getBoundingClientRect(); tx = e.clientX - r.left; ty = e.clientY - r.top; if (!raf) raf = requestAnimationFrame(loop) })
    container.addEventListener('mouseenter', (e) => { if (innerWidth <= 991) return; const r = container.getBoundingClientRect(); cx = tx = e.clientX - r.left; cy = ty = e.clientY - r.top; on = true; nb.style.display = 'flex'; gsap.fromTo(nb, { opacity: 0 }, { opacity: 1, duration: 0.3, delay: 0.1, ease: 'expo.out', overwrite: true }); if (!raf) raf = requestAnimationFrame(loop) })
    container.addEventListener('mouseleave', () => { on = false; gsap.to(nb, { opacity: 0, duration: 0.1, ease: 'power4.in', overwrite: true, onComplete: () => { nb.style.display = 'none' } }) })
    container.addEventListener('click', (e) => { if (innerWidth <= 991 || (e.target as HTMLElement).closest('a,button')) return; show(i + 1, 1) })
  })
}

function finishAll() {
  $$('.ln,.vline,.header.hl').forEach((l) => {
    const el = l as HTMLElement
    ;['--s', '--e', '--hs', '--he'].forEach((k) => el.style.removeProperty(k))
    el.dataset.lineDrawn = '1'
  })
  $$('[data-count]').forEach((c) => {
    const el = c as HTMLElement
    el.textContent = el.dataset.dec ? (+el.dataset.count!).toFixed(1) : el.dataset.count!
  })
  $$('.pin,.dia-fade').forEach((c) => { (c as HTMLElement).style.opacity = '1' })
  $$('.ft-cta').forEach((f) => f.classList.add('ft-on'))
  $$('[data-drawn] *').forEach((c) => {
    const el = c as HTMLElement
    el.style.strokeDasharray = ''; el.style.strokeDashoffset = ''; el.style.opacity = ''
  })
  $$('.media .scr').forEach((c) => { (c as HTMLElement).style.translate = '' })
  $$('.btn').forEach((b) => b.classList.add('drawn'))
}

export function SiteMotion() {
  const pathname = usePathname()
  const lenisRef = useRef<Lenis | null>(null)
  const motionRef = useRef(true)
  const initializedRef = useRef(false)

  const cleanup = useCallback(() => {
    ScrollTrigger.getAll().forEach((st) => st.kill())
    
    $$('.ln,.vline,.header.hl').forEach((el) => {
      const h = el as HTMLElement
      delete h.dataset.lineDrawn
      ;['--s', '--e', '--hs', '--he'].forEach((k) => h.style.removeProperty(k))
    })
    
    $$('[data-count]').forEach((c) => {
      const el = c as HTMLElement
      el.textContent = el.dataset.dec ? '0.0' : '0'
    })
    
    $$('.btn').forEach((b) => b.classList.remove('drawn'))
    $$('.ft-cta').forEach((f) => f.classList.remove('ft-on'))
    
    $$('[data-drawn]').forEach((s) => {
      const svg = s as HTMLElement
      delete svg.dataset.drawn
      ;[...svg.querySelectorAll('path,line,polyline,polygon,circle,ellipse,rect,text,.loopdot')].forEach((p) => {
        const el = p as HTMLElement
        el.style.strokeDasharray = ''
        el.style.strokeDashoffset = ''
        el.style.opacity = ''
      })
    })
    
    $$('.pin,.dia-fade').forEach((c) => { (c as HTMLElement).style.opacity = '' })
    $$('.media .scr').forEach((c) => { (c as HTMLElement).style.translate = '' })
    
    $$('#dirTw .w').forEach((w) => {
      const el = w as HTMLElement
      el.style.transform = ''
      el.style.opacity = ''
    })
    
    $$('.qslide').forEach((s, k) => {
      const el = s as HTMLElement
      el.style.transform = ''
      el.style.visibility = ''
      el.classList.toggle('on', k === 0)
    })
    
    if (lenisRef.current) {
      lenisRef.current.destroy()
      lenisRef.current = null
    }
  }, [])

  const initMotion = useCallback(() => {
    const root = document.documentElement
    
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let saved: string | null = null
    try { saved = localStorage.getItem('to-motion') } catch {}
    const motion = saved ? saved === 'on' : !reduce
    motionRef.current = motion
    
    root.classList.toggle('motion-off', !motion)
    root.classList.toggle('js-motion', motion)
    
    makeBtns()
    sizePills()
    
    if (!motion) {
      finishAll()
      root.classList.remove('to-arrive')
      return
    }
    
    if (!lenisRef.current) {
      lenisRef.current = new Lenis({ lerp: 0.09, wheelMultiplier: 1.3, gestureOrientation: 'vertical', syncTouch: false })
      lenisRef.current.on('scroll', ScrollTrigger.update)
      gsap.ticker.add((t) => { if (lenisRef.current) lenisRef.current.raf(t * 1000) })
      gsap.ticker.lagSmoothing(0)
    }
    
    root.classList.add('js-motion')
    
    const IS_HOME = !!$('#caseGrid') || pathname === '/'
    const visited = ss.get('to-visited') === 'true'
    const page = $('#page') as HTMLElement | null
    const lcount = $('#lcount') as HTMLElement | null
    const menu = $('#menu') as HTMLElement | null
    
    const setupScrollAnimations = () => {
      $$('.ln').forEach((l) => {
        const el = l as HTMLElement
        if (el.dataset.lineDrawn === '1') return
        el.style.setProperty('--e', '0')
        const L = Math.max(el.offsetWidth, el.offsetHeight)
        ScrollTrigger.create({ trigger: el, start: 'top bottom', once: true, onEnter: () => draw3(el, lineDur(L), E.css, 0) })
      })
      
      $$('.vline').forEach((v) => {
        const el = v as HTMLElement
        if (el.dataset.lineDrawn === '1') return
        el.style.setProperty('--e', '0')
        ScrollTrigger.create({ trigger: el.parentElement, start: 'top bottom', once: true, onEnter: () => draw3(el, lineDur(el.offsetHeight), E.css, 0) })
      })
      
      $$('.header.hl').forEach((h) => draw3(h as HTMLElement, 4, E.css, 0, '--h'))
      
      $$('.hx .hl').forEach((b) => gsap.fromTo(b, { scaleX: 0, transformOrigin: '0 0' }, { scaleX: 1, duration: 2, ease: (t: number) => E.hero(t), delay: 1 }))
      $$('.hx .vl').forEach((b) => gsap.fromTo(b, { scaleY: 0, transformOrigin: '0 0' }, { scaleY: 1, duration: 2, ease: (t: number) => E.hero(t), delay: 1 }))
      
      const pio = new IntersectionObserver((es) => es.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('drawn'); pio.unobserve(en.target) }
      }))
      $$('.btn').forEach((b) => pio.observe(b))
      
      $$('.ft-cta').forEach((f) => {
        ScrollTrigger.create({ trigger: f.closest('footer') || f, start: 'top bottom', once: true, onEnter: () => f.classList.add('ft-on') })
      })
      
      const cio = new IntersectionObserver((es) => es.forEach((en) => {
        if (!en.isIntersecting) return
        const c = en.target as HTMLElement
        cio.unobserve(c)
        const end = +c.dataset.count!, dec = !!c.dataset.dec, o = { v: 0 }
        gsap.to(o, {
          v: end, duration: 3, ease: (t: number) => E.cnt(t),
          onUpdate: () => c.textContent = dec ? o.v.toFixed(1) : String(Math.round(o.v)),
          onComplete: () => c.textContent = dec ? end.toFixed(1) : String(end)
        })
      }))
      $$('[data-count]').forEach((c) => { (c as HTMLElement).textContent = (c as HTMLElement).dataset.dec ? '0.0' : '0'; cio.observe(c) })
      
      $$('.media .art').forEach((a) => {
        const art = a as HTMLElement
        const sc = [...art.querySelectorAll('.scr')] as HTMLElement[]
        if (!sc.length) return
        const m = art.closest('.media')
        const tl = gsap.timeline({ scrollTrigger: { trigger: m, start: 'top bottom', end: 'bottom top', scrub: 0.9 } })
        if (m?.closest('.feature')) {
          const X = [-7, 7, -7]
          sc.forEach((s, k) => tl.fromTo(s, { xPercent: 0 }, { xPercent: X[k % 3], duration: 85, ease: (t: number) => k % 3 === 2 ? E.drift3(t) : E.drift(t) }, 0))
          tl.to({}, { duration: 15 }, 85)
        } else {
          const Y = [[6.8, -6.8], [-3, 3], [6.5, -1]]
          sc.forEach((s, k) => {
            const [y0, y1] = Y[k % 3]
            tl.fromTo(s, { yPercent: y0 }, { yPercent: y1, duration: 100, ease: (t: number) => k % 3 === 2 ? E.drift3(t) : E.drift(t) }, 0)
          })
        }
      })
      
      const tw = $('#dirTw') as HTMLElement | null
      if (tw && !isMob()) {
        const ws = $$('#dirTw .w') as HTMLElement[]
        tw.classList.add('scrub')
        ws.forEach((w) => w.style.transform = '')
        gsap.set(ws, { opacity: 0, scale: 0.8, transformOrigin: '50% 50%' })
        const r = (v: number) => () => v * rem()
        const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: '.direction', start: 'top bottom', end: 'bottom top', scrub: 0.5, invalidateOnRefresh: true } })
        tl.fromTo(tw, { y: r(9) }, { y: r(9), duration: 10 }, 0).to(tw, { y: 0, duration: 10 }, 10).to(tw, { y: r(-15), duration: 12 }, 51).to(tw, { y: r(-32), duration: 11.5 }, 63)
          .to(ws[0], { opacity: 1, scale: 1, duration: 10 }, 10).to(ws[0], { opacity: 0, scale: 0.8, duration: 4 }, 51)
          .to(ws[1], { opacity: 1, scale: 1, duration: 13 }, 50).to(ws[1], { opacity: 0, scale: 0.8, duration: 7 }, 63)
          .to(ws[2], { opacity: 1, scale: 1, duration: 8.5 }, 66).to({}, { duration: 25.5 }, 74.5)
      }
      
      if (document.fonts) document.fonts.ready.then(() => { sizePills(); ScrollTrigger.refresh() })
    }
    
    if (IS_HOME && !visited && page && lcount && !root.classList.contains('to-arrive')) {
      const mob = isMob()
      root.classList.add('loading')
      if (lenisRef.current) lenisRef.current.stop()
      if (menu) menu.style.opacity = '0'
      lcount.style.display = 'block'
      
      const r = rem()
      gsap.set(page, { scale: 0.8, y: mob ? 150 : 80, borderRadius: mob ? '6rem' : '2.4rem', overflow: 'hidden', height: '100vh', transformOrigin: '50% 50%' })
      
      const o = { v: 0 }
      const tl = gsap.timeline({
        onComplete: () => {
          root.classList.remove('loading')
          gsap.set(page, { clearProps: 'all' })
          lcount.style.display = 'none'
          if (lenisRef.current) lenisRef.current.start()
          if (menu) gsap.to(menu, { opacity: 1, duration: 0.5 })
          ss.set('to-visited', 'true')
          setupScrollAnimations()
          ScrollTrigger.refresh()
        }
      })
      tl.to(page, { y: 0, duration: 0.9, ease: 'circ.out' }, 0.2)
        .to(o, { v: 100, duration: 2, ease: 'power1.out', onUpdate: () => { lcount.textContent = Math.round(o.v) + '%' } }, 0.7)
        .addLabel('fin')
        .to(lcount, { filter: `blur(${(mob ? 1.5 : 0.7) * r}px)`, duration: 0.5, ease: 'circ.out' }, mob ? 'fin+=0.2' : 'fin+=0.1')
        .to(lcount, { opacity: 0, duration: mob ? 0.4 : 0.5, ease: 'circ.out' }, mob ? 'fin+=0.4' : 'fin+=0.3')
        .to(page, { scale: 1, y: 0, borderRadius: 0, duration: 1, ease: 'power4.out' }, 'fin+=0.1')
      
      return
    }
    
    const setupAllAnimations = () => {
      if (!IS_HOME) ss.set('to-visited', 'true')
      setupScrollAnimations()
      
      const pins = $$('.pin') as HTMLElement[]
      if (pins.length) {
        gsap.set(pins, { opacity: 0 })
        ScrollTrigger.create({ trigger: pins[0].parentElement, start: 'top bottom', once: true, onEnter: () => pins.forEach((p, k) => gsap.to(p, { opacity: 1, duration: 0.3, ease: 'circ.out', delay: 0.3 * (k + 1) })) })
      }
      
      $$('svg.dia,svg.venn,svg.darrow,.loop,.appr svg').forEach((svg) => {
        const parts = [...svg.querySelectorAll('path,line,polyline,polygon,circle,ellipse,rect,text,.loopdot')]
        if (!parts.length) return
        const strokes: [Element, number][] = [], fades: Element[] = []
        parts.forEach((p) => {
          if (p.closest('defs,clipPath,mask')) return
          const cs = getComputedStyle(p)
          const st = cs.stroke && cs.stroke !== 'none' && parseFloat(cs.strokeWidth) > 0
          const geom = p as SVGGeometryElement
          if (st && geom.getTotalLength && cs.strokeDasharray === 'none' && (cs.fill === 'none' || cs.fillOpacity === '0' || cs.fill === 'transparent')) {
            let L = 0; try { L = geom.getTotalLength() } catch {}
            if (L > 0) { strokes.push([p, L]); return }
          }
          fades.push(p)
        })
        ;(svg as HTMLElement).dataset.drawn = '1'
        strokes.forEach(([p, L]) => { const el = p as HTMLElement; el.style.strokeDasharray = String(L); el.style.strokeDashoffset = String(L) })
        fades.forEach((p) => { (p as HTMLElement).style.opacity = '0' })
        ScrollTrigger.create({ trigger: svg, start: 'top 90%', once: true, onEnter: () => {
          strokes.forEach(([p], k) => gsap.to(p, { strokeDashoffset: 0, duration: 1.6, ease: 'power1.inOut', delay: Math.min(0.8, k * 0.08), onComplete: () => { const el = p as HTMLElement; el.style.strokeDasharray = ''; el.style.strokeDashoffset = '' } }))
          if (fades.length) gsap.to(fades, { opacity: 1, duration: 0.5, ease: 'none', delay: strokes.length ? 1.4 : 0, stagger: { amount: Math.min(0.6, fades.length * 0.05) } })
        }})
      })
      
      $$('.rnd circle').forEach((c) => {
        const circle = c as SVGCircleElement
        const L = circle.getTotalLength ? circle.getTotalLength() : 200
        gsap.fromTo(circle, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: 2, ease: (t: number) => E.css(t), delay: 0.5 })
      })
      
      initSliders()
      bindHovers()
      
      if (document.fonts) document.fonts.ready.then(() => { sizePills(); ScrollTrigger.refresh() })
    }
    
    const trans = $('#trans') as HTMLElement | null
    const trw = $('#trans .trw') as HTMLElement | null
    const transP = $('#trans p') as HTMLElement | null
    const transT = $('#transT') as HTMLElement | null
    
    if (root.classList.contains('to-arrive') && trans && trw && transP && transT) {
      const pH = transP.offsetHeight
      gsap.set(trans, { display: 'flex', visibility: 'visible', y: 0, yPercent: 0 })
      gsap.set(trw, { y: 0, yPercent: 0 })
      gsap.set(transT, { y: 0, yPercent: 0 })
      root.classList.remove('to-arrive')
      gsap.to(transT, { y: -pH, duration: 0.7, delay: 0.7, ease: (t: number) => E.tIn(t) })
      gsap.to(trans, { yPercent: -100, duration: 0.8, delay: 0.9, ease: (t: number) => E.tOut(t) })
      gsap.to(trw, { yPercent: 100, duration: 0.8, delay: 0.9, ease: (t: number) => E.tOut(t), onComplete: () => { 
        gsap.set(trans, { display: 'none', visibility: 'hidden' })
        setupAllAnimations()
        ScrollTrigger.refresh()
      } })
    } else {
      root.classList.remove('to-arrive')
      setupAllAnimations()
    }
  }, [pathname])

  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout>
    const handleResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(sizePills, 120) }
    window.addEventListener('resize', handleResize)
    
    const handlePageShow = (e: PageTransitionEvent) => { if (e.persisted) location.reload() }
    window.addEventListener('pageshow', handlePageShow)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('pageshow', handlePageShow)
      cleanup()
    }
  }, [cleanup])

  useEffect(() => {
    if (initializedRef.current) {
      cleanup()
    }
    initializedRef.current = true
    
    const timer = setTimeout(() => {
      initMotion()
    }, 200)
    
    return () => clearTimeout(timer)
  }, [pathname, cleanup, initMotion])

  return null
}
