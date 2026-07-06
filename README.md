# coe-blog

The Covenant of Education resource blog. Standalone **Astro** (static) project,
deployed as its own **Cloudflare Worker** on the route `coveofedu.org/blog/*`.
It is fully decoupled from the main site Worker (`coe-site`) — that Worker keeps
serving everything except `/blog/*`.

## Stack
- **Astro 5** (static output), Content Collections with a Zod-validated schema.
- `base: '/blog'`, `outDir: './dist/blog'` — the build lands under `dist/blog/`
  so the Worker's `assets.directory: "./dist"` serves it at `coveofedu.org/blog/...`.
- JSON-LD (Organization / Person / Article / FAQPage) rendered at build time.
- `@astrojs/sitemap`.

## Local dev
```
npm install
npm run dev      # http://localhost:4321/blog/
npm run build    # outputs to ./dist/blog
npm run preview
```

## Writing a post
Add a Markdown file to `src/content/blog/<slug>.md`. Frontmatter is validated by
the schema in `src/content.config.ts`:
- `title`, `description` (the 40–60 word "answer capsule"), `pubDate` (required)
- `updatedDate`, `author` (defaults to "Izzy Kiver"), `faq` (Q&A array), `draft`

Use question-based `##` headings and keep sections tight — this is what earns
citations in AI search.

## Deploy (Cloudflare)
Connect this repo as a Worker project:
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Production branch: `main`
- Route: `coveofedu.org/blog/*` (zone `coveofedu.org`)

## Roadmap
- Phase 2: Keystatic admin at `/keystatic`, AI drafting pipeline (Claude + Zod),
  promptfoo evals, Cloudflare Zaraz analytics.
