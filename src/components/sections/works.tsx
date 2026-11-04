'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { cases, type CaseStudy } from '@/content/cases'
import { ArrowRight } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'

const featuredCase = cases[0]
const displayCases = cases.slice(1, 5)
const totalCaseStudies = cases.length

function CaseArt({ gradient, rotation = -5 }: { gradient: [string, string]; rotation?: number }) {
  const gradientStyle = `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`
  return (
    <div className="art" style={{ background: gradientStyle }}>
      <div
        className="scr"
        style={{
          left: '10%',
          top: '18%',
          width: '46%',
          height: '88%',
          transform: `rotate(${rotation}deg)`,
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
            background: gradient[1],
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
        }}
      >
        <i style={{ top: '18%' }}></i>
        <b
          style={{
            left: '8%',
            width: '38%',
            top: '30%',
            height: '24%',
            background: gradient[1],
          }}
        ></b>
        <i style={{ top: '64%' }}></i>
        <i style={{ top: '72%', right: '30%' }}></i>
      </div>
    </div>
  )
}

function MediaLink({
  href,
  label,
  children,
  hasPage,
}: {
  href: string
  label: string
  children: React.ReactNode
  hasPage: boolean
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

  if (!hasPage) {
    return (
      <div className="media" data-media data-ph aria-label={label}>
        {children}
        <div className="dark"></div>
        <span ref={moreRef} className="more" aria-hidden="true">
          Coming soon
        </span>
        <span className="ph phtag">Product shot placeholder</span>
      </div>
    )
  }

  return (
    <Link href={href} className="media" data-media aria-label={label}>
      {children}
      <div className="dark"></div>
      <span ref={moreRef} className="more" aria-hidden="true">
        Read more <ArrowRight className="h-[1.25rem] w-[1.25rem] fill-none stroke-white stroke-[1.6]" />
      </span>
      <span className="ph phtag">Product shot placeholder</span>
    </Link>
  )
}

function FeaturedCase() {
  return (
    <div className="feature ln lb">
      <MediaLink
        href={featuredCase.hasPage ? `/work/${featuredCase.slug}` : '#'}
        label={`${featuredCase.name} case study`}
        hasPage={featuredCase.hasPage}
      >
        <CaseArt gradient={featuredCase.gradient} rotation={featuredCase.rotation} />
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
            <p className="h-sub">{featuredCase.category}</p>
            <p className="t-reg">{featuredCase.description}</p>
          </div>
          {featuredCase.metric && (
            <div className="met ln ll">
              <p className="h-sub">{featuredCase.metric.label}</p>
              <p className="num">
                {featuredCase.metric.value}
                {featuredCase.metric.placeholder && <span className="ph"> Placeholder</span>}
              </p>
            </div>
          )}
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

  return (
    <div className={`case ln lb ${isRight ? 'r' : 'lr'}`}>
      <MediaLink
        href={caseStudy.hasPage ? `/work/${caseStudy.slug}` : '#'}
        label={`${caseStudy.name} case study`}
        hasPage={caseStudy.hasPage}
      >
        <CaseArt gradient={caseStudy.gradient} rotation={caseStudy.rotation} />
      </MediaLink>
      <div className="case-meta">
        <h3 className="h-small">
          <span className="ul">{caseStudy.name}</span>
        </h3>
        {caseStudy.metric && (
          <div className="case-stat">
            <span className="num">{caseStudy.metric.value}</span>
            <p className="t-reg">
              {caseStudy.metric.label}
              {caseStudy.metric.placeholder && <span className="ph"> Placeholder</span>}
            </p>
          </div>
        )}
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
            <CaseCard key={caseStudy.slug} caseStudy={caseStudy} index={index} />
          ))}
          <div className="case r ln lb view-more">
            <Button href="/work">View all {totalCaseStudies} case studies</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
