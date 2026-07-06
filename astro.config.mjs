// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import markdoc from '@astrojs/markdoc';

// Standalone Astro project deployed as its own Cloudflare Worker on the
// route coveofedu.org/advice/* — it never touches the main site Worker.
// base:'/advice' + outDir:'./dist/advice' means the built files land
// physically under dist/advice/, so the Worker's assets directory (./dist)
// serves them at coveofedu.org/advice/... with no path rewriting.
// (The content still lives in src/content/blog/ internally — that folder
// name is just the collection key and does not affect the public URL.)
export default defineConfig({
  site: 'https://coveofedu.org',
  base: '/advice',
  outDir: './dist/advice',
  trailingSlash: 'always',
  // markdoc() lets posts authored in Keystatic (which writes .mdoc) render.
  // Existing .md posts keep rendering via the default Markdown pipeline.
  integrations: [markdoc(), sitemap()],
});
