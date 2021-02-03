<template>
  <div class="main">
    <navbar></navbar>
    <h2>
      Welcome {{ login.getLoggedUser.username.toUpperCase() }} on your Profil
      Page
    </h2>
    <div class="profilMain row m-0">
      <profil-component
        class="col-sm-2"
        :name="login.getLoggedUser.username"
        :favoriteCount="login.getLoggedUser.favorite"
        :seen="login.getLoggedUser.seen"
      ></profil-component>

      <div class="col-sm-10">
        <h3 class="col-12 bg-dark">Favorites Film</h3>
        <div class="favoriteFilm row">
          <movie-card
            class="homeFilmCard col-lg-6"
            v-for="(film, index) in login.getFavorite"
            :key="index"
            :film="film"
            :title="film.title"
            :path="film.poster_path"
            :description="film.overview"
            :vote="film.vote_average"
          ></movie-card>
        </div>
        <h3 class="col-sm-12 bg-dark">Seen Film</h3>
        <div class="seenFilm row">
          <movie-card
            class="homeFilmCard col-lg-6"
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
@import "./libs/Profil.css";
</style>
