    import Link from "next/link"

    export const metadata = {
      title: "Journaling Prompts",
      description: "Prompts designed to surface patterns and guide decisions.",
    }

    export default function Page() {
      return (
        <main className="bg-[#070707] text-white min-h-screen">
          <section className="max-w-5xl mx-auto px-6 py-16 space-y-6">
            <h1 className="text-4xl font-bold">Journaling Prompts</h1>
            <p className="text-white/70 text-lg">Prompts designed to surface patterns and guide decisions.</p>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <div className="text-sm font-semibold">How to use this</div>
              <p className="mt-3 text-white/70 text-sm">
                Choose one framework, apply it for 20 minutes, then take one small action. Repeat daily for a week.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <div className="text-xl font-semibold">Internal links (topic cluster)</div>
              <ul className="mt-4 space-y-2 text-white/70 text-sm">
                <li>• <Link className='underline' href='/h/guides-tools/self-reflection-guides'>Self-reflection guides</Link></li>
<li>• <Link className='underline' href='/h/guides-tools/decision-making-tools'>Decision tools</Link></li>
<li>• <Link className='underline' href='/h/answers/life-questions'>Life questions</Link></li>
<li>• <Link className='underline' href='/h/retreats'>Retreats</Link></li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <div className="text-xl font-semibold">Go deeper</div>
              <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
                <Link className="underline" href="/h/landings">Retreat Guides</Link>
                <Link className="underline" href="/h/blog">Blog</Link>
                <Link className="underline" href="/h/resources">Resources</Link>
                <Link className="underline" href="/h/workshops">Workshops</Link>
              </div>
            </div>
          </section>
        </main>
      )
    }
