import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isProtectedAdminPath } from "@/lib/auth/guard";
import { sessionCookieName, verifySessionToken } from "@/lib/auth/session";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (!isProtectedAdminPath(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(sessionCookieName)?.value;
  const session = await verifySessionToken(token ?? "");

  if (session) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/admin/login";
  loginUrl.searchParams.set("next", pathname);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"]
};
