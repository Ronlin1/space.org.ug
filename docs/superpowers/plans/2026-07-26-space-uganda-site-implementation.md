# Space Uganda Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full-stack, responsive Space Uganda website with a PostgreSQL-backed authenticated admin dashboard and a dedicated WSW 2026 campaign area.

**Architecture:** Create a Next.js App Router application inside `space-uganda-site/`, with Prisma as the database layer, credentials-based admin auth, server-side protected admin routes, and seeded content from the WSW folder. Public pages read published content from the database with graceful empty states; admin pages provide CRUD for every dynamic content area.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, bcryptjs, jose, zod, lucide-react, Vitest, Testing Library, Playwright.

## Global Constraints

- The public website represents Space Uganda as the year-round umbrella organisation for Uganda's space ecosystem.
- World Space Week Uganda 2026 is a featured campaign, not the whole site identity.
- WSW 2026 route is `/wsw-2026`.
- Admin route is `/admin`.
- Use a real authenticated admin dashboard backed by PostgreSQL.
- Use Prisma ORM.
- Store secrets only in `.env`; commit `.env.example`.
- Passwords must be hashed.
- Admin routes must require authentication.
- Submission data must not expose emails or phone numbers publicly.
- Gallery section must exist at launch and support admin-managed items added later.
- Public site must be fully responsive across mobile, tablet, and desktop.
- Admin UI should be dense, calm, and operational.
- Keep original WSW source materials intact in `C:\Users\ronli\Downloads\WSW`.
- Application code lives in `space-uganda-site/`.
- GitHub target organisation display name is `Space Uganda`; likely slug is `space-uganda`.
- GitHub repository name is `space-org-ug`.
- If GitHub organisation creation requires interactive browser/account confirmation, prepare the repository locally and document the exact blocker.

---

## File Structure

Create this application tree:

```text
space-uganda-site/
  .env.example
  .gitignore
  README.md
  docker-compose.yml
  eslint.config.mjs
  next.config.ts
  package.json
  postcss.config.mjs
  tailwind.config.ts
  tsconfig.json
  vitest.config.ts
  playwright.config.ts
  prisma/
    schema.prisma
    seed.ts
  public/
    assets/
      wsw-2026-save-the-date.png
      wsw-2026-did-you-know.png
      wsw-2026-myth-or-fact.png
      uganda-space-week-2025-main.png
      world-space-week-logo.png
  src/
    app/
      globals.css
      layout.tsx
      page.tsx
      about/page.tsx
      communities/page.tsx
      team/page.tsx
      gallery/page.tsx
      updates/page.tsx
      join/page.tsx
      join/actions.ts
      wsw-2026/page.tsx
      admin/login/page.tsx
      admin/login/actions.ts
      admin/layout.tsx
      admin/page.tsx
      admin/[resource]/page.tsx
      admin/[resource]/new/page.tsx
      admin/[resource]/[id]/page.tsx
      admin/[resource]/actions.ts
    components/
      admin/AdminShell.tsx
      admin/DeleteButton.tsx
      admin/FieldRenderer.tsx
      admin/ResourceForm.tsx
      admin/ResourceTable.tsx
      site/Footer.tsx
      site/Header.tsx
      site/Hero.tsx
      site/Logo.tsx
      site/MobileNav.tsx
      ui/Button.tsx
      ui/Card.tsx
      ui/Input.tsx
      ui/Section.tsx
      ui/Textarea.tsx
    lib/
      admin/crud.ts
      admin/resources.ts
      auth/password.ts
      auth/session.ts
      auth/require-admin.ts
      content/public.ts
      constants.ts
      db.ts
      routes.ts
      slug.ts
      validation.ts
    test/
      setup.ts
      slug.test.ts
      validation.test.ts
      auth-session.test.ts
      admin-resources.test.ts
    e2e/
      public-site.spec.ts
      admin.spec.ts
```

The root WSW folder keeps planning docs and source assets. The app directory is self-contained and suitable to push to GitHub.

---

### Task 1: Scaffold The Next.js Application And Tooling

**Files:**
- Create: `space-uganda-site/package.json`
- Create: `space-uganda-site/tsconfig.json`
- Create: `space-uganda-site/next.config.ts`
- Create: `space-uganda-site/tailwind.config.ts`
- Create: `space-uganda-site/postcss.config.mjs`
- Create: `space-uganda-site/eslint.config.mjs`
- Create: `space-uganda-site/vitest.config.ts`
- Create: `space-uganda-site/playwright.config.ts`
- Create: `space-uganda-site/src/test/setup.ts`
- Create: `space-uganda-site/src/app/globals.css`
- Create: `space-uganda-site/src/app/layout.tsx`
- Create: `space-uganda-site/.env.example`
- Create: `space-uganda-site/.gitignore`
- Create: `space-uganda-site/docker-compose.yml`
- Create: `space-uganda-site/public/assets/*`

**Interfaces:**
- Produces: runnable app shell with scripts `dev`, `build`, `lint`, `test`, `test:e2e`, `db:generate`, `db:push`, `db:seed`.
- Produces: CSS design tokens used by all public and admin components.

- [ ] **Step 1: Create the app directory**

Run:

```powershell
New-Item -ItemType Directory -Force -Path "C:\Users\ronli\Downloads\WSW\space-uganda-site"
```

Expected: directory exists.

- [ ] **Step 2: Write `package.json`**

Create `space-uganda-site/package.json` with:

```json
{
  "name": "space-org-ug",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:seed": "tsx prisma/seed.ts",
    "db:studio": "prisma studio"
  },
  "dependencies": {
    "@prisma/client": "^6.0.0",
    "bcryptjs": "^2.4.3",
    "clsx": "^2.1.1",
    "jose": "^5.9.6",
    "lucide-react": "^0.468.0",
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwind-merge": "^2.5.5",
    "zod": "^3.24.1"
  },
  "devDependencies": {
    "@playwright/test": "^1.49.0",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@types/bcryptjs": "^2.4.6",
    "@types/node": "^22.10.2",
    "@types/react": "^19.0.1",
    "@types/react-dom": "^19.0.1",
    "eslint": "^9.17.0",
    "eslint-config-next": "^15.0.0",
    "jsdom": "^25.0.1",
    "postcss": "^8.4.49",
    "prisma": "^6.0.0",
    "tailwindcss": "^3.4.17",
    "tsx": "^4.19.2",
    "typescript": "^5.7.2",
    "vitest": "^2.1.8"
  }
}
```

- [ ] **Step 3: Write TypeScript and Next config**

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

Create `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" }
    ]
  }
};

export default nextConfig;
```

- [ ] **Step 4: Write Tailwind and global CSS**

Create `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        space: {
          950: "#050816",
          900: "#08111f",
          800: "#102033",
          700: "#17334d",
          100: "#e7eef8"
        },
        orbit: "#7c3aed",
        ugandaGold: "#f7c948",
        ugandaGreen: "#22c55e"
      },
      boxShadow: {
        soft: "0 20px 60px rgba(0, 0, 0, 0.28)"
      }
    }
  },
  plugins: []
};

export default config;
```

Create `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #050816;
  color: #e7eef8;
  font-family: Arial, Helvetica, sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
textarea,
select {
  font: inherit;
}
```

- [ ] **Step 5: Write lint, test, and Playwright configs**

Create `eslint.config.mjs`:

```js
import next from "eslint-config-next";

export default [...next];
```

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true
  }
});
```

Create `src/test/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

Create `playwright.config.ts`:

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: true,
    timeout: 120000
  },
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "retain-on-failure"
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 5"] } }
  ]
});
```

- [ ] **Step 6: Write environment and Docker files**

Create `.env.example`:

```dotenv
DATABASE_URL="postgresql://space_uganda:space_uganda_dev@localhost:5432/space_uganda?schema=public"
AUTH_SECRET="replace-with-a-long-random-secret"
ADMIN_EMAIL="admin@space.org.ug"
ADMIN_PASSWORD="ChangeThisBeforeLaunch123!"
ADMIN_NAME="Space Uganda Admin"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Create `.gitignore`:

```gitignore
node_modules/
.next/
coverage/
playwright-report/
test-results/
.env
.env*.local
prisma/dev.db
*.log
```

