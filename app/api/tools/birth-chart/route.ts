import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import crypto from "crypto"

function shortHash(s: string) {
  return crypto.createHash("sha256").update(s).digest("hex").slice(0, 10)
}

export async function POST(req: Request) {
  const body = await req.json()
  const dob = String(body.dob || "")
  const tob = String(body.tob || "")
  const pob = String(body.pob || "")
  if (!dob || !tob || !pob) return NextResponse.json({ error: "Missing birth details" }, { status: 400 })

  const seed = `${dob}|${tob}|${pob}`
  const id = shortHash(seed)
  const title = `Birth Chart Summary — ${body.name || "Client"}`

  const month = Number(dob.split("-")[1] || 1)
  const themes = ["Discipline","Compassion","Learning","Courage","Stability","Creativity","Devotion","Truth","Service","Freedom","Wisdom","Transformation"]
  const theme = themes[(month - 1) % themes.length]

  const cards = [
    { k: "Theme", v: theme, note: "General theme based on birth month (demo)." },
    { k: "Focus", v: "Mind • Habit • Purpose", note: "Use meditation + journaling for 30 days." },
    { k: "Next step", v: "Book Jyotish", note: "For precise Lagna, dashas, nakshatra, and timing." },
  ]

  const remedies = [
    "Daily 10–20 minutes breath awareness",
    "108 mantra repetitions (choose one mantra)",
    "Weekly digital detox (half-day)",
    "Service: one small act daily",
    "Journal: what I avoid + what I seek",
  ]

  const reportText = [
    title,
    "",
    `DOB: ${dob}`,
    `TOB: ${tob}`,
    `POB: ${pob}`,
    `Theme (demo): ${theme}`,
    "",
    "General Remedies & Practices:",
    ...remedies.map((r: string) => `- ${r}`),
    "",
    "For precision: book a Jyotish consultation.",
  ].join("\n")

  const dir = path.join(process.cwd(), "public", "reports")
  fs.mkdirSync(dir, { recursive: true })
  const filename = `birth-chart-${id}.txt`
  fs.writeFileSync(path.join(dir, filename), reportText, "utf8")

  return NextResponse.json({ title, cards, remedies, reportUrl: `/reports/${filename}` })
}
