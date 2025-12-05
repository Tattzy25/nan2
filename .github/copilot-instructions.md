# Copilot Coding Agent Instructions

## Repository Overview

**TaTTTy** is a Next.js 16 web application for AI-powered tattoo image generation. It uses Google's AI model via Vercel AI Gateway to create and edit tattoo designs from text prompts or reference images. The app stores generated images in Vercel Blob Storage and uses Upstash Search for indexing.

**Type**: Full-stack TypeScript web application  
**Size**: ~10,000 lines of code, 120+ files  
**Framework**: Next.js 16 (App Router) with React 19  
**Package Manager**: pnpm 10.24.0 (required)

## Build Commands

**Always use pnpm, never npm.**

```bash
# Install dependencies (required before any other command)
pnpm install

# Build for production (uses Turbopack)
pnpm build

# Start development server
pnpm dev

# Lint with ultracite/biome (note: "pnpm lint" requires configuration)
pnpm check

# Format code
pnpm format
```

### Known Build Issues

1. **Google Fonts**: Build may fail in network-restricted environments due to Google Fonts fetch failures. This is an environmental issue, not a code issue.

2. **Lint command**: `pnpm lint` may fail with "Invalid project directory". Use `pnpm check` instead for linting via ultracite/biome.

3. **TypeScript errors are ignored**: `next.config.mjs` has `ignoreBuildErrors: true`, so TypeScript errors won't fail builds but should still be fixed.

## Project Structure

```
app/                    # Next.js App Router pages and API routes
  ├── api/              # API endpoints
  │   ├── generate-image/route.ts   # Main image generation endpoint
  │   ├── check-api-key/            # API key validation
  │   └── upload-image.ts           # Blob storage upload
  ├── actions/          # Server actions
  ├── globals.css       # Global styles (Tailwind v4)
  ├── layout.tsx        # Root layout with fonts and providers
  └── page.tsx          # Home page

components/
  ├── ui/               # shadcn/ui components (69 files)
  └── image-combiner/   # Main image generation UI
      ├── index.tsx     # Primary component (750 lines)
      ├── hooks/        # Custom React hooks
      └── *.tsx         # Sub-components

lib/
  ├── utils.ts          # Utility functions (cn, isValidUUID)
  └── grok/             # AI description generation

hooks/                  # Global React hooks
public/                 # Static assets (logos, icons)
```

## Key Configuration Files

- `package.json` - Scripts, dependencies (pnpm required)
- `tsconfig.json` - TypeScript config (strict mode, bundler resolution)
- `next.config.mjs` - Next.js config with Turbopack, workflow integration
- `components.json` - shadcn/ui configuration (New York style)
- `postcss.config.mjs` - PostCSS with Tailwind v4
- `.env.example` - Required environment variables template

## Environment Variables

Required variables (see `.env.example`):
- `AI_GATEWAY_API_KEY` - Vercel AI Gateway key
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob Storage
- `UPSTASH_SEARCH_REST_*` - Upstash Search credentials

## Code Conventions

1. **Component Library**: Use only shadcn/ui components from `components/ui/`. Add new components with `pnpm dlx shadcn@latest add <component>`.

2. **Styling**: Tailwind CSS v4 with custom CSS variables in `app/globals.css`. Use `cn()` utility from `@/lib/utils` for class merging.

3. **Imports**: Use `@/` path alias (e.g., `@/components/ui/button`, `@/lib/utils`).

4. **File Naming**: kebab-case for files (`my-component.tsx`), PascalCase for components.

5. **TypeScript**: Strict mode enabled, use explicit types. Avoid `any`.

6. **Server/Client**: Default to server components. Add `"use client"` only when hooks or interactivity needed.

## Validation Checklist

Before completing any change:

1. Run `pnpm install` if dependencies changed
2. Run `pnpm check` to lint (fix any errors)
3. Run `pnpm build` to verify production build
4. Verify no new TypeScript errors introduced
5. Test changes work in dev with `pnpm dev`

## CI/CD

The repository uses GitHub Actions with Copilot workflows:
- `Copilot code review` - Automated PR reviews
- `Copilot coding agent` - Automated coding tasks

No additional CI configuration files exist. Deployment is to Vercel (auto-deploys on push to main).

## Key Implementation Details

- **Image Generation**: `app/api/generate-image/route.ts` handles both text-to-image and image-editing modes
- **State Management**: Local component state with `usePersistentHistory` hook for localStorage persistence
- **Image Upload**: Drag-and-drop support, HEIC conversion, clipboard paste
- **Theming**: Dark/light mode via `next-themes` with `ThemeProvider`

## Trust These Instructions

These instructions have been validated against the actual codebase. Only perform additional exploration if the information needed is not covered here.
