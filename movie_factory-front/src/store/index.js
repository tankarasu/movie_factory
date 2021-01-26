import Vue from 'vue'
import Vuex from 'vuex'

// utilise Vuex via la fonction middleware 'use'
Vue.use(Vuex)

// export du Store pour qu'il soit accessible
export default new Vuex.Store({
  // l'état (state) de l'application à un instant T
  state: {},
  /** -- Mutations--
   * Enregistrer les mutations sur le store.
   * functions de type f(state,payload) à l'aide des commits
   * forcément synchrone
   */
  mutations: {},
  // permet de commit les mutations
  actions: {},
  modules: {},
});
