import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ExternalLink,
  Landmark,
  Rocket,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { getTeamMembers, getWsw2026Content } from "@/lib/content/public";
import { wsw2026 } from "@/lib/constants";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "World Space Week Uganda 2026",
  description:
    "World Space Week Uganda 2026 campaign page for October 4-10 under the global theme Rocket Revolution."
};

const officialContext = [
  {
    label: "Global Dates",
    value: "October 4-10 every year",
    icon: CalendarDays
  },
  {
    label: "2026 Theme",
    value: "Rocket Revolution",
    icon: Rocket
  },
  {
    label: "UN Recognition",
    value: "Declared by the United Nations in 1999",
    icon: Landmark
  }
];

const campaignPrinciples = [
  {
    title: "Curate",
    description:
      "Bring the strongest space education, engineering, astronomy, policy, and innovation experiences into one national programme."
  },
  {
    title: "Coordinate",
    description:
      "Align communities, universities, companies, student branches, and national organisers around a shared calendar and public story."
  },
  {
    title: "Catalyse",
    description:
      "Turn WSW into a launchpad for year-round participation, prototypes, clubs, partnerships, and serious ecosystem growth."
  }
];

export default async function Wsw2026Page() {
  const [campaign, teamMembers] = await Promise.all([getWsw2026Content(), getTeamMembers()]);
  const coordinators = teamMembers.filter((member) =>
    member.role.toLowerCase().includes("national coordinator")
  );

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative isolate overflow-hidden bg-ink text-white">
          <Image
            alt="World Space Week Uganda 2026 save the date visual"
            className="absolute inset-0 -z-20 object-cover opacity-45"
            fill
            priority
            src={campaign.heroImageUrl ?? "/assets/wsw-2026-save-the-date.png"}
            sizes="100vw"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(21,23,28,0.97),rgba(21,23,28,0.78),rgba(21,23,28,0.42))]" />
          <div className="mx-auto flex min-h-[560px] max-w-7xl flex-col justify-end px-5 py-16 md:px-8">
            <p className="text-sm font-black uppercase tracking-normal text-ugandaGold">
              {wsw2026.dateLabel}
            </p>
            <h1 className="mt-4 max-w-5xl text-5xl font-black leading-tight md:text-7xl">
              World Space Week Uganda 2026
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/78">
              {campaign.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center gap-2 rounded-md bg-ugandaGold px-5 py-3 font-black text-ink transition hover:bg-white"
                href="/join"
              >
                Join the ecosystem
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
              <Link
                className="inline-flex items-center gap-2 rounded-md border border-white/35 px-5 py-3 font-black text-white transition hover:border-ugandaGold hover:text-ugandaGold"
                href="https://www.worldspaceweek.org/"
              >
                Official WSW site
                <ExternalLink aria-hidden="true" size={18} />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-10 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
            {officialContext.map((item) => {
              const Icon = item.icon;

              return (
                <article className="rounded-lg border border-black/10 bg-paper p-5" key={item.label}>
                  <Icon aria-hidden="true" className="text-ugandaGreen" size={24} />
                  <p className="mt-4 text-xs font-black uppercase tracking-normal text-ugandaRed">
                    {item.label}
                  </p>
                  <p className="mt-2 text-lg font-black text-ink">{item.value}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="bg-paper px-5 py-16 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              description="World Space Week commemorates the beginning of the space age and the signing of the Outer Space Treaty. Uganda's 2026 campaign translates that global moment into local engineering, astronomy, Earth observation, and innovation experiences."
              eyebrow="Global Week, Local Mission"
              title="Rocket Revolution, grounded in Uganda"
            />
            <div className="mt-9 grid gap-4 md:grid-cols-3">
              {campaignPrinciples.map((principle) => (
                <article className="rounded-lg border border-black/10 bg-white p-6" key={principle.title}>
                  <Sparkles aria-hidden="true" className="text-ugandaGold" size={28} />
                  <h2 className="mt-5 text-2xl font-black text-ink">{principle.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-ink/65">{principle.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-ink px-5 py-16 text-white md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              align="center"
              description="The national plan moves from broad public inspiration into practical tracks, technical showcases, and an outdoor astronomy experience."
              eyebrow="Programme Model"
              title="Three core experiences and a night-sky finale"
            />
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {campaign.programmeItems.map((item) => (
                <article
                  className="rounded-lg border border-white/12 bg-white/[0.08] p-6"
                  key={item.id}
                >
                  <p className="text-xs font-black uppercase tracking-normal text-ugandaGold">
                    {item.track}
                  </p>
                  <h2 className="mt-3 text-2xl font-black text-white">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-white/68">{item.description}</p>
                  <p className="mt-5 text-xs font-bold uppercase tracking-normal text-white/45">
                    Lead: {item.leadOrganisation}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-16 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeading
                description="The 2026 plan is structured for national coordination, sponsor readiness, safety, press, official registration, and post-event reporting."
                eyebrow="Delivery Discipline"
                title="Built for serious national execution"
              />
              <div className="mt-8 rounded-lg border border-black/10 bg-paper p-6">
                <ShieldCheck aria-hidden="true" className="text-ugandaGreen" size={28} />
                <h2 className="mt-4 text-2xl font-black text-ink">Safety-first demonstrations</h2>
                <p className="mt-3 text-sm leading-6 text-ink/65">
                  The refined plan favours mechanical demonstrations, simulations, exhibits,
                  and controlled learning experiences instead of risky live rocket launches.
                </p>
              </div>
            </div>
            <div className="grid gap-4">
              {[
                ["September 1", "Media list and national outreach preparation"],
                ["September 15", "Press release and confirmed campaign messaging"],
                ["October 1", "WSW events registered with the global calendar"],
                ["October 4-10", "World Space Week Uganda 2026 activities"],
                ["November 15", "Final report and ecosystem learning review"]
              ].map(([date, milestone]) => (
                <article
                  className="grid gap-3 rounded-lg border border-black/10 bg-paper p-5 md:grid-cols-[130px_1fr]"
                  key={date}
                >
                  <p className="text-sm font-black uppercase tracking-normal text-ugandaRed">
                    {date}
                  </p>
                  <p className="text-base font-bold text-ink">{milestone}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-paper px-5 py-16 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              description="The campaign is nationally coordinated while remaining open to community partners, technical leads, sponsors, schools, universities, volunteers, and media collaborators."
              eyebrow="National Coordinators"
              title="Leadership for WSW Uganda 2026"
            />
            <div className="mt-9 grid gap-4 md:grid-cols-2">
              {coordinators.map((member) => (
                <article className="rounded-lg border border-black/10 bg-white p-6" key={member.id}>
                  <p className="text-xs font-black uppercase tracking-normal text-ugandaRed">
                    {member.organisation}
                  </p>
                  <h2 className="mt-3 text-2xl font-black text-ink">{member.name}</h2>
                  <p className="mt-2 text-sm font-bold text-ink/65">{member.role}</p>
                  <p className="mt-4 text-sm leading-6 text-ink/65">{member.bio}</p>
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
