<template lang="pug">
#home-page(v-if="page")
	oj-video(:sources="page.video", :subs="page.subs")
	#oj-about
		.inner-section
			h1.title {{page.intro}}
			oj-expander(:lang="page.lang")
				p(v-html="md(page.body)")
	#oj-cards
		.inner-section
			oj-card(
				v-for="item in page.cards"
				:link="item.link"
				:key="item.link"
				:title="item.title"
				:cover="item.cover"
				:caption="item.caption"
			)
</template>

<script>
import OjVideo from '~/components/OjVideo'
import OjExpander from '~/components/OjExpander'
import OjCard from '~/components/OjCard'
import {mapActions, mapState} from 'vuex'

import marked from 'marked'
marked.setOptions({breaks: true})

export default {
	name: 'home-view',

	layout: 'home',

	components: {OjVideo, OjExpander, OjCard},

	computed: {
		...mapState('pages', ['page'])
	},

	methods: {
		md(content){
			if (content) { return marked(content); } else { return ''; }
		},
		...mapActions('pages', ['getPage'])
	},

	mounted(){
		const locale = this.$i18n.defaultLocale === this.$i18n.locale ? '/pl' : ''
		const route = this.$route.fullPath.replace(/\/$/, '') + '/index'
		this.getPage(locale + route)
	}
}
</script>


<style scoped lang="stylus">
	@import '~assets/styles/component'
	.inner-section
		lost-center: $grid-width $gutter flex
		clearfix()
	#oj-about
		background-color white
		padding-top 8rem
		padding-bottom 6rem
		border-bottom 1px solid rgba($oj-dark .2)
		+below(800px, true)
			padding-top 6rem
			text-align center
		.inner-section
			display block
			width 100%
			max-width $grid-width * .75
		.title
			display block
			letter-spacing .075em
			font-size 2.2rem
			color $oj-dark
		.oj-expander
			max-width $grid-width * .6
			margin 0 auto
	#oj-cards
		background-color lighten($oj-violet, 98%)
		padding-top 8rem
		padding-bottom 2rem
		border-bottom 1px solid rgba($oj-dark, .2)
		min-height 100vh

	.banner
		background-color #FEDC32
		padding 3rem
		margin-top -8rem
		margin-bottom 8rem
		text-align center
		// font-family $P
		.image
			display block
			margin 0 auto
			max-width 20rem
		p
			font-size 1.6rem
			// font-weight bold
			letter-spacing 0.05em
			display block 
			margin 1rem auto
			max-width 72rem
			opacity .8
		a
			color inherit
		.action
			font-weight bold
</style>
