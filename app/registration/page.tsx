import { getPage } from "@/lib/mdx"
import { MDXRemote } from "next-mdx-remote/rsc"
import { MDXComponents } from "@/components/mdx/MDXComponents"
import { Button } from "@/components/ui/button"
import Link from "next/link"


export default async function RegistrationPage() {
  const pageData = await getPage("registration")

  if (!pageData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container max-w-3xl mx-auto px-4 py-12">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h1 className="text-2xl font-bold mb-3 text-gray-900">
              Inscription à venir
            </h1>
            <p className="text-gray-600">
              Les inscriptions seront ouvertes prochainement.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const { frontMatter, content } = pageData

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-3 text-gray-900">
              {frontMatter.title || "Inscription"}
            </h1>
            {frontMatter.description && (
              <p className="text-xl text-gray-600 mb-8">
                {frontMatter.description}
              </p>
            )}
          </div>

          <div className="border-t border-gray-300 mb-12" />

          {/* contenu mdx */}
          <div className="prose prose-lg max-w-none">
            <MDXRemote source={content} components={MDXComponents} />
          </div>

          <div className="border-t border-gray-300 mt-12 mb-8" />

          {frontMatter.registrationOpen && frontMatter.registrationUrl && (
            <div className="text-center">
              <Button asChild size="lg">
                <Link
                  href={frontMatter.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  S'inscrire maintenant →
                </Link>
              </Button>
            </div>
          )}

          {!frontMatter.registrationOpen && (
            <div className="text-center">
              <p className="text-gray-600">
                Les inscriptions ne sont pas encore ouvertes.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}