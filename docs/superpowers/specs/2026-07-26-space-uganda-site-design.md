# Space Uganda Website And Admin Design

Date: 2026-07-26
Status: Approved direction, pending implementation plan
Domain: space.org.ug

## Purpose

Build Space Uganda as the year-round umbrella organisation for Uganda's space ecosystem. World Space Week Uganda 2026 is the featured flagship campaign, not the whole identity of the site.

The site must feel professional enough for government, universities, sponsors, and international partners, while still welcoming students, enthusiasts, makers, astronomy clubs, and young innovators.

## Context

The local WSW folder contains official World Space Week assets, Uganda 2025 event media, registration data, National Coordinator materials, and 2026 planning documents. The strongest strategic direction comes from the 2026 white paper: Space Uganda should curate, coordinate, and catalyse the ecosystem rather than produce every programme item directly.

World Space Week 2026 runs October 4-10 under the global theme "Rocket Revolution." Uganda's 2026 campaign should connect this theme to PearlAfricaSat-1, ClimCam, astronomy outreach, Earth observation, aerospace engineering, and local innovation.

The 2025 registration data shows clear demand from students and young professionals. The most requested themes were networking, astronomy and astrophysics, satellite technology, aerospace engineering, and data science in space. The 2026 site should therefore support community mobilisation, submissions, event discovery, and long-term follow-up.

## Product Scope

First release:

- Public responsive website for Space Uganda.
- Dedicated WSW 2026 route at `/wsw-2026`.
- Real authenticated admin dashboard backed by a database.
- Admin-managed dynamic content for team, communities, events, WSW programme, partners, gallery, announcements, and submissions.
- Professional README and local setup documentation.
- Git repository maintained in the WSW folder.
- GitHub repository pushed under the Space Uganda organisation when GitHub account permissions allow it.

Out of scope for first release:

- Payment processing.
- Full e-commerce for shirts or merchandise.
- Complex role workflows such as multi-step editorial approvals.
- Native mobile apps.
- Live chat.
- Automated email campaigns beyond storing contact/submission data.

## Public Site Information Architecture

Primary navigation:

- Home
- About
- Communities
- Team
- WSW 2026
- Gallery
- Updates
- Join

Home:

- Institutional hero for Space Uganda.
- Short positioning: Uganda's national home for space enthusiasts, educators, engineers, innovators, astronomers, and partner organisations.
- Featured WSW 2026 campaign block.
- Ecosystem pillars: astronomy, aerospace engineering, Earth observation, education, policy, entrepreneurship, and community outreach.
- Featured communities and partners.
- Latest announcements.
- Clear calls to join, partner, submit an innovation, or explore WSW 2026.

About:

- Mission, vision, organising philosophy, and national context.
- Uganda space momentum: PearlAfricaSat-1, ClimCam, university talent, astronomy outreach, private aerospace initiatives, and STEM/STEAM education.
- Governance summary, including national coordination and committee model.

Communities:

- Directory of ecosystem organisations and communities.
- Initial list includes Space Junkies Uganda, StellarView Technologies, Uganda Astronomical Society, Makerere University, Makerere CEDAT, Holistic Inclusive Aviation Africa, KTA Advocates Centre for Law, Policy and Innovation Initiative, UAS, IEEE Makerere SB, IEEE AESS SBC Makerere, NOA's Quest, StellarView Technologies Ltd, Aerobuddies, NASA Space Apps Kampala, GDG On Campus Makerere University, Uganda Space Community, Kyambogo University, MUST, Busitema University, UCU, Nkumba University, UIRI, SGAC East Africa, GIS Uganda / Esri Eastern Africa, and relevant ministries or agencies when confirmed.
- Each community can have a logo, summary, category, website/social links, contact email, and featured status.

Team:

- National coordinators: Ronnie Atuhaire from Space Junkies Uganda and Zoora Harrison from StellarView Technologies.
- Other team members can be added by admin.
- Team profiles support roles, organisation, bio, photo, links, and ordering.

WSW 2026:

- Campaign route at `/wsw-2026`.
- Theme: Rocket Revolution.
- Dates: October 4-10, 2026.
- Structure: week-long digital engagement plus flagship physical day.
- Three immersive experiences:
  - Earth & Space for Uganda.
  - The Rocket Revolution.
  - Beyond Earth.
- Outdoor stargazing as a standalone evening experience.
- Innovation Showcase with submission CTA.
- Event schedule and partner roles.
- Safety framing: mechanical demonstrations and simulations instead of water or live-fuel rocketry where security and venue constraints apply.
- Event registration and global WSW calendar reminders.

Gallery:

- Public gallery section exists from launch.
- If empty, it shows a polished coming-soon state and invites users to return after events.
- Admin can add images/videos later with captions, dates, event links, and featured flags.

Updates:

- News, announcements, calls for volunteers, partner notices, and post-event stories.
- Admin-managed posts with publish/draft states.

Join:

- Contact form and join/community-interest form.
- Partner inquiry flow.
- Innovation Showcase submission entry point.

## Admin Dashboard

Admin route: `/admin`

Admin capabilities:

- Secure sign-in.
- Dashboard overview with counts and recent activity.
- Manage team members.
- Manage communities.
- Manage partners and sponsors.
- Manage WSW 2026 programme items.
- Manage events.
- Review Innovation Showcase submissions.
- Manage gallery items.
- Manage announcements and updates.
- Manage site settings such as hero copy, contact email, social links, featured CTA labels, and WSW campaign status.

Admin UX requirements:

