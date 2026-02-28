export interface SiteConfig {
  siteName: string
  tagline: string
  dates: string
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: string
  venueName?: string
  venueAddress?: string
  venueCity?: string
  email?: string
  phone?: string
  twitter?: string
  github?: string
  organizers?: Organizer[]
  content?: string
}

export interface Organizer {
  name: string
  role: string
  affiliation: string
  email?: string
}

export interface Speaker {
  slug: string
  name: string
  role?: string
  affiliation?: string
  bio?: string
  image?: string
  website?: string
  email?: string
  twitter?: string
  talkTitle?: string
  content: string
}

export interface Day {
  label: string
  description?: string
  content: string
}

export interface Schedule {
  days: Day[]
}

export interface Venue {
  name?: string
  address?: string
  city?: string
  content: string
}

export interface Page {
  title?: string
  description?: string
  content: string
  // Registration
  registrationOpen?: boolean
  registrationUrl?: string
  // Contact
  contactEmail?: string
}

export interface Sponsor {
  slug: string
  name: string
  logo: string
  website?: string
  description?: string
  order?: number
}