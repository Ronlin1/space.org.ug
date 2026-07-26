import bcrypt from "bcryptjs";
import {
  EventFormat,
  PrismaClient,
  PublicationStatus,
  Role
} from "@prisma/client";
import { slugify } from "../src/lib/slug";

const prisma = new PrismaClient();

type TeamSeed = {
  name: string;
  role: string;
  organisation: string;
  bio: string;
  photoUrl?: string;
  sortOrder: number;
  featured: boolean;
};

const communities = [
  {
    name: "Space Junkies Uganda",
    category: "Space Outreach",
    summary: "A community making space science accessible and exciting for young Ugandans.",
    description:
      "Space Junkies Uganda leads public outreach, youth engagement, and national coordination work that connects Ugandans to global space opportunities.",
    location: "Kampala",
    featured: true
  },
  {
    name: "StellarView Technologies",
    category: "Space Arts And Outreach",
    summary: "A space-focused technology and creative outreach organisation.",
    description:
      "StellarView Technologies contributes visual programming, space arts, science communication, and public engagement capacity to the ecosystem.",
    location: "Uganda",
    featured: true
  },
  {
    name: "Uganda Astronomical Society",
    category: "Astronomy",
    summary: "Uganda's astronomy community for observation, education, and public stargazing.",
    description:
      "The Uganda Astronomical Society supports telescope sessions, night-sky interpretation, astrophotography, and astronomy education.",
    location: "Uganda",
    featured: true
  },
  {
    name: "Makerere University",
    category: "University",
    summary: "A major university partner for engineering, science, research, and student mobilisation.",
    description:
      "Makerere University contributes academic expertise, student talent, research networks, and institutional reach across science and engineering.",
    location: "Kampala",
    featured: true
  },
  {
    name: "Makerere University CEDAT",
    category: "Engineering School",
    summary: "The College of Engineering, Design, Art and Technology at Makerere University.",
    description:
      "CEDAT is a key source of engineering talent, design thinking, prototype development, and technical student communities.",
    location: "Kampala",
    featured: true
  },
  {
    name: "Holistic Inclusive Aviation Africa",
    category: "Aviation",
    summary: "An aviation-focused organisation contributing aerospace and inclusion perspectives.",
    description:
      "Holistic Inclusive Aviation Africa brings aviation, aerospace, and inclusive education perspectives to Uganda's space ecosystem.",
    location: "Uganda",
    featured: false
  },
  {
    name: "KTA Advocates Centre for Law, Policy and Innovation Initiative",
    category: "Law And Policy",
    summary: "A legal and policy innovation partner for emerging technology and space governance.",
    description:
      "KTA Advocates Centre for Law, Policy and Innovation Initiative supports conversations around policy, regulation, innovation, and responsible technology ecosystems.",
    location: "Uganda",
    featured: false
  },
  {
    name: "UAS",
    category: "Community",
    summary: "A community partner referenced in the Uganda Space Week organising ecosystem.",
    description:
      "UAS is included as part of the broader partner network and can be expanded by administrators as details are confirmed.",
    location: "Uganda",
    featured: false
  },
  {
    name: "IEEE Makerere Student Branch",
    category: "Student Branch",
    summary: "A student engineering community at Makerere University.",
    description:
      "IEEE Makerere Student Branch supported Uganda Space Week 2025 and remains important for student mobilisation, technical sessions, and engineering outreach.",
    location: "Makerere University",
    featured: true
  },
  {
    name: "IEEE AESS SBC Makerere",
    category: "Aerospace And Systems",
    summary: "A Makerere student branch chapter focused on aerospace and electronic systems.",
    description:
      "IEEE AESS SBC Makerere connects students to aerospace systems, satellite technology, engineering careers, and technical workshops.",
    location: "Makerere University",
    featured: true
  },
  {
    name: "NOA's Quest",
    category: "Rocketry And Propulsion",
    summary: "A private rocketry and propulsion initiative advancing indigenous aerospace engineering.",
    description:
      "NOA's Quest contributes rocket engineering, propulsion concepts, and indigenous aerospace ambition to the Rocket Revolution programme.",
    location: "Uganda",
    featured: true
  },
  {
    name: "StellarView Technologies Ltd",
    category: "Technology Company",
    summary: "A formal StellarView company partner in Uganda's space outreach network.",
    description:
      "StellarView Technologies Ltd supports technology, visual storytelling, and programme delivery for Space Uganda and WSW Uganda activities.",
    location: "Uganda",
    featured: false
  },
  {
    name: "Aerobuddies",
    category: "Aerospace DIY",
    summary: "A community for aerospace DIY activities, aeromodelling, and youth-friendly demonstrations.",
    description:
      "Aerobuddies contributes practical aerospace learning, model-building, and public-facing engineering activities.",
    location: "Uganda",
    featured: true
  },
  {
    name: "NASA Space Apps Kampala",
    category: "Hackathon",
    summary: "The Kampala local organising community for NASA Space Apps Challenge.",
    description:
      "NASA Space Apps Kampala connects Ugandan innovators to global space-tech challenges, team formation, mentoring, and prototype development.",
    location: "Kampala",
    featured: true
  },
  {
    name: "GDG On Campus Makerere University",
    category: "Developer Community",
    summary: "A student developer community supporting mobilisation and technical participation.",
    description:
      "GDG On Campus Makerere University helps connect software, data, and developer communities to space applications and public innovation.",
    location: "Makerere University",
    featured: false
  },
  {
    name: "Uganda Space Community",
    category: "Community Network",
    summary: "A wider volunteer and mobilisation network for Uganda's space enthusiasts.",
    description:
      "Uganda Space Community represents the broader network of volunteers, enthusiasts, and organisers helping build a national space ecosystem.",
    location: "Uganda",
    featured: false
  },
  {
    name: "Kyambogo University",
    category: "University",
    summary: "A university partner for engineering, applied sciences, and student participation.",
    description:
      "Kyambogo University is part of the wider university ecosystem supporting engineering, applied science, and space-related youth engagement.",
    location: "Kampala",
    featured: false
  },
  {
    name: "Mbarara University of Science and Technology",
    category: "University",
    summary: "A science and technology university with relevance to remote sensing and geospatial work.",
    description:
      "MUST is identified as a potential research partner for remote sensing, geospatial education, and applied science engagement.",
    location: "Mbarara",
    featured: false
  },
  {
    name: "Busitema University",
    category: "University",
    summary: "A university in the wider national science and engineering partner landscape.",
    description:
      "Busitema University is included in the national stakeholder map for future space education and innovation collaboration.",
    location: "Uganda",
    featured: false
  },
  {
    name: "Uganda Christian University",
    category: "University",
    summary: "A university partner in the wider WSW Uganda stakeholder map.",
    description:
      "Uganda Christian University is part of the potential academic network for outreach, innovation, and student participation.",
    location: "Mukono",
    featured: false
  },
  {
    name: "Nkumba University",
    category: "University",
    summary: "A university partner in the wider Uganda Space Week stakeholder landscape.",
    description:
      "Nkumba University is included as part of the academic ecosystem for future space outreach and student engagement.",
    location: "Uganda",
    featured: false
  },
  {
    name: "Uganda Industrial Research Institute",
    category: "Research Institute",
    summary: "A research and innovation institution in the national stakeholder map.",
    description:
      "UIRI is a potential institutional partner for prototyping, applied research, innovation, and technology demonstration.",
    location: "Uganda",
    featured: false
  },
  {
    name: "SGAC East Africa",
    category: "Professional Network",
    summary: "A regional network connecting young professionals to the global space sector.",
    description:
      "The Space Generation Advisory Council East Africa node can connect Ugandan students and young professionals to regional and global space networks.",
    location: "East Africa",
    featured: false
  },
  {
    name: "GIS Uganda / Esri Eastern Africa",
    category: "Earth Observation",
    summary: "A geospatial and Earth observation partner community.",
    description:
      "GIS Uganda and Esri Eastern Africa are relevant to satellite data, remote sensing, Earth observation, and practical applications for development.",
    location: "East Africa",
    featured: false
  }
] as const;

