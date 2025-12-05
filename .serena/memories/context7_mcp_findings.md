MCP (Context7) — Key findings (2025-12-04)

- MCP is a JSON-RPC style protocol with task & progress support via unique progressToken and notifications.
- Clients/servers declare capabilities (elicitation, tasks, sampling). Capability negotiation avoids runtime surprises.
- Task lifecycle: create → progress notifications → completed/failed/cancelled.

Bridgit‑AI implications:
- Use progressTokens for long-running crawl/index flows to stream real-time status in the dashboard (Finding pages → Building index → Complete).
- Use MCP task lifecycle to integrate Upstash Workflow safely (server-side only). Avoid exposing progress tokens or secrets client-side.
- Opt-in advanced features only after capability negotiation to avoid mismatches.

Next safe steps:
1) Restore deleted files (fix hydration) — non-destructive.
2) Wire sidebar "My Dashboard" to the approved route (no new pages/components unless explicitly approved).
3) When ready: implement MCP-based progress subscription for crawl/index jobs.