Create `docker-compose.yml`:

```yaml
services:
  postgres:
    image: postgres:16
    restart: unless-stopped
    environment:
      POSTGRES_DB: space_uganda
      POSTGRES_USER: space_uganda
      POSTGRES_PASSWORD: space_uganda_dev
    ports:
      - "5432:5432"
    volumes:
      - space_uganda_postgres:/var/lib/postgresql/data

volumes:
  space_uganda_postgres:
```

- [ ] **Step 7: Copy selected source assets into app public assets**

Copy:

```powershell
Copy-Item "C:\Users\ronli\Downloads\WSW\2026\World Space Week Save The Date.png" "C:\Users\ronli\Downloads\WSW\space-uganda-site\public\assets\wsw-2026-save-the-date.png"
Copy-Item "C:\Users\ronli\Downloads\WSW\2026\Did you know_.png" "C:\Users\ronli\Downloads\WSW\space-uganda-site\public\assets\wsw-2026-did-you-know.png"
Copy-Item "C:\Users\ronli\Downloads\WSW\2026\Myth or Fact_.png" "C:\Users\ronli\Downloads\WSW\space-uganda-site\public\assets\wsw-2026-myth-or-fact.png"
Copy-Item "C:\Users\ronli\Downloads\WSW\Uganda Space Week - MAIN.png" "C:\Users\ronli\Downloads\WSW\space-uganda-site\public\assets\uganda-space-week-2025-main.png"
Copy-Item "C:\Users\ronli\Downloads\WSW\WSW_AllLogos\World Space Week Logos\October4-10\PNG\World Space Week-01.png" "C:\Users\ronli\Downloads\WSW\space-uganda-site\public\assets\world-space-week-logo.png"
```

Expected: five image assets exist in `public/assets`.

- [ ] **Step 8: Install dependencies**

Run:

```powershell
npm install
```

Expected: `node_modules/` and `package-lock.json` are created.

- [ ] **Step 9: Verify scaffold**

Run:

```powershell
npm run test
npm run build
```

Expected: tests pass and build succeeds for the empty shell.

- [ ] **Step 10: Commit scaffold**

Run:

```powershell
git add space-uganda-site
git commit -m "feat: scaffold Space Uganda web app"
```

Expected: commit contains only app scaffold and selected optimized assets.

---

### Task 2: Implement Database Schema, Seed Data, And Public Query Layer

**Files:**
- Create: `space-uganda-site/prisma/schema.prisma`
- Create: `space-uganda-site/prisma/seed.ts`
- Create: `space-uganda-site/src/lib/db.ts`
- Create: `space-uganda-site/src/lib/slug.ts`
- Create: `space-uganda-site/src/lib/constants.ts`
- Create: `space-uganda-site/src/lib/content/public.ts`
- Create: `space-uganda-site/src/test/slug.test.ts`

**Interfaces:**
- Produces: `prisma` client with models `User`, `TeamMember`, `Community`, `Partner`, `Campaign`, `WswProgrammeItem`, `Event`, `GalleryItem`, `Announcement`, `Submission`, `SiteSetting`.
- Produces: `slugify(value: string): string`.
- Produces: public query functions `getHomeContent()`, `getCommunities()`, `getTeamMembers()`, `getGalleryItems()`, `getAnnouncements()`, `getWsw2026Content()`.

- [ ] **Step 1: Write failing slug tests**

Create `src/test/slug.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { slugify } from "@/lib/slug";

describe("slugify", () => {
  it("creates stable lowercase URL slugs", () => {
    expect(slugify("World Space Week Uganda 2026")).toBe("world-space-week-uganda-2026");
    expect(slugify("NOA's Quest / Rocket Revolution")).toBe("noas-quest-rocket-revolution");
    expect(slugify("  IEEE AESS SBC Makerere  ")).toBe("ieee-aess-sbc-makerere");
  });
});
```

- [ ] **Step 2: Run slug test to verify it fails**

Run:

```powershell
npm run test -- src/test/slug.test.ts
```

Expected: fail because `@/lib/slug` does not exist.

- [ ] **Step 3: Implement `slugify`**

Create `src/lib/slug.ts`:

```ts
export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
```

- [ ] **Step 4: Run slug test to verify it passes**

Run:

```powershell
npm run test -- src/test/slug.test.ts
```

Expected: pass.

- [ ] **Step 5: Write Prisma schema**

Create `prisma/schema.prisma` with PostgreSQL datasource, Prisma client generator, enums, and models:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  ADMIN
  EDITOR
}

enum PublicationStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

enum SubmissionStatus {
  NEW
  UNDER_REVIEW
  ACCEPTED
  NEEDS_CHANGES
  DECLINED
  ARCHIVED
}

enum SubmissionType {
  JOIN
  PARTNER
  INNOVATION
  CONTACT
}

enum EventFormat {
  VIRTUAL
  PHYSICAL
  HYBRID
}

