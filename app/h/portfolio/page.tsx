import Link from "next/link"
import CTASection from "@/components/CTASection"

export const metadata = {
  title: "Portfolio",
  description: "Personal portfolio: retreats, workshops, projects, and inner journey work.",
}

export default function Portfolio() {
  return (
    <main className="bg-[#070707] text-white min-h-screen">
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-10">
        <header className="space-y-3">
          <h1 className="text-4xl font-bold">Portfolio</h1>
          <p className="text-white/70">A curated portfolio of retreats, workshops, and spiritual projects.</p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/h/retreats" className="rounded-3xl border border-white/10 bg-white/5 p-7 hover:bg-white/10 transition">
            <div className="text-xl font-semibold">Retreat Programs</div>
            <p className="mt-2 text-white/70 text-sm">Luxury Nepal retreats with calendar booking and deposits.</p>
          </Link>
          <Link href="/h/workshops" className="rounded-3xl border border-white/10 bg-white/5 p-7 hover:bg-white/10 transition">
            <div className="text-xl font-semibold">Workshops</div>
            <p className="mt-2 text-white/70 text-sm">Curriculum, daily flow, integration circles.</p>
          </Link>
          <Link href="/h/tools/inner-journey" className="rounded-3xl border border-white/10 bg-white/5 p-7 hover:bg-white/10 transition">
            <div className="text-xl font-semibold">Inner Journeys</div>
            <p className="mt-2 text-white/70 text-sm">Quest tools for self-inquiry and transformation.</p>
          </Link>
        </div>
      </section>
      <CTASection />
    </main>
  )
}
