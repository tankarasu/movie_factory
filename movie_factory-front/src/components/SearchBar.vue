<template>
  <div class="searchBar">
    <input type="text" v-model="searchValue" class="search" placeholder="search..."/>
    <button @click="handleFind()">Find</button>
    <button class="btn-danger" @click="handleLogout()">log out</button>

  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "SearchBar",
  data() {
    return {
      searchValue: "",
    };
  },
  computed: { ...mapState(["login", "categories"]) },
  methods: {
    handleLogout() {
      this.$store.dispatch("fetchUser", {});
      this.$router.push("/");
    },
    handleFind() {
      // TODO gestion des erreurs
      // TODO image par défaut si pas d'images
      axios
        .get(`https://the-movie-factory-api.herokuapp.com/api/movie/title/${this.searchValue}`)
        .then(async (Response) => {
          let result = await Response.data;
          this.$store.dispatch("fetchPopularFilm", result);
          if (this.$route.name != "home") {
            this.$router.push("/home");
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.searchBar {
  display: flex;
  flex-direction: row;
}

.search {
  width: 50%;
  margin: 0;
}
</style>
