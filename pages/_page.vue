<template lang="pug">
.page-view(v-if="page")
	.intro
		h1.title {{page.title}}
		.tldr(v-html="page.tldr")
	article(v-html="md(page.body)")
</template>

<script>
import {mapState, mapActions} from 'vuex'
import marked from 'marked'
marked.setOptions({breaks: true})

export default {
	name: "article-view",

	computed: {
		...mapState('pages', ['page'])
	},

	methods: {
		md(content){
			if (content) { return marked(content) } else { return '' }
		},
		...mapActions('pages', ['getPage'])
	},

	mounted(){
		const locale = this.$i18n.defaultLocale === this.$i18n.locale ? '/pl' : ''
		this.getPage(locale + this.$route.fullPath)
	}
}
</script>


<style scoped lang='stylus'>
@import '~assets/styles/component'
.page-view
	lost-center: 800px $gutter no-flex
	+below(800px)
		margin-top 8rem
.title
	text-align center
.tldr
	text-align center
article
	margin 4rem auto
	border-top 1px solid $oj-violet
	padding-top 2rem
	max-width 800px
	hyphens auto
	text-align justify
	text-align-last center
	a[href]
		white-space nowrap
</style>
