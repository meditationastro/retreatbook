import Link from "next/link"
import Image from "next/image"
import SiteShell from "@/components/SiteShell"
import CTASection from "@/components/CTASection"
import { readSiteContent } from "@/lib/siteContent"
import { readRetreats } from "@/lib/retreats"
import { getAllPosts } from "@/lib/blog"

export const metadata = {
  title: "Clue UX — Meditation Retreats, Spiritual Immersion & Vedic Astrology",
  description: "Luxury meditation retreats in Nepal, immersive programs, and authentic Vedic astrology guidance.",
}

export default function Home() {
  const sc = readSiteContent()
  const home = sc.home || {}
  const retreats = readRetreats()?.items?.slice(0, 3) || []
  const posts = getAllPosts().slice(0, 3)
  const testimonials = (sc.testimonials || []).slice(0, 6)

  return (
    <SiteShell>
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="w-full h-full bg-[radial-gradient(circle_at_top,#ffffff20,transparent_45%)]" />
          </div>

          <div className="max-w-7xl mx-auto px-6 py-20 relative">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">{home.heroTitle}</h1>
              <p className="mt-6 text-lg text-white/70">{home.heroSubtitle}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/retreats" className="bg-white text-black px-6 py-3 rounded-full hover:opacity-90">Explore Retreats</Link>
                <Link href="/vedic-astrology" className="border border-white/20 px-6 py-3 rounded-full hover:bg-white/10">Book Astrology Reading</Link>
              </div>
              <div className="mt-10 text-sm text-white/50">
                Optional: set <code className="text-white/70">home.heroVideoUrl</code> in Admin → CMS.
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-semibold">Our Pathways</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {(home.pathways || []).map((p: any) => (
              <Link key={p.title} href={p.href} className="rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-7">
                <div className="text-xl font-semibold">{p.title}</div>
                <div className="mt-2 text-white/70">{p.desc}</div>
                <div className="mt-5 text-sm underline text-white/70">Learn more</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Upcoming Retreats</h2>
              <p className="text-white/60 mt-2">Deposits from Feb 2026 onwards. Calendar booking available.</p>
            </div>
            <Link href="/retreats" className="text-sm underline text-white/70 hover:text-white">View all</Link>
          </div>

          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {retreats.map((r: any) => (
              <Link key={r.slug} href={`/retreats/${r.slug}`} className="rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition overflow-hidden">
                {r.image && (
                  <div className="relative h-44">
                    <Image src={r.image} alt={r.title} fill className="object-cover" />
                  </div>
                )}
                <div className="p-7 space-y-2">
                  <div className="text-sm text-white/50">{r.location} • {r.durationDays} days</div>
                  <div className="text-xl font-semibold">{r.title}</div>
                  <div className="text-white/70 text-sm line-clamp-2">{r.description}</div>
                  <div className="text-sm text-white/50">From {r.priceFrom}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 grid md:grid-cols-[180px_1fr] gap-8 items-center">
            <div className="relative w-[180px] h-[180px] rounded-3xl overflow-hidden border border-white/10 bg-black/40">
              <Image src={(home.founder?.image || "/img/founder.png")} alt="Founder" fill className="object-cover" />
            </div>
            <div className="space-y-3">
              <div className="text-sm text-white/50">About the Founder / Guide</div>
              <div className="text-2xl font-semibold">{home.founder?.name || "Founder / Guide"}</div>
              <p className="text-white/70">{home.founder?.bio}</p>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-white/60">
                <div><span className="text-white/80 font-medium">Lineage:</span> {home.founder?.lineage}</div>
                <div><span className="text-white/80 font-medium">Philosophy:</span> {home.founder?.philosophy}</div>
              </div>
              <Link href="/about" className="inline-block mt-2 underline text-white/70 hover:text-white">Read full story</Link>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-16">
          <h2 className="text-2xl font-semibold">Testimonials</h2>
          <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
            {testimonials.map((t: any, i: number) => (
              <div key={i} className="min-w-[320px] rounded-3xl border border-white/10 bg-white/5 p-7">
                <div className="text-white/80 font-semibold">{t.name}</div>
                <div className="text-xs text-white/50">{t.location}</div>
                <div className="mt-4 text-white/70">“{t.quote}”</div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Wisdom Articles</h2>
              <p className="text-white/60 mt-2">Meditation techniques, astrology insights, and Vedic philosophy.</p>
            </div>
            <Link href="/h/blog" className="text-sm underline text-white/70 hover:text-white">Go to blog</Link>
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {posts.map((p) => (
              <Link key={p.slug} href={`/h/blog/${p.slug}`} className="rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition overflow-hidden">
                {p.frontmatter.image && (
                  <div className="relative h-44">
                    <Image src={p.frontmatter.image} alt={p.frontmatter.title} fill className="object-cover" />
                  </div>
                )}
                <div className="p-7 space-y-2">
                  <div className="text-sm text-white/50">{p.frontmatter.collection || p.frontmatter.category}</div>
                  <div className="text-xl font-semibold">{p.frontmatter.title}</div>
                  <div className="text-sm text-white/70 line-clamp-2">{p.frontmatter.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <CTASection />
      </main>
    </SiteShell>
  )
}
