'use client'

import { useRef, useEffect } from 'react'
import { caseStudies, type CaseStudy } from '@/content/cases'
import { ArrowRight } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'

const featuredCase = caseStudies.find(c => c.isFeatured) || caseStudies[0]
const displayCases = caseStudies.filter(c => c.id !== featuredCase.id).slice(0, 4)
const totalCaseStudies = caseStudies.length

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
  const metrics = featuredCase.results.slice(0, 2)
  
  return (
    <div className="feature ln lb">
      <MediaLink href={`/work/${featuredCase.slug}`} label={`${featuredCase.name} case study`}>
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
            <p className="h-sub">{featuredCase.tagline}</p>
            <p className="t-reg">{featuredCase.description}</p>
          </div>
          {metrics.map((metric, index) => (
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
  caseStudy: CaseStudy
  index: number
}) {
  const isRight = index % 2 === 1
  const primaryMetric = caseStudy.results[0]

  return (
    <div className={`case ln lb ${isRight ? 'r' : 'lr'}`}>
      <MediaLink href={`/work/${caseStudy.slug}`} label={`${caseStudy.name} case study`}>
        <CaseImage src={caseStudy.image} alt={caseStudy.name} />
      </MediaLink>
      <div className="case-meta">
        <h3 className="h-small">
          <span className="ul">{caseStudy.name}</span>
        </h3>
        <div className="case-stat">
          <span className="num">{primaryMetric?.value || 'TBC'}</span>
          <p className="t-reg">{primaryMetric?.label || 'Metrics coming soon'}</p>
        </div>
        <div className="tags">
          {caseStudy.tags.slice(0, 3).map((tag) => (
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
          {displayCases.map((caseStudy, index) => (
            <CaseCard key={caseStudy.id} caseStudy={caseStudy} index={index} />
          ))}
          <div className="case r ln lb view-more">
            <Button href="/work">
              View all {totalCaseStudies} case studies
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
