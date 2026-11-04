'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { teamMembers, type TeamMember } from '@/content/team'
import { counterStats, awardStats } from '@/content/stats'
import { LinkedInIcon, UpworkIcon } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import { useMotion } from '@/hooks/use-motion'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function ProfileCard({ member }: { member: TeamMember }) {
  return (
    <div className="profile ln lr lb">
      <div className="avatar" role="img" aria-label={`Photo placeholder for ${member.name}`}>
        {member.initials}
      </div>
      <p className="nm">{member.name}</p>
      <p className="cap">{member.role}</p>
      <p className="t-reg bio">
        {member.bio[0]}
        {member.bio.length > 1 && member.metric.placeholder && (
          <span className="ph"> Bio placeholder</span>
        )}
      </p>
      <Link href="/about#team" className="read t-reg" data-go="About">
        <span className="ul">Read details</span>
      </Link>
      <span className="foot psoc">
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            data-ph={!member.linkedin.startsWith('http')}
            aria-label={`${member.name} on LinkedIn (link to be added)`}
          >
            <LinkedInIcon className="h-[1.67rem] w-[1.67rem] fill-[#222]" />
          </a>
        )}
        {!member.linkedin && (
          <a
            href="#"
            data-hover
            data-ph
            aria-label={`${member.name} on LinkedIn (link to be added)`}
          >
            <LinkedInIcon className="h-[1.67rem] w-[1.67rem] fill-[#222]" />
          </a>
        )}
        {member.upwork && (
          <a
            href={member.upwork}
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            data-ph={!member.upwork.startsWith('http')}
            aria-label={`${member.name} on Upwork (link to be added)`}
          >
            <UpworkIcon className="h-[1.67rem] w-[1.67rem] fill-[#222]" />
          </a>
        )}
        <span className="ph">Photo + links placeholder</span>
      </span>
    </div>
  )
}

function CounterCell({ stat, index }: { stat: (typeof counterStats)[0]; index: number }) {
  const countRef = useRef<HTMLSpanElement>(null)
  const { motionEnabled } = useMotion()

  useGSAP(
    () => {
      if (!countRef.current || !motionEnabled) {
        if (countRef.current) {
          countRef.current.textContent = stat.decimal
            ? stat.value.toFixed(stat.decimal)
            : String(stat.value)
        }
        return
      }

      const el = countRef.current
      const obj = { v: 0 }

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            v: stat.value,
            duration: 3,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = stat.decimal ? obj.v.toFixed(stat.decimal) : String(Math.round(obj.v))
            },
            onComplete: () => {
              el.textContent = stat.decimal ? stat.value.toFixed(stat.decimal) : String(stat.value)
            },
          })
        },
      })
    },
    { dependencies: [motionEnabled] }
  )

  const borderClass = index < 3 ? 'ln lr lb' : 'ln lb'

  return (
    <div className={`counter-cell ${borderClass}`}>
      <div className="in">
        <p className="num">
          {stat.prefix}
          <span ref={countRef} data-count={stat.value} data-dec={stat.decimal ? '1' : undefined}>
            {stat.decimal ? '0.0' : '0'}
          </span>
          {stat.suffix}
        </p>
        <p className="t-reg">
          {stat.description.split(' ').slice(0, 3).join(' ')}
          <br />
          {stat.description.split(' ').slice(3).join(' ')}
        </p>
      </div>
    </div>
  )
}

export function WhyUs() {
  return (
    <section id="about" className="why" aria-label="Why us">
      <div className="wrap">
        <div className="g2 top">
          <div className="why-left ln lr lb">
            <div className="ttl">
              <span className="eyebrow">Leadership team</span>
              <h2 className="h-large" data-split>
                Why us
              </h2>
            </div>
            <p className="t-reg">
              One senior team across UI, API, LLM, data and infra. We think like product owners and
              ship like engineers, so the whole system works end to end.
            </p>
            <div className="btnw">
              <Button href="/about" data-go="About">
                Read more about us
              </Button>
            </div>
          </div>
          <div className="g2 prof">
            {teamMembers.map((member) => (
              <ProfileCard key={member.initials} member={member} />
            ))}
          </div>
        </div>

        <div className="g4 cnt">
          {counterStats.map((stat, index) => (
            <CounterCell key={index} stat={stat} index={index} />
          ))}
        </div>

        <div className="g4">
          <div className="award ln lr lb">
            <div className="in">
              <span className="big">
                Top
                <br />
                Rated+
              </span>
              <p className="t-reg">
                Top Rated Plus <br />
                on Upwork
              </p>
            </div>
          </div>
          <div
            className="award ln lb"
            style={{ gridColumn: 'span 3', justifyContent: 'space-around' }}
          >
            <div className="in">
              <span className="big">{awardStats[1].value}</span>
              <p className="t-reg">
                {awardStats[1].description.split(' ').slice(0, 3).join(' ')} <br />
                {awardStats[1].description.split(' ').slice(3).join(' ')}
              </p>
            </div>
            <div className="in">
              <span className="big">{awardStats[2].value}</span>
              <p className="t-reg">
                {awardStats[2].description.split(' ').slice(0, 3).join(' ')} <br />
                {awardStats[2].description.split(' ').slice(3).join(' ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
