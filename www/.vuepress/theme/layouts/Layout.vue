<template lang="pug">
.default
	oj-menu
	main
		.page-view
			.intro
				h1.title {{$page.frontmatter.title}}
				.tldr(v-html="$page.frontmatter.tldr")
			article
				Content
		oj-footer
</template>

<script>
import OjMenu from '../components/oj-menu'
import OjFooter from '../components/oj-footer'

export default {
	name: "article-view",

	components: {
		OjMenu, OjFooter
	}
}
</script>


<style scoped lang='stylus'>
@import '../styles/component'

.page-view
	lost-center: 800px $gutter no-flex
	+below(800px)
		margin-top 8rem
.title
	text-align center
.tldr
	text-align center
article
	margin 4rem auto
	border-top 1px solid $oj-violet
	padding-top 2rem
	max-width 800px
	hyphens auto
	text-align justify
	a[href]
		white-space nowrap
</style>
