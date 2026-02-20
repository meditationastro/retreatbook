import Link from "next/link"
import CTASection from "@/components/CTASection"
import { listDownloads } from "@/lib/downloads"

export const metadata = {
  title: "Downloads",
  description: "Free resources, PDF guides, and digital downloads.",
}

export default function DownloadsPage() {
  const items = listDownloads()
  return (
    <main className="bg-[#070707] text-white min-h-screen">
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-10">
        <header className="space-y-3">
          <h1 className="text-4xl font-bold">Downloads</h1>
          <p className="text-white/70">
            Free PDF guides and resource packs. Upload files to <code className="text-white/70">/public/downloads</code> to list them here.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="text-xl font-semibold">Free Resources</div>
            <p className="mt-2 text-white/70 text-sm">Printable reflection sheets, journaling prompts, and checklists.</p>
            <div className="mt-6 space-y-3">
              {items.length ? items.map((d) => (
                <Link key={d.filename} href={`/downloads/${encodeURIComponent(d.filename)}`} className="block rounded-2xl border border-white/10 bg-black/30 hover:bg-white/10 transition p-4">
                  <div className="text-xs text-white/50">{d.type.toUpperCase()}</div>
                  <div className="mt-1 font-semibold">{d.title}</div>
                  <div className="mt-1 text-xs text-white/50">/downloads/{d.filename}</div>
                </Link>
              )) : (
                <div className="text-sm text-white/60">No files yet — add PDFs to <code className="text-white/70">public/downloads</code>.</div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="text-xl font-semibold">Digital Shop (optional)</div>
            <p className="mt-2 text-white/70 text-sm">
              If you want paid digital downloads, we can enable Stripe delivery flows (secure links + email).
            </p>
            <div className="mt-6 grid gap-3 text-sm">
              <Link className="underline" href="/h/contact">Request paid downloads setup</Link>
              <Link className="underline" href="/h/retreats">Book a retreat instead</Link>
            </div>
          </div>
        </div>
      </section>
      <CTASection />
    </main>
  )
}
