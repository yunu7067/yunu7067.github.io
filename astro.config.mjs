import {defineConfig} from 'astro/config';
import solid from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import image from '@astrojs/image';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import {
  remarkMath,
  remarkReadingTime,
  remarkCodeTitle,
  rehypeKatex,
  rehypeFigure,
  rehypeAutolinkHeading,
} from './plugins';
import AutoImport from 'astro-auto-import';

// https://astro.build/config
export default defineConfig({
  vite: {},
  site: 'https://yunu7067.github.io', // sitemap
  markdown: {
    // Applied to .md and .mdx files
    extendDefaultPlugins: true,
    remarkPlugins: [remarkReadingTime, remarkMath, remarkCodeTitle],
    rehypePlugins: [rehypeAutolinkHeading, rehypeKatex, rehypeFigure],
    syntaxHighlight: 'shiki',
    shikiConfig: {
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md#theming-with-css-variables
      theme: 'github-dark',
      wrap: true,
    },
  },
  integrations: [
    AutoImport({
      imports: [
        {
          '/src/components/MarkdownImage.astro': [['default', 'Image']],
        },
      ],
    }),
    mdx({}),
    solid(),
    tailwind(),
    image({logLevel: 'error'}),
    sitemap(),
  ],
});
