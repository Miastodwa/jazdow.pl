export function state() {
	return {
		pages: [],
		page: null
	}
}
export const mutations = {
	SET_PAGE(state, page) {
		state.page = page
	},
	PUSH_PAGE(state, page) {
		state.pages = [...state.pages, page]
	}
}

export const actions = {
	async getPage( {state, commit}, route ) {
		const path = route.replace(/\/$/, '')
		const exists = state.pages.find(page => page.path === path)
		
		if (exists) return commit('SET_PAGE', exists)
		const {body, attributes} = await import(`~/data${path}.md`)
		const page = {body, ...attributes, path: path}
		commit('SET_PAGE', page)
		commit('PUSH_PAGE', page)
	}
}