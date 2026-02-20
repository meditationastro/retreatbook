    import Link from "next/link"

    export const metadata = {
      title: "Answers Hub",
      description: "Structured answers for life questions, mental health, relationships, career direction, and spiritual growth.",
    }

    export default function PillarPage() {
      return (
        <main className="bg-[#070707] text-white min-h-screen">
          <section className="max-w-5xl mx-auto px-6 py-16">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold tracking-tight">Answers Hub</h1>
              <p className="text-lg text-white/70">Structured answers for life questions, mental health, relationships, career direction, and spiritual growth.</p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/h/retreats" className="bg-white text-black px-5 py-3 rounded-full hover:opacity-90">Explore Retreats</Link>
                <Link href="/h/landings" className="border border-white/20 px-5 py-3 rounded-full hover:bg-white/10">Retreat Guides</Link>
                <Link href="/h/blog" className="border border-white/20 px-5 py-3 rounded-full hover:bg-white/10">Read Articles</Link>
              </div>
            </div>

            <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">
              <div className="text-sm font-semibold text-white/80">How to use this hub</div>
              <p className="mt-3 text-white/70">
                This pillar page links to deeper topic pages. Start here, then go deeper into the cluster pages below.
                Each page links back here to strengthen topical authority and internal link flow.
              </p>
            </div>

            <div className="prose prose-invert max-w-none prose-a:text-white underline mt-10">
              <h2 className="text-2xl font-semibold mt-10">What this hub is</h2>
<p className="text-white/70 mt-3">Clue UX Answers is a clarity-first library for life questions — designed to be actionable without being preachy. Each answer follows a structure: clarify the real problem, reduce noise, define values, choose the next step.</p>
<h2 className="text-2xl font-semibold mt-10">How to navigate</h2>
<p className="text-white/70 mt-3">Start with the category that matches your situation. Read 2–3 related pages, then use one tool (journaling or decision framework). If you’re feeling overwhelmed, begin with the smallest next action.</p>
<h2 className="text-2xl font-semibold mt-10">When to seek external help</h2>
<p className="text-white/70 mt-3">Some issues require professional support. If you are in crisis or feel unsafe, use external help links and contact a qualified professional.</p>
            </div>

            <div className="mt-12 grid md:grid-cols-2 gap-6">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <div className="text-xl font-semibold">Topic cluster pages</div>
                <ul className="mt-4 space-y-2 text-white/70 text-sm">
                  <li>• <Link className="underline" href="/h/answers/life-questions">Life Questions</Link></li>
<li>• <Link className="underline" href="/h/answers/mental-health">Mental Health</Link></li>
<li>• <Link className="underline" href="/h/answers/relationships">Relationships</Link></li>
<li>• <Link className="underline" href="/h/answers/career-purpose">Career & Purpose</Link></li>
<li>• <Link className="underline" href="/h/answers/spiritual-growth">Spiritual Growth</Link></li>
<li>• <Link className="underline" href="/h/guides-tools/decision-making-tools">Decision-Making Tools</Link></li>
<li>• <Link className="underline" href="/h/guides-tools/journaling-prompts">Journaling Prompts</Link></li>
                </ul>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <div className="text-xl font-semibold">Conversion path</div>
                <p className="mt-3 text-white/70 text-sm">
                  If you want deeper change, pair these frameworks with a guided environment.
                </p>
                <div className="mt-5 grid gap-3 text-sm">
                  <Link className="underline" href="/h/retreats">Book a Nepal retreat (deposit)</Link>
                  <Link className="underline" href="/h/workshops">See workshop curriculum</Link>
                  <Link className="underline" href="/h/guides-tools/self-reflection-guides">Start with self-reflection guides</Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      )
    }
