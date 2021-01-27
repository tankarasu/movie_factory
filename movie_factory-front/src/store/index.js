import Vue from "vue";
import Vuex from "vuex";

// utilise Vuex via la fonction middleware 'use'
Vue.use(Vuex);

// export du Store pour qu'il soit accessible
export default new Vuex.Store({
  // l'état (state) de l'application à un instant T
  state: {
    apiBaseURL: "https://localhost/api/movie",
    login: {
      getLoginURL: "http://localhost:3050/user/login",
      getLoggedUser: {},
    },
    popularFilm: [],
    categories: [],
  },

  /** -- Mutations--
   * Enregistrer les mutations sur le store.
   * functions de type f(state,payload) à l'aide des commits
   * forcément synchrone
   */
  mutations: {
    selectUser(state, payload) {
      state.login.getLoggedUser = payload.data;
    },
    addPopularFilm(state, payload) {
      state.popularFilm = payload;
    },
    addCategories(state, payload) {
      state.categories = payload;
    },
  },
  // permet de commit les mutations
  actions: {
    fetchUser(context, payload) {
      context.commit("selectUser", payload);
    },
    fetchPopularFilm(context, payload) {
      context.commit("addPopularFilm", payload);
    },
    fetchCategories(context, payload) {
      context.commit("addCategories", payload);
    },
  },
  modules: {},
  getter: {},
});
