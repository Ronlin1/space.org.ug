# Space Uganda

Space Uganda is the year-round umbrella website for Uganda's space ecosystem, with World Space Week Uganda 2026 as a featured national campaign.

The site is designed for a coalition of space educators, astronomy communities, universities, student branches, aerospace builders, legal and policy partners, companies, volunteers, and public outreach teams working under the shared domain `space.org.ug`.

## What Is Included

- Public website for Space Uganda as the year-round umbrella organisation.
- Dedicated World Space Week Uganda 2026 route at `/wsw-2026`.
- Community directory for organisations under the umbrella.
- Team page for coordinators and organising teams.
- Gallery section ready for future event photos and videos.
- Public `/join` intake form for community, partner, innovation, and contact submissions.
- Authenticated admin portal at `/admin`.
- Real Prisma database schema with Postgres.
- Seed data based on the WSW Uganda planning folder and current ecosystem map.

## Main Routes

- `/` - Space Uganda home.
- `/community` - ecosystem directory.
- `/team` - public team profiles.
- `/gallery` - gallery archive.
- `/wsw-2026` - World Space Week Uganda 2026 campaign page.
- `/join` - public submission form.
- `/admin` - authenticated admin dashboard.

## Admin Resources

The admin side dynamically manages:

- Communities
- Team
- Partners
- Campaigns
- WSW programme items
- Events
- Gallery items
- Announcements
- Submissions
- Site settings

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Prisma
- Postgres
- Vitest
- Playwright
- JWT session cookies with `jose`
- Password hashing with `bcryptjs`

## Local Setup

```bash
cd space-uganda-site
npm install
cp .env.example .env
docker compose up -d
npm run db:push
npm run db:seed
npm run dev
```

Then open:

```text
http://localhost:3000
```

Default seeded admin credentials come from `.env.example`:

```text
ADMIN_EMAIL=admin@space.org.ug
ADMIN_PASSWORD=ChangeThisBeforeLaunch123!
```

Change these before any real launch.

## Environment Variables

```text
DATABASE_URL=
AUTH_SECRET=
ADMIN_EMAIL=
ADMIN_PASSWORD=
ADMIN_NAME=
NEXT_PUBLIC_SITE_URL=
```

Use a long random `AUTH_SECRET` in production.

## Scripts

```bash
npm run dev          # local development
npm run build        # Prisma generate + Next production build
npm run start        # start production server
npm run lint         # ESLint
npm run test         # Vitest
npm run test:e2e     # Playwright
npm run db:generate  # Prisma client generation
npm run db:push      # push schema to database
npm run db:seed      # seed admin and starting content
npm run db:studio    # Prisma Studio
```

## Deployment Notes

Provision a Postgres database, set all environment variables, run the Prisma schema push or migration process, then run the seed once to create the first admin and initial content.

The app can render public fallback content when a database is unavailable, but the real admin portal and public submission intake require a working Postgres `DATABASE_URL`.

## World Space Week Uganda 2026

WSW Uganda 2026 is presented as a featured campaign under the global theme `Rocket Revolution`, running October 4-10, 2026. The site models the campaign around the working programme idea:

- Curate.
- Coordinate.
- Catalyse.

## Repository Structure

```text
docs/
  superpowers/
    specs/
    plans/
space-uganda-site/
  prisma/
  public/assets/
  src/app/
  src/components/
  src/lib/
  src/test/
```

## Asset Notes

Selected public assets from the planning folder are copied into:

```text
space-uganda-site/public/assets
```

The raw WSW planning material remains local and is intentionally excluded from git by the root `.gitignore`.
