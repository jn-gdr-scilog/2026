import { getPage } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXComponents } from "@/components/mdx/MDXComponents";

export default async function CodeOfConductPage() {
  const pageData = await getPage("code-of-conduct");

  if (!pageData) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">Code de conduite</h1>
        <p className="text-gray-600">Contenu à venir.</p>
      </div>
    );
  }

  const { frontMatter, content } = pageData;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-4xl mx-auto px-4 ">
        {/* header */}
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-3 text-gray-900">
              {frontMatter.title}
            </h1>
            <p className="text-xl text-gray-600">{frontMatter.description}</p>
          </div>
        </div>
        {/* contenu mdx */}
        <div className="prose prose-lg max-w-none bg-white rounded-lg p-8 shadow-sm">
          <MDXRemote source={content} components={MDXComponents} />
        </div>

        {/* contact box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Questions ou préoccupations ?
          </h3>
          <p className="text-blue-800 text-sm mb-3">
            N&apos;hésitez pas à contacter le comité d&apos;organisation
          </p>
        </div>
      </div>
    </div>
  );
}
