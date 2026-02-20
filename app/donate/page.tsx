import SiteShell from "@/components/SiteShell"
import Link from "next/link"
export default function Donate() {
  return (
    <SiteShell>
      <main className="max-w-3xl mx-auto px-6 py-16 space-y-8">
        <h1 className="text-4xl font-bold">Donate</h1>
        <p className="text-white/70">Donations support scholarships and community outreach. Stripe donation checkout can be enabled.</p>
        <Link href="/contact" className="underline text-white/70 hover:text-white">Contact to enable donations</Link>
      </main>
    </SiteShell>
  )
}
