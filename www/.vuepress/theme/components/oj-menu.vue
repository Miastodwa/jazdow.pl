<template lang="pug">
	.oj-menu
		a.icon(@click="toggleMenu()", :class="{on: mobileMenu}") menu
		nav
			router-link.home(:to="$localePath", :title="$siteTitle") {{$siteTitle}}
			.items(:class="{on: mobileMenu}")
				router-link(v-for="item in $site.themeConfig.mainMenu[lang]", :key="item.href", :to="item.href") {{item.title}}
				router-link.lang-switch(:to="langSwitch.to") {{langSwitch.name}}
</template>

<script>

export default {
	name: "oj-menu",

	data() {
		return {
			mobileMenu: false
		}
	},

	computed: {
		lang(){ return this.$lang.substring(0, 2) },
		langSwitch(){
			return {
				to: this.$lang === 'pl-PL' ? '/en/' : '/',
				name: this.$lang === 'pl-PL' ? 'english' : 'polski'
			}
		}
	},

	methods: {
		toggleMenu(force){
			return this.mobileMenu = !this.mobileMenu
		}
	},
	watch: {
		mobileMenu(next){
			if (next) {
				return document.body.classList.add('menu-on')
			} else {
				return document.body.classList.remove('menu-on')
			}
		}
	}
}
</script>


<style lang="stylus">
body.menu-on
	height 100%
	overflow hidden
</style>

<style scoped lang="stylus">
@import "../styles/component"
$small = 1200px

.oj-menu
	height 5.5rem
	position sticky
	top -1px
	z-index 999
	+below($small)
		height 0
nav
	display block
	width 100%
	height 5.5rem
	z-index 999
	padding .75rem $gutter*0.5
	background-color white
	&.fixed
		position fixed
		top 0
	+below($small, true)
		position fixed
		top 0
	a
		text-decoration: none

a.icon
	display none
	position fixed
	top .5rem
	right 1rem
	z-index 9999
	color $oj-violet
	text-transform uppercase
	font-size 1rem
	padding .5em 1em
	border-radius 3px
	cursor pointer
	&.on
		background-color $oj-violet
		color white
	+below($small)
		display inline-block
		margin-top .25rem
.home
	display inline-block
	font-weight 700
	text-transform uppercase
	font-size 1rem
	line-height 1em
	padding 1.5rem 0 0.5rem 0
	color $oj-dark
.items
	display block
	float right
	margin 0
	font-family $Lemur
	font-weight 700
	list-style-type none
	text-align right
	letter-spacing .025em
	font-size 1rem
	+below($small)
		&.on
			display block
		display none
		background-color rgba(white, .95)
		position fixed
		top 5rem
		left 0
		width 100%
		height 100%
		font-size 2rem
		text-align left
		padding-top 2rem

	a.lang-switch
		text-transform capitalize
		opacity .4
	a
		display inline-block
		line-height 1em
		padding 1.5rem 0 .5rem 0
		cursor pointer
		color inherit
		margin-left 3rem
		&:hover, &.router-link-active
			color $oj-violet
		+below($small)
			display block
			padding 1em $gutter
			margin 0
			color $oj-violet
			animation slideInLeft .75s ease 1
			&:hover
				text-decoration: underline
	a.nuxt-link-active
		+below($small)
			border-top 1px solid $oj-violet
			border-bottom 1px solid $oj-violet
</style>
