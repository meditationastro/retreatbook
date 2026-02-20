import SiteShell from "@/components/SiteShell"
import { readSiteContent } from "@/lib/siteContent"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"

export default function AboutPage() {
  const sc = readSiteContent()
  const a = sc.about || {}
  const source = a.rich || "## About\n\nEdit this page in Admin → CMS."
  const isHtml = typeof source === "string" && source.trim().startsWith("<")

  return (
    <SiteShell>
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-8">
        <h1 className="text-4xl font-bold">{a.title || "Our Spiritual Lineage & Mission"}</h1>
        {isHtml ? (
          <article className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: source }} />
        ) : (
          <article className="prose prose-invert max-w-none">
            <MDXRemote source={source} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
          </article>
        )}
      </main>
    </SiteShell>
  )
}
