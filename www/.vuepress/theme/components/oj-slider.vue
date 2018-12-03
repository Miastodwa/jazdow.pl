<template lang="pug">
	#oj-slider(:loading="loading")
		.slides-frame
			#loader(v-if="total > 0") loading...
			#slides(:style="{height: sliderHeight + 'px'}")
				slot
			#controls(v-if="controls")
				a.prev(@click="prev()") &larr;
				a.next(@click="next()") &rarr;
		#extras
			.counter(v-if="counter") {{current + 1}}/{{total}}
			.caption(v-if="captions") {{caption}}
</template>

<script>
export default {
	name: "oj-slides",

	props: {
		loop: {
			type: Boolean,
			default() { return false }
		},
		captions: {
			type: Boolean,
			default() { return false }
		},
		controls: {
			type: Boolean,
			default() { return false }
		},
		counter: {
			type: Boolean,
			default() { return false }
		}
	},

	data() {
		return {
			caption: "",
			current: 0,
			total: 0,
			last: 0,
			sliderHeight: 60,
			loading: true
		}
	},

	methods: {
		resetAll() {
			this.resetLength()
			this.resetSlotAttributes()
			this.resetStageAttributes()
			return this.slotLoaded(0)
		},
		resetLength() {
			this.total = this.$slots.default.length
			return this.last  = this.total - 1
		},
		resetSlotAttributes() {
			return Array.from(this.$slots.default).map((slide, i) =>
				slide.elm.setAttribute('slide', i))
		},
		resetStageAttributes() {
			return Array.from(this.$slots.default).map((slide) =>
				slide.elm.setAttribute('stage', ''))
		},
		adjustHeight(slideNum){
			return this.sliderHeight = this.$slots.default[slideNum].elm.clientHeight
		},
		updateCaption(enter){
			return this.caption = this.$slots.default[enter].data.attrs.caption
		},
		swapClasses(enter, leave){
			this.resetStageAttributes()
			if (enter === leave) {
				return this.$slots.default[enter].elm.setAttribute("stage", "enter next")
			} else {
				const direction = enter > leave ? 'next' : 'prev'
				this.$slots.default[enter].elm.setAttribute("stage", `enter ${direction}`)
				return this.$slots.default[leave].elm.setAttribute("stage", `leave ${direction}`)
			}
		},
		slotLoaded(current){
			return this.$slots.default[current].elm.addEventListener('load', ( () => {
				this.swapClasses(current, current)
				this.updateCaption(current)
				this.adjustHeight(current)
				return this.loading = false
			})
			)
		},
		next() { if (this.current < this.last) { return this.current += 1 } else { return !this.loop || (this.current = 0) } },
		prev() { if (this.current > 0) { return this.current += - 1 } else { return !this.loop || (this.current = this.last) } },
		goto(n){ if (n < this.total) { return this.current = n } else { return false } }
	},
	watch: {
		current(enter, leave){
			this.swapClasses(enter, leave)
			this.updateCaption(enter)
			return this.adjustHeight(enter)
		}
	},
	mounted() {
		this.resetAll()
		return window.addEventListener('resize', ( () => { return this.adjustHeight(this.current) }))
	},
	updated() {
		this.resetLength()
		return this.resetSlotAttributes()
	}
}
</script>





<style scoped lang="stylus">
@import "../styles/component"
	#oj-slider
		transition: all .2s ease
		&[loading]
			#controls, #extras
				visibility: hidden
			#loader
				display: block
		.slides-frame
			position: relative
		#slides
			position: relative
			transition: all .2s ease
			[slide]
				visibility: hidden
				position: absolute
				display: block
				&[stage~=enter]
					visibility: visible
					&[stage~=next]
						animation: enterFade .2s ease 1
					&[stage~=prev]
						animation: enterFade .2s ease 1
				&[stage~=leave]
					&[stage~=next]
						animation: leaveFade .2s ease 1
					&[stage~=prev]
						animation: leaveFade .2s ease 1
		#controls
			font-family: Helvetica, Arial, sans-serif
			font-size: 2rem
			position: absolute
			top: 50%
			transform: translateY(-1.2rem)
			width: 100%
			height: 0
			background-color: orange
			a
				cursor: pointer
				display: block
				background-color: white
				size: 2.4rem
				line-height: 2rem
				font-size: 2rem
				&.prev
					float: left
					left: 0
				&.next
					float: right
					right: 100%
		#extras
			display: flex
			font-family: $SC
			font-size: 1rem
			color: $oj-violet
			margin-bottom: 1rem
			padding: .5rem 0
			border-bottom: 1px solid $oj-violet
			.counter
				margin-right: 1rem
		#loader
			display: none
			font-family: $SC

@keyframes enterFade
	0%
		opacity: 0
		visibility: visible
	100%
		opacity: 1
		visibility: visible

@keyframes leaveFade
	0%
		opacity: 1
		visibility: visible
	100%
		opacity: 0
		visibility: visible
</style>
