# CRITICAL: NEON AUTH ARCHITECTURE - DO NOT MODIFY

## ⚠️ EXTREMELY IMPORTANT - READ FIRST ⚠️

This project uses **NEON AUTH ONLY**. Do NOT add any other authentication systems.

---

## What is Neon Auth?

**Neon Auth is a PLATFORM FEATURE built into Neon Postgres, NOT a library.**

- Managed authentication service by Neon
- Handles: Google, GitHub, Resend email authentication  
- Issues JWTs with `user_id` claim
- Validates JWTs at database connection level
- Enforces Row-Level Security (RLS) automatically

---

## How Authentication Works

```
1. User authenticates via Neon's hosted UI
2. Neon Auth issues JWT with user_id claim
3. Client stores JWT (localStorage/cookie)
4. Client sends JWT in Authorization header
5. Neon Data API validates JWT
6. Neon extracts user_id from JWT
7. Database makes auth.user_id() available
8. RLS policies filter data automatically
```

---

## The neon_auth Schema

- **System-managed by Neon** (like pg_catalog)
- Contains user authentication records
- Provides `auth.user_id()` function
- **DO NOT MODIFY THIS SCHEMA**
- Automatically syncs with your users table

---

## Row-Level Security (RLS)

All data access is controlled by RLS policies:

```typescript
// lib/db/schema.ts - Example RLS policy
export const sites = pgTable('sites', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  // ...
}, (table) => ({
  rls: crudPolicy({
    role: authenticatedRole,
    read: authUid(table.userId),   // WHERE user_id = auth.user_id()
    modify: authUid(table.userId),
  })
}))
```

**What this means:**
- `authUid(table.userId)` expands to `user_id = auth.user_id()`
- Postgres automatically filters rows to current user
- No manual filtering needed in application code

---

## What You DON'T Need

❌ **No Stack Auth** - Conflicts with Neon Auth  
❌ **No Auth0, Clerk, Supabase Auth** - Neon Auth handles everything  
❌ **No JWT validation code** - Happens at database level  
❌ **No `getUser()` functions** - RLS enforces user context  
❌ **No authentication middleware** - Optional, RLS is authoritative  
❌ **No session management** - Neon Auth manages sessions  
❌ **No auth environment variables in app** - Configured in Neon Console

---

## Database Queries Are Automatically Filtered

```typescript
// This query automatically returns ONLY current user's sites
const sites = await db.query.sites.findMany()

// RLS policy filters it to:
// SELECT * FROM sites WHERE user_id = auth.user_id()
```

**You never write:**
```typescript
// ❌ WRONG - Don't do this
const user = await getUser()
const sites = await db.query.sites.findMany({
  where: eq(sites.userId, user.id)
})
```

**Instead:**
```typescript
// ✅ CORRECT - Let RLS handle it
const sites = await db.query.sites.findMany()
```

---

## Files That Should NOT Import Stack Auth

- ❌ `middleware.ts` - No stackApp imports
- ❌ `app/providers.tsx` - No StackProvider
- ❌ `app/dashboard/page.tsx` - No stackApp.getUser()
- ❌ `lib/db/schema.ts` - Only mention Neon Auth in comments
- ❌ Any component files - No useUser() hooks

---

## Configuration Location

**Neon Auth is configured in Neon Console, NOT in code:**

1. Go to Neon Console
2. Project Settings → Data API → Enable
3. Select "Neon Auth" as authentication provider
4. Configure OAuth (Google, GitHub)
5. Configure email provider (Resend)

**No environment variables needed in application.**

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Adding Stack Auth
```typescript
// WRONG - This conflicts with Neon Auth
import { stackApp } from "@/lib/stack"
const user = await stackApp.getUser()
```

### ❌ Mistake 2: Manual user filtering
```typescript
// WRONG - RLS already handles this
const sites = await db.query.sites.findMany({
  where: eq(sites.userId, currentUserId)
})
```

### ❌ Mistake 3: Middleware authentication
```typescript
// WRONG - Not needed, RLS enforces access
const user = await stackApp.getUser()
if (!user) redirect('/signin')
```

### ✅ Correct Pattern
```typescript
// CORRECT - Trust RLS policies
export default async function DashboardPage() {
  // RLS automatically filters to current user
  const sites = await db.query.sites.findMany()
  return <div>...</div>
}
```

---

## Verification

To verify Neon Auth is working:

```sql
-- Run this in Neon SQL Editor with a JWT
SELECT auth.user_id();

-- Should return: user_id from JWT
-- If null: JWT not being passed or validated
```

---

## Why This Project Failed to Build

**The build kept failing because:**

1. Stack Auth was imported but not installed correctly
2. Middleware tried to use `stackApp.getUser()` 
3. Providers wrapped app in `<StackProvider>`
4. Dashboard page called `stackApp.getUser()`
5. None of this is needed - Neon Auth handles everything

**Solution:**
- Removed all Stack Auth imports
- Deleted `lib/stack.ts`
- Simplified middleware (just routing)
- Removed StackProvider wrapper
- Let RLS handle authentication

---

## Golden Rule

**NEON AUTH IS THE ONLY AUTHENTICATION SYSTEM.**

If you're about to:
- Install an auth package
- Import Stack Auth, Auth0, Clerk, etc.
- Write JWT validation code
- Add authentication middleware
- Create getUser() functions

**STOP. Read this memory again.**

---

## Emergency Contact

If build fails due to auth:
1. Check for Stack Auth imports: `grep -r "@stackframe/stack"`
2. Check for stackApp usage: `grep -r "stackApp"`
3. Remove ALL matches
4. Trust RLS policies to enforce access control

---

**Last Updated:** December 3, 2025  
**Reason:** Build failures caused by Stack Auth conflicts with Neon Auth
