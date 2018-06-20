<template lang='pug'>
.default
	main
		oj-menu
		nuxt
		oj-footer
</template>

<script>
import marked from 'marked'

import OjMenu from '~/components/oj-menu'
import OjFooter from '~/components/oj-footer'

marked.setOptions({breaks: true})

export default {
	name: 'deafult',
	components: {
		OjMenu, OjFooter
	}
}
</script>



<style lang='stylus'>
@import '~assets/styles/global'
pre
	font-size: .9rem
main
	margin-top: 0
	transition: margin-top .5s ease
	clearfix()
.intro
	margin: 6rem auto 0 auto
	.title
		display: block
		width: 100%
		font-size: 2rem
	#tldr
		display: block
		margin: 0 auto
		p
			font-size: 1.6rem
			margin-bottom: 0
			@media print
				font-size: 1.2rem

@media print
	#oj-menu
		display: none
</style>
