import Link from "next/link"
import { NAV_ITEMS } from "@/constants/navigation"

function NavItem({ item }: { item: any }) {
  if (item.children?.length) {
    return (
      <div className="relative group">
        <span className="text-sm text-white/80 hover:text-white cursor-default">{item.label}</span>
        <div className="absolute left-0 top-full mt-3 hidden group-hover:block z-50">
          <div className="min-w-[240px] rounded-2xl border border-white/10 bg-[#0b0b0b] shadow-2xl p-3">
            {item.children.map((c: any) => (
              <Link
                key={c.href}
                href={c.href}
                className="block rounded-xl px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }
  return (
    <Link href={item.href} className="text-sm text-white/80 hover:text-white">
      {item.label}
    </Link>
  )
}

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-[#070707]/80 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <Link href="/h" className="font-semibold tracking-tight text-white">
          Clue UX
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.filter((x) => x.label !== "Home").map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/h/retreats"
            className="text-sm bg-white text-black px-4 py-2 rounded-full hover:opacity-90"
          >
            Book a Retreat
          </Link>
        </div>
      </div>
    </header>
  )
}
