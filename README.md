# Lysergic Portfolio

A Vercel-ready Next.js portfolio built around deterministic systems, production-grade automation, and project-led case studies.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Vercel deployment target

## Local development

### Prerequisites

- Node.js 20.9 or newer
- npm, pnpm, yarn, or bun

### Run locally

```bash
set -euo pipefail
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build for production

```bash
set -euo pipefail
npm install
npm run build
npm run start
```

## Deploy to Vercel

### Git-based deploy

1. Push this directory to GitHub.
2. Import the repository into Vercel.
3. Vercel will detect Next.js automatically.
4. Leave the default build settings unless you add runtime integrations later.

### CLI deploy

```bash
set -euo pipefail
npm i -g vercel
vercel
vercel --prod
```

## Content surfaces to edit

- `content/site.ts` for homepage copy, capabilities, principles, and metrics
- `content/systems.ts` for all system cards and detail pages
- `components/contact-panel.tsx` for contact methods and intake framing
- `app/about/page.tsx` for toolchain and engagement copy

## Suggested next edits

- Replace placeholder contact handles
- Replace placeholder metrics with artifact-backed numbers
- Add real screenshots or diagrams to each system entry
- Add analytics and a real contact form only after the static base is stable

## Risk notes

- Current build is low-risk because it is static-first
- Risk becomes medium once you add live APIs, forms, analytics, or heavy 3D scenes
- Keep the topology visual lightweight unless you intentionally move into a richer interactive shell
# lysergic.portfolio
