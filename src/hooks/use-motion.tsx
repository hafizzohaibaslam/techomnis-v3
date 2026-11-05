'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useSyncExternalStore,
  type ReactNode,
} from 'react'

interface MotionContextValue {
  motionEnabled: boolean
  setMotionEnabled: (enabled: boolean) => void
  toggleMotion: () => void
  prefersReducedMotion: boolean
}

const MotionContext = createContext<MotionContextValue | null>(null)

function getInitialMotionState(): boolean {
  if (typeof window === 'undefined') return true
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  const saved = localStorage.getItem('to-motion')
  if (saved) {
    return saved === 'on'
  }
  return !mq.matches
}

function subscribeToPrefersReducedMotion(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}

function getPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToPrefersReducedMotion,
    getPrefersReducedMotion,
    () => false
  )

  const [motionEnabled, setMotionEnabledState] = useState(getInitialMotionState)

  useEffect(() => {
    document.documentElement.classList.toggle('motion-off', !motionEnabled)
    document.documentElement.classList.toggle('js-motion', motionEnabled)
  }, [motionEnabled])

  const setMotionEnabled = useCallback((enabled: boolean) => {
    setMotionEnabledState(enabled)
    localStorage.setItem('to-motion', enabled ? 'on' : 'off')
  }, [])

  const toggleMotion = useCallback(() => {
    setMotionEnabledState((prev) => {
      const next = !prev
      localStorage.setItem('to-motion', next ? 'on' : 'off')
      return next
    })
  }, [])

  return (
    <MotionContext.Provider
      value={{
        motionEnabled,
        setMotionEnabled,
        toggleMotion,
        prefersReducedMotion,
      }}
    >
      {children}
    </MotionContext.Provider>
  )
}

export function useMotion() {
  const context = useContext(MotionContext)
  if (!context) {
    throw new Error('useMotion must be used within a MotionProvider')
  }
  return context
}
