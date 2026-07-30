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
		['link', { rel: 'icon', href: '/favicon.ico', sizes: 'any' }],
		['link', { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' }],
		['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
		['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
		['meta', { name: 'theme-color', content: '#6ba568' }],
		// Dane strukturalne organizacji (S06). KRS/NIP/REGON w identifier, profile w sameAs.
		['script', { type: 'application/ld+json' }, JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'NGO',
			name: 'Partnerstwo Otwarty Jazdów',
			alternateName: 'Wolny Jazdów',
			url: 'https://jazdow.pl',
			logo: 'https://jazdow.pl/icon-512.png',
			image: 'https://jazdow.pl/images/banner.jpg',
			email: 'wolny@jazdow.pl',
			address: {
				'@type': 'PostalAddress',
				streetAddress: 'ul. Jazdów 10/5',
				postalCode: '00-467',
				addressLocality: 'Warszawa',
				addressCountry: 'PL'
			},
			identifier: [
				{ '@type': 'PropertyValue', propertyID: 'KRS', value: '0000737179' },
				{ '@type': 'PropertyValue', propertyID: 'NIP', value: '7010827495' },
				{ '@type': 'PropertyValue', propertyID: 'REGON', value: '380558414' }
			],
			sameAs: [
				'https://facebook.com/jazdow/',
				'https://instagram.com/wolny.jazdow/',
				'https://www.linkedin.com/company/jazdow',
				'https://youtube.com/@wolnyjazdow',
				'https://x.com/WolnyJazdow/'
			]
		})],
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

	plugins: [
		['sitemap', { hostname: 'https://jazdow.pl' }],
		[require('./plugins/oj-seo')]
	]
}