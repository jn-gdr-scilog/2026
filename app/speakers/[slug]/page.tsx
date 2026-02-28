import { getSpeakerBySlug, getSpeakers } from "@/lib/mdx"
import { MDXRemote } from "next-mdx-remote/rsc"
import { MDXComponents } from "@/components/mdx/MDXComponents"
import Image from "next/image"
import { notFound } from "next/navigation"
import Link from "next/link"

export async function generateStaticParams() {
  const speakers = await getSpeakers()
  
  if (speakers.length === 0) {
    return [{ slug: "_placeholder" }]
  }

  return speakers.map((speaker) => ({
    slug: speaker.slug,
  }))
}

export default async function SpeakerPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (slug === "_placeholder") {
    notFound()
  }

  try {
    const { frontMatter, content } = await getSpeakerBySlug(slug)

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/speakers"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour aux intervenants
            </Link>

            <div className="flex flex-col md:flex-row gap-8 mb-12">
              <div className="relative w-full md:w-64 h-64 flex-shrink-0 mx-auto md:mx-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={frontMatter.image || "/images/speakers/placeholder.jpg"}
                  alt={frontMatter.name}
                  fill
                  className="object-contain p-4"
                  unoptimized
                />
              </div>

              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2 text-gray-900">
                  {frontMatter.name}
                </h1>
                <p className="text-xl text-gray-700 mb-2 font-medium">
                  {frontMatter.role}
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  {frontMatter.affiliation}
                </p>

                {frontMatter.bio && (
                  <p className="text-gray-700 leading-relaxed mb-6 italic border-l-4 border-gray-300 pl-4">
                    {frontMatter.bio}
                  </p>
                )}

                {(frontMatter.website || frontMatter.email || frontMatter.twitter) && (
                  <div className="flex flex-wrap gap-3 mb-6">
                    {frontMatter.website && (
                      <a
                        href={frontMatter.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-900 hover:text-white border border-gray-300 rounded-lg transition-colors text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        Website
                      </a>
                    )}
                    {frontMatter.email && (
                      <a
                        href={`mailto:${frontMatter.email}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-900 hover:text-white border border-gray-300 rounded-lg transition-colors text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Email
                      </a>
                    )}
                    {frontMatter.twitter && (
                      <a
                        href={`https://twitter.com/${frontMatter.twitter.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-900 hover:text-white border border-gray-300 rounded-lg transition-colors text-sm"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                        Twitter
                      </a>
                    )}
                  </div>
                )}

                {frontMatter.talkTitle && (
                  <div className="bg-gray-100 border-l-4 border-gray-900 p-4 rounded-r">
                    <div className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">
                      Conférence
                    </div>
                    <h3 className="font-bold text-base text-gray-900">
                      {frontMatter.talkTitle}
                    </h3>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-gray-300 mb-8" />

            <div className="prose prose-lg max-w-none">
              <MDXRemote source={content} components={MDXComponents} />
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error loading speaker:", error)
    notFound()
  }
}