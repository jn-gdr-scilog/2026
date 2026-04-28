import * as fs from "fs"
import * as path from "path"
import ICAL from "ical.js"

interface CalendarConfig {
  file: string
  name: string
  shortName: string
  color: string
}

const CALENDARS: CalendarConfig[] = [
  { file: "scilog26-Grand Amphi Migeon-Polytech.ics", name: "Grand Amphi Migeon", shortName: "Grand Amphi", color: "#2563eb" },
  { file: "scilog26-salle 1-Polytech.ics",            name: "Salle 1",            shortName: "Salle 1",     color: "#16a34a" },
  { file: "scilog26-salle 2-Polytech.ics",            name: "Salle 2",            shortName: "Salle 2",     color: "#9333ea" },
  { file: "scilog26-salle3-Polytech.ics",             name: "Salle 3",            shortName: "Salle 3",     color: "#ea580c" },
  { file: "scilog26-Salle Agora 1-Esprit.ics",        name: "Salle Agora 1",      shortName: "Agora 1",     color: "#0891b2" },
  { file: "scilog26-Salle Agora 2-Esprit.ics",        name: "Salle Agora 2",      shortName: "Agora 2",     color: "#be185d" },
  { file: "scilog26-Salle Agora Ambre-Esprit.ics",    name: "Salle Agora Ambre",  shortName: "Agora Ambre", color: "#b45309" },
  { file: "scilog26-Salle Atrium-Esprit.ics",         name: "Salle Atrium",       shortName: "Atrium",      color: "#4f46e5" },
  { file: "scilog26-Evenements.ics",                  name: "Événements",         shortName: "Événements",  color: "#475569" },
  { file: "scilog26-convivialité-Polytech.ics",       name: "Convivialité",       shortName: "Convivialité",color: "#dc2626" },
]

export interface CalendarEvent {
  id: string
  title: string
  start: string
  end: string
  room: string
  roomShort: string
  color: string
  location?: string
}

function parseICSFile(config: CalendarConfig, icsDir: string): CalendarEvent[] {
  const filePath = path.join(icsDir, config.file)

  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${config.file}`)
    return []
  }

  const raw = fs.readFileSync(filePath, "utf-8")
  const cleaned = raw.replace(/^[^B]*BEGIN:VCALENDAR/, "BEGIN:VCALENDAR")

  let parsed: any
  try {
    parsed = ICAL.parse(cleaned)
  } catch (err) {
    console.error(`Failed to parse: ${config.file}`, err)
    return []
  }

  const comp = new ICAL.Component(parsed)
  const events: CalendarEvent[] = []

  for (const vevent of comp.getAllSubcomponents("vevent")) {
    try {
      const ev = new ICAL.Event(vevent)
      if (!ev.startDate || !ev.endDate) continue
      events.push({
        id: ev.uid || `${config.name}-${ev.startDate.toUnixTime()}`,
        title: ev.summary || "(no title)",
        start: ev.startDate.toJSDate().toISOString(),
        end: ev.endDate.toJSDate().toISOString(),
        room: config.name,
        roomShort: config.shortName,
        color: config.color,
        location: ev.location || undefined,
      })
    } catch {
      // malformed event, skip
    }
  }

  return events
}

function main() {
  const icsDir = path.join(process.cwd(), "ics")
  const outputDir = path.join(process.cwd(), "public", "data")
  const outputFile = path.join(outputDir, "events.json")

  fs.mkdirSync(outputDir, { recursive: true })

  const allEvents: CalendarEvent[] = []

  for (const config of CALENDARS) {
    const events = parseICSFile(config, icsDir)
    console.log(`${config.name}: ${events.length} event(s)`)
    allEvents.push(...events)
  }

  allEvents.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())

  fs.writeFileSync(outputFile, JSON.stringify(allEvents, null, 2), "utf-8")

  console.log(`${allEvents.length} events exported`)
}

main()