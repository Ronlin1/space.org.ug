import Link from "next/link";
import { redirect } from "next/navigation";
import { Bell, GalleryHorizontalEnd, Handshake, LayoutDashboard, Users } from "lucide-react";
import { getCurrentSessionUser } from "@/lib/auth/current-user";

const adminAreas = [
  {
    href: "/admin/communities",
    title: "Communities",
    description: "Manage organisations, clubs, labs, university communities, and partner groups.",
    icon: Users
  },
  {
    href: "/admin/team",
    title: "Team",
    description: "Update national coordinators, organisers, advisors, and public profiles.",
    icon: Handshake
  },
  {
    href: "/admin/gallery",
    title: "Gallery",
    description: "Publish future photos, videos, captions, and event memories.",
    icon: GalleryHorizontalEnd
  },
  {
    href: "/admin/announcements",
    title: "Announcements",
    description: "Post campaign updates, calls for speakers, schedules, and press notes.",
    icon: Bell
  }
];

export default async function AdminPage() {
  const user = await getCurrentSessionUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-space-950 px-6 py-8 text-space-100">
      <section className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-normal text-ugandaGold">
              <LayoutDashboard aria-hidden="true" size={18} />
              Admin Dashboard
            </p>
            <h1 className="mt-3 text-3xl font-bold text-white md:text-5xl">
              Space Uganda control room
            </h1>
            <p className="mt-3 max-w-2xl text-space-100/70">
              Signed in as {user.name}. Use this area to keep the public website
              fresh across campaigns, ecosystem listings, and submissions.
            </p>
          </div>
          <form action="/admin/logout" method="post">
            <button
              className="rounded-md border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-ugandaGold hover:text-ugandaGold"
              type="submit"
            >
              Sign out
            </button>
          </form>
        </header>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {adminAreas.map((area) => {
            const Icon = area.icon;

            return (
              <Link
                className="group rounded-lg border border-white/10 bg-white/8 p-5 transition hover:border-ugandaGold/70 hover:bg-white/12"
                href={area.href}
                key={area.href}
              >
                <Icon
                  aria-hidden="true"
                  className="text-ugandaGold transition group-hover:scale-105"
                  size={24}
                />
                <h2 className="mt-4 text-xl font-bold text-white">{area.title}</h2>
                <p className="mt-2 text-sm leading-6 text-space-100/70">{area.description}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
