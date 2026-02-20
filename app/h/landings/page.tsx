import Link from "next/link"
import { getAllLandings } from "@/lib/landings"

export const metadata = {
  title: "Retreat Guides & Landing Pages",
  description: "SEO landing pages for retreats, workshops, and self-reflection.",
}

export default function LandingsIndex() {
  const pages = getAllLandings()
  return (
    <main className="bg-[#070707] text-white min-h-screen">
      <section className="max-w-5xl mx-auto px-6 py-16 space-y-8">
        <h1 className="text-4xl font-bold">Retreat Guides</h1>
        <p className="text-white/70">
          Programmatic landing pages to help visitors find the right retreat — with strong internal links.
        </p>
        <div className="grid gap-4">
          {pages.map((p) => (
            <Link
              key={p.slug}
              href={`/h/landings/${p.slug}`}
              className="block rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-7"
            >
              <div className="text-xs text-white/50">{p.frontmatter.intent.toUpperCase()}</div>
              <div className="mt-2 text-2xl font-semibold">{p.frontmatter.title}</div>
              <div className="mt-2 text-white/70">{p.frontmatter.description}</div>
              <div className="mt-4 text-sm text-white/60">
                Primary keyword: <span className="text-white/80">{p.frontmatter.primaryKeyword}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-sm text-white/50 pt-6">
          Tip: Add more pages in <code className="text-white/70">content/landings</code>.
        </div>
      </section>
    </main>
  )
}
