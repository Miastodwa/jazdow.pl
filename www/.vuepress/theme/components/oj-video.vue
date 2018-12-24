<template lang='pug'>
#oj-video
	#video-overlay(@click="playToggle")
		video-sticker(:time="currentTime")
		#subtitles(v-html='currentSubs')
	video#video(autoplay, playsinline, muted, loop, :poster="sources.poster")
		source#webm(:src="sources.webm", type="video/webm")
		source#mp4(:src="sources.mp4", type="video/mp4")
</template>

<script>
import VideoSticker from '../components/video-sticker'

export default {
	name: 'oj-video',

	components: {
		VideoSticker
	},

	props: {
		sources: {
			type: Object,
			default(){
				return { sources: {} }
			}
		},
		subs: {
			type: Array,
			default() {
				return [ {t: 0, s: ''} ]
			}
		}
	},
	data() {
		return {
			currentTime: 0,
			currentCue: 0
		}
	},

	computed: {
		currentSubs(){
			return this.subs[this.currentCue].s
		}
	},

	methods: {

		playToggle() {
			const { video } = this.$el.children
			if (!video.paused) { video.pause() } else { video.play() }
		},

		setCurrentCue(){
			if (this.currentTime < this.subs[0].t) this.currentCue = 0
			else if ( this.currentCue === this.subs.length - 1) return
			else if ( this.currentTime > this.subs[this.currentCue + 1].t ) this.currentCue ++
		}

	},

	watch: {
		currentTime(){
			this.setCurrentCue()
		}
	},

	mounted() {
		clearInterval(window.updateProgress)
		const { video } = this.$el.children
		window.updateProgress = setInterval((() => {
			if (video.paused) { return } else { return this.currentTime = video.currentTime }
		}), 150
		)
	},

	destroyed() {
		return clearInterval(window.updateProgress)
	}
}
</script>


<style scoped lang='stylus'>
@import '../styles/component'
#oj-video
	z-index -100
	position fixed
	top 0
	width 100%
	height 90vh
	overflow hidden
	+below(780px, true)
		padding-top 3rem
	+above(0, true, null, 'portrait')
		max-height 75vh
#video-overlay
	position absolute
	z-index 1
	width 100vw
	height 90vh
	color white
	cursor pointer
	+above(0, true, null, 'portrait')
		max-height 75vh
#subtitles
	position absolute
	top 0
	right 1rem
	padding 1rem 1rem
	display inline-block
	text-align right
	font-weight 700
	+below(780px, true)
		display none
	& >>> p
		font-size: 1rem
		margin-bottom: 0
		line-height: 1.4em
video
	width 100%
	height 90vh
	object-fit cover
	z-index -1
	+above(0, true, null, 'portrait')
		height 75vh
</style>
