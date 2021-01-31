import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

// utilise Vuex via la fonction middleware 'use'
Vue.use(Vuex);

// export du Store pour qu'il soit accessible
export default new Vuex.Store({
  // l'état (state) de l'application à un instant T
  state: {
    apiBaseURL: "https://localhost/api/movie",
    cast: [],
    selectedFilm: {},
    selectedActor: {}, // mettre les films de l'acteur
    // dispatch au moment selection acteur => récupérer film actor et mettre tableau
    // selectActor => dispatch va chercher infos
    videoPath: "",
    filmSpec: {},
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
    addFilmSpec(state, payload) {
      state.filmSpec = payload;
    },
  },
  // permet de commit les mutations
  actions: {
    fetchUser(context, payload) {
      const { email, password, router } = payload;
      let result;
      axios
        .post(this.state.login.getLoginURL, {
          email,
          password,
        })
        // traitement de la réponse
        .then(async response => {
          console.log(response);
          // extraction du token par destructuration
          let { token } = await response.data;
          // mise en forme du payload
          let base64Payload = token.split(".")[1];
          // transformation du payload en buffer
          let payload = Buffer.from(base64Payload, "base64");
          // parsing du buffer en json
          result = JSON.parse(payload.toString());
          context.commit("selectUser", result);
          router.push("/home");
        })
        .catch();
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
    fetchFilmSpec(context, payload) {
      context.commit("addFilmSpec", payload);
    },
  },
  modules: {},
  getter: {},
  apiMethods: {
    // méthodes axios
    getTokenAndLog: (computedEmail, computedPassword) => {},
  },
});
