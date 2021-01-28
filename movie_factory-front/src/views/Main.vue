<template>
  <div class="mainContent row">
    <movie-card
      class="homeFilmCard col-6 p-0 m-0"
      v-for="(film, index) in popularFilm.results"
      :key="index"
      :title="film.title"
      :description="film.overview"
      :vote="film.vote_average"
      :path="film.poster_path"
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
};
</script>

<style scoped>
.mainContent {
  color: aliceblue;
  background: #111416ea;
  height: 90vh;
  margin: 0;
  padding: 0;
  overflow-y: scroll;
}
</style>