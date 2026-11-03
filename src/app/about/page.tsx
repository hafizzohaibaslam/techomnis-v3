import type { Metadata } from 'next'
import Link from 'next/link'
import { companyStats, companyValues, companyStory, clients, industries } from '@/content/company'
import { teamMembers } from '@/content/team'
import { LinkedInIcon, UpworkIcon } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'About | TechOmnis',
  description:
    'TechOmnis is a product engineering studio. 21 case studies, 12+ industries, $2B+ client impact. Top Rated Plus on Upwork with 5.0 from 68 reviews.',
  openGraph: {
    title: 'About | TechOmnis',
    description:
      'TechOmnis is a product engineering studio. 21 case studies, 12+ industries, $2B+ client impact.',
    type: 'website',
  },
}

function StatCard({ stat }: { stat: (typeof companyStats)[0] }) {
  return (
    <div className="stat-card ln lb lr center">
      <span className="num">{stat.value}</span>
      <p className="t-bold">{stat.label}</p>
      {stat.description && <p className="t-small grey">{stat.description}</p>}
    </div>
  )
}

function ValueCard({ value, index }: { value: (typeof companyValues)[0]; index: number }) {
  return (
    <div className={`value-card ln lb ${index % 2 === 0 ? 'lr' : ''}`}>
      <h3 className="h-sub">{value.title}</h3>
      <p className="t-reg grey">{value.description}</p>
    </div>
  )
}

function TeamMember({ member }: { member: (typeof teamMembers)[0] }) {
  return (
    <div className="team-member ln lb lr">
      <img src={member.image} alt={member.name} className="member-photo" />
      <div className="member-info">
        <h3 className="h-sub">{member.name}</h3>
        <p className="cap grey">{member.role}</p>
        <p className="t-reg member-bio">{member.bio}</p>
        <div className="member-socials">
          {member.socials.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on ${social.platform}`}
            >
              {social.platform === 'linkedin' ? (
                <LinkedInIcon className="h-5 w-5 fill-[#222]" />
              ) : (
                <UpworkIcon className="h-5 w-5 fill-[#222]" />
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <main className="page" id="top">
      <div className="wrap">
        {/* Hero */}
        <header className="about-header">
          <span className="eyebrow">About Us</span>
          <h1 className="h-large" data-split>
            {companyStory.headline}
          </h1>
          <p className="h-sub about-intro">{companyStory.intro}</p>
        </header>

        {/* Stats */}
        <section className="stats-section g4 ln lt">
          {companyStats.slice(0, 4).map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </section>

        {/* Story */}
        <section className="story-section">
          <h2 className="h-bigup">Our Story</h2>
          <div className="story-content">
            {companyStory.story.map((paragraph, index) => (
              <p key={index} className="t-reg">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="team-section">
          <h2 className="h-bigup">Leadership Team</h2>
          <div className="team-grid g2">
            {teamMembers.map((member) => (
              <TeamMember key={member.id} member={member} />
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="values-section">
          <h2 className="h-bigup">Our Values</h2>
          <div className="values-grid g2">
            {companyValues.map((value, index) => (
              <ValueCard key={index} value={value} index={index} />
            ))}
          </div>
        </section>

        {/* Industries */}
        <section className="industries-section ln lt lb">
          <h2 className="h-bigup">Industries We Serve</h2>
          <p className="t-reg grey industries-intro">
            We've delivered projects across {industries.length}+ industries, each with unique challenges and requirements.
          </p>
          <div className="tags big industries-tags">
            {industries.map((industry) => (
              <span key={industry} className="tag">
                {industry}
              </span>
            ))}
          </div>
        </section>

        {/* Clients */}
        <section className="clients-section">
          <h2 className="h-bigup">Clients We've Worked With</h2>
          <div className="clients-grid g4">
            {clients.map((client, index) => (
              <div key={index} className="client-card ln lb lr center">
                <p className="t-bold">{client.name}</p>
                <p className="t-small grey">{client.industry}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="about-cta center ln lt lb">
          <h2 className="h-medium">Want to work together?</h2>
          <p className="t-reg grey">
            We're always looking for interesting projects and great people to work with.
          </p>
          <div className="btnw">
            <Button href="/contact">Get in touch</Button>
          </div>
        </section>
      </div>
    </main>
  )
}
