<template lang="pug">
.page-view
	.intro
		h1.title {{$page.frontmatter.title}}
		.tldr(v-html="$page.frontmatter.tldr")
	article
		Content
</template>

<script>

export default {
	name: "article-view"
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
	text-align-last center
	a[href]
		white-space nowrap
</style>
