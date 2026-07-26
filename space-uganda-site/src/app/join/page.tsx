import type { Metadata } from "next";
import { Handshake, Lightbulb, Mail, Users } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { SubmissionForm } from "@/components/site/submission-form";

export const metadata: Metadata = {
  title: "Join Space Uganda",
  description:
    "Join the Space Uganda ecosystem, partner with the umbrella organisation, submit a WSW innovation idea, or contact the organising team."
};

const pathways = [
  {
    title: "Join",
    description: "List your community, volunteer, mentor, host a session, or help mobilise people.",
    icon: Users
  },
  {
    title: "Partner",
    description: "Support the national umbrella through venues, media, sponsorship, tools, or expertise.",
    icon: Handshake
  },
  {
    title: "Innovate",
    description: "Submit concepts for WSW 2026 showcases, demos, workshops, and public experiences.",
    icon: Lightbulb
  },
  {
    title: "Contact",
    description: "Reach the team for press, schools, universities, sponsors, and ecosystem coordination.",
    icon: Mail
  }
];

export default function JoinPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-ink px-5 py-16 text-white md:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-black uppercase tracking-normal text-ugandaGold">
              Join Space Uganda
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-black md:text-7xl">
              Plug into Uganda&apos;s space ecosystem
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">
              Use one form to join the umbrella, propose a partnership, submit a
              WSW Uganda 2026 innovation idea, or contact the organising team.
            </p>
          </div>
        </section>

        <section className="bg-white px-5 py-12 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
            {pathways.map((pathway) => {
              const Icon = pathway.icon;

              return (
                <article className="rounded-lg border border-black/10 bg-paper p-5" key={pathway.title}>
                  <Icon aria-hidden="true" className="text-ugandaGreen" size={26} />
                  <h2 className="mt-4 text-xl font-black text-ink">{pathway.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-ink/65">{pathway.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="bg-paper px-5 py-16 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading
              description="Every submission is stored securely and reviewed by the organising team. This keeps the public ecosystem open while giving coordinators a structured workflow."
              eyebrow="Public Intake"
              title="Tell us where you fit"
            />
            <SubmissionForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
