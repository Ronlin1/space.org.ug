export type AdminResourceModel =
  | "announcement"
  | "campaign"
  | "community"
  | "event"
  | "galleryItem"
  | "partner"
  | "siteSetting"
  | "submission"
  | "teamMember"
  | "wswProgrammeItem";

export type AdminResourceFieldType =
  | "checkbox"
  | "datetime"
  | "email"
  | "json"
  | "number"
  | "select"
  | "text"
  | "textarea"
  | "url";

export type AdminResourceField = {
  name: string;
  label: string;
  type: AdminResourceFieldType;
  required?: boolean;
  helpText?: string;
  options?: { label: string; value: string }[];
};

export type AdminResourceConfig = {
  slug: string;
  label: string;
  singularLabel: string;
  model: AdminResourceModel;
  description: string;
  fields: AdminResourceField[];
  listFields: string[];
  allowCreate?: boolean;
  allowDelete?: boolean;
};

const publicationStatusOptions = [
  { label: "Draft", value: "DRAFT" },
  { label: "Published", value: "PUBLISHED" },
  { label: "Archived", value: "ARCHIVED" }
];

const eventFormatOptions = [
  { label: "Virtual", value: "VIRTUAL" },
  { label: "Physical", value: "PHYSICAL" },
  { label: "Hybrid", value: "HYBRID" }
];

const submissionTypeOptions = [
  { label: "Join", value: "JOIN" },
  { label: "Partner", value: "PARTNER" },
  { label: "Innovation", value: "INNOVATION" },
  { label: "Contact", value: "CONTACT" }
];

const submissionStatusOptions = [
  { label: "New", value: "NEW" },
  { label: "Under Review", value: "UNDER_REVIEW" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "Needs Changes", value: "NEEDS_CHANGES" },
  { label: "Declined", value: "DECLINED" },
  { label: "Archived", value: "ARCHIVED" }
];

