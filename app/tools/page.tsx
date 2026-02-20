import SiteShell from "@/components/SiteShell"
import Link from "next/link"

export const metadata = { title: "Tools — Birth Chart, Life Matrix, Inner Journey" }

export default function ToolsHub() {
  return (
    <SiteShell>
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-10">
        <h1 className="text-4xl font-bold">Spiritual & Astrology Tools</h1>
        <p className="text-white/70">Tools that support your inner journey. For deep precision, book a Jyotish consultation.</p>

        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/tools/birth-chart" className="rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-8">
            <div className="text-xl font-semibold">Birth Chart Generator</div>
            <div className="mt-2 text-white/70">Enter birth details → get a clean summary + downloadable report.</div>
            <div className="mt-5 underline text-white/70">Open</div>
          </Link>
          <Link href="/tools/life-matrix" className="rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-8">
            <div className="text-xl font-semibold">Life Matrix Mapping</div>
            <div className="mt-2 text-white/70">Structured mapping of values, habits, relationships, and purpose.</div>
            <div className="mt-5 underline text-white/70">Open</div>
          </Link>
          <Link href="/tools/inner-journey" className="rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-8">
            <div className="text-xl font-semibold">Inner Journey Quest</div>
            <div className="mt-2 text-white/70">Guided questions + habit-change plan + printable commitments.</div>
            <div className="mt-5 underline text-white/70">Open</div>
          </Link>
        </div>
      </main>
    </SiteShell>
  )
}
