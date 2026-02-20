import Link from "next/link"
import Image from "next/image"
import { getAllPosts } from "@/lib/blog"

export default function CollectionPage({ params }: { params: { name: string } }) {
  const name = decodeURIComponent(params.name)
  const posts = getAllPosts().filter((p) => (p.frontmatter.collection || p.frontmatter.category) === name)

  return (
    <main className="bg-[#070707] text-white min-h-screen">
      <section className="max-w-5xl mx-auto px-6 py-16 space-y-6">
        <Link href="/h/blog" className="text-sm text-white/60 hover:text-white/80">← Back to Blog</Link>
        <h1 className="text-4xl font-bold">Collection: {name}</h1>

        <div className="grid gap-4">
          {posts.map((p) => (
            <Link key={p.slug} href={`/h/blog/${p.slug}`} className="block rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition overflow-hidden">
              {p.frontmatter.image && (
                <div className="relative w-full h-44">
                  <Image src={p.frontmatter.image} alt={p.frontmatter.title} fill className="object-cover" />
                </div>
              )}
              <div className="p-7">
                <div className="text-sm text-white/50">{new Date(p.frontmatter.date).toDateString()} • {p.readingMinutes} min</div>
                <div className="mt-2 text-2xl font-semibold">{p.frontmatter.title}</div>
                <div className="mt-2 text-white/70">{p.frontmatter.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
