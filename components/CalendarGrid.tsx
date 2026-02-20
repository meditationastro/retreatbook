
"use client"

import { useMemo, useState } from "react"

type Props = {
  availableDates: string[]
  value?: string
  onChange: (iso: string) => void
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}
function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0)
}
function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1)
}
function isoDateOnly(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}
function toLocalDateOnly(iso: string) {
  // Use date-only comparison to avoid TZ surprises
  const d = new Date(iso)
  return isoDateOnly(new Date(d.getFullYear(), d.getMonth(), d.getDate()))
}

export default function CalendarGrid({ availableDates, value, onChange }: Props) {
  const availableSet = useMemo(() => new Set(availableDates.map(toLocalDateOnly)), [availableDates])
  const initial = useMemo(() => {
    const first = availableDates?.[0] ? new Date(availableDates[0]) : new Date()
    return new Date(first.getFullYear(), first.getMonth(), 1)
  }, [availableDates])

  const [month, setMonth] = useState<Date>(initial)

  const weeks = useMemo(() => {
    const start = startOfMonth(month)
    const end = endOfMonth(month)
    const startWeekday = start.getDay() // 0 Sun
    const gridStart = new Date(start)
    gridStart.setDate(start.getDate() - startWeekday)

    const days: Date[] = []
    for (let i = 0; i < 42; i++) {
      const d = new Date(gridStart)
      d.setDate(gridStart.getDate() + i)
      days.push(d)
    }

    const rows: Date[][] = []
    for (let r = 0; r < 6; r++) rows.push(days.slice(r * 7, r * 7 + 7))
    return { rows, start, end }
  }, [month])

  const selected = value ? toLocalDateOnly(value) : ""

  return (
    <div className="rounded-3xl border border-white/10 p-6 bg-white/5">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMonth((m) => addMonths(m, -1))}
          className="text-sm border border-white/20 px-3 py-2 rounded-full hover:bg-white/10"
        >
          Prev
        </button>
        <div className="text-lg font-semibold">
          {month.toLocaleString("en-US", { month: "long" })} {month.getFullYear()}
        </div>
        <button
          type="button"
          onClick={() => setMonth((m) => addMonths(m, 1))}
          className="text-sm border border-white/20 px-3 py-2 rounded-full hover:bg-white/10"
        >
          Next
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 text-xs text-white/50">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
          <div key={d} className="py-2 text-center">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 mt-1">
        {weeks.rows.flat().map((d, idx) => {
          const inMonth = d.getMonth() === month.getMonth()
          const iso = isoDateOnly(d)
          const available = availableSet.has(iso)
          const isSelected = selected === iso
          return (
            <button
              key={idx}
              type="button"
              disabled={!available}
              onClick={() => onChange(new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString())}
              className={[
                "h-11 rounded-xl text-sm transition border",
                inMonth ? "" : "opacity-40",
                available ? "border-white/15 hover:bg-white/10" : "border-white/5 opacity-30 cursor-not-allowed",
                isSelected ? "bg-white text-black border-white" : "bg-black/30 text-white",
              ].join(" ")}
              title={available ? "Available start date" : "Not available"}
            >
              {d.getDate()}
            </button>
          )
        })}
      </div>

      <div className="mt-4 text-xs text-white/50">
        Tip: only highlighted dates are selectable.
      </div>
    </div>
  )
}
