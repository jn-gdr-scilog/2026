import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Speaker } from "@/types"

interface SpeakerCardProps {
  speaker: Speaker
}

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all border-gray-200 flex flex-col h-full">
      <div className="relative h-80 w-full bg-gray-50">
        <Image
          src={speaker.image || "/images/speakers/placeholder.jpg"}
          alt={speaker.name}
          fill
          className="object-contain p-4" 
          unoptimized
        />
      </div>
      <CardContent className="p-6 flex flex-col flex-1">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-2 text-gray-900">{speaker.name}</h3>
          <p className="text-gray-600 mb-1 font-medium">{speaker.role}</p>
          <p className="text-gray-500 text-sm mb-4">{speaker.affiliation}</p>
          
          {speaker.talkTitle && (
            <div className="bg-gray-100 border-l-4 border-gray-900 p-3 rounded-r mb-4">
              <p className="text-sm font-semibold text-gray-900">{speaker.talkTitle}</p>
            </div>
          )}
        </div>
        
        <Link 
          href={`/speakers/${speaker.slug}`}
          className="text-gray-900 hover:text-gray-600 font-semibold inline-flex items-center transition-colors mt-auto"
        >
          En savoir plus
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
          </svg>
        </Link>
      </CardContent>
    </Card>
  )
}