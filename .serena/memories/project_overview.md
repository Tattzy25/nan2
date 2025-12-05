# Bridgit-AI Project Overview

## Project Purpose
**Bridgit-AI** is a serverless search platform that transforms any website into an intelligent search experience. It provides:
- Embeddable floating search widget (566-line professional widget)
- Full dashboard for site owners to track analytics
- Pricing tiers: Free (200 pages, 1000 queries/mo), Pro ($12, 2000 pages, 10k queries), Business ($49, 10k pages, 100k queries)
- Real-time search powered by Upstash Search
- Automatic site crawling via Upstash Workflow

## Current Status
- ✅ Core API endpoints functional (POST /api/sites, GET /api/search, POST /api/crawl)
- ✅ Database schema complete (9 tables, Neon Postgres)
- ✅ Stack Auth integration (Google OAuth, GitHub OAuth, Magic Links, OTP)
- ✅ Search widget enhanced (566 lines with keyboard nav, analytics, responsive)
- ✅ Encryption at rest (AES-256-GCM)
- ⏳ Dashboard being integrated (wiring real data, removing mock data)
- ⏳ Auth UI (sign-in/sign-up placeholders)
- ⏳ Onboarding wizard
- ⏳ Search bar design showcase (4 variants planned)

## Critical Info
- **NO CUSTOM COMPONENTS** - Only shadcn/ui components allowed
- **Real data only** - No mock/demo data in dashboard
- **Use only existing tables** - No new database tables needed
- **Production ready** - 18 RLS tables enabled (policies not critical for MVP)

## Key Directories
- `app/` - Next.js app directory (routes, API, dashboard)
- `lib/db/` - Drizzle ORM schema (9 tables)
- `lib/` - Utilities (crypto, auth, utils)
- `components/` - React components (shadcn/ui only)
- `public/` - Static assets + embed.js widget
- `drizzle/` - Database migrations

## Database Tables (9 Total)
1. `users` - Stack Auth managed
2. `accounts` - Auth sessions
3. `sessions` - Auth sessions
4. `verificationTokens` - Auth tokens
5. `sites` - Customer websites (user_id, domain, plan, publicKey, pagesIndexed, status)
6. `search_indexes` - Upstash index mappings (site_id, encrypted credentials)
7. `crawl_jobs` - Crawl history (site_id, status, pagesIndexed, startedAt, finishedAt)
8. `analytics_query_events` - Search queries (site_id, query, resultsCount, latencyMs, selectedDocId, createdAt)
9. `quotas` - Usage tracking (site_id, queriesUsed, pagesCrawled, resetAt, period, plan)

## API Endpoints
- `POST /api/sites` - Create site + get embed snippet
- `GET /api/search` - Search with quota validation, referrer check, analytics logging
- `POST /api/crawl` - Upstash Workflow webhook (stub, optional)

## Authentication
- Stack Auth configured in `lib/stack.ts`
- Middleware protects `/app/*` routes
- All API endpoints check `stackApp.getUser()`
- Credentials in `.env.local`

## Search Widget (`public/embed.js`)
- 566 lines, production-ready
- Features: Cmd+K keyboard nav, loading states, analytics tracking, HTML escaping, responsive, accessibility
- Configuration: data-site-key (required), data-endpoint, data-accent, data-position
- No external dependencies (vanilla JS)
