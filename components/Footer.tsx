import Link from "next/link"
import { readSiteContent } from "@/lib/siteContent"

export default function Footer() {
  const sc = readSiteContent()
  const f = sc.footer || {}
  return (
    <footer className="border-t border-white/10 bg-[#070707] text-white">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
        <div className="space-y-3">
          <div className="font-semibold text-lg">Clue UX</div>
          <p className="text-sm text-white/60">Meditation retreats in Nepal, immersive programs, and authentic Vedic astrology guidance.</p>
          <div className="text-xs text-white/50">
            {f.location || "Nepal"}<br />
            {f.email || "meditationastro1@gmail.com"}<br />
            WhatsApp: {f.whatsapp || "+977 9823376110"}
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold">Quick Links</div>
          <div className="grid gap-2 text-sm text-white/70">
            <Link className="hover:text-white" href="/retreats">Retreats</Link>
            <Link className="hover:text-white" href="/vedic-astrology">Astrology Services</Link>
            <Link className="hover:text-white" href="/programs">Programs</Link>
            <Link className="hover:text-white" href="/h/blog">Blog</Link>
            <Link className="hover:text-white" href="/h/downloads">Free Guides</Link>
            <Link className="hover:text-white" href="/h/music">Mantras / Music</Link>
            <Link className="hover:text-white" href="/gallery">Gallery</Link>
            <Link className="hover:text-white" href="/tools">Tools</Link>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold">Upcoming Retreat Dates</div>
          <div className="text-sm text-white/60">
            Visit <Link href="/retreats" className="underline">Retreats</Link> for latest schedules and deposits from Feb 2026 onwards.
          </div>
          <div className="mt-3 text-sm font-semibold">Newsletter</div>
          <div className="text-sm text-white/60">{f.newsletterSubtitle || "Receive weekly wisdom."}</div>
          <form className="mt-3 flex gap-2">
            <input className="flex-1 rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-sm" placeholder="Email address" />
            <button className="bg-white text-black px-4 py-2 rounded-xl text-sm">Join</button>
          </form>
          <div className="text-xs text-white/40">Newsletter form can be connected to Mailchimp/ConvertKit later.</div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold">Legal</div>
          <div className="grid gap-2 text-sm text-white/70">
            <Link className="hover:text-white" href="/h/legal/privacy">Privacy Policy</Link>
            <Link className="hover:text-white" href="/h/legal/terms">Terms of Use</Link>
          </div>
          <div className="pt-4 text-sm font-semibold">Social</div>
          <div className="grid gap-2 text-sm text-white/70">
            <a className="hover:text-white" href="#" aria-label="Instagram">Instagram</a>
            <a className="hover:text-white" href="#" aria-label="YouTube">YouTube</a>
            <a className="hover:text-white" href="#" aria-label="Facebook">Facebook</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Clue UX. All rights reserved.
      </div>
    </footer>
  )
}
