<template lang="pug">
	header.oj-menu
		a.skip-link(href="#main-content") {{skipLabel}}
		button.icon(type="button", ref="toggle", @click="toggleMenu()", :class="{on: mobileMenu}", :aria-expanded="mobileMenu ? 'true' : 'false'", aria-controls="main-nav", :aria-label="mobileMenu ? closeLabel : menuLabel") menu
		nav(:aria-label="navLabel")
			router-link.home(:to="$localePath", :title="$siteTitle")
				img.logo(:src="logo", :alt="$siteTitle")
			.items#main-nav(:class="{on: mobileMenu}")
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
		logo(){ return require('../assets/ui/logo-wj.png') },
		isEn(){ return this.lang === 'en' },
		skipLabel(){ return this.isEn ? 'Skip to content' : 'Przejdź do treści' },
		menuLabel(){ return this.isEn ? 'Open menu' : 'Otwórz menu' },
		closeLabel(){ return this.isEn ? 'Close menu' : 'Zamknij menu' },
		navLabel(){ return this.isEn ? 'Main' : 'Główne' },
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
		},
		closeMenu(){
			this.mobileMenu = false
		},
		onKeydown(e){
			if (e.key === 'Escape' && this.mobileMenu) {
				this.closeMenu()
				this.$refs.toggle && this.$refs.toggle.focus()
			}
		}
	},
	watch: {
		mobileMenu(next){
			if (next) {
				document.body.classList.add('menu-on')
				document.addEventListener('keydown', this.onKeydown)
			} else {
				document.body.classList.remove('menu-on')
				document.removeEventListener('keydown', this.onKeydown)
			}
		},
		$route(){
			this.closeMenu()
		}
	},
	beforeDestroy(){
		document.body.classList.remove('menu-on')
		document.removeEventListener('keydown', this.onKeydown)
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
	display flex
	align-items center
	width 100%
	height 5.5rem
	z-index 999
	padding 0 $gutter*0.5
	background-color white
	&.fixed
		position fixed
		top 0
	+below($small, true)
		position fixed
		top 0
	a
		text-decoration: none

button.icon
	display none
	position fixed
	top .5rem
	right 1rem
	z-index 9999
	background transparent
	border none
	font-family $Lemur
	color $oj-green-free
	text-transform uppercase
	font-size 1rem
	padding .5em 1em
	border-radius 3px
	cursor pointer
	&.on
		background-color $oj-green-free
		color white
	+below($small)
		display inline-block
		margin-top .25rem
.home
	display flex
	align-items center
	flex-shrink 0
	.logo
		height 4rem
		width auto
		display block
.items
	display flex
	align-items center
	margin-left auto
	font-family $Lemur
	font-weight 700
	list-style-type none
	letter-spacing .025em
	font-size 1rem
	+below($small)
		&.on
			display flex
			flex-direction column
			align-items flex-start
		display none
		background-color rgba(white, .95)
		position fixed
		top 6.5rem
		left 0
		width 100%
		height 100%
		font-size 2rem
		padding-top 2rem

	a.lang-switch
		text-transform capitalize
		opacity .4
	a
		display inline-block
		line-height 1em
		cursor pointer
		color inherit
		margin-left 3rem
		&:hover, &.router-link-active
			color $oj-green-free
		+below($small)
			display block
			padding 1em $gutter
			margin 0
			color $oj-green-free
			animation slideInLeft .75s ease 1
			&:hover
				text-decoration: underline
	a.nuxt-link-active
		+below($small)
			border-top 1px solid $oj-green-free
			border-bottom 1px solid $oj-green-free
</style>
