import { PublicationStatus } from "@prisma/client";
import { prisma } from "@/lib/db";

export async function getHomeContent() {
  const [featuredCommunities, announcements, campaign, partners] = await Promise.all([
    prisma.community.findMany({
      where: { published: true, featured: true },
      orderBy: { name: "asc" },
      take: 6
    }),
    prisma.announcement.findMany({
      where: { status: PublicationStatus.PUBLISHED },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: 3
    }),
    prisma.campaign.findUnique({
      where: { slug: "world-space-week-uganda-2026" },
      include: {
        programmeItems: { where: { published: true }, orderBy: { sortOrder: "asc" } }
      }
    }),
    prisma.partner.findMany({
      where: { published: true, featured: true },
      orderBy: { name: "asc" },
      take: 8
    })
  ]);

  return { featuredCommunities, announcements, campaign, partners };
}

export function getCommunities() {
  return prisma.community.findMany({
    where: { published: true },
    orderBy: [{ featured: "desc" }, { name: "asc" }]
  });
}

export function getTeamMembers() {
  return prisma.teamMember.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }]
  });
}

export function getGalleryItems() {
  return prisma.galleryItem.findMany({
    where: { published: true },
    orderBy: [{ featured: "desc" }, { eventDate: "desc" }]
  });
}

export function getAnnouncements() {
  return prisma.announcement.findMany({
    where: { status: PublicationStatus.PUBLISHED },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }]
  });
}

export function getWsw2026Content() {
  return prisma.campaign.findUnique({
    where: { slug: "world-space-week-uganda-2026" },
    include: {
      programmeItems: { where: { published: true }, orderBy: { sortOrder: "asc" } },
      events: { where: { status: PublicationStatus.PUBLISHED }, orderBy: { startsAt: "asc" } }
    }
  });
}
