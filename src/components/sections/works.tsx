'use client'

import { useRef, useEffect } from 'react'
import { featuredCase, caseStudies, totalCaseStudies } from '@/content/cases'
import { ArrowRight } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'

function CaseImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="art"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
    />
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
    <a href={href} className="media" data-media aria-label={label}>
      {children}
      <div className="dark"></div>
      <span ref={moreRef} className="more" aria-hidden="true">
        Read more{' '}
        <ArrowRight className="h-[1.25rem] w-[1.25rem] fill-none stroke-white stroke-[1.6]" />
      </span>
    </a>
  )
}

function FeaturedCase() {
  return (
    <div className="feature ln lb">
      <MediaLink href="#" label={`${featuredCase.name} case study`}>
        <CaseImage src={featuredCase.image} alt={featuredCase.name} />
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
              <p className="h-sub">{metric.label}</p>
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

  return (
    <div className={`case ln lb ${isRight ? 'r' : 'lr'}`}>
      <MediaLink href="#" label={`${caseStudy.name} case study`}>
        <CaseImage src={caseStudy.image} alt={caseStudy.name} />
      </MediaLink>
      <div className="case-meta">
        <h3 className="h-small">
          <span className="ul">{caseStudy.name}</span>
        </h3>
        <div className="case-stat">
          <span className="num">{caseStudy.metric}</span>
          <p className="t-reg">{caseStudy.metricLabel}</p>
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
