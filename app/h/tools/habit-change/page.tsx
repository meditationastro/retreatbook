import CTASection from "@/components/CTASection"

export const metadata = {
  title: "Habit Change Planner",
  description: "A simple system: cue → routine → reward. Track one habit for 14 days with clarity.",
}

export default function Page() {
  return (
    <main className="bg-[#070707] text-white min-h-screen">
      <section className="max-w-5xl mx-auto px-6 py-16 space-y-8">
        <header className="space-y-3">
          <h1 className="text-4xl font-bold">Habit Change Planner</h1>
          <p className="text-white/70">A simple system: cue → routine → reward. Track one habit for 14 days with clarity.</p>
        </header>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-6">
  <div className="grid md:grid-cols-3 gap-6">
    <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
      <div className="font-semibold">Cue</div>
      <p className="mt-2 text-sm text-white/70">When does it happen? Time, place, emotion.</p>
    </div>
    <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
      <div className="font-semibold">Routine</div>
      <p className="mt-2 text-sm text-white/70">What will you do instead? Make it easy.</p>
    </div>
    <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
      <div className="font-semibold">Reward</div>
      <p className="mt-2 text-sm text-white/70">How will you reinforce it? Small, immediate.</p>
    </div>
  </div>
  <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
    <div className="font-semibold">14-day tracker</div>
    <p className="mt-2 text-sm text-white/70">Print this or track digitally. Consistency > intensity.</p>
  </div>
</div>

      </section>
      <CTASection />
    </main>
  )
}