model User {
  id           String   @id @default(cuid())
  email        String   @unique
  name         String
  passwordHash String
  role         Role     @default(EDITOR)
  active       Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model TeamMember {
  id           String   @id @default(cuid())
  name         String
  role         String
  organisation String
  bio          String
  photoUrl     String?
  email        String?
  links        Json?
  sortOrder    Int      @default(0)
  featured     Boolean  @default(false)
  published    Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Community {
  id          String   @id @default(cuid())
  name        String   @unique
  slug        String   @unique
  category    String
  summary     String
  description String
  logoUrl     String?
  websiteUrl  String?
  socialLinks Json?
  contactEmail String?
  location    String?
  featured    Boolean  @default(false)
  published   Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Partner {
  id           String   @id @default(cuid())
  name         String
  slug         String   @unique
  type         String
  logoUrl      String?
  websiteUrl   String?
  description  String
  contribution String?
  featured     Boolean  @default(false)
  published    Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Campaign {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  theme       String
  startsAt    DateTime
  endsAt      DateTime
  description String
  heroImageUrl String?
  status      PublicationStatus @default(DRAFT)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  programmeItems WswProgrammeItem[]
  events      Event[]
}

model WswProgrammeItem {
  id               String   @id @default(cuid())
  campaignId       String
  campaign         Campaign @relation(fields: [campaignId], references: [id], onDelete: Cascade)
  title            String
  startsAt         DateTime?
  endsAt           DateTime?
  location         String?
  format           EventFormat @default(PHYSICAL)
  track            String
  leadOrganisation String
  description      String
  sortOrder        Int @default(0)
  published        Boolean @default(true)
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}

model Event {
  id              String   @id @default(cuid())
  campaignId      String?
  campaign        Campaign? @relation(fields: [campaignId], references: [id], onDelete: SetNull)
  title           String
  slug            String   @unique
  startsAt        DateTime
  endsAt          DateTime?
  location        String
  format          EventFormat
  description     String
  registrationUrl String?
  status          PublicationStatus @default(DRAFT)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model GalleryItem {
  id          String   @id @default(cuid())
  title       String
  mediaType   String
  mediaUrl    String
  caption     String?
  eventId     String?
  eventDate   DateTime?
  featured    Boolean  @default(false)
  published   Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Announcement {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  excerpt     String
  content     String
  category    String
  status      PublicationStatus @default(DRAFT)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Submission {
  id             String   @id @default(cuid())
  type           SubmissionType
  status         SubmissionStatus @default(NEW)
  submitterName  String
  submitterEmail String
  phone          String?
  organisation   String?
  title          String
  category       String?
  abstract       String
  supportNeeds   String?
  safetyNotes    String?
  linkUrl        String?
  reviewerNotes  String?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model SiteSetting {
  id        String   @id @default(cuid())
  key       String   @unique
  value     Json
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

- [ ] **Step 6: Implement Prisma singleton**

Create `src/lib/db.ts`:

```ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"]
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

- [ ] **Step 7: Implement seed data**

Create `prisma/seed.ts` that:

- Reads `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_NAME`.
- Hashes the admin password with bcrypt.
- Upserts admin user.
- Upserts `Campaign` with slug `world-space-week-uganda-2026`.
- Upserts three `WswProgrammeItem` records for Earth & Space for Uganda, The Rocket Revolution, and Beyond Earth.
- Upserts team members Ronnie Atuhaire and Zoora Harrison.
- Upserts communities from the design spec.
- Upserts at least two announcements: launch announcement and Innovation Showcase call.
- Upserts site settings for contact email, site tagline, and social links.

Use this shape:

```ts
import bcrypt from "bcryptjs";
import { PrismaClient, Role, PublicationStatus, EventFormat } from "@prisma/client";
import { slugify } from "../src/lib/slug";

const prisma = new PrismaClient();

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
      description: "Uganda's flagship national campaign for World Space Week 2026, connecting Rocket Revolution to astronomy, Earth observation, aerospace engineering, and local innovation.",
      heroImageUrl: "/assets/wsw-2026-save-the-date.png",
      status: PublicationStatus.PUBLISHED
    },
    create: {
      name: "World Space Week Uganda 2026",
      slug: "world-space-week-uganda-2026",
      theme: "Rocket Revolution",
      startsAt: new Date("2026-10-04T00:00:00+03:00"),
      endsAt: new Date("2026-10-10T23:59:00+03:00"),
      description: "Uganda's flagship national campaign for World Space Week 2026, connecting Rocket Revolution to astronomy, Earth observation, aerospace engineering, and local innovation.",
      heroImageUrl: "/assets/wsw-2026-save-the-date.png",
      status: PublicationStatus.PUBLISHED
    }
  });

  const programme = [
    {
      title: "Earth & Space for Uganda",
      track: "Earth Observation",
      leadOrganisation: "StellarView, NOAS, Uganda Astronomical Society, GIS community, and partner universities",
      description: "Earth observation, climate, water, food security, and Uganda's space journey through practical satellite-data applications.",
      sortOrder: 1
    },
    {
      title: "The Rocket Revolution",
      track: "Aerospace Engineering",
      leadOrganisation: "NOA's Quest, Nakuja Project, and Uganda Astronomical Society",
      description: "Mechanical rocket engineering demonstrations, launch systems, propulsion concepts, and safe simulations.",
      sortOrder: 2
    },
    {
      title: "Beyond Earth",
      track: "Frontier Space Systems",
      leadOrganisation: "Space Junkies Uganda, NOAS, Nakuja Project, Uganda Astronomical Society, NOA, and university partners",
      description: "Satellite communications, AI, robotics, astrobiology, space medicine, and planetary engineering.",
      sortOrder: 3
    }
  ];

  for (const item of programme) {
    await prisma.wswProgrammeItem.upsert({
      where: { id: `${campaign.id}-${item.sortOrder}` },
      update: {},
      create: {
        id: `${campaign.id}-${item.sortOrder}`,
        campaignId: campaign.id,
        format: EventFormat.PHYSICAL,
        published: true,
        ...item
      }
    });
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
```

Extend the script with arrays for all communities, team members, announcements, partners, and settings before running it.

- [ ] **Step 8: Implement public query functions**

Create `src/lib/content/public.ts`:

```ts
import { PublicationStatus } from "@prisma/client";
import { prisma } from "@/lib/db";

export async function getHomeContent() {
  const [featuredCommunities, announcements, campaign, partners] = await Promise.all([
    prisma.community.findMany({ where: { published: true, featured: true }, orderBy: { name: "asc" }, take: 6 }),
    prisma.announcement.findMany({
      where: { status: PublicationStatus.PUBLISHED },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: 3
    }),
    prisma.campaign.findUnique({
      where: { slug: "world-space-week-uganda-2026" },
      include: { programmeItems: { where: { published: true }, orderBy: { sortOrder: "asc" } } }
    }),
    prisma.partner.findMany({ where: { published: true, featured: true }, orderBy: { name: "asc" }, take: 8 })
  ]);

  return { featuredCommunities, announcements, campaign, partners };
}

export function getCommunities() {
  return prisma.community.findMany({ where: { published: true }, orderBy: [{ featured: "desc" }, { name: "asc" }] });
}

export function getTeamMembers() {
  return prisma.teamMember.findMany({ where: { published: true }, orderBy: [{ sortOrder: "asc" }, { name: "asc" }] });
}

export function getGalleryItems() {
  return prisma.galleryItem.findMany({ where: { published: true }, orderBy: [{ featured: "desc" }, { eventDate: "desc" }] });
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
```

- [ ] **Step 9: Generate Prisma client and seed database**

Run:

```powershell
Copy-Item .env.example .env
docker compose up -d
npm run db:generate
npm run db:push
npm run db:seed
```

Expected: Prisma client generated, schema pushed, seed completes, admin user created.

- [ ] **Step 10: Commit database layer**

Run:

```powershell
git add space-uganda-site/prisma space-uganda-site/src/lib/db.ts space-uganda-site/src/lib/slug.ts space-uganda-site/src/lib/content/public.ts space-uganda-site/src/test/slug.test.ts
git commit -m "feat: add database schema and seed content"
```

Expected: commit contains schema, seed, Prisma singleton, public query layer, and slug test.

---

### Task 3: Implement Validation, Auth, And Admin Route Protection

**Files:**
- Create: `space-uganda-site/src/lib/validation.ts`
- Create: `space-uganda-site/src/lib/auth/password.ts`
- Create: `space-uganda-site/src/lib/auth/session.ts`
- Create: `space-uganda-site/src/lib/auth/require-admin.ts`
- Create: `space-uganda-site/src/app/admin/login/page.tsx`
- Create: `space-uganda-site/src/app/admin/login/actions.ts`
- Create: `space-uganda-site/src/app/admin/layout.tsx`
- Create: `space-uganda-site/src/test/validation.test.ts`
- Create: `space-uganda-site/src/test/auth-session.test.ts`

**Interfaces:**
- Produces: `hashPassword(password: string): Promise<string>`.
- Produces: `verifyPassword(password: string, hash: string): Promise<boolean>`.
- Produces: `createSessionToken(payload: SessionPayload): Promise<string>`.
- Produces: `readSession(): Promise<SessionPayload | null>`.
- Produces: `requireAdmin(): Promise<SessionPayload>`.
- Consumes: `prisma.user`.

- [ ] **Step 1: Write validation tests**

Create `src/test/validation.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { loginSchema, submissionSchema } from "@/lib/validation";

describe("validation schemas", () => {
  it("accepts a valid admin login", () => {
    const result = loginSchema.safeParse({ email: "admin@space.org.ug", password: "ChangeThisBeforeLaunch123!" });
    expect(result.success).toBe(true);
  });

  it("rejects invalid emails", () => {
    const result = loginSchema.safeParse({ email: "bad-email", password: "ChangeThisBeforeLaunch123!" });
    expect(result.success).toBe(false);
  });

  it("accepts an innovation submission with safety notes", () => {
    const result = submissionSchema.safeParse({
      type: "INNOVATION",
      submitterName: "Asha N.",
      submitterEmail: "asha@example.com",
      phone: "+256700000000",
      organisation: "Makerere University",
      title: "Satellite Data For Wetlands",
      category: "Earth Observation",
      abstract: "A dashboard showing satellite-derived wetland change indicators for public education.",
      supportNeeds: "Power and one display screen",
      safetyNotes: "No moving or hazardous components",
      linkUrl: "https://example.com"
    });
    expect(result.success).toBe(true);
  });
});
```

- [ ] **Step 2: Run validation tests to verify they fail**

Run:

```powershell
npm run test -- src/test/validation.test.ts
```

Expected: fail because `@/lib/validation` does not exist.

- [ ] **Step 3: Implement validation schemas**

Create `src/lib/validation.ts`:

```ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(12)
});

export const submissionSchema = z.object({
  type: z.enum(["JOIN", "PARTNER", "INNOVATION", "CONTACT"]),
  submitterName: z.string().min(2).max(120),
  submitterEmail: z.string().email().max(200),
  phone: z.string().max(80).optional().or(z.literal("")),
  organisation: z.string().max(180).optional().or(z.literal("")),
  title: z.string().min(3).max(180),
  category: z.string().max(120).optional().or(z.literal("")),
  abstract: z.string().min(20).max(3000),
  supportNeeds: z.string().max(1200).optional().or(z.literal("")),
  safetyNotes: z.string().max(1200).optional().or(z.literal("")),
  linkUrl: z.string().url().optional().or(z.literal(""))
});

export type SubmissionInput = z.infer<typeof submissionSchema>;
```

- [ ] **Step 4: Write auth session tests**

Create `src/test/auth-session.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { createSessionToken, verifySessionToken } from "@/lib/auth/session";

describe("session token", () => {
  it("round-trips a signed admin session", async () => {
    process.env.AUTH_SECRET = "test-secret-that-is-long-enough-for-local-tests";
    const token = await createSessionToken({ userId: "user_1", email: "admin@space.org.ug", role: "ADMIN", name: "Admin" });
    const payload = await verifySessionToken(token);
    expect(payload?.email).toBe("admin@space.org.ug");
    expect(payload?.role).toBe("ADMIN");
  });
});
```

- [ ] **Step 5: Implement password helpers**

Create `src/lib/auth/password.ts`:

```ts
import bcrypt from "bcryptjs";

export function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
```

- [ ] **Step 6: Implement session helpers**

Create `src/lib/auth/session.ts`:

```ts
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

export type SessionPayload = {
  userId: string;
  email: string;
  name: string;
  role: "ADMIN" | "EDITOR";
};

const cookieName = "space_uganda_admin";

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 24) {
    throw new Error("AUTH_SECRET must be at least 24 characters.");
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return {
      userId: String(payload.userId),
      email: String(payload.email),
      name: String(payload.name),
      role: payload.role === "ADMIN" ? "ADMIN" : "EDITOR"
    };
  } catch {
    return null;
  }
}

export async function setSession(payload: SessionPayload) {
  const token = await createSessionToken(payload);
  const store = await cookies();
  store.set(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
}

export async function clearSession() {
  const store = await cookies();
  store.delete(cookieName);
}

export async function readSession() {
  const store = await cookies();
  const token = store.get(cookieName)?.value;
  return token ? verifySessionToken(token) : null;
}
```

- [ ] **Step 7: Implement admin guard**

Create `src/lib/auth/require-admin.ts`:

```ts
import { redirect } from "next/navigation";
import { readSession } from "@/lib/auth/session";

export async function requireAdmin() {
  const session = await readSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}
```

- [ ] **Step 8: Implement login action**

Create `src/app/admin/login/actions.ts`:

```ts
"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { setSession } from "@/lib/auth/session";
import { verifyPassword } from "@/lib/auth/password";
import { loginSchema } from "@/lib/validation";

export type LoginState = { error?: string };

export async function loginAction(_state: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? "")
  });

  if (!parsed.success) {
    return { error: "Enter a valid email and password." };
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user || !user.active) {
    return { error: "The admin account was not found or is inactive." };
  }

  const valid = await verifyPassword(parsed.data.password, user.passwordHash);
  if (!valid) {
    return { error: "The email or password is incorrect." };
  }

  await setSession({ userId: user.id, email: user.email, name: user.name, role: user.role });
  redirect("/admin");
}
```

- [ ] **Step 9: Implement login page and protected admin layout**

Create `src/app/admin/login/page.tsx` with a centered, professional sign-in form using `useActionState`.

Create `src/app/admin/layout.tsx`:

```tsx
import type { ReactNode } from "react";
import { requireAdmin } from "@/lib/auth/require-admin";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await requireAdmin();
  return <AdminShell session={session}>{children}</AdminShell>;
}
```

Ensure `AdminShell` is created in Task 7 before running the full build. Until then, temporarily render `<main>{children}</main>` if needed for Task 3 verification.

- [ ] **Step 10: Run auth tests**

Run:

```powershell
npm run test -- src/test/validation.test.ts src/test/auth-session.test.ts
```

Expected: pass.

- [ ] **Step 11: Commit auth foundation**

Run:

```powershell
git add space-uganda-site/src/lib/validation.ts space-uganda-site/src/lib/auth space-uganda-site/src/app/admin/login space-uganda-site/src/app/admin/layout.tsx space-uganda-site/src/test
git commit -m "feat: add admin authentication foundation"
```

Expected: commit contains validation, auth helpers, login action/page, tests.

---

### Task 4: Build Shared UI Components And Public Layout

**Files:**
- Create: `space-uganda-site/src/lib/routes.ts`
- Create: `space-uganda-site/src/components/ui/Button.tsx`
- Create: `space-uganda-site/src/components/ui/Card.tsx`
- Create: `space-uganda-site/src/components/ui/Input.tsx`
- Create: `space-uganda-site/src/components/ui/Textarea.tsx`
- Create: `space-uganda-site/src/components/ui/Section.tsx`
- Create: `space-uganda-site/src/components/site/Logo.tsx`
- Create: `space-uganda-site/src/components/site/Header.tsx`
- Create: `space-uganda-site/src/components/site/MobileNav.tsx`
- Create: `space-uganda-site/src/components/site/Footer.tsx`
- Create: `space-uganda-site/src/components/site/Hero.tsx`
- Modify: `space-uganda-site/src/app/layout.tsx`

**Interfaces:**
- Produces: `siteRoutes` array for public navigation.
- Produces: reusable visual components for public pages.
- Consumes: Tailwind tokens from Task 1.

- [ ] **Step 1: Write route config**

Create `src/lib/routes.ts`:

```ts
export const siteRoutes = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/communities", label: "Communities" },
  { href: "/team", label: "Team" },
  { href: "/wsw-2026", label: "WSW 2026" },
  { href: "/gallery", label: "Gallery" },
  { href: "/updates", label: "Updates" },
  { href: "/join", label: "Join" }
] as const;

