const pkg = require('./package')

module.exports = {
	mode: 'universal',

	/*
	 ** Headers of the page
	 */
	head: {
		title: pkg.name,
		meta: [{
				charset: 'utf-8'
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1'
			},
			{
				hid: 'description',
				name: 'description',
				content: pkg.description
			}
		],
		link: [{
			rel: 'icon',
			type: 'image/x-icon',
			href: '/favicon.ico'
		}]
	},

	/*
	 ** Customize the progress-bar color
	 */
	loading: {
		color: '#FFFFFF'
	},

	/*
	 ** Global CSS
	 */
	css: [],

	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [],

	/*
	 ** Nuxt.js modules
	 */
	modules: [
		// Doc: https://github.com/nuxt-community/axios-module#usage
		'@nuxtjs/axios'
	],
	/*
	 ** Axios module configuration
	 */
	axios: {
		// See https://github.com/nuxt-community/axios-module#options
	},

	/*
	 ** Build configuration
	 */
	build: {
		vendor: ['delay', 'smoothscroll-polyfill', 'marked', 'moment', 'stickybits'],

		postcss: [
			require('postcss-cssnext')({
				browsers: ['last 2 versions'],
				features: {
					customProperties: {
						warnings: false
					}
				}
			}),
			require('lost')
		],
		extend(config, ctx) {
			// Run ESLint on save
			if (ctx.isDev && ctx.isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				})
			}
			config.module.rules.push({
				test: /\.(md)$/,
				loaders: ['json-loader', 'front-matter-loader']
			})
			config.module.rules.push({
				test: /\.(yml|yaml)$/,
				loaders: ['json-loader', 'yaml-loader'],
				exclude: /(node_modules)/
			})

			// replace svg rule
			const urlLoader = config.module.rules.find(
				rule => rule.loader === 'url-loader'
			)
			urlLoader.test = /\.(png|jpe?g|gif)$/

			// use url-loader for *.svg
			config.module.rules.push({
				test: /\.svg$/,
				oneOf: [{
						resourceQuery: /icon/,
						loader: 'vue-svg-loader'
					},
					{
						loader: 'url-loader'
					}
				]
			})
		}
	}

}
