"use client"

import * as React from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"

interface Sponsor {
  slug: string
  name: string
  logo: string
  website?: string
  description?: string
  order?: number
}

interface SponsorsCarouselProps {
  sponsors: Sponsor[]
  autoplay?: boolean
}

export function SponsorsCarousel({ 
  sponsors, 
  autoplay = true,
}: SponsorsCarouselProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  )

  if (sponsors.length === 0) {
    return null
  }

  const displaySponsors = [...sponsors]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Nos partenaires
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Merci à nos partenaires qui rendent cet événement possible
        </p>
        
        <Carousel
          plugins={autoplay ? [plugin.current] : []}
          className="w-full max-w-5xl mx-auto"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {displaySponsors.map((sponsor) => (
              <CarouselItem 
                key={sponsor.slug} 
                className="pl-2 md:pl-4 basis-full md:basis-1/3"
              >
                <div className="p-1">
                  <Card className="border-2 hover:shadow-xl transition-all hover:scale-105 duration-300">
                    <CardContent className="p-6 flex flex-col items-center justify-center h-48 relative">
                      <a 
                        href={sponsor.website || "#"} 
                        target={sponsor.website ? "_blank" : undefined}
                        rel={sponsor.website ? "noopener noreferrer" : undefined}
                        className="flex flex-col items-center justify-center w-full h-full group"
                      >
                        <div className="relative w-full h-32 mb-3">
                          <Image
                            src={sponsor.logo}
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
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  )
}