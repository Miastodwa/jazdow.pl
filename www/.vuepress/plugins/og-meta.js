const path = require('path')
const fs = require('fs')

/**
 * Dokleja tagi Open Graph i Twitter Card do wygenerowanych stron.
 *
 * VuePress 1 renderuje serwerowo wylacznie `head` z config.js - tagi podane
 * w `frontmatter.head` trafiaja tylko do bundla i sa dopisywane przez JS juz
 * w przegladarce. Roboty Facebooka i Twittera nie wykonuja JS, wiec widzialyby
 * goly URL. Dlatego wstrzykujemy je w hooku `generated`, czyli po zapisaniu
 * plikow HTML na dysk.
 */

const escapeAttribute = value =>
	String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')

const describe = (page, fallback) =>
	(page.frontmatter.description || '').trim() ||
	(page.frontmatter.tldr || '').trim() ||
	fallback

const metaTagsFor = (page, { hostname, defaultImage }) => {
	const isEnglish = page.path.startsWith('/en/')
	const siteName = isEnglish ? 'Open Jazdow' : 'Wolny Jazdów'
	const description = describe(
		page,
		isEnglish ? 'Open Jazdów Partnership' : 'Partnerstwo Wolny Jazdów'
	)
	const shareTitle = page.title ? `${page.title} – ${siteName}` : siteName
	const image = hostname + (page.frontmatter.image || defaultImage)
	const isHome = page.path === '/' || page.path === '/en/'

	return [
		['property', 'og:type', isHome ? 'website' : 'article'],
		['property', 'og:site_name', siteName],
		['property', 'og:title', shareTitle],
		['property', 'og:description', description],
		['property', 'og:url', hostname + page.path],
		['property', 'og:image', image],
		['property', 'og:locale', isEnglish ? 'en_US' : 'pl_PL'],
		['name', 'twitter:card', 'summary_large_image'],
		['name', 'twitter:title', shareTitle],
		['name', 'twitter:description', description],
		['name', 'twitter:image', image]
	]
		.map(
			([attr, key, value]) =>
				`<meta ${attr}="${key}" content="${escapeAttribute(value)}">`
		)
		.join('')
}

module.exports = (options, ctx) => {
	const hostname = (options.hostname || '').replace(/\/$/, '')
	const defaultImage = options.image || '/'

	return {
		name: 'og-meta',

		// dzieki temu VuePress wygeneruje opis per strona zamiast jednego dla calego serwisu
		extendPageData($page) {
			$page.frontmatter.description = describe(
				$page,
				$page.path.startsWith('/en/')
					? 'Open Jazdów Partnership'
					: 'Partnerstwo Wolny Jazdów'
			)
		},

		async generated() {
			let injected = 0

			for (const page of ctx.pages) {
				// ta sama sciezka co w @vuepress/core/lib/node/build/index.js
				const filename = decodeURIComponent(page.path)
					.replace(/\/$/, '/index.html')
					.replace(/^\//, '')
				const filePath = path.resolve(ctx.outDir, filename)

				if (!fs.existsSync(filePath)) continue

				const html = fs.readFileSync(filePath, 'utf-8')
				if (html.includes('property="og:title"')) continue

				fs.writeFileSync(
					filePath,
					html.replace('</head>', metaTagsFor(page, { hostname, defaultImage }) + '</head>')
				)
				injected++
			}

			console.log(`  OG META  tagi dodane do ${injected} stron`)
		}
	}
}
