<template lang="pug">
#home-page(v-if="page")
	oj-video(:sources="page.video", :subs="page.subs")
	oj-intro
	.content
		.row.a
			oj-map-card
			oj-events-mini
		.row.b
			oj-card(v-for="card in page.cards"
			:key="card.link"
			:title="card.title"
			:caption="card.caption"
			:cover="card.cover"
			:link="card.link")
</template>

<script>
import OjVideo from '~/components/oj-video'
import OjIntro from '~/components/oj-intro'
import OjCard from '~/components/oj-card'
import OjMapCard from '~/components/oj-map-card'
import OjEventsMini from '~/components/oj-events-mini'
import {mapActions, mapState} from 'vuex'

import marked from 'marked'
marked.setOptions({breaks: true})

export default {
	name: 'home-view',

	layout: 'home',

	components: {OjVideo, OjIntro, OjCard, OjMapCard, OjEventsMini},

	computed: {
		...mapState('pages', ['page'])
	},

	methods: {
		md(content){
			if (content) { return marked(content); } else { return ''; }
		},
		...mapActions('pages', ['getPage'])
	},

	async beforeMount(){
		const locale = this.$i18n.defaultLocale === this.$i18n.locale ? '/pl' : ''
		const route = this.$route.fullPath.replace(/\/$/, '') + '/index'
		await this.getPage(locale + route)
	}
}
</script>


<style scoped lang="stylus">
@import '~assets/styles/component'
.content
	background white
	background-image url('~/assets/ui/white-fumes-1.svg'), url('~/assets/ui/bg-green.png')
	background-position center top, 0 0
	background-repeat no-repeat, repeat
	background-size  100%, 4rem
	// animation bg-flow 5s linear infinite
	padding-top 4rem
.row
	lost-center $grid-width $gutter flex
	padding-bottom $gutter
.oj-map-card
	+above(700px)
		lost-column 8/12 2 $gutter
	+below(700px)
		width 100%
		max-width 40rem
		margin $gutter auto
.oj-events-mini
	+above(700px)
		lost-column 4/12 2 $gutter
	+below(700px)
		width 100%
		max-width 40rem
		margin $gutter auto
.oj-card
	+above(600px)
		lost-column 4/12 3 $gutter
	+below(600px)
		width 100%
		max-width 40rem
		margin .5rem auto
@keyframes bg-flow
	0%
		background-position 4rem 4rem
	100%
		background-position 0 0
</style>
