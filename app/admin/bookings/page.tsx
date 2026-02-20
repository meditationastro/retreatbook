"use client"

import { useEffect, useMemo, useState } from "react"

type Row = Record<string, any>

const STATUSES = ["pending", "deposit", "confirmed", "balance_due", "itinerary_sent", "completed", "cancelled"]

export default function BookingsAdmin() {
  const [rows, setRows] = useState<Row[]>([])
  const [err, setErr] = useState<string | null>(null)
  const [q, setQ] = useState("")
  const [msg, setMsg] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  async function load() {
    setErr(null); setMsg("")
    const res = await fetch("/api/admin/bookings")
    const json = await res.json()
    if (!res.ok) { setErr(json.error || "Failed"); return }
    setRows(json.rows || [])
  }

  useEffect(() => { load() }, [])

  const filtered = useMemo(() => {
    let out = rows
    const s = q.trim().toLowerCase()
    if (statusFilter !== "all") out = out.filter((r) => String(r.status || "").toLowerCase() === statusFilter)
    if (!s) return out
    return out.filter((r) => JSON.stringify(r).toLowerCase().includes(s))
  }, [rows, q, statusFilter])

  const keys = Object.keys(filtered[0] || {}).slice(0, 9)

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Bookings</h1>
          <p className="text-white/60 text-sm">Manage bookings, status workflow, export CSV, and email templates.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a className="border border-white/20 px-4 py-2 rounded-full hover:bg-white/10 text-sm" href="/api/admin/bookings/export" target="_blank">
            Export CSV
          </a>
          <button onClick={load} className="bg-white text-black px-4 py-2 rounded-full hover:opacity-90 text-sm">Refresh</button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 grid md:grid-cols-3 gap-3 items-center">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search bookings..." className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2" />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white/80">
          <option value="all">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <div className="text-sm text-white/50">Tip: status updates will send emails if you enable “Auto-email”.</div>
      </div>

      {err && <div className="rounded-2xl border border-white/10 bg-black/30 p-5 text-white/70">{err}</div>}
      {msg && <div className="rounded-2xl border border-white/10 bg-black/30 p-5 text-white/70">{msg}</div>}

      {!err && (
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/30">
          <table className="min-w-full text-sm">
            <thead className="text-white/60">
              <tr>
                {keys.map((k) => (
                  <th key={k} className="text-left px-4 py-3 border-b border-white/10">{k}</th>
                ))}
                <th className="text-left px-4 py-3 border-b border-white/10">Workflow</th>
                <th className="text-left px-4 py-3 border-b border-white/10">Emails</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, idx) => (
                <RowItem key={idx} row={r} keys={keys} onMessage={setMsg} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="rounded-2xl border border-white/10 bg-black/30 p-5 text-white/70 text-sm">
        <div className="font-semibold text-white mb-2">Important</div>
        <ul className="space-y-1">
          <li>• Status updates try to write <code className="text-white/80">status</code> and <code className="text-white/80">adminNote</code> fields if they exist in your Prisma model.</li>
          <li>• If your schema uses different field names, update <code className="text-white/80">/api/admin/bookings/update</code>.</li>
          <li>• Email sending uses <code className="text-white/80">EMAIL_USER</code> + <code className="text-white/80">EMAIL_PASS</code>.</li>
        </ul>
      </div>
    </div>
  )
}

function RowItem({ row, keys, onMessage }: { row: Row; keys: string[]; onMessage: (s: string) => void }) {
  const [status, setStatus] = useState(String(row.status || "pending"))
  const [note, setNote] = useState(String(row.adminNote || ""))
  const [autoEmail, setAutoEmail] = useState(true)

  return (
    <tr className="border-b border-white/5 align-top">
      {keys.map((k) => (
        <td key={k} className="px-4 py-3 text-white/70 whitespace-pre-wrap">{String(row[k] ?? "")}</td>
      ))}

      <td className="px-4 py-3">
        <div className="space-y-2 min-w-[220px]">
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white/80">
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Admin note..." className="w-full min-h-[70px] rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white/80" />
          <label className="flex items-center gap-2 text-xs text-white/60">
            <input type="checkbox" checked={autoEmail} onChange={(e) => setAutoEmail(e.target.checked)} />
            Auto-email on status change
          </label>
          <button
            className="bg-white text-black px-4 py-2 rounded-full hover:opacity-90 text-sm"
            onClick={async () => {
              onMessage("")
              const res = await fetch("/api/admin/bookings/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: row.id, status, note, autoEmail }),
              })
              const json = await res.json()
              if (!res.ok) { onMessage(json.error || "Update failed"); return }
              onMessage("Updated ✅")
            }}
          >
            Update
          </button>
        </div>
      </td>

      <td className="px-4 py-3">
        <div className="flex flex-col gap-2 min-w-[180px]">
          {["confirmation","deposit","balance_due","itinerary"].map((t) => (
            <button
              key={t}
              className="text-sm underline text-white/70 hover:text-white text-left"
              onClick={async () => {
                onMessage("")
                const res = await fetch("/api/admin/bookings/email", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ row, type: t }),
                })
                const json = await res.json()
                if (!res.ok) { onMessage(json.error || "Failed"); return }
                onMessage(`Email sent: ${t} ✅`)
              }}
            >
              Send {t.replace("_"," ")}
            </button>
          ))}
        </div>
      </td>
    </tr>
  )
}
