const themeConfig = require('./themeConfig')

module.exports = {
	title: 'Wolny Jazdów',

	description: 'Partnerstwo Wolny Jazdów',
	
	themeConfig: themeConfig,

	locales: {
		'/': {
			lang: 'pl-PL'
		},
		'/en/': {
			lang: 'en-US',
			title: 'Open Jazdow',
			description: 'Open Jazdów Partnership'
		}
	},

	head: [
		['link', { rel: 'icon', href: '/favicon.ico' }]
	],

	postcss: {
		plugins: [
			require('postcss-preset-env')({}),
			require('lost')
		]
	},

	markdown: {
		extendMarkdown: md => {
			md.set({
				breaks: true,
				linkify: true
			})
			md.use(require('markdown-it-footnote'))
		}
	},

	plugins: {
		'sitemap': {
			hostname: 'https://jazdow.pl'
		}
	}
}