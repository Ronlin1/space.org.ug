import Link from "next/link";
import { ArrowRight, Database, LayoutDashboard } from "lucide-react";
import { AdminFrame } from "@/components/admin/admin-frame";
import { adminResources } from "@/lib/admin/resources";

export default async function AdminPage() {
  return (
    <AdminFrame
      description="Manage the public website, WSW Uganda 2026 campaign content, media archive, team profiles, ecosystem directory, submissions, and settings."
      title="Space Uganda control room"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {adminResources.map((resource) => (
          <Link
            className="group rounded-lg border border-white/10 bg-white/[0.08] p-5 transition hover:border-ugandaGold/70 hover:bg-white/[0.12]"
            href={`/admin/${resource.slug}`}
            key={resource.slug}
          >
            <Database
              aria-hidden="true"
              className="text-ugandaGold transition group-hover:scale-105"
              size={24}
            />
            <h2 className="mt-4 text-xl font-black text-white">{resource.label}</h2>
            <p className="mt-2 text-sm leading-6 text-white/62">{resource.description}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-ugandaGold">
              Manage
              <ArrowRight aria-hidden="true" size={16} />
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.08] p-5">
        <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-ugandaGold">
          <LayoutDashboard aria-hidden="true" size={16} />
          Dynamic Admin
        </p>
        <p className="mt-3 text-sm leading-6 text-white/65">
          This admin side is backed by Prisma and Postgres. Each resource writes to
          the live database, then revalidates the public pages so content changes can
          appear on the website.
        </p>
      </div>
    </AdminFrame>
  );
}
