// Postbuild HTML: transformacje, ktorych VuePress 1 nie da sie zrobic konfiguracja.
//  1) usuniecie <meta name="generator"> (wpisane na sztywno w @vuepress/core) — S03
//  2) wstrzykniecie <link rel="canonical"> z realnie serwowanym "ladnym" URL-em — S04
//     (frontmatter.head nie renderuje sie per-strona w VuePress 1)

const fs = require('fs')
const path = require('path')

const dist = path.join(__dirname, '..', 'www', '.vuepress', 'dist')
const SITE = 'https://jazdow.pl'
const GENERATOR = /\s*<meta name="generator"[^>]*>/g

let stripped = 0
let canon = 0

function cleanUrl(file) {
	// dist/co-robimy/index.html -> /co-robimy/ ; dist/index.html -> /
	let rel = path.relative(dist, file).split(path.sep).join('/')
	rel = rel.replace(/index\.html$/, '')
	if (!rel.startsWith('/')) rel = '/' + rel
	return SITE + rel
}

function walk(dir) {
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, entry.name)
		if (entry.isDirectory()) { walk(p); continue }
		if (!entry.name.endsWith('.html')) continue

		let html = fs.readFileSync(p, 'utf8')
		const before = html

		html = html.replace(GENERATOR, '')
		if (html !== before) stripped++

		if (!/rel="canonical"/.test(html)) {
			const link = `<link rel="canonical" href="${cleanUrl(p)}">`
			html = html.replace('</head>', link + '</head>')
			canon++
		}

		if (html !== before) fs.writeFileSync(p, html)
	}
}

if (fs.existsSync(dist)) {
	walk(dist)
	console.log(`postbuild: usunieto generator z ${stripped} plikow, dodano canonical do ${canon}`)
} else {
	console.warn('postbuild: brak katalogu dist — pomijam')
}
