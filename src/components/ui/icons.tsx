import { type SVGProps } from 'react'

interface IconProps extends SVGProps<SVGSVGElement> {
  'aria-hidden'?: boolean | 'true' | 'false'
}

export function LogoMark({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 99.07 99.07" className={className} aria-hidden="true" {...props}>
      <circle cx="49.53" cy="49.53" r="49.53" fill="#222" />
      <g fill="#fff">
        <path d="M49.54,89.84c-6.85,0-12.42-5.57-12.42-12.42v-11.58c0-4.42,2.38-8.55,6.21-10.76l13.2-7.62v-4.04c0-2.49-1.34-4.81-3.49-6.05l-3.5-2.02-13.2,7.62c-3.83,2.21-8.59,2.21-12.42,0l-.95-.55c-5.93-3.42-7.97-11.03-4.55-16.96,1.66-2.88,4.34-4.94,7.55-5.8,3.21-.86,6.55-.42,9.43,1.24l14.15,8.17,14.15-8.17c2.87-1.66,6.22-2.1,9.43-1.24,3.21,.86,5.88,2.92,7.54,5.79,3.43,5.94,1.39,13.55-4.54,16.97l-14.16,8.17v26.82c0,6.85-5.57,12.42-12.42,12.42Zm6.99-36.11l-10.49,6.05c-2.16,1.24-3.5,3.56-3.5,6.05v11.58c0,3.85,3.14,6.99,6.99,6.99s6.99-3.14,6.99-6.99v-23.69Zm-1.56-21.52l.78,.45c3.83,2.21,6.21,6.33,6.21,10.76v.9l11.44-6.61c3.34-1.93,4.49-6.21,2.56-9.55-.94-1.63-2.45-2.78-4.25-3.27-1.8-.48-3.69-.24-5.31,.7l-11.44,6.61Zm-25.78-7.55c-.61,0-1.22,.08-1.82,.24-1.8,.48-3.31,1.64-4.25,3.26-1.93,3.34-.78,7.63,2.56,9.55l.95,.55c2.16,1.24,4.84,1.24,6.99,0l10.49-6.06-11.44-6.61c-1.08-.62-2.27-.94-3.48-.94Z" />
        <circle cx="26.77" cy="56.57" r="7.31" />
      </g>
    </svg>
  )
}

export function ArrowRight({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...props}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  )
}

export function ArrowLeft({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...props}>
      <path d="M20 12H4M10 18l-6-6 6-6" />
    </svg>
  )
}

export function HomeIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...props}>
      <path d="M4 10.5L12 4l8 6.5V20H4z" />
    </svg>
  )
}

export function MenuIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function StarIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...props}>
      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
    </svg>
  )
}

export function QuoteIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...props}>
      <path d="M5 40V25C5 15 10 9 20 7v6c-5 1.5-8 5-8 10h8v17z" />
      <path d="M27 40V25c0-10 5-16 15-18v6c-5 1.5-8 5-8 10h8v17z" />
    </svg>
  )
}

export function LinkedInIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...props}>
      <path d="M4.5 8.5h3v11h-3zM6 3.5a1.8 1.8 0 110 3.6 1.8 1.8 0 010-3.6zM10 8.5h2.9V10c.5-.9 1.7-1.8 3.4-1.8 3.2 0 3.7 2 3.7 4.7v6.6h-3v-5.8c0-1.4 0-3.1-1.9-3.1s-2.1 1.5-2.1 3v5.9h-3z" />
    </svg>
  )
}

export function UpworkIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...props}>
      <path d="M17.3 7.6c-2 0-3.5 1.2-4.2 3.3-.9-1.4-1.6-3-2-4.4H8.9v5.5a2.1 2.1 0 01-4.2 0V6.5H2.6V12a4.2 4.2 0 008.4 0v-.9c.4.8.9 1.6 1.4 2.3l-1.2 5.8h2.2l.9-4.2c.8.5 1.8.8 2.9.8a4.1 4.1 0 000-8.2zm0 6.1c-.9 0-1.8-.4-2.5-1l.2-.9c.2-1 .8-2.2 2.3-2.2a2 2 0 010 4.1z" />
    </svg>
  )
}

export function GitHubIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...props}>
      <path d="M12 2a10 10 0 00-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 2.9.8.1-.7.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 015 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0012 2z" />
    </svg>
  )
}

export function EyeIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...props}>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export function ShieldIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...props}>
      <path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z" />
      <path d="M8.5 12l2.4 2.4 4.6-4.8" />
    </svg>
  )
}

export function PencilIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...props}>
      <path d="M5 19l4-1 10-10a2.1 2.1 0 00-3-3L6 15z" />
      <path d="M14 7l3 3" />
    </svg>
  )
}

export function DashboardIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M9 9v11" />
    </svg>
  )
}

export function ChartIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...props}>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </svg>
  )
}

export const stageIcons = {
  eye: EyeIcon,
  shield: ShieldIcon,
  pencil: PencilIcon,
  dashboard: DashboardIcon,
  chart: ChartIcon,
} as const
