import CTASection from "@/components/CTASection"

export const metadata = {
  title: "Inner Spiritual Journey Quest",
  description: "A guided quest tool to map your inner journey: intention, obstacles, allies, and next step.",
}

export default function Page() {
  return (
    <main className="bg-[#070707] text-white min-h-screen">
      <section className="max-w-5xl mx-auto px-6 py-16 space-y-8">
        <header className="space-y-3">
          <h1 className="text-4xl font-bold">Inner Spiritual Journey Quest</h1>
          <p className="text-white/70">A guided quest tool to map your inner journey: intention, obstacles, allies, and next step.</p>
        </header>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-6">
  <div className="grid md:grid-cols-2 gap-6">
    <div className="space-y-2">
      <div className="text-sm text-white/70">1) Intention</div>
      <textarea className="w-full min-h-[120px] rounded-2xl bg-black/40 border border-white/10 px-4 py-3" placeholder="What change do you want most?" />
    </div>
    <div className="space-y-2">
      <div className="text-sm text-white/70">2) Obstacles</div>
      <textarea className="w-full min-h-[120px] rounded-2xl bg-black/40 border border-white/10 px-4 py-3" placeholder="What keeps repeating?" />
    </div>
    <div className="space-y-2">
      <div className="text-sm text-white/70">3) Allies</div>
      <textarea className="w-full min-h-[120px] rounded-2xl bg-black/40 border border-white/10 px-4 py-3" placeholder="People, practices, environments that help." />
    </div>
    <div className="space-y-2">
      <div className="text-sm text-white/70">4) Next Step</div>
      <textarea className="w-full min-h-[120px] rounded-2xl bg-black/40 border border-white/10 px-4 py-3" placeholder="One action within 24 hours." />
    </div>
  </div>
  <div className="rounded-2xl border border-white/10 bg-black/30 p-6 text-sm text-white/70">
    Tip: For deeper breakthroughs, join a retreat (space + guidance + integration).
  </div>
</div>

      </section>
      <CTASection />
    </main>
  )
}
