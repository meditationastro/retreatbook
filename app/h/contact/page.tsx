"use client"

import { useState } from "react"
import CTASection from "@/components/CTASection"

export const metadata = {
  title: "Contact",
  description: "Contact for retreats, workshops, digital downloads, and collaborations.",
}

export default function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [msg, setMsg] = useState("")

  return (
    <main className="bg-[#070707] text-white min-h-screen">
      <section className="max-w-3xl mx-auto px-6 py-16 space-y-8">
        <h1 className="text-4xl font-bold">Contact</h1>
        <p className="text-white/70">
          Send a message for retreat bookings, workshops, astrology tools, digital downloads, or collaborations.
        </p>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input id="name" className="rounded-2xl bg-black/40 border border-white/10 px-4 py-3" placeholder="Name" />
            <input id="email" type="email" className="rounded-2xl bg-black/40 border border-white/10 px-4 py-3" placeholder="Email" />
          </div>
          <input id="subject" className="rounded-2xl bg-black/40 border border-white/10 px-4 py-3" placeholder="Subject (Retreat / Workshop / Tools / Downloads)" />
          <textarea id="message" className="min-h-[140px] rounded-2xl bg-black/40 border border-white/10 px-4 py-3" placeholder="Message" />

          <button
            className="bg-white text-black px-6 py-3 rounded-full hover:opacity-90"
            onClick={async () => {
              setState("sending"); setMsg("")
              const payload = {
                name: (document.getElementById("name") as HTMLInputElement).value,
                email: (document.getElementById("email") as HTMLInputElement).value,
                subject: (document.getElementById("subject") as HTMLInputElement).value,
                message: (document.getElementById("message") as HTMLTextAreaElement).value,
              }
              const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
              if (!res.ok) { setState("error"); setMsg("Failed to send. Check email settings."); return }
              setState("sent"); setMsg("Sent! We'll reply soon.")
            }}
          >
            {state === "sending" ? "Sending..." : "Send message"}
          </button>

          {msg && <div className="text-sm text-white/70">{msg}</div>}
          <div className="text-xs text-white/50">
            WhatsApp: +977 9823376110 • Email: meditationastro1@gmail.com
          </div>
        </div>
      </section>
      <CTASection />
    </main>
  )
}
