import CTASection from "@/components/CTASection"

export const metadata = {
  title: "Vedic Astrology: Birth Chart (Starter)",
  description: "Generate an educational Vedic-style snapshot (sidereal sun sign + life matrix). For exact charts, ephemeris integration can be added.",
}

export default function Page() {
  return (
    <main className="bg-[#070707] text-white min-h-screen">
      <section className="max-w-5xl mx-auto px-6 py-16 space-y-8">
        <header className="space-y-3">
          <h1 className="text-4xl font-bold">Vedic Astrology: Birth Chart (Starter)</h1>
          <p className="text-white/70">Generate an educational Vedic-style snapshot (sidereal sun sign + life matrix). For exact charts, ephemeris integration can be added.</p>
        </header>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-6">
  <form action="#" className="grid md:grid-cols-2 gap-5" id="birthForm">
    <div className="space-y-2">
      <label className="text-sm text-white/70">Name</label>
      <input name="name" className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3" placeholder="Your name" />
    </div>
    <div className="space-y-2">
      <label className="text-sm text-white/70">Birth date</label>
      <input name="date" type="date" className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3" required />
    </div>
    <div className="space-y-2">
      <label className="text-sm text-white/70">Birth time (optional)</label>
      <input name="time" type="time" className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3" />
    </div>
    <div className="space-y-2">
      <label className="text-sm text-white/70">Birth place (optional)</label>
      <input name="place" className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3" placeholder="Kathmandu, Nepal" />
    </div>
  </form>

  <button
    className="bg-white text-black px-6 py-3 rounded-full hover:opacity-90"
    onClick={async () => {
      const form = document.getElementById("birthForm") as HTMLFormElement
      const fd = new FormData(form)
      const payload: any = Object.fromEntries(fd.entries())
      const res = await fetch("/api/tools/birth-chart", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      const json = await res.json()
      const el = document.getElementById("out")
      if (el) el.textContent = JSON.stringify(json, null, 2)
    }}
  >
    Generate
  </button>

  <pre id="out" className="whitespace-pre-wrap text-xs text-white/70 bg-black/40 border border-white/10 rounded-2xl p-5 overflow-x-auto">
    {"{ }"}
  </pre>

  <div className="text-xs text-white/50">
    Note: This is a starter educational generator. For professional-grade Vedic charts, we can integrate ephemeris tables.
  </div>
</div>

      </section>
      <CTASection />
    </main>
  )
}
