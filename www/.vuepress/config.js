const themeConfig = require('./themeConfig')

module.exports = {
	title: 'Otwarty Jazdów',
	
	description: 'Partnerstwo Otwarty Jazdów',
	
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

	head: [],

	postcss: {
		plugins: [
			require('postcss-preset-env')({}),
			require('lost')
		]
	},

	markdown: {
		extendMarkdown: md => {
			md.set({
				breaks: true
			})
		}
	},

	plugins: {
		'sitemap': {
			hostname: 'https://jazdow.pl'
		}
	}
}