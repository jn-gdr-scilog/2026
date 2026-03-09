import { getPage } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXComponents } from "@/components/mdx/MDXComponents";

export default async function AfadelPage() {
  const pageData = await getPage("afadl");

  if (!pageData) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">AFADL</h1>
        <p className="text-gray-600">Contenu à venir.</p>
      </div>
    );
  }

  const { frontMatter, content } = pageData;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-3 text-gray-900">
            {frontMatter.title}
          </h1>
          <p className="text-xl text-gray-600">{frontMatter.description}</p>
        </div>
      </div>
      <div className="container max-w-4xl mx-auto px-4">
        <div className="prose prose-lg max-w-none bg-white rounded-lg p-8 shadow-sm">
          <MDXRemote source={content} components={MDXComponents} />
        </div>
      </div>
    </div>
  );
}
