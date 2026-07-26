import type { Metadata } from "next";
import { Building2, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { getCommunities } from "@/lib/content/public";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Explore the organisations, student branches, universities, companies, and volunteer communities building Uganda's space ecosystem."
};

export default async function CommunityPage() {
  const communities = await getCommunities();
  const categories = Array.from(new Set(communities.map((community) => community.category))).sort();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-ink px-5 py-16 text-white md:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-black uppercase tracking-normal text-ugandaGold">
              Community Directory
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-black md:text-7xl">
              Uganda&apos;s space ecosystem under one umbrella
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">
              A living directory for organisations, universities, clubs, companies,
              student branches, and programmes contributing to space education,
              research, engineering, policy, astronomy, and outreach.
            </p>
          </div>
        </section>

        <section className="bg-white px-5 py-10 md:px-8">
          <div className="mx-auto flex max-w-7xl flex-wrap gap-2">
            {categories.map((category) => (
              <span
                className="rounded-md border border-black/10 bg-paper px-3 py-2 text-sm font-bold text-ink/75"
                key={category}
              >
                {category}
              </span>
            ))}
          </div>
        </section>

        <section className="bg-paper px-5 py-16 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              description="The listing begins with the organisations referenced in the current WSW Uganda planning material and can be expanded as more partners join."
              eyebrow={`${communities.length} Listed Communities`}
              title="Discover who is building with us"
            />
            <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {communities.map((community) => (
                <article
                  className="rounded-lg border border-black/10 bg-white p-5"
                  key={community.id}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-normal text-ugandaRed">
                        {community.category}
                      </p>
                      <h2 className="mt-3 text-xl font-black text-ink">{community.name}</h2>
                    </div>
                    {community.featured ? (
                      <span className="rounded-md bg-ugandaGold px-2 py-1 text-xs font-black text-ink">
                        Featured
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-ink/65">{community.description}</p>
                  <div className="mt-5 flex flex-wrap gap-3 text-xs font-bold text-ink/55">
                    {community.location ? (
                      <span className="inline-flex items-center gap-1">
                        <MapPin aria-hidden="true" size={14} />
                        {community.location}
                      </span>
                    ) : null}
                    <span className="inline-flex items-center gap-1">
                      <Building2 aria-hidden="true" size={14} />
                      {community.slug}
                    </span>
                  </div>
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
