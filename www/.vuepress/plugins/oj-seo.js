// Lokalny plugin SEO: per-strona unikalny opis + Open Graph + Twitter Card.
// Znaleziska S01/S02 z AUDIT.md. Dziala na etapie budowania (extendPageData),
// wiec tagi trafiaja do statycznego HTML (widoczne dla crawlerow i social).

const OG_IMAGE = 'https://jazdow.pl/images/banner.jpg'
const SITE = 'https://jazdow.pl'

function clean(s) {
	return String(s)
		.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')   // obrazki md
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')  // linki md -> tekst
		.replace(/[#>*_`~]/g, ' ')                // znaczniki md
		.replace(/\s+/g, ' ')
		.trim()
}

function truncate(s, n) {
	if (s.length <= n) return s
	return s.slice(0, n - 1).replace(/\s+\S*$/, '').trim() + '…'
}

module.exports = (options, ctx) => ({
	name: 'oj-seo',

	extendPageData($page) {
		const fm = $page.frontmatter || {}
		const path = $page.path || '/'
		const isEn = path.startsWith('/en/')
		const siteName = isEn ? 'Open Jazdów' : 'Wolny Jazdów'
		const title = $page.title || siteName

		// Zrodlo opisu: tldr -> intro -> adres (domki) -> tytul -> opis serwisu
		const raw = fm.tldr || fm.intro || fm.address ||
			(title && title !== siteName ? title : '') ||
			(isEn ? 'Open Jazdów Partnership' : 'Partnerstwo Wolny Jazdów')
		const desc = truncate(clean(raw), 160)
		fm.description = desc

		// Kanoniczny URL = realnie serwowany "ladny" adres (/co-robimy/),
		// a nie sciezka VuePressa (/co-robimy.html).
		const cleanPath = path === '/' ? '/' : path.replace(/index\.html$/, '').replace(/\.html$/, '/')
		const url = SITE + cleanPath
		const ogTitle = title === siteName ? siteName : (title + ' | ' + siteName)
		// Kanoniczny <link> wstrzykuje postbuild (frontmatter.head nie renderuje w VuePress 1).

		fm.meta = (fm.meta || []).concat([
			{ property: 'og:type', content: 'website' },
			{ property: 'og:site_name', content: siteName },
			{ property: 'og:title', content: ogTitle },
			{ property: 'og:description', content: desc },
			{ property: 'og:url', content: url },
			{ property: 'og:image', content: OG_IMAGE },
			{ property: 'og:locale', content: isEn ? 'en_US' : 'pl_PL' },
			{ property: 'og:locale:alternate', content: isEn ? 'pl_PL' : 'en_US' },
			{ name: 'twitter:card', content: 'summary_large_image' },
			{ name: 'twitter:title', content: ogTitle },
			{ name: 'twitter:description', content: desc },
			{ name: 'twitter:image', content: OG_IMAGE }
		])

		$page.frontmatter = fm
	}
})
