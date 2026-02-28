import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Speaker, Sponsor, Day, Schedule, Venue, Page, SiteConfig } from "@/types"

const contentDirectory = path.join(process.cwd(), "content")

// ========================================
// HELPERS
// ========================================

function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`)
  }
  const fileContents = fs.readFileSync(filePath, "utf8")
  return matter(fileContents)
}

function readMDXDirectory(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    return []
  }
  return fs.readdirSync(dirPath).filter((fileName) => fileName.endsWith(".mdx"))
}

// ========================================
// SPEAKERS
// ========================================

export async function getSpeakers(): Promise<Speaker[]> {
  const speakersDir = path.join(contentDirectory, "speakers")
  const fileNames = readMDXDirectory(speakersDir)

  if (fileNames.length === 0) {
    return []
  }

  const speakers = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "")
    const fullPath = path.join(speakersDir, fileName)
    const { data, content } = readMDXFile(fullPath)

    return {
      slug,
      content,
      ...data,
    } as Speaker
  })

  return speakers
}

export async function getSpeakerBySlug(slug: string): Promise<{ frontMatter: Speaker; content: string }> {
  const fullPath = path.join(contentDirectory, "speakers", `${slug}.mdx`)
  
  try {
    const { data, content } = readMDXFile(fullPath)
    return {
      frontMatter: data as Speaker,
      content,
    }
  } catch (error) {
    throw new Error(`Speaker "${slug}" not found`)
  }
}

// ========================================
// SCHEDULE
// ========================================

export async function getSchedule(): Promise<Schedule> {
  const scheduleDir = path.join(contentDirectory, "schedule")
  const fileNames = readMDXDirectory(scheduleDir)

  if (fileNames.length === 0) {
    return { days: [] }
  }

  const days = fileNames.sort().map((fileName) => {
    const fullPath = path.join(scheduleDir, fileName)
    const { data, content } = readMDXFile(fullPath)

    return {
      content,
      ...data,
    } as Day
  })

  return { days }
}

// ========================================
// VENUE
// ========================================

export async function getVenue(): Promise<{ frontMatter: Venue; content: string } | null> {
  const venuePath = path.join(contentDirectory, "venue", "main.mdx")

  try {
    const { data, content } = readMDXFile(venuePath)
    return {
      frontMatter: data as Venue,
      content,
    }
  } catch (error) {
    return null
  }
}

// ========================================
// PAGES
// ========================================

export async function getPage(slug: string): Promise<{ frontMatter: Page; content: string } | null> {
  const fullPath = path.join(contentDirectory, "pages", `${slug}.mdx`)

  try {
    const { data, content } = readMDXFile(fullPath)
    return {
      frontMatter: data as Page,
      content,
    }
  } catch (error) {
    return null
  }
}

// ========================================
// SITE CONFIG
// ========================================

export async function getSiteConfig(): Promise<SiteConfig> {
  const configPath = path.join(contentDirectory, "config", "site.mdx")

  try {
    const { data, content } = readMDXFile(configPath)
    return {
      content,
      ...data,
    } as SiteConfig
  } catch (error) {
    console.warn("Site config not found, using default values.")
    return {
      siteName: "GDR Scilog",
      tagline: "Conférence annuelle",
      dates: "15-17 Juin 2026",
      venueName: "Polytech Lille",
      venueAddress: "Avenue Paul Langevin, 59655 Villeneuve-d'Ascq",
      venueCity: "Villeneuve-d'Ascq",
      email: "contact@gdrscilog2026.fr",
      phone: "+33 3 28 76 73 00",
    }
  }
}

// ========================================
// SPONSORS
// ========================================

export async function getSponsors(): Promise<Sponsor[]> {
  const sponsorsDir = path.join(contentDirectory, "sponsors")
  const fileNames = readMDXDirectory(sponsorsDir)
  if (fileNames.length === 0) {
    return []
  }

  const sponsors = fileNames
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "")
      const fullPath = path.join(sponsorsDir, fileName)
      const { data, content } = readMDXFile(fullPath)
      return {
        slug,
        content,
        ...data,
      } as unknown as Sponsor
    })
    .filter((sponsor): sponsor is Sponsor => 
      typeof sponsor.name === "string" && typeof sponsor.logo === "string"
    )

  return sponsors
}