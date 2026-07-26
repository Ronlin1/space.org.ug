import Link from "next/link";
import { redirect } from "next/navigation";
import { LogOut, Rocket } from "lucide-react";
import { getCurrentSessionUser } from "@/lib/auth/current-user";
import { adminResources } from "@/lib/admin/resources";

type AdminFrameProps = {
  title: string;
  description: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

export async function AdminFrame({ title, description, actions, children }: AdminFrameProps) {
  const user = await getCurrentSessionUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-space-950 text-space-100">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-6 lg:grid-cols-[280px_1fr] lg:px-8">
        <aside className="rounded-lg border border-white/10 bg-white/[0.08] p-4 lg:sticky lg:top-6 lg:h-[calc(100svh-48px)]">
          <Link className="flex items-center gap-3" href="/admin">
            <span className="flex size-10 items-center justify-center rounded-md bg-ugandaGold text-ink">
              <Rocket aria-hidden="true" size={20} />
            </span>
            <span>
              <span className="block font-black text-white">Space Uganda</span>
              <span className="block text-xs font-bold uppercase tracking-normal text-white/50">
                Admin
              </span>
            </span>
          </Link>

          <nav aria-label="Admin navigation" className="mt-6 grid gap-1">
            {adminResources.map((resource) => (
              <Link
                className="rounded-md px-3 py-2 text-sm font-bold text-white/70 transition hover:bg-white/[0.08] hover:text-white"
                href={`/admin/${resource.slug}`}
                key={resource.slug}
              >
                {resource.label}
              </Link>
            ))}
          </nav>

          <form action="/admin/logout" className="mt-6" method="post">
            <button
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-white/15 px-3 py-2 text-sm font-bold text-white transition hover:border-ugandaGold hover:text-ugandaGold"
              type="submit"
            >
              <LogOut aria-hidden="true" size={16} />
              Sign out
            </button>
          </form>
        </aside>

        <section>
          <header className="flex flex-col gap-4 rounded-lg border border-white/10 bg-white/[0.08] p-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-normal text-ugandaGold">
                Signed in as {user.name}
              </p>
              <h1 className="mt-3 text-3xl font-black text-white md:text-5xl">{title}</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65">{description}</p>
            </div>
            {actions ? <div className="shrink-0">{actions}</div> : null}
          </header>
          <div className="mt-6">{children}</div>
        </section>
      </div>
    </main>
  );
}
