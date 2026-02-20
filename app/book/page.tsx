import SiteShell from "@/components/SiteShell"
import Link from "next/link"
export const metadata = { title: "Book Now" }
export default function Book() {
  return (
    <SiteShell>
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-10">
        <h1 className="text-4xl font-bold">Book Now</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/retreats" className="rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-8">
            <div className="text-xl font-semibold">Book a Retreat</div>
            <p className="mt-2 text-white/70">Choose retreat dates on a calendar grid and pay deposit.</p>
            <div className="mt-4 underline text-white/70">Explore retreats</div>
          </Link>
          <Link href="/vedic-astrology" className="rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-8">
            <div className="text-xl font-semibold">Book Astrology Reading</div>
            <p className="mt-2 text-white/70">Select a Jyotish service and submit birth details.</p>
            <div className="mt-4 underline text-white/70">View services</div>
          </Link>
        </div>
      </main>
    </SiteShell>
  )
}
