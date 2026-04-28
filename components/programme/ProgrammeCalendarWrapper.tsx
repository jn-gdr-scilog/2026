"use client"

import dynamic from "next/dynamic"

const ProgrammeCalendar = dynamic(
  () => import("@/components/programme/ProgrammeCalendar"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
          <p className="text-sm">Chargement du programme…</p>
        </div>
      </div>
    ),
  }
)

export default function ProgrammeCalendarWrapper() {
  return <ProgrammeCalendar />
}