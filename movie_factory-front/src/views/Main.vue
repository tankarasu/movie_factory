<template>
  <div class="mainContent row m-0">
    <movie-card
      class="homeFilmCard col-md-6 p-0 m-0"
      v-for="(film, index) in popularFilm.results"
      :key="index"
      :title="film.title"
      :film="film"
      :description="film.overview"
      :vote="film.vote_average"
      :path="film.poster_path"
      compPath="/home"
    ></movie-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MovieCard from "../components/MovieCard.vue";

export default {
  components: { MovieCard },
  name: "Main",
  computed: {
    // on importe le store et on le spread avec mapState
    ...mapState(["popularFilm"]),
  },
  methods: {
  },
};
</script>

<style scoped>
@import "./libs/Main.css";

</style>