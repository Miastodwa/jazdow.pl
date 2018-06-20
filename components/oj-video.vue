<template lang='pug'>
#oj-video
	#video-overlay(@click="playToggle")
		video-sticker(:time="currentTime")
		#subtitles(v-html='md(currentSubs[0])')
	video#video(autoplay, playsinline, muted, loop, :poster="sources.poster")
		source#webm(:src="sources.webm", type="video/webm")
		source#mp4(:src="sources.mp4", type="video/mp4")
</template>

<script>
import VideoSticker from '~/components/video-sticker'
import marked from 'marked'
marked.setOptions({breaks: true})

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
				return [
					[[0, '']],
					[[0, '']]
				]
			}
		}
	},
	data() {
		return {
			currentTime: 0,
			currentCues: [0,0],
			currentSubs: ['','']
		}
	},

	methods: {
		md(content){
			return marked(content)
		},

		playToggle() {
			const { video } = this.$el.children
			if (!video.paused) { video.pause() } else { video.play() }
		},

		computeCurrentCues(time){
			const cues = this.currentCues
			const { subs } = this
			for (let i = 0; i < cues.length; i++) {
				const cue = cues[i]
				if (time < subs[i][cue][0]) {
					cues[i] = 0
				} else if (cue >= (subs[i].length-1)) {
					cues[i] = cue
				} else if (time > subs[i][cue+1][0]) {
					cues[i] = cue+1
				} else { cues[i] = cue }
			}
			return cues
		},

		computeCurrentSubs(time){
			this.currentCues = this.computeCurrentCues(time)
			const { subs } = this
			return this.currentCues.map( (cue, i)=> subs[i][cue][1])
		}
	},

	watch: {
		currentTime(time){
			return this.currentSubs = this.computeCurrentSubs(time)
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
@import '~assets/styles/component'
#oj-video
	z-index -100
	position fixed
	top 0
	width 100%
	height 90vh
	overflow hidden
	+below(780px, true)
		padding-top 5.5rem
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
