<template>
  <div class="home">
    <Navbar></Navbar>
    <div class="row contentPage">
      <Menu class="col-2"></Menu>
      <Main class="col-10"></Main>
    </div>
  </div>
</template>

<script>
import Menu from "./Menu.vue";
import Navbar from "./Navbar.vue";
import Main from "./Main.vue";
import axios from "axios";

export default {
  name: "Home",
  beforeMount() {
    axios
      .get("https://the-movie-factory-api.herokuapp.com/api/movie/categories")
      .then(async (response) => {
        let result = await response.data;
        this.$store.dispatch("fetchCategories", result);
      })
      .catch((err) => console.log(err));

    axios
      .get("https://the-movie-factory-api.herokuapp.com/api/movie/")
      .then(async (response) => {
        let result = await response.data;
        this.$store.dispatch("fetchPopularFilm", result);
      })
      .catch((err) => console.log(err));
  },
  components: { Navbar, Menu, Main },
};

Menu;
</script>
<style scoped>
@import './libs/Home.css';

</style>