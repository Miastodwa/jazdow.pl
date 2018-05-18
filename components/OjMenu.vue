<template lang="pug">
	#oj-menu
		nav
			nuxt-link#logo(to="/", :title="siteTitle[$i18n.locale]")
			a#icon(@click="toggleMenu()", :class="{on: mobileMenu}") menu
			#items(:class="{on: mobileMenu}")
				nuxt-link(v-for="item in menu[$i18n.locale]", :key="item.title", :to="item.href", :title="item.title") {{item.title}}
				nuxt-link#lang-switch(:to="switchLocalePath(otherLang.code)") {{otherLang.name}}
</template>

<script>
import {siteTitle, menu} from '~/data/config.yml'

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
		otherLang(){
			return this.$i18n.locales.find( locale => locale.code !== this.$i18n.locale )
		}
	},

	methods: {
		toggleMenu(force){
			return this.mobileMenu = !this.mobileMenu
		},
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
	height: 100%
	overflow: hidden
</style>

<style scoped lang="stylus">
@import "~assets/styles/component"

#oj-menu
	height: 5.5rem
	position sticky
	top -1px
	z-index 999
	+below(780px, true)
		height: 0
nav
	display: block
	width: 100%
	height: 5.5rem
	z-index: 999
	padding: .75rem $gutter*0.5
	background-color: white
	&.fixed
		position: fixed
		top: 0
	+below(780px, true)
		position: fixed
		top: 0
	a
		text-decoration: none

#logo
	display: block
	float: left
	size: 4rem
	&:after
		icon()
		content: 'f'
		display: block
		color: $oj-violet
		font-size: 4rem
		line-height: 1em
a#icon
	display: none
	float: right
	color: $oj-violet
	text-transform: uppercase
	font-size: 1rem
	padding: .5em 1em
	border-radius: 3px
	cursor: pointer
	&.on
		background-color: $oj-violet
		color: white
	+below(780px, true)
		display: block
		margin-top: .25rem
#items
	display: block
	float: right
	margin: 0
	font-family: P
	font-weight: 700
	list-style-type: none
	text-transform: uppercase
	text-align: right
	letter-spacing: .125em
	font-size: 1rem
	#lang-switch
		text-transform: capitalize
		opacity: .4
	a
		display: inline-block
		line-height: 1em
		padding: 1.5rem 0 .5rem 0
		cursor: pointer
		color: inherit
		margin-left: 3rem
		&:hover, &.router-link-active
			color: $oj-violet
	+below(780px, true)
		&.on
			display: block
		display: none
		background-color: rgba(white, .95)
		position: fixed
		top: 5rem
		left: 0
		size: 100%
		font-size: 2rem
		text-align: left
		padding-top: 2rem
		a
			display: block
			padding: 1em $gutter
			margin: 0
			color: $oj-violet
			animation: slideInLeft .75s ease 1
			&:hover
				text-decoration: underline
</style>