const team: TeamSeed[] = [
  {
    name: "Ronnie Atuhaire",
    role: "National Coordinator, World Space Week Uganda 2026",
    organisation: "Space Junkies Uganda",
    bio: "Ronnie leads Space Junkies Uganda and coordinates World Space Week Uganda 2026, connecting young Ugandans, institutions, and partners to the global space community.",
    sortOrder: 1,
    featured: true
  },
  {
    name: "Zoora Harrison",
    role: "National Coordinator, World Space Week Uganda 2026",
    organisation: "StellarView Technologies",
    bio: "Zoora supports national coordination through StellarView Technologies, bringing space outreach, visual programming, and partner engagement into the Space Uganda ecosystem.",
    sortOrder: 2,
    featured: true
  }
];

const partners = [
  {
    name: "World Space Week Association",
    type: "Global Campaign",
    description:
      "The global non-profit behind World Space Week, the UN-recognised annual celebration held every October 4-10.",
    contribution: "Global campaign framework, official theme, calendar, coordinator guidance, and public participation resources.",
    websiteUrl: "https://www.worldspaceweek.org/",
    featured: true
  },
  {
    name: "Ministry of Science, Technology and Innovation",
    type: "Government",
    description:
      "A target institutional patron and guest-of-honour partner for national credibility, policy engagement, and future ecosystem growth.",
    contribution: "Institutional endorsement, policy linkage, keynote participation, and national visibility.",
    featured: true
  },
  {
    name: "Uganda National Space Programme",
    type: "Government Programme",
    description:
      "A key national source of mission expertise connected to Uganda's space milestones, including PearlAfricaSat-1 and ClimCam.",
    contribution: "Mission context, technical expertise, and public education around Uganda's space journey.",
    featured: true
  },
  {
    name: "Nakuja Project",
    type: "Regional Rocketry Partner",
    description:
      "An amateur engineering rocketry research and development club from Kenya referenced as a Rocket Revolution collaborator.",
    contribution: "Rocketry demonstration knowledge, regional collaboration, and aerospace engineering perspective.",
    featured: false
  }
] as const;

