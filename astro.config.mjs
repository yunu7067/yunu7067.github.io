import {defineConfig} from 'astro/config';
import solid from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import image from '@astrojs/image';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import {remarkReadingTime} from './plugins/remark-reading-time.mjs';

// https://astro.build/config
export default defineConfig({
  vite: {},
  site: 'https://yunu7067.example.com', // sitemap
  markdown: {
    // Applied to .md and .mdx files
    extendDefaultPlugins: true,
    remarkPlugins: [remarkReadingTime, remarkMath],
    rehypePlugins: [rehypeKatex],
    syntaxHighlight: 'shiki',
    shikiConfig: {
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md#theming-with-css-variables
      theme: 'github-dark',
      wrap: true,
    },
  },
  integrations: [mdx({}), solid(), tailwind(), image({logLevel: 'silent'}), sitemap()],
});