export const adminRoutes = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/team-members", label: "Team" },
  { href: "/admin/communities", label: "Communities" },
  { href: "/admin/partners", label: "Partners" },
  { href: "/admin/campaigns", label: "Campaigns" },
  { href: "/admin/programme", label: "WSW Programme" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/submissions", label: "Submissions" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/announcements", label: "Updates" },
  { href: "/admin/settings", label: "Settings" }
] as const;
```

- [ ] **Step 2: Implement UI primitives**

Create `Button.tsx` exporting `ButtonLink` and `Button` with variants `primary`, `secondary`, `ghost`.

Use this class strategy:

```ts
const base = "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-orbit focus:ring-offset-2 focus:ring-offset-space-950";
const variants = {
  primary: "bg-orbit text-white hover:bg-violet-500",
  secondary: "border border-white/20 bg-white/10 text-white hover:bg-white/15",
  ghost: "text-space-100 hover:bg-white/10"
};
```

Create `Card.tsx`, `Input.tsx`, `Textarea.tsx`, and `Section.tsx` with simple props and consistent rounded-md surfaces.

- [ ] **Step 3: Implement logo**

Create `src/components/site/Logo.tsx`:

```tsx
export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-md bg-white text-space-950">
        <span className="text-lg font-black">SU</span>
      </div>
      <div>
        <div className="text-sm font-bold uppercase tracking-normal text-white">Space Uganda</div>
        <div className="text-xs text-space-100/70">Curate. Coordinate. Catalyse.</div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Implement responsive header and footer**

Create `Header.tsx` and `MobileNav.tsx` using `siteRoutes`, `Menu`, and `X` from `lucide-react`.

Header requirements:

- Desktop links visible from `lg`.
- Mobile menu button visible below `lg`.
- Fixed width constraints with `max-w-7xl`.
- CTA to `/join`.
- No overlapping text at 320px width.

Create `Footer.tsx` with contact, quick links, WSW official calendar link, and understated partner note.

- [ ] **Step 5: Implement root layout**

Update `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "Space Uganda",
  description: "Uganda's umbrella home for space enthusiasts, educators, engineers, innovators, astronomers, and partner organisations."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Commit shared UI**

Run:

```powershell
git add space-uganda-site/src/components space-uganda-site/src/lib/routes.ts space-uganda-site/src/app/layout.tsx space-uganda-site/src/app/globals.css
git commit -m "feat: add public layout and design system"
```

Expected: commit contains reusable UI and global layout.

---

### Task 5: Build Public Website Pages

**Files:**
- Create: `space-uganda-site/src/app/page.tsx`
- Create: `space-uganda-site/src/app/about/page.tsx`
- Create: `space-uganda-site/src/app/communities/page.tsx`
- Create: `space-uganda-site/src/app/team/page.tsx`
- Create: `space-uganda-site/src/app/gallery/page.tsx`
- Create: `space-uganda-site/src/app/updates/page.tsx`
- Create: `space-uganda-site/src/app/wsw-2026/page.tsx`
- Create: `space-uganda-site/e2e/public-site.spec.ts`

**Interfaces:**
- Consumes: public query functions from `src/lib/content/public.ts`.
- Produces: complete public route set.

- [ ] **Step 1: Write public route smoke tests**

Create `e2e/public-site.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

