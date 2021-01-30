<template>
  <nav class="leftMenu" id="sidebar">
    <!-- commande pour plier/déplier les genres -->
    <div class="sidebar-header">
      <h3>Filter:</h3>
    </div>
    <button
      href="#catFilm"
      data-toggle="collapse"
      aria-expanded="false"
      class="dropdown-toggle leftFilter bg-secondary text-light"
    >
      Categories
    </button>
    <ul class="collapse list-unstyled" id="catFilm">
      <menu-link
        class="catMenu genres"
        v-for="(cat, index) in categories.genres"
        :key="index"
        :name="cat.name"
        :id="cat.id"
      >
      </menu-link>
    </ul>
    <button
      href="#yearFilm"
      data-toggle="collapse"
      aria-expanded="false"
      class="dropdown-toggle leftFilter bg-secondary text-light"
    >
      Year
    </button>
    <ul class="collapse list-unstyled" id="yearFilm">
      <menu-link name="2021"></menu-link>
      <menu-link name="2020"></menu-link>
      <menu-link name="2019"></menu-link>
      <menu-link name="2018"></menu-link>
      <menu-link name="2017"></menu-link>
    </ul>
  </nav>
</template>

<script>
import { mapState } from "vuex";

import MenuLink from "../components/MenuLink.vue";

export default {
  components: { MenuLink },
  name: "Menu",
  computed: {
    // on importe le store et on le spread avec mapState
    ...mapState(["login", "categories"]),
  },
};
</script>

<style scoped>
.leftMenu {
  color: aliceblue;
  background: #111416ea;
  height: 90vh;
  overflow: hidden;
  overflow-y: scroll;
}

.catMenu {
  text-align: left;
  list-style: none;
}

.leftFilter {
  width: 100%;
}


</style>
