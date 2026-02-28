import { getPage, getSpeakers, getSponsors, getSiteConfig } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXComponents } from "@/components/mdx/MDXComponents";
import { Hero } from "@/components/home/Hero";
import { Organizers } from "@/components/home/Organizers";
import { SponsorsGrid } from "@/components/home/SponsorsGrid";

export default async function HomePage() {
  const pageData = await getPage("home");
  const sponsors = await getSponsors();
  const config = await getSiteConfig();

  if (!pageData) {
    return <div>Page not found</div>;
  }

  const { frontMatter, content } = pageData;

  return (
    <div className="min-h-screen">
      <Hero/>
      <section className="container mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          <MDXRemote source={content} components={MDXComponents} />
        </div>
      </section>

      {sponsors.length > 0 && (
        <SponsorsGrid sponsors={sponsors} />
      )}

      {config.organizers && config.organizers.length > 0 && (
        <Organizers organizers={config.organizers} />
      )}
    </div>
  );
}
