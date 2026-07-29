const themeConfig = require('./themeConfig')

const HOSTNAME = 'https://jazdow.pl'
const DEFAULT_IMAGE = '/images/banner.jpg'

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
		['link', { rel: 'icon', href: '/favicon.ico' }],
		['script', { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }]
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
			hostname: HOSTNAME
		},
		[require.resolve('./plugins/og-meta')]: {
			hostname: HOSTNAME,
			image: DEFAULT_IMAGE
		}
	}
}