export const adminResources: AdminResourceConfig[] = [
  {
    slug: "communities",
    label: "Communities",
    singularLabel: "Community",
    model: "community",
    description: "Organisations, universities, clubs, student branches, companies, and networks.",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      {
        name: "slug",
        label: "Slug",
        type: "text",
        helpText: "Leave blank to derive from the name."
      },
      { name: "category", label: "Category", type: "text", required: true },
      { name: "summary", label: "Summary", type: "textarea", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "logoUrl", label: "Logo URL", type: "url" },
      { name: "websiteUrl", label: "Website URL", type: "url" },
      { name: "socialLinks", label: "Social Links JSON", type: "json" },
      { name: "contactEmail", label: "Contact Email", type: "email" },
      { name: "location", label: "Location", type: "text" },
      { name: "featured", label: "Featured", type: "checkbox" },
      { name: "published", label: "Published", type: "checkbox" }
    ],
    listFields: ["name", "category", "location", "featured", "published"]
  },
  {
    slug: "team",
    label: "Team",
    singularLabel: "Team Member",
    model: "teamMember",
    description: "National coordinators, organisers, advisors, technical leads, and volunteers.",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "role", label: "Role", type: "text", required: true },
      { name: "organisation", label: "Organisation", type: "text", required: true },
      { name: "bio", label: "Bio", type: "textarea", required: true },
      { name: "photoUrl", label: "Photo URL", type: "url" },
      { name: "email", label: "Email", type: "email" },
      { name: "links", label: "Links JSON", type: "json" },
      { name: "sortOrder", label: "Sort Order", type: "number" },
      { name: "featured", label: "Featured", type: "checkbox" },
      { name: "published", label: "Published", type: "checkbox" }
    ],
    listFields: ["name", "role", "organisation", "featured", "published"]
  },
  {
    slug: "partners",
    label: "Partners",
    singularLabel: "Partner",
    model: "partner",
    description: "Sponsor, delivery, technical, media, academic, and community partners.",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      {
        name: "slug",
        label: "Slug",
        type: "text",
        helpText: "Leave blank to derive from the name."
      },
      { name: "type", label: "Type", type: "text", required: true },
      { name: "logoUrl", label: "Logo URL", type: "url" },
      { name: "websiteUrl", label: "Website URL", type: "url" },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "contribution", label: "Contribution", type: "textarea" },
      { name: "featured", label: "Featured", type: "checkbox" },
      { name: "published", label: "Published", type: "checkbox" }
    ],
    listFields: ["name", "type", "featured", "published"]
  },
  {
    slug: "campaigns",
    label: "Campaigns",
    singularLabel: "Campaign",
    model: "campaign",
    description: "Major Space Uganda campaigns, including WSW Uganda 2026.",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      {
        name: "slug",
        label: "Slug",
        type: "text",
        helpText: "Leave blank to derive from the campaign name."
      },
      { name: "theme", label: "Theme", type: "text", required: true },
      { name: "startsAt", label: "Starts At", type: "datetime", required: true },
      { name: "endsAt", label: "Ends At", type: "datetime", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "heroImageUrl", label: "Hero Image URL", type: "url" },
      {
        name: "status",
        label: "Status",
        type: "select",
        required: true,
        options: publicationStatusOptions
      }
    ],
    listFields: ["name", "theme", "startsAt", "status"],
    allowDelete: false
  },
  {
    slug: "wsw-programme",
    label: "WSW Programme",
    singularLabel: "Programme Item",
    model: "wswProgrammeItem",
    description: "Tracks, sessions, experiences, and lead organisations for WSW Uganda.",
    fields: [
      {
        name: "campaignId",
        label: "Campaign ID",
        type: "text",
        required: true,
        helpText: "Use the campaign ID shown on the Campaigns screen."
      },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "startsAt", label: "Starts At", type: "datetime" },
      { name: "endsAt", label: "Ends At", type: "datetime" },
      { name: "location", label: "Location", type: "text" },
      { name: "format", label: "Format", type: "select", required: true, options: eventFormatOptions },
      { name: "track", label: "Track", type: "text", required: true },
      {
        name: "leadOrganisation",
        label: "Lead Organisation",
        type: "text",
        required: true
      },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "sortOrder", label: "Sort Order", type: "number" },
      { name: "published", label: "Published", type: "checkbox" }
    ],
    listFields: ["title", "track", "leadOrganisation", "published"]
  },
  {
    slug: "events",
    label: "Events",
    singularLabel: "Event",
    model: "event",
    description: "Public events, campaign sessions, workshops, and WSW activity listings.",
    fields: [
      { name: "campaignId", label: "Campaign ID", type: "text" },
      { name: "title", label: "Title", type: "text", required: true },
      {
        name: "slug",
        label: "Slug",
        type: "text",
        helpText: "Leave blank to derive from the event title."
      },
      { name: "startsAt", label: "Starts At", type: "datetime", required: true },
      { name: "endsAt", label: "Ends At", type: "datetime" },
      { name: "location", label: "Location", type: "text", required: true },
      { name: "format", label: "Format", type: "select", required: true, options: eventFormatOptions },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "registrationUrl", label: "Registration URL", type: "url" },
      {
        name: "status",
        label: "Status",
        type: "select",
        required: true,
        options: publicationStatusOptions
      }
    ],
    listFields: ["title", "startsAt", "location", "format", "status"]
  },
  {
    slug: "gallery",
    label: "Gallery",
    singularLabel: "Gallery Item",
    model: "galleryItem",
    description: "Images, videos, captions, event memories, and featured media.",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "mediaType", label: "Media Type", type: "text", required: true },
      { name: "mediaUrl", label: "Media URL", type: "url", required: true },
      { name: "caption", label: "Caption", type: "textarea" },
      { name: "eventId", label: "Event ID", type: "text" },
      { name: "eventDate", label: "Event Date", type: "datetime" },
      { name: "featured", label: "Featured", type: "checkbox" },
      { name: "published", label: "Published", type: "checkbox" }
    ],
    listFields: ["title", "mediaType", "eventDate", "featured", "published"]
  },
  {
    slug: "announcements",
    label: "Announcements",
    singularLabel: "Announcement",
    model: "announcement",
    description: "News, public updates, calls for speakers, schedules, and press notes.",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      {
        name: "slug",
        label: "Slug",
        type: "text",
        helpText: "Leave blank to derive from the announcement title."
      },
      { name: "excerpt", label: "Excerpt", type: "textarea", required: true },
      { name: "content", label: "Content", type: "textarea", required: true },
      { name: "category", label: "Category", type: "text", required: true },
      {
        name: "status",
        label: "Status",
        type: "select",
        required: true,
        options: publicationStatusOptions
      },
      { name: "publishedAt", label: "Published At", type: "datetime" }
    ],
    listFields: ["title", "category", "publishedAt", "status"]
  },
  {
    slug: "submissions",
    label: "Submissions",
    singularLabel: "Submission",
    model: "submission",
    description: "Join, partner, innovation, and contact submissions from public forms.",
    fields: [
      { name: "type", label: "Type", type: "select", required: true, options: submissionTypeOptions },
      {
        name: "status",
        label: "Status",
        type: "select",
        required: true,
        options: submissionStatusOptions
      },
      { name: "submitterName", label: "Submitter Name", type: "text", required: true },
      { name: "submitterEmail", label: "Submitter Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "text" },
      { name: "organisation", label: "Organisation", type: "text" },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "category", label: "Category", type: "text" },
      { name: "abstract", label: "Abstract", type: "textarea", required: true },
      { name: "supportNeeds", label: "Support Needs", type: "textarea" },
      { name: "safetyNotes", label: "Safety Notes", type: "textarea" },
      { name: "linkUrl", label: "Link URL", type: "url" },
      { name: "reviewerNotes", label: "Reviewer Notes", type: "textarea" }
    ],
    listFields: ["type", "status", "submitterName", "title", "createdAt"],
    allowCreate: false,
    allowDelete: false
  },
  {
    slug: "settings",
    label: "Site Settings",
    singularLabel: "Setting",
    model: "siteSetting",
    description: "Structured settings for site-wide text, links, contact details, and metadata.",
    fields: [
      { name: "key", label: "Key", type: "text", required: true },
      {
        name: "value",
        label: "Value JSON",
        type: "json",
        required: true,
        helpText: "Use valid JSON. Strings must be wrapped in quotes."
      }
    ],
    listFields: ["key", "value"],
    allowDelete: false
  }
];

export function getResourceConfig(slug: string) {
  return adminResources.find((resource) => resource.slug === slug) ?? null;
}
