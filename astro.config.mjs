// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://screengram.app',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [react(), sitemap()],
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Newsreader',
      cssVariable: '--serif',
      weights: [300, 400, 500, 600, 700, 800],
      styles: ['normal', 'italic'],
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--mono',
      weights: [400, 500, 600, 700],
      styles: ['normal', 'italic'],
    },
  ],
});
