import Link from "next/link"

export const metadata = {
  title: "Meditation Retreats in Nepal",
  description: "Luxury Himalayan meditation retreats with workshops, calendar booking, and deposit payments.",
}

export default function RetreatsPillar() {
  return (
    <main className="bg-[#070707] text-white min-h-screen">
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold tracking-tight">Meditation Retreats in Nepal</h1>
        <p className="mt-4 text-lg text-white/70">
          Our retreats combine guided meditation, healing workshops, and nature immersion — designed for real change.
        </p>

        <div className="flex flex-wrap gap-3 pt-6">
          <Link href="/h/retreats" className="bg-white text-black px-5 py-3 rounded-full hover:opacity-90">Explore Retreats</Link>
          <Link href="/h/landings" className="border border-white/20 px-5 py-3 rounded-full hover:bg-white/10">Retreat Guides</Link>
          <Link href="/h/workshops" className="border border-white/20 px-5 py-3 rounded-full hover:bg-white/10">Workshop Curriculum</Link>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold">How booking works</h2>
          <p className="mt-3 text-white/70">
            Choose a retreat, select your start date on the calendar, then reserve with a deposit or pay in full.
            You’ll receive a detailed itinerary and preparation guidance by email.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold">Retreat types (topic clusters)</h2>
          <ul className="mt-4 space-y-2 text-white/70 text-sm">
            <li>• <Link className="underline" href="/h/landings/meditation-retreat-nepal">Meditation Retreat Nepal</Link></li>
            <li>• <Link className="underline" href="/h/landings/luxury-meditation-retreat-nepal">Luxury Meditation Retreat Nepal</Link></li>
            <li>• <Link className="underline" href="/h/landings/silent-retreat-nepal">Silent Retreat Nepal</Link></li>
            <li>• <Link className="underline" href="/h/landings/wellness-retreat-nepal-himalayas">Wellness Retreat Nepal Himalayas</Link></li>
          </ul>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold">Prepare for your retreat</h2>
          <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
            <Link className="underline" href="/h/guides-tools/self-reflection-guides">Self-Reflection Guides</Link>
            <Link className="underline" href="/h/guides-tools/journaling-prompts">Journaling Prompts</Link>
            <Link className="underline" href="/h/answers/mental-health">Mental health + integration</Link>
            <Link className="underline" href="/h/contact">Contact</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
