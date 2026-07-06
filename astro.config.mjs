// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The blog is a standalone Astro project deployed as its own Cloudflare
// Worker on the route coveofedu.org/blog/* — it never touches the main
// site Worker. base:'/blog' + outDir:'./dist/blog' means the built files
// land physically under dist/blog/, so the Worker's assets directory
// (./dist) serves them at coveofedu.org/blog/... with no path rewriting.
export default defineConfig({
  site: 'https://coveofedu.org',
  base: '/blog',
  outDir: './dist/blog',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
