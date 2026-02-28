import { SpeakerCard } from "@/components/speakers/SpeakerCard"
import { getSpeakers } from "@/lib/mdx"

export default async function SpeakersPage() {
  const speakers = await getSpeakers()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3 text-gray-900">Intervenants</h1>
          <p className="text-xl text-gray-600">
            Découvrez nos intervenants
          </p>
        </div>
        
        {speakers.length === 0 ? (
          <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg p-12 text-center">
            <h2 className="text-2xl font-bold mb-3 text-gray-900">
              Intervenants à venir
            </h2>
            <p className="text-gray-600 mb-6">
              Les intervenants seront annoncés prochainement.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {speakers.map((speaker) => (
              <SpeakerCard key={speaker.slug} speaker={speaker} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}