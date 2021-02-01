<template>
  <div class="profilComponent">
    <h5>{{ this.name }}</h5>
    <p>favorite: {{ this.favoriteCount.length }}</p>
    <p>seen: {{ this.seen.length }}</p>
    <p>Favorite Films</p>
    <p>Seen Films</p>
    <p>total durée film vue</p>
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
.profilComponent {
  background: #111416ea;
  width: 200px;
  color: aliceblue;
  border-radius: 1rem;
}
</style>
