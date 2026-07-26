const publicAdminPrefixes = ["/admin/login"];
const publicPrefixes = ["/_next", "/favicon.ico", "/assets"];

export function isProtectedAdminPath(pathname: string): boolean {
  if (publicPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return false;
  }

  if (
    publicAdminPrefixes.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
    )
  ) {
    return false;
  }

  return (
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/api/admin" ||
    pathname.startsWith("/api/admin/")
  );
}

export function getSafeAdminRedirectPath(pathname: string | null | undefined): string {
  if (!pathname || !pathname.startsWith("/") || pathname.startsWith("//")) {
    return "/admin";
  }

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return isProtectedAdminPath(pathname) ? pathname : "/admin";
  }

  return "/admin";
}
