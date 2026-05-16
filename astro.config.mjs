import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const { SITE_URL } = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '');

// URL situs untuk sitemap & canonical. Saat memakai domain sendiri, set
// SITE_URL di file .env atau di environment variable dashboard hosting.
const site = SITE_URL || 'https://toolkit-seller-indonesia.pages.dev';

export default defineConfig({
  site,
  output: 'static',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
