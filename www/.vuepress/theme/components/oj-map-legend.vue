<template lang='pug'>
	#oj-map-legend

		h4.legend-title {{title}}

		#legend-board
			.legend-row
				.icon#icon-house-open
					svg(role='img' viewBox="0 0 16 13")
						g.house-symbol.open
							polygon.s(points='9.77 9.69 9.77 12.03 0.25 7.08 0.25 4.74 2.26 5.79 9.77 9.69')
							polygon.s(points='13.13 5.2 12.71 5.76 10.61 8.57 9.77 9.69 2.26 5.79 0.25 4.74 3.6 0.25 5.62 1.3 13.13 5.2')
							polygon.s(points='16.48 5.39 13.13 5.2 5.62 1.3 3.6 0.25 6.96 0.43 16.48 5.39')
							polygon.s(points='16.48 5.39 16.48 7.73 13.13 9.88 9.77 12.03 9.77 9.69 10.61 8.57 12.71 5.76 13.13 5.2 16.48 5.39')

				label.label(for='#icon-house-open') {{legend.open.label}}
			.legend-row
				.icon#icon-house-closed
					svg(role='img' viewBox="0 0 16 13")
						g.house-symbol.closed
							polygon.s(points='9.77 9.69 9.77 12.03 0.25 7.08 0.25 4.74 2.26 5.79 9.77 9.69')
							polygon.s(points='13.13 5.2 12.71 5.76 10.61 8.57 9.77 9.69 2.26 5.79 0.25 4.74 3.6 0.25 5.62 1.3 13.13 5.2')
							polygon.s(points='16.48 5.39 13.13 5.2 5.62 1.3 3.6 0.25 6.96 0.43 16.48 5.39')
							polygon.s(points='16.48 5.39 16.48 7.73 13.13 9.88 9.77 12.03 9.77 9.69 10.61 8.57 12.71 5.76 13.13 5.2 16.48 5.39')
				label.label(for='#icon-house-closed') {{legend.closed.label}}

			.legend-row
				.icon#icon-embassy
					svg(role='img' viewBox='0 0 10 13')
						g.embassy-symbol
							line.s.no-f(x1='1.47', y1='2.44', x2='1.47', y2='14.97')
							circle.s.no-f(cx='1.47', cy='1.47', r='1.22')
							polygon.s.no-f(points='7.99 4.09 7.99 2.6 1.47 4.35 1.47 8.22 4.12 7.51 4.12 9 10.64 7.25 10.64 3.38 7.99 4.09')
				label.label(for='#icon-embassy') {{legend.embassy.label}}

			.legend-row
				.icon#icon-hospital
					svg(role='img' viewBox='0 0 13.5 13.5')
						g.hospital-symbol
							polygon.s.no-f(points='13.25 5.13 8.38 5.13 8.38 0.25 5.13 0.25 5.13 5.13 0.25 5.13 0.25 8.38 5.13 8.38 5.13 13.25 8.38 13.25 8.38 8.38 13.25 8.38 13.25 5.13')
				label.label(for='#icon-hospital') {{legend.hospital.label}}

			.legend-row
				.icon#icon-kindergarden
					svg(role='img' viewBox='0 0 12.08 12.08')
						g.kindergarden-symbol
							circle.s.no-f(cx='6.04', cy='6.04', r='5.79')
							circle.f(cx='3.54', cy='4.84', r='0.5')
							circle.f(cx='8.54', cy='4.84', r='0.5')
							path.s.no-f(d='M2.63,6.79a3.5,3.5,0,0,0,6.83,0')
				label.label(for='#icon-kindergarden') {{legend.kindergarden.label}}

			.legend-row
				.icon#icon-school
					svg(role='img' viewBox='0 0 10.21 13.25')
						g.school-symbol
							path.s.no-f(d='M10,4.21a10.67,10.67,0,0,1-4.86,8.73A10.67,10.67,0,0,1,.25,4.21V1a3.62,3.62,0,0,0,1.94.63A4.17,4.17,0,0,0,5.11.35,4.17,4.17,0,0,0,8,1.65,3.62,3.62,0,0,0,10,1V4.21Z')
							path.f(d='M3.25,8V4.6l-0.93.68V4.75l1-.69H3.74V8H3.25Z')
							path.f(d='M5.23,8V7.57l1.59-2A0.87,0.87,0,0,0,7,5a0.58,0.58,0,0,0-.64-0.63,0.63,0.63,0,0,0-.67.71H5.22A1.09,1.09,0,0,1,6.38,4a1.13,1.13,0,0,1,1,.45A1,1,0,0,1,7.52,5a1.29,1.29,0,0,1-.33.84L5.85,7.53H7.58V8H5.23Z')
				label.label(for='#icon-school') {{legend.school.label}}

			.legend-row
				.icon#icon-monument
					svg(role='img' viewBox='0 0 9 13.5')
						g.monument-symbol
							polygon.f(points='4.5 13.5 0 9 4.5 4.5 9 9 4.5 13.5')
							polygon.f(points='4.5 4.5 0 0 9 0 4.5 4.5')
							path.f(d='M8.5,0.5V8.79l-4,4-4-4V0.5h8M9,0H0V9l4.5,4.5L9,9V0H9Z')
				label.label(for='#icon-monument') {{legend.monument.label}}
</template>

<script>
export default {
	name: 'oj-map-legend',
	props: {
		title: String,
		legend: {
			type: Object,
			default() {
				return {
					open: {
						label: ''
					},
					closed: {
						label: ''
					},
					embassy: {
						label: ''
					},
					hospital: {
						label: ''
					},
					kindergarden: {
						label: ''
					},
					school: {
						label: ''
					},
					monument: {
						label: ''
					}
				};
			}
		}
	}
};
</script>

<style scoped lang='stylus'>
@import '../styles/component'
$oj-map-dark = $oj-violet
#oj-map-legend
	display: block
	width: 28rem
	padding: 0 2rem
	margin-top: -6rem
	margin-bottom: 2rem
	+below(600px)
		width: 100%
#legend-symbols
	display: none
.legend-title
	font-size: 1rem
	text-transform: uppercase
	letter-spacing: .15em
	margin-bottom: .5rem
	color: $oj-violet
#legend-board
	border-top: 1px solid $oj-violet
	border-bottom: 1px solid $oj-violet
	background-color: rgba(white, .8)
	padding: 1rem 0 0 0
	+below(600px)
		border: none
	@media print
		border: none
.legend-row
	display: flex
	flex-flow: row no-wrap
	align-content: center
	justify-content: flex-start
	height: 2.8rem
	@media print
		height: 1.4rem
.icon
	margin-right: 1rem
	display: block
	svg
		display: block
		height: 2.2rem
		width: 4rem
		@media print
			width: 2rem
			height: 1.1rem
.label
	display: block
	color: $oj-violet
	font-family: $SC
	font-size: 1rem
	line-height: 1.2em
.s
	stroke: $oj-map-dark
	stroke-miterlimit: 10
	stroke-width: 0.5px
	stroke-linejoin: bevel
.f
	fill: $oj-map-dark
.no-s
	stroke: none
.no-f
	fill: none
.house-symbol
	&.open
		cursor: pointer
		fill: $oj-yellow
	&.closed
		fill: #fff

</style>
