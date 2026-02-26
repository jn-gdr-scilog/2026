import { getVenue, getSiteConfig } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXComponents } from "@/components/mdx/MDXComponents";

export default async function VenuePage() {
  const venueData = await getVenue();
  const config = await getSiteConfig();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">
            {config.venueName || "Lieu de la conférence"}
          </h1>
          <p className="text-xl text-gray-600">
            {config.venueAddress || "Adresse à confirmer"}
          </p>
        </div>

        {!venueData ? (
          <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">📍</div>
            <h2 className="text-2xl font-bold mb-3 text-gray-900">
              Informations à venir
            </h2>
            <p className="text-gray-600 mb-6">
              Les détails sur le lieu seront annoncés prochainement.
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded p-4 text-sm text-gray-600 text-left">
              <p className="font-semibold mb-2">
                Pour ajouter les informations :
              </p>
              <code className="block bg-gray-900 text-white px-3 py-2 rounded">
                content/venue/main.mdx
              </code>
            </div>
          </div>
        ) : (
          <div className="prose prose-lg max-w-none">
            <MDXRemote source={venueData.content} components={MDXComponents} />
          </div>
        )}
      </div>
    </div>
  );
}
