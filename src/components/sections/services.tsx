import { services, type Stage } from '@/content/services'
import { stageIcons } from '@/components/ui/icons'

function StageItem({ stage }: { stage: Stage }) {
  const IconComponent = stageIcons[stage.icon]

  return (
    <div className="stage">
      <IconComponent aria-hidden="true" />
      <h3 className="h-sub">{stage.title}</h3>
      <p className="t-reg">{stage.description}</p>
    </div>
  )
}

export function Services() {
  return (
    <section id="services" aria-label="Services">
      <div className="wrap">
        {services.map((service) => (
          <div key={service.id} className="g2 svc-row ln lb">
            <div>
              <div className="svc-left">
                <h2 className="h-bigup">{service.title}</h2>
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
                {service.stages.map((stage, stageIndex) => (
                  <StageItem key={stageIndex} stage={stage} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
