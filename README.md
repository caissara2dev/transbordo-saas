# Transbordo SaaS

Greenfield B2B SaaS rebuild for the transbordo operations product.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth
- Postgres + Drizzle ORM

## Product direction

- Vertical SaaS
- Organization-based tenancy
- Sales-led onboarding
- Single-site per organization in v1
- Core operations + reporting in first release

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Local demo mode

If you want to inspect the protected workspace without wiring Supabase or Postgres yet, enable:

```bash
APP_DEMO_MODE=true
```

Then open `/dashboard` or use the demo entry point on `/login`.
