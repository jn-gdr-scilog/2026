"use client"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Sponsor } from "@/types"
import nextConfig from "@/next.config"

export const basePath = nextConfig.basePath ?? ""


interface SponsorsGridProps {
  sponsors: Sponsor[]
}

export function SponsorsGrid({ sponsors }: SponsorsGridProps) {
  if (sponsors.length === 0) {
    return null
  }

  const sortedSponsors = [...sponsors].sort((a, b) => {
    const orderA = a.order ?? Infinity
    const orderB = b.order ?? Infinity
    return orderA - orderB
  })

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Nos partenaires
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Merci à nos partenaires qui rendent cet événement possible
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {sortedSponsors.map((sponsor) => (
            <Card
              key={sponsor.slug}
              className="border-2 hover:shadow-xl transition-all hover:scale-105 duration-300"
            >
              <CardContent className="p-6 flex flex-col items-center justify-center h-48 relative">
                <a
                  href={sponsor.website || "#"}
                  target={sponsor.website ? "_blank" : undefined}
                  rel={sponsor.website ? "noopener noreferrer" : undefined}
                  className="flex flex-col items-center justify-center w-full h-full group"
                >
                  <div className="relative w-full h-32 mb-3">
                    <Image
                      src={basePath + sponsor.logo}
                      alt={sponsor.name}
                      fill
                      className="object-contain transition-opacity group-hover:opacity-75"
                      unoptimized
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-700 text-center group-hover:text-blue-600 transition">
                    {sponsor.name}
                  </p>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}