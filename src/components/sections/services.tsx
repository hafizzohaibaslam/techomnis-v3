'use client'

import { services } from '@/content/services'

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z" />
      <path d="M8.5 12l2.4 2.4 4.6-4.8" />
    </svg>
  )
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 19l4-1 10-10a2.1 2.1 0 00-3-3L6 15z" />
      <path d="M14 7l3 3" />
    </svg>
  )
}

function DashboardIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M9 9v11" />
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M12 18h.01" />
    </svg>
  )
}

const stages: Record<string, Array<{ icon: React.ComponentType; title: string; description: string }>> = {
  'mvp-rescue': [
    {
      icon: EyeIcon,
      title: 'Audit',
      description: 'We read the repo, infra and data, then rank every risk. You get a clear fix plan before any build work starts.',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Stabilise',
      description: 'Broken MVP or AI-built code gets fixed, hardened and tested so it survives real users.',
    },
    {
      icon: PencilIcon,
      title: 'Ship',
      description: 'Production deploy with monitoring and rollback, plus before and after metrics for every fix.',
    },
  ],
  'product-design': [
    {
      icon: PencilIcon,
      title: 'Design',
      description: 'Research, flows, UI and design systems, designed by a team that also ships the code.',
    },
    {
      icon: DashboardIcon,
      title: 'Build-ready',
      description: 'Specs, components and handoff documentation your engineers can ship from.',
    },
  ],
  'product-engineering': [
    {
      icon: DashboardIcon,
      title: 'Build',
      description: 'Design and engineering of the whole product, from the first sketch to billing and launch. One senior team owns UI, API, data and infra.',
    },
  ],
  'ai-llm': [
    {
      icon: ChartIcon,
      title: 'Integrate',
      description: 'AI features that hold up in production, like our own RAG chatbot SaaS, Othego. They are measured, monitored and priced so they stay affordable.',
    },
  ],
  'mobile-apps': [
    {
      icon: PhoneIcon,
      title: 'Build',
      description: 'Flutter or React Native app, sharing one backend and design system with your web product.',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Ship',
      description: 'Store submission, beta testing and production deploy for iOS and Android.',
    },
  ],
}

export function Services() {
  return (
    <section id="services" aria-label="Services">
      <div className="wrap">
        {services.map((service) => {
          const stageData = stages[service.slug] || []
          return (
            <div key={service.slug} className="g2 svc-row ln lb">
              <div>
                <div className="svc-left">
                  <h2 className="h-bigup">{service.name}</h2>
                  <div className="tags">
                    {service.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="stages">
                  {stageData.map((stage, i) => {
                    const IconComponent = stage.icon
                    return (
                      <div key={i} className="stage">
                        <IconComponent />
                        <h3 className="h-sub">{stage.title}</h3>
                        <p className="t-reg">{stage.description}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
