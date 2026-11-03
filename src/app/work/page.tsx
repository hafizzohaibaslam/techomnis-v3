'use client'

import { useState } from 'react'
import Link from 'next/link'
import { caseStudies, industries, serviceFilters, type CaseStudy } from '@/content/cases'
import { ArrowRight } from '@/components/ui/icons'

function CaseCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <article className="case ln lb lr">
      <Link
        href={`/work/${caseStudy.slug}`}
        className="media"
        aria-label={`${caseStudy.name} case study`}
      >
        <img
          src={caseStudy.image}
          alt={caseStudy.name}
          className="art"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div className="dark"></div>
        <span className="more" aria-hidden="true">
          View case{' '}
          <ArrowRight className="h-[1.25rem] w-[1.25rem] fill-none stroke-white stroke-[1.6]" />
        </span>
        {caseStudy.isPlaceholder && <span className="ph phtag">Details TBC</span>}
      </Link>
      <div className="case-meta">
        <h3 className="h-small">
          <Link href={`/work/${caseStudy.slug}`} className="ul">
            {caseStudy.name}
          </Link>
        </h3>
        <div className="case-stat">
          <span className="num">{caseStudy.results[0]?.value || 'TBC'}</span>
          <p className="t-reg">{caseStudy.results[0]?.label || 'Metrics coming soon'}</p>
        </div>
        <div className="tags">
          {caseStudy.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

function FilterButton({
  label,
  isActive,
  onClick,
}: {
  label: string
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      className={`tag ${isActive ? 'active' : ''}`}
      onClick={onClick}
      style={isActive ? { background: '#222', color: '#fff', borderColor: '#222' } : {}}
    >
      {label}
    </button>
  )
}

export default function WorkPage() {
  const [industryFilter, setIndustryFilter] = useState<string>('All')
  const [serviceFilter, setServiceFilter] = useState<string>('All')

  const filteredCases = caseStudies.filter((c) => {
    if (industryFilter !== 'All' && c.meta.industry !== industryFilter) return false
    if (serviceFilter !== 'All' && !c.meta.services.includes(serviceFilter)) return false
    return true
  })

  return (
    <main className="page" id="top">
      <div className="wrap">
        <header className="work-header">
          <span className="eyebrow">Our Work</span>
          <h1 className="h-large" data-split>
            Case Studies
          </h1>
          <p className="t-reg work-intro">
            {caseStudies.length} projects across {industries.length - 1}+ industries.
            From MVPs to enterprise platforms.
          </p>
        </header>

        <div className="filters">
          <div className="filter-group">
            <span className="cap filter-label">Industry</span>
            <div className="tags">
              {industries.map((industry) => (
                <FilterButton
                  key={industry}
                  label={industry}
                  isActive={industryFilter === industry}
                  onClick={() => setIndustryFilter(industry)}
                />
              ))}
            </div>
          </div>
          <div className="filter-group">
            <span className="cap filter-label">Service</span>
            <div className="tags">
              {serviceFilters.map((service) => (
                <FilterButton
                  key={service}
                  label={service}
                  isActive={serviceFilter === service}
                  onClick={() => setServiceFilter(service)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="cases-grid g2">
          {filteredCases.map((caseStudy, index) => (
            <CaseCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>

        {filteredCases.length === 0 && (
          <div className="no-results center">
            <p className="h-sub">No cases match your filters</p>
            <button
              type="button"
              className="t-reg ul"
              onClick={() => {
                setIndustryFilter('All')
                setServiceFilter('All')
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .work-header {
          padding: 8rem 0 4rem;
        }
        .work-intro {
          max-width: 40rem;
          margin-top: 1.5rem;
          color: var(--ink7);
        }
        .filters {
          padding: 2rem 0 4rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .filter-label {
          color: var(--ink7);
        }
        .cases-grid {
          padding-bottom: 6rem;
        }
        .cases-grid .case {
          padding: 3.39rem 3.33rem 3.56rem;
        }
        .cases-grid .case:nth-child(odd) {
          padding-right: 3.33rem;
          padding-left: 0;
        }
        .cases-grid .case:nth-child(even) {
          padding-left: 3.33rem;
          padding-right: 0;
        }
        .no-results {
          padding: 8rem 0;
          gap: 1rem;
        }
        @media (max-width: 1023px) {
          .work-header {
            padding: 20rem 0 8rem;
          }
          .work-intro {
            max-width: none;
          }
          .filters {
            padding: 4rem 0 8rem;
            gap: 4rem;
          }
          .filter-group {
            gap: 2rem;
          }
          .cases-grid .case,
          .cases-grid .case:nth-child(odd),
          .cases-grid .case:nth-child(even) {
            padding: 5.13rem 0 8.46rem;
          }
        }
      `}</style>
    </main>
  )
}
