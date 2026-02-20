import CTASection from "@/components/CTASection"

export const metadata = {
  title: "Life Matrix Mapping",
  description: "Map your energy, focus, and practice using a simple life-matrix framework (educational).",
}

export default function Page() {
  return (
    <main className="bg-[#070707] text-white min-h-screen">
      <section className="max-w-5xl mx-auto px-6 py-16 space-y-8">
        <header className="space-y-3">
          <h1 className="text-4xl font-bold">Life Matrix Mapping</h1>
          <p className="text-white/70">Map your energy, focus, and practice using a simple life-matrix framework (educational).</p>
        </header>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-6">
  <p className="text-white/70">
    Use the Vedic Birth Chart tool to generate your matrix automatically, or use this page to journal manually.
  </p>
  <div className="grid md:grid-cols-2 gap-6">
    <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
      <div className="font-semibold">Focus</div>
      <p className="mt-2 text-sm text-white/70">What matters most this season? What is your highest leverage change?</p>
    </div>
    <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
      <div className="font-semibold">Practice</div>
      <p className="mt-2 text-sm text-white/70">Which daily habit creates stability? Choose one practice for 14 days.</p>
    </div>
  </div>
</div>

      </section>
      <CTASection />
    </main>
  )
}
