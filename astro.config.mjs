import {defineConfig} from 'astro/config';
import {astroImageTools} from 'astro-imagetools';
import solid from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  vite: {},
  site: 'https://yunu7067.github.io', // sitemap
  markdown: {
    syntaxHighlight: 'shiki',
  },
  experimental: {
    ssr: false,
    integrations: true,
  },
  integrations: [solid(), tailwind(), sitemap(), astroImageTools],
});
