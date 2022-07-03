// @ts-check

/** @type {import('./src/types').BlogConfigType} */
const blogConfig = {
  baseurl: 'https://yunu7067.github.io2',
  title: 'tololo://',
  description: "YUNU7067's log",
  locale: {
    languageCode: 'ko-KR',
  },
  author: {
    name: 'YUNU7067',
    comment: '끊임없이 공부하는 사람이 되고싶은 개발자.',
  },
  avatar: {
    enabled: true,
    src: '/public/assets/profile/avatar.jpeg',
  },
  social: [
    {identifier: 'github', name: 'GitHub', url: 'https://github.com/yunu7067/'},
    // {identifier: 'facebook', name: 'Facebook test', url: 'https://github.com/yunu7067/'},
    // {identifier: 'twitter', name: 'Twitter test', url: 'https://github.com/yunu7067/'},
    {identifier: 'discord', name: 'Discord', url: 'https://discordapp.com/users/태규#6493/'},
    // {identifier: 'instagram', name: 'Instagram test', url: 'https://github.com/yunu7067/'},
    // {identifier: 'linkedin', name: 'Linkedin test', url: 'https://github.com/yunu7067/'},
    {identifier: 'npmjs', name: 'Npmjs', url: 'https://www.npmjs.com/~yunu7067'},
    // {identifier: 'youtube', name: 'Youtube test', url: 'https://github.com/yunu7067/'},
    {identifier: 'email', name: 'Email', url: 'mailto:yunu7067@gmail.com'},
    // {identifier: 'default', name: 'Default test', url: 'https://github.com/yunu7067/'},
  ],
  theme: 'auto',
  comments: {
    enabled: true,
    provider: 'giscus',

    // https://giscus.app/
    giscus: {
      repo: 'yunu7067/yunu7067.github.io',
      repoId: 'MDEwOlJlcG9zaXRvcnkzNTMzNjU1MjQ',
      category: 'giscus',
      categoryId: 'DIC_kwDOFQ_uFM4CADJ2',
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
