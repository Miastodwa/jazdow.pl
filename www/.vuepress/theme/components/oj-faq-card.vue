<template lang="pug">
nuxt-link.oj-faq-card(:to="link")
	.caption {{caption}}
	.title
		h2 F.A.Q. —
		h3 {{more}}
</template>

<script>

export default {
	name: 'oj-faq-card',
	props: {
		link: String,
		more: String,
		caption: String
	}
}
</script>

<style lang="stylus" scoped>
@import '../styles/component'
.oj-faq-card
	card()
	background-color white
	&:hover
		.title
			text-decoration underline
.title
	display block
	padding 1rem
	text-decoration none
	color $oj-dark
.caption
	padding 1rem
	background-color $oj-violet
	color white
	font-weight 700
	overflow hidden
	>>>
		ul
			margin 0
			padding-left 1rem
		p
			margin-bottom 1em
			line-height 1.2em
</style>
