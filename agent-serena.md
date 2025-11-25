# Serena Agent Guide

## Purpose

- Document how to work with the local Serena IDE assistant alongside GitHub Copilot.
- Capture team rules for memory usage so Copilot can reference a single source of truth.

## Quick Start

1. Open a PowerShell terminal and run:

   ```pwsh
   cd C:\Users\relay\Downloads\nan2\nano-main
   uvx --from git+https://github.com/oraios/serena serena start-mcp-server --context ide-assistant --project nano-main
   ```

2. Visit the dashboard at `http://127.0.0.1:24282/dashboard/index.html` to confirm the server is live and review logs.
3. Run the `onboarding` tool from the dashboard after each fresh launch to repopulate Serena's situational memory.

## Copilot Collaboration Rules

- Treat Serena as the source for symbol-level navigation and refactors; prefer its `find_symbol`, `find_referencing_symbols`, and `replace_symbol_body` tools before requesting full-file reads from Copilot.
- Use Copilot for quick code suggestions but verify with Serena's tooling (e.g., `search_for_pattern`, `get_symbols_overview`) before accepting large diffs.
- Keep Copilot prompts short and reference this file when asking it to recall Serena workflows (e.g., "See agent-serena.md for launch steps").

## Memory Workflow

- Store durable context with Serena's `write_memory` tool; keep each memory focused on a single topic (build steps, API quirks, etc.).
- Retrieve or audit memories with `list_memories` and `read_memory` before re-creating content.
- When a memory becomes obsolete, clean it up with `delete_memory` to avoid Copilot or Serena relying on stale information.

## Troubleshooting

- If the dashboard does not load, stop lingering `serena` processes (`Stop-Process -Name serena -ErrorAction SilentlyContinue`) and relaunch.
- TypeScript LSP timeout warnings are expected; Serena continues once the language server responds.
- If Copilot cannot locate Serena tools, confirm `agent-serena.md` instructions were followed and that the MCP server terminal is still running.
