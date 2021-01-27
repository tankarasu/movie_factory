<template>
  <div id="app" class="container">
    <router-view />
  </div>
</template>

<script>
import MainMenu from "./components/MainMenu";

export default {
  name: "App",
  components: {
    MainMenu,
  },
};
</script>

<style>
:root {
  font-size: 16px;
}

.body {
  background: #222d32;
  background: url("../src/assets/fond.jpg");
  font-family: "Roboto", sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
