import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

// utilise Vuex via la fonction middleware 'use'
Vue.use(Vuex);

// export du Store pour qu'il soit accessible
export default new Vuex.Store({
  // l'état (state) de l'application à un instant T
  state: {
    cast: [], // TODO is necessary ?
    selectedFilm: {},
    isFavoriteFilm: false,
    isSeenFilm: false,
    getAllUser: [],
    seenDuration: 0,
    selectedActor: {}, // mettre les films de l'acteur
    // dispatch au moment selection acteur => récupérer film actor et mettre tableau
    // selectActor => dispatch va chercher infos
    videoPath: "", // TODO is necessary ?s
    filmSpec: {},
    login: {
      getLoginURL: "https://the-movie-factory-api.herokuapp.com/user/login",
      getLoggedUser: {},
      getFavorite: [],
      getSeen: [],
    },
    popularFilm: [],
    categories: [],
  },

  /** -- Mutations--
   * Enregistrer les mutations sur le sto re.
   * functions de type f(state,payload) à l'aide des commits
   * forcément synchrone
   */
  mutations: {
    selectUser(state, payload) {
      state.login.getLoggedUser = payload.data;
      state.login.getFavorite = payload.data.favorite;
      state.login.getSeen = payload.data.seen;
    },
    toggleFavorite(state, payload) {
      state.isFavoriteFilm = !state.isFavoriteFilm;
    },
    toggleSeenFilm(state, payload) {
      state.isSeenFilm = !state.isSeenFilm;
    },
    fetchAllUser(state, payload) {
      state.getAllUser = payload;
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
    addToFavorite(state, payload) {
      state.login.getFavorite.push(payload);
    },
    removeFavorite(state, payload) {
      let { id } = payload;
      for (let i = 0; i < state.login.getFavorite.length; i++) {
        if (state.login.getFavorite[i].id == id) {
          state.login.getFavorite.splice(i, 1);
        }
      }
    },
    addToSeen(state, payload) {
      state.login.getSeen.push(payload);
    },
    removeSeen(state, payload) {
      let { id } = payload;
      for (let i = 0; i < state.login.getSeen.length; i++) {
        if (state.login.getSeen[i].id == id) {
          state.login.getSeen.splice(i, 1);
        }
      }
    },
  },
  /**
   * --Actions--permet de commit les mutations
   */
  actions: {
    /** --fetchUser--
     * récupère les informations fournis dans le formulaire, traite le token JWT et ajoute le current User au store
     *
     * @param {*} context ne pas toucher
     * @param {Object} payload : contient un email de type String, un password de type String et le router
     */
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
    /**
     * selectionne un film afin d'en voir ses détails sur la page /film
     * @param {*} context
     * @param {*} payload objet représentant le film
     */
    addFilm(context, payload) {
      // on va récupérer les infos du film via un appel axios
      // on va ajouter le film à selectedFilm
      axios
        .get(
          `https://the-movie-factory-api.herokuapp.com/api/movie/spec/${payload.id}`
        )
        .then(async res => {
          // on récupère ici le casting du film
          axios
            .get(
              `https://the-movie-factory-api.herokuapp.com/api/movie/credits/${payload.id}`
            )
            .then(async response => {
              // on récupère le lien de la vidéo
              response.data.cast = response.data.cast.slice(0, 5);
              axios
                .get(
                  `https://the-movie-factory-api.herokuapp.com/api/movie/video/${payload.id}`
                )
                .then(async link => {
                  let thisLink =
                    "https://www.youtube.com/embed/" +
                    (await link.data.results[0].key);
                  // si le lien existe on ajoute le lien
                  if (link.data.results[0].site == "YouTube") {
                    let result = {
                      ...res.data,
                      ...response.data,
                      ...link.data,
                    };
                    await context.commit("addOneFilm", result);
                  } else {
                    let result = { ...res.data, ...response.data };
                    await context.commit("addOneFilm", result);
                  }
                  let index = -1;
                  let seen = this.state.login.getSeen;
                  let favorite = this.state.login.getFavorite;

                  for (let i = 0; i < seen.length; i++) {
                    if (favorite[i].id == this.payload.id) {
                      index = i;
                    }
                  }
                  if (index == -1 && this.state.isSeenFilm) {
                    context.commit("toggleSeenFilm");
                  }

                  if (index != -1 && !this.state.isSeenFilm) {
                    context.commit("toggleSeenFilm");
                  }

                  index = -1;
                  for (let i = 0; i < favorite.length; i++) {
                    if (favorite[i].id == this.payload.id) {
                      index = i;
                    }
                  }

                  if (index == -1 && this.state.isFavoriteFilm) {
                    context.commit("toggleFavorite");
                  }

                  if (index != -1 && !this.state.isFavoriteFilm) {
                    context.commit("toggleFavorite");
                  }
                });
            });
        })
        .catch(err => err);
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
});
