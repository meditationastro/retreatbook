"use client"

import { useState } from "react"
import SiteShell from "@/components/SiteShell"

export default function InnerJourney() {
  const [plan, setPlan] = useState<any>(null)

  function build(e: any) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const p = Object.fromEntries(fd.entries())
    const daily = [
      `10 minutes: ${p.practice || "Breath awareness"}`,
      `1 journal page: ${p.question || "What do I truly want to become?"}`,
      `1 habit: ${p.habit || "No phone first hour"}`,
      `1 act of service: ${p.service || "Help one person today"}`,
    ]
    setPlan({ ...p, daily })
  }

  return (
    <SiteShell>
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-10">
        <h1 className="text-4xl font-bold">Inner Spiritual Journey Quest</h1>
        <p className="text-white/70">A guided 30-day plan built from your answers. Print it and follow daily.</p>

        <form onSubmit={build} className="rounded-3xl border border-white/10 bg-white/5 p-8 grid md:grid-cols-2 gap-4">
          <input name="goal" className="rounded-2xl bg-black/40 border border-white/10 px-4 py-3" placeholder="Main intention (calm mind, clarity, discipline)" required />
          <input name="obstacle" className="rounded-2xl bg-black/40 border border-white/10 px-4 py-3" placeholder="Biggest obstacle (distraction, anxiety)" required />
          <input name="practice" className="rounded-2xl bg-black/40 border border-white/10 px-4 py-3" placeholder="Preferred practice (breath, mantra, silence)" />
          <input name="habit" className="rounded-2xl bg-black/40 border border-white/10 px-4 py-3" placeholder="One habit to change" />
          <input name="service" className="rounded-2xl bg-black/40 border border-white/10 px-4 py-3" placeholder="One act of service daily" />
          <input name="support" className="rounded-2xl bg-black/40 border border-white/10 px-4 py-3" placeholder="Support system (friend, mentor, group)" />
          <textarea name="question" className="md:col-span-2 min-h-[110px] rounded-2xl bg-black/40 border border-white/10 px-4 py-3" placeholder="One deep question you want answered" />
          <button className="md:col-span-2 bg-white text-black px-6 py-3 rounded-full hover:opacity-90">Create Plan</button>
        </form>

        {plan && (
          <section className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-6">
            <div className="text-2xl font-semibold">Your 30-day plan</div>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-white/70">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <div className="text-white/80 font-medium">Intention</div>
                <div className="mt-2">{plan.goal}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <div className="text-white/80 font-medium">Obstacle to master</div>
                <div className="mt-2">{plan.obstacle}</div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <div className="text-white/80 font-medium">Daily protocol</div>
              <ul className="mt-2 list-disc pl-5 text-white/70 space-y-1">
                {plan.daily.map((x: string) => <li key={x}>{x}</li>)}
              </ul>
            </div>

            <button className="border border-white/20 px-6 py-3 rounded-full hover:bg-white/10" onClick={() => window.print()}>
              Print
            </button>
          </section>
        )}
      </main>
    </SiteShell>
  )
}
