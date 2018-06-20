<template lang="pug">
nuxt-link.oj-map-card(to="/mapa")
	.cover
		img.cover-map(src="~/assets/ui/cover-map.svg")
	.caption
		h2 {{page.mapCard.title}}
		h3 {{page.mapCard.caption}}

</template>

<script>
import {mapState} from 'vuex'

export default {
	name: 'oj-map-card',
	computed: {
		...mapState('pages', ['page'])
	}
}
</script>

<style lang="stylus" scoped>
@import '~assets/styles/component'
.oj-map-card
	card()
	position relative
	padding-bottom 6%
	z-index 0
	&:hover
		.caption
			text-decoration underline
.cover
	width 100%
	.cover-map
		width 100%
		margin-top -10%
		margin-left -10%
.caption
	position absolute
	bottom 0
	left 0
	padding 1rem
	width calc(50% - 1rem)
	background-color white
	z-index -1
</style>
