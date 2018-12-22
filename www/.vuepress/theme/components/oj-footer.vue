 <template lang='pug'>
#oj-footer
	.inner-section
		.contacts
			.contact
				h4.contact-title {{$site.themeConfig.contact[lang].title}}
				.contact-details(v-html="render(this.$site.themeConfig.contact[lang].details)")
		.social
			a.social-icon(v-for="item in $site.themeConfig.social[lang]", :href="item.href", :title="item.type", :class="item.type")
		.links
			router-link(v-for="link in $site.themeConfig.links[lang]" :key="link.to" :to="link.to") {{link.title}}
</template>

<script>
import markdownIt from 'markdown-it'
const md = markdownIt({breaks: true})

export default {
	name: 'oj-footer',

	computed: {
		lang(){
			return this.$lang.substring(0, 2)
		}
	},
	methods: {
		render(str){ return md.render(str) }
	}
}
</script>

<style lang="stylus">
#oj-footer
	.contact-details
		p
			font-size: 1rem
			line-height 1.5em
			letter-spacing 0.04em
			margin-bottom: 1rem
</style>

<style scoped lang='stylus'>
@import '../styles/component'
#oj-footer
	display block
	width 100%
	padding 4.5rem 0
	background-image $img-pw
	background-position right bottom
	background-repeat no-repeat
	background-size contain
	background-color #FBFAFE
	+below(660px)
		padding 2.5rem 0 0 0
		background-position 140px bottom
	.inner-section
		padding 0 $gutter
		width 100%
		clearfix()
	// CONTACTS
	.contacts
		margin-bottom 2rem
		width 100%
		max-width 240px
	.contact
		display block
		margin-right $gutter
		.contact-title
			color $oj-violet
			font-size 1rem
			line-height 1.2em
			font-weight 700
			text-transform uppercase

	// SOCIAL
	.social
		text-align left
		@media print
			display none
	.social-icon
		icon()
		display inline-block
		size 2rem
		color $oj-violet
		font-size 2rem
		margin-right $gutter
</style>
