"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import TurndownService from "turndown"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

export default function RichEditor({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug)
  const [front, setFront] = useState<any>(null)
  const [msg, setMsg] = useState("")

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Loading...</p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none focus:outline-none min-h-[420px] p-4 rounded-2xl bg-black/40 border border-white/10",
      },
    },
  })

  useEffect(() => {
    ;(async () => {
      const res = await fetch(`/api/admin/blog/${encodeURIComponent(slug)}`)
      const json = await res.json()
      setFront(json.frontmatter || {})
      // naive: treat existing MDX as markdown and show as preformatted paragraphs
      const initial = (json.content || "").split("\n\n").map((p: string) => `<p>${p.replace(/</g,"&lt;")}</p>`).join("")
      editor?.commands.setContent(initial || "<p></p>")
    })()
  }, [slug, editor])

  if (!front || !editor) return <div className="text-white/70">Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Rich Editor: {front.title || slug}</h1>
          <p className="text-white/60 text-sm">WYSIWYG editing → converts to Markdown/MDX on save.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link className="border border-white/20 px-4 py-2 rounded-full hover:bg-white/10 text-sm" href={`/admin/blog/${encodeURIComponent(slug)}`}>
            Back to MDX
          </Link>
          <a className="border border-white/20 px-4 py-2 rounded-full hover:bg-white/10 text-sm" href={`/h/blog/${encodeURIComponent(slug)}`}>
            Preview
          </a>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 flex flex-wrap gap-2">
        <button className="border border-white/20 px-3 py-2 rounded-xl text-sm hover:bg-white/10" onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
        <button className="border border-white/20 px-3 py-2 rounded-xl text-sm hover:bg-white/10" onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
        <button className="border border-white/20 px-3 py-2 rounded-xl text-sm hover:bg-white/10" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
        <button className="border border-white/20 px-3 py-2 rounded-xl text-sm hover:bg-white/10" onClick={() => editor.chain().focus().toggleBulletList().run()}>Bullets</button>
        <button className="border border-white/20 px-3 py-2 rounded-xl text-sm hover:bg-white/10" onClick={() => editor.chain().focus().toggleOrderedList().run()}>Numbered</button>
      </div>

      <EditorContent editor={editor} />

      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-xs text-white/60">
        Tip: Upload images in <Link className="underline" href="/admin/uploads">Admin → Uploads</Link> and paste the URL into your MDX after saving.
      </div>

      <button
        className="bg-white text-black px-6 py-3 rounded-full hover:opacity-90"
        onClick={async () => {
          setMsg("")
          const td = new TurndownService({ headingStyle: "atx" })
          const html = editor.getHTML()
          const md = td.turndown(html)
          const res = await fetch(`/api/admin/blog/${encodeURIComponent(slug)}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ frontmatter: front, content: md }),
          })
          const json = await res.json()
          if (!res.ok) { setMsg(json.error || "Failed"); return }
          setMsg("Saved ✅")
        }}
      >
        Save to MDX
      </button>
      {msg && <div className="text-sm text-white/70">{msg}</div>}
    </div>
  )
}
