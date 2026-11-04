'use client'

import { useEffect, useRef, useMemo, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { radarAxes, radarData, radarAnimationTarget } from '@/content/stats'
import { Header } from '@/components/layout/header'

gsap.registerPlugin(useGSAP)


const CX = 200
const CY = 168
const R = 118

function getPoint(index: number, value: number): [number, number] {
  const angle = -Math.PI / 2 + index * (Math.PI / 3)
  return [CX + Math.cos(angle) * R * value, CY + Math.sin(angle) * R * value]
}

function getPoints(values: number[]): string {
  return values
    .map((v, i) => getPoint(i, v).map((n) => n.toFixed(1)).join(','))
    .join(' ')
}

function RadarChart() {
  const [motionEnabled, setMotionEnabled] = useState(true)
  const mvpRef = useRef<SVGPolygonElement>(null)
  const fullRef = useRef<SVGPolygonElement>(null)
  const currentMvp = useRef([...radarData.mvp])
  const currentFull = useRef([...radarData.full])
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  const hexOuter = useMemo(() => getPoints([1, 1, 1, 1, 1, 1]), [])
  const hexInner = useMemo(() => getPoints([0.5, 0.5, 0.5, 0.5, 0.5, 0.5]), [])

  const axes = useMemo(() => {
    return radarAxes.map((label, i) => {
      const [x, y] = getPoint(i, 1)
      const [lx, ly] = getPoint(i, 1.2)
      const textY = ly + (Math.abs(lx - CX) < 5 ? (ly < CY ? -2 : 11) : 5)
      const textAnchor: 'start' | 'middle' | 'end' =
        Math.abs(lx - CX) < 5 ? 'middle' : lx > CX ? 'start' : 'end'

      return { label, x1: CX, y1: CY, x2: x, y2: y, lx, ly: textY, textAnchor }
    })
  }, [])

  const updatePolygons = () => {
    if (mvpRef.current) {
      mvpRef.current.setAttribute('points', getPoints(currentMvp.current))
    }
    if (fullRef.current) {
      fullRef.current.setAttribute('points', getPoints(currentFull.current))
    }
  }

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let saved: string | null = null
    try { saved = localStorage.getItem('to-motion') } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMotionEnabled(saved ? saved === 'on' : !reduce)
    updatePolygons()
  }, [])

  useGSAP(
    () => {
      if (!motionEnabled) {
        if (tlRef.current) {
          tlRef.current.kill()
          tlRef.current = null
        }
        currentMvp.current = [...radarData.mvp]
        currentFull.current = [...radarData.full]
        updatePolygons()
        return
      }

      if (tlRef.current) return

      const mvpTarget = Object.fromEntries(radarAnimationTarget.mvp.map((v, i) => [i, v]))
      const fullTarget = Object.fromEntries(radarAnimationTarget.full.map((v, i) => [i, v]))

      tlRef.current = gsap.timeline({ repeat: -1, yoyo: true })
      tlRef.current
        .to(currentMvp.current, {
          ...mvpTarget,
          duration: 2.6,
          ease: 'sine.inOut',
          onUpdate: updatePolygons,
        }, 0)
        .to(currentFull.current, {
          ...fullTarget,
          duration: 2.6,
          ease: 'sine.inOut',
        }, 0)

      return () => {
        if (tlRef.current) {
          tlRef.current.kill()
          tlRef.current = null
        }
      }
    },
    { dependencies: [motionEnabled] }
  )

  return (
    <svg
      className="radar"
      viewBox="0 0 400 336"
      role="img"
      aria-label="Process radar: how an MVP rescue and a full product build weight Audit, Blueprint, Build, Ship, Scale and Support"
    >
      <polygon
        points={hexOuter}
        fill="#fff"
        stroke="#9a9a9a"
        strokeWidth="1"
      />
      <polygon
        points={hexInner}
        fill="none"
        stroke="#d6d6d6"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      <g stroke="#e6e6e6" strokeWidth="1" strokeDasharray="3 3">
        {axes.map((axis, i) => (
          <line
            key={i}
            x1={axis.x1}
            y1={axis.y1}
            x2={axis.x2.toFixed(1)}
            y2={axis.y2.toFixed(1)}
          />
        ))}
      </g>
      <polygon
        ref={fullRef}
        points={getPoints(radarData.full)}
        fill="#E4E4E4"
        fillOpacity="0.9"
        stroke="#9a9a9a"
        strokeWidth="1"
      />
      <polygon
        ref={mvpRef}
        points={getPoints(radarData.mvp)}
        fill="#7a7a7a"
        fillOpacity="0.85"
        stroke="#5e5e5e"
        strokeWidth="1"
      />
      <g>
        {axes.map((axis, i) => (
          <text
            key={i}
            x={axis.lx.toFixed(1)}
            y={axis.ly.toFixed(1)}
            textAnchor={axis.textAnchor}
          >
            {axis.label}
          </text>
        ))}
      </g>
    </svg>
  )
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
              <RadarChart />
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
