import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  GalleryHorizontalEnd,
  Globe2,
  Satellite,
  Users
} from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { getGalleryItems, getHomeContent } from "@/lib/content/public";
import { siteIdentity, wsw2026 } from "@/lib/constants";

export const dynamic = "force-dynamic";

const focusAreas = [
  {
    title: "Communities",
    description:
      "One umbrella for clubs, companies, universities, student branches, outreach teams, researchers, and makers.",
    icon: Users
  },
  {
    title: "Public Programmes",
    description:
      "Year-round talks, showcases, stargazing, workshops, school outreach, hackathons, and ecosystem convenings.",
    icon: Globe2
  },
  {
    title: "Innovation",
    description:
      "A visible pathway for rocketry, satellites, Earth observation, astronomy, robotics, policy, and space arts.",
    icon: Satellite
  }
];

export default async function Home() {
  const [{ featuredCommunities, announcements, campaign, partners }, galleryItems] =
    await Promise.all([getHomeContent(), getGalleryItems()]);
  const programmeItems = campaign?.programmeItems ?? [];

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative isolate overflow-hidden bg-ink text-white">
          <Image
            alt="Earth horizon and deep-space star field"
            className="absolute inset-0 -z-20 object-cover object-right opacity-65"
            fill
            priority
            src="/assets/space-uganda-general-space-banner.png"
            sizes="100vw"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(21,23,28,0.96),rgba(21,23,28,0.72),rgba(21,23,28,0.24))]" />
          <div className="mx-auto flex min-h-[560px] max-w-7xl flex-col justify-center px-5 py-16 md:px-8">
            <p className="text-sm font-black uppercase tracking-normal text-ugandaGold">
              {siteIdentity.tagline}
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-black leading-tight text-white md:text-7xl">
              Space Uganda
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/82">
              {siteIdentity.description} We coordinate the ecosystem year-round and
              anchor national participation in {wsw2026.name}.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center gap-2 rounded-md bg-ugandaGold px-5 py-3 font-black text-ink transition hover:bg-white"
                href="/community"
              >
                Explore the ecosystem
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
              <Link
                className="inline-flex items-center gap-2 rounded-md border border-white/35 px-5 py-3 font-black text-white transition hover:border-ugandaGold hover:text-ugandaGold"
                href="/wsw-2026"
              >
                WSW Uganda 2026
                <CalendarDays aria-hidden="true" size={18} />
              </Link>
            </div>
          </div>
        </section>

        <section className="border-b border-black/10 bg-white">
          <div className="mx-auto grid max-w-7xl gap-4 px-5 py-6 md:grid-cols-4 md:px-8">
            {[
              ["Umbrella", "Year-round ecosystem home"],
              ["Oct 4-10", "World Space Week 2026"],
              ["Theme", wsw2026.theme],
              ["Target", "100+ participants and growing"]
            ].map(([label, value]) => (
              <div className="rounded-md border border-black/10 bg-paper p-4" key={label}>
                <p className="text-xs font-black uppercase tracking-normal text-ugandaRed">
                  {label}
                </p>
                <p className="mt-2 text-lg font-black text-ink">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-paper px-5 py-16 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              description="Space Uganda is built to make the ecosystem easier to discover, coordinate, and trust. It gives every serious contributor a national home without erasing the identity of each organisation."
              eyebrow="Year-Round Umbrella"
              title="A professional home for Uganda's space ecosystem"
            />
            <div className="mt-9 grid gap-4 md:grid-cols-3">
              {focusAreas.map((area) => {
                const Icon = area.icon;

                return (
                  <article className="rounded-lg border border-black/10 bg-white p-6" key={area.title}>
                    <Icon aria-hidden="true" className="text-ugandaGreen" size={28} />
                    <h3 className="mt-5 text-xl font-black text-ink">{area.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-ink/65">{area.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-16 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                description="The directory starts with confirmed and mapped communities from the Uganda Space Week planning material. The organising team can keep it current as the network grows."
                eyebrow="Community"
                title="Organisations under the umbrella"
              />
              <Link
                className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-3 text-sm font-black text-white transition hover:bg-ugandaRed"
                href="/community"
              >
                View all communities
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>
            <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featuredCommunities.map((community) => (
                <article
                  className="rounded-lg border border-black/10 bg-paper p-5"
                  key={community.id}
                >
                  <p className="text-xs font-black uppercase tracking-normal text-ugandaRed">
                    {community.category}
                  </p>
                  <h3 className="mt-3 text-xl font-black text-ink">{community.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink/65">{community.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-ink px-5 py-16 text-white md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-normal text-ugandaGold">
                Featured Campaign
              </p>
              <h2 className="mt-3 text-4xl font-black md:text-6xl">{campaign?.name}</h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/70">
                {campaign?.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  className="inline-flex items-center gap-2 rounded-md bg-ugandaGold px-5 py-3 font-black text-ink transition hover:bg-white"
                  href="/wsw-2026"
                >
                  Open WSW 2026
                  <ArrowRight aria-hidden="true" size={18} />
                </Link>
                <Link
                  className="inline-flex items-center gap-2 rounded-md border border-white/30 px-5 py-3 font-black text-white transition hover:border-ugandaGold hover:text-ugandaGold"
                  href="https://www.worldspaceweek.org/"
                >
                  Global WSW
                  <Globe2 aria-hidden="true" size={18} />
                </Link>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {programmeItems.slice(0, 4).map((item) => (
                <article
                  className="rounded-lg border border-white/12 bg-white/[0.08] p-5"
                  key={item.id}
                >
                  <p className="text-xs font-black uppercase tracking-normal text-ugandaGold">
                    {item.track}
                  </p>
                  <h3 className="mt-3 text-xl font-black text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/68">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-paper px-5 py-16 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <SectionHeading
                description="A dedicated gallery structure is ready for event photos, videos, captions, press shots, and memories from Uganda's space activities."
                eyebrow="Gallery"
                title="The archive is ready"
              />
              <div className="grid gap-4 md:grid-cols-2">
                {galleryItems.slice(0, 2).map((item) => (
                  <article
                    className="overflow-hidden rounded-lg border border-black/10 bg-white"
                    key={item.id}
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        alt={item.title}
                        className="object-cover"
                        fill
                        loading="eager"
                        src={item.mediaUrl}
                        sizes="(min-width: 768px) 40vw, 100vw"
                      />
                    </div>
                    <div className="p-5">
                      <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-normal text-ugandaRed">
                        <GalleryHorizontalEnd aria-hidden="true" size={14} />
                        Featured
                      </p>
                      <h3 className="mt-2 text-lg font-black text-ink">{item.title}</h3>
                      {item.caption ? (
                        <p className="mt-2 text-sm leading-6 text-ink/65">{item.caption}</p>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-16 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              description="Latest public updates from the ecosystem. These will be curated by the organising team as the network grows."
              eyebrow="Updates"
              title="Signals from the network"
            />
            <div className="mt-9 grid gap-4 md:grid-cols-3">
              {announcements.map((announcement) => (
                <article className="rounded-lg border border-black/10 bg-paper p-5" key={announcement.id}>
                  <p className="text-xs font-black uppercase tracking-normal text-ugandaGreen">
                    {announcement.category}
                  </p>
                  <h3 className="mt-3 text-lg font-black text-ink">{announcement.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink/65">{announcement.excerpt}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-ugandaGold px-5 py-12 md:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-normal text-ink/70">
                Partner Network
              </p>
              <h2 className="mt-2 text-3xl font-black text-ink">
                Built with Uganda&apos;s space communities
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {partners.map((partner) => (
                <span className="rounded-md bg-white px-3 py-2 text-sm font-bold text-ink" key={partner.id}>
                  {partner.name}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
