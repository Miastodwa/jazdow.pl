<template lang="pug">
.oj-events-mini
	.caption
		h2 {{page.eventsCard.title}}
		h3 {{page.eventsCard.caption}}
	.events
		ul(v-if="events.length")
			li(v-fot="event in events")
				.time {{event.startTime}}
				.title {{event.title}}
		.empty(v-else) {{page.eventsCard.empty}}
	nuxt-link.link(:to="page.eventsCard.link")
		h2 {{page.eventsCard.more}}
</template>

<script>
import {mapState} from 'vuex'

export default {
	name: 'oj-events-mini',

	computed: {
		...mapState('pages', ['page']),
		...mapState('events', ['events']),
	}
}
</script>

<style lang="stylus" scoped>
@import '~assets/styles/component'
@import '~assets/styles/imports/mixins'

.oj-events-mini
	card()
	display flex
	flex-flow row wrap
	justify-content space-between
	padding 1rem
	background-color white
.caption
	align-self flex-start
.events
	align-self center
	width 100%
.empty
	width 100%
	text-align center
	background url('~/assets/ui/sleepey.svg') top center no-repeat
	background-size 30% auto
	padding 30% 0 0 0
	color $oj-violet
.link
	display block
	align-self flex-end
	width 100%
	padding-top 1rem
	text-transform uppercase
	text-decoration none
	color $oj-dark
	&:hover
		text-decoration underline
</style>
