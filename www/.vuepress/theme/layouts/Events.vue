<template lang='pug'>
#events-view
	.intro
		h1.title {{$page.frontmatter.title}}
	fb-events
	.intro
		Content#tldr
	.calendar-illustration
</template>


<script>
import FbEvents from '../components/fb-events'


export default {
	name: "article-view",

	components: {
		FbEvents
	}
}
</script>


<style scoped lang='stylus'>
@import '../styles/component'
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
