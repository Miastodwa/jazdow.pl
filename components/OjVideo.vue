<template lang='pug'>
#oj-video
	#video_overlay(@click="playToggle")
		#subtitles(v-html='md(currentSubs[0])')
		#bannertext
			p {{currentSubs[1]}}
	video#video(autoplay, playsinline, muted, loop, :poster="sources.poster")
		source#webm(:src="sources.webm", type="video/webm")
		source#mp4(:src="sources.mp4", type="video/mp4")
</template>

<script>
import marked from 'marked'
marked.setOptions({breaks: true})

export default {
	name: 'oj-video',
	props: {
		sources: {
			type: Object,
			default() {
				return {
					webm: 	"/static/videos/video.webm",
					mp4: 	"/static/videos/video.mp4",
					poster: "/static/videos/poster.jpg"
				};
			}
		},
		subs: {
			type: Array,
			default() {
				return [
					[[0, ""]],
					[[0, ""]]
				];
			}
		}
	},
	data() {
		return {
			currentTime: 0,
			currentCues: [0,0],
			currentSubs: ['','']
		};
	},

	methods: {
		md(content){
			return marked(content);
		},

		playToggle() {
			const { video } = this.$el.children;
			if (!video.paused) { video.pause(); } else { video.play(); }
		},

		computeCurrentCues(time){
			const cues = this.currentCues;
			const { subs } = this;
			for (let i = 0; i < cues.length; i++) {
				const cue = cues[i];
				if (time < subs[i][cue][0]) {
					cues[i] = 0;
				} else if (cue >= (subs[i].length-1)) {
					cues[i] = cue;
				} else if (time > subs[i][cue+1][0]) {
					cues[i] = cue+1;
				} else { cues[i] = cue; }
			}
			return cues;
		},

		computeCurrentSubs(time){
			this.currentCues = this.computeCurrentCues(time);
			const { subs } = this;
			return this.currentCues.map( (cue, i)=> subs[i][cue][1]);
		}
	},

	watch: {
		currentTime(time){
			return this.currentSubs = this.computeCurrentSubs(time);
		}
	},

	mounted() {
		clearInterval(window.updateProgress);
		const { video } = this.$el.children;
		window.updateProgress = setInterval((() => {
			if (video.paused) { return; } else { return this.currentTime = video.currentTime; }
		}), 150
		);
	},

	destroyed() {
		return clearInterval(window.updateProgress);
	}
}
</script>


<style lang='stylus'>
	#subtitles
		p
			font-size: 1rem
			margin-bottom: 0
			line-height: 1.4em
</style>

<style scoped lang='stylus'>
@import '~assets/styles/component'
#oj-video
	z-index: -100
	position: fixed
	top: 0
	width: 100%
	height: 90vh
	max-height: $video-ratio
	overflow: hidden
	+below(780px, true)
		padding-top: 5.5rem
	+below(780px, true, null, 'portrait')
		max-height: $video-ratio*2
#video_overlay
	position: absolute
	z-index: 1
	width: 100vw
	height: 95vh
	max-height: $video-ratio
	color: white
	cursor: pointer
	+below(780px, true, null, 'portrait')
		max-height: $video-ratio*2
		margin-top: -5.5rem
#big-logo
	display: block
	position: absolute
	top: 10rem
	text-align: center
	z-index: 10
	color: white
	+below(1100px)
		display: none
	&:before
		content: 'f'
		icon()
		display: block
		font-size: 14rem
	&:after
		content: 'g'
		icon()
		display: block
		font-size: 9rem
		margin-top: 75%
#subtitles
	position: absolute
	top: 0
	right: 1rem
	padding: 1rem 1rem
	display: inline-block
	text-align: right
	font-weight: 700
	+below(780px, true)
		display: none
#bannertext
	position: absolute
	display: flex
	flex-direction: column
	justify-content: center
	width: 50%
	height: 100%
	top: 0
	left: 25%
	p
		display: block
		margin: -18% auto 0 auto
		max-width: 6em
		font-family: $P
		font-weight: 700
		text-align: center
		line-height: 1em
		color: rgba(white, .9)
		padding: 1rem 0
		border-top: 8px solid rgba(white, .9)
		border-bottom: 8px solid rgba(white, .9)
		font-size: 5rem
		+below(1600px, true)
			font-size: 4rem
		+below(1100px, true)
			font-size: 3.5rem
		border-top: 6px solid rgba(white, .9)
		border-bottom: 6px solid rgba(white, .9)
		+below(780px, true)
			margin-top: 5%
			font-size: 2.4rem
			border-top: 4px solid rgba(white, .9)
			border-bottom: 4px solid rgba(white, .9)

video
	width: 100%
	height: auto
	z-index: -1
	+below(780px, true, null, 'portrait')
		width: 200%
		margin-left: -50%

</style>
