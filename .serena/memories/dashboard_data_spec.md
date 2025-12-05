# IMMEDIATE ACTION ITEMS

## 🎯 What We're Doing NOW
Replace demo dashboard with real data dashboard that queries Neon database

## 📋 Dashboard Data Requirements

### What Each Table Should Display

**1. SITES TABLE** (Main sites list)
```
Columns needed:
- Site Name (from sites.name)
- Domain (from sites.domain)
- Plan (from sites.plan) - Free/Pro/Business
- Pages Indexed (from sites.pagesIndexed)
- Status (from sites.status)
- Created (from sites.createdAt)
- Actions (copy snippet, view analytics, delete)

Query: SELECT * FROM sites WHERE user_id = ? ORDER BY createdAt DESC
```

**2. ANALYTICS TABLE** (Recent searches)
```
Columns needed:
- Query (from analyticsQueryEvents.query)
- Results (from analyticsQueryEvents.resultsCount)
- Latency (from analyticsQueryEvents.latencyMs) in ms
- When (from analyticsQueryEvents.createdAt)

Query: SELECT * FROM analyticsQueryEvents WHERE user_id = ? ORDER BY createdAt DESC LIMIT 50
```

**3. CRAWL JOBS TABLE** (Indexing history)
```
Columns needed:
- Site Name (from crawlJobs.site_id → sites.name)
- Status (from crawlJobs.status) - queued/running/completed/failed
- Pages (from crawlJobs.pagesIndexed)
- Started (from crawlJobs.startedAt)
- Finished (from crawlJobs.finishedAt)

Query: SELECT * FROM crawlJobs WHERE user_id = ? ORDER BY createdAt DESC
```

**4. QUOTAS CARD** (Usage meter)
```
Display needed:
- Queries Used / Limit (from quotas.queriesUsed / plan limit)
- Pages Crawled / Limit (from quotas.pagesCrawled / plan limit)
- Reset Date (from quotas.resetAt)
- Current Plan (from sites.plan)

Query: SELECT * FROM quotas WHERE site_id = ? AND user_id = ?
```

## 🔧 Component Rules (IMPORTANT)
- ✅ Use ONLY shadcn/ui: Button, Card, Table, Badge, Tabs, Dialog, Input, Label
- ✅ Use lucide-react for icons (Copy, Trash2, Eye, Download, etc)
- ✅ Tailwind for all styling
- ❌ NO custom components
- ❌ NO demo data
- ❌ NO placeholders for actual data

## 🚀 Implementation Order
1. Create `/app/(dashboard)/layout.tsx` - Navigation + sidebar
2. Create `/app/(dashboard)/page.tsx` - Main dashboard with stats
3. Create `/app/(dashboard)/sites/page.tsx` - Sites table with real data
4. Create `/app/(dashboard)/sites/[id]/page.tsx` - Site detail page with analytics
5. Create `/app/(dashboard)/analytics/page.tsx` - Full analytics dashboard
6. Test with real Neon data

## 📊 Sample Data to Create for Testing
```
1. Create Site: 
   POST /api/sites
   { "name": "My Blog", "domain": "https://myblog.com", "plan": "free" }

2. Create another Site:
   POST /api/sites
   { "name": "Docs", "domain": "https://docs.myapp.com", "plan": "pro" }

3. Generate Analytics (use embed.js widget to search)
   Each search = new analyticsQueryEvents record

4. Check Upstash for crawl jobs
   They auto-trigger via Workflow
```

## 🎨 Dashboard Visual Structure
```
Header: "Dashboard" + User avatar + Logout

Main Grid:
- Stats Cards (top): Total Sites | Total Queries | Pages Indexed | Current Plan
- Tabs: Sites | Analytics | Crawl Jobs

Sites Tab:
- Table: Name | Domain | Plan | Pages | Status | Created | Actions
- Button: "+ Add New Site"

Analytics Tab:
- Chart: Queries over time (optional, can skip)
- Table: Query | Results | Latency | When

Crawl Jobs Tab:
- Table: Site | Status | Pages | Started | Finished
```

## ⚡ Empty States
- No Sites: "No sites yet. Create your first site to get started."
- No Analytics: "No searches yet. Embed the widget and start searching!"
- No Crawl Jobs: "No crawl jobs yet. Wait for first automatic crawl."

## 🔐 Security
- ✅ All queries filtered by `user_id` (current user only)
- ✅ Use `stackApp.getUser()` to get userId in server component
- ✅ No user can see another user's data