const routes = ["/", "/about", "/communities", "/team", "/gallery", "/updates", "/join", "/wsw-2026"];

for (const route of routes) {
  test(`public route ${route} renders`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("body")).toContainText("Space Uganda");
    await expect(page.locator("main")).toBeVisible();
  });
}

test("WSW page foregrounds Rocket Revolution", async ({ page }) => {
  await page.goto("/wsw-2026");
  await expect(page.getByRole("heading", { name: /World Space Week Uganda 2026/i })).toBeVisible();
  await expect(page.locator("body")).toContainText("Rocket Revolution");
  await expect(page.locator("body")).toContainText("October 4-10, 2026");
});
```

- [ ] **Step 2: Run public route tests to verify they fail**

Run:

```powershell
npm run test:e2e -- e2e/public-site.spec.ts
```

Expected: fail because pages are not implemented.

- [ ] **Step 3: Implement home page**

Create `src/app/page.tsx` as an async server component:

- Calls `getHomeContent()`.
- Hero headline: "Uganda's home for space people, programmes, and possibility."
- CTA buttons: "Explore WSW 2026" to `/wsw-2026`, "Join the ecosystem" to `/join`.
- Four metrics: "October 4-10", "10+ national events target", "3 flagship experiences", "Year-round ecosystem".
- Sections: ecosystem pillars, WSW 2026 feature, featured communities, partners, latest updates.
- Use `/assets/wsw-2026-save-the-date.png` in the campaign block.

- [ ] **Step 4: Implement about page**

Create `src/app/about/page.tsx` with:

- Mission.
- Vision.
- "Curate. Coordinate. Catalyse." philosophy.
- Uganda context: PearlAfricaSat-1, ClimCam, astronomy outreach, universities, and innovators.
- Governance summary with National Steering Committee and subordinate committees.

- [ ] **Step 5: Implement communities page**

Create `src/app/communities/page.tsx`:

- Calls `getCommunities()`.
- Groups communities by category.
- Shows name, summary, category, location, website link if present.
- Empty state says "Communities will appear here as the national ecosystem directory is curated."

- [ ] **Step 6: Implement team page**

Create `src/app/team/page.tsx`:

- Calls `getTeamMembers()`.
- Highlights national coordinators first using `featured`.
- Shows role, organisation, bio, optional photo.
- Empty state says "Team profiles are being curated by the national coordination team."

- [ ] **Step 7: Implement gallery page**

Create `src/app/gallery/page.tsx`:

- Calls `getGalleryItems()`.
- If no items, show polished empty state: "The gallery is ready for event photos, videos, stargazing moments, innovation demos, and partner highlights."
- Include CTA to `/join` for sharing media after events.

- [ ] **Step 8: Implement updates page**

Create `src/app/updates/page.tsx`:

- Calls `getAnnouncements()`.
- Shows announcement cards with title, excerpt, category, date.
- Empty state says "Updates will appear here as campaigns, calls, and partner notices are published."

- [ ] **Step 9: Implement WSW 2026 page**

Create `src/app/wsw-2026/page.tsx`:

- Calls `getWsw2026Content()`.
- Hero: "World Space Week Uganda 2026".
- Theme badge: "Rocket Revolution".
- Date: "October 4-10, 2026".
- Campaign copy: "Engineering Uganda's Space Future."
- Sections: campaign architecture, three immersive experiences, innovation showcase, safety model, national calendar obligations, partner CTA.
- Use assets `wsw-2026-save-the-date.png`, `wsw-2026-did-you-know.png`, and `wsw-2026-myth-or-fact.png`.
- Include official WSW link to `https://www.worldspaceweek.org/`.

- [ ] **Step 10: Run public route tests**

Run:

```powershell
npm run test:e2e -- e2e/public-site.spec.ts
```

Expected: all public routes pass on desktop and mobile projects.

- [ ] **Step 11: Commit public pages**

Run:

```powershell
git add space-uganda-site/src/app space-uganda-site/e2e/public-site.spec.ts
git commit -m "feat: build public Space Uganda pages"
```

Expected: commit contains public pages and E2E route tests.

---

### Task 6: Build Join, Contact, Partner, And Innovation Submission Forms

**Files:**
- Modify: `space-uganda-site/src/app/join/page.tsx`
- Create: `space-uganda-site/src/app/join/actions.ts`
- Modify: `space-uganda-site/src/lib/validation.ts`
- Modify: `space-uganda-site/e2e/public-site.spec.ts`

**Interfaces:**
- Consumes: `submissionSchema`.
- Produces: `createSubmissionAction(state, formData)` server action.
- Produces: public forms that create `Submission` rows.

- [ ] **Step 1: Add E2E form submission test**

Append to `e2e/public-site.spec.ts`:

```ts
test("join page accepts an innovation showcase submission", async ({ page }) => {
  await page.goto("/join");
  await page.getByLabel("Full name").fill("Test Innovator");
  await page.getByLabel("Email").fill("innovator@example.com");
  await page.getByLabel("Phone").fill("+256700000000");
  await page.getByLabel("Organisation").fill("Makerere University");
  await page.getByLabel("Submission type").selectOption("INNOVATION");
  await page.getByLabel("Title").fill("Satellite Data Education Dashboard");
  await page.getByLabel("Category").fill("Earth Observation");
  await page.getByLabel("Description").fill("A public education demo that explains satellite-derived climate and wetlands data for Ugandan students.");
  await page.getByLabel("Support needs").fill("One display screen and power socket");
  await page.getByLabel("Safety notes").fill("No hazardous materials or moving components");
  await page.getByRole("button", { name: /Submit/i }).click();
  await expect(page.locator("body")).toContainText("Submission received");
});
```

- [ ] **Step 2: Run form test to verify it fails**

Run:

```powershell
npm run test:e2e -- e2e/public-site.spec.ts
```

Expected: fail because join form is not implemented.

- [ ] **Step 3: Implement submission action**

Create `src/app/join/actions.ts`:

```ts
"use server";

import { prisma } from "@/lib/db";
import { submissionSchema } from "@/lib/validation";

export type SubmissionState = { ok?: boolean; message?: string; errors?: Record<string, string> };

export async function createSubmissionAction(_state: SubmissionState, formData: FormData): Promise<SubmissionState> {
  const parsed = submissionSchema.safeParse({
    type: String(formData.get("type") ?? "JOIN"),
    submitterName: String(formData.get("submitterName") ?? ""),
    submitterEmail: String(formData.get("submitterEmail") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    organisation: String(formData.get("organisation") ?? ""),
    title: String(formData.get("title") ?? ""),
    category: String(formData.get("category") ?? ""),
    abstract: String(formData.get("abstract") ?? ""),
    supportNeeds: String(formData.get("supportNeeds") ?? ""),
    safetyNotes: String(formData.get("safetyNotes") ?? ""),
    linkUrl: String(formData.get("linkUrl") ?? "")
  });

  if (!parsed.success) {
    return {
      message: "Please check the highlighted fields.",
      errors: Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message]))
    };
  }

  await prisma.submission.create({
    data: {
      type: parsed.data.type,
      submitterName: parsed.data.submitterName,
      submitterEmail: parsed.data.submitterEmail,
      phone: parsed.data.phone || null,
      organisation: parsed.data.organisation || null,
      title: parsed.data.title,
      category: parsed.data.category || null,
      abstract: parsed.data.abstract,
      supportNeeds: parsed.data.supportNeeds || null,
      safetyNotes: parsed.data.safetyNotes || null,
      linkUrl: parsed.data.linkUrl || null
    }
  });

  return { ok: true, message: "Submission received. The Space Uganda team will review it and follow up." };
}
```

- [ ] **Step 4: Implement join page form**

