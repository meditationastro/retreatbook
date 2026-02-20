import Link from "next/link"

const nav = [
  { label: "Dashboard", href: "/admin" },
  { label: "Blog", href: "/admin/blog" },
  { label: "CMS", href: "/admin/cms" },
  { label: "Bookings", href: "/admin/bookings" },
  { label: "Retreats", href: "/admin/retreats" },
  { label: "Gallery", href: "/admin/gallery" },
  { label: "Downloads", href: "/admin/downloads" },
  { label: "Music", href: "/admin/music" },
  { label: "Uploads", href: "/admin/uploads" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#070707] text-white">
      <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-[240px_1fr] gap-8">
        <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 h-fit sticky top-6">
          <div className="text-lg font-semibold">Admin</div>
          <div className="mt-4 space-y-2">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="block rounded-2xl px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5">
                {n.label}
              </Link>
            ))}
          </div>
          <div className="mt-6 text-xs text-white/40">
            Protected by <code className="text-white/60">ADMIN_PASSWORD</code> cookie.
          </div>
        </aside>
        <main className="rounded-3xl border border-white/10 bg-white/5 p-6">{children}</main>
      </div>
    </div>
  )
}
