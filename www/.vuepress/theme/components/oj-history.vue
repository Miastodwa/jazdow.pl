<template lang="pug">
	#oj-history
		.event(v-for="event in timeline")
			.date {{event.date}}
			.content
				h2.event-title {{event.title}}
				#subtitles
					.desc(v-if="event.text" v-html="render(event.text)")
					.image(v-if="event.photo")
						img(:src="event.photo.image", :alt="event.title")
</template>





<script>
import markdownIt from 'markdown-it'
const md = markdownIt({breaks: true})

export default {
	name: "oj-history",
	props: {
		timeline: Array
	},
	methods: {
		render(str){ return md.render(str) }
	}
}
</script>





<style scoped lang="stylus">
@import "../styles/component"

#oj-history
	display block
	border-top 1px solid $oj-violet
	padding-top 3rem
.event
	display flex
.date
	lost-column 2/8 2 $gutter
	position relative
	padding-right $gutter
	border-right .5rem solid $oj-green
	text-align right
	color $oj-violet
	line-height 1.2em
	font-weight 700
	font-family SC
	letter-spacing 0.08em
	text-transform uppercase
	font-size .9rem
	+below(1100px)
		lost-column 3/12 2 $gutter flex
	+below(600px)
		lost-column 4/12 2 $gutter*0.75 flex
		font-size .8rem
		padding-right $gutter*0.75
	&:after
		content ""
		display block
		position absolute
		top -.25rem
		right -1rem
		z-index 2
		width 1rem
		height 1rem
		border .25rem solid $oj-violet
		border-radius 50%
		background-color white
		box-shadow 0 2px 5px rgba($oj-violet, .5)
.content
	margin-bottom 3rem
	position relative
	max-width 32rem
	hyphens auto
	+below(1100px)
		lost-column 7/12 2 $gutter flex
		lost-offset 1/12 row flex
	+below(1100px)
		lost-column 8/12 2 $gutter flex
		lost-offset 0 row flex
	.event-title
		font-size .9rem
		line-height 1.2em
		font-weight 700
		font-family $base_font_family
		letter-spacing 0
		display block
		width 100%
		font-size 1.2rem
		margin 0 0 .5em 0
	p
		font-size 1.2rem
		letter-spacing 0
		line-height 1.5em
	.image
		display block
		width 50%
		margin .5rem 1rem 1rem 0
	.caption
		display block
		width 50%
		p
			font-size .9rem
			color rgba($oj-dark, .7)

</style>