Create `src/app/join/page.tsx` as a client form component or split the form into a client child component.

Required fields:

- Full name mapped to `submitterName`.
- Email mapped to `submitterEmail`.
- Phone mapped to `phone`.
- Organisation mapped to `organisation`.
- Submission type select with `JOIN`, `PARTNER`, `INNOVATION`, `CONTACT`.
- Title mapped to `title`.
- Category mapped to `category`.
- Description mapped to `abstract`.
- Support needs mapped to `supportNeeds`.
- Safety notes mapped to `safetyNotes`.
- Link mapped to `linkUrl`.

Success message must contain "Submission received".

- [ ] **Step 5: Run form test**

Run:

```powershell
npm run test:e2e -- e2e/public-site.spec.ts
```

Expected: form test passes and creates a database row.

- [ ] **Step 6: Commit forms**

Run:

```powershell
git add space-uganda-site/src/app/join space-uganda-site/e2e/public-site.spec.ts
git commit -m "feat: add public submission forms"
```

Expected: commit contains public form and server action.

---

### Task 7: Build Admin Shell And Generic Content Management

**Files:**
- Create: `space-uganda-site/src/components/admin/AdminShell.tsx`
- Create: `space-uganda-site/src/components/admin/DeleteButton.tsx`
- Create: `space-uganda-site/src/components/admin/FieldRenderer.tsx`
- Create: `space-uganda-site/src/components/admin/ResourceForm.tsx`
- Create: `space-uganda-site/src/components/admin/ResourceTable.tsx`
- Create: `space-uganda-site/src/lib/admin/resources.ts`
- Create: `space-uganda-site/src/lib/admin/crud.ts`
- Create: `space-uganda-site/src/app/admin/page.tsx`
- Create: `space-uganda-site/src/app/admin/[resource]/page.tsx`
- Create: `space-uganda-site/src/app/admin/[resource]/new/page.tsx`
- Create: `space-uganda-site/src/app/admin/[resource]/[id]/page.tsx`
- Create: `space-uganda-site/src/app/admin/[resource]/actions.ts`
- Create: `space-uganda-site/src/test/admin-resources.test.ts`
- Create: `space-uganda-site/e2e/admin.spec.ts`

**Interfaces:**
- Consumes: `adminRoutes`, `requireAdmin`, Prisma models.
- Produces: `resourceConfigs` with keys `team-members`, `communities`, `partners`, `campaigns`, `programme`, `events`, `submissions`, `gallery`, `announcements`, `settings`.
- Produces: list, create, update, and delete admin flows for dynamic content.

- [ ] **Step 1: Write resource config tests**

Create `src/test/admin-resources.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { resourceConfigs } from "@/lib/admin/resources";

describe("admin resource configs", () => {
  it("defines every required admin resource", () => {
    expect(Object.keys(resourceConfigs).sort()).toEqual([
      "announcements",
      "campaigns",
      "communities",
      "events",
      "gallery",
      "partners",
      "programme",
      "settings",
      "submissions",
      "team-members"
    ]);
  });

  it("marks submissions as reviewable", () => {
    expect(resourceConfigs.submissions.fields.some((field) => field.name === "status")).toBe(true);
    expect(resourceConfigs.submissions.fields.some((field) => field.name === "reviewerNotes")).toBe(true);
  });
});
```

- [ ] **Step 2: Run resource config test to verify it fails**

Run:

```powershell
npm run test -- src/test/admin-resources.test.ts
```

Expected: fail because resource configs do not exist.

- [ ] **Step 3: Implement resource config**

Create `src/lib/admin/resources.ts`:

```ts
export type FieldType = "text" | "textarea" | "url" | "email" | "number" | "boolean" | "select" | "datetime";

export type ResourceField = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  help?: string;
};

export type ResourceConfig = {
  key: string;
  label: string;
  model: string;
  titleField: string;
  descriptionField?: string;
  fields: ResourceField[];
  listFields: string[];
  supportsDelete: boolean;
};

export const resourceConfigs = {
  "team-members": {
    key: "team-members",
    label: "Team Members",
    model: "teamMember",
    titleField: "name",
    descriptionField: "role",
    listFields: ["name", "role", "organisation", "featured", "published"],
    supportsDelete: true,
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "role", label: "Role", type: "text", required: true },
      { name: "organisation", label: "Organisation", type: "text", required: true },
      { name: "bio", label: "Bio", type: "textarea", required: true },
      { name: "photoUrl", label: "Photo URL", type: "url" },
      { name: "email", label: "Email", type: "email" },
      { name: "sortOrder", label: "Sort order", type: "number" },
      { name: "featured", label: "Featured", type: "boolean" },
      { name: "published", label: "Published", type: "boolean" }
    ]
  },
  communities: {
    key: "communities",
    label: "Communities",
    model: "community",
    titleField: "name",
    descriptionField: "summary",
    listFields: ["name", "category", "featured", "published"],
    supportsDelete: true,
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "category", label: "Category", type: "text", required: true },
      { name: "summary", label: "Summary", type: "textarea", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "logoUrl", label: "Logo URL", type: "url" },
      { name: "websiteUrl", label: "Website URL", type: "url" },
      { name: "contactEmail", label: "Contact email", type: "email" },
      { name: "location", label: "Location", type: "text" },
      { name: "featured", label: "Featured", type: "boolean" },
      { name: "published", label: "Published", type: "boolean" }
    ]
  },
  partners: {
    key: "partners",
    label: "Partners",
    model: "partner",
    titleField: "name",
    descriptionField: "type",
    listFields: ["name", "type", "featured", "published"],
    supportsDelete: true,
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "type", label: "Type", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "contribution", label: "Contribution", type: "textarea" },
      { name: "logoUrl", label: "Logo URL", type: "url" },
      { name: "websiteUrl", label: "Website URL", type: "url" },
      { name: "featured", label: "Featured", type: "boolean" },
      { name: "published", label: "Published", type: "boolean" }
    ]
  },
  campaigns: {
    key: "campaigns",
    label: "Campaigns",
    model: "campaign",
    titleField: "name",
    descriptionField: "theme",
    listFields: ["name", "theme", "startsAt", "endsAt", "status"],
    supportsDelete: true,
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "theme", label: "Theme", type: "text", required: true },
      { name: "startsAt", label: "Start date", type: "datetime", required: true },
      { name: "endsAt", label: "End date", type: "datetime", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "heroImageUrl", label: "Hero image URL", type: "url" },
      { name: "status", label: "Status", type: "select", options: ["DRAFT", "PUBLISHED", "ARCHIVED"], required: true }
    ]
  },
  programme: {
    key: "programme",
    label: "WSW Programme",
    model: "wswProgrammeItem",
    titleField: "title",
    descriptionField: "track",
    listFields: ["title", "track", "leadOrganisation", "published"],
    supportsDelete: true,
    fields: [
      { name: "campaignId", label: "Campaign ID", type: "text", required: true },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "track", label: "Track", type: "text", required: true },
      { name: "leadOrganisation", label: "Lead organisation", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "location", label: "Location", type: "text" },
      { name: "format", label: "Format", type: "select", options: ["VIRTUAL", "PHYSICAL", "HYBRID"], required: true },
      { name: "sortOrder", label: "Sort order", type: "number" },
      { name: "published", label: "Published", type: "boolean" }
    ]
  },
  events: {
    key: "events",
    label: "Events",
    model: "event",
    titleField: "title",
    descriptionField: "location",
    listFields: ["title", "startsAt", "format", "status"],
    supportsDelete: true,
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "startsAt", label: "Start date", type: "datetime", required: true },
      { name: "endsAt", label: "End date", type: "datetime" },
      { name: "location", label: "Location", type: "text", required: true },
      { name: "format", label: "Format", type: "select", options: ["VIRTUAL", "PHYSICAL", "HYBRID"], required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "registrationUrl", label: "Registration URL", type: "url" },
      { name: "status", label: "Status", type: "select", options: ["DRAFT", "PUBLISHED", "ARCHIVED"], required: true }
    ]
  },
  submissions: {
    key: "submissions",
    label: "Submissions",
    model: "submission",
    titleField: "title",
    descriptionField: "submitterName",
    listFields: ["title", "type", "status", "submitterName", "createdAt"],
    supportsDelete: false,
    fields: [
      { name: "type", label: "Type", type: "select", options: ["JOIN", "PARTNER", "INNOVATION", "CONTACT"], required: true },
      { name: "status", label: "Status", type: "select", options: ["NEW", "UNDER_REVIEW", "ACCEPTED", "NEEDS_CHANGES", "DECLINED", "ARCHIVED"], required: true },
      { name: "submitterName", label: "Submitter name", type: "text", required: true },
      { name: "submitterEmail", label: "Submitter email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "text" },
      { name: "organisation", label: "Organisation", type: "text" },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "category", label: "Category", type: "text" },
      { name: "abstract", label: "Description", type: "textarea", required: true },
      { name: "supportNeeds", label: "Support needs", type: "textarea" },
      { name: "safetyNotes", label: "Safety notes", type: "textarea" },
      { name: "linkUrl", label: "Link URL", type: "url" },
      { name: "reviewerNotes", label: "Reviewer notes", type: "textarea" }
    ]
  },
  gallery: {
    key: "gallery",
    label: "Gallery",
    model: "galleryItem",
    titleField: "title",
    descriptionField: "caption",
    listFields: ["title", "mediaType", "featured", "published"],
    supportsDelete: true,
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "mediaType", label: "Media type", type: "select", options: ["image", "video"], required: true },
      { name: "mediaUrl", label: "Media URL", type: "url", required: true },
      { name: "caption", label: "Caption", type: "textarea" },
      { name: "eventDate", label: "Event date", type: "datetime" },
      { name: "featured", label: "Featured", type: "boolean" },
      { name: "published", label: "Published", type: "boolean" }
    ]
  },
  announcements: {
    key: "announcements",
    label: "Updates",
    model: "announcement",
    titleField: "title",
    descriptionField: "excerpt",
    listFields: ["title", "category", "status", "publishedAt"],
    supportsDelete: true,
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "excerpt", label: "Excerpt", type: "textarea", required: true },
      { name: "content", label: "Content", type: "textarea", required: true },
      { name: "category", label: "Category", type: "text", required: true },
      { name: "status", label: "Status", type: "select", options: ["DRAFT", "PUBLISHED", "ARCHIVED"], required: true },
      { name: "publishedAt", label: "Published at", type: "datetime" }
    ]
  },
  settings: {
    key: "settings",
    label: "Site Settings",
    model: "siteSetting",
    titleField: "key",
    descriptionField: "key",
    listFields: ["key", "updatedAt"],
    supportsDelete: true,
    fields: [
      { name: "key", label: "Key", type: "text", required: true },
      { name: "value", label: "JSON value", type: "textarea", required: true }
    ]
  }
} satisfies Record<string, ResourceConfig>;

export type ResourceKey = keyof typeof resourceConfigs;
```

