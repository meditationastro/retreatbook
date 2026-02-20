export type BookingRow = Record<string, any>

export async function getBookingModel(prisma: any) {
  const anyPrisma = prisma as any
  if (anyPrisma.retreatBooking?.findMany) return { name: "retreatBooking", model: anyPrisma.retreatBooking }
  if (anyPrisma.booking?.findMany) return { name: "booking", model: anyPrisma.booking }
  return null
}

export function pickEmail(row: BookingRow): string | null {
  const candidates = ["email", "customerEmail", "userEmail", "contactEmail"]
  for (const k of candidates) if (row?.[k]) return String(row[k])
  return null
}

export function pickName(row: BookingRow): string {
  const candidates = ["name", "fullName", "customerName", "userName"]
  for (const k of candidates) if (row?.[k]) return String(row[k])
  return "Guest"
}

export function pickRetreat(row: BookingRow): string {
  const candidates = ["retreatTitle", "retreatName", "retreatSlug", "retreatId", "retreat"]
  for (const k of candidates) if (row?.[k]) return String(row[k])
  return "Retreat"
}

export function csvForRows(rows: BookingRow[]): string {
  if (!rows.length) return ""
  const keys = Object.keys(rows[0])
  const esc = (v: any) => {
    const s = String(v ?? "")
    if (s.includes('"') || s.includes(",") || s.includes("\n")) return `"${s.replace(/"/g,'""')}"`
    return s
  }
  const lines = [keys.join(",")]
  for (const r of rows) lines.push(keys.map((k) => esc(r[k])).join(","))
  return lines.join("\n")
}

export function renderEmailTemplate(type: "deposit" | "confirmation" | "balance_due" | "itinerary", ctx: { name: string; retreat: string; amount?: string; date?: string; link?: string }) {
  const { name, retreat, amount, date, link } = ctx
  const base = process.env.NEXT_PUBLIC_URL || "https://clueux.com"
  const support = "meditationastro1@gmail.com"
  const wa = "+977 9823376110"

  const header = `Hi ${name},\n\n`
  const footer = `\n\nWarmly,\nClue UX Team\nWhatsApp: ${wa}\nEmail: ${support}\n${base}`

  if (type === "deposit") {
    return {
      subject: `Deposit received — ${retreat}`,
      text: header + `We’ve received your deposit${amount ? ` (${amount})` : ""} for **${retreat}**.\n\nNext steps:\n- We’ll reserve your seat\n- You’ll receive preparation guidance within 24 hours\n- You can pay the remaining balance later\n${link ? `\nManage booking: ${link}\n` : ""}` + footer,
    }
  }
  if (type === "balance_due") {
    return {
      subject: `Balance reminder — ${retreat}`,
      text: header + `This is a friendly reminder that your remaining balance for **${retreat}** is due${date ? ` by ${date}` : ""}.\n\nIf you need assistance or a custom payment plan, reply to this email.\n${link ? `\nPay/manage: ${link}\n` : ""}` + footer,
    }
  }
  if (type === "itinerary") {
    return {
      subject: `Your itinerary — ${retreat}`,
      text: header + `Here is your itinerary and preparation guidance for **${retreat}**.\n\nKey reminders:\n- Arrive rested\n- Bring comfortable clothing\n- Journal daily for integration\n\n${link ? `View details: ${link}\n` : ""}` + footer,
    }
  }
  return {
    subject: `Booking confirmed — ${retreat}`,
    text: header + `Your booking for **${retreat}** is confirmed.\n\nWe’ll email your detailed itinerary and preparation guidance soon.\n${link ? `\nManage booking: ${link}\n` : ""}` + footer,
  }
}
