import SiteShell from "@/components/SiteShell"
import Link from "next/link"
import { readSiteContent } from "@/lib/siteContent"

export default function MeditationPage() {
  const sc = readSiteContent()
  const m = sc.meditation || {}
  return (
    <SiteShell>
      <main className="max-w-6xl mx-auto px-6 py-16 space-y-12">
        <header className="space-y-3">
          <h1 className="text-4xl font-bold">{m.intro || "Meditation for Inner Clarity & Awakening"}</h1>
          <p className="text-white/70">{m.rich || ""}</p>
        </header>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Types of Practices</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {(m.practices || []).map((p: any) => (
              <div key={p.title} className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-3">
                <div className="text-xl font-semibold">{p.title}</div>
                <p className="text-white/70">{p.desc}</p>
                <div className="text-sm text-white/60">
                  <div className="font-medium text-white/80">Benefits</div>
                  <ul className="mt-2 list-disc pl-5 space-y-1">
                    {(p.benefits || []).map((b: string) => <li key={b}>{b}</li>)}
                  </ul>
                </div>
                {p.mediaUrl ? <div className="pt-2 text-sm text-white/60">Media: {p.mediaUrl}</div> : <div className="pt-2 text-sm text-white/50">Audio/video embed can be set in admin.</div>}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Online Programs</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {(m.programs || []).map((p: any) => (
              <Link key={p.title} href={p.href} className="rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-8">
                <div className="text-xl font-semibold">{p.title}</div>
                <div className="mt-2 text-white/70">{p.desc}</div>
                <div className="mt-5 underline text-white/70">{p.cta || "Join Now"}</div>
              </Link>
            ))}
          </div>
        </section>
  <section className="max-w-6xl mx-auto px-6 pb-16">
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
      <div className="text-sm text-white/50">Related Links</div>
      <div className="mt-3 flex flex-wrap gap-3 text-sm">
        <a className="underline text-white/70 hover:text-white" href="/retreats">Upcoming retreats</a>
        <a className="underline text-white/70 hover:text-white" href="/tools/inner-journey">Inner journey quest</a>
        <a className="underline text-white/70 hover:text-white" href="/h/blog">Read wisdom articles</a>
      </div>
    </div>
  </section>
</main>
    </SiteShell>
  )
}