- [ ] **Step 4: Implement admin CRUD helper**

Create `src/lib/admin/crud.ts` with:

- `getResourceConfig(resource: string)`.
- `listResource(resource: string)`.
- `getResourceRecord(resource: string, id: string)`.
- `createResourceRecord(resource: string, formData: FormData)`.
- `updateResourceRecord(resource: string, id: string, formData: FormData)`.
- `deleteResourceRecord(resource: string, id: string)`.

Use an internal switch on `config.model` so TypeScript has explicit Prisma model calls. Parse booleans, numbers, datetimes, and JSON values before writing.

- [ ] **Step 5: Implement admin shell**

Create `AdminShell.tsx`:

- Sidebar with `adminRoutes`.
- Top bar showing signed-in admin name and role.
- Main content width with dense admin typography.
- Mobile sidebar collapses into a simple menu.

- [ ] **Step 6: Implement admin table and form components**

Create:

- `ResourceTable.tsx`: renders list fields, edit links, status badges, and delete control if `supportsDelete`.
- `ResourceForm.tsx`: renders fields using `FieldRenderer`, posts to create/update actions.
- `FieldRenderer.tsx`: maps field types to inputs, textarea, select, checkbox, datetime-local.
- `DeleteButton.tsx`: client component with confirmation and pending state.

- [ ] **Step 7: Implement admin pages**

Create:

- `src/app/admin/page.tsx`: dashboard counts for resources and recent submissions.
- `src/app/admin/[resource]/page.tsx`: list records and "New" button.
- `src/app/admin/[resource]/new/page.tsx`: create form.
- `src/app/admin/[resource]/[id]/page.tsx`: edit form.
- `src/app/admin/[resource]/actions.ts`: server actions `createAction`, `updateAction`, `deleteAction`.

Every admin page must call `requireAdmin()` before reading or mutating data.

- [ ] **Step 8: Write admin E2E smoke test**

Create `e2e/admin.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

test("admin login reaches dashboard", async ({ page }) => {
  await page.goto("/admin/login");
  await page.getByLabel("Email").fill(process.env.ADMIN_EMAIL ?? "admin@space.org.ug");
  await page.getByLabel("Password").fill(process.env.ADMIN_PASSWORD ?? "ChangeThisBeforeLaunch123!");
  await page.getByRole("button", { name: /Sign in/i }).click();
  await expect(page).toHaveURL(/\/admin$/);
  await expect(page.getByRole("heading", { name: /Dashboard/i })).toBeVisible();
});

test("admin can open communities manager", async ({ page }) => {
  await page.goto("/admin/login");
  await page.getByLabel("Email").fill(process.env.ADMIN_EMAIL ?? "admin@space.org.ug");
  await page.getByLabel("Password").fill(process.env.ADMIN_PASSWORD ?? "ChangeThisBeforeLaunch123!");
  await page.getByRole("button", { name: /Sign in/i }).click();
  await page.getByRole("link", { name: /Communities/i }).click();
  await expect(page.getByRole("heading", { name: /Communities/i })).toBeVisible();
  await expect(page.locator("body")).toContainText("Space Junkies Uganda");
});
```

- [ ] **Step 9: Run admin tests**

Run:

```powershell
npm run test -- src/test/admin-resources.test.ts
npm run test:e2e -- e2e/admin.spec.ts
```

Expected: resource config unit test passes and admin E2E tests pass.

- [ ] **Step 10: Commit admin dashboard**

Run:

```powershell
git add space-uganda-site/src/components/admin space-uganda-site/src/lib/admin space-uganda-site/src/app/admin space-uganda-site/src/test/admin-resources.test.ts space-uganda-site/e2e/admin.spec.ts
git commit -m "feat: add admin content management"
```

Expected: commit contains admin shell, resource config, CRUD helpers, admin pages, and tests.

---

### Task 8: Polish Responsiveness, Accessibility, And Visual QA

**Files:**
- Modify: public pages and components as needed.
- Modify: admin pages and components as needed.
- Create: `space-uganda-site/e2e/responsive.spec.ts`

**Interfaces:**
- Consumes: all public/admin pages.
- Produces: verified desktop/mobile layouts with no blank pages or major overlap.

- [ ] **Step 1: Add responsive E2E tests**

Create `e2e/responsive.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

const sizes = [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1440, height: 1000 }
];

for (const size of sizes) {
  test(`home is usable at ${size.width}px`, async ({ page }) => {
    await page.setViewportSize(size);
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Uganda's home/i })).toBeVisible();
    const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);
    expect(horizontalOverflow).toBe(false);
  });

  test(`wsw page is usable at ${size.width}px`, async ({ page }) => {
    await page.setViewportSize(size);
    await page.goto("/wsw-2026");
    await expect(page.getByRole("heading", { name: /World Space Week Uganda 2026/i })).toBeVisible();
    const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);
    expect(horizontalOverflow).toBe(false);
  });
}
```

- [ ] **Step 2: Run responsive tests**

Run:

```powershell
npm run test:e2e -- e2e/responsive.spec.ts
```

Expected: no horizontal overflow and headings visible at all configured sizes.

- [ ] **Step 3: Capture visual screenshots**

Run:

```powershell
npm run dev
```

Use Playwright screenshot commands or the browser to inspect:

- `/` at 1440x1000 and 390x844.
- `/wsw-2026` at 1440x1000 and 390x844.
- `/admin` at 1440x1000 after login.
- `/admin/communities` at 1440x1000 after login.

