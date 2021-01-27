<template>
  <header class="navMenu container">
    <h1>The Movie Factory</h1>
    <ul class="mainMenu">
      <li>home</li>
      <li>Profil</li>
      <li>Communauté</li>
      <li>searchBar</li>
      <li>logout</li>
    </ul>
  </header>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
h1 {
  color: aliceblue;
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
  justify-content: space-evenly;
}

li {
  color: aliceblue;
  text-decoration: none;
  list-style: none;
}
</style>