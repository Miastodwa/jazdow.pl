<template lang="pug">
.oj-intro
	article.content
		section.photos
			.photo(v-for="(image, i) in page.images", :class="'p'+i", :style="styles['shift'+i]")
				img(:src="image")
		section.text
			h1.title {{page.intro}}
			oj-expander(:lang="page.lang")
				.extended(v-html="md(page.body)")
</template>

<script>
import {mapActions, mapState} from 'vuex'
import OjExpander from '~/components/OjExpander'

import marked from 'marked'
marked.setOptions({breaks: true})

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

	computed: {
		...mapState('pages', ['page'])
	},

	methods: {
		...mapActions('pages', ['getPage']),

		md(content){
			if (content) { return marked(content); } else { return ''; }
		},

		scrollEvents(){
			const scrolled = window.pageYOffset
			this.styles.shift1 = {
				transform: `translateY(${ scrolled * -.07 }px)`
			}
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
@import '~assets/styles/component'

.oj-intro
	background-color white
	padding-top 8rem
	padding-bottom 6rem
	border-bottom 1px solid rgba($oj-dark .2)

.content
	lost-center $grid-width $gutter
.photos
	lost-column 5/12 3 $gutter
	position relative
	min-height calc(1200px * 5 / 12 * 1.2)
	+below($grid-width)
		min-height calc(100vw * 5 / 12 * 1.2)
	.photo
		max-width 75%
		position absolute
		top 0
		&.p0
			z-index 0
			left 20%
		&.p1
			z-index 1
			padding-top 20%
			img
				box-shadow 10px 10px 20px rgba(black .5)
.text
	lost-column 6/12 3 $gutter
.extended
	display block
	hyphens auto
	font-size 1.3rem
	// line-height 1.6em
	text-align justify
</style>
