import fs from "fs"
import path from "path"

type PutFileArgs = { filepath: string; content: string; message: string }

function isGithubConfigured() {
  return !!(process.env.GITHUB_TOKEN && process.env.GITHUB_OWNER && process.env.GITHUB_REPO)
}

async function githubRequest(url: string, init: RequestInit) {
  const token = process.env.GITHUB_TOKEN!
  const res = await fetch(url, {
    ...init,
    headers: {
      "Authorization": `token ${token}`,
      "Accept": "application/vnd.github+json",
      ...(init.headers || {}),
    },
  })
  const text = await res.text()
  let json: any = null
  try { json = JSON.parse(text) } catch { json = { raw: text } }
  if (!res.ok) throw new Error(json?.message || `GitHub error ${res.status}`)
  return json
}

export async function putFile({ filepath, content, message }: PutFileArgs) {
  // If GitHub is configured, commit into repo branch (works on Vercel)
  if (isGithubConfigured()) {
    const owner = process.env.GITHUB_OWNER!
    const repo = process.env.GITHUB_REPO!
    const branch = process.env.GITHUB_BRANCH || "main"
    const api = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(filepath)}`

    // Get existing sha if exists
    let sha: string | undefined = undefined
    try {
      const existing = await githubRequest(api + `?ref=${branch}`, { method: "GET" })
      sha = existing.sha
    } catch {
      sha = undefined
    }

    const body: any = {
      message,
      content: Buffer.from(content, "utf8").toString("base64"),
      branch,
    }
    if (sha) body.sha = sha

    await githubRequest(api, { method: "PUT", body: JSON.stringify(body) })
    return { mode: "github" as const }
  }

  // Fallback: local filesystem (dev/local only)
  const abs = path.join(process.cwd(), filepath)
  fs.mkdirSync(path.dirname(abs), { recursive: true })
  fs.writeFileSync(abs, content, "utf8")
  return { mode: "fs" as const }
}

export async function deleteFile(filepath: string, message: string) {
  if (isGithubConfigured()) {
    const owner = process.env.GITHUB_OWNER!
    const repo = process.env.GITHUB_REPO!
    const branch = process.env.GITHUB_BRANCH || "main"
    const api = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(filepath)}`
    const existing = await githubRequest(api + `?ref=${branch}`, { method: "GET" })
    const sha = existing.sha
    await githubRequest(api, { method: "DELETE", body: JSON.stringify({ message, sha, branch }) })
    return { mode: "github" as const }
  }

  const abs = path.join(process.cwd(), filepath)
  if (fs.existsSync(abs)) fs.unlinkSync(abs)
  return { mode: "fs" as const }
}
