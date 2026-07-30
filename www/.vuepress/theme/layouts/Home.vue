<template lang="pug">
main
	oj-menu
	#home-page
		oj-intro
		.content
			.row.a
				a.banner-plakat(href="https://jazdow.pl/plakaty/2026_08.png" target="_blank" rel="noopener")
					img(src="/plakaty/aktualny_plakat.png" alt="Aktualny plakat zbiorczy")
			.row.b
				oj-card(v-for="(card, i) in $page.frontmatter.cards"
				:key="i"
				:title="card.title"
				:caption="card.caption"
				:cover="card.cover"
				:link="card.link")
	oj-footer
</template>

<script>
import OjMenu from '../components/oj-menu'
import OjIntro from '../components/oj-intro'
import OjCard from '../components/oj-card'
import OjFaqCard from '../components/oj-faq-card'
import OjEventsMini from '../components/oj-events-mini'
import OjFooter from '../components/oj-footer'

export default {
	name: 'home-view',

	layout: 'home',

	components: {OjMenu, OjIntro, OjCard, OjFaqCard, OjEventsMini, OjFooter}

}
</script>


<style scoped lang="stylus">
@import '../styles/component'
main
	margin-top 0
	transition margin-top .5s ease
.intro
	margin 6rem auto 0 auto
	.title
		display block
		width 100%
		font-size 2rem
	#tldr
		display block
		margin 0 auto
		p
			font-size 1.6rem
			margin-bottom 0
			@media print
				font-size 1.2rem

@media print
	#oj-menu
		display none

.content
	background white
	background-image url('../assets/ui/white-fumes-1.svg'), url('../assets/ui/bg-green.png')
	background-position center top, 0 0
	background-repeat no-repeat, repeat
	background-size  100%, 4rem
	// animation bg-flow 5s linear infinite
	padding-top 4rem
.row
	lost-center $grid-width $gutter flex
	padding-bottom $gutter
.row.b
	justify-content center
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
.banner-plakat
	display block
	width 66%
	margin 0 auto
	text-decoration none
	text-align center
	+below(600px)
		width 100%
	img
		width 100%
		height auto
		display block
		border-radius 4px
	span
		display block
		margin-top 0.5rem
		font-size 1rem
		color $oj-violet
.oj-faq-card
	margin-bottom $gutter
	+above(600px)
		lost-column 4/12 2 $gutter
.cards
	+above(600px)
		display flex
		flex-flow row wrap
		lost-column 8/12 2 $gutter
	+below(600px)
		width 100%
.oj-card
	+above(600px)
		lost-column 4/12 3 $gutter
		margin-bottom $gutter
.oj-card, .oj-faq-card
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
