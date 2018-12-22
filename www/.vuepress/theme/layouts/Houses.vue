<template lang="pug">
.default
	oj-menu
	main
		#view-house
			header#header
				h1#org-name {{$page.frontmatter.title}}
				p#house-address {{$page.frontmatter.address}}
			article
				section#main
					#image-gallery(v-if="$page.frontmatter.images")
						oj-slider(captions, controls, counter, loop)
							img(v-for="image in $page.frontmatter.images", :src="image.src", :caption="image.caption")
					#content
						Content.house-body

				section#info
					#info-details
						h5 {{labels.contact[$lang]}}
						.detail.website
							a(:href="$page.frontmatter.website", :title="$page.frontmatter.org", target="_blank") strona internetowa
						.detail.fb
							a(:href="$page.frontmatter.fb", :title="$page.frontmatter.org", target="_blank") facebook
						.detail.email {{$page.frontmatter.email}}
						.detail.phone {{$page.frontmatter.phone}}
						.detail.person {{$page.frontmatter.person}}
	oj-footer
</template>


<script>

import OjSlider from '../components/oj-slider'
import OjMenu from '../components/oj-menu'
import OjFooter from '../components/oj-footer'

export default {
	name: 'view-house',
	
	components: {OjSlider, OjMenu, OjFooter},

	data() {
		return {
			labels: {
				calendar: {
					'pl-PL': {
						header: 'Kalendarz wydarzeń do',
						when: 'Kiedy',
						what: 'Co'
					},
					'en-US': {
						header: 'Events calendar untill',
						when: 'When',
						what: 'What'
					}
				},
				contact: {
					'pl-PL': 'kontakt',
					'en-US': 'contact'
				}
			}
		}
	}
}

</script>






<style scoped lang="stylus">

@import "../styles/component"

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
		&.phone:before
			content: 'tel: '
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
