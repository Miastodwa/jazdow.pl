module.exports = {
	parsePages: false, // ^3.2.3 this must be false, otherwise acorn error
	locales: [{
			code: 'pl',
			iso: 'pl-PL',
			name: 'Polski',
		},
		{
			code: 'en',
			iso: 'en-US',
			name: 'English'
		}
	],
	pages: {
		'historia': {
			en: '/history'
		},
		'mapa': {
			en: '/map'
		},
		'wydarzenia': {
			en: '/events'
		},
		'_page': {
			en: '/:page'
		},
		'domki/_id': {
			en: '/houses/:id'
		}
	},
	defaultLocale: 'pl'
}
