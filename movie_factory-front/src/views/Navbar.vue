<template>
  <header class="navMenu container sticky-top">
    <div class="headerTitle">
      <img src="../assets/homeLogo.png" alt="logo" id="logo" />
      <h1>The Movie Factory</h1>
      <search-bar v-if="this.$route.name == 'home'"></search-bar>
    </div>
    <ul class="mainMenu bg-dark">
      <li @click="getPopular()">home</li>
      <li @click="getCommunityPage()">Community</li>
      <li @click="getProfilPage()">
        {{ login.getLoggedUser.username }}
      </li>
    </ul>
  </header>
</template>

<script>
import axios from "axios";
import SearchBar from "../components/SearchBar.vue";
import { mapState } from "vuex";

export default {
  components: { SearchBar },
  data() {
    return {
      notLogged: "not logged",
    };
  },
  name: "NavBar",
  computed: { ...mapState(["login"]) },
  methods: {
    getPopular() {
      axios
        .get("https://git.heroku.com/the-movie-factory-api.git/api/movie/")
        .then(async (response) => {
          let result = await response.data;
          this.$store.dispatch("fetchPopularFilm", result);
          if (this.$route.name != "home") {
            this.$router.push("/home");
          }
        })
        .catch((err) => console.log(err));
    },
    getProfilPage() {
      if (this.$route.name != "profil") {
        this.$router.push("/profil");
      }
    },
    getCommunityPage() {
      axios
        .get("https://git.heroku.com/the-movie-factory-api.git/user/alluser")
        .then(async (response) => {
          let result = await response.data;
          this.$store.commit("fetchAllUser", result);
          if (this.$route.name != "community") {
            this.$router.push("/community");
          }
        })
        .catch((err) => err);
    },
  },
};
</script>

<style scoped>
@import "./libs/Navbar.css";
</style>
