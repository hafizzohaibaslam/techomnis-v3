'use client'

import { useEffect, useState, useCallback } from 'react'

export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        close()
        document.getElementById('mobBtn')?.focus()
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      const mpanel = document.getElementById('mpanel')
      const mobBtn = document.getElementById('mobBtn')
      if (
        isOpen &&
        mpanel &&
        mobBtn &&
        !mpanel.contains(e.target as Node) &&
        !mobBtn.contains(e.target as Node)
      ) {
        close()
      }
    }

    const handleResize = () => {
      if (window.innerWidth > 1023 && isOpen) {
        close()
      }
    }

    document.addEventListener('keydown', handleKeydown)
    document.addEventListener('click', handleClickOutside)
    window.addEventListener('resize', handleResize)

    return () => {
      document.removeEventListener('keydown', handleKeydown)
      document.removeEventListener('click', handleClickOutside)
      window.removeEventListener('resize', handleResize)
    }
  }, [isOpen, close])

  useEffect(() => {
    const mpanel = document.getElementById('mpanel')
    const menu = document.getElementById('menu')
    
    if (mpanel) {
      mpanel.classList.toggle('open', isOpen)
    }
    if (menu) {
      menu.classList.toggle('open', isOpen)
      menu.classList.toggle('wide', isOpen)
    }

    if (isOpen) {
      const firstLink = document.querySelector('#mpanel a') as HTMLElement
      firstLink?.focus()
    }
  }, [isOpen])

  return { isOpen, toggle, close }
}

export function useClock() {
  const [time, setTime] = useState('--:--')
  const [amPm, setAmPm] = useState('pm')
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
      const get = (type: string) => parts.find((p) => p.type === type)?.value || ''
      setTime(`${get('hour')}:${get('minute')}`)
      setAmPm(get('dayPeriod').toLowerCase())
      setDate(`${df.format(d)} · Lahore`)
    }

    tick()
    const interval = setInterval(tick, 15000)

    return () => clearInterval(interval)
  }, [])

  return { time, amPm, date }
}
