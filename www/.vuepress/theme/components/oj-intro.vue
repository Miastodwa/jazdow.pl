<template lang="pug">
	.oj-intro
		article.content
			section.photos
				.photo(v-for="(image, i) in $page.frontmatter.images", :class="'p'+i", :style="styles['shift'+i]")
					//- zdjecia sa czysto ilustracyjne i nie maja opisow we frontmatterze;
					//- puste alt sprawia, ze czytniki ekranu je pomijaja zamiast czytac sciezke
					img(:src="image", alt="", loading="lazy")
			section.text
				h1.title {{$page.frontmatter.intro}}
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
		window.addEventListener('scroll', this.scrollEvents)
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
.extended
	display block
	hyphens auto
	font-size 1.3rem
	// line-height 1.6em
	text-align justify
</style>
