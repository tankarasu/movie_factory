<template>
  <div class="col-12 mb-2 cat" @click="handleClick()">{{ name }}</div>
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
      axios
        .get(`http://localhost:3050/api/movie/genre/${this.id}`)
        .then(async (Response) => {
          let result = await Response.data;
          this.$store.dispatch("fetchPopularFilm", result);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.cat {
  font-size: 1rem;
  border: 1px solid transparent;
  cursor: pointer;
}

.cat:hover {
  border: 1px solid #6c6c6c;
  cursor: pointer;
}
</style>