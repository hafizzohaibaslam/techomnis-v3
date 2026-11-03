import { services, type ServiceProcess } from '@/content/services'
import { stageIcons } from '@/components/ui/icons'

const iconMapping: Record<string, keyof typeof stageIcons> = {
  'Discovery': 'eye',
  'Architecture': 'shield',
  'Development': 'pencil',
  'Launch & Scale': 'dashboard',
  'Data Assessment': 'eye',
  'Model Selection': 'shield',
  'Deployment': 'dashboard',
  'Design Review': 'eye',
  'Setup': 'shield',
  'Build': 'pencil',
  'Launch': 'dashboard',
  'Platform Strategy': 'eye',
  'UI/UX Adaptation': 'pencil',
  'Store Launch': 'dashboard',
  'Audit': 'eye',
  'Prioritize': 'shield',
  'Stabilize': 'pencil',
  'Improve': 'dashboard',
  'Research': 'eye',
  'Wireframe': 'pencil',
  'Design': 'pencil',
  'Handoff': 'dashboard',
}

function StageItem({ stage }: { stage: ServiceProcess }) {
  const iconKey = iconMapping[stage.title] || 'eye'
  const IconComponent = stageIcons[iconKey]

  return (
    <div className="stage">
      <IconComponent aria-hidden="true" />
      <h3 className="h-sub">{stage.title}</h3>
      <p className="t-reg">{stage.description}</p>
    </div>
  )
}

export function Services() {
  const displayServices = services.slice(0, 2)
  
  return (
    <section id="services" aria-label="Services">
      <div className="wrap">
        {displayServices.map((service) => (
          <div key={service.id} className="g2 svc-row ln lb">
            <div>
              <div className="svc-left">
                <h2 className="h-bigup">{service.name}</h2>
                <div className="tags">
                  {service.features.slice(0, 6).map((feature) => (
                    <span key={feature.title} className="tag">
                      {feature.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="right">
              <div className="stages">
                {service.process.map((step, stepIndex) => (
                  <StageItem key={stepIndex} stage={step} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
