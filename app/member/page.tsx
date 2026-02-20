"use client"
import SiteShell from "@/components/SiteShell"

export default function Member() {
  return (
    <SiteShell>
      <main className="max-w-3xl mx-auto px-6 py-16 space-y-8">
        <h1 className="text-4xl font-bold">Member Portal</h1>
        <p className="text-white/70">Member accounts can unlock program lessons, downloads, and booking history.</p>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-3">
          <div className="text-sm text-white/60">Next upgrades (optional)</div>
          <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
            <li>Supabase Auth / Magic Link</li>
            <li>Member dashboard with purchases + bookings</li>
            <li>Private program lessons + digital downloads</li>
          </ul>
          <div className="pt-2">
    <a href="/member/dashboard" className="inline-flex bg-white text-black px-6 py-3 rounded-full hover:opacity-90">Open Dashboard</a>
  </div>
</main>
    </SiteShell>
  )
}