- Responsive enough for tablet and desktop. Mobile should work for emergency edits, but desktop is the primary admin surface.
- Dense, calm, operational UI rather than marketing-style admin pages.
- Tables for records, filters/search where useful, status badges, edit dialogs/pages, confirmation for destructive actions.
- Clear empty states.
- Form validation with helpful messages.

## Data Model

Core entities:

- `User`: admin accounts, role, password hash, status.
- `TeamMember`: name, role, organisation, bio, photo, links, order, featured, published.
- `Community`: name, category, description, logo, website, socials, contact, location, featured, published.
- `Partner`: name, type, logo, website, description, contribution, featured, published.
- `Campaign`: name, slug, theme, dates, description, status, hero image.
- `WswProgrammeItem`: campaign, title, date/time, location, format, track, lead organisation, description, order, published.
- `Event`: title, slug, date/time, location, format, description, registration URL, campaign optional, published.
- `GalleryItem`: title, media type, image/video URL, caption, date, event optional, featured, published.
- `Announcement`: title, slug, excerpt, content, category, publishedAt, draft/published status.
- `Submission`: submitter details, organisation, category, title, abstract, support needs, safety notes, file/link, review status, reviewer notes.
- `SiteSetting`: key-value settings for editable global content.

Initial submission statuses:

- New
- Under Review
- Accepted
- Needs Changes
- Declined
- Archived

Initial roles:

- Admin
- Editor

Only admins can manage users and site settings. Editors can manage content and review submissions.

## Technical Architecture

Framework:

- Next.js App Router with TypeScript.
- Tailwind CSS for styling.
- Prisma ORM.
- PostgreSQL database.

Authentication:

- Credentials-based admin auth using hashed passwords.
- Invite or seed the first admin through environment variables or a setup script.
- Protected admin routes enforced server-side.

Storage:

- First release stores image/video URLs in the database.
- Local/public assets can be used for seed content and gallery placeholders.
- File upload storage can later be connected to S3, Cloudinary, Supabase Storage, or the deployment host's storage option.

Seed data:

- Seed Space Uganda core identity.
- Seed known communities and partners from the local WSW materials.
- Seed WSW 2026 campaign and three flagship experiences.
- Seed Ronnie Atuhaire and Zoora Harrison as national coordinator team profiles.
- Leave gallery initially empty or seeded with selected existing public-facing 2025/2026 assets if approved during implementation.

Local development:

- Provide `.env.example`.
- Provide database setup instructions.
- Prefer Docker Compose for local PostgreSQL if available.
- Include Prisma migrations and seed script.

Deployment:

- Keep deploy target flexible.
- Suitable targets include Vercel/Netlify for the app plus managed Postgres such as Neon or Supabase.
- DNS for `space.org.ug` and optional `wsw.space.org.ug` will be configured outside the app.

## Visual Direction

The public site should be institutional, modern, and space-forward without feeling like a sci-fi poster.

Style principles:

- Dark orbital base, white text, purple WSW accent, plus controlled Uganda/East Africa warmth through selective green/gold accents.
- Use real campaign imagery and WSW/space assets where they help credibility.
- Avoid one-note purple gradients.
- Use strong typography, generous spacing, and clear hierarchy.
- Public pages should feel credible to a ministry or university partner and exciting to students.
- Admin pages should be quiet, dense, and utilitarian.

Responsive requirements:

- Fully responsive public site across mobile, tablet, and desktop.
- Navigation collapses cleanly on mobile.
- Text must not overlap or overflow.
- Cards and tables must keep stable dimensions.
- Admin tables should degrade to stacked rows or horizontal scroll on mobile.

## Content Requirements

The copy should foreground:

- Space Uganda as the umbrella home.
- Collaboration across organisations rather than ownership by one group.
- Uganda's real space momentum.
- Youth, STEAM, research, policy, entrepreneurship, and public outreach.
- WSW 2026 as the first major national campaign under the umbrella.

The site must clearly state that World Space Week events should also be registered on the official global calendar at worldspaceweek.org, consistent with National Coordinator obligations.

## GitHub Plan

Target organisation display name: Space Uganda.
Likely GitHub organisation slug: `space-uganda`.
Target repository name: `space-org-ug`.

Implementation will attempt to use available authenticated GitHub tooling. If GitHub requires interactive organisation creation in the browser, the local repository will still be prepared completely, and the final push will happen after the organisation exists or to a user-owned temporary remote if explicitly approved.

The repository README must include:

- Project overview.
- Public site features.
- Admin dashboard features.
- Tech stack.
- Local setup.
- Environment variables.
- Database migration and seed commands.
- Deployment notes.
- Content management notes.
- Credits to organising communities and WSW context.

## Security And Privacy

- Passwords must be hashed.
- Admin routes must require authentication.
- Public forms must validate input.
- Submission data should not expose emails or phone numbers publicly.
- Environment secrets must not be committed.
- `.env.example` is committed; `.env` is ignored.

## Verification

Before completion:

- Install dependencies.
- Generate Prisma client.
- Run database migration or schema push locally.
- Seed local data.
- Run lint/type checks/build.
- Start local dev server.
- Verify public routes on desktop and mobile.
- Verify admin sign-in and CRUD for key models.
- Verify form submission creates database records.
- Verify README setup instructions.
- Verify git status is clean except for intentional untracked local environment files.

## Acceptance Criteria

The work is complete when:

- A full-stack responsive Space Uganda site exists locally in this folder.
- `/wsw-2026` presents the campaign professionally.
- `/admin` is protected and can manage dynamic content.
- Known communities and initial team profiles are seeded.
- Gallery section exists and is ready for future uploads/content.
- README explains the project and setup clearly.
- Code is committed locally.
- Code is pushed to GitHub under Space Uganda if account permissions allow; otherwise the exact GitHub blocker and next action are documented.

