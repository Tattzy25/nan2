# TaTTTy Playground

TaTTTy Playground is a Next.js 16 application that lets creators generate, edit, and remix images with Google Gemini 3 Pro Image via the Vercel AI Gateway. The interface focuses on side-by-side inputs, granular aspect ratio controls, and a persistent gallery so you can iterate on prompts without losing previous results.

## Key Features

- **Dual-mode generation** – Automatically switches between text-to-image and image-editing based on whether you upload or reference source art.
- **Multi-source inputs** – Drag-and-drop, paste from clipboard, or supply URLs for up to two reference images with live previews.
- **HEIC/HEIF support** – Converts high-efficiency photos to JPEG in-browser and compresses large uploads before sending to the model.
- **Aspect ratio presets** – Quickly pick portrait, landscape, cinematic, and social-friendly ratios that map to Gemini’s supported sizes.
- **Progress & feedback** – Animated progress, toast notifications, and friendly error handling for oversized files or missing API keys.
- **Persistent history** – Recent generations are cached in localStorage so users can reopen or reload outputs as new inputs.
- **Power user tools** – Keyboard shortcuts, fullscreen lightbox, generation history scrubber, and run-again actions.

## Tech Stack

- [Next.js 16](https://nextjs.org/) App Router with React 19 and TypeScript
- Tailwind CSS v4 plus Radix UI primitives for accessible components
- Vercel AI SDK + `@ai-sdk/gateway` to proxy Gemini 3 Pro Image
- Vercel Analytics for lightweight telemetry

## Getting Started

1. **Install dependencies**

	```bash
	pnpm install
	```

2. **Create an environment file**

	```bash
	cp .env.example .env.local # create if it does not exist
	```

	Then add the required variables (see below).

3. **Run the dev server**

	```bash
	pnpm dev
	```

	The app defaults to `http://localhost:3000`.

## Environment Variables

| Variable | Description |
| --- | --- |
| `AI_GATEWAY_API_KEY` | Required. Vercel AI Gateway key that is authorized to call `google/gemini-3-pro-image`. |

When this key is missing the UI surfaces a warning via `/api/check-api-key`, and `/api/generate-image` will return a configuration error.

## Useful Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start Next.js in development with hot reload. |
| `pnpm build` | Create an optimized production bundle. |
| `pnpm start` | Run the production build locally. |
| `pnpm lint` | Execute `next lint` across the project. |

## Deploying

- **Vercel** – This repo is already wired for Vercel. Set `AI_GATEWAY_API_KEY` in your project settings and run `vercel --prod` or connect the repo for CI deployments.
- **Custom hosting** – Any Node 18+ environment with the env var set can run `pnpm build && pnpm start`.

## Project Structure

```text
app/                # App Router entrypoints, metadata, and API routes
components/         # ImageCombiner UI, Radix-based primitives, and custom hooks
public/             # Branding assets, favicons, OG images, and placeholders
styles/             # Global Tailwind layer overrides
```

## Troubleshooting

- **Missing API key** – Confirm `AI_GATEWAY_API_KEY` is available in the runtime; the UI disables generation otherwise.
- **Large uploads** – Images above ~10 MB or unsupported formats are rejected server-side; HEIC files are converted automatically client-side.
- **Clipboard permissions** – Some browsers require user interaction (click) before copy-to-clipboard works; the app surfaces a toast if blocked.

Feel free to open issues or PRs if you find rough edges—the README will evolve alongside new workflows (e.g., multi-step upscaling, advanced galleries).
