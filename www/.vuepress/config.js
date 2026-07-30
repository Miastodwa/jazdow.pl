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

			// Obrazki z tresci sa niemal zawsze ponizej pierwszego ekranu — lazy
			// oszczedza transfer, decoding=async nie blokuje watku (P04 z AUDIT.md).
			const renderImage = md.renderer.rules.image
			md.renderer.rules.image = (tokens, idx, options, env, self) => {
				tokens[idx].attrSet('loading', 'lazy')
				tokens[idx].attrSet('decoding', 'async')
				return renderImage
					? renderImage(tokens, idx, options, env, self)
					: self.renderToken(tokens, idx, options)
			}
		}
	},

	plugins: {
		'sitemap': {
			hostname: 'https://jazdow.pl'
		}
	}
}