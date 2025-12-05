# Build and Deployment Configuration

## Package Manager

**USE PNPM, NOT NPM**

```bash
# ✅ Correct
pnpm install
pnpm run build
pnpm run dev

# ❌ Wrong
npm install
npm run build
npm run dev
```

---

## Build Scripts

From `package.json`:

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start",
    "lint": "eslint",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio"
  }
}
```

---

## Turbopack

This project uses **Turbopack** (Next.js's new bundler) for both dev and build:

- `--turbopack` flag is required for both `dev` and `build` commands
- Significantly faster than Webpack
- Built-in to Next.js 15+

---

## Common Build Issues Fixed

### Issue 1: Stack Auth Imports (RESOLVED)
**Problem:** Build failed with Stack Auth imports that don't exist

**Files that had Stack Auth:**
- `middleware.ts` - imported `stackApp`
- `app/providers.tsx` - wrapped app in `<StackProvider>`
- `app/dashboard/page.tsx` - called `stackApp.getUser()`
- `lib/stack.ts` - Stack Auth configuration (deleted)
- `lib/db/schema.ts` - Stack Auth comments

**Solution:** Removed all Stack Auth code, simplified to Neon Auth

### Issue 2: ChartAreaInteractive Props
**Problem:** Dashboard tried to pass `data` prop to `ChartAreaInteractive` component that doesn't accept it

**Solution:** Component uses internal `chartData`, removed prop from dashboard page

---

## Deployment Platform

**Vercel** (configured for Edge runtime where needed)

### Edge Runtime Routes

These routes MUST use Edge runtime:
- `/api/search` - Low latency search queries
- Any route using `lib/crypto.edge.ts`

```typescript
// Example: app/api/search/route.ts
export const runtime = 'edge'
```

### Node.js Runtime Routes

Standard routes use Node.js runtime:
- `/api/crawl` - Background crawler
- `/api/sites` - Site management
- Dashboard pages

---

## Environment Variables

### Required for Vercel Deployment

```bash
# Database (Neon)
DATABASE_URL=postgresql://...

# Upstash (Search)
UPSTASH_SEARCH_REST_URL=https://...
UPSTASH_SEARCH_REST_TOKEN=...

# Encryption keys
ENCRYPTION_KEY=... # 64-char hex string for AES-256-GCM
ENCRYPTION_IV=...  # 32-char hex string for IV
```

### NOT Required

❌ No Stack Auth environment variables:
- ~~`NEXT_PUBLIC_STACK_PROJECT_ID`~~
- ~~`NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY`~~
- ~~`STACK_SECRET_SERVER_KEY`~~

Neon Auth is configured in Neon Console, not via environment variables.

---

## Build Verification

After removing Stack Auth, build should succeed:

```bash
pnpm run build
```

Expected output:
```
✓ Next.js 15.5.7 (Turbopack)
✓ Compiled successfully in Xs
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

---

## Local Development

```bash
# Install dependencies
pnpm install

# Run dev server (uses Turbopack)
pnpm run dev

# Open http://localhost:3000
```

---

## Database Commands

```bash
# Generate migrations from schema changes
pnpm run db:generate

# Apply migrations to database
pnpm run db:migrate

# Push schema directly (dev only)
pnpm run db:push

# Open Drizzle Studio (database GUI)
pnpm run db:studio
```

---

## Vercel Deployment

### Automatic Deployment

Every push to `main` branch triggers:
1. Install dependencies (`pnpm install`)
2. Build project (`pnpm run build`)
3. Deploy to production

### Build Settings

In Vercel project settings:

**Framework Preset:** Next.js  
**Build Command:** `pnpm run build`  
**Install Command:** `pnpm install`  
**Output Directory:** `.next`  
**Node.js Version:** 20.x or 22.x

---

## Troubleshooting Deployment Failures

### "Module not found: @stackframe/stack"

**Cause:** Stack Auth imports still present in code

**Solution:**
```bash
# Search for any remaining Stack Auth references
grep -r "@stackframe/stack" .
grep -r "stackApp" .
grep -r "StackProvider" .

# Remove all matches
# See CRITICAL-neon-auth-architecture memory
```

### "Type error in dashboard/page.tsx"

**Cause:** Passing props to components that don't accept them

**Solution:** Check component definitions, remove invalid props

### "Edge runtime error"

**Cause:** Using Node.js APIs in Edge runtime

**Solution:**
- Use `lib/crypto.edge.ts` for Edge routes (Web Crypto API)
- Use `lib/crypto.server.ts` for Node.js routes (Node crypto module)

---

## Key Takeaways

1. **Always use pnpm** - npm has issues with this workspace
2. **Stack Auth is removed** - Don't add it back
3. **Neon Auth handles authentication** - No code needed
4. **Turbopack is enabled** - Faster builds and dev
5. **Edge runtime for search** - Low latency requirement

---

**Last Updated:** December 3, 2025  
**Reason:** Fixed build failures from Stack Auth conflicts
