const themeConfig = require('./themeConfig')

const HOSTNAME = 'https://jazdow.pl'
const DEFAULT_IMAGE = '/images/logo-wj.png'

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

			// obrazki z tresci sa praktycznie zawsze ponizej pierwszego ekranu;
			// przegladarka i tak laduje od razu te, ktore sa widoczne
			const renderImage = md.renderer.rules.image
			md.renderer.rules.image = (tokens, idx, options, env, self) => {
				tokens[idx].attrSet('loading', 'lazy')
				return renderImage
					? renderImage(tokens, idx, options, env, self)
					: self.renderToken(tokens, idx, options)
			}
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