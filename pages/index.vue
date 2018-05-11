<template lang="pug">
	#home-page
		oj-video(v-if="pageData.sources", :sources="pageData.sources", :subs="pageData.subs")
		#oj-about(v-if="pageData.about")
			.banner
				a.image(href="https://www.facebook.com/events/1931261793555033/" target="_blank")
					img(src="/static/images/banner-s.jpg")
				p Na początku grudnia 2017 spłonął jeden z domków fińskich na naszym osiedlu. Postanowiliśmy podjąć się wyzwania jego odbudowy, ale do tego potrzebujemy Twojej pomocy! Prowadzimy zbiórkę społecznościową na
				p
					a(href="https://odpalprojekt.pl/projekty/pokaz/1846,uratujmy-jazdow-34---odbudujmy-domek-finski-po-pozarze") OdpalProjekt.pl
				p Koszt takiej akcji jest bardzo duży, a nasza społeczność nie ma wiele zasobów, ale wierzymy, że razem osiągniemy cel!
				p
					a.action(href="https://www.facebook.com/events/1931261793555033/" target="_blank") Kliknij tutaj po więcej informacji
			.inner-section
				h1.title {{pageData.about}}
				oj-expander(:lang="lang", reveal="0")
					p(v-html="md(pageData.body)")

		#oj-cards(v-if="pageData.cards")
			.inner-section
					oj-card(v-for="item in pageData.cards", :link="item.link", :key="item.link",:title="item.title", :cover="item.cover", :caption="item.caption")
</template>

<script>
import OjVideo from '~/components/OjVideo'
import OjExpander from '~/components/OjExpander'
import OjCard from '~/components/OjCard'
import marked from 'marked'
marked.setOptions({breaks: true})

export default {
	name: 'home-view',

	components: {OjVideo, OjExpander, OjCard},

	props: {
		lang: String,
		pageData: {
			title: String,
			about: String,
			sources: Object,
			subs: Array,
			cards: Array,
			body: String
		}
	},

	methods: {
		md(content){
			if (content) { return marked(content); } else { return ''; }
		}
	}
}
</script>


<style scoped lang="stylus">
	@import '~assets/styles/component'
	.inner-section
		lost-center: $grid-width $gutter flex
		clearfix()
	#oj-about
		background-color: white
		padding-top: 8rem
		padding-bottom: 4rem
		+below(800px, true)
			padding-top: 6rem
			text-align: center
		.title
			display: block
			letter-spacing: .075em
			max-width: $grid-width * .6
			margin-left: auto
			margin-right: auto
	#oj-cards
		background-color: white
		padding-top: 8rem
		padding-bottom: 2rem
		border-bottom: 1px solid rgba($oj-dark, .2)

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
