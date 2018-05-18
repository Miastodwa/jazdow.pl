<template lang="pug">
#history-view(v-if="page")
	.intro
		h1.title {{page.title}}
		#tldr(v-html="md(page.body)")
	oj-history(:timeline="page.history")
</template>


<script>
import {mapState, mapActions} from 'vuex'
import OjHistory from '~/components/OjHistory'
import marked from 'marked'
marked.setOptions({breaks: true})

export default {
	name: "history-view",

	components: {OjHistory},

	computed: {
		...mapState('pages', ['page'])
	},

	methods: {
		md(content){
			if (content) { return marked(content) } else { return '' }
		},
		...mapActions('pages', ['getPage'])
	},

	mounted(){
		this.getPage(`/historia/${this.$i18n.locale}`)
	}
}
</script>





<style scoped lang='stylus'>
@import '~assets/styles/component'
#history-view
	lost-center: $grid-width $gutter no-flex
	+below(800px)
		margin-top: 8rem
	.intro
		margin-left: auto
		margin-right: auto
		text-align: center
		max-width: 54rem
#oj-history
	margin: 6rem auto
	max-width: 60rem
</style>
