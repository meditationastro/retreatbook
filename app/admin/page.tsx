import Link from "next/link"

export const metadata = { title: "Admin Dashboard" }

export default function AdminHome() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-white/60 text-sm">Manage content and operational items.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Link href="/admin/bookings" className="rounded-2xl border border-white/10 bg-black/30 p-5 hover:bg-white/10 transition">
          <div className="font-semibold">Bookings</div>
          <div className="text-sm text-white/60 mt-1">View retreat bookings and contact details.</div>
        </Link>
        <Link href="/admin/gallery" className="rounded-2xl border border-white/10 bg-black/30 p-5 hover:bg-white/10 transition">
          <div className="font-semibold">Gallery</div>
          <div className="text-sm text-white/60 mt-1">Add/edit gallery items (JSON store).</div>
        </Link>
        <Link href="/admin/downloads" className="rounded-2xl border border-white/10 bg-black/30 p-5 hover:bg-white/10 transition">
          <div className="font-semibold">Downloads</div>
          <div className="text-sm text-white/60 mt-1">See files in public/downloads.</div>
        </Link>
        <Link href="/admin/music" className="rounded-2xl border border-white/10 bg-black/30 p-5 hover:bg-white/10 transition">
          <div className="font-semibold">Music</div>
          <div className="text-sm text-white/60 mt-1">See files in public/music.</div>
        </Link>
      </div>
    </div>
  )
}
