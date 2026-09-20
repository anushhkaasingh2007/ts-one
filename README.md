# TS-One — TRIBAL SCHOLAR ONE

Unified Scholarship Platform for Scheduled Tribe Students. A Smart India Hackathon 2026
prototype for a problem statement in the domain of the Ministry of Tribal Affairs (MoTA).

> This is an independent hackathon prototype, not an official Government of India website.
> Sample/demo data only.

## Stack

- **Client**: React + Vite + TypeScript, Tailwind CSS, Framer Motion, Recharts, Lucide icons
- **Server**: Node.js + Express + TypeScript, Prisma ORM
- **Database**: PostgreSQL

## Getting started

Requires Node.js 20+ and a local PostgreSQL server.

```bash
npm run install:all

# create the database once
createdb ts_one

# apply the schema and seed demo data
npm --prefix server run prisma:migrate
npm run seed

# run client + server together
npm run dev
```

Client runs at http://localhost:5173, API at http://localhost:4000.

### Demo login

```
Email:    demo.student@tsone.gov.in
Password: TSOne@2025
```

## Structure

```
ts-one/
  client/       React + Vite frontend
  server/       Express + Prisma API (PostgreSQL)
  vercel.json   Single-deployment config (serves client + /api together)
```

## Deploy to Vercel

The client and API ship as **one** Vercel project. The root `vercel.json` serves the
built client statically and routes `/api/*` to the Express app as a serverless function,
so the frontend calls the API same-origin (no `VITE_API_URL`, no CORS setup).

1. **Database** — create a Postgres database (e.g. [Neon](https://neon.tech), free tier)
   and copy its **pooled** connection string.
2. **Vercel project settings** — set the project's **Root Directory** to the repository
   root (not `client/`). The root `vercel.json` handles the build.
3. **Environment variables** (Vercel → Settings → Environment Variables):
   - `DATABASE_URL` — the Neon connection string
   - `JWT_SECRET` — a long random string
   - `NODE_ENV` — `production`
4. **Initialize the database** once, from your machine, pointing at the Neon DB:
   ```bash
   cd server
   DATABASE_URL="<neon-url>" npm run prisma:migrate
   DATABASE_URL="<neon-url>" npm run seed
   ```
5. **Deploy.** Login then works at `https://<your-app>.vercel.app/login` with the demo
   credentials above.
# ts-one
