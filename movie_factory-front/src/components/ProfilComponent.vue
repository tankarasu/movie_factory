<template>
  <div class="profilComponent">
    <h5>{{ this.name }}</h5>
    <p>favorite: {{ this.favoriteCount.length }}</p>
    <p>seen: {{ this.seen.length }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFavoriteSelected: true,
    };
  },
  name: "profilComponent",
  props: ["name", "favoriteCount", "seen"],
};
</script>

<style scoped>
@import "./libs/profilcomponent.css";
</style>
 