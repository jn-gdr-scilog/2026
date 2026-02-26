import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { getSiteConfig } from "@/lib/mdx"

export async function Hero() {
  const config = await getSiteConfig()
  
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={config.heroImage || "/images/hero/maxresdefault.jpg"}
          alt={config.venueName || "Remplir le lieu de la conférence"}
          fill
          className="object-cover opacity-50"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-white/90 to-gray-50/90 opacity-50" />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-blue-50 rounded-full">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium text-blue-900">
              {config.dates || "15-17 Juin 2026"}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-gray-900">
            {config.heroTitle || config.siteName || "GDR Scilog 2026"}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-3">
            {config.heroSubtitle || config.tagline || "Conférence annuelle sur la logique et l'informatique"}
          </p>

          <div className="flex items-center justify-center gap-2 mb-10 text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>
              {config.venueName || "Polytech Lille"}, {config.venueCity || "Villeneuve-d'Ascq"}
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-base px-8">
              <Link href="/registration">S'inscrire</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base px-8">
              <Link href="/programme">Programme</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}