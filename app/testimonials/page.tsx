import SiteShell from "@/components/SiteShell"
import { readSiteContent } from "@/lib/siteContent"

export default function TestimonialsPage() {
  const sc = readSiteContent()
  const items = sc.testimonials || []
  return (
    <SiteShell>
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-8">
        <h1 className="text-4xl font-bold">Testimonials</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((t: any, i: number) => (
            <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <div className="font-semibold">{t.name}</div>
              <div className="text-xs text-white/50">{t.location}</div>
              <div className="mt-4 text-white/70">“{t.quote}”</div>
            </div>
          ))}
        </div>
      </main>
    </SiteShell>
  )
}
