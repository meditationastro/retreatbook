"use client"

import { useState } from "react"

export default function AdminLogin() {
  const [pw, setPw] = useState("")
  const [err, setErr] = useState("")

  return (
    <main className="bg-[#070707] text-white min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 space-y-5">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <p className="text-white/70 text-sm">Enter your admin password (set <code className="text-white/80">ADMIN_PASSWORD</code>).</p>
        <input
          className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3"
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Admin password"
        />
        {err && <div className="text-sm text-red-300">{err}</div>}
        <button
          className="bg-white text-black px-6 py-3 rounded-full hover:opacity-90 w-full"
          onClick={async () => {
            setErr("")
            const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw }) })
            if (!res.ok) {
              setErr("Invalid password.")
              return
            }
            window.location.href = "/admin"
          }}
        >
          Sign in
        </button>
      </div>
    </main>
  )
}
