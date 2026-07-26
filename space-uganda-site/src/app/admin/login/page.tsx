import Link from "next/link";
import { Rocket } from "lucide-react";
import { getSafeAdminRedirectPath } from "@/lib/auth/guard";
import { siteIdentity } from "@/lib/constants";
import { LoginForm } from "./login-form";

type LoginPageProps = {
  searchParams: Promise<{
    next?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const nextPath = getSafeAdminRedirectPath(params.next);

  return (
    <main className="flex min-h-screen items-center justify-center bg-space-950 px-6 py-12 text-space-100">
      <section className="w-full max-w-md">
        <Link className="inline-flex items-center gap-2 text-sm text-space-100/70" href="/">
          <Rocket aria-hidden="true" size={18} />
          {siteIdentity.name}
        </Link>
        <div className="mt-8 rounded-lg border border-white/10 bg-white/8 p-6 shadow-2xl shadow-black/20">
          <p className="text-sm font-semibold uppercase tracking-normal text-ugandaGold">
            Admin Access
          </p>
          <h1 className="mt-3 text-3xl font-bold text-white">Manage Space Uganda</h1>
          <p className="mt-3 text-sm leading-6 text-space-100/70">
            Sign in to update communities, team profiles, campaigns, gallery items,
            announcements, and submissions.
          </p>
          <div className="mt-7">
            <LoginForm nextPath={nextPath} />
          </div>
        </div>
      </section>
    </main>
  );
}
