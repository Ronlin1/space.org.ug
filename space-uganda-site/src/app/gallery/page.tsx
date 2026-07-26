import type { Metadata } from "next";
import Image from "next/image";
import { Camera, GalleryHorizontalEnd } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { getGalleryItems } from "@/lib/content/public";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A gallery archive for Uganda Space Week, World Space Week Uganda, stargazing, workshops, and ecosystem moments."
};

export default async function GalleryPage() {
  const galleryItems = await getGalleryItems();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-ink px-5 py-16 text-white md:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-black uppercase tracking-normal text-ugandaGold">
              Gallery
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-black md:text-7xl">
              Uganda&apos;s space story in images
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">
              This page is ready for event photos, video covers, captions, press
              shots, and future memories from Space Uganda programmes.
            </p>
          </div>
        </section>

        <section className="bg-paper px-5 py-16 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              description="The first visuals are placeholders from the current archive. Administrators can add polished galleries and captions as new material arrives."
              eyebrow="Media Archive"
              title="Prepared for the moments you will add"
            />
            <div className="mt-9 grid gap-5 md:grid-cols-2">
              {galleryItems.map((item) => (
                <article
                  className="overflow-hidden rounded-lg border border-black/10 bg-white"
                  key={item.id}
                >
                  <div className="relative aspect-[16/10] bg-ink">
                    <Image
                      alt={item.title}
                      className="object-cover"
                      fill
                      src={item.mediaUrl}
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                  <div className="p-5">
                    <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-normal text-ugandaRed">
                      <GalleryHorizontalEnd aria-hidden="true" size={14} />
                      {item.mediaType}
                    </p>
                    <h2 className="mt-2 text-xl font-black text-ink">{item.title}</h2>
                    {item.caption ? (
                      <p className="mt-2 text-sm leading-6 text-ink/65">{item.caption}</p>
                    ) : null}
                  </div>
                </article>
              ))}
              <article className="flex min-h-80 flex-col justify-center rounded-lg border border-dashed border-black/20 bg-white p-8">
                <Camera aria-hidden="true" className="text-ugandaGreen" size={32} />
                <h2 className="mt-5 text-2xl font-black text-ink">Gallery slots are ready</h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-ink/65">
                  Add new photos, videos, captions, event dates, and featured status
                  through the admin side as the Space Uganda archive grows.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