const announcements = [
  {
    title: "Space Uganda Begins As A Year-Round Ecosystem Home",
    excerpt:
      "Space Uganda is being built as an umbrella platform for astronomy, aerospace engineering, Earth observation, education, policy, entrepreneurship, and public outreach.",
    content:
      "Space Uganda brings together communities, universities, innovators, companies, and public institutions under one national space ecosystem platform. Its first flagship campaign is World Space Week Uganda 2026.",
    category: "Organisation",
    publishedAt: new Date("2026-07-26T09:00:00+03:00")
  },
  {
    title: "Innovation Showcase Opens For WSW Uganda 2026",
    excerpt:
      "Academic institutions, student engineering teams, astronomy clubs, and private innovators are invited to prepare space-STEAM submissions for curated inclusion.",
    content:
      "The WSW Uganda 2026 Innovation Showcase follows the Curate, Coordinate, Catalyse model. Submissions should be relevant, technically sound, safe, feasible, original, and engaging for the public.",
    category: "WSW 2026",
    publishedAt: new Date("2026-08-01T09:00:00+03:00")
  }
] as const;

async function upsertTeamMember(member: TeamSeed) {
  const existing = await prisma.teamMember.findFirst({
    where: { name: member.name, organisation: member.organisation }
  });

  const data = {
    role: member.role,
    bio: member.bio,
    photoUrl: member.photoUrl ?? null,
    sortOrder: member.sortOrder,
    featured: member.featured,
    published: true
  };

  if (existing) {
    return prisma.teamMember.update({ where: { id: existing.id }, data });
  }

  return prisma.teamMember.create({
    data: {
      name: member.name,
      organisation: member.organisation,
      ...data
    }
  });
}

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@space.org.ug";
  const password = process.env.ADMIN_PASSWORD ?? "ChangeThisBeforeLaunch123!";
  const name = process.env.ADMIN_NAME ?? "Space Uganda Admin";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: { name, passwordHash, role: Role.ADMIN, active: true },
    create: { email, name, passwordHash, role: Role.ADMIN, active: true }
  });

  const campaign = await prisma.campaign.upsert({
    where: { slug: "world-space-week-uganda-2026" },
    update: {
      name: "World Space Week Uganda 2026",
      theme: "Rocket Revolution",
      startsAt: new Date("2026-10-04T00:00:00+03:00"),
      endsAt: new Date("2026-10-10T23:59:00+03:00"),
      description:
        "Uganda's flagship national campaign for World Space Week 2026, connecting Rocket Revolution to astronomy, Earth observation, aerospace engineering, and local innovation.",
      heroImageUrl: "/assets/wsw-2026-save-the-date.png",
      status: PublicationStatus.PUBLISHED
    },
    create: {
      name: "World Space Week Uganda 2026",
      slug: "world-space-week-uganda-2026",
      theme: "Rocket Revolution",
      startsAt: new Date("2026-10-04T00:00:00+03:00"),
      endsAt: new Date("2026-10-10T23:59:00+03:00"),
      description:
        "Uganda's flagship national campaign for World Space Week 2026, connecting Rocket Revolution to astronomy, Earth observation, aerospace engineering, and local innovation.",
      heroImageUrl: "/assets/wsw-2026-save-the-date.png",
      status: PublicationStatus.PUBLISHED
    }
  });

  const programme = [
    {
      id: "wsw-2026-earth-space-for-uganda",
      title: "Earth & Space for Uganda",
      track: "Earth Observation",
      leadOrganisation:
        "StellarView, NOAS, Uganda Astronomical Society, GIS community, and partner universities",
      description:
        "Earth observation, climate, water, food security, and Uganda's space journey through practical satellite-data applications.",
      sortOrder: 1
    },
    {
      id: "wsw-2026-rocket-revolution",
      title: "The Rocket Revolution",
      track: "Aerospace Engineering",
      leadOrganisation: "NOA's Quest, Nakuja Project, and Uganda Astronomical Society",
      description:
        "Mechanical rocket engineering demonstrations, launch systems, propulsion concepts, and safe simulations.",
      sortOrder: 2
    },
    {
      id: "wsw-2026-beyond-earth",
      title: "Beyond Earth",
      track: "Frontier Space Systems",
      leadOrganisation:
        "Space Junkies Uganda, NOAS, Nakuja Project, Uganda Astronomical Society, NOA, and university partners",
      description:
        "Satellite communications, AI, robotics, astrobiology, space medicine, and planetary engineering.",
      sortOrder: 3
    },
    {
      id: "wsw-2026-stargazing",
      title: "Outdoor Stargazing And Night Sky Experience",
      track: "Astronomy",
      leadOrganisation: "Uganda Astronomical Society",
      description:
        "A standalone evening experience with telescopes, astrophotography stations, constellation tours, and public night-sky interpretation.",
      sortOrder: 4
    }
  ];

  for (const item of programme) {
    await prisma.wswProgrammeItem.upsert({
      where: { id: item.id },
      update: {
        campaignId: campaign.id,
        title: item.title,
        track: item.track,
        leadOrganisation: item.leadOrganisation,
        description: item.description,
        sortOrder: item.sortOrder,
        format: EventFormat.PHYSICAL,
        published: true
      },
      create: {
        id: item.id,
        campaignId: campaign.id,
        title: item.title,
        track: item.track,
        leadOrganisation: item.leadOrganisation,
        description: item.description,
        sortOrder: item.sortOrder,
        format: EventFormat.PHYSICAL,
        published: true
      }
    });
  }

  for (const community of communities) {
    await prisma.community.upsert({
      where: { slug: slugify(community.name) },
      update: {
        ...community,
        slug: slugify(community.name),
        published: true
      },
      create: {
        ...community,
        slug: slugify(community.name),
        published: true
      }
    });
  }

  for (const member of team) {
    await upsertTeamMember(member);
  }

  for (const partner of partners) {
    await prisma.partner.upsert({
      where: { slug: slugify(partner.name) },
      update: {
        ...partner,
        slug: slugify(partner.name),
        published: true
      },
      create: {
        ...partner,
        slug: slugify(partner.name),
        published: true
      }
    });
  }

  for (const announcement of announcements) {
    await prisma.announcement.upsert({
      where: { slug: slugify(announcement.title) },
      update: {
        ...announcement,
        slug: slugify(announcement.title),
        status: PublicationStatus.PUBLISHED
      },
      create: {
        ...announcement,
        slug: slugify(announcement.title),
        status: PublicationStatus.PUBLISHED
      }
    });
  }

  await prisma.event.upsert({
    where: { slug: "world-space-week-uganda-2026-flagship-day" },
    update: {
      campaignId: campaign.id,
      title: "WSW Uganda 2026 Flagship Physical Day",
      startsAt: new Date("2026-10-10T09:00:00+03:00"),
      endsAt: new Date("2026-10-10T21:00:00+03:00"),
      location: "Kampala, Uganda",
      format: EventFormat.PHYSICAL,
      description:
        "A full-day national experience moving from mission briefing through immersive exhibits, the Innovation Showcase, a space economy panel, and outdoor stargazing.",
      registrationUrl: null,
      status: PublicationStatus.PUBLISHED
    },
    create: {
      campaignId: campaign.id,
      title: "WSW Uganda 2026 Flagship Physical Day",
      slug: "world-space-week-uganda-2026-flagship-day",
      startsAt: new Date("2026-10-10T09:00:00+03:00"),
      endsAt: new Date("2026-10-10T21:00:00+03:00"),
      location: "Kampala, Uganda",
      format: EventFormat.PHYSICAL,
      description:
        "A full-day national experience moving from mission briefing through immersive exhibits, the Innovation Showcase, a space economy panel, and outdoor stargazing.",
      registrationUrl: null,
      status: PublicationStatus.PUBLISHED
    }
  });

  const settings = [
    {
      key: "site.tagline",
      value: "Curate. Coordinate. Catalyse."
    },
    {
      key: "site.contactEmail",
      value: "hello@space.org.ug"
    },
    {
      key: "site.socialLinks",
      value: {
        website: "https://space.org.ug",
        worldSpaceWeek: "https://www.worldspaceweek.org/"
      }
    }
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
