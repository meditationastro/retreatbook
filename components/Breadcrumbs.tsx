import Link from "next/link"

export default function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-white/50">
      <ol className="flex flex-wrap gap-2">
        {items.map((it, idx) => (
          <li key={idx} className="flex items-center gap-2">
            {it.href ? <Link className="hover:text-white" href={it.href}>{it.label}</Link> : <span className="text-white/70">{it.label}</span>}
            {idx < items.length - 1 && <span className="text-white/30">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
