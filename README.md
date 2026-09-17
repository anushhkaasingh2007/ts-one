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
  client/   React + Vite frontend
  server/   Express + Prisma API (PostgreSQL)
```
# ts-one
