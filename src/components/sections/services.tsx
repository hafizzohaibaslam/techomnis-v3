'use client'

import Link from 'next/link'
import { services } from '@/content/services'
import { ShieldIcon, DashboardIcon, ChartIcon } from '@/components/ui/icons'

const iconMapping = {
  shield: ShieldIcon,
  dashboard: DashboardIcon,
  chart: ChartIcon,
} as const

export function Services() {
  return (
    <section id="services" aria-label="Services">
      <div className="wrap">
        {services.map((service, index) => {
          const IconComponent = iconMapping[service.icon]
          const isEven = index % 2 === 0
          return (
            <div key={service.slug} className={`g2 svc-row ln lb ${isEven ? '' : 'rev'}`}>
              <div className={`svc-left ln ${isEven ? 'lr' : 'll'}`}>
                <div className="svc-icon">
                  <IconComponent aria-hidden="true" />
                </div>
                <h2 className="h-bigup">{service.name}</h2>
                <p className="t-reg grey">{service.description}</p>
                <div className="tags" style={{ marginTop: '1.5rem' }}>
                  {service.tags.slice(0, 6).map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="btnw" style={{ marginTop: '2rem' }}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="btn"
                    data-hover
                    data-btn
                    data-go={service.name}
                  >
                    Learn more
                  </Link>
                </div>
              </div>
              <div className={`svc-right ln ${isEven ? '' : 'lr'}`}>
                <div className="svc-tags-full">
                  {service.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
