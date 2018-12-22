<template lang="pug">
.default
	oj-menu
	main
		#history-view(v-if="$page.frontmatter")
			.intro
				h1.title {{$page.frontmatter.title}}
				Content#tldr
			oj-history(:timeline="$page.frontmatter.history")
		oj-footer
</template>


<script>
import OjHistory from '../components/oj-history'
import OjMenu from '../components/oj-menu'
import OjFooter from '../components/oj-footer'

export default {
	name: "history-view",

	components: {OjHistory, OjMenu, OjFooter}

}
</script>





<style scoped lang='stylus'>
@import '../styles/component'
#history-view
	lost-center: $grid-width $gutter no-flex
	+below(800px)
		margin-top: 8rem
	.intro
		margin-left: auto
		margin-right: auto
		text-align: center
		max-width: 54rem
#oj-history
	margin: 6rem auto
	max-width: 60rem
</style>