Expected:

- Public pages show real content above the fold.
- Header does not overlap hero content.
- Mobile nav works.
- Buttons fit their text.
- Admin sidebar/table is readable.

- [ ] **Step 4: Fix visual defects**

Apply targeted CSS/component changes for any observed issue:

- If text overflows buttons, reduce padding or allow wrapping with `whitespace-normal`.
- If cards collapse unevenly, set grid columns with `minmax(0, 1fr)`.
- If images distort, use `object-cover` with fixed `aspect-[...]`.
- If admin tables overflow mobile, wrap table in `overflow-x-auto`.

- [ ] **Step 5: Run final UI verification**

Run:

```powershell
npm run test:e2e -- e2e/public-site.spec.ts e2e/admin.spec.ts e2e/responsive.spec.ts
```

Expected: all E2E tests pass.

- [ ] **Step 6: Commit polish**

Run:

```powershell
git add space-uganda-site
git commit -m "fix: polish responsive site and admin UI"
```

Expected: commit contains visual and responsiveness fixes.

---

### Task 9: Write README, Repository Metadata, And GitHub Push Path

**Files:**
- Create: `space-uganda-site/README.md`
- Modify: root `.gitignore`
- Modify: root `README.md` if useful.

**Interfaces:**
- Produces: clear setup, admin, database, and deployment documentation.
- Produces: clean local repository ready for GitHub.

- [ ] **Step 1: Write application README**

Create `space-uganda-site/README.md` with these sections:

```markdown
# Space Uganda

Space Uganda is the year-round umbrella website for Uganda's space ecosystem, with World Space Week Uganda 2026 as its featured flagship campaign.

## Features

- Professional public website for Space Uganda.
- Dedicated `/wsw-2026` campaign route for World Space Week Uganda 2026.
- Authenticated admin dashboard at `/admin`.
- PostgreSQL database managed with Prisma.
- Dynamic management for team, communities, partners, campaigns, WSW programme, events, submissions, gallery, announcements, and settings.
- Public join, partner, contact, and Innovation Showcase submission flow.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- bcryptjs
- jose
- zod
- Vitest
- Playwright

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Start PostgreSQL:

```bash
docker compose up -d
```

4. Generate Prisma client and create tables:

```bash
npm run db:generate
npm run db:push
```

5. Seed content and the first admin account:

```bash
npm run db:seed
```

6. Start the development server:

```bash
npm run dev
```

Open http://localhost:3000.

## Admin Access

The first admin account is seeded from:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_NAME`

Change `ADMIN_PASSWORD` before deployment.

## Important Routes

- `/`
- `/about`
- `/communities`
- `/team`
- `/gallery`
- `/updates`
- `/join`
- `/wsw-2026`
- `/admin`

## Deployment Notes

Use a managed PostgreSQL database such as Neon or Supabase, set `DATABASE_URL`, set a strong `AUTH_SECRET`, run the Prisma schema push or migration flow, and seed the first admin before public launch.

## World Space Week Notes

World Space Week runs every year from October 4-10. Uganda's 2026 campaign uses the global theme "Rocket Revolution." Event organisers should also register eligible WSW activities on the official global calendar at https://www.worldspaceweek.org/.
```

- [ ] **Step 2: Write root `.gitignore`**

Create or update root `.gitignore`:

```gitignore
# Keep raw WSW source material local unless explicitly selected for app assets.
*.zip
*.mp4
*.xlsx
*.pdf
*.docx
*.png
*.jpg
*.jpeg
*.DS_Store
__MACOSX/

# App build artifacts.
space-uganda-site/node_modules/
space-uganda-site/.next/
space-uganda-site/.env
space-uganda-site/.env*.local
space-uganda-site/playwright-report/
space-uganda-site/test-results/
space-uganda-site/coverage/

# Keep docs and app source tracked.
!docs/
!docs/**
!space-uganda-site/
!space-uganda-site/**
!space-uganda-site/public/
!space-uganda-site/public/**
!space-uganda-site/public/assets/
!space-uganda-site/public/assets/**
```

Verify that selected public assets remain trackable.

- [ ] **Step 3: Run full verification before GitHub**

Run:

```powershell
npm run lint
npm run test
npm run build
npm run test:e2e
```

Expected: all checks pass.

- [ ] **Step 4: Commit README and repository metadata**

Run:

```powershell
git add .gitignore space-uganda-site/README.md
git commit -m "docs: add Space Uganda setup guide"
```

Expected: commit contains README and ignore rules.

- [ ] **Step 5: Inspect authenticated GitHub state**

Run:

```powershell
gh auth status
gh api user --jq .login
gh api user/orgs --jq '.[].login'
```

Expected: GitHub CLI identifies the authenticated user and lists accessible organisations.

- [ ] **Step 6: Create or identify GitHub organisation**

First check whether `space-uganda` exists for the authenticated user:

```powershell
gh api orgs/space-uganda --jq .login
```

If the organisation exists and the user has permission, use it.

If the organisation does not exist, GitHub generally requires organisation creation through an authenticated browser flow. Open:

```text
https://github.com/account/organizations/new?plan=free
```

Use:

- Display name: `Space Uganda`
- Organisation slug: `space-uganda`

After creation, rerun:

```powershell
gh api orgs/space-uganda --jq .login
```

Expected: outputs `space-uganda`.

- [ ] **Step 7: Create GitHub repository and push**

Run from `C:\Users\ronli\Downloads\WSW`:

```powershell
gh repo create space-uganda/space-org-ug --private --source . --remote origin --description "Space Uganda website and admin dashboard for Uganda's space ecosystem." --push
```

If the organisation creation is blocked, create the repository under the authenticated user only after explicit user approval:

```powershell
gh repo create <github-login>/space-org-ug --private --source . --remote origin --description "Space Uganda website and admin dashboard for Uganda's space ecosystem." --push
```

Expected: repository exists and `main` branch is pushed.

- [ ] **Step 8: Commit GitHub notes if org creation was blocked**

If GitHub organisation creation required browser confirmation that could not be completed, create `docs/github-setup-notes.md` with:

- The target org slug.
- The repo name.
- The exact command to run after org creation.
- The current local commit SHA.

Commit it:

```powershell
git add docs/github-setup-notes.md
git commit -m "docs: record GitHub organisation setup steps"
```

Expected: repo contains clear handoff steps.

---

### Task 10: Final Verification And Local Handoff

**Files:**
- Modify: only files needed to fix verification failures.

**Interfaces:**
- Consumes: completed site.
- Produces: running local app URL, admin credentials source, GitHub status, and clean final report.

- [ ] **Step 1: Run final checks**

Run inside `space-uganda-site/`:

```powershell
npm run lint
npm run test
npm run build
npm run test:e2e
```

Expected: all checks pass.

- [ ] **Step 2: Start the local dev server**

Run:

```powershell
npm run dev
```

Expected: server is available at `http://localhost:3000`.

- [ ] **Step 3: Manually verify public routes**

Open and inspect:

- `http://localhost:3000/`
- `http://localhost:3000/communities`
- `http://localhost:3000/team`
- `http://localhost:3000/gallery`
- `http://localhost:3000/wsw-2026`
- `http://localhost:3000/join`

Expected:

- Each route renders.
- Navigation works.
- Mobile nav works.
- WSW 2026 is clearly featured.
- Gallery has a polished empty state if no items are seeded.

- [ ] **Step 4: Manually verify admin**

Open:

```text
http://localhost:3000/admin/login
```

Sign in using `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `.env`.

Verify:

- Dashboard loads.
- Communities list shows seeded communities.
- Team list shows Ronnie Atuhaire and Zoora Harrison.
- Submissions list shows any test submission.
- Editing a community updates the public communities page.

- [ ] **Step 5: Check Git cleanliness**

Run from `C:\Users\ronli\Downloads\WSW`:

```powershell
git status --short
```

Expected: no modified tracked files, except `.env` remains ignored.

- [ ] **Step 6: Final response**

Report:

- Local site path.
- Local URL.
- Admin URL.
- Verification commands and pass/fail state.
- GitHub repository URL or exact GitHub blocker.
- Any setup step the user must complete, such as creating the GitHub organisation interactively if the API cannot.

