import { slugify } from "@/lib/slug";

const now = new Date("2026-07-26T00:00:00+03:00");

function baseRecord() {
  return {
    createdAt: now,
    updatedAt: now
  };
}

export const fallbackCommunities = [
  {
    name: "Space Junkies Uganda",
    category: "Space Outreach",
    summary: "A youth-facing community making space science accessible across Uganda.",
    description:
      "Space Junkies Uganda supports public outreach, youth engagement, and national coordination for space education and opportunity access.",
    location: "Kampala",
    featured: true
  },
  {
    name: "StellarView Technologies",
    category: "Space Arts And Outreach",
    summary: "A technology and creative outreach organisation for space storytelling.",
    description:
      "StellarView Technologies contributes visual programming, space arts, science communication, and public engagement capacity.",
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
    summary: "A major academic partner for engineering, science, research, and student mobilisation.",
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
    summary: "An aviation organisation contributing aerospace and inclusion perspectives.",
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
      "KTA supports conversations around policy, regulation, innovation, and responsible technology ecosystems.",
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
    summary: "A Makerere student chapter focused on aerospace and electronic systems.",
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
    summary: "A community for aeromodelling, practical aerospace learning, and youth-friendly demos.",
    description:
      "Aerobuddies contributes model-building, public-facing engineering activities, and practical aerospace demonstrations.",
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
    summary: "A student developer community supporting technical participation.",
    description:
      "GDG On Campus Makerere University helps connect software, data, and developer communities to space applications and public innovation.",
    location: "Makerere University",
    featured: false
  },
  {
    name: "Uganda Space Community",
    category: "Community Network",
    summary: "The wider volunteer and mobilisation network for Uganda's space enthusiasts.",
    description:
      "Uganda Space Community represents volunteers, enthusiasts, and organisers helping build a national space ecosystem.",
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
    summary: "A science and technology university relevant to remote sensing and geospatial work.",
    description:
      "MUST is identified as a potential research partner for remote sensing, geospatial education, and applied science engagement.",
    location: "Mbarara",
    featured: false
  },
  {
    name: "Busitema University",
    category: "University",
    summary: "A university in the national science and engineering partner landscape.",
    description:
      "Busitema University is included in the stakeholder map for future space education and innovation collaboration.",
    location: "Uganda",
    featured: false
  },
  {
    name: "Uganda Christian University",
    category: "University",
    summary: "A university partner in the wider WSW Uganda stakeholder map.",
    description:
      "Uganda Christian University is part of the academic network for outreach, innovation, and student participation.",
    location: "Mukono",
    featured: false
  },
  {
    name: "Nkumba University",
    category: "University",
    summary: "A university partner in the Uganda Space Week stakeholder landscape.",
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
    name: "UAS",
    category: "Community",
    summary: "A community partner referenced in the Uganda Space Week organising ecosystem.",
    description:
      "UAS is included as part of the broader partner network and can be expanded by administrators as details are confirmed.",
    location: "Uganda",
    featured: false
  }
].map((community, index) => ({
  ...baseRecord(),
  ...community,
  id: `fallback-community-${index + 1}`,
  slug: slugify(community.name),
  logoUrl: null,
  websiteUrl: null,
  socialLinks: null,
  contactEmail: null,
  published: true
}));

export const fallbackTeamMembers = [
  {
    name: "Ronnie Atuhaire",
    role: "National Coordinator, WSW Uganda 2026",
    organisation: "Space Junkies Uganda",
    bio: "Ronnie leads national coordination, ecosystem convening, youth outreach, and partner mobilisation for Space Uganda and WSW Uganda 2026.",
    featured: true
  },
  {
    name: "Zoora Harrison",
    role: "National Coordinator, WSW Uganda 2026",
    organisation: "StellarView Technologies",
    bio: "Zoora supports national coordination, space arts, storytelling, programme delivery, and public engagement for the 2026 campaign.",
    featured: true
  },
  {
    name: "Uganda Astronomical Society Programming Team",
    role: "Astronomy And Stargazing Lead",
    organisation: "Uganda Astronomical Society",
    bio: "The astronomy team supports telescope experiences, night-sky interpretation, observation sessions, and public astronomy education.",
    featured: false
  },
  {
    name: "IEEE Makerere Student Branch Organising Team",
    role: "Student Mobilisation Partner",
    organisation: "IEEE Makerere Student Branch",
    bio: "The student branch helps mobilise students, technical volunteers, engineering sessions, and university community participation.",
    featured: false
  }
].map((member, index) => ({
  ...baseRecord(),
  ...member,
  id: `fallback-team-${index + 1}`,
  photoUrl: null,
  email: null,
  links: null,
  sortOrder: index + 1,
  published: true
}));

