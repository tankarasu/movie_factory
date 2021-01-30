<template>
  <header class="navMenu container sticky-top">
    <div class="headerTitle">
      <img src="../assets/homeLogo.png" alt="logo" id="logo" />
      <h1>The Movie Factory</h1>
      <search-bar></search-bar>
    </div>
    <ul class="mainMenu">
      <li @click="getPopular()">home</li>
      <li>Communauté</li>
      <li>
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
        .get("http://localhost:3050/api/movie/")
        .then(async (response) => {
          let result = await response.data;
          this.$store.dispatch("fetchPopularFilm", result);
          this.$router.push("/home");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
h1 {
  color: aliceblue;
  margin-top: 1rem;
}

.headerTitle {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
}

.navMenu {
  display: flex;
  flex-direction: column;
  background: #111416ea;
}

.mainMenu {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #404244ea;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.mainMenu li {
  padding-top: 30px;
  padding-bottom: 30px;
  font-size: 1.2rem;
}

li {
  color: aliceblue;
  text-decoration: none;
  list-style: none;
  cursor: pointer;
  border: 1px solid transparent;
}

li:hover {
  color: red;
}

#logo {
  width: 10rem;
}
</style>