<template>
  <div>
    <navbar></navbar>
    <div class="selectedFilm">
      <div id="filmHeader">
        <h2>{{ selectedFilm.title }}</h2>
      </div>
      <div id="selectedFilm">
        <div class="selectedFilmPicture">
          <img
            class="moviePict"
            :src="`https://image.tmdb.org/t/p/w400/${selectedFilm.poster_path}`"
            alt="picture"
          />
        </div>

        <div class="selectedFilmDescribe">
          <iframe
            v-if="selectedFilm.results && selectedFilm.results[0].key"
            width="480"
            height="320"
            :src="$data.youtubePath + selectedFilm.results[0].key"
            frameborder="0"
            allowfullscreen
          ></iframe>

          <p>{{ selectedFilm.overview }} $</p>
        </div>
      </div>
      <div id="filmFooter">
        <p>
          Add to favorite
          <span class="badge badge-danger" @click="addFavorite(selectedFilm)"
            >+</span
          >

          Seen/unseen
          <span class="badge badge-success" @click="addToSeen(selectedFilm)"
            >+</span
          >
        </p>

        <p>
          Gain:
          <span class="badge badge-info">
            {{
              new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "USD",
                maximumSignificantDigits: 1,
              }).format(selectedFilm.revenue - selectedFilm.budget)
            }}
          </span>
          Runtime:<span class="badge badge-info">
            {{ selectedFilm.runtime }}</span
          >mn
        </p>
        <p>
          <span v-for="(genre, index) in selectedFilm.genres" :key="index">
            -{{ genre.name }}-
          </span>
        </p>
        <p v-if="selectedFilm.homepage">
          <a :href="selectedFilm.homepage">Official Home Page</a>
        </p>
        <p>
          popularity:<span class="badge badge-warning">
            {{ selectedFilm.popularity }}</span
          >
          release:
          <span class="badge badge-warning"
            >{{ selectedFilm.release_date }}
          </span>
          vote average:
          <span class="badge badge-warning">{{
            selectedFilm.vote_average
          }}</span>
          vote count:
          <span class="badge badge-warning">{{ selectedFilm.vote_count }}</span>
        </p>
      </div>
      <!-- Carousel d'artiste -->
      <div class="actorList">
        <div
          v-for="(actor, index) in selectedFilm.cast"
          :key="index"
          @click="handleActor(actor.id)"
        >
          <img
            class="photoActor"
            :src="`https://image.tmdb.org/t/p/w200/${actor.profile_path}`"
            alt="photo"
          />
          <h4>{{ actor.name }}</h4>
          <p>popularity: {{ actor.popularity }}</p>
        </div>
      </div>

      <splide v-if="actorsFilm.length" class="filmList" :options="options">
        <!-- Carousel de film -->
        <splide-slide
          v-for="(film, index) in actorsFilm"
          :key="index"
          class="filmCard"
        >
          <!-- on vérifie la présence de photo pour le film -->
          <img
            v-if="film.poster_path"
            class="photoFilm"
            :src="`https://image.tmdb.org/t/p/w200/${film.poster_path}`"
            alt="photo"
            @click="handleActorsFilm(film)"
          />
          <div class="cardDescription">
            <h5>{{ film.title }}</h5>
            <p>{{ film.overview.slice(0, 100) }}</p>
            <span>Runtime {{ selectedFilm.runtime }} mn</span>
            <span>popularity: {{ film.popularity }}</span>
            <span>vote average: {{ film.vote_average }}</span
            ><span>vote count: {{ film.vote_count }}</span>
          </div>
        </splide-slide>
      </splide>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import Navbar from "./Navbar.vue";
// import des components du slider
import { Splide, SplideSlide } from "@splidejs/vue-splide";
// import css du slider
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

export default {
  components: { Navbar, Splide, SplideSlide },
  name: "Film",
  data() {
    return {
      actorsFilm: [],
      options: {
        rewind: true,
        width: 800,
        gap: "1rem",
      },
      youtubePath: "https://www.youtube.com/embed/",
    };
  },
  computed: {
    ...mapState(["selectedFilm", "login"]),
  },
  methods: {
    handleActor(actor) {
      axios
        .get(`http://localhost:3050/api/movie/person/${actor}`)
        .then(async response => {
          let result = await response.data.results.slice(0, 6);
          this.actorsFilm = result;
        })
        .catch(err => console.log(err));
    },
    /**
     * prends un film et l'ajoute dans un tableau contenant tous les films favoris
     * @param {Object} film à ajouter aux favoris
     */
    addFavorite(film) {
      let { getFavorite } = this.$store.state.login;

      let isFavorite = false;

      for (let index = 0; index < getFavorite.length; index++) {
        const element = getFavorite[index];
        if (element.id == film.id) {
          isFavorite = true;
        }
      }
      // ajout du film aux favoris du User
      if (!isFavorite) {
        this.$store.commit("addToFavorite", film);
        axios.put(`http://localhost:3050/user/addfavorite`, {
          email: this.login.getLoggedUser.email,
          filmId: film,
        });
      }

      if (isFavorite) {
        this.$store.commit("removeFavorite", film);
        axios.put(`http://localhost:3050/user/removefavorite`, {
          email: this.login.getLoggedUser.email,
          filmId: film,
        });
      }
    },
    addToSeen(film) {
      let { getSeen } = this.$store.state.login;

      let isSeen = false;

      for (let index = 0; index < getSeen.length; index++) {
        const element = getSeen[index];
        if (element.id == film.id) {
          isSeen = true;
        }
      }
      // ajout du film aux favoris du User
      if (!isSeen) {
        this.$store.commit("addToSeen", film);
        axios.put(`http://localhost:3050/user/seen`, {
          email: this.login.getLoggedUser.email,
          filmId: film,
        });
      }

      if (isSeen) {
        this.$store.commit("removeSeen", film);
        axios.put(`http://localhost:3050/user/removeseen`, {
          email: this.login.getLoggedUser.email,
          filmId: film,
        });
      }
    },
    handleActorsFilm(index) {
      axios
        .get(`http://localhost:3050/api/movie/${index.id}`)
        .then(async response => {
          let result = await response.data;
          this.$store.dispatch("addFilm", result);
          this.actorsFilm = [];
        })
        .catch(err => console.log(err));
    },
  },
};
</script>

<style scoped>
@import "./libs/Film.css";
</style>
