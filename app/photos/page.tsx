"use client"

import { useState } from "react"
import Image from "next/image"

const photos = [
  "P1040142.JPG",
  "P1040145.JPG",
  "P1040148.JPG",
  "P1040159.JPG",
  "P1040169.JPG",
  "P1040200.JPG",
  "P1040201.JPG",
  "P1040202.JPG",
  "P1040212.JPG",
  "P1040220.JPG",
  "P1040223.JPG",
  "P1040229.JPG",
  "P1040231.JPG",
  "P1040235.JPG",
  "P1040238.JPG",
  "P1040241.JPG",
].map((f) => ({ src: `/photos/${f}`, alt: f.replace(/\.[^.]+$/, "") }))

export default function PhotosPage() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const closeLightbox = () => setLightbox(null)
  const prev = () => setLightbox((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null))
  const next = () => setLightbox((i) => (i !== null ? (i + 1) % photos.length : null))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">Photos</h1>
          <p className="text-xl text-gray-600">Journées GDR SciLog 2026</p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="break-inside-avoid cursor-pointer group overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow"
              onClick={() => setLightbox(index)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={800}
                height={600}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300"
            aria-label="Fermer"
          >
            ✕
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-5xl hover:text-gray-300 px-2"
            aria-label="Précédent"
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-5xl hover:text-gray-300 px-2"
            aria-label="Suivant"
          >
            ›
          </button>
          <div
            className="max-w-5xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[lightbox].src}
              alt={photos[lightbox].alt}
              width={1200}
              height={900}
              className="max-h-[85vh] w-auto object-contain rounded-lg"
            />
            <p className="text-gray-400 text-center mt-2 text-xs">
              {lightbox + 1} / {photos.length}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}