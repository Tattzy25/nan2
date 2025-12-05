# Commands & Workflows

## Development Commands

### Start Development Server
```bash
pnpm dev
```
Starts Next.js dev server with Turbopack on `http://localhost:3000`

### Build for Production
```bash
pnpm build
```
Builds optimized production bundle with Turbopack

### Start Production Server
```bash
pnpm start
```
Runs built production server

### Linting & Type Checking
```bash
pnpm lint              # Run ESLint
pnpm type-check        # TypeScript check
```

## Database Commands

### Push Schema to Neon
```bash
pnpm db:push
```
Applies `lib/db/schema.ts` changes to Neon database

### Generate Migrations
```bash
pnpm db:generate
```
Creates migration files from schema changes (in `drizzle/` folder)

### Run Migrations
```bash
pnpm db:migrate
```
Applies pending migrations to database

### Open Drizzle Studio
```bash
pnpm db:studio
```
Opens GUI tool to browse/edit database at `http://local.drizzle.studio`

## Git Workflow
```bash
git status                 # Check changes
git add .                  # Stage all
git commit -m "message"    # Commit
git push                   # Push to origin
```

## Windows Terminal Commands
```powershell
cd path/to/folder          # Change directory
Get-ChildItem              # List files (ls alias)
New-Item -ItemType File    # Create file
Remove-Item file.txt       # Delete file
```

## Debugging

### Check Environment
```bash
echo $env:DATABASE_URL     # Test env var (PowerShell)
```

### Run TypeScript Check
```bash
pnpm type-check
```

### View Neon Logs
- Open Neon Console: https://console.neon.tech
- Select project → Logs

## Testing Data Flow

### Test API
```bash
# Create site
curl -X POST http://localhost:3000/api/sites \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","domain":"https://test.com"}'

# Search
curl "http://localhost:3000/api/search?q=test&siteKey=YOUR_KEY"
```

### Test Database
```bash
pnpm db:studio
# Browse tables, view records
```

## When Task is Completed

1. **Run type check**: `pnpm type-check`
2. **Run linting**: `pnpm lint`
3. **Test in dev**: `pnpm dev` and manually test
4. **Commit changes**: `git add . && git commit -m "feature: description"`
5. **Push**: `git push`

## Important Notes
- Always run `pnpm db:push` after schema changes
- Always check `.env.local` has all required vars before `pnpm dev`
- Restart dev server after `.env.local` changes
- Use `pnpm db:studio` to verify data changes
- No custom components - only shadcn/ui + Tailwind
