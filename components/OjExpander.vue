<template lang='pug'>
	#oj-expander
		slot#content
		a#more(@click="toggle()") {{visible ? less[lang] : more[lang]}}
</template>

<script>
export default {
	name: 'oj-expander',
	props: {
		lang: String,
		reveal: {
			type: Number,
			default() { return 0; }
		}
	},
	data() {
		return {
			visible: false,
			more: {
				en: 'read more',
				pl: 'czytaj dalej'
			},
			less: {
				en: 'hide text',
				pl: 'ukryj tekst'
			}
		};
	},
	methods: {
		toggle(force){
			if (force === undefined) {
				this.visible = !this.visible
			} else {
				this.visible = force
			}
			for (let key = 0; key < this.$el.children.length; key++) {
				const child = this.$el.children[key]
				if ((this.$el.children.length > key && key >= this.reveal) && (force === undefined)) {
					child.classList.toggle('hidden')
				}
				if ((this.$el.children.length > key && key >= this.reveal) && (force === true)) {
					child.classList.remove('hidden')
				}
				if ((this.$el.children.length > key && key >= this.reveal) && (force === false)) {
					child.classList.add('hidden')
				}
			}
		}
	},
	mounted() {
		this.toggle(false)
	}
};
</script>

<style scoped lang='stylus'>
@import '~assets/styles/component'
#oj-expander
	display: block
	width: 100%
	max-width: $grid-width * .6
	margin: 0 auto
	p
		font-size: 1.4rem
	.hidden
		display: none
	#more
		display: inline-block
		font-size 1rem
		font-weight 500
		letter-spacing 0.05em
		text-decoration: underline
		font-family: P
		font-weight: 700
		cursor: pointer
		color: $oj-violet


</style>
