import Image from 'next/image'
import Link from 'next/link'
import { teamMembers, type TeamMember } from '@/content/team'
import { counterStats, awardStats } from '@/content/stats'
import { LinkedInIcon, UpworkIcon } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'

function ProfileCard({ member }: { member: TeamMember }) {
  return (
    <div className="profile ln lr lb">
      {member.image ? (
        <div 
          className="avatar-img" 
          aria-label={`Photo of ${member.name}`}
          style={{ backgroundColor: member.bgColor || '#EDEDEB' }}
        >
          <Image
            src={member.image}
            alt={member.name}
            width={270}
            height={270}
            style={{ objectFit: 'cover', borderRadius: '0.5rem', width: '100%', height: '100%' }}
          />
        </div>
      ) : (
        <div className="avatar" role="img" aria-label={member.name}>
          {member.initials}
        </div>
      )}
      <p className="nm">{member.name}</p>
      <p className="cap">{member.role}</p>
      <p className="t-reg bio">{member.bio[0]}</p>
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
            aria-label={`${member.name} on LinkedIn`}
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
            aria-label={`${member.name} on Upwork`}
          >
            <UpworkIcon className="h-[1.67rem] w-[1.67rem] fill-[#222]" />
          </a>
        )}
      </span>
    </div>
  )
}

function CounterCell({ stat, index }: { stat: (typeof counterStats)[0]; index: number }) {
  const borderClass = index < 3 ? 'ln lr lb' : 'ln lb'

  return (
    <div className={`counter-cell ${borderClass}`}>
      <div className="in">
        <p className="num">
          {stat.prefix}
          <span data-count={stat.value} data-dec={stat.decimal ? '1' : undefined}>
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
              <span className="eyebrow">Studio team</span>
              <h2 className="h-large" data-split>
                Senior by default.
              </h2>
            </div>
            <p className="t-reg">
              A founder-led studio. The people who scope your product are the people who build it.
            </p>
            <div className="btnw">
              <Button href="/about" data-go="About">
                Meet the studio
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
