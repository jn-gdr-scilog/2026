import * as fs from "fs";
import * as path from "path";
import ICAL from "ical.js";

interface CalendarConfig {
  url: string;
  name: string;
  shortName: string;
  color: string;
}

const CALENDARS: CalendarConfig[] = [
  {
    url: "http://zimbra.univ-lille.fr/home/cedric.dumoulin@univ-lille.fr/scilog26-Grand%20Amphi%20Migeon-Polytech.ics",
    name: "Grand Amphi Migeon (Polytech)",
    shortName: "Amphi Migeon (Polytech)",
    color: "#2563eb",
  },
  {
    url: "http://zimbra.univ-lille.fr/home/cedric.dumoulin@univ-lille.fr/scilog26-salle%201-Polytech.ics",
    name: "Salle 1 (Polytech A209)",
    shortName: "Salle 1 (Polytech A209)",
    color: "#16a34a",
  },
  {
    url: "http://zimbra.univ-lille.fr/home/cedric.dumoulin@univ-lille.fr/scilog26-salle%202-Polytech.ics",
    name: "Salle 2 (Polytech A211)",
    shortName: "Salle 2 (Polytech A211)",
    color: "#9333ea",
  },
  {
    url: "http://zimbra.univ-lille.fr/home/cedric.dumoulin@univ-lille.fr/scilog26-salle3-Polytech.ics",
    name: "Salle 3",
    shortName: "Salle 3",
    color: "#ea580c",
  },
  {
    url: "http://zimbra.univ-lille.fr/home/cedric.dumoulin@univ-lille.fr/scilog26-Salle%20Agora%201-Esprit.ics",
    name: "Salle Agora 1 (Bat. Esprit)",
    shortName: "Agora 1 (Bat. Esprit)",
    color: "#0891b2",
  },
  {
    url: "http://zimbra.univ-lille.fr/home/cedric.dumoulin@univ-lille.fr/scilog26-Salle%20Agora%202-Esprit.ics",
    name: "Salle Agora 2 (Bat. Esprit)",
    shortName: "Agora 2 (Bat. Esprit)",
    color: "#be185d",
  },
  {
    url: "http://zimbra.univ-lille.fr/home/cedric.dumoulin@univ-lille.fr/scilog26-Salle%20Agora%20Ambre-Esprit.ics",
    name: "Salle Agora Ambre (Bat. Esprit)",
    shortName: "Agora Ambre (Bat. Esprit)",
    color: "#b45309",
  },
  {
    url: "http://zimbra.univ-lille.fr/home/cedric.dumoulin@univ-lille.fr/scilog26-Salle%20Atrium-Esprit.ics",
    name: "Salle Atrium (Bat. Esprit)",
    shortName: "Atrium (Bat. Esprit)",
    color: "#4f46e5",
  },
  {
    url: "http://zimbra.univ-lille.fr/home/cedric.dumoulin@univ-lille.fr/scilog26-Evenements.ics",
    name: "Événements",
    shortName: "Événements",
    color: "#475569",
  },
  {
    url: "http://zimbra.univ-lille.fr/home/cedric.dumoulin@univ-lille.fr/scilog26-convivialit%C3%A9-Polytech.ics",
    name: "Convivialité",
    shortName: "Convivialité",
    color: "#dc2626",
  },
];

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  room: string;
  roomShort: string;
  color: string;
  location?: string;
  description?: string;
}

async function fetchICS(config: CalendarConfig): Promise<CalendarEvent[]> {
  let raw: string;
  try {
    const res = await fetch(config.url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    raw = await res.text();
  } catch (err) {
    console.error(`Failed to fetch: ${config.url}`, err);
    return [];
  }

  const cleaned = raw.replace(/^[^B]*BEGIN:VCALENDAR/, "BEGIN:VCALENDAR");

  let parsed: any;
  try {
    parsed = ICAL.parse(cleaned);
  } catch (err) {
    console.error(`Failed to parse: ${config.name}`, err);
    return [];
  }

  const comp = new ICAL.Component(parsed);
  const events: CalendarEvent[] = [];

  for (const vevent of comp.getAllSubcomponents("vevent")) {
    try {
      const ev = new ICAL.Event(vevent);
      if (!ev.startDate || !ev.endDate) continue;
      events.push({
        id: ev.uid || `${config.name}-${ev.startDate.toUnixTime()}`,
        title: ev.summary || "(no title)",
        start: ev.startDate.toJSDate().toISOString(),
        end: ev.endDate.toJSDate().toISOString(),
        room: config.name,
        roomShort: config.shortName,
        color: config.color,
        location: ev.location || undefined,
        description: ev.description || undefined,
      });
    } catch {
      // malformed event, skip
    }
  }

  return events;
}

async function main() {
  const outputDir = path.join(process.cwd(), "public", "data");
  const outputFile = path.join(outputDir, "events.json");

  fs.mkdirSync(outputDir, { recursive: true });

  const allEvents: CalendarEvent[] = [];

  for (const config of CALENDARS) {
    const events = await fetchICS(config);
    console.log(`${config.name}: ${events.length} event(s)`);
    allEvents.push(...events);
  }

  allEvents.sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
  );

  fs.writeFileSync(outputFile, JSON.stringify(allEvents, null, 2), "utf-8");

  console.log(`${allEvents.length} events exported`);
}

main();
