import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <main className="bg-[#070707] text-white min-h-screen">
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-10 grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="text-sm text-white/60">Clue UX • AnswerForSelf • Nepal Retreats</div>
          <h1 className="text-5xl font-bold tracking-tight">
            Premium Retreats, Self-Reflection Answers, and Tools — in one place.
          </h1>
          <p className="text-lg text-white/70">
            Explore curated answers, guides, and resources — and reserve a luxury Himalayan retreat with a deposit.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link className="bg-white text-black px-6 py-3 rounded-full hover:opacity-90" href="/h/retreats">
              Explore Retreats
            </Link>
            <Link className="border border-white/20 px-6 py-3 rounded-full hover:bg-white/10" href="/h/answers/life-questions">
              Read Answers
            </Link>
            <Link className="border border-white/20 px-6 py-3 rounded-full hover:bg-white/10" href="/h/guides-tools/self-reflection-guides">
              Guides & Tools
            </Link>
          </div>
        </div>

        <div className="relative h-[420px] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
          <Image src="/img/retreats/gallery1.jpg" alt="Retreat Nepal" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/20 to-transparent" />
        
          <Link href="/h/landings" className="rounded-3xl border border-white/10 p-7 bg-white/5 hover:bg-white/10 transition">
            <div className="text-xl font-semibold">Retreat Guides</div>
            <p className="mt-2 text-white/70">SEO landing pages for high-intent keywords + FAQ schema.</p>
          </Link>

        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/h/retreats" className="rounded-3xl border border-white/10 p-7 bg-white/5 hover:bg-white/10 transition">
            <div className="text-xl font-semibold">Retreats</div>
            <p className="mt-2 text-white/70">Multi-retreat listing, detail pages, calendar start-date grid, Stripe deposit.</p>
          </Link>
          <Link href="/h/workshops" className="rounded-3xl border border-white/10 p-7 bg-white/5 hover:bg-white/10 transition">
            <div className="text-xl font-semibold">Workshops</div>
            <p className="mt-2 text-white/70">Workshop curriculum, daily schedule, and integration practices.</p>
          </Link>
          <Link href="/h/community/ask-a-question" className="rounded-3xl border border-white/10 p-7 bg-white/5 hover:bg-white/10 transition">
            <div className="text-xl font-semibold">Community</div>
            <p className="mt-2 text-white/70">Ask a question, share stories, and get support links when needed.</p>
          </Link>
        
          <Link href="/h/landings" className="rounded-3xl border border-white/10 p-7 bg-white/5 hover:bg-white/10 transition">
            <div className="text-xl font-semibold">Retreat Guides</div>
            <p className="mt-2 text-white/70">SEO landing pages for high-intent keywords + FAQ schema.</p>
          </Link>

        </div>
      </section>
    </main>
  )
}