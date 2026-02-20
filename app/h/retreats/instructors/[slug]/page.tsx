
import Link from "next/link"
import { notFound } from "next/navigation"

const data: Record<string, { name: string; title: string; bio: string; focus: string[] }> = {
  "tashi-lama": {
    name: "Tashi Lama",
    title: "Mindfulness Guide • Breathwork",
    bio: "Tashi blends traditional Himalayan mindfulness with modern breathwork protocols for deep calm and clarity.",
    focus: ["Breathwork", "Mindfulness", "Nervous system regulation", "Beginner-friendly foundations"],
  },
  "maya-shrestha": {
    name: "Maya Shrestha",
    title: "Healing Facilitator • Journaling",
    bio: "Maya guides emotional integration circles and structured journaling to help you release blocks and return to self-trust.",
    focus: ["Emotional healing", "Journaling", "Group circles", "Self-compassion practices"],
  },
  "arjun-gurung": {
    name: "Arjun Gurung",
    title: "Nature Immersion • Silent Practice",
    bio: "Arjun leads silent walking meditation, mountain immersion, and mindful presence practices in nature.",
    focus: ["Silent practice", "Nature immersion", "Walking meditation", "Retreat structure & safety"],
  },
}

export default function InstructorProfile({ params }: { params: { slug: string } }) {
  const d = data[params.slug]
  if (!d) return notFound()

  return (
    <main className="max-w-3xl mx-auto px-6 py-16 space-y-8">
      <div>
        <h1 className="text-4xl font-bold">{d.name}</h1>
        <p className="mt-2 text-gray-600">{d.title}</p>
      </div>

      <p className="text-gray-800 text-lg">{d.bio}</p>

      <div>
        <h2 className="text-2xl font-semibold">Focus Areas</h2>
        <ul className="mt-3 list-disc ml-6 text-gray-700 space-y-1">
          {d.focus.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>

      <Link className="underline" href="/h/retreats/instructors">All Guides</Link>
    </main>
  )
}
