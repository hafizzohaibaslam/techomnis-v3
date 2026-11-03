export interface SocialLink {
  platform: 'linkedin' | 'upwork' | 'github'
  url: string
  isPlaceholder: true
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  avatarInitial: string
  socials: SocialLink[]
  isPlaceholder: true
}

export const teamMembers: TeamMember[] = [
  {
    id: 'zohaib',
    name: 'Zohaib',
    role: 'Founder, TechOmnis',
    bio: 'Founded TechOmnis in 2024. Top Rated Plus on Upwork with 5.0 from 68 reviews and $300K+ earned.',
    avatarInitial: 'Z',
    socials: [
      { platform: 'linkedin', url: '#', isPlaceholder: true },
      { platform: 'upwork', url: '#', isPlaceholder: true },
    ],
    isPlaceholder: true,
  },
  {
    id: 'team-lead',
    name: 'Team lead',
    role: 'Role to confirm',
    bio: 'Second leadership profile goes here.',
    avatarInitial: '?',
    socials: [{ platform: 'linkedin', url: '#', isPlaceholder: true }],
    isPlaceholder: true,
  },
]
