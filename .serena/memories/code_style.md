# Code Style, Conventions & Guidelines

## Naming Conventions
- **Files**: kebab-case (`my-component.tsx`, `database-schema.ts`)
- **Components**: PascalCase (`MyComponent`, `SitesList`)
- **Functions**: camelCase (`getUserSites`, `createSite`)
- **Variables**: camelCase (`userId`, `siteName`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINT`, `MAX_PAGES`)
- **Database tables**: snake_case (`analytics_query_events`, `crawl_jobs`)
- **Database columns**: snake_case (`user_id`, `created_at`)

## TypeScript Rules
- ✅ Always use explicit types (no `any`)
- ✅ Use `interface` for object shapes
- ✅ Use `type` for unions/primitives
- ✅ Generics for reusable components
- ✅ Return types on all functions

## React Component Rules
- ✅ Server components by default (`export default async function Page()`)
- ✅ Only use `"use client"` when needed (hooks, interactivity)
- ✅ Props as typed interfaces
- ✅ Only shadcn/ui components allowed (no custom UI components)
- ✅ Use Tailwind classes for styling
- ✅ Use lucide-react for icons

## Database (Drizzle ORM)
- ✅ Define schema in `lib/db/schema.ts`
- ✅ Use `db.insert()`, `db.query()`, `db.update()`, `db.delete()`
- ✅ Always include proper relations
- ✅ Index on foreign keys and frequently queried columns
- ✅ Use transactions for multi-table operations

## API Routes
- ✅ Always check auth: `const user = await stackApp.getUser()`
- ✅ Validate input: `schema.parse(body)`
- ✅ Return proper HTTP status codes
- ✅ Use NextResponse for responses
- ✅ Log errors for debugging

## Security
- ✅ Validate referrer on search API
- ✅ Check quotas before serving results
- ✅ Encrypt sensitive data (Upstash credentials)
- ✅ Always check user ownership of resources
- ✅ HTML-escape user input in widget

## File Organization
```
app/
  ├── api/                    # API routes
  ├── auth/                   # Auth pages (signin, signup)
  ├── (dashboard)/            # Dashboard pages (layout, page, sites, etc)
  ├── layout.tsx              # Root layout
  ├── page.tsx                # Landing page
  └── providers.tsx           # Stack Auth provider

lib/
  ├── db/
  │   ├── schema.ts           # Drizzle schema (9 tables)
  │   └── index.ts            # Database client
  ├── crypto.server.ts        # Server encryption
  ├── crypto.edge.ts          # Edge encryption
  ├── stack.ts                # Stack Auth config
  └── utils.ts                # Helpers

components/
  └── ui/                      # shadcn/ui only

public/
  └── embed.js                # Search widget (566 lines)
```

## Import Paths
- `@/lib/db` - Database client
- `@/lib/stack` - Stack Auth
- `@/components/ui/button` - shadcn Button
- `@/components/ui/card` - shadcn Card
- etc.

## Docstrings
- Use JSDoc for functions
- Document params and return types
- Example: `/** Get all sites for user @param userId - User ID @returns Array of sites */`

## Error Handling
- Try/catch in API routes
- Return 400 for validation errors
- Return 401 for auth errors
- Return 500 for server errors
- Log error details for debugging
