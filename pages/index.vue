<template lang="pug">
#home-page(v-if="page")
	oj-video(:sources="page.video", :subs="page.subs")
	oj-intro
</template>

<script>
import OjVideo from '~/components/OjVideo'
import OjIntro from '~/components/oj-intro'
import OjCard from '~/components/OjCard'
import {mapActions, mapState} from 'vuex'

import marked from 'marked'
marked.setOptions({breaks: true})

export default {
	name: 'home-view',

	layout: 'home',

	components: {OjVideo, OjIntro, OjCard},

	computed: {
		...mapState('pages', ['page'])
	},

	methods: {
		md(content){
			if (content) { return marked(content); } else { return ''; }
		},
		...mapActions('pages', ['getPage'])
	},

	mounted(){
		const locale = this.$i18n.defaultLocale === this.$i18n.locale ? '/pl' : ''
		const route = this.$route.fullPath.replace(/\/$/, '') + '/index'
		this.getPage(locale + route)
	}
}
</script>


<style scoped lang="stylus">
@import '~assets/styles/component'
</style>