export const fallbackProgrammeItems = [
  {
    id: "fallback-programme-earth-space-for-uganda",
    title: "Earth & Space for Uganda",
    track: "Earth Observation",
    leadOrganisation:
      "StellarView, NOAS, Uganda Astronomical Society, GIS community, and partner universities",
    description:
      "Earth observation, climate, water, food security, and Uganda's space journey through practical satellite-data applications.",
    format: "PHYSICAL",
    sortOrder: 1,
    published: true
  },
  {
    id: "fallback-programme-rocket-revolution",
    title: "The Rocket Revolution",
    track: "Aerospace Engineering",
    leadOrganisation: "NOA's Quest, Nakuja Project, and Uganda Astronomical Society",
    description:
      "Mechanical rocket engineering demonstrations, launch systems, propulsion concepts, and safe simulations.",
    format: "PHYSICAL",
    sortOrder: 2,
    published: true
  },
  {
    id: "fallback-programme-beyond-earth",
    title: "Beyond Earth",
    track: "Frontier Space Systems",
    leadOrganisation:
      "Space Junkies Uganda, NOAS, Nakuja Project, Uganda Astronomical Society, NOA, and university partners",
    description:
      "Satellite communications, AI, robotics, astrobiology, space medicine, and planetary engineering.",
    format: "PHYSICAL",
    sortOrder: 3,
    published: true
  },
  {
    id: "fallback-programme-stargazing",
    title: "Outdoor Stargazing And Night Sky Experience",
    track: "Astronomy",
    leadOrganisation: "Uganda Astronomical Society",
    description:
      "A standalone evening experience with telescopes, astrophotography stations, constellation tours, and public night-sky interpretation.",
    format: "PHYSICAL",
    sortOrder: 4,
    published: true
  }
].map((item) => ({
  ...baseRecord(),
  ...item,
  campaignId: "fallback-campaign-wsw-2026",
  startsAt: null,
  endsAt: null,
  location: "Kampala, Uganda"
}));

export const fallbackCampaign = {
  ...baseRecord(),
  id: "fallback-campaign-wsw-2026",
  name: "World Space Week Uganda 2026",
  slug: "world-space-week-uganda-2026",
  theme: "Rocket Revolution",
  startsAt: new Date("2026-10-04T00:00:00+03:00"),
  endsAt: new Date("2026-10-10T23:59:00+03:00"),
  description:
    "Uganda's flagship national campaign for World Space Week 2026, connecting Rocket Revolution to astronomy, Earth observation, aerospace engineering, and local innovation.",
  heroImageUrl: "/assets/wsw-2026-save-the-date.png",
  status: "PUBLISHED",
  programmeItems: fallbackProgrammeItems,
  events: [
    {
      ...baseRecord(),
      id: "fallback-event-flagship-day",
      campaignId: "fallback-campaign-wsw-2026",
      title: "WSW Uganda 2026 Flagship Physical Day",
      slug: "world-space-week-uganda-2026-flagship-day",
      startsAt: new Date("2026-10-10T09:00:00+03:00"),
      endsAt: new Date("2026-10-10T21:00:00+03:00"),
      location: "Kampala, Uganda",
      format: "PHYSICAL",
      description:
        "A full-day national experience moving from mission briefing through immersive exhibits, the Innovation Showcase, a space economy panel, and outdoor stargazing.",
      registrationUrl: null,
      status: "PUBLISHED"
    }
  ]
};

export const fallbackPartners = fallbackCommunities
  .filter((community) => community.featured)
  .slice(0, 8)
  .map((community, index) => ({
    ...baseRecord(),
    id: `fallback-partner-${index + 1}`,
    name: community.name,
    slug: community.slug,
    type: community.category,
    logoUrl: null,
    websiteUrl: null,
    description: community.summary,
    contribution: null,
    featured: true,
    published: true
  }));

export const fallbackAnnouncements = [
  {
    title: "Space Uganda Opens As A Year-Round Umbrella",
    excerpt:
      "The ecosystem is organising under one national domain for communities, campaigns, partners, and public opportunities.",
    category: "Ecosystem",
    content:
      "Space Uganda is being built as the shared year-round home for Uganda's space enthusiasts, organisations, universities, companies, and volunteer communities.",
    publishedAt: now
  },
  {
    title: "WSW Uganda 2026 Theme Confirmed",
    excerpt:
      "World Space Week 2026 will run under the global theme Rocket Revolution from October 4-10.",
    category: "World Space Week",
    content:
      "Uganda's 2026 campaign will connect Rocket Revolution to aerospace engineering, Earth observation, astronomy, innovation, and public space education.",
    publishedAt: now
  },
  {
    title: "Gallery Archive Being Prepared",
    excerpt:
      "The public gallery is ready for photos and videos from Uganda Space Week activities.",
    category: "Gallery",
    content:
      "The site includes a gallery structure that administrators can populate with event images, captions, videos, and featured moments.",
    publishedAt: now
  }
].map((announcement, index) => ({
  ...baseRecord(),
  ...announcement,
  id: `fallback-announcement-${index + 1}`,
  slug: slugify(announcement.title),
  status: "PUBLISHED"
}));

export const fallbackGalleryItems = [
  {
    ...baseRecord(),
    id: "fallback-gallery-uganda-space-week-2025",
    title: "Uganda Space Week 2025",
    mediaType: "image",
    mediaUrl: "/assets/uganda-space-week-2025-main.png",
    caption: "Uganda's first local World Space Week celebration at Makerere.",
    eventId: null,
    eventDate: new Date("2025-10-10T00:00:00+03:00"),
    featured: true,
    published: true
  },
  {
    ...baseRecord(),
    id: "fallback-gallery-wsw-2026",
    title: "World Space Week Uganda 2026",
    mediaType: "image",
    mediaUrl: "/assets/wsw-2026-save-the-date.png",
    caption: "Save the date for the 2026 Rocket Revolution campaign.",
    eventId: null,
    eventDate: new Date("2026-10-04T00:00:00+03:00"),
    featured: true,
    published: true
  }
];

export const fallbackHomeContent = {
  featuredCommunities: fallbackCommunities.filter((community) => community.featured).slice(0, 6),
  announcements: fallbackAnnouncements,
  campaign: fallbackCampaign,
  partners: fallbackPartners
};
