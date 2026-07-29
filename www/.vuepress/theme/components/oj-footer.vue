 <template lang='pug'>
#oj-footer
	.inner-section
		.info-columns
			.contacts
				.contact
					h4.contact-title {{$site.themeConfig.contact[lang].title}}
					.contact-details(v-html="render(this.$site.themeConfig.contact[lang].details)")
			.address
				h4.address-title {{$site.themeConfig.address[lang].title}}
				.address-details(v-html="render(this.$site.themeConfig.address[lang].details)")
		.social
			//- litera to glif z fontu ikon; bez aria-hidden czytniki ekranu
			//- odczytuja ja doslownie ("b", "d", "o"), stad osobna etykieta
			a.social-icon(v-for="item in $site.themeConfig.social", :href="item.href", :title="socialLabel(item.type)", :aria-label="socialLabel(item.type)", target="_blank", rel="noopener")
				span(aria-hidden="true") {{socialChar(item.type)}}
		.links
			router-link(v-for="link in $site.themeConfig.links[lang]" :key="link.to" :to="link.to") {{link.title}}
</template>

<script>
import markdownIt from 'markdown-it'
const md = markdownIt({breaks: true})

const socialChars = { facebook: 'b', instagram: 'd', youtube: 'p', linkedin: 'o', x: 'x' }
const socialNames = { facebook: 'Facebook', instagram: 'Instagram', youtube: 'YouTube', linkedin: 'LinkedIn', x: 'X' }

export default {
	name: 'oj-footer',

	computed: {
		lang(){
			return this.$lang.substring(0, 2)
		}
	},
	methods: {
		render(str){ return md.render(str) },
		socialChar(type){ return socialChars[type] || type },
		socialLabel(type){ return socialNames[type] || type }
	}
}
</script>

<style lang="stylus">
#oj-footer
	.contact-details, .address-details
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
	// INFO COLUMNS
	.info-columns
		display flex
		flex-flow row wrap
		gap 3rem
		margin-bottom 2rem
		+below(660px)
			gap 2rem
	// CONTACTS
	.contacts
		min-width 200px
	.contact
		display block
		.contact-title
			color $oj-green-free
			font-size 1rem
			line-height 1.2em
			font-weight 700
			text-transform uppercase
	// ADDRESS
	.address
		min-width 200px
		.address-title
			color $oj-green-free
			font-size 1rem
			line-height 1.2em
			font-weight 700
			text-transform uppercase

	// SOCIAL
	.social
		display flex
		flex-flow row wrap
		align-items center
		gap 1rem
		margin-top 1rem
		@media print
			display none
	.social-icon
		icon()
		display inline-block
		font-size 2rem
		text-decoration none
		color $oj-green-free

	// LINKS
	.links
		display flex
		flex-flow row wrap
		gap 1rem
		margin-top 2.5rem
		a
			font-size 1.2rem
</style>
