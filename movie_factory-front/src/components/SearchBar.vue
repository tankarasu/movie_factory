<template>
  <div>
    <input type="text" v-model="searchValue" />
    <button @click="handleFind()">Find</button>
    <button class="btn-danger">log out</button>
    <button class="btn-dark">Fr</button>
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
    handleFind() {
      // TODO gestion des erreurs
      // TODO image par défaut si pas d'images
      axios
        .get(`http://localhost:3050/api/movie/title/${this.searchValue}`)
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
</style>