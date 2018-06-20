<template lang="pug">
#view-house(v-if="page")
	header#header
		h1#org-name {{page.org}}
		p#house-address {{page.address}}
	article
		section#main
			#image-gallery(v-if="page.images")
				oj-slider(captions, controls, counter, loop)
					img(v-for="image in page.images", :src="image.src", :caption="image.caption")
			#content
				.house-body(v-html="md(page.body)")

		section#info
			#info-details
				h5 {{labels.contact[$i18n.locale]}}
				.detail.website
					a(:href="page.website", :title="page.org", target="_blank") strona internetowa
				.detail.fb
					a(:href="page.fb", :title="page.org", target="_blank") facebook
				.detail.email {{page.email}}
				.detail.phone {{page.phone}}
				.detail.person {{page.person}}
</template>


<script>
import {mapState, mapActions} from 'vuex'

import OjSlider from '~/components/oj-slider'
import marked from "marked"
marked.setOptions({breaks: true})

export default {
	name: 'view-house',
	
	components: {OjSlider},

	computed: {
        ...mapState('pages', ['page'])
	},

	data() {
		return {
			labels: {
				calendar: {
					pl: {
						header: 'Kalendarz wydarzeń do',
						when: 'Kiedy',
						what: 'Co'
					},
					en: {
						header: 'Events calendar untill',
						when: 'When',
						what: 'What'
					}
				},
				contact: {
					pl: 'kontakt',
					en: 'contact'
				}
			}
		}
	},
	methods: {
		md(content){
			if (content) { return marked(content) } else { return '' }
		},
		...mapActions('pages', ['getPage'])
	},

	mounted(){
		const locale = this.$i18n.defaultLocale === this.$i18n.locale ? '/pl' : ''
        this.getPage(locale + this.$route.fullPath)
	}
}

</script>






<style scoped lang="stylus">

@import "~assets/styles/component"

#view-house
	margin: 4rem 0
	lost-center: $grid-width $gutter flex
	clearfix()
	+below(800px)
		margin-top: 10rem
header#header
	display: block
	width: 100%
	position: relative
	padding-bottom: 2rem
	clearfix()
	h1
		display: block
		max-width: 75%
		margin-bottom: 1rem
	p
		max-width: 75%
		font-size: 1.2rem
		color: $oj-violet
		font-family: $SC
		line-height: 1.2em
article
	display: flex
	+below(800px)
		display: block
section#main
	lost-column: 8/12 2 $gutter flex
	+below(800px)
		lost-column: 1 0 0 no-flex
section#info
	lost-column: 3/12 2 $gutter flex
	+below(1100px)
		lost-column: 4/12 2 $gutter flex
	+below(800px)
		lost-column: 1 0 0 no-flex
#info-details
	font-size: 1rem
	+below(800px)
		margin-top: 4rem
		font-size: 1.4rem
	.detail
		&:before
			icon()
			display: inline-block
			padding-right: .5rem
			width: 1.5rem
		&.website:before
			content: 'n'
			color: $oj-violet
		&.fb:before
			content: 'b'
			color: $oj-violet
		&.email:before
			content: 'l'
		&.phone:before
			content: 't'
		&.person:before
			content: 'u'
		a:link
			text-decoration: underline
	h5
		font-size: 1rem
		text-transform: uppercase
		letter-spacing: 0.15em
		margin-bottom: 0.5rem
		margin-top: 0.5rem
#image-gallery
	margin-bottom: 2rem
#i404
	text-align: center
	margin: 8rem 0
	width: 100%
</style>
