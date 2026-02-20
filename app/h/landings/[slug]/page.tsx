import Link from "next/link"
import { notFound } from "next/navigation"
import BreadcrumbSchema from "@/components/BreadcrumbSchema"
import { getAllLandings, getLandingBySlug } from "@/lib/landings"

export const dynamic = "force-static"
export const revalidate = 86400

export function generateStaticParams() {
  return getAllLandings().map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const page = getLandingBySlug(params.slug)
  if (!page) return {}
  return {
    title: page.frontmatter.title,
    description: page.frontmatter.description,
    alternates: {
      canonical: page.frontmatter.canonical ? page.frontmatter.canonical : `/h/landings/${page.slug}`,
    },
    openGraph: {
      title: page.frontmatter.title,
      description: page.frontmatter.description,
      type: "article",
    },
  }
}

export default function LandingPage({ params }: { params: { slug: string } }) {
  const page = getLandingBySlug(params.slug)
  if (!page) return notFound()

  const base = process.env.NEXT_PUBLIC_URL || "https://clueux.com"
  const url = `${base}/h/landings/${page.slug}`

  const faq = page.frontmatter.faq || []
  const faqJsonLd =
    faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((x) => ({
            "@type": "Question",
            name: x.q,
            acceptedAnswer: { "@type": "Answer", text: x.a },
          })),
        }
      : null

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.frontmatter.title,
    description: page.frontmatter.description,
    mainEntityOfPage: url,
  }

  const related = (page.frontmatter.related || []).slice(0, 6)

  return (
    <main className="bg-[#070707] text-white min-h-screen">
      <section className="max-w-4xl mx-auto px-6 py-14 space-y-6">
        <BreadcrumbSchema
          items={[
            { name: "Home", url: base + "/h" },
            { name: "Guides", url: base + "/h/landings" },
            { name: page.frontmatter.title, url },
          ]}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
        {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}

        <Link href="/h/landings" className="text-sm text-white/60 hover:text-white/80">
          ← All guides
        </Link>

        <header className="space-y-3">
          <div className="text-xs text-white/50">
            {page.frontmatter.intent.toUpperCase()} • Keyword: {page.frontmatter.primaryKeyword}
          </div>
          <h1 className="text-4xl font-bold">{page.frontmatter.title}</h1>
          <p className="text-white/70">{page.frontmatter.description}</p>
        </header>

        <article
          className="prose prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:text-white underline"
          dangerouslySetInnerHTML={{ __html: page.contentHtml }}
        />

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold">Recommended internal links</div>
          <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
            <Link className="underline" href="/h/retreats">
              Explore Retreats
            </Link>
            <Link className="underline" href="/h/workshops">
              Workshops
            </Link>
            <Link className="underline" href="/h/answers">
              Answers Hub
            </Link>
            <Link className="underline" href="/h/guides-tools">
              Guides & Tools
            </Link>
          </div>
        </div>

        {related.length > 0 && (
          <div className="pt-4">
            <div className="text-sm font-semibold">Related pages</div>
            <div className="mt-4 grid gap-3">
              {related.map((s) => (
                <Link
                  key={s}
                  href={`/h/landings/${s}`}
                  className="block rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-5"
                >
                  /h/landings/{s}
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
