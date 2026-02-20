import SiteShell from "@/components/SiteShell"
import Link from "next/link"
import { readSiteContent } from "@/lib/siteContent"

export default function ProgramsPage() {
  const sc = readSiteContent()
  const p = sc.programs || {}
  const items = p.categories || []
  return (
    <SiteShell>
      <main className="max-w-6xl mx-auto px-6 py-16 space-y-10">
        <header className="space-y-3">
          <h1 className="text-4xl font-bold">{p.title || "Spiritual Training Programs"}</h1>
          <p className="text-white/70">Online and in-person programs for spiritual growth and certification.</p>
        </header>

        <section className="grid md:grid-cols-2 gap-6">
          {items.map((c: any) => (
            <div key={c.slug} className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-3">
              <div className="text-xl font-semibold">{c.title}</div>
              <div className="text-sm text-white/60">{c.duration} • {c.mode}</div>
              <div className="text-sm text-white/70">
                <div className="font-medium text-white/80">Curriculum overview</div>
                <ul className="mt-2 list-disc pl-5 space-y-1">
                  {(c.curriculum || []).map((x: string) => <li key={x}>{x}</li>)}
                </ul>
              </div>
              <div className="text-sm text-white/60">Price: <span className="text-white/80 font-medium">{c.price}</span></div>
              <Link href="/contact" className="underline text-white/70 hover:text-white">Enroll</Link>
            </div>
          ))}
        </section>
      </main>
    </SiteShell>
  )
}
