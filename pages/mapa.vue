<template lang='pug'>
	#view-map(v-if="page")
		.intro
			h1.title {{page.title}}
			#tldr(v-html="md(page.body)")

		.map-section
			oj-map(v-if="page.houses", :houses="page.houses")
		.legend
			oj-map-legend(v-if="page.legend", :legend="page.legend")
</template>

<script>
import {mapState, mapActions} from 'vuex'
import OjMap from '~/components/oj-map'
import OjMapLegend from '~/components/oj-map-legend'
import marked from 'marked'
marked.setOptions({breaks: true})

export default {
	name: 'map-view',
	
	scrollToTop: true,

	components: {OjMap, OjMapLegend},

	computed: {
		...mapState('pages', ['page'])
	},

	methods: {
		md(content){
			if (content) { return marked(content) } else { return '' }
		},
		...mapActions('pages', ['getPage'])
	},

	mounted(){
		const locale = this.$i18n.defaultLocale === this.$i18n.locale ? '/pl' : ''
		this.getPage(locale + this.$route.fullPath)
	}
}
</script>




<style scoped lang='stylus'>
@import '~assets/styles/component'
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
