import Vue from "vue";
import Vuex from "vuex";

// utilise Vuex via la fonction middleware 'use'
Vue.use(Vuex);

// export du Store pour qu'il soit accessible
export default new Vuex.Store({
  // l'état (state) de l'application à un instant T
  state: {
    apiBaseURL: "https://localhost/api/movie",
    cast: [],
    selectedFilm: {},
    videoPath: "",
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
    addOneFilm(state, payload) {
      state.selectedFilm = payload;
    },
    addCast(state, payload) {
      state.cast = payload;
    },
    addPath(state, payload) {
      state.videoPath = payload;
    },
  },
  // permet de commit les mutations
  actions: {
    /**
     * 
     * @param {String} context 
     * @param {String} payload 
     */
    fetchUser(context, payload) {
      context.commit("selectUser", payload);
    },
    fetchPopularFilm(context, payload) {
      context.commit("addPopularFilm", payload);
    },
    fetchCategories(context, payload) {
      context.commit("addCategories", payload);
    },
    addFilm(context, payload) {
      context.commit("addOneFilm", payload);
    },
    fetchCast(context, payload) {
      context.commit("addCast", payload);
    },
    fetchVideoPath(context, payload) {
      context.commit("addPath", payload);
    },
  },
  modules: {},
  getter: {},
});
