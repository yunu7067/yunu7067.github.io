// @ts-check

/** @type {import('./types').BlogConfigType} */
const blogConfig = {
	baseurl: "https://example.com.github.io",
	title: "tololo://",
	description: "YUNU7067's devLog",
	locale: {
		languageCode: "ko-KR",
	},
	rss: true,
	author: {
		name: "YUNU7067",
		comment: "We choose to go to the Moon;대한 간단한 설명을 기입해줍니다.",
	},
	avatar: {
		enabled: true,
		src: "/images/avatar.jpeg",
	},
	social: [
		{
			identifier: "github",
			name: "GitHub",
			url: "https://github.com/yunu7067/",
		},
		// {identifier: 'facebook', name: 'Facebook test', url: 'https://github.com/yunu7067/'},
		// {identifier: 'twitter', name: 'Twitter test', url: 'https://github.com/yunu7067/'},
		// {identifier: "discord", name: "Discord test", url: "https://github.com/yunu7067/"},
		// {identifier: 'instagram', name: 'Instagram test', url: 'https://github.com/yunu7067/'},
		// {identifier: 'linkedin', name: 'Linkedin test', url: 'https://github.com/yunu7067/'},
		{
			identifier: "npmjs",
			name: "Npmjs",
			url: "https://www.npmjs.com/~yunu7067",
		},
		// {identifier: 'youtube', name: 'Youtube test', url: 'https://github.com/yunu7067/'},
		{ identifier: "email", name: "Email", url: "mailto:yunu7067@gmail.com" },
		// {identifier: 'default', name: 'Default test', url: 'https://github.com/yunu7067/'},
	],
	theme: "auto",
	comments: {
		enabled: true,
		provider: "giscus",

		// https://giscus.app/
		giscus: {
			repo: "yunu7067/yunu7067.github.io",
			repoId: "MDEwOlJlcG9zaXRvcnkzNTMzNjU1MjQ",
			category: "giscus",
			categoryId: "DIC_kwDOFQ_uFM4CADJ2",
			mapping: "pathname",
			reactionsEnabled: "1",
			emitMetadata: "0",
			inputPosition: "bottom",
			lang: "ko",
			loading: "lazy ",
			lightTheme: "light",
			darkTheme: "dark_dimmed",
		},
	},
};

export default blogConfig;
