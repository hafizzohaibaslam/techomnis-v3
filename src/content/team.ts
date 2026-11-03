export interface SocialLink {
  platform: 'linkedin' | 'upwork' | 'github'
  url: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  socials: SocialLink[]
}

export const teamMembers: TeamMember[] = [
  {
    id: 'zohaib-a',
    name: 'Zohaib Aslam',
    role: 'Founder, TechOmnis',
    bio: 'Founded TechOmnis in 2024. Top Rated Plus on Upwork with 5.0 from 68 reviews and $300K+ earned.',
    image: '/zohaib-a-image.png',
    socials: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/zohaib-aslam' },
      { platform: 'upwork', url: 'https://www.upwork.com/freelancers/~01d4a8b7c5e6f7a8b9' },
    ],
  },
  {
    id: 'zohaib-m',
    name: 'Zohaib Mehmood',
    role: 'Team Lead',
    bio: 'Leading development teams to deliver exceptional digital products.',
    image: '/zohaib-m-image.webp',
    socials: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/zohaib-mehmood' },
    ],
  },
]
