<template lang='pug'>
	#oj-card
		router-link.card(:to="to")
			.card-content
				img(:src="cover", :title="title")
			h1.card-title {{title}}
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
#oj-card
	lost-column: 4/12 3 $gutter flex
	display: flex
	flex-direction: column
	justify-content: space-between
	padding: 1rem 1rem 0 1rem
	margin-bottom: $gutter
	text-align: center
	a
		text-decoration: none
	+below(600px)
		lost-column: 8/12 1 $gutter flex
		lost-offset: -2/12 row flex
		margin-bottom: $gutter
	.card-title
		font-size: 1rem
		margin-bottom: 0.5em
		text-transform: uppercase
		line-height: 1.2em
		color: $oj-violet
	.card-content
		margin-bottom: 2rem
		height: 5rem
		img
			width: auto
			height: 100%
	.card-caption
		font-size: 1rem
		line-height 1.5em
		margin-bottom: 1rem
		color: $oj-dark
</style>
