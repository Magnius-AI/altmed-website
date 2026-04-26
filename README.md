# Altmed Medical Center Monorepo

This repository contains the Altmed Medical Center website and admin platform refactored into:

- `backend/`: NestJS 10 API with PostgreSQL, JWT auth, CRUD modules, SEO endpoints, analytics, uploads, and seed data.
- `frontend/`: Next.js 14 App Router application with public pages, protected admin routes, and typed API integration.

## Workspace

```bash
npm install
```

## Local development

Start PostgreSQL first, then run the apps:

```bash
docker compose up -d postgres
npm run dev:backend
npm run dev:frontend
```

Or run both from the root:

```bash
npm run dev
```

If you prefer Docker for the full dev stack:

```bash
docker compose up --build
```

If you want seed data after the database is up:

```bash
npm run seed
```

## Apps

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`

Nginx is only used in production via `docker-compose.prod.yml`.

## Seeded defaults

- 1 admin user
- 8 service pages
- FAQs
- 3 blog posts
- 1 active announcement
- Site settings and provider profile
