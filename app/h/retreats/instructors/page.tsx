
import Link from "next/link"

const instructors = [
  {
    slug: "tashi-lama",
    name: "Tashi Lama",
    title: "Mindfulness Guide • Breathwork",
    bio: "Specializes in Himalayan mindfulness traditions, breathwork, and stress regulation.",
  },
  {
    slug: "maya-shrestha",
    name: "Maya Shrestha",
    title: "Healing Facilitator • Journaling",
    bio: "Leads emotional integration circles, self-reflection workshops, and guided journaling.",
  },
  {
    slug: "arjun-gurung",
    name: "Arjun Gurung",
    title: "Nature Immersion • Silent Practice",
    bio: "Facilitates silent walking meditations and mindful nature immersion in the Himalayas.",
  },
]

export default function InstructorsPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 space-y-10">
      <div>
        <h1 className="text-4xl font-bold">Meet the Guides</h1>
        <p className="mt-3 text-gray-600">
          A small, expert team focused on safety, depth, and real transformation.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {instructors.map((i) => (
          <Link
            key={i.slug}
            href={`/h/retreats/instructors/${i.slug}`}
            className="border rounded-2xl p-6 hover:shadow-lg transition bg-white"
          >
            <div className="text-xl font-semibold">{i.name}</div>
            <div className="text-sm text-gray-600 mt-1">{i.title}</div>
            <p className="mt-4 text-gray-700">{i.bio}</p>
          </Link>
        ))}
      </div>

      <Link className="underline" href="/h/retreats">Back to Retreats</Link>
    </main>
  )
}
