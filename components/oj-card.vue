<template lang='pug'>
nuxt-link.oj-card(:to="link", :style="{backgroundImage: `url(${cover})`}")
	.card-content
		h2.card-title {{title}}
		p.card-caption {{caption}}
</template>

<script>
export default {
	name: 'oj-card',
	props: {
		link: String,
		title: String,
		cover: String,
		caption: String
	},
	computed: {
		to() { return `/${this.$route.params.lang}/${this.link}` }
	}
}
</script>

<style scoped lang='stylus'>
@import '~assets/styles/component'
@import '~assets/styles/imports/mixins'
.oj-card
	card()
	height 20vw
	position relative
	overflow hidden
	background-size contain
	background-repeat no-repeat
	background-position center center
	+above($grid-width)
		height $grid-width * 0.2
	+below(600px)
		height 40vw
		background-size cover
	+below(500px)
		height 50vw
	.card-content
		padding 1rem
		background-color white
		position absolute
		top calc(100% - 4rem)
		bottom 0
		width 100%
		transition .2s all ease
		h2
			display block
			margin 0 0 1rem 0
	&:hover
		.card-content
			top 0
</style>
