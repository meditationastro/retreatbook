"use client"
import { useState } from "react"
import SiteShell from "@/components/SiteShell"
import { readSiteContent } from "@/lib/siteContent"
import Link from "next/link"

export default function AstrologyDetail({ params }: { params: { slug: string } }) {
  const sc = readSiteContent()
  const s = (sc.astrology?.services || []).find((x: any) => x.slug === params.slug)
  const [status, setStatus] = useState("")

  if (!s) {
    return (
      <SiteShell>
        <main className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="text-3xl font-bold">Service not found</h1>
          <Link className="underline text-white/70" href="/vedic-astrology">Back</Link>
        </main>
      </SiteShell>
    )
  }

  return (
    <SiteShell>
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-10">
        <header className="space-y-3">
          <div className="text-sm text-white/50">Vedic Astrology Service</div>
          <h1 className="text-4xl font-bold">{s.title}</h1>
          <p className="text-white/70">{s.desc}</p>
          <div className="text-sm text-white/60">{s.duration} • <span className="text-white/80 font-medium">{s.price}</span></div>
        </header>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-4">
            <h2 className="text-2xl font-semibold">What you receive</h2>
            <ul className="list-disc pl-5 text-white/70 space-y-1">
              <li>Detailed chart analysis</li>
              <li>Planetary insights + timing</li>
              <li>Remedies & mantras</li>
              <li>Recording of session</li>
            </ul>
            <h2 className="text-2xl font-semibold pt-4">How to prepare</h2>
            <ul className="list-disc pl-5 text-white/70 space-y-1">
              <li>Birth date</li>
              <li>Exact birth time</li>
              <li>Place of birth</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-4">
            <h2 className="text-2xl font-semibold">Booking form</h2>
            <form className="space-y-3" id="astroForm">
              <div className="grid md:grid-cols-2 gap-3">
                <input name="name" className="rounded-2xl bg-black/40 border border-white/10 px-4 py-3" placeholder="Full Name" required />
                <input name="email" type="email" className="rounded-2xl bg-black/40 border border-white/10 px-4 py-3" placeholder="Email" required />
              </div>
              <div className="grid md:grid-cols-3 gap-3">
                <input name="dob" type="date" className="rounded-2xl bg-black/40 border border-white/10 px-4 py-3" required />
                <input name="tob" type="time" className="rounded-2xl bg-black/40 border border-white/10 px-4 py-3" required />
                <input name="pob" className="rounded-2xl bg-black/40 border border-white/10 px-4 py-3" placeholder="Place of Birth" required />
              </div>
              <input name="phone" className="rounded-2xl bg-black/40 border border-white/10 px-4 py-3" placeholder="Phone / WhatsApp" />
              <textarea name="questions" className="min-h-[120px] rounded-2xl bg-black/40 border border-white/10 px-4 py-3" placeholder="Questions (optional)" />
              <input name="preferred" type="date" className="rounded-2xl bg-black/40 border border-white/10 px-4 py-3" />
              <input type="hidden" name="service" value={s.title} />
            </form>

            <button
              className="bg-white text-black px-6 py-3 rounded-full hover:opacity-90"
              onClick={async () => {
                setStatus("")
                const form = document.getElementById("astroForm") as HTMLFormElement
                const fd = new FormData(form)
                const payload = Object.fromEntries(fd.entries())
                const res = await fetch("/api/astrology-booking", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
                const json = await res.json()
                if (!res.ok) { setStatus(json.error || "Failed"); return }
                setStatus("Submitted ✅ We will contact you soon.")
              }}
            >
              Submit Booking Request
            </button>

            {status && <div className="text-sm text-white/70">{status}</div>}
            <div className="text-xs text-white/50">Requests are emailed to you and can be stored in DB later.</div>
          </div>
        </section>
      </main>
    </SiteShell>
  )
}
