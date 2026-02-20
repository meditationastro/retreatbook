import Link from "next/link"

export const metadata = {
  title: "Guides & Tools",
  description: "Frameworks for clarity: self-reflection, journaling prompts, and decision-making tools.",
}

export default function GuidesTools() {
  return (
    <main className="bg-[#070707] text-white min-h-screen">
      <section className="max-w-5xl mx-auto px-6 py-16 space-y-6">
        <h1 className="text-4xl font-bold">Guides & Tools</h1>
        <p className="text-white/70 text-lg">
          Use structured frameworks to reflect, decide, and move forward — then deepen your practice in a Nepal retreat.
        </p>

        <div className="grid md:grid-cols-3 gap-6 pt-6">
          <Link href="/h/guides-tools/self-reflection-guides" className="rounded-3xl border border-white/10 p-7 bg-white/5 hover:bg-white/10 transition">
            <div className="text-xl font-semibold">Self-Reflection Guides</div>
            <p className="mt-2 text-white/70">Step-by-step frameworks for clarity and change.</p>
          </Link>
          <Link href="/h/guides-tools/journaling-prompts" className="rounded-3xl border border-white/10 p-7 bg-white/5 hover:bg-white/10 transition">
            <div className="text-xl font-semibold">Journaling Prompts</div>
            <p className="mt-2 text-white/70">Prompts designed to reveal patterns and next steps.</p>
          </Link>
          <Link href="/h/guides-tools/decision-making-tools" className="rounded-3xl border border-white/10 p-7 bg-white/5 hover:bg-white/10 transition">
            <div className="text-xl font-semibold">Decision-Making Tools</div>
            <p className="mt-2 text-white/70">Simple models for difficult choices.</p>
          </Link>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-7 mt-10">
          <div className="text-sm font-semibold">Internal links</div>
          <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
            <Link className="underline" href="/h/answers">Answers Hub</Link>
            <Link className="underline" href="/h/retreats">Explore Retreats (Deposit)</Link>
            <Link className="underline" href="/h/blog">Read Blog Articles</Link>
            <Link className="underline" href="/h/resources">Resources</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
