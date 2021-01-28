<template>
  <nav class="leftMenu">
    <!-- commande pour plier/déplier les genres -->
    <menu-link
      class="catMenu genres"
      v-for="(cat, index) in categories.genres"
      :key="index"
      :name="cat.name"
      :id="cat.id"
    >
    </menu-link>
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
}

.catMenu {
  text-align: left;
  list-style: none;
}
</style>