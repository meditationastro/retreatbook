"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { NAV_ITEMS } from "@/constants/navigation"

export default function Header() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-50 bg-[#070707]/80 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="font-semibold tracking-wide text-white">
          Clue UX
          <span className="ml-2 text-xs text-white/50">Retreats • Meditation • Jyotish</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-2">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href
            const cls = item.highlighted
              ? "bg-white text-black px-4 py-2 rounded-full hover:opacity-90"
              : "px-3 py-2 rounded-full text-sm text-white/70 hover:text-white hover:bg-white/5"
            return (
              <Link key={item.href} href={item.href} className={cls + (active && !item.highlighted ? " bg-white/10 text-white" : "")}>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/search" className="text-sm px-3 py-2 rounded-full border border-white/15 text-white/70 hover:bg-white/5">Search</Link>
          <Link href="/member" className="text-sm px-3 py-2 rounded-full border border-white/15 text-white/70 hover:bg-white/5">Login</Link>
          <button className="hidden sm:inline-flex text-sm px-3 py-2 rounded-full border border-white/15 text-white/70 hover:bg-white/5" title="Language (optional)">EN</button>
          <Link href="/donate" className="hidden sm:inline-flex text-sm px-3 py-2 rounded-full border border-white/15 text-white/70 hover:bg-white/5">Donate</Link>
        </div>
      </div>
    </header>
  )
}
