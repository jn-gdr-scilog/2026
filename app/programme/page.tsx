import { getSchedule } from "@/lib/mdx"
import { MDXRemote } from "next-mdx-remote/rsc"
import { Session, SubSession, ParallelSessions, ParallelTrack } from "@/components/mdx/conference/Session"

export default async function ProgrammePage() {
  const schedule = await getSchedule()

  const components = {
    Session,
    SubSession,
    ParallelSessions,
    ParallelTrack,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Programme</h1>
        
        {schedule.days.length === 0 ? (
          <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">📅</div>
            <h2 className="text-2xl font-bold mb-3 text-gray-900">
              Programme à venir
            </h2>
            <p className="text-gray-600 mb-6">
              Le programme détaillé sera annoncé prochainement.
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded p-4 text-sm text-gray-600 text-left">
              <p className="font-semibold mb-2">Pour ajouter le programme :</p>
              <code className="block bg-gray-900 text-white px-3 py-2 rounded mb-2">
                content/schedule/day-1.mdx
              </code>
              <code className="block bg-gray-900 text-white px-3 py-2 rounded mb-2">
                content/schedule/day-2.mdx
              </code>
              <code className="block bg-gray-900 text-white px-3 py-2 rounded">
                content/schedule/day-3.mdx
              </code>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {schedule.days.map((day: any, index: number) => (
              <div key={index} id={`day-${index}`} className="scroll-mt-8">
                <div className="mb-8 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-900 text-white rounded-lg flex items-center justify-center text-xl font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">{day.label}</h2>
                      {day.description && (
                        <p className="text-gray-600 mt-1">{day.description}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <MDXRemote 
                    source={day.content} 
                    components={components}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}