import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import BreadcrumbSchema from "@/components/BreadcrumbSchema"
import { getAllPosts, getPostBySlug } from "@/lib/blog"

export const dynamic = "force-static"
export const revalidate = 86400

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  const img = post.frontmatter.image ? (post.frontmatter.image.startsWith("http") ? post.frontmatter.image : post.frontmatter.image) : undefined
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: {
      canonical: post.frontmatter.canonical ? post.frontmatter.canonical : `/h/blog/${post.slug}`,
    },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      images: img ? [{ url: img }] : undefined,
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) return notFound()

  const base = process.env.NEXT_PUBLIC_URL || "https://clueux.com"
  const url = `${base}/h/blog/${post.slug}`

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: post.frontmatter.author || "Clue UX" },
    publisher: { "@type": "Organization", name: "Clue UX" },
    image: post.frontmatter.image ? [post.frontmatter.image] : undefined,
  }

  const all = getAllPosts()
  const related = all
    .filter((p) => p.slug !== post.slug && (p.frontmatter.category === post.frontmatter.category || p.frontmatter.collection === post.frontmatter.collection))
    .slice(0, 4)

  return (
    <main className="bg-[#070707] text-white min-h-screen">
      <section className="max-w-3xl mx-auto px-6 py-14 space-y-6">
        <BreadcrumbSchema
          items={[
            { name: "Home", url: base + "/h" },
            { name: "Blog", url: base + "/h/blog" },
            { name: post.frontmatter.title, url },
          ]}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

        <Link href="/h/blog" className="text-sm text-white/60 hover:text-white/80">
          ← Back to Blog
        </Link>

        <header className="space-y-3">
          <div className="text-sm text-white/50">
            {new Date(post.frontmatter.date).toDateString()} • {post.readingMinutes} min •{" "}
            <span className="text-white/70">{post.frontmatter.category}</span>
          </div>
          <h1 className="text-4xl font-bold">{post.frontmatter.title}</h1>
          <p className="text-white/70">{post.frontmatter.description}</p>

          {post.frontmatter.image && (
            <div className="relative w-full h-[320px] rounded-3xl overflow-hidden border border-white/10 bg-white/5 mt-6">
              <Image src={post.frontmatter.image} alt={post.frontmatter.title} fill className="object-cover" priority />
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            {(post.frontmatter.tags || []).map((t) => (
              <Link
                key={t}
                href={`/h/blog/tag/${encodeURIComponent(t)}`}
                className="text-xs border border-white/15 rounded-full px-3 py-2 text-white/70 hover:text-white hover:bg-white/5"
              >
                {t}
              </Link>
            ))}
          </div>
        </header>

        <article className="prose prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:text-white underline">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
              },
            }}
          />
        </article>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold">Internal next steps</div>
          <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
            <Link className="underline" href="/h/retreats">Explore Retreats</Link>
            <Link className="underline" href="/h/guides-tools/decision-making-tools">Decision Tools</Link>
            <Link className="underline" href="/h/guides-tools/self-reflection-guides">Self-Reflection Guides</Link>
            <Link className="underline" href="/h/landings">Retreat Guides</Link>
          </div>
        </div>

        {related.length > 0 && (
          <div className="pt-4">
            <div className="text-sm font-semibold">Related articles</div>
            <div className="mt-4 grid gap-3">
              {related.map((p) => (
                <Link key={p.slug} href={`/h/blog/${p.slug}`} className="block rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-5">
                  <div className="text-sm text-white/50">{p.frontmatter.collection || p.frontmatter.category}</div>
                  <div className="mt-1 font-semibold">{p.frontmatter.title}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
