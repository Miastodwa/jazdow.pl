<template lang="pug">
	.oj-menu
		a.icon(@click="toggleMenu()", :class="{on: mobileMenu}") menu
		nav
			nuxt-link.home(to="/", :title="siteTitle[$i18n.locale]") {{siteTitle[$i18n.locale]}}
			.items(:class="{on: mobileMenu}")
				nuxt-link(v-for="item in menu[$i18n.locale]", :key="item.title", :to="item.href", :title="item.title") {{item.title}}
				nuxt-link.lang-switch(v-for="t in translations", :to="t.path", :key="t.code") {{t.name}}
</template>

<script>
import {siteTitle, menu} from '~/data/config.yml'
import {mapState} from 'vuex'

export default {
	name: "oj-menu",

	data() {
		return {
			mobileMenu: false,
			siteTitle: siteTitle,
			menu: menu
		}
	},

	computed: {
		...mapState('pages', ['page']),

		translations(){
			if (this.page && this.page.langs){
				return Object.keys(this.page.langs).map( code => {
					return {
						path: this.page.langs[code],
						code: code,
						name: this.$i18n.locales.find( locale => locale.code === code ).name
					}
				})
			}
			else {
				return this.$i18n.locales.filter(l => l.code !== this.$i18n.locale).map( locale => {
					return {
						path: this.switchLocalePath(locale.code),
						code: locale.code,
						name: locale.name
					}
				})
			}
		}
	},

	methods: {
		toggleMenu(force){
			return this.mobileMenu = !this.mobileMenu
		},
		getLocale(code){
			return this.$i18n.locales.find( locale => locale.code === code )
		},
	},
	watch: {
		mobileMenu(next){
			if (next) {
				return document.body.classList.add('menu-on')
			} else {
				return document.body.classList.remove('menu-on')
			}
		},

		$route(){
			this.mobileMenu = false
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
@import "~assets/styles/component"

.oj-menu
	height 5.5rem
	position sticky
	top -1px
	z-index 999
	+below(780px)
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
	+below(780px, true)
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
	+below(780px)
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
	letter-spacing .125em
	font-size 1rem
	+below(780px)
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
		+below(780px)
			display block
			padding 1em $gutter
			margin 0
			color $oj-violet
			animation slideInLeft .75s ease 1
			&:hover
				text-decoration: underline
	a.nuxt-link-active
		+below(780px)
			border-top 1px solid $oj-violet
			border-bottom 1px solid $oj-violet
</style>
