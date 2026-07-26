import type { Metadata } from "next";
import { Mail, UserRound } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { getTeamMembers } from "@/lib/content/public";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the national coordinators and organising teams helping build Space Uganda and World Space Week Uganda 2026."
};

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-ink px-5 py-16 text-white md:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-black uppercase tracking-normal text-ugandaGold">
              Team
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-black md:text-7xl">
              Coordinators, organisers, and ecosystem builders
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">
              Space Uganda is coordinated by people from different organisations
              working under a shared umbrella while preserving each community&apos;s identity.
            </p>
          </div>
        </section>

        <section className="bg-paper px-5 py-16 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              description="Team profiles can grow from national coordinators to volunteers, advisors, technical leads, and host teams as the organisation expands."
              eyebrow={`${teamMembers.length} Public Profiles`}
              title="The people moving the mission"
            />
            <div className="mt-9 grid gap-4 md:grid-cols-2">
              {teamMembers.map((member) => (
                <article
                  className="rounded-lg border border-black/10 bg-white p-6"
                  key={member.id}
                >
                  <div className="flex gap-4">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-md bg-ink text-ugandaGold">
                      <UserRound aria-hidden="true" size={26} />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-normal text-ugandaRed">
                        {member.organisation}
                      </p>
                      <h2 className="mt-2 text-2xl font-black text-ink">{member.name}</h2>
                      <p className="mt-1 text-sm font-bold text-ink/70">{member.role}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-6 text-ink/65">{member.bio}</p>
                  {member.email ? (
                    <a
                      className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-ugandaRed"
                      href={`mailto:${member.email}`}
                    >
                      <Mail aria-hidden="true" size={16} />
                      {member.email}
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
