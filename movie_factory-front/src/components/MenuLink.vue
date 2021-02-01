<template>
  <li class="col-12 mb-2 cat" @click="handleClick()">{{ name }}</li>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "MenuLink",
  computed: {
    // on importe le store et on le spread avec mapState
    ...mapState(["login", "categories"]),
  },
  props: ["name", "id"],
  methods: {
    handleClick() {
      if (parseInt(this.name, 10) >= 2017 && parseInt(this.name, 10) <= 2021) {
        axios
          .get(
            `http://localhost:3050/api/movie/year/${parseInt(this.name, 10)}`
          )
          .then(async (Response) => {
            let result = await Response.data;
            this.$store.dispatch("fetchPopularFilm", result);
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .get(`http://localhost:3050/api/movie/genre/${this.id}`)
          .then(async (Response) => {
            let result = await Response.data;
            this.$store.dispatch("fetchPopularFilm", result);
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>

<style scoped>
@import './libs/menulink.css';

</style>