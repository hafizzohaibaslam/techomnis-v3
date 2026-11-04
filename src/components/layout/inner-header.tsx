'use client'

import { useEffect, useState, useCallback } from 'react'
import { TransitionLink } from '@/components/ui/transition-link'
import { LogoMark } from '@/components/ui/icons'

function MotionToggle() {
  const [motionEnabled, setMotionEnabled] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let saved: string | null = null
    try { saved = localStorage.getItem('to-motion') } catch {}
    /* eslint-disable react-hooks/set-state-in-effect */
    setMotionEnabled(saved ? saved === 'on' : !reduce)
    setMounted(true)
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [])

  const toggleMotion = useCallback(() => {
    const newValue = !motionEnabled
    setMotionEnabled(newValue)
    try { localStorage.setItem('to-motion', newValue ? 'on' : 'off') } catch {}
    if (newValue) location.reload()
  }, [motionEnabled])

  if (!mounted) return null

  return (
    <button
      className="motion"
      type="button"
      aria-pressed={!motionEnabled}
      aria-label="Reduce motion"
      title="Reduce motion"
      data-hover
      onClick={toggleMotion}
    >
      <span className="bars" aria-hidden="true">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </span>
    </button>
  )
}

function Clock() {
  const [time, setTime] = useState('--:--')
  const [ap, setAp] = useState('pm')
  const [date, setDate] = useState('Lahore')

  useEffect(() => {
    const tf = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Karachi',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })

    const df = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Karachi',
      month: 'long',
      day: 'numeric',
    })

    const tick = () => {
      const d = new Date()
      const parts = tf.formatToParts(d)
      const getPart = (type: string) =>
        parts.find((x) => x.type === type)?.value || ''

      setTime(`${getPart('hour')}:${getPart('minute')}`)
      setAp(getPart('dayPeriod').toLowerCase())
      setDate(`${df.format(d)} · Lahore`)
    }

    tick()
    const interval = setInterval(tick, 15000)
    return () => clearInterval(interval)
  }, [])

  return (
    <p className="date">
      <span className="sr">Local time in Lahore: </span>
      <span className="time">{time}</span>
      <span className="dcol">
        <span className="ap">{ap}</span>
        <span className="dd">{date}</span>
      </span>
    </p>
  )
}

export function InnerHeader() {
  return (
    <header className="header hl">
      <TransitionLink
        href="/"
        label="Home"
        className="logo"
        data-hover
        data-go="Home"
        aria-label="TechOmnis home"
      >
        <span className="mark">
          <LogoMark className="h-[2.65rem] w-[2.65rem]" />
          techomnis
        </span>
        <span className="vr" aria-hidden="true"></span>
        <span className="desc">
          End-to-end
          <br />
          product
          <br />
          engineering
        </span>
      </TransitionLink>
      <div className="hctl">
        <MotionToggle />
        <Clock />
      </div>
    </header>
  )
}
