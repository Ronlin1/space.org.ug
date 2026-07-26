import { PublicationStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import {
  fallbackAnnouncements,
  fallbackCampaign,
  fallbackCommunities,
  fallbackGalleryItems,
  fallbackHomeContent,
  fallbackTeamMembers
} from "@/lib/content/fallback";

export async function getHomeContent() {
  try {
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

    return {
      featuredCommunities: featuredCommunities.length
        ? featuredCommunities
        : fallbackHomeContent.featuredCommunities,
      announcements: announcements.length ? announcements : fallbackHomeContent.announcements,
      campaign: campaign ?? fallbackHomeContent.campaign,
      partners: partners.length ? partners : fallbackHomeContent.partners
    };
  } catch {
    return fallbackHomeContent;
  }
}

export async function getCommunities() {
  try {
    const communities = await prisma.community.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { name: "asc" }]
    });

    return communities.length ? communities : fallbackCommunities;
  } catch {
    return fallbackCommunities;
  }
}

export async function getTeamMembers() {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }]
    });

    return teamMembers.length ? teamMembers : fallbackTeamMembers;
  } catch {
    return fallbackTeamMembers;
  }
}

export async function getGalleryItems() {
  try {
    const galleryItems = await prisma.galleryItem.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { eventDate: "desc" }]
    });

    return galleryItems.length ? galleryItems : fallbackGalleryItems;
  } catch {
    return fallbackGalleryItems;
  }
}

export async function getAnnouncements() {
  try {
    const announcements = await prisma.announcement.findMany({
      where: { status: PublicationStatus.PUBLISHED },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }]
    });

    return announcements.length ? announcements : fallbackAnnouncements;
  } catch {
    return fallbackAnnouncements;
  }
}

export async function getWsw2026Content() {
  try {
    const campaign = await prisma.campaign.findUnique({
      where: { slug: "world-space-week-uganda-2026" },
      include: {
        programmeItems: { where: { published: true }, orderBy: { sortOrder: "asc" } },
        events: { where: { status: PublicationStatus.PUBLISHED }, orderBy: { startsAt: "asc" } }
      }
    });

    return campaign ?? fallbackCampaign;
  } catch {
    return fallbackCampaign;
  }
}
