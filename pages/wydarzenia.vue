<template lang='pug'>
#events-view(v-if="page")
	.intro
		h1.title {{page.title}}
	fb-events
	.intro
		#tldr(v-html="md(page.body)")
	.calendar-illustration
</template>


<script>
import {mapState, mapActions} from 'vuex'
import FbEvents from '~/components/fb-events'
import marked from 'marked'
marked.setOptions({breaks: true})

export default {
	name: "article-view",

	components: {
		FbEvents
	},

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
#events-view
	lost-center: $grid-width $gutter no-flex
	+below(800px)
		margin-top: 8rem
	.intro
		margin-left: auto
		margin-right: auto
		text-align: center
		max-width: 44rem
.calendar-illustration
	width: 100%
	margin-bottom: 4rem
	margin-top: 4rem
	img
		display: block
		margin: 0 auto
		width: 12rem
		height: auto
#oj-calendar
	margin: 4rem 0
	lost-column: 1/1 0 $gutter flex
	margin-bottom: 10rem
	+below(1100px)
		lost-column: 1/1 0 $gutter flex
		text-align: center
	+below(800px)
		lost-column: 1/1 0 $gutter flex
		lost-offset: 0 row flex

</style>
