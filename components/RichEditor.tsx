"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import Image from "@tiptap/extension-image"

type Props = {
  value: string
  onChange: (val: string) => void
  placeholder?: string
}

export default function RichEditor({ value, onChange, placeholder }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({ placeholder: placeholder || "Write..." }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "min-h-[220px] rounded-2xl bg-black/40 border border-white/10 px-4 py-3 text-white/90 outline-none prose prose-invert max-w-none",
      },
    },
  })

  function toggle(fn: () => void) {
    if (!editor) return
    fn()
    editor.chain().focus().run()
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button type="button" className="px-3 py-2 rounded-xl border border-white/15 text-sm text-white/70 hover:bg-white/5"
          onClick={() => toggle(() => editor!.chain().focus().toggleBold().run())}>
          Bold
        </button>
        <button type="button" className="px-3 py-2 rounded-xl border border-white/15 text-sm text-white/70 hover:bg-white/5"
          onClick={() => toggle(() => editor!.chain().focus().toggleItalic().run())}>
          Italic
        </button>
        <button type="button" className="px-3 py-2 rounded-xl border border-white/15 text-sm text-white/70 hover:bg-white/5"
          onClick={() => toggle(() => editor!.chain().focus().toggleHeading({ level: 2 }).run())}>
          H2
        </button>
        <button type="button" className="px-3 py-2 rounded-xl border border-white/15 text-sm text-white/70 hover:bg-white/5"
          onClick={() => toggle(() => editor!.chain().focus().toggleBulletList().run())}>
          Bullets
        </button>
        <button type="button" className="px-3 py-2 rounded-xl border border-white/15 text-sm text-white/70 hover:bg-white/5"
          onClick={() => toggle(() => editor!.chain().focus().toggleOrderedList().run())}>
          Numbered
        </button>
        <button type="button" className="px-3 py-2 rounded-xl border border-white/15 text-sm text-white/70 hover:bg-white/5"
          onClick={() => {
            const url = prompt("Image URL (upload in Admin → Uploads)") || ""
            if (!url) return
            editor?.chain().focus().setImage({ src: url }).run()
          }}>
          Insert Image URL
        </button>
        <button type="button" className="px-3 py-2 rounded-xl border border-white/15 text-sm text-white/70 hover:bg-white/5"
          onClick={() => {
            const url = prompt("Link URL") || ""
            if (!url) return
            editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
          }}>
          Link
        </button>
        <button type="button" className="px-3 py-2 rounded-xl border border-white/15 text-sm text-white/70 hover:bg-white/5"
          onClick={() => editor?.chain().focus().unsetLink().run()}>
          Unlink
        </button>
      </div>
      <div className="rounded-2xl overflow-hidden">
        <EditorContent editor={editor} />
      </div>
      <div className="text-xs text-white/45">
        Tip: upload images in <span className="text-white/70">Admin → Uploads</span>, then paste URLs here.
      </div>
    </div>
  )
}
