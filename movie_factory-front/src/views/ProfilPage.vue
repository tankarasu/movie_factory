<template>
  <div class="main">
    <navbar></navbar>
    <h2>
      Welcome {{ login.getLoggedUser.username.toUpperCase() }} on your Profil
      Page
    </h2>
    <div class="profilMain">
      <profil-component
        :name="login.getLoggedUser.username"
        :favoriteCount="login.getLoggedUser.favorite"
        :seen="login.getLoggedUser.seen"
      ></profil-component>

      <div class="favoriteFilm">
        <h3>Favorites Film</h3>
        <movie-card
          v-for="(film, index) in login.getFavorite"
          :key="index"
          :film="film"
          :title="film.title"
          :path="film.poster_path"
          :description="film.overview"
          :vote="film.vote_average"
        ></movie-card>
      </div>
      <div class="seenFilm">
        <h3>Seen Film</h3>
        <movie-card
          v-for="(film, index) in login.getSeen"
          :key="index"
          :film="film"
          :title="film.title"
          :path="film.poster_path"
          :description="film.overview"
          :vote="film.vote_average"
        ></movie-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MovieCard from "../components/MovieCard.vue";
import ProfilComponent from "../components/ProfilComponent.vue";
import Navbar from "./Navbar.vue";

export default {
  name: "ProfilPage",
  components: { Navbar, ProfilComponent, MovieCard },
  MovieCardata() {
    return {
      isFavoriteSelected: true,
    };
  },
  computed: {
    ...mapState(["login"]),
  },
};
</script>

<style scoped>
h2 {
  background: #111416ea;
  color: aliceblue;
}
</style>
