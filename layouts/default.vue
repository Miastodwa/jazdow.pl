<template lang='pug'>
#app
	main
		oj-menu(:lang="$route.params.lang", :items="siteData.mainMenu[$route.params.lang]")
		nuxt(:lang="$route.params.lang", :pageData="pageData", :pageAssets="pageAssets")
		oj-footer(:contact="siteData.contacts[$route.params.lang]", :social="siteData.social")
</template>

<script>
import OjMenu from '~/components/OjMenu'
import OjFooter from '~/components/OjFooter'
import axios from 'axios'
import marked from 'marked'
import smoothscroll from 'smoothscroll-polyfill'

marked.setOptions({breaks: true})
smoothscroll.polyfill()

export default {
	name: 'app',
	components:
		{OjMenu, OjFooter},

	data() {
		return {
			lang: this.$route.params.lang,
			siteData: {
				siteTitle: {
					en: 'Open Jazdów',
					pl: 'Otwarty Jazdów'
				},
				mainMenu: {
					pl: [{title: '', href: ''}],
					en: [{title: '', href: ''}]
				},
				social: [{type: '', href: ''}],
				contacts: {
					pl: {
						title: '',
						details: ''
					},
					en: {
						title: '',
						details: ''
					}
				}
			},
			pageData: {},
			pageAssets: [],
			body: '',
			contentful: {
				access_token: 'f1327a31d7b854da3031df4c29776fc8753b4a9755c152a4ee36904e4c2dc2e7',
				spaces: 'y31296ljrxkk'
			}
		};
	},

	computed: {
		base() {
			return `https://cdn.contentful.com/spaces/${this.contentful.spaces}/entries`;
		}
	},

	head: {
		title() {
			return {
				inner: this.siteData.siteTitle[this.lang],
				complement: this.pageData.title
			};
		},
		meta() {
			return [
				{name: 'description', content: this.pureBody().substring(0, 150)},
				{itemprop: 'name', content: this.siteData.siteTitle[this.lang]},
				{itemprop: 'description', content: this.pureBody().substring(0, 150)},
				// {itemprop: 'image', content: ''}
				// {property: 'fb:app_id', content: ''}
				{property: 'og:type', content: 'website'},
				{property: 'og:url', content: `http://jazdow.pl${window.location.pathname}`},
				{property: 'og:title', content: this.siteData.siteTitle[this.lang]},
				{property: 'og:image', content: ''},
				// {property: 'og:image:width', content: '1200'}
				{property: 'og:image:height', content: '630'},
				{property: 'og:description', content: this.pureBody().substring(0, 250)},
				{property: 'og:site_name', content: this.siteData.siteTitle[this.lang]}
			];
		}
	},

	methods: {
		getSiteData() {
			({token: this.contentful.access_token});
			return axios.get(
				this.base, {
				params: {
					access_token: this.contentful.access_token,
					content_type: "site",
					select: "fields",
					limit: 1
				}
			}
			)
			.then( (res=> {
					return this.siteData = res.data.items[0].fields;
				})
			);
		},
		getPageData(){
			const id = this.$route.params.id || '';
			const { lang } = this.$route.params;
			return axios.get(
				this.base, {
				params: {
					access_token: this.contentful.access_token,
					content_type: this.$route.name,
					select: "fields",
					limit: 1,
					"fields.lang": lang,
					"fields.id": id
				}
			}
			)
			.then( (res=> {
					if (res.data.items) {
						this.pageData = res.data.items[0].fields;
					} else {
						this.pageData = {};
					}
					if (res.data.includes) {
						return this.pageAssets = res.data.includes.Asset;
					} else {
						return this.pageAssets = [];
					}
				})
			)
			.catch( (error=> {
					console.log(error);
					this.pageData = {};
					return this.pageAssets = [];
				})
			);
		},

		pureBody() {
			return this.md(this.body).replace(/<[^>]*>/g, '');
		},

		toggleVideoClass(pageName){
			if (pageName === 'home') {
				return this.$el.classList.add('video-bg');
			} else {
				return this.$el.classList.remove('video-bg');
			}
		},

		md(content){
			if (content) { return marked(content); } else { return ''; }
		}
	},

	mounted() {
		return this.toggleVideoClass(this.$route.name);
	},

	created() {
		this.getSiteData();
		return this.getPageData();
	},

	watch: {
		$siteData() {
			return this.$emit('updateHead');
		},
		$pageData() {
			return this.$emit('updateHead');
		},
		$route(next, prev){
			this.getPageData();
			this.$emit('updateHead');
			this.toggleVideoClass(next.name);
			return window.scroll({ top: 0, behavior: 'smooth' });
		}
	}
}
</script>



<style lang='stylus'>
@import '~assets/styles/global'
pre
	font-size: .9rem
main
	margin-top: 0
	transition: margin-top .5s ease
	clearfix()
.video-bg
	main
		margin-top: $video-ratio
		+below(780px, true, null, 'portrait')
			margin-top: $video-ratio*2
.intro
	margin: 6rem auto 0 auto
	.title
		display: block
		width: 100%
		font-size: 2rem
	#tldr
		display: block
		margin: 0 auto
		p
			font-size: 1.6rem
			margin-bottom: 0
			@media print
				font-size: 1.2rem

@media print
	#oj-menu
		display: none
</style>
