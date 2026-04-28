"use client"

import { useEffect, useState, useMemo } from "react"
import { format, parseISO, isSameDay } from "date-fns"
import { fr } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CalendarEvent {
  id: string
  title: string
  start: string
  end: string
  room: string
  roomShort: string
  color: string
  location?: string
}

const CONFERENCE_DAYS = [
  { label: "Lun 1 juin", short: "1 juin", date: "2026-06-01" },
  { label: "Mar 2 juin", short: "2 juin", date: "2026-06-02" },
  { label: "Mer 3 juin", short: "3 juin", date: "2026-06-03" },
  { label: "Jeu 4 juin", short: "4 juin", date: "2026-06-04" },
]

const DAY_START = 8
const DAY_END = 22
const TOTAL_MINUTES = (DAY_END - DAY_START) * 60
const PX_PER_MINUTE = 2.2
const MIN_EVENT_HEIGHT = 52

function minutesFromDayStart(date: Date): number {
  return date.getHours() * 60 + date.getMinutes() - DAY_START * 60
}

function formatTime(date: Date): string {
  return format(date, "HH:mm")
}

function lightenColor(hex: string, amount = 0.85): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgb(${Math.round(r + (255 - r) * amount)}, ${Math.round(g + (255 - g) * amount)}, ${Math.round(b + (255 - b) * amount)})`
}

function overlaps(a: CalendarEvent, b: CalendarEvent): boolean {
  return new Date(a.start).getTime() < new Date(b.end).getTime() &&
         new Date(a.end).getTime() > new Date(b.start).getTime()
}

interface LayoutEntry {
  col: number
  cols: number
  /** Max pixel position this event can extend to (top of next event in same column) */
  maxExtendTo?: number
}

/** Graph-coloring layout: assigns non-overlapping events to columns and caps their visual height. */
function layoutEvents(events: CalendarEvent[]): Map<string, LayoutEntry> {
  const sorted = [...events].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  )

  const overlapsWith = new Map<string, Set<string>>()
  for (const ev of sorted) overlapsWith.set(ev.id, new Set())
  for (let i = 0; i < sorted.length; i++) {
    for (let j = i + 1; j < sorted.length; j++) {
      if (overlaps(sorted[i], sorted[j])) {
        overlapsWith.get(sorted[i].id)!.add(sorted[j].id)
        overlapsWith.get(sorted[j].id)!.add(sorted[i].id)
      }
    }
  }

  const colAssigned = new Map<string, number>()
  for (const ev of sorted) {
    const usedCols = new Set(
      [...overlapsWith.get(ev.id)!]
        .filter(id => colAssigned.has(id))
        .map(id => colAssigned.get(id)!)
    )
    let col = 0
    while (usedCols.has(col)) col++
    colAssigned.set(ev.id, col)
  }

  const layout = new Map<string, LayoutEntry>()
  for (const ev of sorted) {
    const neighbors = [...overlapsWith.get(ev.id)!].concat(ev.id)
    const maxCol = Math.max(...neighbors.map(id => colAssigned.get(id) ?? 0))
    const evCol = colAssigned.get(ev.id)!
    const evEnd = new Date(ev.end).getTime()

    const nextInSameCol = sorted.find(other =>
      other.id !== ev.id &&
      colAssigned.get(other.id) === evCol &&
      new Date(other.start).getTime() >= evEnd
    )

    layout.set(ev.id, {
      col: evCol,
      cols: maxCol + 1,
      maxExtendTo: nextInSameCol
        ? minutesFromDayStart(new Date(nextInSameCol.start)) * PX_PER_MINUTE
        : undefined,
    })
  }

  return layout
}

function EventModal({ event, onClose }: { event: CalendarEvent | null; onClose: () => void }) {
  if (!event) return null
  const start = parseISO(event.start)
  const end = parseISO(event.end)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1.5 w-full" style={{ backgroundColor: event.color }} />
        <div className="p-6 space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: event.color }}>
              {event.roomShort}
            </p>
            <h3 className="text-xl font-bold text-gray-900 leading-snug">{event.title}</h3>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: lightenColor(event.color) }}>
              🕐
            </div>
            <div>
              <span className="font-medium">{formatTime(start)} – {formatTime(end)}</span>
              <span className="text-gray-400 ml-2">{format(start, "EEEE d MMMM", { locale: fr })}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: lightenColor(event.color) }}>
              📍
            </div>
            <span>{event.location || event.room}</span>
          </div>
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}

function DayTimeline({ events, onSelect }: { events: CalendarEvent[]; onSelect: (ev: CalendarEvent) => void }) {
  const layout = useMemo(() => layoutEvents(events), [events])
  const totalHeight = TOTAL_MINUTES * PX_PER_MINUTE
  const hours = Array.from({ length: DAY_END - DAY_START + 1 }, (_, i) => DAY_START + i)

  return (
    <div className="relative flex select-none w-full">
      <div className="w-10 sm:w-14 flex-shrink-0 relative" style={{ height: totalHeight }}>
        {hours.map((h) => (
          <div
            key={h}
            className="absolute right-2 sm:right-3 text-xs text-gray-400 font-medium -translate-y-2.5"
            style={{ top: (h - DAY_START) * 60 * PX_PER_MINUTE }}
          >
            {String(h).padStart(2, "0")}:00
          </div>
        ))}
      </div>

      <div className="flex-1 relative border-l border-gray-100" style={{ height: totalHeight }}>
        {hours.map((h) => (
          <div
            key={h}
            className={cn("absolute left-0 right-0 border-t", h % 2 === 0 ? "border-gray-100" : "border-gray-50")}
            style={{ top: (h - DAY_START) * 60 * PX_PER_MINUTE }}
          />
        ))}

        {events.map((ev) => {
          const start = parseISO(ev.start)
          const end = parseISO(ev.end)
          const naturalHeight = ((end.getTime() - start.getTime()) / 60000) * PX_PER_MINUTE
          const top = minutesFromDayStart(start) * PX_PER_MINUTE
          const { col, cols, maxExtendTo } = layout.get(ev.id) ?? { col: 0, cols: 1 }
          const desiredHeight = Math.max(naturalHeight, MIN_EVENT_HEIGHT)
          const height = maxExtendTo !== undefined ? Math.min(desiredHeight, maxExtendTo - top) : desiredHeight
          const gapPx = 4
          const width = `calc((100% - ${gapPx * (cols - 1)}px) / ${cols})`
          const left = `calc(((100% - ${gapPx * (cols - 1)}px) / ${cols} + ${gapPx}px) * ${col})`
          const isOneLiner = naturalHeight < 28
          const isLarge = height >= 72

          return (
            <button
              key={ev.id}
              onClick={() => onSelect(ev)}
              className="absolute rounded-lg text-left overflow-hidden transition-all hover:brightness-95 hover:shadow-md focus:outline-none focus-visible:ring-2"
              style={{
                top: top + 1,
                height: isOneLiner ? 22 : height - 2,
                width,
                left,
                backgroundColor: lightenColor(ev.color, 0.82),
                borderLeft: `3px solid ${ev.color}`,
                zIndex: naturalHeight < MIN_EVENT_HEIGHT ? 10 : 1,
              }}
            >
              {isOneLiner ? (
                <div className="px-2 h-full flex items-center gap-1.5 overflow-hidden">
                  <span className="text-[10px] font-semibold whitespace-nowrap flex-shrink-0" style={{ color: ev.color }}>
                    {formatTime(start)}
                  </span>
                  <span className="text-[10px] font-bold text-gray-800 truncate">{ev.title}</span>
                  <span className="text-[10px] text-gray-400 truncate flex-shrink-0">{ev.roomShort}</span>
                </div>
              ) : isLarge ? (
                <div className="px-2 py-1.5 h-full flex flex-col justify-start overflow-hidden">
                  <p className="text-[10px] font-semibold leading-none mb-1 whitespace-nowrap" style={{ color: ev.color }}>
                    {formatTime(start)} – {formatTime(end)}
                  </p>
                  <p className="text-xs font-bold text-gray-800 leading-tight line-clamp-2">{ev.title}</p>
                  <p className="text-[10px] text-gray-500 truncate mt-0.5">{ev.roomShort}</p>
                </div>
              ) : (
                <div className="px-2 py-1 h-full flex flex-col justify-center overflow-hidden">
                  <div className="flex items-baseline gap-1 overflow-hidden">
                    <span className="text-[10px] font-semibold whitespace-nowrap flex-shrink-0" style={{ color: ev.color }}>
                      {formatTime(start)}
                    </span>
                    <span className="text-xs font-bold text-gray-800 truncate leading-tight">{ev.title}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 truncate leading-tight">{ev.roomShort}</p>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function AgendaView({ events, onSelect }: { events: CalendarEvent[]; onSelect: (ev: CalendarEvent) => void }) {
  const grouped = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>()
    for (const ev of events) {
      const key = ev.start.slice(0, 10)
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(ev)
    }
    return map
  }, [events])

  const dayLabels: Record<string, string> = {
    "2026-06-01": "Lundi 1 juin",
    "2026-06-02": "Mardi 2 juin",
    "2026-06-03": "Mercredi 3 juin",
    "2026-06-04": "Jeudi 4 juin",
  }

  return (
    <div className="space-y-8">
      {CONFERENCE_DAYS.map(({ date }) => {
        const dayEvents = grouped.get(date) ?? []
        if (dayEvents.length === 0) return null
        return (
          <div key={date}>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              {dayLabels[date]}
            </h3>
            <div className="space-y-1.5">
              {dayEvents.map((ev) => {
                const start = parseISO(ev.start)
                const end = parseISO(ev.end)
                return (
                  <button
                    key={ev.id}
                    onClick={() => onSelect(ev)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all text-left group"
                  >
                    <div className="w-1 self-stretch rounded-full flex-shrink-0" style={{ backgroundColor: ev.color }} />
                    <div className="w-20 flex-shrink-0">
                      <p className="text-sm font-semibold text-gray-700 tabular-nums">{formatTime(start)}</p>
                      <p className="text-xs text-gray-400 tabular-nums">{formatTime(end)}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{ev.title}</p>
                      <p className="text-xs text-gray-400 truncate">{ev.room}</p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="flex-shrink-0 text-[10px] hidden sm:inline-flex border-0"
                      style={{ backgroundColor: lightenColor(ev.color, 0.8), color: ev.color }}
                    >
                      {ev.roomShort}
                    </Badge>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

type ViewMode = "day" | "agenda"

export default function ProgrammeCalendar() {
  const [allEvents, setAllEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [activeDay, setActiveDay] = useState("2026-06-01")
  const [viewMode, setViewMode] = useState<ViewMode>("day")
  const [activeRooms, setActiveRooms] = useState<Set<string>>(new Set())
  const [rooms, setRooms] = useState<{ name: string; color: string }[]>([])

  useEffect(() => {
    fetch("/data/events.json")
      .then((r) => r.json())
      .then((data: CalendarEvent[]) => {
        data.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
        setAllEvents(data)
        const roomMap = new Map<string, string>()
        data.forEach((ev) => roomMap.set(ev.room, ev.color))
        setRooms(Array.from(roomMap.entries()).map(([name, color]) => ({ name, color })))
        setActiveRooms(new Set(roomMap.keys()))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filteredEvents = useMemo(
    () => allEvents.filter((ev) => activeRooms.has(ev.room)),
    [allEvents, activeRooms]
  )

  const dayEvents = useMemo(
    () => filteredEvents.filter((ev) => isSameDay(parseISO(ev.start), parseISO(activeDay + "T12:00:00"))),
    [filteredEvents, activeDay]
  )

  const toggleRoom = (name: string) =>
    setActiveRooms((prev) => {
      const next = new Set(prev)
      next.has(name) ? next.delete(name) : next.add(name)
      return next
    })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
          <p className="text-sm">Chargement du programme…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
          {CONFERENCE_DAYS.map((d) => (
            <button
              key={d.date}
              onClick={() => { setActiveDay(d.date); setViewMode("day") }}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                viewMode === "day" && activeDay === d.date
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <span className="hidden sm:inline">{d.label}</span>
              <span className="sm:hidden">{d.short}</span>
            </button>
          ))}
        </div>
        <div className="flex-1" />
        <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
          <button
            onClick={() => setViewMode("agenda")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
              viewMode === "agenda"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            Liste
          </button>
        </div>
      </div>

      {rooms.length > 1 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Salles</span>
          {rooms.map((room) => {
            const active = activeRooms.has(room.name)
            return (
              <button
                key={room.name}
                onClick={() => toggleRoom(room.name)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                  active ? "border-transparent text-white shadow-sm" : "border-gray-200 bg-white text-gray-400 hover:border-gray-300"
                )}
                style={active ? { backgroundColor: room.color } : {}}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: active ? "rgba(255,255,255,0.7)" : room.color }} />
                {room.name}
              </button>
            )
          })}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {viewMode === "day" ? (
          <>
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-700">
                {CONFERENCE_DAYS.find((d) => d.date === activeDay)?.label}
              </h2>
              <span className="text-xs text-gray-400">
                {dayEvents.length} événement{dayEvents.length > 1 ? "s" : ""}
              </span>
            </div>
            {dayEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <p className="text-sm">Aucun événement pour ce jour</p>
              </div>
            ) : (
              <div className="p-2 sm:p-4">
                <DayTimeline events={dayEvents} onSelect={setSelectedEvent} />
              </div>
            )}
          </>
        ) : (
          <div className="p-4">
            <AgendaView events={filteredEvents} onSelect={setSelectedEvent} />
          </div>
        )}
      </div>

      {rooms.length > 1 && (
        <div className="flex flex-wrap gap-4">
          {rooms.map((room) => (
            <div key={room.name} className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: room.color }} />
              {room.name}
            </div>
          ))}
        </div>
      )}

      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  )
}