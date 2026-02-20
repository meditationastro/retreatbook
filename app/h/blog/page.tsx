import Link from "next/link"
import Image from "next/image"
import { getAllPosts, getCollections } from "@/lib/blog"

export const metadata = {
  title: "Blog",
  description: "Articles on meditation retreats, self-reflection, and life clarity.",
}

export default function BlogIndex() {
  const posts = getAllPosts()
  const latest = posts.slice(0, 8)
  const popular = posts.filter((p) => p.frontmatter.featured).slice(0, 6)
  const collections = getCollections(posts)

  return (
    <main className="bg-[#070707] text-white min-h-screen">
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-12">
        <header className="space-y-3">
          <h1 className="text-4xl font-bold">Blog</h1>
          <p className="text-white/70">Authority articles + guides. Each post links into topic clusters and retreats.</p>
          <div className="text-sm text-white/60">
            Browse <Link className="underline" href="/h/landings">Retreat Guides</Link> for high-intent pages.
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Latest Articles</h2>
              <Link className="text-sm text-white/60 hover:text-white underline" href="/h/answers">
                Answers Hub
              </Link>
            </div>
            <div className="grid gap-4">
              {latest.map((p) => (
                <Link key={p.slug} href={`/h/blog/${p.slug}`} className="block rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition overflow-hidden">
                  {p.frontmatter.image && (
                    <div className="relative w-full h-48">
                      <Image src={p.frontmatter.image} alt={p.frontmatter.title} fill className="object-cover" />
                    </div>
                  )}
                  <div className="p-7">
                    <div className="text-sm text-white/50">
                      {new Date(p.frontmatter.date).toDateString()} • {p.readingMinutes} min •{" "}
                      {p.frontmatter.collection || p.frontmatter.category}
                    </div>
                    <div className="mt-2 text-2xl font-semibold">{p.frontmatter.title}</div>
                    <div className="mt-2 text-white/70">{p.frontmatter.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <aside className="space-y-8">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm font-semibold">Collections</div>
              <div className="mt-4 space-y-2">
                {collections.map((c) => (
                  <Link key={c.name} href={`/h/blog/collection/${encodeURIComponent(c.name)}`} className="block text-sm text-white/70 hover:text-white">
                    {c.name} <span className="text-white/40">({c.count})</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm font-semibold">Popular Reads</div>
              <div className="mt-4 space-y-3">
                {popular.length ? (
                  popular.map((p) => (
                    <Link key={p.slug} href={`/h/blog/${p.slug}`} className="block rounded-2xl border border-white/10 bg-black/30 hover:bg-white/10 transition overflow-hidden">
                      {p.frontmatter.image && (
                        <div className="relative w-full h-24">
                          <Image src={p.frontmatter.image} alt={p.frontmatter.title} fill className="object-cover" />
                        </div>
                      )}
                      <div className="p-4">
                        <div className="text-xs text-white/50">{p.frontmatter.collection || p.frontmatter.category}</div>
                        <div className="mt-1 font-semibold">{p.frontmatter.title}</div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-sm text-white/60">
                    Mark posts as <code className="text-white/70">featured: true</code> to appear here.
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm font-semibold">Conversion paths</div>
              <div className="mt-4 space-y-2 text-sm">
                <Link className="block underline" href="/h/retreats">Retreats (Book with deposit)</Link>
                <Link className="block underline" href="/h/workshops">Workshops</Link>
                <Link className="block underline" href="/h/guides-tools">Guides & Tools</Link>
                <Link className="block underline" href="/h/tools/inner-journey">Inner Journey Tool</Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
