import Link from "next/link"

export default function CTASection({
  title = "Ready to go deeper?",
  subtitle = "Book a Nepal retreat with deposit, explore workshops, or start with a guided self-reflection tool.",
}: {
  title?: string
  subtitle?: string
}) {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-20">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-10">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="mt-3 text-white/70">{subtitle}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/h/retreats" className="bg-white text-black px-6 py-3 rounded-full hover:opacity-90">
            Explore Retreats
          </Link>
          <Link href="/h/workshops" className="border border-white/20 px-6 py-3 rounded-full hover:bg-white/10">
            Workshops
          </Link>
          <Link href="/h/tools/inner-journey" className="border border-white/20 px-6 py-3 rounded-full hover:bg-white/10">
            Inner Journey Tool
          </Link>
          <Link href="/h/contact" className="border border-white/20 px-6 py-3 rounded-full hover:bg-white/10">
            Contact
          </Link>
        </div>
      </div>
    </section>
  )
}
