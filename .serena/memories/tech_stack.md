# Tech Stack & Dependencies

## Frontend
- **Next.js** 15.5.7 (App Router, TypeScript, Turbopack)
- **React** 19
- **TailwindCSS** 4 (utility-first CSS)
- **shadcn/ui** - Button, Card, Dialog, Dropdown, Input, Label, Radio, Separator, Spinner, Table, Tabs (all from Radix UI)
- **lucide-react** - Icons
- **Zod** - Schema validation

## Backend
- **Next.js API Routes** (TypeScript)
- **Drizzle ORM** 0.44.7 (type-safe database)
- **@neondatabase/serverless** - HTTP Neon driver

## Database
- **Neon Postgres** (serverless, HTTP driver)
- 9 tables with indexes and RLS enabled
- Drizzle migrations in `drizzle/` folder

## Authentication
- **@stackframe/stack** - Stack Auth (OAuth + Magic Links + OTP)
- JWT validation via JWKS
- Row-level security on 4 tables

## External Services
- **Upstash Search** - Vector search + typo-tolerant search
- **Upstash Crawler** - Site indexing
- **Upstash Workflow** - Scheduled crawling (optional)
- **Resend** - Email notifications (already configured)

## Encryption
- **AES-256-GCM** via `lib/crypto.server.ts` (Node.js)
- **Web Crypto API** via `lib/crypto.edge.ts` (Edge runtime)

## Development Tools
- **ESLint** - Code linting
- **TypeScript** 5 - Type checking
- **Turbopack** - Fast bundling

## Key Files
- `lib/db/schema.ts` - Database schema (9 tables, all relations)
- `lib/stack.ts` - Stack Auth configuration
- `lib/crypto.server.ts` - Server encryption
- `lib/crypto.edge.ts` - Edge encryption
- `middleware.ts` - Route protection
- `app/providers.tsx` - Stack Auth provider setup
