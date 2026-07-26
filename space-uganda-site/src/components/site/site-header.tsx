import Link from "next/link";
import { Rocket } from "lucide-react";
import { siteIdentity } from "@/lib/constants";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/community", label: "Community" },
  { href: "/team", label: "Team" },
  { href: "/gallery", label: "Gallery" },
  { href: "/wsw-2026", label: "WSW 2026" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-8">
        <Link className="flex items-center gap-3" href="/">
          <span className="flex size-10 items-center justify-center rounded-md bg-ink text-ugandaGold">
            <Rocket aria-hidden="true" size={21} />
          </span>
          <span>
            <span className="block text-base font-black text-ink">{siteIdentity.name}</span>
            <span className="block text-xs font-semibold uppercase tracking-normal text-ink/55">
              {siteIdentity.domain}
            </span>
          </span>
        </Link>
        <nav aria-label="Primary navigation" className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => (
            <Link
              className="rounded-md px-3 py-2 text-sm font-bold text-ink/70 transition hover:bg-white hover:text-ink"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className="rounded-md bg-ink px-3 py-2 text-sm font-bold text-white transition hover:bg-ugandaRed"
            href="/admin"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
