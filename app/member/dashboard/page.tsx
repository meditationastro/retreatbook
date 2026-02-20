"use client"

import SiteShell from "@/components/SiteShell"
import { useEffect, useState } from "react"

export default function MemberDashboard() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    setUser({ name: "Member", plan: "Free" })
  }, [])

  return (
    <SiteShell>
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-10">
        <h1 className="text-4xl font-bold">Member Dashboard</h1>
        <p className="text-white/70">Programs, downloads, and booking history will appear here.</p>

        <div className="grid md:grid-cols-3 gap-6">
          <Card title="Your Programs" desc="Access course lessons and practice calendars." />
          <Card title="Your Downloads" desc="Free guides + purchased digital products." />
          <Card title="Your Bookings" desc="Retreat bookings + astrology sessions." />
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-3">
          <div className="text-sm text-white/50">Optional upgrade</div>
          <div className="text-xl font-semibold">Enable real login (Supabase)</div>
          <p className="text-white/70 text-sm">
            Add env vars <span className="text-white/80">NEXT_PUBLIC_SUPABASE_URL</span> and <span className="text-white/80">NEXT_PUBLIC_SUPABASE_ANON_KEY</span>.
            Then we can activate magic-link login + protected routes.
          </p>
        </div>
      </main>
    </SiteShell>
  )
}

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-2">
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-white/70">{desc}</div>
    </div>
  )
}
