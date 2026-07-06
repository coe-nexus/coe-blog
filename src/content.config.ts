import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// This Zod schema is the single source of truth for a post's frontmatter.
// It validates every Markdown file at build time — and later doubles as
// the output schema for the AI drafting pipeline (Phase 2), so what the
// model generates and what the site builds can never drift apart.
const blog = defineCollection({
  // Load both plain Markdown (.md, hand-authored) and Markdoc (.mdoc, written
  // by Keystatic). Same frontmatter schema validates both.
  loader: glob({ pattern: '**/*.{md,mdoc}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    // The "answer capsule": a 40–60 word standalone summary. Shown right
    // under the H1 and reused as the meta description — this is the block
    // AI engines lift when citing the page.
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Izzy Kiver'),
    // Optional Q&A block → renders visibly AND as FAQPage JSON-LD.
    faq: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
