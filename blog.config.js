// @ts-check

/** @type {import('./src/types').BlogConfigType} */
const blogConfig = {
  baseurl: 'https://yunu7067.github.io',
  title: 'tololo://',
  description: 'An example blog on Astro',
  locale: {
    languageCode: 'ko-KR',
  },
  author: {
    name: 'YUNU7067',
    comment: '여기에는 이 글쓴이에 대한 간단한 설명을 기입해줍니다.',
  },
  avatar: {
    enabled: true,
    src: '/public/assets/profile/avatar.jpeg',
  },
  social: [
    {identifier: 'github', name: 'GitHub test', url: 'https://github.com/yunu7067/'},
    {identifier: 'facebook', name: 'Facebook test', url: 'https://github.com/yunu7067/'},
    {identifier: 'twitter', name: 'Twitter test', url: 'https://github.com/yunu7067/'},
    {identifier: 'discord', name: 'Discord test', url: 'https://github.com/yunu7067/'},
    {identifier: 'instagram', name: 'Instagram test', url: 'https://github.com/yunu7067/'},
    {identifier: 'linkedin', name: 'Linkedin test', url: 'https://github.com/yunu7067/'},
    {identifier: 'npmjs', name: 'Npmjs test', url: 'https://github.com/yunu7067/'},
    {identifier: 'youtube', name: 'Youtube test', url: 'https://github.com/yunu7067/'},
    {identifier: 'email', name: 'email test', url: 'mailto:yunu7067@gmail.com'},
    {identifier: 'default', name: 'Default test', url: 'https://github.com/yunu7067/'},
  ],
  theme: 'auto',
  comments: {
    enabled: true,
    provider: 'giscus',

    // https://giscus.app/
    giscus: {
      repo: 'yunu7067/astro-blog',
      repoId: 'R_kgDOG92tFg',
      category: 'giscus',
      categoryId: 'DIC_kwDOG92tFs4CP4r0',
      mapping: 'pathname',
      reactionsEnabled: '1',
      emitMetadata: '0',
      inputPosition: 'bottom',
      lang: 'ko',
      loading: 'lazy ',
      lightTheme: 'light',
      darkTheme: 'dark_dimmed',
    },
  },
};

export default blogConfig;
