<template lang='pug'>
	.oj-expander
		.content(:class="{closed: !visible, open: visible}")
			slot
		a.more(@click="toggle()") {{visible ? less[$i18n.locale] : more[$i18n.locale]}}
</template>

<script>
export default {
	name: 'oj-expander',
	data() {
		return {
			visible: false,
			more: {
				en: 'read more ↓',
				pl: 'czytaj dalej ↓'
			},
			less: {
				en: 'hide text ↑',
				pl: 'ukryj tekst ↑'
			}
		};
	},
	methods: {
		toggle(force){
			if (force === undefined) this.visible = !this.visible
			else this.visible = force
		}
	},
	mounted() {
		this.toggle(false)
	}
};
</script>

<style scoped lang='stylus'>
@import '~assets/styles/component'
.oj-expander
	text-align justify
	>>> p
		font-size 1.6rem
.content
	overflow hidden
	&.open
		animation expander-open .2s ease
	&.closed
		animation expander-close .2s ease forwards
.more
	display inline-block
	font-size 1.4rem
	font-weight 500
	letter-spacing 0.05em
	font-family P
	font-weight 700
	cursor pointer
	color $oj-dark
	border-bottom 2px solid $oj-dark
	text-transform uppercase
	display inline-block
	padding .5em 0
</style>
