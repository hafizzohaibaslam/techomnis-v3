'use client'

import { useRef, useEffect } from 'react'
import { featuredCase, caseStudies, totalCaseStudies } from '@/content/cases'
import { ArrowRight } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'

interface ArtPlaceholderProps {
  gradientFrom: string
  gradientTo: string
  isDark?: boolean
  rotation?: number
}

function ArtPlaceholder({ gradientFrom, gradientTo, isDark, rotation = 0 }: ArtPlaceholderProps) {
  return (
    <div
      className="art"
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
      }}
    >
      <div
        className="scr"
        style={{
          left: '10%',
          top: '18%',
          width: '46%',
          height: '88%',
          transform: `rotate(${rotation}deg)`,
          ...(isDark ? { background: '#2B2F36' } : {}),
        }}
      >
        <i style={{ top: '16%' }}></i>
        <i style={{ top: '24%', right: '40%' }}></i>
        <b
          style={{
            left: '8%',
            right: '8%',
            top: '36%',
            height: '36%',
            background: gradientTo,
            opacity: 0.55,
          }}
        ></b>
      </div>
      <div
        className="scr"
        style={{
          left: '52%',
          top: '28%',
          width: '38%',
          height: '80%',
          transform: `rotate(${rotation}deg)`,
          ...(isDark ? { background: '#2B2F36' } : {}),
        }}
      >
        <i style={{ top: '18%' }}></i>
        <b
          style={{
            left: '8%',
            width: '38%',
            top: '30%',
            height: '24%',
            background: gradientTo,
          }}
        ></b>
        <i style={{ top: '64%' }}></i>
        <i style={{ top: '72%', right: '30%' }}></i>
      </div>
    </div>
  )
}

function FeaturedOthegoArt() {
  return (
    <div
      className="art"
      style={{
        background: 'linear-gradient(120deg, #5B6CFF 0%, #8E7BFF 45%, #C9B8FF 100%)',
      }}
    >
      <div
        className="scr"
        style={{
          left: '6%',
          top: '16%',
          width: '30%',
          height: '78%',
          transform: 'rotate(-6deg)',
        }}
      >
        <i style={{ top: '18%' }}></i>
        <i style={{ top: '26%', right: '30%' }}></i>
        <b
          style={{
            left: '8%',
            right: '8%',
            top: '38%',
            height: '40%',
            background: '#EEF0FF',
          }}
        ></b>
      </div>
      <div
        className="scr"
        style={{
          left: '34%',
          top: '10%',
          width: '36%',
          height: '86%',
          transform: 'rotate(-6deg)',
        }}
      >
        <i style={{ top: '14%' }}></i>
        <b
          style={{
            left: '8%',
            width: '40%',
            top: '24%',
            height: '22%',
            background: '#5B6CFF',
          }}
        ></b>
        <b
          style={{
            right: '8%',
            width: '38%',
            top: '24%',
            height: '22%',
            background: '#E9E6FF',
          }}
        ></b>
        <i style={{ top: '56%' }}></i>
        <i style={{ top: '64%', right: '40%' }}></i>
        <i style={{ top: '72%' }}></i>
      </div>
      <div
        className="scr"
        style={{
          left: '68%',
          top: '20%',
          width: '26%',
          height: '70%',
          transform: 'rotate(-6deg)',
        }}
      >
        <i style={{ top: '20%' }}></i>
        <i style={{ top: '30%', right: '20%' }}></i>
        <b
          style={{
            left: '8%',
            right: '8%',
            top: '44%',
            height: '14%',
            background: '#222',
          }}
        ></b>
      </div>
    </div>
  )
}

function MediaLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  const moreRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const mediaEl = moreRef.current?.closest('.media')
    if (!mediaEl) return

    const handleMouseMove = (e: MouseEvent) => {
      if (window.matchMedia('(max-width: 1023px)').matches) return
      const rect = mediaEl.getBoundingClientRect()
      if (moreRef.current) {
        moreRef.current.style.left = `${e.clientX - rect.left}px`
        moreRef.current.style.top = `${e.clientY - rect.top}px`
      }
    }

    mediaEl.addEventListener('mousemove', handleMouseMove as EventListener)
    return () => mediaEl.removeEventListener('mousemove', handleMouseMove as EventListener)
  }, [])

  return (
    <a href={href} className="media" data-media data-ph aria-label={label}>
      {children}
      <div className="dark"></div>
      <span ref={moreRef} className="more" aria-hidden="true">
        Read more{' '}
        <ArrowRight className="h-[1.25rem] w-[1.25rem] fill-none stroke-white stroke-[1.6]" />
      </span>
      <span className="ph phtag">Product shot placeholder</span>
    </a>
  )
}

function FeaturedCase() {
  return (
    <div className="feature ln lb">
      <MediaLink href="#" label={`${featuredCase.name} case study (page coming soon)`}>
        <FeaturedOthegoArt />
      </MediaLink>
      <div className="feature-row">
        <div className="nm">
          <h3 className="h-medium">
            <span className="ul">{featuredCase.name}</span>
          </h3>
          <div className="tags">
            {featuredCase.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="ov">
          <div className="desc">
            <p className="h-sub">{featuredCase.subtitle}</p>
            <p className="t-reg">{featuredCase.description}</p>
          </div>
          {featuredCase.metrics.map((metric, index) => (
            <div key={index} className="met ln ll">
              <p className="h-sub">
                {metric.label} <span className="ph">Placeholder</span>
              </p>
              <p className="num">
                {metric.value.split(' ')[0]}{' '}
                {metric.value.split(' ')[1] && <small>{metric.value.split(' ')[1]}</small>}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CaseCard({
  caseStudy,
  index,
}: {
  caseStudy: (typeof caseStudies)[0]
  index: number
}) {
  const isRight = index % 2 === 1
  const rotation = index % 2 ? -5 : 4
  const isDark = caseStudy.gradientFrom === '#1E2126'

  return (
    <div className={`case ln lb ${isRight ? 'r' : 'lr'}`}>
      <MediaLink href="#" label={`${caseStudy.name} case study (page coming soon)`}>
        <ArtPlaceholder
          gradientFrom={caseStudy.gradientFrom}
          gradientTo={caseStudy.gradientTo}
          isDark={isDark}
          rotation={rotation}
        />
      </MediaLink>
      <div className="case-meta">
        <h3 className="h-small">
          <span className="ul">{caseStudy.name}</span>
        </h3>
        <div className="case-stat">
          <span className="num">{caseStudy.metric}</span>
          <p className="t-reg">{caseStudy.description}</p>
          <span className="ph">Placeholder</span>
        </div>
        <div className="tags">
          {caseStudy.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Works() {
  return (
    <section id="work" aria-label="Our works">
      <div className="wrap">
        <h2 className="h-large cases-head" data-split>
          Our works
        </h2>
        <FeaturedCase />
        <div className="g2" id="caseGrid">
          {caseStudies.map((caseStudy, index) => (
            <CaseCard key={caseStudy.id} caseStudy={caseStudy} index={index} />
          ))}
          <div className="case r ln lb view-more">
            <Button href="#" isPlaceholder>
              View all {totalCaseStudies} case studies
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
