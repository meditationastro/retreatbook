import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (!pathname.startsWith("/admin")) return NextResponse.next()

  if (pathname.startsWith("/admin/login")) return NextResponse.next()

  const token = req.cookies.get("admin_token")?.value
  const expected = process.env.ADMIN_PASSWORD || ""
  if (!expected) return NextResponse.redirect(new URL("/admin/login", req.url))

  // token is just a match in this lightweight setup
  if (token !== expected) return NextResponse.redirect(new URL("/admin/login", req.url))

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
