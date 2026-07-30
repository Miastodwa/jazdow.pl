<template lang="pug">
	.oj-intro
		article.content
			section.photos
				.photo(v-for="(image, i) in $page.frontmatter.images", :class="'p'+i", :style="styles['shift'+i]")
					img(:src="image", alt="")
			section.text
				h1.sr-only Wolny Jazdów
				p.hero-lead {{$page.frontmatter.intro}}
				oj-expander
					Content.extended
</template>

<script>
import OjExpander from './oj-expander'

export default {
	name: 'oj-intro',
	
	components: {OjExpander},

	data(){
		return {
			styles: { 
				shift1: null,
				shift2: null
			}
		}
	},

	methods: {

		scrollEvents(){
			window.requestAnimationFrame( ()=> {
				const scrolled = window.pageYOffset
				this.styles.shift1 = {
					transform: `translateY(${ (scrolled * -.07).toFixed(2) }px)`
				}
			})
		}
	},

	mounted() {
		// Paralaksa tylko gdy uzytkownik nie prosi o ograniczenie ruchu (A08)
		const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
		if (!reduce) {
			window.addEventListener('scroll', this.scrollEvents)
		}
	},

	destroyed(){
		window.removeEventListener('scroll', this.scrollEvents)
	}

}
</script>

<style lang="stylus" scoped>
@import '../styles/component'

.oj-intro
	background-color white
	padding-top 8rem
	padding-bottom 6rem
.content
	lost-center $grid-width $gutter
.photos
	position relative
	+above(700px)
		lost-column 5/12 3 $gutter
	+below(700px)
		max-width 40rem
		margin 0 auto
	.photo
		max-width 100%
		img
			width 100%
			display block
		&.p0
			z-index 0
		&.p1
			position absolute
			top 0
			z-index 1
			padding-top 20%
			img
				box-shadow 10px 10px 20px rgba(black .5)
.text
	+above(700px)
		lost-column 6/12 3 $gutter
	+below(700px)
		max-width 40rem
		margin 6rem auto 0
	.hero-lead
		font-family $extra_font_family
		font-size 1.8rem
		font-weight 700
		line-height 1.4em
		letter-spacing .02em
		margin-bottom 1em
.extended
	display block
	hyphens auto
	font-size 1.3rem
	// line-height 1.6em
	text-align justify
</style>
