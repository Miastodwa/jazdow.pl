<template lang='pug'>
#fb-events
	.events(v-if="events && loaded")
		.event(v-for="event in events")
			template(v-if="getDate(event.start_time).isBefore(event.end_time, 'day')")
				.cell.date
					.cal.start
						.d {{ getDate( event.start_time ).format('D') }}
						.m {{ getDate( event.start_time ).format('MMM') }}
					.cal.to
						.d —
					.cal.end
						.d {{ getDate( event.end_time ).format('D') }}
						.m {{ getDate( event.end_time ).format('MMM') }}
				.cell.time wydarzenie cykliczne
			template(v-else)
				.cell.date
					.cal.start
						.d {{ getDate( event.start_time ).format('D') }}
						.m {{ getDate( event.start_time ).format('MMM') }}				
				.cell.time {{ getDate( event.start_time ).format('ddd') }} {{getDate( event.start_time ).format('H:mm')}} – {{ getDate( event.end_time ).format('H:mm') }}
			.cell.name
				a(:href="'https://www.facebook.com/'+event.id" target="_blank") {{ event.name }}
			.cell.place
				a(v-if="event.place") {{event.place.name}}
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
	name: 'fb-events',
	data() {
		return {
			events: false,
			paging: false,
			loaded: false
		}
	},
	methods: {
		getDate(d) {
			return moment(d).locale(this.$i18n.locale)
		},

		async getEvents() {
			const auth = await axios.get(
				'https://graph.facebook.com/oauth/access_token',
				{
					params: {
						client_id: '182735462242120',
						client_secret: '122b86c0abed2f71d71f3807cf582c66', // <- Obviously this is wrong :)
						grant_type: 'client_credentials'
					}
				}
			)

			const events = await axios.get(
				'https://graph.facebook.com/v2.12/jazdow/',
				{
					params: {
						access_token: auth.data.access_token ,
						since: 'now',
						fields: 'events{name,event_times,start_time,end_time,place}'
					}
				}
			)
			console.log(events)
			this.events = events.data.events.data.reverse()
			this.paging = events.paging
			this.loaded = true
		}
	},
	mounted() {
		this.getEvents()
	}
}
</script>

<style scoped lang='stylus'>
@import '~assets/styles/component'
.events
	display: block
	width: 100%
	.event
		display: flex
		width: 100%
		align-items: center
		justify-content: space-between
		padding: .5rem 0
		border-bottom: 1px solid $oj-grey
		&:first-of-type
			border-top: 1px solid $oj-grey
	.cell
		&.date
			width: 10%
			display: flex
			justify-content: space-between
			text-align: center
			color: $oj-violet
			font-family: $SC
			font-weight: 700
			.cal
				width: 1.6em
				.d
					font-weight: 700
					line-height: 1em
					font-size: 1.4rem
					margin-bottom .5em
				.m
					font-size: .7rem
					line-height: 1em
					text-transform: uppercase
		&.time
			width: 20%
			font-family: $SC
			font-weight: 700
			font-size: .8rem
			line-height 1.4em
			text-align: center
			padding 0 1em
		&.name
			width: 40%
			font-size: 1.2rem
		&.place
			width: 30%
			text-align: right
			font-size: 1.2rem
</style>
