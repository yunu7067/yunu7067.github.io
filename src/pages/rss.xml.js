import rss from '@astrojs/rss';
import config from '$config';

export const get = () => {
  if (config.rss) {
    const postImportResult = import.meta.glob('./p/**/*.{md,mdx}', {eager: true});
    const posts = Object.values(postImportResult);

    return rss({
      title: config.title,
      description: config.description,
      site: import.meta.env.SITE,
      items: posts
        .map(post => ({
          link: post.url,
          title: post.frontmatter.title,
          description: post.frontmatter?.description || '',
          pubDate: post.frontmatter.publishDate,
        }))
        .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate)),
    });
  } else {
    return rss({
      title: config.title,
      description:
        'If you want to using rss, change the `rss` from `false` to `true` in the blog config.',
      site: import.meta.env.SITE,
      items: [],
    });
  }
};
