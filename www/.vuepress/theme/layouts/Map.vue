<template lang='pug'>
.default
	oj-menu
	main
		#view-map
			.intro
				h1.title {{$page.frontmatter.title}}
				Content#tldr

			.map-section
				oj-map(v-if="$page.frontmatter.houses", :houses="$page.frontmatter.houses")
			.legend
				oj-map-legend(v-if="$page.frontmatter.legend", :legend="$page.frontmatter.legend")
		oj-footer
</template>

<script>
import OjMap from '../components/oj-map'
import OjMapLegend from '../components/oj-map-legend'
import OjMenu from '../components/oj-menu'
import OjFooter from '../components/oj-footer'

export default {
	name: 'map-view',
	
	scrollToTop: true,

	components: {OjMap, OjMapLegend, OjMenu, OjFooter}

}
</script>




<style scoped lang='stylus'>
@import '../styles/component'
#view-map
	display: block
	position: relative
	clearfix()
	@media print
		margin-top: 0
	+below(800px)
		margin-top: 8rem
	.intro
		margin-left: auto
		margin-right: auto
		text-align: center
		max-width: 50rem

.legend
	display: block

.map-section
	display: block
	clearfix()
	width: 100%
	padding: 0 1rem
	margin-top: -6rem
	+below(800px)
		padding: 0
		margin-top: -3rem
</style>
