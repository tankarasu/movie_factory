<template>
  <div>
    <navbar></navbar>
    <div class="selectedFilm">
      <img
        class="moviePict"
        :src="`https://image.tmdb.org/t/p/w300/${selectedFilm.poster_path}`"
        alt="picture"
      />
      <h2>{{ selectedFilm.title }}</h2>
      <p>{{ selectedFilm.overview }}</p>
      <p>popularity: {{ selectedFilm.popularity }}</p>
      <p>release: {{ selectedFilm.release_date }}</p>
      <p>popularity vote average: {{ selectedFilm.vote_average }}</p>
      <p>popularity vote count: {{ selectedFilm.vote_count }}</p>
      <div
        v-for="(actor, index) in cast"
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
      <div v-if="actorsFilm.length != 0">
        <movie-card
          v-for="(film, index) in actorsFilm"
          :key="index"
          :title="film.title"
          :film="film"
          :description="film.overview"
          :vote="film.vote_average"
          :path="film.poster_path"
        ></movie-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import Navbar from "./Navbar.vue";
import MovieCard from "../components/MovieCard.vue";

export default {
  components: { Navbar, MovieCard },
  name: "Film",
  data() {
    return {
      actorsFilm: [],
    };
  },
  computed: {
    ...mapState(["selectedFilm", "cast"]),
  },
  methods: {
    handleActor(actor) {
      console.log("Actor: ", actor);
      axios
        .get(`http://localhost:3050/api/movie/person/${actor}`)
        .then(async (response) => {
          let result = await response.data.results.slice(0, 5);
          console.log(this.$store);
          this.actorsFilm = result;
        })
        .catch((err) => console.log(err));
    },
  },
  beforeMount() {
    axios
      .get(`http://localhost:3050/api/movie/credits/${this.selectedFilm.id}`)
      .then(async (response) => {
        let result = await response.data;
        result = result.cast.slice(0, 5);
        this.$store.dispatch("fetchCast", result);
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style scoped>
div {
  color: white;
}

.photoActor {
  border-radius: 50%;
  width: 150px;
}
</style>