<template>
  <div>
    <h5>{{ this.name }}</h5>
    <p>number of favorite</p>
    <p>number of seen</p>
    <p>Favorite Films</p>
    <p>Seen Films</p>
    <p>total durée film vue</p>
  </div>
</template>

<script>
export default {
    name:"profilComponent",
    props:["name"]
}
</script>

<style scoped></style>
