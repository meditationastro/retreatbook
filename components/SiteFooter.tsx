import Link from "next/link"

const cols = [
  {
    title: "Explore",
    links: [
      { label: "Retreats", href: "/h/retreats" },
      { label: "Workshops", href: "/h/workshops" },
      { label: "Answers", href: "/h/answers" },
      { label: "Guides & Tools", href: "/h/guides-tools" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Blog", href: "/h/blog" },
      { label: "Resources", href: "/h/resources" },
      { label: "Community", href: "/h/community" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Philosophy", href: "/h/about/philosophy" },
      { label: "Why AnswerForSelf", href: "/h/about/why-answerforself" },
      { label: "Contact", href: "/h/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/h/legal/privacy-policy" },
      { label: "Terms of Use", href: "/h/legal/terms-of-use" },
    ],
  },
]

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#070707] text-white">
      <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-5 gap-10">
        <div className="md:col-span-2 space-y-3">
          <div className="text-lg font-semibold">Clue UX</div>
          <p className="text-white/60 text-sm">
            Luxury Himalayan retreats + self-reflection answers and tools.
          </p>
          <div className="text-white/40 text-xs">
            © {new Date().getFullYear()} Clue UX. All rights reserved.
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title} className="space-y-3">
            <div className="text-sm font-semibold">{c.title}</div>
            <div className="space-y-2">
              {c.links.map((l) => (
                <Link key={l.href} href={l.href} className="block text-sm text-white/60 hover:text-white">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </footer>
  )
}
