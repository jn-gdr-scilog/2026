import ProgrammeCalendarWrapper from "@/components/programme/ProgrammeCalendarWrapper"

export default function ProgrammePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Programme</h1>
          <p className="text-gray-500 mt-2">
            1–4 juin 2026 · Polytech Lille, Villeneuve-d&apos;Ascq
          </p>
        </div>
        <ProgrammeCalendarWrapper />
      </div>
    </div>
  )
}